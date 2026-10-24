import { CATEGORIES, PRODUCTS } from '@/features/menu/data/menu.data';
import { getProductPhoto } from '../config/brandAssets.config';
import { BUSINESS } from '../config/business.config';
import type { SiteData } from '../types/SiteData.type';

/** The MVP's only data source: static menu + business info (no database yet). */
export const STATIC_SITE_DATA: SiteData = {
  settings: {
    name: BUSINESS.name,
    shortName: BUSINESS.shortName,
    tagline: BUSINESS.tagline,
    whatsappNumber: BUSINESS.whatsappNumber,
    phoneNumber: BUSINESS.phoneNumber,
    instagramHandle: BUSINESS.instagramHandle,
    facebookUrl: BUSINESS.facebookUrl,
    email: BUSINESS.email,
    address: BUSINESS.address,
    city: BUSINESS.city,
    mapLatitude: BUSINESS.mapLatitude,
    mapLongitude: BUSINESS.mapLongitude,
    footerCopy: BUSINESS.footerCopy,
    deliveryNote: BUSINESS.deliveryNote,
    hours: BUSINESS.hours.map(({ label, opensAt, closesAt }) => ({ label, opensAt, closesAt })),
  },
  categories: CATEGORIES,
  products: PRODUCTS.map((product) => ({
    ...product,
    mediaUrl: product.mediaUrl || getProductPhoto(product.slug),
  })),
};
