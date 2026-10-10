'use client';

import type { CSSProperties } from 'react';
import { ProductMedia } from '@/features/core/components/ProductMedia.component';
import { UiDebugTag } from '@/features/core/components/UiDebugTag.component';
import { formatPrice } from '@/features/core/utils/format.util';
import type { RadialSelectorCtx } from '../hooks/useRadialSelector.hook';
import type { RadialProduct } from '../types/RadialProduct.type';
import styles from './RadialProductSelector.module.css';

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

type RadialProductCardProps = {
  ctx: RadialSelectorCtx;
  product: RadialProduct;
  index: number;
};

/** One photo on the ellipse — just the picture, nothing around it. Position + tilt come from its angle. */
export function RadialProductCard({ ctx, product, index }: RadialProductCardProps) {
  const { geometry, selectedIndex, getSlot, onCardClick, onCardKeyDown } = ctx;
  const isSelected = index === selectedIndex;
  const { angle, distance, visibility } = getSlot(index);

  // angle 0 = the selected spot at the top of the ellipse
  const angleRadians = ((angle - 90) * Math.PI) / 180;
  const x = geometry.centerX + geometry.radiusX * Math.cos(angleRadians);
  const y = geometry.centerY + geometry.radiusY * Math.sin(angleRadians);

  // Mostly upright, with a restrained tangent-like tilt.
  const tilt = clamp(angle * 0.2, -16, 16);
  // Everything eases with the distance from the selected spot, so turning is smooth along the path:
  // size (selected → side), dimming (side photos 50%), and the fade at the edge of the visible group.
  const nearness = 1 - Math.min(distance, 1);
  const scale = geometry.unselectedScale + (geometry.selectedScale - geometry.unselectedScale) * nearness;
  const opacity = visibility * (0.5 + 0.5 * nearness);
  const isHidden = visibility === 0;

  const cardStyle: CSSProperties = {
    left: x,
    top: y,
    width: geometry.cardWidth,
    height: geometry.cardHeight,
    transform: `translate(-50%, -50%) rotate(${tilt}deg) scale(${scale})`,
    opacity,
    zIndex: Math.round(100 - distance * 10),
  };

  return (
    <button
      type="button"
      className={`${styles.product} ${isHidden ? styles.productHidden : ''}`}
      style={cardStyle}
      onClick={() => onCardClick(index)}
      onKeyDown={(event) => {
        if (onCardKeyDown(event.key)) event.preventDefault();
      }}
      aria-pressed={isSelected}
      aria-label={`${product.name}, ${formatPrice(product.price)}`}
      tabIndex={isSelected ? 0 : -1}
    >
      <ProductMedia
        mediaType={product.mediaType}
        mediaUrl={product.mediaUrl}
        posterUrl={product.posterUrl}
        alt={product.name}
        // Selected photo: ~390px wide from a 600px-wide component (≈640px screen) up, 180px on phones
        sizes="(min-width: 640px) 400px, 180px"
        className={styles.photo}
      />
      <UiDebugTag code={`W4·${index + 1}`} />
    </button>
  );
}
