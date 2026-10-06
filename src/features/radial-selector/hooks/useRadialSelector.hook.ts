'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import type { RadialGeometry, RadialProduct } from '../types/RadialProduct.type';

const DEFAULT_WIDTH = 390;
/** Pixels of horizontal movement before a press becomes a drag (below this it's a tap). */
const DRAG_THRESHOLD_PX = 6;
/** From this component width up (tablet/desktop) the selected photo grows more. */
const WIDE_LAYOUT_PX = 600;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
/** Modulo that is always positive: wrapIndex(-1, 6) === 5. */
const wrapIndex = (value: number, length: number) => ((value % length) + length) % length;

/** Breathing room between the photos and the component's top/bottom edges. */
const EDGE_GAP_PX = 16;

/**
 * Ellipse + card sizes from the component width. The top of the ellipse is anchored
 * just below the component's top edge (no dead space above the selected photo), and
 * the height ends just below the neighbouring photos.
 */
function buildGeometry(viewportWidth: number, productCount: number): RadialGeometry {
  const width = Math.max(280, viewportWidth);
  const isWide = width >= WIDE_LAYOUT_PX;
  const cardWidth = clamp(width * 0.35, 112, 146);
  const cardHeight = clamp(width * 0.4, 138, 166);
  const selectedScale = isWide ? 1.7 : 1.2;
  const unselectedScale = isWide ? 1 : 0.8;
  // Desktop: a much wider, flatter circle. Mobile: slightly bigger than the original.
  const radiusX = isWide ? width * 0.38 : width * 0.52;
  const radiusY = isWide ? width * 0.2 : width * 0.4;

  const centerY = EDGE_GAP_PX + (cardHeight * selectedScale) / 2 + radiusY;
  const neighbourY = centerY - radiusY * Math.cos((2 * Math.PI) / Math.max(productCount, 1));
  const height = neighbourY + (cardHeight * unselectedScale) / 2 + EDGE_GAP_PX * 2;

  return {
    width,
    height,
    radiusX,
    radiusY,
    centerX: width / 2,
    centerY,
    cardWidth,
    cardHeight,
    selectedScale,
    unselectedScale,
  };
}

/**
 * State + interaction for the radial (wheel) selector: products sit on an ellipse,
 * horizontal drag rotates it, release snaps to the nearest product.
 * Endless: the wheel keeps turning past the last product back to the first, with no
 * jump — `step` is an unbounded position counter and the selected product is step mod n.
 */
export function useRadialSelector(products: RadialProduct[]) {
  const [step, setStep] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(DEFAULT_WIDTH);
  const router = useRouter();

  const rootRef = useRef<HTMLDivElement>(null);
  const pressRef = useRef<{ x: number; rotation: number; pointerId: number } | null>(null);
  const rotationRef = useRef(0);
  // Set when a press turned into a drag, so the click that follows doesn't select a card.
  const didDragRef = useRef(false);

  // ResizeObserver reports the initial size on observe — no synchronous setState needed.
  useEffect(() => {
    const element = rootRef.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => setViewportWidth(entry.contentRect.width || DEFAULT_WIDTH));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const productCount = Math.max(products.length, 1);
  const geometry = buildGeometry(viewportWidth, productCount);
  const itemStep = 360 / productCount;
  const selectedIndex = wrapIndex(step, productCount);

  const goToStep = (nextStep: number) => {
    setStep(nextStep);
    rotationRef.current = -nextStep * itemStep;
    setRotation(rotationRef.current);
  };

  /** Turn the shortest way round to `index` (e.g. from the last product, "next" is the first). */
  const goToIndex = (index: number) => {
    let delta = wrapIndex(index - selectedIndex, productCount);
    if (delta > productCount / 2) delta -= productCount;
    goToStep(step + delta);
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (products.length < 2) return;
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
    rotationRef.current = press.rotation + deltaX * degreesPerPixel;
    setRotation(rotationRef.current);
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
    rotation,
    itemStep,
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
