/**
 * MeltingDivider patterns — the shared vocabulary for talking about drips.
 *
 *   "pattern 2, drop 3" = MELTING_PATTERNS[2].drops[2] (drops are numbered 1, 2, 3… from LEFT
 *   to RIGHT). In UI debug mode (NEXT_PUBLIC_UI_DEBUG) every drop shows its code, e.g. "D3".
 *
 * Anatomy of a drop (all sizes in screen px; drawn at the real width, so circles stay round).
 * In UI debug mode each part is outlined: edge green · shoulder red · neck orange · bulb blue.
 *
 *   ⌒⌒⌒⌒⌒⌒⌒⌒╮                ╭⌒⌒⌒⌒⌒⌒⌒⌒ edge: cosine bumps between drops (`wave` px tall) — never straight
 *   shoulder  ╰╮              ╭╯ shoulder  shoulder: quarter circle from the edge into the neck
 *              │  ← neck →   │             neck: half-width where the drop leaves the edge
 *               ╲            ╱              (wider than the bulb by default: 1.3×)
 *                ╲          ╱              then narrows smoothly into the bulb
 *                 │  bulb  │               bulb: radius of the round tip
 *                  ╰──●───╯                length: edge → bottom of the bulb
 *
 *   at: horizontal position of the drop's center, 0 = left edge … 1 = right edge.
 *
 * The edge starts at the top-left corner and curves down to `base` (unless startAtCorner: false);
 * `baseRight` slopes it. Every joint between parts is tangent-matched — no corners, no straight
 * segments.
 * Pattern 1 is the original Gemini drawing (sharp, not built from drops — see meltingShapes.util).
 * Keep drops inside the divider: base + length ≤ height − 10 (room for the shadow; default height 70).
 */

export type MeltingDrop = {
  /** 0 (left edge) … 1 (right edge): where the drop's center sits. */
  at: number;
  /** px from the edge to the bottom of the bulb. */
  length: number;
  /** px radius of the round tip. */
  bulb: number;
  /** px half-width of the neck where it leaves the edge (default: 1.3× the bulb). */
  neck?: number;
  /** px radius of the quarter circle where the drop leaves the edge (default 14). */
  shoulder?: number;
  /** Glossy shine on the upper-left of the bulb (default false). */
  highlight?: boolean;
};

export type MeltingDropsPattern = {
  kind: 'drops';
  name: string;
  /** px from the top to the icing edge, at the left side. */
  base: number;
  /** px to the edge at the right side (default = base). Different values slope the edge. */
  baseRight?: number;
  /** Max height of the cosine bumps between drops, px (default 6). Never a straight edge. */
  wave?: number;
  /** Approx. px per bump: gaps get several bumps (default: one bump per gap). */
  waveLength?: number;
  /** The edge starts at the top-left corner and curves down (default true). */
  startAtCorner?: boolean;
  /** Divider height in px for this pattern (default 70) — taller lets drops hang longer. */
  height?: number;
  /** Glossy shine along wave crests: every other bump, every bump, or none (default). */
  waveHighlight?: 'alternate' | 'all';
  drops: MeltingDrop[];
};

export type MeltingPattern =
  | MeltingDropsPattern
  /** A rolling edge with no drops: [at 0…1, px below the top] points joined smoothly. */
  | { kind: 'waves'; name: string; points: [number, number][] };

export type MeltingModel = 1 | 2 | 3 | 4 | 5;

export const MELTING_PATTERNS: Record<Exclude<MeltingModel, 1>, MeltingPattern> = {
  2: {
    kind: 'drops',
    name: 'Gotas suaves',
    base: 12,
    waveHighlight: 'alternate',
    drops: [
      { at: 0.18, length: 34, bulb: 7, highlight: true }, //  drop 1
      { at: 0.42, length: 26, bulb: 6 }, //  drop 2
      { at: 0.7, length: 46, bulb: 12, highlight: true }, //  drop 3 — the big round one (audit 2026-10-10)
      { at: 0.93, length: 24, bulb: 6 }, //  drop 4
    ],
  },
  // Pattern 2's proportions with just two drops — one really big, one medium — and more waves;
  // the edge starts low on the left and rises toward the right. 90px tall so the big drop fits.
  // Used for the pink band's divider (audit 2026-10-10).
  3: {
    kind: 'drops',
    name: 'Gota grande',
    base: 24,
    baseRight: 6,
    wave: 5,
    waveLength: 70,
    startAtCorner: false,
    height: 90,
    waveHighlight: 'alternate',
    drops: [
      { at: 0.22, length: 36, bulb: 10, highlight: true }, //  drop 1 — medium (was small: 18 / 5)
      { at: 0.6, length: 62, bulb: 17, highlight: true }, //  drop 2 — the really big one
    ],
  },
  4: {
    kind: 'drops',
    name: 'Goteo largo',
    base: 13,
    drops: [
      { at: 0.29, length: 46, bulb: 9 }, //  drop 1
      { at: 0.64, length: 38, bulb: 8 }, //  drop 2
      { at: 0.9, length: 28, bulb: 7 }, //  drop 3
    ],
  },
  5: {
    kind: 'waves',
    name: 'Ondas',
    points: [
      [0, 0], [0.075, 14], [0.2, 24], [0.325, 14], [0.45, 25], [0.575, 15], [0.7, 26], [0.825, 15],
      [0.925, 22], [1, 18],
    ],
  },
};
