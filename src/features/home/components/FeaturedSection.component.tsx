import Link from 'next/link';
import { SectionHeader } from '@/features/core/components/SectionHeader.component';
import type { Product } from '@/features/menu/types/Product.type';
import { RadialProductSelector } from '@/features/radial-selector/components/RadialProductSelector.component';
import { toRadialProduct } from '@/features/radial-selector/utils/toRadialProduct.util';
import styles from './FeaturedSection.module.css';

/**
 * "Nuestros favoritos" — featured desserts (set in the back office) on the wheel selector. Tapping the selected
 * photo opens the menu scrolled to that dessert (/menu#slug).
 */
export function FeaturedSection({ products }: { products: Product[] }) {
  const wheelProducts = products.map((product) => toRadialProduct(product, `/menu#${product.slug}`));

  return (
    <section className={styles.section} aria-labelledby="featured-title">
      <SectionHeader
        id="featured-title"
        eyebrow="Los más pedidos"
        title="Nuestros favoritos"
        aside={
          <Link href="/menu" className={styles.seeAll}>
            Ver todo
          </Link>
        }
      />
      <RadialProductSelector products={wheelProducts} />
    </section>
  );
}
