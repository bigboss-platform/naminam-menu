'use client';

import type { CSSProperties } from 'react';
import { useRadialSelector } from '../hooks/useRadialSelector.hook';
import type { RadialProduct } from '../types/RadialProduct.type';
import { RadialProductCard } from './RadialProductCard.component';
import { RadialSelectedBar } from './RadialSelectedBar.component';
import styles from './RadialProductSelector.module.css';

/**
 * Wheel product selector (ported from naminam radial-product-selector, Downloads).
 * Only the wheel itself — titles/labels belong to the page that uses it.
 * Photos sit on the upper arc of an ellipse; drag to rotate (endless), release snaps.
 */
export function RadialProductSelector({ products }: { products: RadialProduct[] }) {
  const ctx = useRadialSelector(products);
  const { rootRef, geometry, isDragging, pointerHandlers } = ctx;

  if (products.length === 0) return null;

  const viewportStyle: CSSProperties = { height: geometry.height };

  return (
    <section ref={rootRef} className={styles.selector} aria-label="Elige un postre">
      <div
        className={`${styles.viewport} ${isDragging ? styles.viewportDragging : ''}`}
        style={viewportStyle}
        {...pointerHandlers}
        role="group"
        aria-label="Desliza o usa las flechas para ver los postres"
      >
        <div className={styles.track} style={{ width: geometry.width, height: geometry.height }}>
          {products.map((product, index) => (
            <RadialProductCard key={product.id} ctx={ctx} product={product} index={index} />
          ))}
        </div>
      </div>
      <RadialSelectedBar ctx={ctx} />
    </section>
  );
}
