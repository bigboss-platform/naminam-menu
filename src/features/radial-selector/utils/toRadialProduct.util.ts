import type { Product } from '@/features/menu/types/Product.type';
import type { RadialProduct } from '../types/RadialProduct.type';

/** Menu product → wheel item. `href` = where tapping the selected photo goes ('' = nowhere). */
export function toRadialProduct(product: Product, href: string): RadialProduct {
  return {
    id: product.slug,
    name: product.name,
    price: product.price,
    mediaType: product.mediaType,
    mediaUrl: product.mediaUrl,
    posterUrl: product.posterUrl,
    description: product.description,
    href,
  };
}
