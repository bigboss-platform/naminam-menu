'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CartButton } from '@/features/cart/components/CartButton.component';
import { HEADER_LINKS, isTabActive } from '../config/nav.constants';
import { useSiteSettings } from '../context/SiteSettings.context';
import { MENU_CONTROLS_IDLE_HIDE_MS, useHideOnScroll } from '../hooks/useHideOnScroll.hook';
import { buildInstagramUrl, buildWhatsAppUrl, externalLinkProps, GENERAL_WHATSAPP_MESSAGE } from '../utils/whatsapp.util';
import { BrandLogo } from './BrandLogo.component';
import { InstagramIcon, WhatsAppIcon } from './BrandIcons.component';
import styles from './TopBar.module.css';

/**
 * PRD 4.1: logo left, links, cart icon top-right. Mobile: logo + Instagram/WhatsApp + cart
 * (the tab bar handles navigation). Desktop: logo + horizontal nav + cart.
 */
export function TopBar() {
  const pathname = usePathname();
  const { whatsappNumber, instagramHandle } = useSiteSettings();
  // Menú: slides away while scrolling down or after 2s idle, back on scroll up — same as the menu filters.
  const isMenu = isTabActive(pathname, '/menu');
  const isHidden = useHideOnScroll(isMenu ? MENU_CONTROLS_IDLE_HIDE_MS : 0) && isMenu;

  return (
    <header className={`${styles.topBar} ${isHidden ? styles.topBarHidden : ''}`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} aria-label="Los Antojitos de Santanita — inicio">
          <BrandLogo height={44} withName priority />
        </Link>

        <nav className={styles.desktopNav} aria-label="Principal">
          {HEADER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.desktopLink} ${isTabActive(pathname, link.href) ? styles.desktopLinkActive : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          {/* Mobile only — on desktop these live in the floating buttons (FloatingContactButtons) */}
          <a
            {...externalLinkProps(buildInstagramUrl(instagramHandle))}
            className={`${styles.iconLink} ${styles.instagram}`}
            aria-label="Instagram de Santanita"
          >
            <InstagramIcon size={24} />
          </a>
          <a
            {...externalLinkProps(buildWhatsAppUrl(whatsappNumber, GENERAL_WHATSAPP_MESSAGE))}
            className={`${styles.iconLink} ${styles.whatsapp}`}
            aria-label="Pedir por WhatsApp"
          >
            <WhatsAppIcon size={26} />
          </a>
          <CartButton />
        </div>
      </div>
    </header>
  );
}
