'use client';

import type { CSSProperties } from 'react';
import { UiDebugTag } from '@/features/core/components/UiDebugTag.component';
import { IS_UI_DEBUG } from '@/features/core/config/uiDebug.config';
import { useRadialSelector } from '../hooks/useRadialSelector.hook';
import type { RadialPathMode, RadialProduct, RadialSpacing } from '../types/RadialProduct.type';
import { RadialPathOverlay } from './RadialPathOverlay.component';
import { RadialProductCard } from './RadialProductCard.component';
import { RadialSelectedBar } from './RadialSelectedBar.component';
import styles from './RadialProductSelector.module.css';

/**
 * Wheel product selector (ported from naminam radial-product-selector, Downloads).
 * Only the wheel itself — titles/labels belong to the page that uses it.
 * Photos sit on the upper arc of an ellipse; drag to rotate (endless), release snaps.
 */
type RadialProductSelectorProps = {
  products: RadialProduct[];
  /** Shape of the photos' travel path — "orbit" (original) or "arch". See RadialPathMode. */
  pathMode?: RadialPathMode;
  /** How products are spaced on the path — "full-circle" (original) or "visible-arc". See RadialSpacing. */
  spacing?: RadialSpacing;
  /** Total photos shown, selected included (odd; 4 → 5). 0 = default: desktop 3, mobile all but the far side. */
  visibleCount?: number;
  /** Draw the travel path in blue (RadialPathOverlay) — for tuning, not for customers. */
  showPath?: boolean;
};

export function RadialProductSelector({
  products,
  pathMode = 'orbit',
  spacing = 'full-circle',
  visibleCount = 0,
  showPath = false,
}: RadialProductSelectorProps) {
  const ctx = useRadialSelector(products, { pathMode, spacing, visibleCount });
  const { rootRef, geometry, isDragging, pointerHandlers } = ctx;

  if (products.length === 0) return null;

  const viewportStyle: CSSProperties = { height: geometry.height };

  return (
    <section
      ref={rootRef}
      className={`${styles.selector} ${IS_UI_DEBUG ? styles.debugOutline : ''}`}
      aria-label="Elige un postre"
    >
      <UiDebugTag code="W1" corner="bottom-right" />
      <div
        className={`${styles.viewport} ${isDragging ? styles.viewportDragging : ''}`}
        style={viewportStyle}
        {...pointerHandlers}
        role="group"
        aria-label="Desliza o usa las flechas para ver los postres"
      >
        <UiDebugTag code="W2" />
        <div className={styles.track} style={{ width: geometry.width, height: geometry.height }}>
          <UiDebugTag code="W3" corner="top-right" />
          {products.map((product, index) => (
            <RadialProductCard key={product.id} ctx={ctx} product={product} index={index} />
          ))}
        </div>
      </div>
      <RadialSelectedBar ctx={ctx} />
      {/* On W1, not inside W2 — W2 clips, and the "arch" path is centered on W1's bottom edge */}
      {showPath && <RadialPathOverlay ctx={ctx} />}
    </section>
  );
}
