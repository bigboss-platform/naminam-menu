'use client';

import type { CSSProperties } from 'react';
import { useRadialSelector } from '../hooks/useRadialSelector.hook';
import type { RadialProduct } from '../types/RadialProduct.type';
import { RadialProductCard } from './RadialProductCard.component';
import { RadialSelectorDetails } from './RadialSelectorDetails.component';
import styles from './RadialProductSelector.module.css';

type RadialProductSelectorProps = {
  products: RadialProduct[];
  title: string;
};

/**
 * Wheel product selector (ported from naminam radial-product-selector, Downloads).
 * Cards sit on the upper arc of an ellipse; drag to rotate, release snaps.
 */
export function RadialProductSelector({ products, title }: RadialProductSelectorProps) {
  const ctx = useRadialSelector(products);
  const { rootRef, geometry, isDragging, selectedIndex, pointerHandlers } = ctx;

  if (products.length === 0) return null;

  const viewportStyle: CSSProperties = { height: geometry.height };

  return (
    <section ref={rootRef} className={styles.selector} aria-label="Elige un postre">
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Nuestro menú</p>
          <h2 className={`${styles.title} font-display`}>{title}</h2>
        </div>
        <span className={styles.count}>
          {selectedIndex + 1} / {products.length}
        </span>
      </header>

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

      <RadialSelectorDetails ctx={ctx} />
    </section>
  );
}
