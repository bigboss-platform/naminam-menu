import type { SiteSettings } from '@/features/core/types/SiteData.type';
import type { Product } from '@/features/menu/types/Product.type';
import { FeaturedSection } from '../components/FeaturedSection.component';
import { HomeHero } from '../components/HomeHero.component';
import styles from './HomeContainer.module.css';

export function HomeContainer({ settings, featuredProducts }: { settings: SiteSettings; featuredProducts: Product[] }) {
  return (
    <div className={`${styles.page} page-fade-in`}>
      <HomeHero settings={settings} />
      {featuredProducts.length > 0 && <FeaturedSection products={featuredProducts} />}
    </div>
  );
}
