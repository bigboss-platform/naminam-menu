'use client';

import { useSiteSettings } from '../context/SiteSettings.context';
import { buildInstagramUrl, buildWhatsAppUrl, externalLinkProps, GENERAL_WHATSAPP_MESSAGE } from '../utils/whatsapp.util';
import { InstagramIcon, WhatsAppIcon } from './BrandIcons.component';
import styles from './FloatingContactButtons.module.css';

/**
 * Desktop only: circular Instagram + WhatsApp buttons fixed bottom-right
 * (WhatsApp, the main channel, sits closest to the corner). Mobile shows them in the top bar.
 */
export function FloatingContactButtons() {
  const { whatsappNumber, instagramHandle } = useSiteSettings();
  return (
    <div className={styles.stack}>
      <a
        {...externalLinkProps(buildInstagramUrl(instagramHandle))}
        className={`${styles.button} ${styles.instagram}`}
        aria-label="Instagram de Santanita"
      >
        <InstagramIcon size={28} />
      </a>
      <a
        {...externalLinkProps(buildWhatsAppUrl(whatsappNumber, GENERAL_WHATSAPP_MESSAGE))}
        className={`${styles.button} ${styles.whatsapp}`}
        aria-label="Pedir por WhatsApp"
      >
        <WhatsAppIcon size={32} />
      </a>
    </div>
  );
}
