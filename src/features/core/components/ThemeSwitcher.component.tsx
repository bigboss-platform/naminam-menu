'use client';

import { useEffect, useState } from 'react';
import { IS_THEME_SWITCHER, SECTION_THEME, SECTION_THEMES, type SectionTheme } from '../config/sectionTheme.config';
import styles from './ThemeSwitcher.module.css';

const THEME_LABELS: Record<SectionTheme, string> = { classic: 'Clásico', modern: 'Moderno', torn: 'Rasgado' };

/**
 * Local comparison tool (NEXT_PUBLIC_THEME_SWITCHER=true): flips data-section-theme on <html>
 * live. Never enabled on the production host — the real theme comes from NEXT_PUBLIC_SECTION_THEME.
 */
export function ThemeSwitcher() {
  const [activeTheme, setActiveTheme] = useState<SectionTheme>(SECTION_THEME);

  // Apply the chosen theme to <html> (only when the switcher is enabled).
  useEffect(() => {
    if (!IS_THEME_SWITCHER) return;
    document.documentElement.dataset.sectionTheme = activeTheme;
  }, [activeTheme]);

  if (!IS_THEME_SWITCHER) return null;

  const selectTheme = (theme: SectionTheme) => setActiveTheme(theme);

  return (
    <div className={styles.switcher} role="group" aria-label="Tema de secciones">
      {SECTION_THEMES.map((theme) => (
        <button
          key={theme}
          type="button"
          aria-pressed={theme === activeTheme}
          className={`${styles.option} ${theme === activeTheme ? styles.optionActive : ''}`}
          onClick={() => selectTheme(theme)}
        >
          {THEME_LABELS[theme]}
        </button>
      ))}
    </div>
  );
}
