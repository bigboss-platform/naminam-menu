import type { Metadata } from 'next';
import { LoyaltyForm } from '@/features/requests/components/LoyaltyForm.component';
import { V2Page } from '@/features/v2/components/V2Page.component';
import { V2Panel } from '@/features/v2/components/V2Panel.component';
import styles from './page.module.css';

/** Hidden page behind the physical loyalty QR (PRD 5.3): not in the navigation, not indexed. */
export const metadata: Metadata = {
  title: 'Tarjeta de Antojos',
  robots: { index: false, follow: false },
};

const STAMPS = 10;

export default function V2LoyaltyPage() {
  return (
    <V2Page
      title="Tarjeta de Antojos"
      width="narrow"
      intro="Escanea, registra tu compra y suma un punto. ¡A los 10 puntos tienes 30% de descuento o un premio sorpresa!"
    >
      <ol className={styles.card} aria-label={`Tarjeta de ${STAMPS} puntos`}>
        {Array.from({ length: STAMPS }, (_, index) => (
          <li key={index} className={index === STAMPS - 1 ? styles.prize : styles.stamp}>
            {index === STAMPS - 1 ? '🎁' : index + 1}
          </li>
        ))}
      </ol>
      <V2Panel title="¡Suma tu antojo!" tone="cream" id="v2-loyalty">
        <LoyaltyForm />
      </V2Panel>
    </V2Page>
  );
}
