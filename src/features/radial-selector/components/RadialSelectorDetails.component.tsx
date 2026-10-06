'use client';

import { WhatsAppIcon } from '@/features/core/components/BrandIcons.component';
import { formatPrice } from '@/features/core/utils/format.util';
import { buildProductWhatsAppUrl } from '@/features/core/utils/whatsapp.util';
import type { RadialSelectorCtx } from '../hooks/useRadialSelector.hook';
import styles from './RadialProductSelector.module.css';

/** Selected product + quantity + WhatsApp order button (quantity goes into the message). */
export function RadialSelectorDetails({ ctx }: { ctx: RadialSelectorCtx }) {
  const { selectedProduct, quantity, adjustQuantity } = ctx;

  return (
    <div className={styles.details} aria-live="polite">
      <div className={styles.detailsCopy}>
        <p className={styles.eyebrow}>Seleccionado para ti</p>
        <h3 className={`${styles.selectedName} font-display`}>{selectedProduct.name}</h3>
        <p className={styles.description}>{selectedProduct.description}</p>
        <p className={styles.selectedPrice}>{formatPrice(selectedProduct.price)}</p>
      </div>

      <div className={styles.orderControls}>
        <div className={styles.quantity} role="group" aria-label="Cantidad">
          <button type="button" onClick={() => adjustQuantity(-1)} aria-label="Una menos">
            <span className="material-symbols-outlined">remove</span>
          </button>
          <output aria-label="Cantidad">{quantity}</output>
          <button type="button" onClick={() => adjustQuantity(1)} aria-label="Una más">
            <span className="material-symbols-outlined">add</span>
          </button>
        </div>
        <a
          href={buildProductWhatsAppUrl(selectedProduct.name, quantity)}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.addButton}
        >
          <WhatsAppIcon size={18} />
          Pedir
        </a>
      </div>
    </div>
  );
}
