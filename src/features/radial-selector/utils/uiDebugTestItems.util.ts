import { UI_DEBUG_WHEEL_EXTRA_ITEMS } from '@/features/core/config/uiDebug.config';
import type { RadialProduct } from '../types/RadialProduct.type';

/**
 * UI debug only: appends NEXT_PUBLIC_UI_DEBUG_WHEEL_EXTRA_ITEMS fake products ("Test N · Matilda"),
 * reusing the real photos in turn, to see how the wheel behaves with many items.
 */
export function withUiDebugTestItems(products: RadialProduct[]): RadialProduct[] {
  if (UI_DEBUG_WHEEL_EXTRA_ITEMS === 0 || products.length === 0) return products;
  const testItems = Array.from({ length: UI_DEBUG_WHEEL_EXTRA_ITEMS }, (_, index) => {
    const source = products[index % products.length];
    return { ...source, id: `test-${index + 1}`, name: `Test ${index + 1} · ${source.name}` };
  });
  return [...products, ...testItems];
}
