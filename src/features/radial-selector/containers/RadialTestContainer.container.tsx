import type { Product } from '@/features/menu/types/Product.type';
import { RadialProductSelector } from '../components/RadialProductSelector.component';
import { toRadialProduct } from '../utils/toRadialProduct.util';
import styles from './RadialTestContainer.module.css';

/** /test playground for the wheel selector — fed with the real cheesecakes. */
export function RadialTestContainer({ products }: { products: Product[] }) {
  return (
    <div className={`${styles.page} page-fade-in`}>
      <RadialProductSelector products={products.map((product) => toRadialProduct(product, ''))} />
    </div>
  );
}
