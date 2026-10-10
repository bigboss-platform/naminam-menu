import type { Product } from '@/features/menu/types/Product.type';
import { RadialProductSelector } from '../components/RadialProductSelector.component';
import { toRadialProduct } from '../utils/toRadialProduct.util';
import { withUiDebugTestItems } from '../utils/uiDebugTestItems.util';
import styles from './RadialTestContainer.module.css';

/**
 * /test playground for the wheel selector — same products as the home wheel (featured +
 * UI-debug test items), trying the "arch" path + "visible-arc" spacing, path drawn in blue.
 */
export function RadialTestContainer({ products }: { products: Product[] }) {
  const wheelProducts = withUiDebugTestItems(products.map((product) => toRadialProduct(product, '')));
  return (
    <div className={`${styles.page} page-fade-in`}>
      <RadialProductSelector products={wheelProducts} pathMode="arch" spacing="visible-arc" visibleCount={3} showPath />
    </div>
  );
}
