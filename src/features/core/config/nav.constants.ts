export type NavTab = {
  label: string;
  href: string;
  icon: string;
};

/** Desktop header links — PRD 4.1: Menú, Cómo Ordenar, Cotizar, Consejos de consumo, Sobre Santanita. */
export const HEADER_LINKS: NavTab[] = [
  { label: 'Menú', href: '/menu', icon: 'restaurant' },
  { label: 'Cómo ordenar', href: '/como-ordenar', icon: 'menu_book' },
  { label: 'Cotizar', href: '/cotizar', icon: 'request_quote' },
  { label: 'Consejos', href: '/consejos', icon: 'tips_and_updates' },
  { label: 'Sobre Santanita', href: '/sobre-santanita', icon: 'favorite' },
];

/** Mobile tab bar. The cart has its own tab (with count); "Más" opens the rest. */
export const BOTTOM_TABS: NavTab[] = [
  { label: 'Inicio', href: '/', icon: 'home' },
  { label: 'Menú', href: '/menu', icon: 'restaurant' },
  { label: 'Cotizar', href: '/cotizar', icon: 'request_quote' },
];

/** Inside the mobile "Más" sheet. */
export const MORE_LINKS: NavTab[] = [
  { label: 'Cómo ordenar', href: '/como-ordenar', icon: 'menu_book' },
  { label: 'Consejos de consumo', href: '/consejos', icon: 'tips_and_updates' },
  { label: 'Sobre Santanita', href: '/sobre-santanita', icon: 'favorite' },
  { label: 'Libro de Reclamaciones', href: '/libro-de-reclamaciones', icon: 'gavel' },
];

export function isTabActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}
