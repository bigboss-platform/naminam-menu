'use client';

import { MenuEmptyState } from '../components/MenuEmptyState.component';
import { MenuSection } from '../components/MenuSection.component';
import { MenuToolbar } from '../components/MenuToolbar.component';
import { useMenuFilter } from '../hooks/useMenuFilter.hook';
import styles from './MenuContainer.module.css';

export function MenuContainer() {
  const ctx = useMenuFilter();
  return (
    <div className={`${styles.page} page-fade-in`}>
      <header className={styles.header}>
        <h1 className={`${styles.title} font-display`}>Nuestro menú</h1>
        <p className={styles.subtitle}>Porciones y cheesecakes para disfrutar o encargar.</p>
      </header>
      <MenuToolbar ctx={ctx} />
      {ctx.hasResults ? (
        ctx.sections.map((section) => <MenuSection key={section.category.id} section={section} />)
      ) : (
        <MenuEmptyState ctx={ctx} />
      )}
    </div>
  );
}
