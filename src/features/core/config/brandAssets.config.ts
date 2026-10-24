/**
 * EVERY BRAND ASSET IN ONE PLACE (PRD 6 "Diccionario de assets").
 *
 * Empty string = the site shows a branded placeholder. To use a real asset, drop the file in
 * /public/brand/... and put its path here (e.g. '/brand/lottie/mascota-hero.lottie').
 * Lotties: .lottie or .json, played by @lottiefiles/dotlottie-react (BrandAnimation component).
 */
export const BRAND_ASSETS = {
  /** Img_Logo_Main — circular logo with sunset background (PNG/SVG, square). */
  logo: '',
  /** Hero mascot (Lottie preferred, otherwise image). */
  mascotHeroLottie: '',
  mascotHeroImage: '',
  /** Img_Mascot_Bike — delivery banner. */
  mascotBikeLottie: '',
  mascotBikeImage: '',
  /** Empty cart and "pedido enviado" moments. */
  emptyCartLottie: '',
  orderSentLottie: '',
  /** Sobre Santanita page photo. */
  aboutPhoto: '',
  /** Img_QR_Loyalty — physical loyalty card. */
  loyaltyCard: '',
};

/** Keyed by product slug. Img_Product_Real (hexagonal tupper) can go here as a temporary photo. */
export const PRODUCT_PHOTOS: Record<string, string> = {};

export function getProductPhoto(slug: string): string {
  return PRODUCT_PHOTOS[slug] ?? '';
}
