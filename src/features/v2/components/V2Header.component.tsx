import Link from 'next/link';
import { V2_BASE, V2_HEADER_LINKS } from '../config/v2Nav.constants';
import { V2CartLink } from './V2CartLink.component';
import styles from './V2Header.module.css';
import { V2Wordmark } from './V2Wordmark.component';

/** Mockup header: brand left, links right (stacked and centered on mobile) + cart. */
export function V2Header() {
  return (
    <header className={styles.header}>
      <Link href={V2_BASE} className={styles.brandLink} aria-label="Los Antojitos de Santanita — inicio">
        <V2Wordmark priority />
      </Link>
      <nav className={styles.nav} aria-label="Principal">
        {V2_HEADER_LINKS.map((link) => (
          <Link key={link.href} href={link.href} className={styles.link}>
            {link.label}
          </Link>
        ))}
        <V2CartLink />
      </nav>
    </header>
  );
}
