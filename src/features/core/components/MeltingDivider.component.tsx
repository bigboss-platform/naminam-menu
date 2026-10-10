'use client';

import { useId } from 'react';
import styles from './MeltingDivider.module.css';

/** Icing edge with drips (from gemini-code-1791659099906.html, Downloads). 1200 × 120 drawing. */
const MELT_PATH =
  'M0,0 L1200,0 L1200,20 C1160,20 1140,40 1140,55 C1140,70 1155,80 1155,90 C1155,98 1140,102 1130,95 ' +
  'C1120,88 1115,65 1110,45 L1000,20 C950,20 930,55 930,75 C930,90 945,102 945,112 C945,118 932,120 925,112 ' +
  'C918,104 912,80 905,55 L800,20 C740,20 720,40 680,40 C640,40 620,20 580,20 C480,20 440,60 415,85 ' +
  'C400,100 385,95 385,80 C385,60 400,35 390,25 L300,20 C220,20 190,70 180,90 C175,100 162,100 157,85 ' +
  'C152,70 160,40 145,25 L0,20 Z';

type MeltingDividerProps = {
  /** Icing color — match the section above so the drips look like they melt from it. */
  color?: string;
  /** Drawn height in px (the drawing stretches to the full width). */
  height?: number;
};

/** Decorative divider: a band of icing whose bottom edge drips onto the next section. */
export function MeltingDivider({ color = 'var(--c-icing)', height = 70 }: MeltingDividerProps) {
  // Unique per instance: two dividers on one page must not share the shadow filter's id.
  const shadowId = `melt-shadow-${useId().replace(/:/g, '')}`;

  return (
    <div className={styles.container} aria-hidden="true">
      <svg
        className={styles.divider}
        style={{ height }}
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Soft drop shadow, cacao-tinted like the rest of the site's shadows */}
          <filter id={shadowId} x="-10%" y="-10%" width="120%" height="160%">
            <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#3d2314" floodOpacity="0.15" />
          </filter>
        </defs>
        <path d={MELT_PATH} style={{ fill: color }} filter={`url(#${shadowId})`} />
      </svg>
    </div>
  );
}
