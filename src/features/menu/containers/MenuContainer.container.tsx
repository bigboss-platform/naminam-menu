'use client';

import { MenuCategoryRail } from '../components/MenuCategoryRail.component';
import { MenuEmptyState } from '../components/MenuEmptyState.component';
import { MenuSearchButton } from '../components/MenuSearchButton.component';
import { MenuSearchSheet } from '../components/MenuSearchSheet.component';
import { MenuSection } from '../components/MenuSection.component';
import { MenuSkeleton } from '../components/MenuSkeleton.component';
import { MenuToolbar } from '../components/MenuToolbar.component';
import { useMenu } from '../hooks/useMenu.hook';
import styles from './MenuContainer.module.css';

export function MenuContainer() {
  const ctx = useMenu();
  return (
    <>
      <div className={`${styles.page} page-fade-in`}>
        <header className={styles.header}>
          <h1 className={`${styles.title} font-display`}>Nuestro menú</h1>
          <p className={styles.subtitle}>Porciones y cheesecakes para disfrutar o encargar.</p>
        </header>
        {/* Desktop: sticky toolbar */}
        <MenuToolbar ctx={ctx} />
        {ctx.isFiltering ? (
          <MenuSkeleton />
        ) : ctx.hasResults ? (
          ctx.sections.map((section) => <MenuSection key={section.category.id} section={section} />)
        ) : (
          <MenuEmptyState ctx={ctx} />
        )}
      </div>

      {/*
        Mobile screen-fixed controls. They MUST live outside `.page-fade-in`: its transform
        animation (fill-mode both) turns the wrapper into the containing block for
        position:fixed children, which would pin them to the long page instead of the screen.
      */}
      <MenuCategoryRail ctx={ctx} />
      <MenuSearchButton ctx={ctx} />
      <MenuSearchSheet ctx={ctx} />
    </>
  );
}
