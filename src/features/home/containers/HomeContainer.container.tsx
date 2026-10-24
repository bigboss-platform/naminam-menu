import Link from 'next/link';
import { MeltingDivider } from '@/features/core/components/MeltingDivider.component';
import { SocialLinks } from '@/features/core/components/SocialLinks.component';
import type { SiteSettings } from '@/features/core/types/SiteData.type';
import type { Product } from '@/features/menu/types/Product.type';
import { QuoteForm } from '@/features/requests/components/QuoteForm.component';
import { DeliveryBanner } from '../components/DeliveryBanner.component';
import { FeaturedProductCard } from '../components/FeaturedProductCard.component';
import { HomeHero } from '../components/HomeHero.component';
import { SeasonalSection } from '../components/SeasonalSection.component';
import { TestimonialsSection } from '../components/TestimonialsSection.component';
import styles from './HomeContainer.module.css';

type HomeContainerProps = {
  settings: SiteSettings;
  featuredProducts: Product[];
  seasonalProducts: Product[];
};

/** PRD 4.2 landing: hero → consentidos + temporada → delivery → síguenos → cotizador → testimonios. */
export function HomeContainer({ settings, featuredProducts, seasonalProducts }: HomeContainerProps) {
  return (
    <div className="page-fade-in">
      <div className={styles.page}>
        <HomeHero settings={settings} />
      </div>

      {/* Melted Manjar (dulce de leche) dripping into the best sellers band */}
      <div className={styles.dripStart}>
        <MeltingDivider color="var(--c-bg)" model={2} />
      </div>
      <section className={styles.featuredBand} aria-labelledby="featured-title">
        <div className={styles.page}>
          <h2 id="featured-title" className={`${styles.sectionTitle} font-display`}>
            Los consentidos de la casa
          </h2>
          <div className={styles.featuredLayout}>
            <div className={styles.featuredGrid}>
              {featuredProducts.map((product, index) => (
                <FeaturedProductCard key={product.slug} product={product} index={index} />
              ))}
            </div>
            <SeasonalSection products={seasonalProducts} />
          </div>
          <Link href="/menu" className={styles.seeAll}>
            Ver todo el menú
          </Link>
        </div>
      </section>
      <div className={styles.dripEnd}>
        <MeltingDivider color="var(--c-icing)" model={3} />
      </div>

      <div className={`${styles.page} ${styles.stack}`}>
        <DeliveryBanner note={settings.deliveryNote} />

        <section className={styles.follow} aria-labelledby="follow-title">
          <h2 id="follow-title" className={`${styles.sectionTitle} font-display`}>
            ¡Síguenos a ver si nos antojamos de lo mismo!
          </h2>
          <SocialLinks settings={settings} size="large" />
        </section>

        <section id="cotizar" className={styles.quotePanel} aria-labelledby="quote-title">
          <h2 id="quote-title" className={`${styles.quoteTitle} font-display`}>
            ¿Algo personalizado?
          </h2>
          <p className={styles.quoteLead}>Tortas para cumpleaños, bandejas para eventos, sabores especiales… ¡pídelo aquí!</p>
          <QuoteForm tone="light" />
        </section>

        <TestimonialsSection />
      </div>
    </div>
  );
}
