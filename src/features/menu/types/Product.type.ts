/** Category slug ("postres", "pasapalos-salados", …). */
export type CategoryId = string;

export type Category = {
  id: CategoryId;
  label: string;
  /** Short line under the section title. */
  tagline: string;
};

export type MediaType = 'image' | 'video';

/** PRD 4.3: "Disponible en stock" · "Disponible por encargo" · "Agotado". */
export type StockStatus = 'in_stock' | 'on_order' | 'sold_out';

/** One selectable option (flavor/size). Its price replaces the product's base price. */
export type ProductVariant = {
  id: string;
  label: string;
  /** Soles (PEN). */
  price: number;
};

export type Product = {
  slug: string;
  name: string;
  categoryId: CategoryId;
  /** Soles (PEN). With variants: the lowest variant price ("Desde S/ 15"). */
  price: number;
  /** One or two sentences — shown on cards (clamped). */
  description: string;
  /** Longer story shown with "Leer más". Empty = no "Leer más". */
  story: string;
  /** Short note shown on the card ("Docena", "13 cm de diámetro"). */
  note: string;
  /** Optional ribbon on the photo ("¡Top 1!"). Empty = none. */
  badge: string;
  /** "Los consentidos de la casa" on the home page. */
  isFeatured: boolean;
  /** "Especiales de temporada" on the home page. */
  isSeasonal: boolean;
  /** Add-ons (salsas) are sold to go with other products. */
  isAddOn: boolean;
  stockStatus: StockStatus;
  /** What the selector is called ("Sabor", "Tamaño"). */
  variantLabel: string;
  /** Empty = single option at `price`. */
  variants: ProductVariant[];
  mediaType: MediaType;
  /** Public photo/video link. Empty = branded placeholder. */
  mediaUrl: string;
  /** Video cover image. */
  posterUrl: string;
};
