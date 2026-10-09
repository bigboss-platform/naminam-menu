import { CATEGORIES, PRODUCTS } from '@/features/menu/data/menu.data';
import { BUSINESS } from '../config/business.config';
import { getProductImage, SITE_MEDIA } from '../config/media.config';
import type { SiteData } from '../types/SiteData.type';

/**
 * Site data when there is no database (MONGODB_URI not set, or MongoDB unreachable):
 * the original hard-coded menu + business info. Keeps the site working on any static host.
 */
export const FALLBACK_SITE_DATA: SiteData = {
  settings: {
    name: BUSINESS.name,
    tagline: BUSINESS.tagline,
    whatsappNumber: BUSINESS.whatsappNumber,
    phoneNumber: BUSINESS.phoneNumber.replace(/^\+/, ''),
    instagramHandle: BUSINESS.instagramHandle,
    address: BUSINESS.address,
    city: BUSINESS.city,
    mapLatitude: 10.0614949,
    mapLongitude: -69.2922501,
    hours: BUSINESS.hours.map(({ label, opensAt, closesAt }) => ({ label, opensAt, closesAt })),
    heroImageUrl: SITE_MEDIA.hero,
  },
  categories: CATEGORIES,
  products: PRODUCTS.map((product) => ({
    ...product,
    mediaType: 'image',
    mediaUrl: getProductImage(product.slug),
    posterUrl: '',
  })),
};
