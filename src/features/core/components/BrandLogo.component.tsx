import Image from 'next/image';
import { BRAND_ASSETS } from '../config/brandAssets.config';
import styles from './BrandLogo.module.css';

type BrandLogoProps = {
  /** Rendered height in px (the round badge is square). */
  height: number;
  /** Shows "Los Antojitos de Santanita" next to the badge. */
  withName?: boolean;
  /** Above-the-fold logos (top bar) load eagerly. */
  priority?: boolean;
  className?: string;
};

/**
 * Img_Logo_Main (circular logo, sunset background). Until the client sends it
 * (BRAND_ASSETS.logo), a placeholder badge in brand colors is drawn instead.
 */
export function BrandLogo({ height, withName = false, priority = false, className = '' }: BrandLogoProps) {
  return (
    <span className={`${styles.logo} ${className}`}>
      {BRAND_ASSETS.logo ? (
        <Image src={BRAND_ASSETS.logo} alt="" width={height} height={height} priority={priority} className={styles.badgeImage} />
      ) : (
        <span className={styles.badge} style={{ width: height, height, fontSize: height * 0.5 }} aria-hidden="true">
          S
        </span>
      )}
      {withName ? (
        <span className={`${styles.name} font-display`}>
          <span className={styles.nameSmall}>Los Antojitos de</span>
          Santanita
        </span>
      ) : (
        <span className="visually-hidden">Los Antojitos de Santanita</span>
      )}
    </span>
  );
}
