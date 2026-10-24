import { ActionButton } from '@/features/core/components/ActionButton.component';
import { BrandAnimation } from '@/features/core/components/BrandAnimation.component';
import { WhatsAppIcon } from '@/features/core/components/BrandIcons.component';
import { BRAND_ASSETS } from '@/features/core/config/brandAssets.config';
import type { SiteSettings } from '@/features/core/types/SiteData.type';
import { buildWhatsAppUrl, GENERAL_WHATSAPP_MESSAGE } from '@/features/core/utils/whatsapp.util';
import styles from './HomeHero.module.css';

/** PRD 4.2 hero: headline, subheadline, mascot illustration, [Pedir por WhatsApp] [Ver Menú]. */
export function HomeHero({ settings }: { settings: SiteSettings }) {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.copy}>
        <p className={styles.eyebrow}>
          <span className="material-symbols-outlined" aria-hidden="true">
            location_on
          </span>
          {settings.address}, {settings.city}
        </p>
        <h1 id="hero-title" className={`${styles.title} font-display`}>
          La felicidad empieza por un <span className={styles.highlight}>buen bocado</span>
        </h1>
        <p className={styles.subtitle}>¿Qué se te antoja hoy?</p>
        <p className={styles.lead}>Pasapalos y postres venezolanos con giros peruanos, hechos a mano en Lima.</p>
        <div className={styles.actions}>
          <ActionButton href="/menu" icon={<span className="material-symbols-outlined">restaurant</span>}>
            Ver Menú
          </ActionButton>
          <ActionButton href={buildWhatsAppUrl(settings.whatsappNumber, GENERAL_WHATSAPP_MESSAGE)} variant="whatsapp" icon={<WhatsAppIcon size={22} />}>
            Pedir por WhatsApp
          </ActionButton>
        </div>
      </div>
      <div className={styles.mascot}>
        <BrandAnimation
          lottieSrc={BRAND_ASSETS.mascotHeroLottie}
          imageSrc={BRAND_ASSETS.mascotHeroImage}
          label="Santanita te saluda"
          emoji="👩🏻‍🍳"
        />
      </div>
    </section>
  );
}
