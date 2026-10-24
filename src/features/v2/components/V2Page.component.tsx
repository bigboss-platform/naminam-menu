import type { ReactNode } from 'react';
import styles from './V2Page.module.css';

type V2PageProps = {
  title: string;
  /** Short line under the title. */
  intro?: ReactNode;
  width?: 'narrow' | 'wide';
  children: ReactNode;
};

/** Inner pages of version 2: centered title in the mockup's section-title style. */
export function V2Page({ title, intro, width = 'wide', children }: V2PageProps) {
  return (
    <div className={`${styles.page} ${width === 'narrow' ? styles.narrow : ''}`}>
      <header className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        {intro && <p className={styles.intro}>{intro}</p>}
      </header>
      {children}
    </div>
  );
}
