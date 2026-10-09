/** Category slug ("racion", "cheesecake", …) — the back office can create new ones. */
export type CategoryId = string;

export type Category = {
  id: CategoryId;
  label: string;
  /** Short line under the section title. */
  tagline: string;
};

export type MediaType = 'image' | 'video';

export type Product = {
  slug: string;
  name: string;
  categoryId: CategoryId;
  /** USD, as listed by the client. */
  price: number;
  /** One or two sentences — shown on cards (clamped). */
  description: string;
  /** Short tasting note shown under the name in the menu list. */
  note: string;
  /** Optional ribbon on the photo ("Favorito de la casa"). Empty = none. */
  badge: string;
  /** Shown in "Nuestros favoritos" on the home page. */
  isFeatured: boolean;
  /** Add-ons ("Extra de helado") are listed but not sold on their own. */
  isAddOn: boolean;
  mediaType: MediaType;
  /** Public photo/video link (set in the back office). Empty = branded placeholder. */
  mediaUrl: string;
  /** Video cover image. */
  posterUrl: string;
};

export const EMPTY_PRODUCT: Product = {
  slug: '',
  name: '',
  categoryId: '',
  price: 0,
  description: '',
  note: '',
  badge: '',
  isFeatured: false,
  isAddOn: false,
  mediaType: 'image',
  mediaUrl: '',
  posterUrl: '',
};
