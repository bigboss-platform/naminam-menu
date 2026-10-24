import Link from 'next/link';
import { HEADER_LINKS } from '../config/nav.constants';
import type { SiteSettings } from '../types/SiteData.type';
import { formatHour } from '../utils/format.util';
import { BrandLogo } from './BrandLogo.component';
import styles from './Footer.module.css';
import { SocialLinks } from './SocialLinks.component';

/** PRD 4.1 footer: copy, contact (email · Lima), social icons, Libro de Reclamaciones, copyright. */
export function Footer({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.column}>
          <BrandLogo height={56} />
          <p className={`${styles.brandName} font-display`}>{settings.name}</p>
          <p className={styles.copy}>{settings.footerCopy}</p>
          <SocialLinks settings={settings} />
        </div>

        <nav className={styles.column} aria-label="Enlaces del sitio">
          <h2 className={`${styles.columnTitle} font-display`}>Explora</h2>
          <ul className={styles.links}>
            {HEADER_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
          <Link href="/libro-de-reclamaciones" className={styles.complaints}>
            <span className="material-symbols-outlined" aria-hidden="true">
              menu_book
            </span>
            Libro de Reclamaciones
          </Link>
        </nav>

        <div className={styles.column}>
          <h2 className={`${styles.columnTitle} font-display`}>Contacto directo</h2>
          <a href={`mailto:${settings.email}`} className={styles.contactRow}>
            <span className="material-symbols-outlined" aria-hidden="true">
              mail
            </span>
            {settings.email}
          </a>
          <p className={styles.contactRow}>
            <span className="material-symbols-outlined" aria-hidden="true">
              location_on
            </span>
            {settings.address}, {settings.city}
          </p>
          {settings.hours.length > 0 && (
            <ul className={styles.hours}>
              {settings.hours.map((row) => (
                <li key={row.label}>
                  <span>{row.label}</span>
                  <span>
                    {formatHour(row.opensAt)} – {formatHour(row.closesAt)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <p className={styles.copyright}>
        © {year} {settings.name}. Todos los derechos reservados.
      </p>
    </footer>
  );
}
