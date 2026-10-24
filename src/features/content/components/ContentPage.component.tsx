import type { ReactNode } from 'react';
import styles from './ContentPage.module.css';

type ContentPageProps = {
  title: string;
  /** Small colored line above the title. */
  eyebrow?: string;
  intro?: ReactNode;
  /** "narrow" for reading pages and forms. */
  width?: 'narrow' | 'wide';
  children: ReactNode;
};

/** Shared shell for the inner pages: title block + content column. */
export function ContentPage({ title, eyebrow = '', intro, width = 'wide', children }: ContentPageProps) {
  return (
    <div className={`${styles.page} ${width === 'narrow' ? styles.narrow : ''} page-fade-in`}>
      <header className={styles.header}>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <h1 className={`${styles.title} font-display`}>{title}</h1>
        {intro && <div className={styles.intro}>{intro}</div>}
      </header>
      {children}
    </div>
  );
}
