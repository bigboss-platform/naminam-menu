import type { MeltingDrop, MeltingDropsPattern, MeltingPattern } from '../config/meltingPatterns.config';

/**
 * Geometry for MeltingDivider. Pattern 1 is the original Gemini drawing in a 1200 × 120 box
 * (stretched to fit). Patterns 2–4 (config/meltingPatterns.config.ts) are drawn at the real
 * width × height in px (bulbs stay circular) as a chain of named pieces — edge, shoulder,
 * neck, bulb — each starting where the previous one ends with the same tangent: no corners,
 * no straight segments. The icing fills everything above the edge.
 */

/** Model 1 — original Gemini drip divider (gemini-code-1791659099906.html). */
export const ORIGINAL_PATH =
  'M0,0 L1200,0 L1200,20 C1160,20 1140,40 1140,55 C1140,70 1155,80 1155,90 C1155,98 1140,102 1130,95 ' +
  'C1120,88 1115,65 1110,45 L1000,20 C950,20 930,55 930,75 C930,90 945,102 945,112 C945,118 932,120 925,112 ' +
  'C918,104 912,80 905,55 L800,20 C740,20 720,40 680,40 C640,40 620,20 580,20 C480,20 440,60 415,85 ' +
  'C400,100 385,95 385,80 C385,60 400,35 390,25 L300,20 C220,20 190,70 180,90 C175,100 162,100 157,85 ' +
  'C152,70 160,40 145,25 L0,20 Z';

export type MeltingPart = 'edge' | 'shoulder' | 'neck' | 'bulb';

type XY = readonly [number, number];

/**
 * One piece of the outline, from `from` to `to`; `d` is its SVG command. For highlights:
 * `drop` = index of the drop it belongs to (0 = D1), `bump` = index of the wave bump (0, 1, 2…
 * left to right; each bump is a rising piece then a falling piece).
 */
export type MeltingPiece = { part: MeltingPart; from: XY; to: XY; d: string; drop?: number; bump?: number };

/** Bézier handle length for a quarter circle (the "sin/cos" curve of a round corner). */
const KAPPA = 0.5523;
const DEFAULT_SHOULDER = 14;
const DEFAULT_WAVE = 6;
const NECK_TO_BULB = 1.3;

const r1 = (value: number) => Math.round(value * 10) / 10;
const pt = (x: number, y: number) => `${r1(x)},${r1(y)}`;

/** Where a drop is drawn on a divider `width` px wide. */
export function getDropGeometry(drop: MeltingDrop, base: number, width: number) {
  const x = drop.at * width;
  const bulb = drop.bulb;
  const neck = drop.neck ?? bulb * NECK_TO_BULB;
  const tipY = base + drop.length;
  const bulbCenterY = tipY - bulb;
  // The shoulder must end above the bulb, or the neck would have to go upward
  const shoulder = Math.max(2, Math.min(drop.shoulder ?? DEFAULT_SHOULDER, bulbCenterY - base - 2));
  return { x, bulb, neck, shoulder, tipY, bulbCenterY, left: x - neck - shoulder, right: x + neck + shoulder };
}

/** Shoulder ↘ (quarter circle), neck narrowing into the bulb, round tip, neck ↑, shoulder ↗. */
function dropPieces(drop: MeltingDrop, base: number, width: number, dropIndex: number): MeltingPiece[] {
  const { x, bulb, neck, shoulder, bulbCenterY, left, right } = getDropGeometry(drop, base, width);
  const neckTop = base + shoulder;
  const handle = (bulbCenterY - neckTop) / 2;
  const k = shoulder * KAPPA;
  const r = r1(bulb);
  const bottom: XY = [x, bulbCenterY + bulb];
  const piece = (part: MeltingPart, from: XY, to: XY, d: string): MeltingPiece => ({ part, from, to, d, drop: dropIndex });
  // Left side goes down, right side comes back up (the bulb is split at its bottom point)
  return [
    piece('shoulder', [left, base], [x - neck, neckTop], `C${pt(left + k, base)} ${pt(x - neck, neckTop - k)} ${pt(x - neck, neckTop)}`),
    piece('neck', [x - neck, neckTop], [x - bulb, bulbCenterY], `C${pt(x - neck, neckTop + handle)} ${pt(x - bulb, bulbCenterY - handle)} ${pt(x - bulb, bulbCenterY)}`),
    piece('bulb', [x - bulb, bulbCenterY], bottom, `A${r},${r} 0 0 0 ${pt(bottom[0], bottom[1])}`),
    piece('bulb', bottom, [x + bulb, bulbCenterY], `A${r},${r} 0 0 0 ${pt(x + bulb, bulbCenterY)}`),
    piece('neck', [x + bulb, bulbCenterY], [x + neck, neckTop], `C${pt(x + bulb, bulbCenterY - handle)} ${pt(x + neck, neckTop + handle)} ${pt(x + neck, neckTop)}`),
    piece('shoulder', [x + neck, neckTop], [right, base], `C${pt(x + neck, neckTop - k)} ${pt(right - k, base)} ${pt(right, base)}`),
  ];
}

/** px from the top to the icing edge at `x` (the edge slopes from `base` to `baseRight`). */
function edgeYAt(pattern: MeltingDropsPattern, x: number, width: number): number {
  const right = pattern.baseRight ?? pattern.base;
  return pattern.base + (right - pattern.base) * Math.min(Math.max(x / width, 0), 1);
}

/** Every drop of a pattern with its edge level and geometry, left to right (also used for debug labels). */
export function getPatternDrops(pattern: MeltingDropsPattern, width: number) {
  return [...pattern.drops]
    .sort((a, b) => a.at - b.at)
    .map((drop) => {
      const edgeY = edgeYAt(pattern, drop.at * width, width);
      return { drop, edgeY, geometry: getDropGeometry(drop, edgeY, width) };
    });
}

/**
 * Edge between two points: cosine bumps (about `waveLength` px each), every one flat at both
 * ends so all joints stay smooth — the edge is never a straight line.
 */
function bumpPieces(
  from: readonly [number, number],
  to: readonly [number, number],
  wave: number,
  waveLength: number,
  firstBump: number,
): MeltingPiece[] {
  const span = to[0] - from[0];
  if (span < 1) return [];
  const count = Math.max(1, Math.round(span / waveLength));
  const pieces: MeltingPiece[] = [];
  for (let index = 0; index < count; index += 1) {
    const bump = firstBump + index;
    const startX = from[0] + (span * index) / count;
    const endX = from[0] + (span * (index + 1)) / count;
    const startY = from[1] + ((to[1] - from[1]) * index) / count;
    const endY = from[1] + ((to[1] - from[1]) * (index + 1)) / count;
    const midX = (startX + endX) / 2;
    const peakY = (startY + endY) / 2 - Math.min(wave, (endX - startX) / 6);
    const quarter = (endX - startX) / 4;
    pieces.push(
      { part: 'edge', bump, from: [startX, startY], to: [midX, peakY], d: `C${pt(startX + quarter, startY)} ${pt(midX - quarter, peakY)} ${pt(midX, peakY)}` },
      { part: 'edge', bump, from: [midX, peakY], to: [endX, endY], d: `C${pt(midX + quarter, peakY)} ${pt(endX - quarter, endY)} ${pt(endX, endY)}` },
    );
  }
  return pieces;
}

function dropsPieces(pattern: MeltingDropsPattern, width: number): MeltingPiece[] {
  const wave = pattern.wave ?? DEFAULT_WAVE;
  const drops = getPatternDrops(pattern, width);
  const waveLength = pattern.waveLength ?? width;
  const pieces: MeltingPiece[] = [];
  let cursor: readonly [number, number] = [0, edgeYAt(pattern, 0, width)];
  if (pattern.startAtCorner ?? true) {
    // From the top-left corner, ease down to the edge (horizontal at both ends)
    const firstLeft = drops.length > 0 ? drops[0].geometry.left : width;
    const lead = Math.max(8, Math.min(firstLeft, width * 0.08));
    const leadY = edgeYAt(pattern, lead, width);
    pieces.push({ part: 'edge', from: [0, 0], to: [lead, leadY], d: `C${pt(lead / 2, 0)} ${pt(lead / 2, leadY)} ${pt(lead, leadY)}` });
    cursor = [lead, leadY];
  }
  let bumpCount = 0;
  const addBumps = (to: readonly [number, number]) => {
    const bumps = bumpPieces(cursor, to, wave, waveLength, bumpCount);
    bumpCount += bumps.length / 2;
    pieces.push(...bumps);
  };
  drops.forEach(({ drop, edgeY, geometry }, dropIndex) => {
    addBumps([geometry.left, edgeY]);
    pieces.push(...dropPieces(drop, edgeY, width, dropIndex));
    cursor = [geometry.right, edgeY];
  });
  addBumps([width, edgeYAt(pattern, width, width)]);
  return pieces;
}

/** Catmull-Rom through the points as cubic Béziers: passes every point, continuous tangent. */
function wavesPieces(points: [number, number][], width: number): MeltingPiece[] {
  const px = points.map(([at, y]) => [at * width, y] as const);
  const at = (index: number) => px[Math.min(Math.max(index, 0), px.length - 1)];
  return px.slice(1).map((end, index) => {
    const [x0, y0] = at(index - 1);
    const [x1, y1] = at(index);
    const [x3, y3] = at(index + 2);
    return {
      part: 'edge',
      from: [x1, y1],
      to: end,
      d: `C${pt(x1 + (end[0] - x0) / 6, y1 + (end[1] - y0) / 6)} ${pt(end[0] - (x3 - x1) / 6, end[1] - (y3 - y1) / 6)} ${pt(end[0], end[1])}`,
    };
  });
}

/** The outline of a pattern drawn `width` px wide, as named pieces (left to right). */
export function getPatternPieces(pattern: MeltingPattern, width: number): MeltingPiece[] {
  return pattern.kind === 'drops' ? dropsPieces(pattern, width) : wavesPieces(pattern.points, width);
}

/** Filled SVG path: the pieces in a row, then back along the top edge (via both top corners). */
export function getPatternPath(pattern: MeltingPattern, width: number): string {
  const pieces = getPatternPieces(pattern, width);
  const [startX, startY] = pieces[0].from;
  return `M${pt(startX, startY)} ${pieces.map((piece) => piece.d).join(' ')} L${pt(width, 0)} L0,0 Z`;
}
