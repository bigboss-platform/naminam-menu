'use client';

import Image from 'next/image';
import { useState } from 'react';
import { AddToCart } from '@/features/cart/components/AddToCart.component';
import type { Product, StockStatus } from '@/features/menu/types/Product.type';
import styles from './V2ProductCard.module.css';

const THEMES = ['teal', 'pink', 'yellow'] as const;

const STOCK_LABELS: Record<StockStatus, string> = {
  in_stock: 'Disponible en stock',
  on_order: 'Disponible por encargo',
  sold_out: 'Agotado',
};

/** Menu card in the mockup's card style: soft color, thick outline, framed photo, pills. */
export function V2ProductCard({ product, index }: { product: Product; index: number }) {
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const theme = THEMES[index % THEMES.length];
  const storyId = `v2-story-${product.slug}`;

  return (
    <article id={product.slug} className={`${styles.card} ${styles[theme]} ${product.stockStatus === 'sold_out' ? styles.soldOut : ''}`}>
      <h3 className={styles.name}>{product.name}</h3>
      <div className={styles.imageBox}>
        {product.mediaUrl && (
          <Image src={product.mediaUrl} alt={product.name} fill sizes="(min-width: 1024px) 340px, (min-width: 640px) 45vw, 90vw" className={styles.image} />
        )}
        {product.badge && <span className={styles.badge}>{product.badge}</span>}
      </div>
      <div className={styles.pills}>
        <span className={`${styles.stock} ${styles[product.stockStatus]}`}>{STOCK_LABELS[product.stockStatus]}</span>
        {product.note && <span className={styles.note}>{product.note}</span>}
      </div>
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
    </article>
  );
}
