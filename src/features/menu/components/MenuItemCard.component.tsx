'use client';

import { useState } from 'react';
import { AddToCart } from '@/features/cart/components/AddToCart.component';
import { ProductMedia } from '@/features/core/components/ProductMedia.component';
import type { Product } from '../types/Product.type';
import styles from './MenuItemCard.module.css';
import { StockStatusBadge } from './StockStatusBadge.component';

/**
 * PRD 4.3 card: photo, title, short description + "Leer más" story, stock status,
 * variant selector, price and "Añadir". `id={slug}` lets the home page deep-link here.
 */
export function MenuItemCard({ product, index }: { product: Product; index: number }) {
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const storyId = `story-${product.slug}`;

  return (
    <article
      id={product.slug}
      data-menu-card
      // Focusable from code only: the first result is focused (and pulses) after filtering
      tabIndex={-1}
      className={`${styles.card} ${product.stockStatus === 'sold_out' ? styles.cardSoldOut : ''} stagger-in`}
      style={{ '--i': index } as React.CSSProperties}
    >
      <div className={styles.media}>
        <ProductMedia
          mediaType={product.mediaType}
          mediaUrl={product.mediaUrl}
          posterUrl={product.posterUrl}
          alt={product.name}
          sizes="(min-width: 1100px) 280px, (min-width: 900px) 33vw, (min-width: 600px) 50vw, 100vw"
        />
        {product.badge && <span className={styles.badge}>{product.badge}</span>}
      </div>
      <div className={styles.body}>
        <StockStatusBadge status={product.stockStatus} />
        <h3 className={`${styles.name} font-display`}>{product.name}</h3>
        {product.note && <p className={styles.note}>{product.isAddOn ? `Acompañante · ${product.note}` : product.note}</p>}
        <p className={styles.description}>{product.description}</p>
        {product.story && (
          <>
            <p id={storyId} className={styles.story} hidden={!isStoryOpen}>
              {product.story}
            </p>
            <button
              type="button"
              className={styles.readMore}
              aria-expanded={isStoryOpen}
              aria-controls={storyId}
              onClick={() => setIsStoryOpen((open) => !open)}
            >
              {isStoryOpen ? 'Leer menos' : 'Leer más'}
            </button>
          </>
        )}
        <AddToCart product={product} />
      </div>
    </article>
  );
}
