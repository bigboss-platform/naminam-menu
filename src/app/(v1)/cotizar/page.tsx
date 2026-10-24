import type { Metadata } from 'next';
import { ContentPage } from '@/features/content/components/ContentPage.component';
import { QuoteForm } from '@/features/requests/components/QuoteForm.component';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Cotizar',
  description: 'Pide una cotización para tortas, bandejas de tequeños y pedidos personalizados para tus eventos en Lima.',
};

const IDEAS = ['🎂 Tortas de cumpleaños', '🎉 Bandejas para eventos', '🏢 Pedidos para oficinas', '🎁 Regalos y detalles'];

export default function QuotePage() {
  return (
    <ContentPage
      eyebrow="Pedidos personalizados"
      title="¿Algo personalizado?"
      width="narrow"
      intro="Cuéntanos qué se te antoja: cantidades, fecha, sabores o decoración. Santanita te responde por WhatsApp con el precio y la disponibilidad."
    >
      <ul className={styles.ideas}>
        {IDEAS.map((idea) => (
          <li key={idea}>{idea}</li>
        ))}
      </ul>
      <div className={styles.card}>
        <QuoteForm />
      </div>
    </ContentPage>
  );
}
