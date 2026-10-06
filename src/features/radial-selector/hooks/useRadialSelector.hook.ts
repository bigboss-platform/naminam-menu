'use client';

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import type { RadialGeometry, RadialProduct } from '../types/RadialProduct.type';

const DEFAULT_WIDTH = 390;
/** Pixels of horizontal movement before a press becomes a drag (below this it's a tap). */
const DRAG_THRESHOLD_PX = 6;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function buildGeometry(viewportWidth: number): RadialGeometry {
  const width = Math.max(280, viewportWidth);
  return {
    width,
    height: Math.max(245, width * 0.69),
    radiusX: Math.min(width * 0.47, 220),
    radiusY: Math.min(width * 0.34, 150),
    centerX: width / 2,
    centerY: width * 0.68,
    cardWidth: clamp(width * 0.35, 112, 146),
    cardHeight: clamp(width * 0.4, 138, 166),
  };
}

/**
 * State + interaction for the radial (wheel) selector: products sit on an ellipse,
 * horizontal drag rotates it, release snaps to the nearest product. Bounded — the
 * first/last product are the ends (not an infinite loop).
 */
export function useRadialSelector(products: RadialProduct[]) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(DEFAULT_WIDTH);

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

  const geometry = buildGeometry(viewportWidth);
  const itemStep = 360 / Math.max(products.length, 1);
  const lastIndex = Math.max(0, products.length - 1);

  const selectIndex = (index: number) => {
    const nextIndex = clamp(index, 0, lastIndex);
    setSelectedIndex(nextIndex);
    rotationRef.current = -nextIndex * itemStep;
    setRotation(rotationRef.current);
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
    selectIndex(Math.round(-rotationRef.current / itemStep));
  };

  const onCardClick = (index: number) => {
    if (didDragRef.current) return;
    selectIndex(index);
  };

  const onCardKeyDown = (key: string, index: number) => {
    const keyTargets: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: lastIndex,
    };
    if (!(key in keyTargets)) return false;
    selectIndex(keyTargets[key]);
    return true;
  };

  const adjustQuantity = (amount: number) => setQuantity((current) => clamp(current + amount, 1, 99));

  return {
    rootRef,
    products,
    selectedIndex,
    selectedProduct: products[selectedIndex],
    rotation,
    itemStep,
    geometry,
    isDragging,
    quantity,
    adjustQuantity,
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
