import type { Category, Product } from '@/features/menu/types/Product.type';

export type OpeningHoursRow = { label: string; opensAt: string; closesAt: string };

/** Business info shown across the site (core/config/business.config.ts). */
export type SiteSettings = {
  name: string;
  shortName: string;
  tagline: string;
  /** Digits with country code, no "+" (wa.me links). */
  whatsappNumber: string;
  /** Digits with country code — the "Llamar" link. */
  phoneNumber: string;
  instagramHandle: string;
  facebookUrl: string;
  email: string;
  address: string;
  city: string;
  mapLatitude: number;
  mapLongitude: number;
  footerCopy: string;
  deliveryNote: string;
  hours: OpeningHoursRow[];
};

export type SiteData = {
  settings: SiteSettings;
  /** Menu order. */
  categories: Category[];
  /** Products in menu order (sold-out ones included, shown as "Agotado"). */
  products: Product[];
};
