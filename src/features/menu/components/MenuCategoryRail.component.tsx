'use client';

import type { MenuCtx } from '../hooks/useMenu.hook';
import styles from './MenuCategoryRail.module.css';

/** Icon per category for the round rail buttons (experiment — text labels were the previous version). */
const CATEGORY_ICONS: Record<string, string> = {
  racion: 'cake',
  sbriciolata: 'bakery_dining',
  cheesecake: 'pie_chart',
};

/**
 * Mobile only: categories as round icon buttons stacked vertically, fixed to the left
 * edge and vertically centered on screen. No "Todos" — tap the selected one again to
 * show all. Slides off to the left while scrolling down, comes back on scroll up.
 */
export function MenuCategoryRail({ ctx }: { ctx: MenuCtx }) {
  const { pills, activeFilter, toggleCategory, isFiltersHidden } = ctx;

  return (
    <nav
      className={`${styles.rail} ${isFiltersHidden ? styles.railHidden : ''}`}
      aria-label="Categorías"
    >
      {pills.map((pill) => {
        const isActive = pill.id === activeFilter;
        return (
          <button
            key={pill.id}
            type="button"
            aria-pressed={isActive}
            aria-label={pill.label}
            title={pill.label}
            className={`${styles.button} ${isActive ? styles.buttonActive : ''}`}
            onClick={() => toggleCategory(pill.id)}
          >
            <span className={`material-symbols-outlined ${isActive ? 'icon-filled' : ''}`}>
              {CATEGORY_ICONS[pill.id]}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
