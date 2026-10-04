import { BUSINESS, MAP_EMBED_URL, PHONE_CALL_URL } from '../config/business.config';
import { formatHour } from '../utils/format.util';
import { BrandLogo } from './BrandLogo.component';
import styles from './Footer.module.css';

/**
 * Brand + "Llamar", hours, and address with an inline Google Map — all visible on
 * mobile and desktop. WhatsApp/Instagram live in the top bar (mobile) and floating
 * buttons (desktop), so they are not repeated here.
 */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.column}>
          <div className={styles.brand}>
            <BrandLogo height={64} />
            <span className={styles.tagline}>{BUSINESS.tagline}</span>
          </div>
          <a href={PHONE_CALL_URL} className={styles.callLink}>
            <span className="material-symbols-outlined">call</span>
            <span>
              Llamar
              <span className={styles.phoneNumber}> · {BUSINESS.whatsappDisplay}</span>
            </span>
          </a>
        </div>

        <div className={styles.column}>
          <h2 className={`${styles.columnTitle} font-display`}>Horarios</h2>
          <ul className={styles.hoursList}>
            {BUSINESS.hours.map((row) => (
              <li key={row.label} className={styles.hoursRow}>
                <span className={styles.hoursDay}>{row.label}</span>
                <span>
                  {formatHour(row.opensAt)} – {formatHour(row.closesAt)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.column}>
          <h2 className={`${styles.columnTitle} font-display`}>Ubicación</h2>
          <p className={styles.address}>
            <span className="material-symbols-outlined">location_on</span>
            <span>
              {BUSINESS.address}, {BUSINESS.city}
            </span>
          </p>
          <iframe
            src={MAP_EMBED_URL}
            title={`Mapa: ${BUSINESS.name}, ${BUSINESS.address}`}
            className={styles.map}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
      <p className={styles.copyright}>© {year} Ñami Ñam · Hecho con amor en Venezuela</p>
    </footer>
  );
}
