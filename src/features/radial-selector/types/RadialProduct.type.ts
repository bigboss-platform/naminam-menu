import type { MediaType } from '@/features/menu/types/Product.type';

export type RadialProduct = {
  id: string;
  name: string;
  price: number;
  mediaType: MediaType;
  /** Photo or video link (see ProductMedia). */
  mediaUrl: string;
  posterUrl: string;
  description: string;
  /** Where tapping the already-selected photo goes (e.g. "/menu#matilda"). Empty = nowhere. */
  href: string;
};

/**
 * Shape of the path the photos travel on (see utils/radialGeometry.util.ts):
 * - "orbit": original ellipse, anchored just below the component's top.
 * - "arch": ellipse as wide as the component, centered on its bottom edge (only the top half shows).
 */
export type RadialPathMode = 'orbit' | 'arch';

/**
 * How products are spaced on the path (see utils/radialSlots.util.ts):
 * - "full-circle": 360° / product count — crowds with many products.
 * - "visible-arc": only `visibleCount` products, evenly over the visible top half; the rest wait hidden.
 */
export type RadialSpacing = 'full-circle' | 'visible-arc';

/** Ellipse + card sizes, derived from the component width so it adapts to phones. */
export type RadialGeometry = {
  width: number;
  height: number;
  radiusX: number;
  radiusY: number;
  centerX: number;
  centerY: number;
  cardWidth: number;
  cardHeight: number;
  /** Size multiplier of the selected photo (bigger on wide screens). */
  selectedScale: number;
  unselectedScale: number;
};
