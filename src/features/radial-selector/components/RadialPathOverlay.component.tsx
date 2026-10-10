'use client';

import type { RadialSelectorCtx } from '../hooks/useRadialSelector.hook';
import styles from './RadialProductSelector.module.css';

/**
 * showPath: draws in blue the ellipse the photos travel on, plus a dot on the slot of every
 * photo currently visible (moves with the spin). The ring is the "selected" spot at the top.
 */
export function RadialPathOverlay({ ctx }: { ctx: RadialSelectorCtx }) {
  const { geometry, products, getSlot } = ctx;
  const { width, centerX, centerY, radiusX, radiusY } = geometry;
  // Tall enough for the whole ellipse; W1 clips whatever falls below its bottom edge.
  const height = centerY + radiusY;

  const dots = products
    .map((product, index) => ({ id: product.id, slot: getSlot(index) }))
    .filter(({ slot }) => slot.visibility > 0)
    .map(({ id, slot }) => {
      const angleRadians = ((slot.angle - 90) * Math.PI) / 180;
      return { id, x: centerX + radiusX * Math.cos(angleRadians), y: centerY + radiusY * Math.sin(angleRadians) };
    });

  return (
    <svg className={styles.pathOverlay} width={width} height={height} aria-hidden="true">
      <ellipse cx={centerX} cy={centerY} rx={radiusX} ry={radiusY} fill="none" stroke="blue" strokeWidth={2} />
      <circle cx={centerX} cy={centerY - radiusY} r={9} fill="none" stroke="blue" strokeWidth={2} />
      {dots.map((dot) => (
        <circle key={dot.id} cx={dot.x} cy={dot.y} r={4} fill="blue" />
      ))}
    </svg>
  );
}
