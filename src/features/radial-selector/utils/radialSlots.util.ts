import type { RadialSpacing } from '../types/RadialProduct.type';

/** Smallest valid visible count: odd (selected in the middle, same count on each side), ≥ 1. 4 → 5. */
export function normalizeVisibleCount(visibleCount: number): number {
  const count = Math.max(1, Math.round(visibleCount));
  return count % 2 === 0 ? count + 1 : count;
}

type SlotInput = {
  index: number;
  /** Wheel rotation in degrees of the full circle (360 / productCount per product). */
  rotation: number;
  productCount: number;
  spacing: RadialSpacing;
  /** Total photos shown, selected included. 0 = default (desktop 3, mobile all but the far side). */
  visibleCount: number;
  isDesktop: boolean;
};

export type RadialSlot = {
  /** Degrees from the selected spot at the top: negative = left, positive = right. */
  angle: number;
  /** How far from the selected spot, in products (0 = selected, 1 = neighbour…), continuous while moving. */
  distance: number;
  /** 0 → 1: fades photos out as they reach the edge of the visible group. */
  visibility: number;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/**
 * Where a product sits on the path right now.
 * - "full-circle": products spread over the whole ellipse (360° / count) — crowds with many items.
 * - "visible-arc": only `visibleCount` products, spread evenly over the visible top half
 *   (180° / (visibleCount + 1)); the others wait hidden at the edges and slide in as the
 *   wheel turns, so it feels like a full wheel whatever the product count.
 */
export function getRadialSlot({ index, rotation, productCount, spacing, visibleCount, isDesktop }: SlotInput): RadialSlot {
  const itemStep = 360 / productCount;
  // Signed distance in products from the selected spot, wrapped to the nearest way round.
  const rawOffset = index + rotation / itemStep;
  const offset = ((((rawOffset + productCount / 2) % productCount) + productCount) % productCount) - productCount / 2;
  const distance = Math.abs(offset);

  if (spacing === 'visible-arc') {
    const count = normalizeVisibleCount(visibleCount || 3);
    const sideCount = (count - 1) / 2;
    const slotAngle = 180 / (count + 1);
    // Hidden products park at the edges (just past the outermost visible slot) instead of
    // travelling round the back — so the next one always enters from the edge.
    const parkedOffset = clamp(offset, -(sideCount + 1), sideCount + 1);
    return {
      angle: parkedOffset * slotAngle,
      distance,
      visibility: clamp(sideCount + 1 - distance, 0, 1),
    };
  }

  const angle = offset * itemStep;
  const visibleArc = visibleCount
    ? itemStep * ((normalizeVisibleCount(visibleCount) - 1) / 2 + 0.5)
    : isDesktop
      ? itemStep * 1.5
      : 135;
  const fadeSpan = itemStep / 2;
  return { angle, distance, visibility: clamp((visibleArc + fadeSpan - Math.abs(angle)) / fadeSpan, 0, 1) };
}
