'use client';

import { LEGAL } from '@/features/core/config/business.config';
import { useRequestForm } from '../hooks/useRequestForm.hook';
import { validateComplaint } from '../utils/requests.validation';
import { ComplaintClaimFields } from './ComplaintClaimFields.component';
import { ComplaintConsumerFields } from './ComplaintConsumerFields.component';
import { FormFooter } from './FormFooter.component';
import styles from './forms.module.css';
import { RequestSuccess } from './RequestSuccess.component';

export const COMPLAINT_INITIAL_VALUES = {
  fullName: '',
  documentType: 'DNI',
  documentNumber: '',
  address: '',
  phone: '',
  email: '',
  parentName: '',
  itemType: 'Producto',
  amount: '',
  itemDescription: '',
  claimType: 'Reclamo',
  detail: '',
  request: '',
  acceptsTerms: false,
};

export type ComplaintValues = typeof COMPLAINT_INITIAL_VALUES;
export type ComplaintFormCtx = ReturnType<typeof useRequestForm<ComplaintValues>>;

/** Libro de Reclamaciones virtual (Perú, INDECOPI): consumer, contracted item, claim detail. */
export function ComplaintForm() {
  const form = useRequestForm({
    initialValues: COMPLAINT_INITIAL_VALUES,
    validate: validateComplaint,
    toPayload: (values) => ({ type: 'reclamo', ...values }),
  });

  if (form.result) {
    return (
      <RequestSuccess
        title="Tu hoja de reclamación fue registrada"
        result={form.result}
        description={`Guarda este código. Te responderemos al correo que indicaste en un plazo máximo de ${LEGAL.responseDays} días hábiles.`}
      />
    );
  }

  return (
    <form className={styles.form} onSubmit={form.handleSubmit} noValidate>
      <ComplaintConsumerFields form={form} />
      <ComplaintClaimFields form={form} />
      <label className={styles.checkbox}>
        <input
          type="checkbox"
          checked={form.values.acceptsTerms}
          onChange={(event) => form.setField('acceptsTerms', event.target.checked)}
          aria-invalid={form.errors.acceptsTerms ? true : undefined}
        />
        <span>
          Declaro que los datos son verdaderos. La formulación del reclamo no impide acudir a otras vías de solución de
          controversias ni es requisito previo para interponer una denuncia ante el INDECOPI.
        </span>
      </label>
      {form.errors.acceptsTerms && (
        <p className={styles.error} role="alert">
          {form.errors.acceptsTerms}
        </p>
      )}
      <FormFooter
        label="Enviar hoja de reclamación"
        isSending={form.isSending}
        formMessage={form.formMessage}
        honeypot={form.honeypot}
        onHoneypotChange={form.setHoneypot}
      />
    </form>
  );
}
