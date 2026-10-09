import type { Category, Product } from '@/features/menu/types/Product.type';

export type OpeningHoursRow = { label: string; opensAt: string; closesAt: string };

/** Business info shown across the site — edited in the back office ("Negocio"). */
export type SiteSettings = {
  name: string;
  tagline: string;
  /** Digits with country code, no "+" (wa.me links). */
  whatsappNumber: string;
  /** Digits with country code — the "Llamar" button. */
  phoneNumber: string;
  instagramHandle: string;
  address: string;
  city: string;
  mapLatitude: number;
  mapLongitude: number;
  hours: OpeningHoursRow[];
  heroImageUrl: string;
};

export type SiteData = {
  settings: SiteSettings;
  /** Menu order. */
  categories: Category[];
  /** Only products available on the menu, in menu order. */
  products: Product[];
};
