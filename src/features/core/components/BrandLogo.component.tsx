import Image from 'next/image';
import styles from './BrandLogo.module.css';

/**
 * The client's real logo ("ñami ñam" lettering). Asset: public/brand/logo.png — generated
 * from public/brand/logo-original.png by scripts/process-logo.mjs (transparent, trimmed).
 */
const LOGO_SRC = '/brand/logo.png';
const LOGO_ASPECT_RATIO = 770 / 522;

type BrandLogoProps = {
  /** Rendered height in px — width follows the logo's aspect ratio. */
  height: number;
  /** Above-the-fold logos (top bar) load eagerly. */
  priority?: boolean;
  className?: string;
};

export function BrandLogo({ height, priority = false, className = '' }: BrandLogoProps) {
  return (
    <Image
      src={LOGO_SRC}
      alt="Ñami Ñam"
      width={Math.round(height * LOGO_ASPECT_RATIO)}
      height={height}
      priority={priority}
      className={`${styles.logo} ${className}`}
    />
  );
}
