'use client';

import { useRequestForm } from '../hooks/useRequestForm.hook';
import { validateLoyalty } from '../utils/requests.validation';
import { FormField, fieldAria } from './FormField.component';
import { FormFooter } from './FormFooter.component';
import styles from './forms.module.css';
import { RequestSuccess } from './RequestSuccess.component';

const INITIAL_VALUES = { name: '', whatsapp: '', orderCode: '' };

/** Tarjeta de Antojos (hidden QR page): registers one point. MVP: Santanita counts them by email. */
export function LoyaltyForm() {
  const form = useRequestForm({
    initialValues: INITIAL_VALUES,
    validate: validateLoyalty,
    toPayload: (values) => ({ type: 'fidelidad', ...values }),
  });
  const { values, errors, setField } = form;

  if (form.result) {
    return (
      <RequestSuccess
        title="¡Sumaste un antojo! ⭐"
        result={form.result}
        description="Santanita registrará tu punto. Al juntar 10 tienes 30% de descuento o un premio sorpresa."
        onReset={form.reset}
        resetLabel="Registrar otro"
      />
    );
  }

  return (
    <form className={styles.form} onSubmit={form.handleSubmit} noValidate>
      <FormField id="loyalty-name" label="¿Cómo te llamas?" error={errors.name}>
        <input
          {...fieldAria('loyalty-name', errors.name)}
          autoComplete="name"
          value={values.name}
          onChange={(event) => setField('name', event.target.value)}
        />
      </FormField>
      <FormField id="loyalty-whatsapp" label="¿Cuál es tu WhatsApp?" error={errors.whatsapp}>
        <input
          {...fieldAria('loyalty-whatsapp', errors.whatsapp)}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="987 654 321"
          value={values.whatsapp}
          onChange={(event) => setField('whatsapp', event.target.value)}
        />
      </FormField>
      <FormField id="loyalty-orderCode" label="¿Cuál es el código de tu pedido?" optional error={errors.orderCode}>
        <input
          {...fieldAria('loyalty-orderCode', errors.orderCode)}
          placeholder="PED-…"
          value={values.orderCode}
          onChange={(event) => setField('orderCode', event.target.value)}
        />
      </FormField>
      <FormFooter
        label="Sumar mi punto"
        isSending={form.isSending}
        formMessage={form.formMessage}
        honeypot={form.honeypot}
        onHoneypotChange={form.setHoneypot}
      />
    </form>
  );
}
