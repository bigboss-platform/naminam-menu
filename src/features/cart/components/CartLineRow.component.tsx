'use client';

import { formatPrice } from '@/features/core/utils/format.util';
import { MAX_LINE_QUANTITY, type CartLine } from '../types/Cart.type';
import styles from './CartLineRow.module.css';

type CartLineRowProps = {
  line: CartLine;
  /** +1 or −1. */
  onQuantityChange: (delta: number) => void;
  onRemove: () => void;
};

/** One cart row: name + variant, − qty +, line total, remove. */
export function CartLineRow({ line, onQuantityChange, onRemove }: CartLineRowProps) {
  return (
    <li className={styles.row}>
      <div className={styles.info}>
        <p className={`${styles.name} font-display`}>{line.name}</p>
        {line.variantLabel && <p className={styles.variant}>{line.variantLabel}</p>}
        <p className={styles.unitPrice}>{formatPrice(line.unitPrice)} c/u</p>
      </div>
      <div className={styles.controls}>
        <div className={styles.stepper} role="group" aria-label={`Cantidad de ${line.name}`}>
          <button
            type="button"
            className={styles.stepButton}
            onClick={() => onQuantityChange(-1)}
            aria-label={line.quantity === 1 ? `Quitar ${line.name}` : 'Uno menos'}
          >
            <span className="material-symbols-outlined">{line.quantity === 1 ? 'delete' : 'remove'}</span>
          </button>
          <span className={styles.quantity} aria-live="polite">
            {line.quantity}
          </span>
          <button
            type="button"
            className={styles.stepButton}
            onClick={() => onQuantityChange(1)}
            disabled={line.quantity >= MAX_LINE_QUANTITY}
            aria-label="Uno más"
          >
            <span className="material-symbols-outlined">add</span>
          </button>
        </div>
        <span className={styles.lineTotal}>{formatPrice(line.unitPrice * line.quantity)}</span>
        <button type="button" className={styles.remove} onClick={onRemove} aria-label={`Eliminar ${line.name}`}>
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
    </li>
  );
}
