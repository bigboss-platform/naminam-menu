'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_TABS, isTabActive } from '../config/nav.constants';
import { useSiteSettings } from '../context/SiteSettings.context';
import { buildInstagramUrl, buildWhatsAppUrl, GENERAL_WHATSAPP_MESSAGE } from '../utils/whatsapp.util';
import { BrandLogo } from './BrandLogo.component';
import { InstagramIcon, WhatsAppIcon } from './BrandIcons.component';
import styles from './TopBar.module.css';

/**
 * Mobile: compact iOS-style bar — logo only (the tab bar shows the section) + Instagram/WhatsApp
 * icons. Desktop: logo + horizontal nav.
 */
export function TopBar() {
  const pathname = usePathname();
  const { whatsappNumber, instagramHandle } = useSiteSettings();
  const whatsappUrl = buildWhatsAppUrl(whatsappNumber, GENERAL_WHATSAPP_MESSAGE);

  return (
    <header className={styles.topBar}>
      <div className={styles.inner}>
        {/* ── Mobile ── */}
        <div className={styles.mobileLeft}>
          <Link href="/" className={styles.mobileBrand} aria-label="Ñami Ñam — inicio">
            <BrandLogo height={40} priority />
          </Link>
        </div>

        {/* ── Desktop ── */}
        <Link href="/" className={styles.desktopBrand} aria-label="Ñami Ñam — inicio">
          <BrandLogo height={52} priority />
        </Link>
        <nav className={styles.desktopNav} aria-label="Principal">
          {NAV_TABS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.desktopLink} ${isTabActive(pathname, link.href) ? styles.desktopLinkActive : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile only — on desktop these live in the floating buttons (FloatingContactButtons) */}
        <div className={styles.mobileActions}>
          <a
            href={buildInstagramUrl(instagramHandle)}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.iconLink} ${styles.instagram}`}
            aria-label="Ver Instagram de Ñami Ñam"
          >
            <InstagramIcon size={26} />
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.iconLink} ${styles.whatsapp}`}
            aria-label="Pedir por WhatsApp"
          >
            <WhatsAppIcon size={28} />
          </a>
        </div>
      </div>
    </header>
  );
}
