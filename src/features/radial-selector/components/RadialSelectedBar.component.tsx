'use client';

import { WhatsAppIcon } from '@/features/core/components/BrandIcons.component';
import { useSiteSettings } from '@/features/core/context/SiteSettings.context';
import { buildWantThisWhatsAppUrl } from '@/features/core/utils/whatsapp.util';
import type { RadialSelectorCtx } from '../hooks/useRadialSelector.hook';
import styles from './RadialProductSelector.module.css';

/** Below the wheel, centered: selected name, then a "Pedir" WhatsApp button on the next row. */
export function RadialSelectedBar({ ctx }: { ctx: RadialSelectorCtx }) {
  const { whatsappNumber } = useSiteSettings();
  const selectedProduct = ctx.products[ctx.selectedIndex];

  return (
    <div className={styles.selectedBar} aria-live="polite">
      <span className={`${styles.selectedName} font-display`}>{selectedProduct.name}</span>
      <a
        href={buildWantThisWhatsAppUrl(whatsappNumber, selectedProduct.name)}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.orderButton}
        aria-label={`Pedir ${selectedProduct.name} por WhatsApp`}
      >
        <WhatsAppIcon size={20} />
        Pedir
      </a>
    </div>
  );
}
