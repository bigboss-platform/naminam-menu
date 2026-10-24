'use client';

import { useEffect, useState } from 'react';
import { formatPrice } from '@/features/core/utils/format.util';
import type { Product } from '@/features/menu/types/Product.type';
import { useCart } from '../hooks/useCart.hook';
import styles from './AddToCart.module.css';

const ADDED_FEEDBACK_MS = 1600;

/** Variant selector (PRD 4.3) + price + "Añadir". Sold-out products show a disabled button. */
export function AddToCart({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [variantId, setVariantId] = useState(product.variants[0]?.id ?? '');
  const [justAdded, setJustAdded] = useState(false);
  const variant = product.variants.find((item) => item.id === variantId);
  const price = variant?.price ?? product.price;
  const isSoldOut = product.stockStatus === 'sold_out';

  useEffect(() => {
    if (!justAdded) return;
    const timer = setTimeout(() => setJustAdded(false), ADDED_FEEDBACK_MS);
    return () => clearTimeout(timer);
  }, [justAdded]);

  const add = () => {
    addItem({
      slug: product.slug,
      name: product.name,
      variantId: variant?.id ?? '',
      variantLabel: variant?.label ?? '',
      unitPrice: price,
    });
    setJustAdded(true);
  };

  const selectId = `variant-${product.slug}`;
  return (
    <div className={styles.addToCart}>
      {product.variants.length > 0 && (
        <div className={styles.variant}>
          <label htmlFor={selectId} className={styles.variantLabel}>
            {product.variantLabel} · {product.variants.length} opciones
          </label>
          <select id={selectId} className={styles.select} value={variantId} onChange={(event) => setVariantId(event.target.value)}>
            {product.variants.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className={styles.row}>
        <span className={styles.price}>{formatPrice(price)}</span>
        <button
          type="button"
          className={`${styles.button} ${justAdded ? styles.buttonAdded : ''}`}
          onClick={add}
          disabled={isSoldOut}
          aria-live="polite"
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            {justAdded ? 'check' : 'add_shopping_cart'}
          </span>
          {isSoldOut ? 'Agotado' : justAdded ? '¡Añadido!' : 'Añadir'}
        </button>
      </div>
    </div>
  );
}
