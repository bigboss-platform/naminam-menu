import type { SiteSettings } from '../types/SiteData.type';
import { formatHour } from '../utils/format.util';
import { buildMapEmbedUrl, formatPhone } from '../utils/whatsapp.util';
import { BrandLogo } from './BrandLogo.component';
import styles from './Footer.module.css';

/**
 * Brand + "Llamar", hours, and address with an inline Google Map — all visible on
 * mobile and desktop. Data comes from the back office ("Negocio"). WhatsApp/Instagram
 * live in the top bar (mobile) and floating buttons (desktop), so they are not repeated here.
 */
export function Footer({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();
  // Calls go to the dedicated phone if set, otherwise to the WhatsApp line.
  const callNumber = settings.phoneNumber || settings.whatsappNumber;
  const hasMap = settings.mapLatitude !== 0 || settings.mapLongitude !== 0;
  const fullAddress = [settings.address, settings.city].filter(Boolean).join(', ');

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.column}>
          <div className={styles.brand}>
            <BrandLogo height={64} />
            <span className={styles.tagline}>{settings.tagline}</span>
          </div>
          {callNumber && (
            <a href={`tel:+${callNumber}`} className={styles.callLink}>
              <span className="material-symbols-outlined">call</span>
              <span>
                Llamar
                <span className={styles.phoneNumber}> · {formatPhone(callNumber)}</span>
              </span>
            </a>
          )}
        </div>

        {settings.hours.length > 0 && (
          <div className={styles.column}>
            <h2 className={`${styles.columnTitle} font-display`}>Horarios</h2>
            <ul className={styles.hoursList}>
              {settings.hours.map((row) => (
                <li key={row.label} className={styles.hoursRow}>
                  <span className={styles.hoursDay}>{row.label}</span>
                  <span>
                    {formatHour(row.opensAt)} – {formatHour(row.closesAt)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className={styles.column}>
          <h2 className={`${styles.columnTitle} font-display`}>Ubicación</h2>
          {fullAddress && (
            <p className={styles.address}>
              <span className="material-symbols-outlined">location_on</span>
              <span>{fullAddress}</span>
            </p>
          )}
          {hasMap && (
            <iframe
              src={buildMapEmbedUrl(settings.mapLatitude, settings.mapLongitude)}
              title={`Mapa: ${settings.name}, ${settings.address}`}
              className={styles.map}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          )}
        </div>
      </div>
      <p className={styles.copyright}>© {year} Ñami Ñam · Hecho con amor en Venezuela</p>
    </footer>
  );
}
