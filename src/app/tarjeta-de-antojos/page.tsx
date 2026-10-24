import type { Metadata } from 'next';
import { ContentPage } from '@/features/content/components/ContentPage.component';
import { LoyaltyForm } from '@/features/requests/components/LoyaltyForm.component';
import styles from './page.module.css';

/** Hidden page behind the physical loyalty QR (PRD 5.3): not in the navigation, not indexed. */
export const metadata: Metadata = {
  title: 'Tarjeta de Antojos',
  robots: { index: false, follow: false },
};

const STAMPS = 10;

export default function LoyaltyPage() {
  return (
    <ContentPage
      eyebrow="Solo para antojaditos fieles"
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
      <div className={styles.form}>
        <LoyaltyForm />
      </div>
    </ContentPage>
  );
}
