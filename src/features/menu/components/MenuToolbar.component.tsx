'use client';

import type { MenuCtx } from '../hooks/useMenu.hook';
import styles from './MenuToolbar.module.css';

/**
 * Desktop/tablet only (mobile uses MenuCategoryRail + the search button/drawer).
 * Sticky search + category pills; slides away while scrolling down.
 */
export function MenuToolbar({ ctx }: { ctx: MenuCtx }) {
  const { query, setQuery, pills, activeFilter, toggleCategory, isFiltersHidden } = ctx;

  return (
    <div className={`${styles.toolbar} ${isFiltersHidden ? styles.toolbarHidden : ''}`}>
      <label className={styles.search}>
        <span className="material-symbols-outlined">search</span>
        <span className="visually-hidden">Buscar en el menú</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Busca Matilda, cheesecake, Nutella…"
          className={styles.searchInput}
          enterKeyHint="search"
          autoComplete="off"
        />
        {query && (
          <button type="button" className={styles.clear} onClick={() => setQuery('')} aria-label="Borrar búsqueda">
            <span className="material-symbols-outlined">close</span>
          </button>
        )}
      </label>

      <div className={styles.pills} role="group" aria-label="Categorías">
        {pills.map((pill) => {
          const isActive = pill.id === activeFilter;
          return (
            <button
              key={pill.id}
              type="button"
              aria-pressed={isActive}
              className={`${styles.pill} ${isActive ? styles.pillActive : ''}`}
              onClick={() => toggleCategory(pill.id)}
            >
              {pill.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
