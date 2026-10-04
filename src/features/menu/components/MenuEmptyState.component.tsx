import type { MenuCtx } from '../hooks/useMenuFilter.hook';
import styles from './MenuEmptyState.module.css';

export function MenuEmptyState({ ctx }: { ctx: MenuCtx }) {
  const { query, resetFilters } = ctx;
  return (
    <div className={styles.empty}>
      <span className={`material-symbols-outlined ${styles.icon}`}>search_off</span>
      <p className={styles.title}>{query ? `No encontramos “${query}”` : 'No hay postres aquí todavía'}</p>
      <p className={styles.text}>Prueba con otro nombre o mira todo el menú.</p>
      <button type="button" className={styles.action} onClick={resetFilters}>
        Ver todo el menú
      </button>
    </div>
  );
}
