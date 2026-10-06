'use client';

import { useEffect } from 'react';
import { gentleScrollTo, getCenteredScrollY, getVisibleArea } from '@/features/core/utils/gentleScroll.util';

/** Scrolling counts as finished after this long without scroll events (covers iOS momentum). */
const SCROLL_IDLE_MS = 160;
const MOBILE_QUERY = '(max-width: 899px)';

/** Nearest resting point: the top of the page or a card centered on screen. Null = leave it alone. */
function findSettleTarget(): number | null {
  const { bottom } = getVisibleArea();
  const footer = document.querySelector('footer');
  const isFooterInView = footer !== null && footer.getBoundingClientRect().top < bottom;
  if (isFooterInView) return null; // the user is heading to the footer — never pull them back

  const candidates = [0, ...Array.from(document.querySelectorAll('[data-menu-card]'), getCenteredScrollY)];
  return candidates.reduce((best, candidate) =>
    Math.abs(candidate - window.scrollY) < Math.abs(best - window.scrollY) ? candidate : best,
  );
}

/**
 * Scroll assistant (mobile/tablet menu): once the user stops scrolling, gently glide so
 * the nearest card sits in the middle of the screen. Never fights the finger: touching
 * the screen cancels the glide, and nothing happens while the footer is in view.
 */
export function useMenuScrollSnap() {
  useEffect(() => {
    const mobileQuery = window.matchMedia(MOBILE_QUERY);
    let idleTimer: ReturnType<typeof setTimeout> | undefined;
    let cancelGlide = () => {};
    let isGliding = false;
    let isTouching = false;

    const settle = () => {
      if (!mobileQuery.matches || isTouching) return;
      const target = findSettleTarget();
      if (target === null) return;
      isGliding = true;
      cancelGlide = gentleScrollTo(target, () => {
        isGliding = false;
      });
    };

    const scheduleSettle = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(settle, SCROLL_IDLE_MS);
    };

    const stopGlide = () => {
      cancelGlide();
      isGliding = false;
      clearTimeout(idleTimer);
    };

    const onScroll = () => {
      if (!isGliding && !isTouching) scheduleSettle(); // our own glide also fires scroll events
    };
    const onTouchStart = () => {
      isTouching = true;
      stopGlide();
    };
    const onTouchEnd = () => {
      isTouching = false;
      scheduleSettle(); // momentum scroll events keep pushing this back until it really stops
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('wheel', stopGlide, { passive: true });
    return () => {
      stopGlide();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('wheel', stopGlide);
    };
  }, []);
}
