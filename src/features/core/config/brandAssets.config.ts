/**
 * EVERY BRAND ASSET IN ONE PLACE (PRD 6 "Diccionario de assets"). Used by both site versions.
 *
 * Files live in /public/brand. Empty string = not available yet.
 * Lotties: .lottie or .json, played by @lottiefiles/dotlottie-react (BrandAnimation). Until a
 * Lottie exists, the detailed circular mascot (`mascot`) is shown in its place.
 */
export const BRAND_ASSETS = {
  /** Img_Logo_Main — mascot only, no text (circular, transparent PNG/WebP). */
  logo: '/brand/logo.webp',
  /** Detailed circular mascot (city background) — loading screens, hero, success, empty states. */
  mascot: '/brand/mascota.webp',
  /** Lotties (pending) — each falls back to `mascot`. */
  mascotHeroLottie: '',
  mascotBikeLottie: '',
  emptyCartLottie: '',
  orderSentLottie: '',
  /** Sobre Santanita page photo (pending — the mascot is shown meanwhile). */
  aboutPhoto: '',
  /** Img_QR_Loyalty — physical loyalty card (pending). */
  loyaltyCard: '',
};

/**
 * Temporary product photos (free to use, self-hosted in /public/brand/products, 1200×900 WebP),
 * from Wikimedia Commons. Replace with the client's own photos when they exist.
 */
const PRODUCT_PHOTO_SLUGS = [
  'tequenos', 'salsas', 'mini-empanadas', 'dulce-de-higo', 'golfeados', 'besitos-de-coco', 'quesillo',
  'tortas', 'bienmesabe', 'papelon-con-limon', 'chicha-venezolana', 'ponche-crema',
  'tequenos-pan-de-jamon', 'quesillo-chicha-morada',
];

export const PRODUCT_PHOTOS: Record<string, string> = Object.fromEntries(
  PRODUCT_PHOTO_SLUGS.map((slug) => [slug, `/brand/products/${slug}.webp`]),
);

/**
 * All photos are CC0 / public domain except these two (CC BY 2.0 — attribution required,
 * shown under the menu by PhotoCredits). Remove an entry when its photo is replaced.
 */
export const PHOTO_CREDITS = [
  { product: 'Ponche Crema', author: 'Wheeler Cowperthwaite', license: 'CC BY 2.0', url: 'https://commons.wikimedia.org/wiki/File:Glass_of_eggnog_with_cinnamon_03.jpg' },
  { product: 'Tequeños de pan de jamón', author: 'Luis Miguel Cisneros', license: 'CC BY 2.0', url: 'https://commons.wikimedia.org/wiki/File:Relleno_del_Pan_de_Jam%C3%B3n_por_Clara.jpg' },
];

export function getProductPhoto(slug: string): string {
  return PRODUCT_PHOTOS[slug] ?? '';
}
