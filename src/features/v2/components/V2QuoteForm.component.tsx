'use client';

import { HONEYPOT_FIELD } from '@/features/requests/config/requests.constants';
import { RequestSuccess } from '@/features/requests/components/RequestSuccess.component';
import { useRequestForm } from '@/features/requests/hooks/useRequestForm.hook';
import { validateQuote } from '@/features/requests/utils/requests.validation';
import styles from './V2QuoteForm.module.css';

const INITIAL_VALUES = { name: '', whatsapp: '', details: '' };

const FIELDS = [
  { name: 'name', question: '¿Cómo te llamas?', type: 'text', autoComplete: 'name', wide: false },
  { name: 'whatsapp', question: '¿Cuál es tu WhatsApp?', type: 'tel', autoComplete: 'tel', wide: false },
  { name: 'details', question: '¿Qué se te antoja? Describe tu pedido personalizado', type: 'text', autoComplete: 'off', wide: true },
] as const;

/**
 * The mockup's pill form (on the pink panel). Each pill shows its question; the same text is
 * the accessible label. Shared logic and validation with version 1 (POST /api/solicitudes).
 */
export function V2QuoteForm() {
  const form = useRequestForm({
    initialValues: INITIAL_VALUES,
    validate: validateQuote,
    toPayload: (values) => ({ type: 'cotizacion', ...values }),
  });

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
      <div className={styles.grid}>
        {FIELDS.map((field) => {
          const id = `v2-quote-${field.name}`;
          const error = form.errors[field.name];
          return (
            <div key={field.name} className={field.wide ? styles.wide : undefined}>
              <label htmlFor={id} className="visually-hidden">
                {field.question}
              </label>
              <input
                id={id}
                name={field.name}
                type={field.type}
                inputMode={field.type === 'tel' ? 'tel' : undefined}
                autoComplete={field.autoComplete}
                placeholder={field.question}
                maxLength={field.wide ? 1000 : 80}
                className={`${styles.input} ${field.wide ? styles.inputWide : ''}`}
                value={form.values[field.name]}
                onChange={(event) => form.setField(field.name, event.target.value)}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `${id}-error` : undefined}
              />
              {error && (
                <p id={`${id}-error`} className={styles.error} role="alert">
                  {error}
                </p>
              )}
            </div>
          );
        })}
      </div>
      <input
        type="text"
        name={HONEYPOT_FIELD}
        value={form.honeypot}
        onChange={(event) => form.setHoneypot(event.target.value)}
        className={styles.honeypot}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      {form.formMessage && Object.keys(form.errors).length === 0 && (
        <p className={styles.error} role="alert">
          {form.formMessage}
        </p>
      )}
      <div className={styles.submitRow}>
        <button type="submit" className={styles.submit} disabled={form.isSending}>
          {form.isSending ? 'Enviando…' : 'Enviar solicitud'}
        </button>
      </div>
    </form>
  );
}
