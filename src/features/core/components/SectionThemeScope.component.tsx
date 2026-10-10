'use client';

import { useEffect } from 'react';
import { SECTION_THEME, type SectionTheme } from '../config/sectionTheme.config';

/**
 * Pins a section theme for one page (e.g. /test-rasgado). The theme lives on <html> because
 * the footer is part of the layout, so this sets data-section-theme there and puts the
 * site's theme back when the user navigates away.
 */
export function SectionThemeScope({ theme }: { theme: SectionTheme }) {
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.sectionTheme = theme;
    return () => {
      root.dataset.sectionTheme = SECTION_THEME;
    };
  }, [theme]);

  // On a full page load the effect only runs after hydration — this applies the theme before first paint.
  return (
    <script
      dangerouslySetInnerHTML={{ __html: `document.documentElement.dataset.sectionTheme=${JSON.stringify(theme)};` }}
    />
  );
}
