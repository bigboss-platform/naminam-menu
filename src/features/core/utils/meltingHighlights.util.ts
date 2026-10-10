import type { MeltingPattern } from '../config/meltingPatterns.config';
import { getPatternPieces, type MeltingPiece } from './meltingShapes.util';

/**
 * Highlight rule (audit 2026-10-10): a white line that follows the outline exactly, drawn
 * only where the outline RISES read left to right (it moves up, away from the bottom — a
 * positive slope in math terms; in SVG the end point's y is smaller than the start's).
 *   - drop: its right side — bulb bottom → right neck → right shoulder.
 *   - wave: the rising half of each bump.
 * Which drops/waves shine: `highlight` on a drop, `waveHighlight` on the pattern
 * (config/meltingPatterns.config.ts). The divider clips the line to the inside of the icing,
 * so it hugs the edge from within.
 */

/** Below this (px), a piece counts as flat, not rising. */
const RISE_THRESHOLD = 0.5;

const r1 = (value: number) => Math.round(value * 10) / 10;

const isRising = (piece: MeltingPiece) => piece.from[1] - piece.to[1] > RISE_THRESHOLD;

/** SVG paths for the highlight lines: consecutive rising pieces are joined into one line. */
export function getPatternHighlights(pattern: MeltingPattern, width: number): string[] {
  if (pattern.kind !== 'drops') return [];
  // Pieces number drops left to right (D1 = 0), like getPatternDrops
  const drops = [...pattern.drops].sort((a, b) => a.at - b.at);
  const isChosen = (piece: MeltingPiece) => {
    if (piece.drop !== undefined) return drops[piece.drop]?.highlight === true;
    if (piece.bump === undefined || !pattern.waveHighlight) return false;
    return pattern.waveHighlight === 'all' || piece.bump % 2 === 0;
  };
  const lines: string[] = [];
  let current: string[] = [];
  const closeLine = () => {
    if (current.length > 0) lines.push(current.join(' '));
    current = [];
  };
  for (const piece of getPatternPieces(pattern, width)) {
    if (!isRising(piece) || !isChosen(piece)) {
      closeLine();
      continue;
    }
    if (current.length === 0) current.push(`M${r1(piece.from[0])},${r1(piece.from[1])}`);
    current.push(piece.d);
  }
  closeLine();
  return lines;
}
