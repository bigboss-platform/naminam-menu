import type { Metadata } from 'next';
import { LEGAL } from '@/features/core/config/business.config';
import { ComplaintForm } from '@/features/requests/components/ComplaintForm.component';
import { V2Page } from '@/features/v2/components/V2Page.component';
import ui from '@/features/v2/styles/V2Content.module.css';

export const metadata: Metadata = {
  title: 'Libro de Reclamaciones',
  description: 'Libro de Reclamaciones virtual de Los Antojitos de Santanita, conforme al Código de Protección y Defensa del Consumidor.',
};

/** Mandatory in Perú (Ley N.° 29571). Legal data is a placeholder until the company is registered. */
export default function V2ComplaintsBookPage() {
  return (
    <V2Page
      title="Libro de Reclamaciones"
      width="narrow"
      intro="Si algo no salió bien y no lo resolvimos por WhatsApp, déjanos tu reclamo o queja aquí."
    >
      <div className={ui.pillRow} style={{ marginBottom: 24 }}>
        <span className={ui.pill}>{LEGAL.businessName}</span>
        <span className={ui.pill}>RUC {LEGAL.ruc}</span>
        <span className={ui.pill}>{LEGAL.fiscalAddress}</span>
      </div>
      <ComplaintForm />
      <p className={ui.note}>
        Reclamo: disconformidad con los productos o servicios. Queja: malestar con la atención. Te responderemos en un plazo no mayor a{' '}
        {LEGAL.responseDays} días hábiles.
      </p>
    </V2Page>
  );
}
