'use client';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Image from 'next/image';
import styles from './BrandAnimation.module.css';

type BrandAnimationProps = {
  /** .lottie / .json path (BRAND_ASSETS). Preferred when set. */
  lottieSrc?: string;
  /** Static image fallback (BRAND_ASSETS). */
  imageSrc?: string;
  /** Accessible description, and the placeholder caption while no asset exists. */
  label: string;
  /** Placeholder glyph while the illustration is pending. */
  emoji?: string;
  loop?: boolean;
  className?: string;
};

/**
 * Mascot illustrations and Lottie moments. Lottie → image → branded placeholder,
 * so pages look finished before the client's assets arrive.
 */
export function BrandAnimation({ lottieSrc = '', imageSrc = '', label, emoji = '✨', loop = true, className = '' }: BrandAnimationProps) {
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
        <Image src={imageSrc} alt={label} fill sizes="(min-width: 900px) 400px, 80vw" className={styles.image} />
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
