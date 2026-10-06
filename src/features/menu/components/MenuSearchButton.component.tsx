'use client';

import type { MenuCtx } from '../hooks/useMenu.hook';
import styles from './MenuSearchButton.module.css';

/**
 * Mobile only: round search button bottom-right (above the tab bar). Opens the search
 * drawer. A dot shows while a search is applied. Hides on scroll down like the filters.
 */
export function MenuSearchButton({ ctx }: { ctx: MenuCtx }) {
  const { openSearch, query, isFiltersHidden } = ctx;
  const hasActiveSearch = query !== '';

  return (
    <button
      type="button"
      className={`${styles.button} ${isFiltersHidden ? styles.buttonHidden : ''}`}
      onClick={openSearch}
      aria-label={hasActiveSearch ? `Buscar (buscando "${query}")` : 'Buscar en el menú'}
    >
      <span className={`material-symbols-outlined ${styles.icon}`}>search</span>
      {hasActiveSearch && <span className={styles.activeDot} aria-hidden="true" />}
    </button>
  );
}
