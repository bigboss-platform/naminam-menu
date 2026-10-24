'use client';

import { WhatsAppIcon } from '@/features/core/components/BrandIcons.component';
import { BrandAnimation } from '@/features/core/components/BrandAnimation.component';
import { BRAND_ASSETS } from '@/features/core/config/brandAssets.config';
import { useSiteSettings } from '@/features/core/context/SiteSettings.context';
import { buildWhatsAppUrl, externalLinkProps, isPlaceholderWhatsApp } from '@/features/core/utils/whatsapp.util';
import type { SuccessResult } from '../hooks/useRequestForm.hook';
import styles from './RequestSuccess.module.css';

type RequestSuccessProps = {
  title: string;
  result: SuccessResult;
  /** Shown under the title. */
  description: string;
  onReset?: () => void;
  resetLabel?: string;
};

/**
 * After a form is sent: request code, email note and — for orders/quotes — the WhatsApp
 * button with the message ready (PRD step 5). With the placeholder number the button is
 * inert and the message is shown as a preview instead.
 */
export function RequestSuccess({ title, result, description, onReset, resetLabel = 'Enviar otra' }: RequestSuccessProps) {
  const { whatsappNumber } = useSiteSettings();
  const hasWhatsApp = result.whatsappMessage !== '';
  const whatsappHref = buildWhatsAppUrl(whatsappNumber, result.whatsappMessage);
  const isPlaceholder = isPlaceholderWhatsApp(whatsappNumber);

  return (
    <div className={styles.success} role="status">
      <BrandAnimation lottieSrc={BRAND_ASSETS.orderSentLottie} label="¡Listo!" emoji="🎉" loop={false} className={styles.animation} />
      <h2 className={`${styles.title} font-display`}>{title}</h2>
      <p className={styles.code}>
        Código: <strong>{result.code}</strong>
      </p>
      <p className={styles.description}>{description}</p>
      <p className={styles.emailNote}>
        {result.emailSent ? 'Te enviamos una copia a tu correo.' : 'El envío de correos aún no está activo (modo demo).'}
      </p>

      {hasWhatsApp && (
        <>
          <a {...externalLinkProps(whatsappHref)} className={styles.whatsappButton}>
            <WhatsAppIcon size={24} />
            <span>Continuar en WhatsApp</span>
          </a>
          {isPlaceholder && (
            <details className={styles.preview} open>
              <summary>WhatsApp aún no está activo · así llegaría tu mensaje:</summary>
              <pre className={styles.message}>{result.whatsappMessage}</pre>
            </details>
          )}
        </>
      )}

      {onReset && (
        <button type="button" className={styles.reset} onClick={onReset}>
          {resetLabel}
        </button>
      )}
    </div>
  );
}
