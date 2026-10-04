import { INSTAGRAM_URL } from '../config/business.config';
import { buildWhatsAppUrl, GENERAL_WHATSAPP_MESSAGE } from '../utils/whatsapp.util';
import { InstagramIcon, WhatsAppIcon } from './BrandIcons.component';
import styles from './FloatingContactButtons.module.css';

/**
 * Desktop only: circular Instagram + WhatsApp buttons fixed bottom-right
 * (WhatsApp, the main channel, sits closest to the corner).
 * Mobile shows the same two as bare icons in the top bar.
 */
export function FloatingContactButtons() {
  return (
    <div className={styles.stack}>
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.button} ${styles.instagram}`}
        aria-label="Ver Instagram de Ñami Ñam"
      >
        <InstagramIcon size={28} />
      </a>
      <a
        href={buildWhatsAppUrl(GENERAL_WHATSAPP_MESSAGE)}
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
