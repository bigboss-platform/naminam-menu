import 'server-only';
import { MAX_LINE_QUANTITY } from '@/features/cart/types/Cart.type';
import type { Product } from '@/features/menu/types/Product.type';
import type { OrderLineInput } from '@/features/requests/types/Requests.type';
import type { ResolvedOrderLine } from '@/features/requests/utils/orderMessage.util';

/**
 * Turns the browser's cart (slug + variant + quantity) into priced lines using the real menu.
 * Prices never come from the browser. Returns null if anything is unknown or sold out.
 */
export function resolveOrderLines(input: unknown, products: Product[]): ResolvedOrderLine[] | null {
  if (!Array.isArray(input) || input.length === 0 || input.length > 30) return null;
  const resolved: ResolvedOrderLine[] = [];
  for (const raw of input as OrderLineInput[]) {
    const product = products.find((item) => item.slug === raw?.slug);
    const quantity = Number(raw?.quantity);
    if (!product || product.stockStatus === 'sold_out') return null;
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_LINE_QUANTITY) return null;
    if (product.variants.length === 0) {
      resolved.push({ name: product.name, variantLabel: '', quantity, unitPrice: product.price });
      continue;
    }
    const variant = product.variants.find((item) => item.id === raw.variantId);
    if (!variant) return null;
    resolved.push({ name: product.name, variantLabel: variant.label, quantity, unitPrice: variant.price });
  }
  return resolved;
}
