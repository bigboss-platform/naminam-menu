import Link from 'next/link';
import { ProductImage } from '@/features/core/components/ProductImage.component';
import { BUSINESS } from '@/features/core/config/business.config';
import { SITE_MEDIA } from '@/features/core/config/media.config';
import styles from './HomeHero.module.css';

export function HomeHero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <Link href="/menu" className={styles.media} aria-label="Ver el menú">
        <ProductImage
          src={SITE_MEDIA.hero}
          alt="Porción de torta de chocolate de Ñami Ñam"
          sizes="(min-width: 900px) 480px, 100vw"
          priority
        />
        <span className={styles.mediaChip}>
          <span className="material-symbols-outlined">location_on</span>
          {BUSINESS.address}
        </span>
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
