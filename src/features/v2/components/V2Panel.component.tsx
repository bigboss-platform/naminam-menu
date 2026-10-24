import type { ReactNode } from 'react';
import styles from './V2Panel.module.css';

type V2PanelProps = {
  /** Text of the floating tab on the top edge (mockup "¿Algo personalizado?"). */
  title: string;
  /** "pink" = the mockup form card; the others reuse its shape on inner pages. */
  tone?: 'pink' | 'cream' | 'teal' | 'yellow';
  /** Heading level of the tab (h1 on pages whose main title is the panel). */
  as?: 'h1' | 'h2';
  id?: string;
  children: ReactNode;
};

/** Cartoon card with a floating title tab — the mockup's "¿Algo personalizado?" block. */
export function V2Panel({ title, tone = 'pink', as: Heading = 'h2', id, children }: V2PanelProps) {
  return (
    <section className={`${styles.panel} ${styles[tone]}`} aria-labelledby={id} id={id ? `${id}-section` : undefined}>
      <div className={styles.tab}>
        <Heading id={id} className={styles.tabTitle}>
          {title}
        </Heading>
      </div>
      <div className={styles.body}>{children}</div>
    </section>
  );
}
