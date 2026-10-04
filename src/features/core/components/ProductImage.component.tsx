'use client';

import Image from 'next/image';
import { useState } from 'react';
import { BrandLogo } from './BrandLogo.component';
import styles from './ProductImage.module.css';

type ProductImageProps = {
  src: string;
  alt: string;
  /** Passed to next/image — describe the rendered width per breakpoint. */
  sizes: string;
  priority?: boolean;
  className?: string;
};

/**
 * Fills its (positioned) parent. Missing or broken URLs render a tasteful branded
 * placeholder instead of an unrelated stock photo (naminam.md → "MENU UX").
 * The photo fades in once loaded.
 */
export function ProductImage({ src, alt, sizes, priority = false, className = '' }: ProductImageProps) {
  const [hasFailed, setHasFailed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const showPlaceholder = src === '' || hasFailed;

  return (
    <div className={`${styles.frame} ${className}`}>
      {showPlaceholder ? (
        <div className={styles.placeholder} role="img" aria-label={alt}>
          <BrandLogo height={40} className={styles.placeholderLogo} />
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`${styles.image} ${isLoaded ? styles.imageLoaded : ''}`}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasFailed(true)}
        />
      )}
    </div>
  );
}
