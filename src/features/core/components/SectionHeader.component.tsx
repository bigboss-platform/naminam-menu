import type { ReactNode } from 'react';
import styles from './SectionHeader.module.css';

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  /** Right-aligned slot: a count, a "Ver todo" link… */
  aside?: ReactNode;
  id?: string;
};

export function SectionHeader({ eyebrow = '', title, aside, id }: SectionHeaderProps) {
  return (
    <div className={styles.header}>
      <div>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <h2 id={id} className={`${styles.title} font-display`}>
          {title}
        </h2>
      </div>
      {aside && <div className={styles.aside}>{aside}</div>}
    </div>
  );
}
