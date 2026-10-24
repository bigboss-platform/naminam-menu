import Link from 'next/link';
import type { SiteSettings } from '@/features/core/types/SiteData.type';
import { buildFacebookUrl, buildInstagramUrl, buildMapsSearchUrl, externalLinkProps } from '@/features/core/utils/whatsapp.util';
import { V2_BASE, V2_FOOTER_LINKS } from '../config/v2Nav.constants';
import styles from './V2Footer.module.css';
import { V2BookIcon, V2FacebookIcon, V2InstagramIcon, V2PinIcon } from './V2Icons.component';

/** Mockup footer: links + ©, Libro de reclamaciones, contacto directo + social icons. */
export function V2Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <p className={styles.links}>
            {V2_FOOTER_LINKS.map((link, index) => (
              <span key={link.href}>
                {index > 0 && ' · '}
                <Link href={link.href}>{link.label}</Link>
              </span>
            ))}
          </p>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} {settings.name}
          </p>
        </div>

        <Link href={`${V2_BASE}/libro-de-reclamaciones`} className={styles.complaints}>
          <V2BookIcon />
          <span>
            Libro de
            <br />
            reclamaciones
          </span>
        </Link>

        <div className={styles.right}>
          <div>
            <span className={styles.contactLabel}>Contacto directo:</span>
            <a href={`mailto:${settings.email}`} className={styles.email}>
              {settings.email}
            </a>
          </div>
          <div className={styles.icons}>
            <a {...externalLinkProps(buildFacebookUrl(settings.facebookUrl))} aria-label="Facebook" className={styles.icon}>
              <V2FacebookIcon />
            </a>
            <a {...externalLinkProps(buildInstagramUrl(settings.instagramHandle))} aria-label="Instagram" className={styles.icon}>
              <V2InstagramIcon size={20} />
            </a>
            <a {...externalLinkProps(buildMapsSearchUrl(settings.mapLatitude, settings.mapLongitude))} aria-label="Ubicación" className={styles.icon}>
              <V2PinIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
