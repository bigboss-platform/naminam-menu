import styles from './MenuSkeleton.module.css';

const SKELETON_CARD_COUNT = 3;

/** Shown for well under a second after a filter/search change — mirrors the real card layout. */
export function MenuSkeleton() {
  return (
    <div className={styles.skeleton} aria-busy="true" aria-label="Cargando postres">
      <div className={`${styles.block} ${styles.title}`} />
      <div className={styles.grid}>
        {Array.from({ length: SKELETON_CARD_COUNT }, (_, index) => (
          <div key={index} className={styles.card}>
            <div className={`${styles.block} ${styles.photo}`} />
            <div className={styles.body}>
              <div className={`${styles.block} ${styles.lineWide}`} />
              <div className={`${styles.block} ${styles.line}`} />
              <div className={styles.footer}>
                <div className={`${styles.block} ${styles.lineShort}`} />
                <div className={`${styles.block} ${styles.circle}`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
