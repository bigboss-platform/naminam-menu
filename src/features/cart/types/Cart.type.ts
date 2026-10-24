/** One cart row: a product + chosen variant. `key` = "slug:variantId". */
export type CartLine = {
  key: string;
  slug: string;
  name: string;
  /** Empty when the product has no variants. */
  variantId: string;
  variantLabel: string;
  /** Soles. */
  unitPrice: number;
  quantity: number;
};

export const MAX_LINE_QUANTITY = 20;
