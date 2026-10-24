'use client';

import Link from 'next/link';
import { useCart } from '../hooks/useCart.hook';
import styles from './CartButton.module.css';

/** Cart icon with item count (top bar, top-right corner — PRD 4.1). */
export function CartButton({ className = '' }: { className?: string }) {
  const { itemCount } = useCart();
  const label = itemCount === 0 ? 'Carrito vacío' : `Carrito: ${itemCount} ${itemCount === 1 ? 'producto' : 'productos'}`;
  return (
    <Link href="/carrito" className={`${styles.button} ${className}`} aria-label={label}>
      <span className="material-symbols-outlined">shopping_bag</span>
      {itemCount > 0 && (
        <span key={itemCount} className={styles.count} aria-hidden="true">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </Link>
  );
}
