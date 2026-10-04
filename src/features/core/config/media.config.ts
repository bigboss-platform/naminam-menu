/**
 * SINGLE SOURCE OF TRUTH FOR EVERY IMAGE IN THE SITE.
 *
 * Temporary media: free-to-use Unsplash photos (unsplash.com/license) chosen to
 * approximate each dessert. They must be replaced with the client's real dessert
 * photography before launch — the brand must never depend on stock images.
 *
 * To replace a photo: paste any public image URL (Cloudinary, ImgBB, Unsplash, …)
 * in place of the `unsplash(...)` call. If the host is new, add it to
 * `images.remotePatterns` in next.config.ts. An empty string renders the branded
 * placeholder instead of a photo.
 */

function unsplash(photoId: string): string {
  return `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=1200&q=80`;
}

export const SITE_MEDIA = {
  hero: unsplash('1517427294546-5aa121f68e8a'),
};

/** Keyed by product slug (see features/menu/data/menu.data.ts). */
export const PRODUCT_MEDIA: Record<string, string> = {
  // Postre (por ración)
  matilda: unsplash('1607257882338-70f7dd2ae344'),
  'torta-de-zanahoria': unsplash('1676300186098-9b5ae9916e3c'),
  'torta-red-velvet': unsplash('1714949134591-d6f2c581b20d'),
  brownie: unsplash('1636743715220-d8f8dd900b87'),
  brookie: unsplash('1757520419300-1b5661560bc2'),
  'torta-bombon': unsplash('1713274785893-8879f807aff6'),
  'cinnamon-rolls': unsplash('1686207855146-c3ffe2166d40'),
  tiramisu: unsplash('1714385905983-6f8e06fffae1'),
  'tres-leches': unsplash('1673974798330-23e8f4c9ae05'),
  'extra-de-helado': unsplash('1689076758310-92b693fe6b8b'),
  // Sbriciolata
  'sbriciolata-nutella': unsplash('1603379929575-6bee7a669fce'),
  'sbriciolata-manzana': unsplash('1568571780765-9276ac8b75a2'),
  'sbriciolata-ricota-y-mora': unsplash('1664032355311-1c66146c0995'),
  // Cheesecake
  'cheesecake-fresa': unsplash('1676300185983-d5f242babe34'),
  'cheesecake-frutos-rojos': unsplash('1695088957420-c3b97d1f1138'),
  'cheesecake-pistacho': unsplash('1716579866950-54abe7d4286f'),
  'cheesecake-nutella': unsplash('1547414368-ac947d00b91d'),
  'cheesecake-pirulin': unsplash('1708175313856-8573b2bf8a3a'),
  'cheesecake-brownie': unsplash('1524351199678-941a58a3df50'),
};

export function getProductImage(slug: string): string {
  return PRODUCT_MEDIA[slug] ?? '';
}
