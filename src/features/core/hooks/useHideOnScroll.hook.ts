'use client';

import { useEffect, useRef, useState } from 'react';

/** Ignore tiny scroll jitters (iOS rubber-banding, trackpad noise). */
const DIRECTION_THRESHOLD_PX = 8;
/** Near the top of the page the controls are always visible. */
const ALWAYS_VISIBLE_ABOVE_PX = 120;

/**
 * true while the user scrolls down (controls get out of the way),
 * false as soon as they scroll up (controls come back).
 */
export function useHideOnScroll(): boolean {
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;
    const onScroll = () => {
      const scrollY = window.scrollY;
      const delta = scrollY - lastScrollYRef.current;
      if (Math.abs(delta) < DIRECTION_THRESHOLD_PX) return;
      lastScrollYRef.current = scrollY;
      const isNearTop = scrollY < ALWAYS_VISIBLE_ABOVE_PX;
      setIsHidden(!isNearTop && delta > 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return isHidden;
}
