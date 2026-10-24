'use client';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Image from 'next/image';
import { BRAND_ASSETS } from '../config/brandAssets.config';
import styles from './BrandAnimation.module.css';

type BrandAnimationProps = {
  /** .lottie / .json path (BRAND_ASSETS). Preferred when set. */
  lottieSrc?: string;
  /** Static image fallback — defaults to the detailed circular mascot. */
  imageSrc?: string;
  /** Accessible description, and the placeholder caption while no asset exists. */
  label: string;
  /** Placeholder glyph while the illustration is pending. */
  emoji?: string;
  loop?: boolean;
  className?: string;
};

/**
 * Mascot illustrations and Lottie moments: Lottie when it exists, otherwise the circular mascot
 * image (BRAND_ASSETS.mascot), otherwise a branded placeholder.
 */
export function BrandAnimation({ lottieSrc = '', imageSrc = BRAND_ASSETS.mascot, label, emoji = '✨', loop = true, className = '' }: BrandAnimationProps) {
  if (lottieSrc) {
    return (
      <div className={`${styles.frame} ${className}`} role="img" aria-label={label}>
        <DotLottieReact src={lottieSrc} loop={loop} autoplay className={styles.lottie} />
      </div>
    );
  }
  if (imageSrc) {
    return (
      <div className={`${styles.frame} ${className}`}>
        <Image src={imageSrc} alt={label} fill sizes="(min-width: 900px) 420px, 80vw" className={styles.image} />
      </div>
    );
  }
  return (
    <div className={`${styles.frame} ${styles.placeholder} ${className}`} role="img" aria-label={label}>
      <span className={styles.emoji} aria-hidden="true">{emoji}</span>
      <span className={styles.caption} aria-hidden="true">{label}</span>
    </div>
  );
}
