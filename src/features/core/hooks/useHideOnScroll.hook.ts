'use client';

import { useEffect, useRef, useState } from 'react';

/** Ignore tiny scroll jitters (iOS rubber-banding, trackpad noise). */
const DIRECTION_THRESHOLD_PX = 8;
/** Without idle hiding, the controls are always visible this close to the page top. */
const ALWAYS_VISIBLE_ABOVE_PX = 120;
/** Menú: controls hide after this long without any scroll/touch/key, from the moment the page opens (audit 2026-10-10). */
export const MENU_CONTROLS_IDLE_HIDE_MS = 1000;

/**
 * true while the user scrolls down (controls get out of the way),
 * false as soon as they scroll up (controls come back).
 * With `idleHideMs`: the controls also hide after that long without activity — starting when
 * the page opens, even at the top — and a tap/click/key brings them back (at the very top
 * there is no "scroll up" to do it).
 */
export function useHideOnScroll(idleHideMs = 0): boolean {
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;
    let idleTimer: ReturnType<typeof setTimeout> | undefined;

    const restartIdleTimer = () => {
      clearTimeout(idleTimer);
      if (idleHideMs === 0) return;
      idleTimer = setTimeout(() => setIsHidden(true), idleHideMs);
    };

    /**
     * Tap, click or key: show the controls again and restart the idle countdown. Also runs
     * without idleHideMs, so tapping the Menú tab from another page never re-enters Menú with
     * the bars still hidden from the last visit.
     */
    const onActivity = () => {
      setIsHidden(false);
      restartIdleTimer();
    };

    // Count from the moment the page opens, not from the first scroll.
    restartIdleTimer();

    const onScroll = () => {
      restartIdleTimer();
      // Only movement inside the real scroll range counts: iOS rubber-banding at the top or
      // bottom edge reports scroll positions past it, and the bounce back looked like
      // "scrolling up" — which brought the controls back at the edges.
      const maxScrollY = document.documentElement.scrollHeight - window.innerHeight;
      const scrollY = Math.min(Math.max(window.scrollY, 0), Math.max(maxScrollY, 0));
      const delta = scrollY - lastScrollYRef.current;
      if (Math.abs(delta) < DIRECTION_THRESHOLD_PX) return;
      lastScrollYRef.current = scrollY;
      // With idle hiding (Menú) the rules apply everywhere; otherwise the page top keeps them visible.
      const isNearTop = idleHideMs === 0 && scrollY < ALWAYS_VISIBLE_ABOVE_PX;
      setIsHidden(!isNearTop && delta > 0);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointerdown', onActivity, { passive: true });
    window.addEventListener('keydown', onActivity);
    return () => {
      clearTimeout(idleTimer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointerdown', onActivity);
      window.removeEventListener('keydown', onActivity);
    };
  }, [idleHideMs]);

  return isHidden;
}
