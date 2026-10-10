/**
 * How home sections are separated (see globals.css "Section themes"):
 * - "classic": the original look.
 * - "modern": info blocks as soft cards with consistent spacing.
 * - "torn": full-width paper bands in alternating tones with torn top edges.
 * Applied as data-section-theme on <html>; themes are pure CSS.
 */
export const SECTION_THEMES = ['classic', 'modern', 'torn'] as const;

export type SectionTheme = (typeof SECTION_THEMES)[number];

/** The site's theme when NEXT_PUBLIC_SECTION_THEME is missing or unknown — "modern" chosen 2026-10-10. */
const DEFAULT_SECTION_THEME: SectionTheme = 'modern';

function toSectionTheme(value: string): SectionTheme {
  return SECTION_THEMES.find((theme) => theme === value) ?? DEFAULT_SECTION_THEME;
}

/** Chosen with NEXT_PUBLIC_SECTION_THEME (DEFAULT_SECTION_THEME when missing or unknown). */
export const SECTION_THEME: SectionTheme = toSectionTheme(process.env.NEXT_PUBLIC_SECTION_THEME ?? '');

/** Local comparison only: a small switcher to flip themes live (NEXT_PUBLIC_THEME_SWITCHER=true). */
export const IS_THEME_SWITCHER = process.env.NEXT_PUBLIC_THEME_SWITCHER === 'true';
