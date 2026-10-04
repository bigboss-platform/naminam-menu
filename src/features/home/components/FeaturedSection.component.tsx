import Link from 'next/link';
import { SectionHeader } from '@/features/core/components/SectionHeader.component';
import { getFeaturedProducts } from '@/features/menu/data/menu.data';
import { FeaturedCard } from './FeaturedCard.component';
import styles from './FeaturedSection.module.css';

/** Mobile: swipeable carousel with a peek of the next card. Desktop: 4-column grid. */
export function FeaturedSection() {
  const featuredProducts = getFeaturedProducts();
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
      <div className={styles.track}>
        {featuredProducts.map((product, index) => (
          <FeaturedCard key={product.slug} product={product} index={index} />
        ))}
      </div>
    </section>
  );
}
