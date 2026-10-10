'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import type { RadialPathMode, RadialProduct, RadialSpacing } from '../types/RadialProduct.type';
import { animateNumber } from '../utils/animateNumber.util';
import { buildRadialGeometry } from '../utils/radialGeometry.util';
import { getRadialSlot } from '../utils/radialSlots.util';

const DEFAULT_WIDTH = 390;
/** Pixels of horizontal movement before a press becomes a drag (below this it's a tap). */
const DRAG_THRESHOLD_PX = 6;
/** Tap / release / arrow key: how long the wheel takes to turn to its new spot (along the path). */
const TURN_DURATION_MS = 280;
/** Desktop = same breakpoint as the rest of the site. Tablets and phones keep the width-based wheel. */
const DESKTOP_QUERY = '(min-width: 900px)';

/** Modulo that is always positive: wrapIndex(-1, 6) === 5. */
const wrapIndex = (value: number, length: number) => ((value % length) + length) % length;

export type RadialSelectorOptions = {
  pathMode: RadialPathMode;
  spacing: RadialSpacing;
  /** Total photos shown, selected included (odd; 4 → 5). 0 = default: desktop 3, mobile all but the far side. */
  visibleCount: number;
};

/**
 * State + interaction for the radial (wheel) selector: products sit on an ellipse,
 * horizontal drag rotates it, release snaps to the nearest product.
 * Endless: the wheel keeps turning past the last product back to the first, with no
 * jump — `step` is an unbounded position counter and the selected product is step mod n.
 */
export function useRadialSelector(products: RadialProduct[], { pathMode, spacing, visibleCount }: RadialSelectorOptions) {
  const [step, setStep] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(DEFAULT_WIDTH);
  const [componentHeight, setComponentHeight] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const router = useRouter();

  const rootRef = useRef<HTMLDivElement>(null);
  const pressRef = useRef<{ x: number; rotation: number; pointerId: number } | null>(null);
  const rotationRef = useRef(0);
  // Set when a press turned into a drag, so the click that follows doesn't select a card.
  const didDragRef = useRef(false);
  const cancelTurnRef = useRef<() => void>(() => {});

  useEffect(() => () => cancelTurnRef.current(), []);

  // ResizeObserver reports the initial size on observe — no synchronous setState needed.
  useEffect(() => {
    const element = rootRef.current;
    if (!element) return;
    // Crossing 900px also changes the component's width, so the observer fires then too.
    const observer = new ResizeObserver(([entry]) => {
      setViewportWidth(entry.contentRect.width || DEFAULT_WIDTH);
      setComponentHeight(entry.contentRect.height); // "arch" mode centers its ellipse on W1's bottom edge
      setIsDesktop(window.matchMedia(DESKTOP_QUERY).matches);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const productCount = Math.max(products.length, 1);
  const geometry = buildRadialGeometry({
    componentWidth: viewportWidth,
    componentHeight,
    productCount,
    isDesktop,
    pathMode,
  });
  const itemStep = 360 / productCount;
  const selectedIndex = wrapIndex(step, productCount);

  /** Position of product `index` on the path right now (angle, distance, visibility). */
  const getSlot = (index: number) =>
    getRadialSlot({ index, rotation, productCount, spacing, visibleCount, isDesktop });

  const setRotationNow = (value: number) => {
    rotationRef.current = value;
    setRotation(value);
  };

  /** Animate the rotation (not CSS left/top), so every photo travels along the path, never across it. */
  const goToStep = (nextStep: number) => {
    setStep(nextStep);
    cancelTurnRef.current();
    cancelTurnRef.current = animateNumber(rotationRef.current, -nextStep * itemStep, TURN_DURATION_MS, setRotationNow);
  };

  /** Turn the shortest way round to `index` (e.g. from the last product, "next" is the first). */
  const goToIndex = (index: number) => {
    let delta = wrapIndex(index - selectedIndex, productCount);
    if (delta > productCount / 2) delta -= productCount;
    goToStep(step + delta);
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (products.length < 2) return;
    cancelTurnRef.current(); // grab the wheel mid-turn
    pressRef.current = { x: event.clientX, rotation: rotationRef.current, pointerId: event.pointerId };
    didDragRef.current = false;
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const press = pressRef.current;
    if (!press || press.pointerId !== event.pointerId) return;
    const deltaX = event.clientX - press.x;
    if (!didDragRef.current) {
      if (Math.abs(deltaX) < DRAG_THRESHOLD_PX) return;
      // Became a drag: capture so the gesture keeps working outside the wheel.
      didDragRef.current = true;
      setIsDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    // Dragging about one card-width rotates about one product step.
    const degreesPerPixel = itemStep / Math.max(geometry.cardWidth * 0.88, 100);
    setRotationNow(press.rotation + deltaX * degreesPerPixel);
  };

  const onPointerEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    const press = pressRef.current;
    if (!press || press.pointerId !== event.pointerId) return;
    pressRef.current = null;
    if (!didDragRef.current) return;
    setIsDragging(false);
    goToStep(Math.round(-rotationRef.current / itemStep));
  };

  /** Tap a side photo → turn to it. Tap the selected photo → follow its href (if any). */
  const onCardClick = (index: number) => {
    if (didDragRef.current) return;
    const tappedProduct = products[index];
    const isAlreadySelected = index === selectedIndex;
    if (isAlreadySelected && tappedProduct.href) {
      router.push(tappedProduct.href);
      return;
    }
    goToIndex(index);
  };

  const onCardKeyDown = (key: string) => {
    const stepDeltas: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1 };
    if (!(key in stepDeltas)) return false;
    goToStep(step + stepDeltas[key]);
    return true;
  };

  return {
    rootRef,
    products,
    selectedIndex,
    getSlot,
    geometry,
    isDragging,
    pointerHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: onPointerEnd,
      onPointerCancel: onPointerEnd,
    },
    onCardClick,
    onCardKeyDown,
  };
}

export type RadialSelectorCtx = ReturnType<typeof useRadialSelector>;
