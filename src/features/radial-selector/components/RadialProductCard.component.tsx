'use client';

import type { CSSProperties } from 'react';
import { ProductImage } from '@/features/core/components/ProductImage.component';
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

/** One card on the ellipse. Position + tilt come from its angle around the wheel. */
export function RadialProductCard({ ctx, product, index }: RadialProductCardProps) {
  const { geometry, itemStep, rotation, selectedIndex, onCardClick, onCardKeyDown } = ctx;
  const isSelected = index === selectedIndex;

  const angleDegrees = index * itemStep + rotation - 90;
  const angleRadians = (angleDegrees * Math.PI) / 180;
  const x = geometry.centerX + geometry.radiusX * Math.cos(angleRadians);
  const y = geometry.centerY + geometry.radiusY * Math.sin(angleRadians);

  // Mostly upright, with a restrained tangent-like tilt.
  const relativeAngle = (((angleDegrees + 90) % 360) + 360) % 360;
  const signedAngle = relativeAngle > 180 ? relativeAngle - 360 : relativeAngle;
  const tilt = clamp(signedAngle * 0.2, -16, 16);

  const cardStyle: CSSProperties = {
    left: x,
    top: y,
    width: geometry.cardWidth,
    height: geometry.cardHeight,
    transform: `translate(-50%, -50%) rotate(${tilt}deg) scale(${isSelected ? 1 : 0.92})`,
    zIndex: isSelected ? 3 : 1,
  };

  return (
    <button
      type="button"
      className={`${styles.product} ${isSelected ? styles.productSelected : ''}`}
      style={cardStyle}
      onClick={() => onCardClick(index)}
      onKeyDown={(event) => {
        if (onCardKeyDown(event.key, index)) event.preventDefault();
      }}
      aria-pressed={isSelected}
      aria-label={`${product.name}, ${formatPrice(product.price)}`}
      tabIndex={isSelected ? 0 : -1}
    >
      <span className={styles.imageWrap}>
        <ProductImage src={product.imageUrl} alt={product.name} sizes="146px" />
      </span>
      <span className={styles.productName}>{product.name}</span>
      <span className={styles.productPrice}>{formatPrice(product.price)}</span>
      {isSelected && (
        <span className={styles.selectedMark} aria-hidden="true">
          <span className="material-symbols-outlined">check</span>
        </span>
      )}
    </button>
  );
}
