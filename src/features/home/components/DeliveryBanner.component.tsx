import Link from 'next/link';
import { BrandAnimation } from '@/features/core/components/BrandAnimation.component';
import { BRAND_ASSETS } from '@/features/core/config/brandAssets.config';
import styles from './DeliveryBanner.module.css';

/** Free delivery rule (from the flyer) with the mascot on her bike (Img_Mascot_Bike). */
export function DeliveryBanner({ note }: { note: string }) {
  return (
    <section className={styles.banner} aria-labelledby="delivery-title">
      <div className={styles.mascot}>
        <BrandAnimation
          lottieSrc={BRAND_ASSETS.mascotBikeLottie}
          label="Santanita en bici"
          emoji="🚲"
        />
      </div>
      <div className={styles.copy}>
        <h2 id="delivery-title" className={`${styles.title} font-display`}>
          ¡Delivery gratis!
        </h2>
        <p className={styles.text}>{note}</p>
        <Link href="/como-ordenar" className={styles.link}>
          ¿Cómo ordenar?
        </Link>
      </div>
    </section>
  );
}
