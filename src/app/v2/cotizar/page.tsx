import type { Metadata } from 'next';
import { V2Page } from '@/features/v2/components/V2Page.component';
import { V2Panel } from '@/features/v2/components/V2Panel.component';
import { V2QuoteForm } from '@/features/v2/components/V2QuoteForm.component';
import ui from '@/features/v2/styles/V2Content.module.css';

export const metadata: Metadata = {
  title: 'Cotizar',
  description: 'Pide una cotización para tortas, bandejas de tequeños y pedidos personalizados para tus eventos en Lima.',
};

const IDEAS = ['🎂 Tortas de cumpleaños', '🎉 Bandejas para eventos', '🏢 Pedidos para oficinas', '🎁 Regalos y detalles'];

export default function V2QuotePage() {
  return (
    <V2Page
      title="Cotizar"
      width="narrow"
      intro="Cuéntanos qué se te antoja: cantidades, fecha, sabores o decoración. Santanita te responde por WhatsApp con el precio y la disponibilidad."
    >
      <div className={ui.pillRow} style={{ marginBottom: 24 }}>
        {IDEAS.map((idea) => (
          <span key={idea} className={ui.pill}>
            {idea}
          </span>
        ))}
      </div>
      <V2Panel title="¿Algo personalizado?" id="v2-quote-page-title">
        <V2QuoteForm />
      </V2Panel>
    </V2Page>
  );
}
