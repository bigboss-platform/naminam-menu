import Image from 'next/image';
import { BRAND_ASSETS } from '@/features/core/config/brandAssets.config';
import styles from './V2Wordmark.module.css';

/**
 * Mockup brand: the circular mascot logo (no text) next to the lettering
 * "Los · Antojitos de · Santanita" (white letters, guayaba outline).
 */
export function V2Wordmark({ priority = false }: { priority?: boolean }) {
  return (
    <span className={styles.brand}>
      <Image src={BRAND_ASSETS.logo} alt="" width={64} height={64} priority={priority} className={styles.logo} />
      <span className={styles.lettering}>
        <span className={styles.los}>Los</span>
        <span className={styles.name}>
          Antojitos <span className={styles.de}>de</span>
          <br />
          <span className={styles.santanita}>Santanita</span>
        </span>
      </span>
    </span>
  );
}
