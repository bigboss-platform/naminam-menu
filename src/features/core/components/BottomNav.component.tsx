'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useCart } from '@/features/cart/hooks/useCart.hook';
import { BOTTOM_TABS, isTabActive, MORE_LINKS } from '../config/nav.constants';
import { MENU_CONTROLS_IDLE_HIDE_MS, useHideOnScroll } from '../hooks/useHideOnScroll.hook';
import { BottomSheet } from './BottomSheet.component';
import styles from './BottomNav.module.css';

/** iOS-style tab bar — mobile/tablet only (desktop uses the top nav). */
export function BottomNav() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  // Menú: slides away while scrolling down or after 2s idle, back on scroll up — same as the menu filters.
  const isMenu = isTabActive(pathname, '/menu');
  const isHidden = useHideOnScroll(isMenu ? MENU_CONTROLS_IDLE_HIDE_MS : 0) && isMenu;
  const isCartActive = isTabActive(pathname, '/carrito');
  const isMoreActive = MORE_LINKS.some((link) => isTabActive(pathname, link.href));

  return (
    <>
      <nav className={`${styles.bottomNav} ${isHidden ? styles.bottomNavHidden : ''}`} aria-label="Secciones">
        {BOTTOM_TABS.map((tab) => {
          const isActive = isTabActive(pathname, tab.href);
          return (
            <Link key={tab.href} href={tab.href} className={`${styles.tab} ${isActive ? styles.tabActive : ''}`} aria-current={isActive ? 'page' : undefined}>
              <span className={`material-symbols-outlined ${isActive ? 'icon-filled' : ''}`}>{tab.icon}</span>
              <span className={styles.label}>{tab.label}</span>
            </Link>
          );
        })}
        <Link href="/carrito" className={`${styles.tab} ${isCartActive ? styles.tabActive : ''}`} aria-current={isCartActive ? 'page' : undefined}>
          <span className={styles.iconWrap}>
            <span className={`material-symbols-outlined ${isCartActive ? 'icon-filled' : ''}`}>shopping_bag</span>
            {itemCount > 0 && <span className={styles.count}>{itemCount > 99 ? '99+' : itemCount}</span>}
          </span>
          <span className={styles.label}>Carrito</span>
        </Link>
        <button
          type="button"
          className={`${styles.tab} ${isMoreActive ? styles.tabActive : ''}`}
          onClick={() => setIsMoreOpen(true)}
          aria-haspopup="dialog"
        >
          <span className="material-symbols-outlined">more_horiz</span>
          <span className={styles.label}>Más</span>
        </button>
      </nav>

      <BottomSheet open={isMoreOpen} onClose={() => setIsMoreOpen(false)} title="Más secciones">
        <ul className={styles.moreList}>
          {MORE_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={styles.moreLink} onClick={() => setIsMoreOpen(false)}>
                <span className="material-symbols-outlined">{link.icon}</span>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </BottomSheet>
    </>
  );
}
