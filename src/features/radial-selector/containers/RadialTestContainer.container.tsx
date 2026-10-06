import { getProductImage } from '@/features/core/config/media.config';
import { getProductsByCategory } from '@/features/menu/data/menu.data';
import { RadialProductSelector } from '../components/RadialProductSelector.component';
import type { RadialProduct } from '../types/RadialProduct.type';
import styles from './RadialTestContainer.module.css';

/** /test playground for the wheel selector — fed with the real cheesecakes. */
export function RadialTestContainer() {
  const products: RadialProduct[] = getProductsByCategory('cheesecake').map((product) => ({
    id: product.slug,
    name: product.name,
    price: product.price,
    imageUrl: getProductImage(product.slug),
    description: product.description,
  }));

  return (
    <div className={`${styles.page} page-fade-in`}>
      <RadialProductSelector products={products} title="Elige tu cheesecake" />
    </div>
  );
}
