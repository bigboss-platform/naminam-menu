'use client';

import { useEffect, useRef, useState } from 'react';
import type { MediaType } from '@/features/menu/types/Product.type';
import { ProductImage } from './ProductImage.component';
import styles from './ProductMedia.module.css';

type ProductMediaProps = {
  mediaType: MediaType;
  mediaUrl: string;
  posterUrl: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

/**
 * Photo or video (set per product in the back office). Videos are muted + looping and
 * only play while on screen (saves data/battery); with prefers-reduced-motion they stay
 * on their poster. A broken video falls back to the poster/placeholder photo.
 */
export function ProductMedia({ mediaType, mediaUrl, posterUrl, alt, sizes, priority = false, className = '' }: ProductMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasVideoFailed, setHasVideoFailed] = useState(false);
  const isVideo = mediaType === 'video' && mediaUrl !== '' && !hasVideoFailed;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.4 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [isVideo, mediaUrl]);

  if (!isVideo) {
    const imageUrl = mediaType === 'video' ? posterUrl : mediaUrl;
    return <ProductImage src={imageUrl} alt={alt} sizes={sizes} priority={priority} className={className} />;
  }

  return (
    <div className={`${styles.frame} ${className}`}>
      <video
        ref={videoRef}
        className={styles.video}
        src={mediaUrl}
        poster={posterUrl || undefined}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={alt}
        onError={() => setHasVideoFailed(true)}
      />
    </div>
  );
}
