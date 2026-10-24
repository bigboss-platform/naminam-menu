import Image from 'next/image';
import { BRAND_ASSETS } from '@/features/core/config/brandAssets.config';
import styles from './V2Loading.module.css';

/** Loading screen: the detailed mascot bouncing (stands in for the future loading Lottie). */
export function V2Loading() {
  return (
    <div className={styles.loading} role="status" aria-live="polite">
      <div className={styles.mascot}>
        <Image src={BRAND_ASSETS.mascot} alt="" fill sizes="160px" priority className={styles.image} />
      </div>
      <p className={styles.text}>Preparando tus antojitos…</p>
    </div>
  );
}
