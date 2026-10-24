'use client';

import Link from 'next/link';
import { useCart } from '@/features/cart/hooks/useCart.hook';
import { V2_BASE } from '../config/v2Nav.constants';
import styles from './V2CartLink.module.css';

/** Cart pill at the end of the header (PRD: cart icon top-right). */
export function V2CartLink() {
  const { itemCount } = useCart();
  return (
    <Link
      href={`${V2_BASE}/carrito`}
      className={styles.cart}
      aria-label={itemCount === 0 ? 'Carrito vacío' : `Carrito: ${itemCount} ${itemCount === 1 ? 'producto' : 'productos'}`}
    >
      <span className="material-symbols-outlined" aria-hidden="true">
        shopping_bag
      </span>
      {itemCount > 0 && (
        <span key={itemCount} className={styles.count} aria-hidden="true">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </Link>
  );
}
