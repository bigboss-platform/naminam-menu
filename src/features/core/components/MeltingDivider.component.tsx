'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { MELTING_PATTERNS, type MeltingModel } from '../config/meltingPatterns.config';
import { IS_UI_DEBUG } from '../config/uiDebug.config';
import { getPatternHighlights } from '../utils/meltingHighlights.util';
import { getPatternDrops, getPatternPath, getPatternPieces, ORIGINAL_PATH, type MeltingPart } from '../utils/meltingShapes.util';
import styles from './MeltingDivider.module.css';

/** Width used until the divider has been measured (server render). */
const DEFAULT_WIDTH = 1200;
const DEFAULT_HEIGHT = 70;
/** How far (px) around the drawing the shadow may reach. */
const SHADOW_MARGIN = 24;
/** Highlight line: drawn on the edge and clipped to the icing, so half of it (2px) shows. */
const HIGHLIGHT_STROKE = 4;
const HIGHLIGHT_OPACITY = 0.6;

/** UI debug outline colors per part of the shape (see config/meltingPatterns.config.ts). */
const PART_COLORS: Record<MeltingPart, string> = { edge: 'green', shoulder: 'red', neck: 'orange', bulb: 'blue' };

type MeltingDividerProps = {
  /** Icing color — match the section above so the drips look like they melt from it. */
  color?: string;
  /** Height in px (default: the pattern's own height, else 70). */
  height?: number;
  /**
   * Pattern (config/meltingPatterns.config.ts): 1 original Gemini drips (sharp, stretched),
   * 2 soft drips, 3 big drop (sloped, wavy), 4 long drips, 5 waves. 2–5 are smooth and drawn
   * at real size; drops are numbered left to right.
   */
  model?: MeltingModel;
};

/** Decorative divider: a band of icing whose bottom edge drips onto the next section. */
export function MeltingDivider({ color = 'var(--c-icing)', height: heightProp, model = 1 }: MeltingDividerProps) {
  // Unique per instance: two dividers on one page must not share the shadow filter's id.
  const instanceId = useId().replace(/:/g, '');
  const shadowId = `melt-shadow-${instanceId}`;
  const clipId = `melt-clip-${instanceId}`;
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(DEFAULT_WIDTH);

  // Patterns 2–4 are drawn at the real width so bulbs stay round (ResizeObserver reports on observe).
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width || DEFAULT_WIDTH));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const pattern = model === 1 ? undefined : MELTING_PATTERNS[model];
  const patternHeight = pattern?.kind === 'drops' ? pattern.height : undefined;
  const height = heightProp ?? patternHeight ?? DEFAULT_HEIGHT;
  const path = pattern ? getPatternPath(pattern, width) : ORIGINAL_PATH;
  const viewWidth = pattern ? width : 1200;
  const viewHeight = pattern ? height : 120;
  const viewBox = `0 0 ${viewWidth} ${viewHeight}`;
  const highlights = pattern ? getPatternHighlights(pattern, width) : [];
  // UI debug: every part outlined in its color, and each drop's code on its bulb
  const debugPieces = IS_UI_DEBUG && pattern ? getPatternPieces(pattern, width) : [];
  const dropLabels =
    IS_UI_DEBUG && pattern?.kind === 'drops'
      ? getPatternDrops(pattern, width).map(({ geometry }, index) => ({
          code: `D${index + 1}`,
          x: geometry.x,
          y: geometry.bulbCenterY,
        }))
      : [];

  return (
    <div ref={containerRef} className={styles.container} aria-hidden="true">
      <svg className={styles.divider} style={{ height }} viewBox={viewBox} preserveAspectRatio="none">
        <defs>
          {/* Two-layer shadow, cacao-tinted like the site's other shadows: a tight one that
              defines the edge + a soft one for depth. The region reaches below the drawing so
              the shadow spills onto the next section (the SVG has overflow: visible). */}
          <filter
            id={shadowId}
            filterUnits="userSpaceOnUse"
            x={-SHADOW_MARGIN}
            y={-SHADOW_MARGIN}
            width={viewWidth + SHADOW_MARGIN * 2}
            height={viewHeight + SHADOW_MARGIN * 2}
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" result="tightBlur" />
            <feOffset in="tightBlur" dy="2" result="tightOffset" />
            <feFlood floodColor="#3d2314" floodOpacity="0.32" />
            <feComposite in2="tightOffset" operator="in" result="tightShadow" />
            <feGaussianBlur in="SourceAlpha" stdDeviation="7" result="softBlur" />
            <feOffset in="softBlur" dy="9" result="softOffset" />
            <feFlood floodColor="#3d2314" floodOpacity="0.26" />
            <feComposite in2="softOffset" operator="in" result="softShadow" />
            <feMerge>
              <feMergeNode in="softShadow" />
              <feMergeNode in="tightShadow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path d={path} style={{ fill: color }} filter={`url(#${shadowId})`} />
        {/* Highlights: white line along the RISING parts of chosen drops/waves (meltingHighlights.util).
            Clipped to the icing, so only the inner half of the stroke shows — it hugs the edge from inside. */}
        <clipPath id={clipId}>
          <path d={path} />
        </clipPath>
        <g clipPath={`url(#${clipId})`}>
          {highlights.map((line, index) => (
            <path
              key={index}
              d={line}
              fill="none"
              stroke="#fff"
              strokeOpacity={HIGHLIGHT_OPACITY}
              strokeWidth={HIGHLIGHT_STROKE}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </g>
        {debugPieces.map((piece, index) => (
          <path
            key={index}
            d={`M${piece.from[0]},${piece.from[1]} ${piece.d}`}
            fill="none"
            stroke={PART_COLORS[piece.part]}
            strokeWidth={1.5}
          />
        ))}
        {/* UI debug: drop codes ("D3" = drop 3 from the left) */}
        {dropLabels.map((label) => (
          <text key={label.code} x={label.x} y={label.y} className={styles.dropLabel}>
            {label.code}
          </text>
        ))}
      </svg>
    </div>
  );
}
