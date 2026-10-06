import Link from 'next/link';
import { SectionHeader } from '@/features/core/components/SectionHeader.component';
import { getProductImage } from '@/features/core/config/media.config';
import { getFeaturedProducts } from '@/features/menu/data/menu.data';
import { RadialProductSelector } from '@/features/radial-selector/components/RadialProductSelector.component';
import type { RadialProduct } from '@/features/radial-selector/types/RadialProduct.type';
import styles from './FeaturedSection.module.css';

/**
 * "Nuestros favoritos" — featured desserts on the wheel selector. Tapping the selected
 * photo opens the menu scrolled to that dessert (/menu#slug).
 */
export function FeaturedSection() {
  const products: RadialProduct[] = getFeaturedProducts().map((product) => ({
    id: product.slug,
    name: product.name,
    price: product.price,
    imageUrl: getProductImage(product.slug),
    description: product.description,
    href: `/menu#${product.slug}`,
  }));

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
      <RadialProductSelector products={products} />
    </section>
  );
}
