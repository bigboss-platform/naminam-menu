'use client';

import { useEffect, useRef, useState } from 'react';
import { gentleScrollTo, getCenteredScrollY } from '@/features/core/utils/gentleScroll.util';

/** How long the skeleton shows after a filter/search change (kept under a second). */
const SKELETON_MS = 600;

/**
 * Filter change choreography: scroll to the top, show the skeleton briefly, then bring
 * the first result card to the middle of the screen and focus it (it pulses — see
 * MenuItemCard.module.css `.card:focus`).
 */
export function useFilterTransition() {
  const [isFiltering, setIsFiltering] = useState(false);
  const [focusRequest, setFocusRequest] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const cancelTopGlideRef = useRef<() => void>(() => {});

  useEffect(
    () => () => {
      clearTimeout(timerRef.current);
      cancelTopGlideRef.current();
    },
    [],
  );

  useEffect(() => {
    if (focusRequest === 0) return;
    // Wait one frame so the real cards have replaced the skeleton.
    let cancelGlide = () => {};
    const frame = requestAnimationFrame(() => {
      const firstCard = document.querySelector<HTMLElement>('[data-menu-card]');
      if (!firstCard) return;
      firstCard.focus({ preventScroll: true });
      cancelGlide = gentleScrollTo(getCenteredScrollY(firstCard));
    });
    return () => {
      cancelAnimationFrame(frame);
      cancelGlide();
    };
  }, [focusRequest]);

  const startFilterTransition = () => {
    setIsFiltering(true);
    cancelTopGlideRef.current();
    cancelTopGlideRef.current = gentleScrollTo(0);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIsFiltering(false);
      setFocusRequest((count) => count + 1);
    }, SKELETON_MS);
  };

  return { isFiltering, startFilterTransition };
}
