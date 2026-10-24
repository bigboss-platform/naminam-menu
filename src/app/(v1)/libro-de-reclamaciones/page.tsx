import type { Metadata } from 'next';
import { LEGAL } from '@/features/core/config/business.config';
import { ContentPage } from '@/features/content/components/ContentPage.component';
import { ComplaintForm } from '@/features/requests/components/ComplaintForm.component';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Libro de Reclamaciones',
  description: 'Libro de Reclamaciones virtual de Los Antojitos de Santanita, conforme al Código de Protección y Defensa del Consumidor.',
};

/** Mandatory in Perú (Ley N.° 29571, D.S. 011-2011-PCM). Legal data is a placeholder until the company is registered. */
export default function ComplaintsBookPage() {
  return (
    <ContentPage
      eyebrow="Conforme a la Ley N.° 29571"
      title="Libro de Reclamaciones"
      width="narrow"
      intro="Si algo no salió bien y no lo resolvimos por WhatsApp, déjanos tu reclamo o queja aquí."
    >
      <dl className={styles.legal}>
        <div>
          <dt>Proveedor</dt>
          <dd>{LEGAL.businessName}</dd>
        </div>
        <div>
          <dt>RUC</dt>
          <dd>{LEGAL.ruc}</dd>
        </div>
        <div>
          <dt>Domicilio</dt>
          <dd>{LEGAL.fiscalAddress}</dd>
        </div>
      </dl>
      <div className={styles.card}>
        <ComplaintForm />
      </div>
      <p className={styles.footnote}>
        <strong>Reclamo:</strong> disconformidad relacionada con los productos o servicios. <strong>Queja:</strong> disconformidad no
        relacionada con los productos o servicios, o malestar respecto a la atención al público. El proveedor deberá dar respuesta al
        reclamo en un plazo no mayor a {LEGAL.responseDays} días hábiles.
      </p>
    </ContentPage>
  );
}
