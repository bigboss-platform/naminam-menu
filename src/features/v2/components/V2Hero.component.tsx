import Image from 'next/image';
import Link from 'next/link';
import { BRAND_ASSETS } from '@/features/core/config/brandAssets.config';
import type { SiteSettings } from '@/features/core/types/SiteData.type';
import { buildWhatsAppUrl, externalLinkProps, GENERAL_WHATSAPP_MESSAGE } from '@/features/core/utils/whatsapp.util';
import { V2_BASE } from '../config/v2Nav.constants';
import styles from './V2Hero.module.css';
import { V2WhatsAppIcon } from './V2Icons.component';

/** Mockup hero: mascot in a cartoon circle with doodles + headline, subheading and two pills. */
export function V2Hero({ settings }: { settings: SiteSettings }) {
  return (
    <section className={styles.hero} aria-labelledby="v2-hero-title">
      <div className={styles.grid}>
        <div className={styles.avatarColumn}>
          {/* Floating doodles around the avatar */}
          <span className={`${styles.doodle} ${styles.sparkleTeal}`} aria-hidden="true">✦</span>
          <span className={`${styles.doodle} ${styles.sparkleYellow}`} aria-hidden="true">✦</span>
          <span className={`${styles.doodle} ${styles.sparklePink}`} aria-hidden="true">✦</span>
          <span className={styles.dashes} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <div className={styles.avatar}>
            <Image
              src={BRAND_ASSETS.mascot}
              alt="Santanita saludando, con su bandana rosada y lentes rojos"
              fill
              priority
              sizes="(min-width: 640px) 320px, 288px"
              className={styles.avatarImage}
            />
          </div>
          <span className={styles.flan} aria-hidden="true">🍮</span>
        </div>

        <div className={styles.copy}>
          <div className={styles.titleWrap}>
            <h1 id="v2-hero-title" className={styles.title}>
              La felicidad empieza
              <br />
              por un buen bocado
            </h1>
            <span className={styles.accent} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </div>
          <h2 className={styles.subtitle}>¿Qué se te antoja hoy?</h2>
          <p className={styles.lead}>Repostería y pasapalos tradicionales hechos con amor y calidad artesanal</p>
          <div className={styles.actions}>
            <a {...externalLinkProps(buildWhatsAppUrl(settings.whatsappNumber, GENERAL_WHATSAPP_MESSAGE))} className={`${styles.button} ${styles.whatsapp}`}>
              <span>Pedir por WhatsApp</span>
              <V2WhatsAppIcon />
            </a>
            <Link href={`${V2_BASE}/menu`} className={`${styles.button} ${styles.menu}`}>
              Ver Menú
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
