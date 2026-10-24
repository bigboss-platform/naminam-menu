import type { SiteSettings } from '@/features/core/types/SiteData.type';
import { buildFacebookUrl, buildInstagramUrl, buildMapsSearchUrl, externalLinkProps } from '@/features/core/utils/whatsapp.util';
import { V2InstagramIcon, V2MapsIcon, V2MarketplaceIcon } from './V2Icons.component';
import styles from './V2SocialBar.module.css';

/** Mockup social bar: "¡Síguenos…!" + Marketplace, Instagram and Google Maps badges. */
export function V2SocialBar({ settings }: { settings: SiteSettings }) {
  const channels = [
    { label: 'Marketplace', href: buildFacebookUrl(settings.facebookUrl), icon: <V2MarketplaceIcon />, tone: styles.pink },
    { label: 'Instagram', href: buildInstagramUrl(settings.instagramHandle), icon: <V2InstagramIcon />, tone: styles.white },
    { label: 'Google Maps', href: buildMapsSearchUrl(settings.mapLatitude, settings.mapLongitude), icon: <V2MapsIcon />, tone: `${styles.white} ${styles.maps}` },
  ];
  return (
    <section className={styles.section} aria-label="Redes sociales">
      <div className={styles.row}>
        <p className={styles.text}>¡Síguenos a ver si nos antojamos de lo mismo!</p>
        <div className={styles.channels}>
          {channels.map((channel) => (
            <a key={channel.label} {...externalLinkProps(channel.href)} className={styles.channel}>
              <span className={`${styles.badge} ${channel.tone}`}>{channel.icon}</span>
              <span className={styles.label}>{channel.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
