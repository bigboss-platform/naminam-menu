'use client';

import { BottomSheet } from '@/features/core/components/BottomSheet.component';
import type { MenuCtx } from '../hooks/useMenu.hook';
import styles from './MenuSearchSheet.module.css';

/**
 * Mobile search drawer — one row: search field + trash button on the right.
 * Results update while typing (debounced); the keyboard's search key closes the drawer.
 */
export function MenuSearchSheet({ ctx }: { ctx: MenuCtx }) {
  const { isSearchOpen, closeSearch, searchDraft, onSearchInput, clearSearch } = ctx;

  return (
    <BottomSheet open={isSearchOpen} onClose={closeSearch} title="Buscar en el menú">
      <form
        className={styles.row}
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          closeSearch();
        }}
      >
        <label className={styles.field}>
          <span className="material-symbols-outlined">search</span>
          <span className="visually-hidden">¿Qué postre buscas?</span>
          <input
            type="search"
            value={searchDraft}
            onChange={(event) => onSearchInput(event.target.value)}
            placeholder="Busca Matilda, cheesecake, Nutella…"
            className={styles.input}
            enterKeyHint="search"
            autoComplete="off"
            autoFocus
          />
        </label>
        <button type="button" className={styles.trashButton} onClick={clearSearch} aria-label="Borrar búsqueda">
          <span className="material-symbols-outlined">delete</span>
        </button>
      </form>
    </BottomSheet>
  );
}
