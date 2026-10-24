import type { Metadata } from 'next';
import Link from 'next/link';
import { HOW_TO_ORDER_NOTE, HOW_TO_ORDER_STEPS, PAYMENT_METHODS } from '@/features/content/data/pages.data';
import { V2Page } from '@/features/v2/components/V2Page.component';
import { V2_BASE } from '@/features/v2/config/v2Nav.constants';
import ui from '@/features/v2/styles/V2Content.module.css';

export const metadata: Metadata = {
  title: '¿Cómo ordenar?',
  description: 'Pide tus antojitos en 5 pasos: menú, carrito y solicitud. Coordinamos el pago y el delivery por WhatsApp.',
};

const STEP_TONES = [ui.teal, ui.pink, ui.yellow, ui.teal, ui.pink];

export default function V2HowToOrderPage() {
  return (
    <V2Page title="¿Cómo ordenar?" intro="Fácil y sin pagar en línea." width="narrow">
      <ol className={ui.steps}>
        {HOW_TO_ORDER_STEPS.map((step, index) => (
          <li key={step.title} className={`${ui.step} ${STEP_TONES[index]}`}>
            <span className={ui.stepNumber} aria-hidden="true">
              {index + 1}
            </span>
            <div>
              <h2 className={ui.cardTitle}>{step.title}</h2>
              <p className={ui.cardText}>{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className={ui.note}>{HOW_TO_ORDER_NOTE}</p>
      <div className={ui.pillRow} style={{ marginTop: 24 }}>
        <span>Métodos de pago:</span>
        {PAYMENT_METHODS.map((method) => (
          <span key={method} className={`${ui.pill} ${ui.pillDark}`}>
            {method}
          </span>
        ))}
      </div>
      <div className={ui.center}>
        <Link href={`${V2_BASE}/menu`} className={`${ui.button} ${ui.buttonTeal}`}>
          Ver Menú
        </Link>
      </div>
    </V2Page>
  );
}
