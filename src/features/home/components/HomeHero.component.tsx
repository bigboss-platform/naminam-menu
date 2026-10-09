import Link from 'next/link';
import { ProductImage } from '@/features/core/components/ProductImage.component';
import type { SiteSettings } from '@/features/core/types/SiteData.type';
import styles from './HomeHero.module.css';

/** Cover photo + address come from the back office ("Negocio" → Marca y portada / Ubicación). */
export function HomeHero({ settings }: { settings: SiteSettings }) {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <Link href="/menu" className={styles.media} aria-label="Ver el menú">
        <ProductImage
          src={settings.heroImageUrl}
          alt="Porción de torta de chocolate de Ñami Ñam"
          sizes="(min-width: 900px) 480px, 100vw"
          priority
        />
        {settings.address && (
          <span className={styles.mediaChip}>
            <span className="material-symbols-outlined">location_on</span>
            {settings.address}
          </span>
        )}
      </Link>

      <div className={styles.copy}>
        <h1 id="hero-title" className={`${styles.title} font-display`}>
          Un poquito de felicidad en cada bocado.
        </h1>
        <p className={styles.subtitle}>Postres, cheesecakes y dulces hechos para consentirte.</p>
      </div>
    </section>
  );
}
