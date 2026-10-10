import Link from 'next/link';
import { SectionHeader } from '@/features/core/components/SectionHeader.component';
import { IS_UI_DEBUG } from '@/features/core/config/uiDebug.config';
import type { Product } from '@/features/menu/types/Product.type';
import { RadialProductSelector } from '@/features/radial-selector/components/RadialProductSelector.component';
import { toRadialProduct } from '@/features/radial-selector/utils/toRadialProduct.util';
import { withUiDebugTestItems } from '@/features/radial-selector/utils/uiDebugTestItems.util';
import styles from './FeaturedSection.module.css';

/**
 * "Nuestros favoritos" — featured desserts (set in the back office) on the wheel selector. Tapping the selected
 * photo opens the menu scrolled to that dessert (/menu#slug).
 */
export function FeaturedSection({ products }: { products: Product[] }) {
  const wheelProducts = withUiDebugTestItems(
    products.map((product) => toRadialProduct(product, `/menu#${product.slug}`)),
  );

  return (
    // section-band: paper band in the "torn" section theme (globals.css)
    <section className={`${styles.section} section-band`} aria-labelledby="featured-title">
      <SectionHeader
        id="featured-title"
        title="Nuestros favoritos"
        aside={
          <Link href="/menu" className={styles.seeAll}>
            Ver todo
          </Link>
        }
      />
      {/* Same setup as /test. The blue path only shows in UI debug mode (NEXT_PUBLIC_UI_DEBUG). */}
      <RadialProductSelector
        products={wheelProducts}
        pathMode="arch"
        spacing="visible-arc"
        visibleCount={3}
        showPath={IS_UI_DEBUG}
      />
    </section>
  );
}
