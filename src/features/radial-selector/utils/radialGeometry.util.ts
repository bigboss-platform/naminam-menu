import type { RadialGeometry, RadialPathMode } from '../types/RadialProduct.type';

/** From this component width up (tablet/desktop) the selected photo grows more. */
const WIDE_LAYOUT_PX = 600;
/** Breathing room between the photos and the component's top/bottom edges. */
const EDGE_GAP_PX = 16;

/**
 * Desktop wheel height is pinned (W2 = 495.3px, W1 ≈ 610px with the name + Pedir bar), so
 * window width never changes it. The selected photo ends at ~75% of W1:
 * 16 + 166 × 2.66 ≈ 458px. Side photos grew by the same factor (2.66 / 1.7 ≈ 1.565).
 * radiusY is flattened so they still fit inside W2:
 * centerY = 16 + 441.6/2 + 96 ≈ 333 → side photo bottom 333 + 259.8/2 + 32 ≈ 495.
 */
const DESKTOP_HEIGHT = 495.3;
const DESKTOP_SELECTED_SCALE = 2.66;
const DESKTOP_UNSELECTED_SCALE = 1.565;
const DESKTOP_RADIUS_Y = 96;

/**
 * "arch" mode: the ellipse is as tall as this share of W1, measured up from W1's bottom edge —
 * its top sits at 40% from W1's top (approved 2026-10-10; 0.5 left too little room inside the arc).
 */
const ARCH_RADIUS_Y_RATIO = 0.6;
/** Name + Pedir bar height used until W1 has been measured once. */
const ESTIMATED_BAR_HEIGHT = 114;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

type GeometryInput = {
  /** W1 width. */
  componentWidth: number;
  /** W1 height as last measured (0 = not measured yet). */
  componentHeight: number;
  productCount: number;
  isDesktop: boolean;
  pathMode: RadialPathMode;
};

/**
 * "orbit" (original): ellipse anchored just below W1's top (no dead space above the selected
 * photo); W2's height ends just below the neighbouring photos (pinned on desktop).
 */
function buildOrbitGeometry({ componentWidth, productCount, isDesktop }: GeometryInput): RadialGeometry {
  const width = Math.max(280, componentWidth);
  const isWide = width >= WIDE_LAYOUT_PX;
  const cardWidth = clamp(width * 0.35, 112, 146);
  const cardHeight = clamp(width * 0.4, 138, 166);
  const selectedScale = isDesktop ? DESKTOP_SELECTED_SCALE : isWide ? 1.7 : 1.2;
  const unselectedScale = isDesktop ? DESKTOP_UNSELECTED_SCALE : isWide ? 1 : 0.8;
  // Desktop: a much wider, flatter circle. Mobile: slightly bigger than the original.
  const radiusX = isWide ? width * 0.38 : width * 0.52;
  const radiusY = isDesktop ? DESKTOP_RADIUS_Y : isWide ? width * 0.2 : width * 0.4;

  const centerY = EDGE_GAP_PX + (cardHeight * selectedScale) / 2 + radiusY;
  const neighbourY = centerY - radiusY * Math.cos((2 * Math.PI) / Math.max(productCount, 1));
  const height = isDesktop ? DESKTOP_HEIGHT : neighbourY + (cardHeight * unselectedScale) / 2 + EDGE_GAP_PX * 2;

  return { width, height, radiusX, radiusY, centerX: width / 2, centerY, cardWidth, cardHeight, selectedScale, unselectedScale };
}

type ArchSizes = Pick<RadialGeometry, 'cardWidth' | 'cardHeight' | 'selectedScale' | 'unselectedScale' | 'height'> & {
  /** Ellipse height as a share of W1 (overrides ARCH_RADIUS_Y_RATIO for this device size). */
  radiusYRatio: number;
};

/** Desktop + tablets (component ≥ 600px): the sizes approved on desktop (see DESKTOP_* above). */
const ARCH_LARGE_SIZES: ArchSizes = {
  cardWidth: 146,
  cardHeight: 166,
  selectedScale: DESKTOP_SELECTED_SCALE,
  unselectedScale: DESKTOP_UNSELECTED_SCALE,
  height: DESKTOP_HEIGHT,
  radiusYRatio: ARCH_RADIUS_Y_RATIO,
};

/**
 * Phones: same rules as desktop, fixed sizes (never stretched by the phone's width).
 * Selected photo 180 × 204.7px (scale 1.233); side photos keep desktop's ratio to it
 * (1.565 / 2.66 ≈ 0.588 → scale 0.725, 106 × 120px). Selected photo ends at 75% of W1:
 * W1 = (16 + 204.7) / 0.75 ≈ 294.3px → W2 = 294.3 − 102.4 (name + Pedir bar on phones) ≈ 191.9px.
 */
const ARCH_PHONE_SIZES: ArchSizes = {
  cardWidth: 146,
  cardHeight: 166,
  selectedScale: 1.233,
  unselectedScale: 0.725,
  // 191.9 by the 75% rule, + 90px taller component on phones — mobile audit 2026-10-10
  height: 281.9,
  // Top of the arch at 34% from W1's top (desktop: 40%) — mobile audit 2026-10-10
  radiusYRatio: 0.66,
};

/**
 * "arch": the ellipse is as wide as W1, its center sits on W1's bottom edge (only the top
 * half can show) and it is ARCH_RADIUS_Y_RATIO of W1's height tall. Photo sizes and W2's
 * height are fixed per device size (ARCH_*_SIZES), so they never stretch with the screen.
 */
function buildArchGeometry({ componentWidth, componentHeight, isDesktop }: GeometryInput): RadialGeometry {
  const width = Math.max(280, componentWidth);
  const sizes = isDesktop || width >= WIDE_LAYOUT_PX ? ARCH_LARGE_SIZES : ARCH_PHONE_SIZES;
  const measuredHeight = componentHeight || sizes.height + ESTIMATED_BAR_HEIGHT;
  return {
    ...sizes,
    width,
    radiusX: width / 2,
    centerX: width / 2,
    centerY: measuredHeight,
    radiusY: measuredHeight * sizes.radiusYRatio,
  };
}

export function buildRadialGeometry(input: GeometryInput): RadialGeometry {
  return input.pathMode === 'arch' ? buildArchGeometry(input) : buildOrbitGeometry(input);
}
