export type NavTab = {
  label: string;
  href: string;
  icon: string;
};

/** Bottom tab bar (mobile) and desktop top navigation. */
export const NAV_TABS: NavTab[] = [
  { label: 'Inicio', href: '/', icon: 'home' },
  { label: 'Menú', href: '/menu', icon: 'cake' },
];

export function isTabActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}
