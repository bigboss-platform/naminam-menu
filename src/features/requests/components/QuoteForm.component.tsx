'use client';

import { useRequestForm } from '../hooks/useRequestForm.hook';
import { validateQuote } from '../utils/requests.validation';
import { FormField, fieldAria } from './FormField.component';
import { FormFooter } from './FormFooter.component';
import styles from './forms.module.css';
import { RequestSuccess } from './RequestSuccess.component';

const INITIAL_VALUES = { name: '', whatsapp: '', details: '' };
const DETAILS_HINT = 'Cantidad, fecha, sabor, decoración… ¡todo el detalle!';

/**
 * "¿Algo personalizado?" — PRD 4.2/4.6: Nombre y apellido, WhatsApp, ¿Qué se te antoja?
 * Used on the home page (Guayaba panel, tone="light") and on /cotizar.
 */
export function QuoteForm({ tone = 'default' }: { tone?: 'default' | 'light' }) {
  const form = useRequestForm({
    initialValues: INITIAL_VALUES,
    validate: validateQuote,
    toPayload: (values) => ({ type: 'cotizacion', ...values }),
  });
  const { values, errors, setField } = form;

  if (form.result) {
    return (
      <RequestSuccess
        title="¡Recibimos tu antojo!"
        result={form.result}
        description="Santanita revisará tu pedido personalizado y te escribirá por WhatsApp con el precio y la fecha."
        onReset={form.reset}
        resetLabel="Pedir otra cotización"
      />
    );
  }

  return (
    <form className={styles.form} onSubmit={form.handleSubmit} noValidate>
      <div className={styles.row}>
        <FormField id="quote-name" label="¿Cómo te llamas?" error={errors.name}>
          <input
            {...fieldAria('quote-name', errors.name)}
            autoComplete="name"
            placeholder="Ej. María Pérez"
            value={values.name}
            onChange={(event) => setField('name', event.target.value)}
          />
        </FormField>
        <FormField id="quote-whatsapp" label="¿Cuál es tu WhatsApp?" error={errors.whatsapp}>
          <input
            {...fieldAria('quote-whatsapp', errors.whatsapp)}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="Ej. 987 654 321"
            value={values.whatsapp}
            onChange={(event) => setField('whatsapp', event.target.value)}
          />
        </FormField>
      </div>
      <FormField id="quote-details" label="¿Qué se te antoja?" error={errors.details} hint={DETAILS_HINT}>
        <textarea
          {...fieldAria('quote-details', errors.details, DETAILS_HINT)}
          rows={4}
          placeholder="Describe tu pedido personalizado"
          value={values.details}
          onChange={(event) => setField('details', event.target.value)}
        />
      </FormField>
      <FormFooter
        label="Enviar solicitud"
        isSending={form.isSending}
        formMessage={form.formMessage}
        honeypot={form.honeypot}
        onHoneypotChange={form.setHoneypot}
        tone={tone}
      />
    </form>
  );
}
