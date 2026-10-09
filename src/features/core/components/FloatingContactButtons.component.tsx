'use client';

import { useSiteSettings } from '../context/SiteSettings.context';
import { buildInstagramUrl, buildWhatsAppUrl, GENERAL_WHATSAPP_MESSAGE } from '../utils/whatsapp.util';
import { InstagramIcon, WhatsAppIcon } from './BrandIcons.component';
import styles from './FloatingContactButtons.module.css';

/**
 * Desktop only: circular Instagram + WhatsApp buttons fixed bottom-right
 * (WhatsApp, the main channel, sits closest to the corner).
 * Mobile shows the same two as bare icons in the top bar.
 */
export function FloatingContactButtons() {
  const { whatsappNumber, instagramHandle } = useSiteSettings();
  return (
    <div className={styles.stack}>
      <a
        href={buildInstagramUrl(instagramHandle)}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.button} ${styles.instagram}`}
        aria-label="Ver Instagram de Ñami Ñam"
      >
        <InstagramIcon size={28} />
      </a>
      <a
        href={buildWhatsAppUrl(whatsappNumber, GENERAL_WHATSAPP_MESSAGE)}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.button} ${styles.whatsapp}`}
        aria-label="Pedir por WhatsApp"
      >
        <WhatsAppIcon size={32} />
      </a>
    </div>
  );
}
