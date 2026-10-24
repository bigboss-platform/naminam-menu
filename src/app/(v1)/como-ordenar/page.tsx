import type { Metadata } from 'next';
import { ActionButton } from '@/features/core/components/ActionButton.component';
import { ContentPage } from '@/features/content/components/ContentPage.component';
import { HOW_TO_ORDER_NOTE, HOW_TO_ORDER_STEPS, PAYMENT_METHODS } from '@/features/content/data/pages.data';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Cómo ordenar',
  description: 'Pide tus antojitos en 5 pasos: menú, carrito y solicitud. Coordinamos el pago y el delivery por WhatsApp.',
};

export default function HowToOrderPage() {
  return (
    <ContentPage eyebrow="Fácil y sin pagar en línea" title="¿Cómo ordenar?" width="narrow">
      <ol className={styles.steps}>
        {HOW_TO_ORDER_STEPS.map((step, index) => (
          <li key={step.title} className={`${styles.step} stagger-in`} style={{ '--i': index } as React.CSSProperties}>
            <span className={styles.number} aria-hidden="true">
              {index + 1}
            </span>
            <span className={`material-symbols-outlined ${styles.icon}`} aria-hidden="true">
              {step.icon}
            </span>
            <div>
              <h2 className={`${styles.stepTitle} font-display`}>{step.title}</h2>
              <p>{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
      <aside className={styles.note}>
        <span className="material-symbols-outlined" aria-hidden="true">
          mail
        </span>
        <p>{HOW_TO_ORDER_NOTE}</p>
      </aside>
      <p className={styles.payments}>
        Métodos de pago:{' '}
        {PAYMENT_METHODS.map((method) => (
          <span key={method} className={styles.payment}>
            {method}
          </span>
        ))}
      </p>
      <div className={styles.cta}>
        <ActionButton href="/menu" icon={<span className="material-symbols-outlined">restaurant</span>}>
          Ir al menú
        </ActionButton>
      </div>
    </ContentPage>
  );
}
