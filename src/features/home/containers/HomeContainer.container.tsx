import { MeltingDivider } from '@/features/core/components/MeltingDivider.component';
import type { SiteSettings } from '@/features/core/types/SiteData.type';
import type { Product } from '@/features/menu/types/Product.type';
import { FeaturedSection } from '../components/FeaturedSection.component';
import { HomeHero } from '../components/HomeHero.component';
import styles from './HomeContainer.module.css';

type HomeContainerProps = {
  settings: SiteSettings;
  featuredProducts: Product[];
  /**
   * "icing" (/test-glaseado): the wheel sits on a full-width icing-pink band; the hero melts
   * into it (cream drips on pink) and the band melts onto the footer (pink drips on cream).
   */
  layout?: 'default' | 'icing';
};

export function HomeContainer({ settings, featuredProducts, layout = 'default' }: HomeContainerProps) {
  const hasFeatured = featuredProducts.length > 0;
  const featured = hasFeatured && <FeaturedSection products={featuredProducts} />;

  return (
    <div className={`${styles.page} page-fade-in`}>
      <HomeHero settings={settings} />
      {layout === 'icing' && hasFeatured ? (
        <>
          {/* Hero color dripping onto the pink band below */}
          <div className={`${styles.fullWidth} ${styles.icingStart}`}>
            <MeltingDivider color="var(--c-bg)" />
          </div>
          <div className={`${styles.fullWidth} ${styles.icingBackdrop} ${styles.icingBand}`}>{featured}</div>
          {/* The pink band dripping onto the footer */}
          <div className={`${styles.fullWidth} ${styles.icingEnd}`}>
            <MeltingDivider color="var(--c-icing)" />
          </div>
        </>
      ) : (
        featured
      )}
    </div>
  );
}
