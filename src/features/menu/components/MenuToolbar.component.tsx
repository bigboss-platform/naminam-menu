'use client';

import type { MenuCtx } from '../hooks/useMenuFilter.hook';
import styles from './MenuToolbar.module.css';

/** Sticky search + category pills. Pills scroll horizontally, never wrap. */
export function MenuToolbar({ ctx }: { ctx: MenuCtx }) {
  const { query, setQuery, pills, activeFilter, setActiveFilter } = ctx;

  return (
    <div className={styles.toolbar}>
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

      <div className={styles.pills} role="tablist" aria-label="Categorías">
        {pills.map((pill) => {
          const isActive = pill.id === activeFilter;
          return (
            <button
              key={pill.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`${styles.pill} ${isActive ? styles.pillActive : ''}`}
              onClick={() => setActiveFilter(pill.id)}
            >
              {pill.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
