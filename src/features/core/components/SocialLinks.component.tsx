import type { SiteSettings } from '../types/SiteData.type';
import { buildFacebookUrl, buildInstagramUrl, buildMapsSearchUrl, externalLinkProps } from '../utils/whatsapp.util';
import { FacebookIcon, InstagramIcon } from './BrandIcons.component';
import styles from './SocialLinks.module.css';

type SocialLinksProps = {
  settings: SiteSettings;
  /** "large": home "Síguenos" tiles with labels; "small": footer round icons. */
  size?: 'large' | 'small';
};

/** Facebook (Marketplace), Instagram and Google Maps — PRD footer + "Síguenos". */
export function SocialLinks({ settings, size = 'small' }: SocialLinksProps) {
  const isLarge = size === 'large';
  const links = [
    { label: 'Facebook', href: buildFacebookUrl(settings.facebookUrl), icon: <FacebookIcon size={isLarge ? 36 : 20} /> },
    { label: 'Instagram', href: buildInstagramUrl(settings.instagramHandle), icon: <InstagramIcon size={isLarge ? 36 : 20} /> },
    {
      label: 'Google Maps',
      href: buildMapsSearchUrl(settings.mapLatitude, settings.mapLongitude),
      icon: <span className="material-symbols-outlined" style={{ fontSize: isLarge ? 40 : 22 }}>location_on</span>,
    },
  ];

  return (
    <ul className={`${styles.list} ${isLarge ? styles.large : styles.small}`}>
      {links.map((link) => (
        <li key={link.label}>
          <a {...externalLinkProps(link.href)} className={styles.link} aria-label={isLarge ? undefined : link.label}>
            <span className={styles.icon}>{link.icon}</span>
            {isLarge && <span className={styles.label}>{link.label}</span>}
          </a>
        </li>
      ))}
    </ul>
  );
}
