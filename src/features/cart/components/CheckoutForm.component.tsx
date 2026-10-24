'use client';

import { DELIVERY_DISTRICTS } from '@/features/requests/config/requests.constants';
import { FormField, fieldAria } from '@/features/requests/components/FormField.component';
import { FormFooter } from '@/features/requests/components/FormFooter.component';
import formStyles from '@/features/requests/components/forms.module.css';
import type { CheckoutCtx } from '../hooks/useCheckout.hook';

const NOTES_HINT = '¿Fritos o congelados? ¿Alguna alergia? Cuéntanos aquí.';
const EMAIL_HINT = 'Ahí te enviamos el resumen de tu pedido.';

/** Delivery data. No card, no payment: Santanita closes the order on WhatsApp. */
export function CheckoutForm({ form }: { form: CheckoutCtx }) {
  const { values, errors, setField } = form;
  return (
    <form className={formStyles.form} onSubmit={form.handleSubmit} noValidate>
      <div className={formStyles.row}>
        <FormField id="checkout-name" label="¿Cómo te llamas?" error={errors.name}>
          <input {...fieldAria('checkout-name', errors.name)} autoComplete="name" value={values.name} onChange={(event) => setField('name', event.target.value)} />
        </FormField>
        <FormField id="checkout-whatsapp" label="¿Cuál es tu WhatsApp?" error={errors.whatsapp}>
          <input
            {...fieldAria('checkout-whatsapp', errors.whatsapp)}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="987 654 321"
            value={values.whatsapp}
            onChange={(event) => setField('whatsapp', event.target.value)}
          />
        </FormField>
      </div>
      <FormField id="checkout-email" label="¿Cuál es tu correo?" hint={EMAIL_HINT} error={errors.email}>
        <input
          {...fieldAria('checkout-email', errors.email, EMAIL_HINT)}
          type="email"
          autoComplete="email"
          placeholder="nombre@gmail.com"
          value={values.email}
          onChange={(event) => setField('email', event.target.value)}
        />
      </FormField>
      <div className={formStyles.row}>
        <FormField id="checkout-district" label="¿En qué distrito estás?" error={errors.district}>
          <select {...fieldAria('checkout-district', errors.district)} value={values.district} onChange={(event) => setField('district', event.target.value)}>
            {DELIVERY_DISTRICTS.map((district) => (
              <option key={district}>{district}</option>
            ))}
          </select>
        </FormField>
        <FormField id="checkout-deliveryDate" label="¿Para cuándo lo quieres?" optional error={errors.deliveryDate}>
          <input
            {...fieldAria('checkout-deliveryDate', errors.deliveryDate)}
            type="date"
            value={values.deliveryDate}
            onChange={(event) => setField('deliveryDate', event.target.value)}
          />
        </FormField>
      </div>
      <FormField id="checkout-address" label="¿A qué dirección te lo llevamos?" error={errors.address}>
        <input
          {...fieldAria('checkout-address', errors.address)}
          autoComplete="street-address"
          placeholder="Av., calle, número y referencia"
          value={values.address}
          onChange={(event) => setField('address', event.target.value)}
        />
      </FormField>
      <FormField id="checkout-notes" label="¿Algo más que debamos saber?" optional hint={NOTES_HINT} error={errors.notes}>
        <textarea
          {...fieldAria('checkout-notes', errors.notes, NOTES_HINT)}
          rows={3}
          value={values.notes}
          onChange={(event) => setField('notes', event.target.value)}
        />
      </FormField>
      <FormFooter
        label="Solicitar pedido"
        sendingLabel="Enviando tu pedido…"
        isSending={form.isSending}
        formMessage={form.formMessage}
        honeypot={form.honeypot}
        onHoneypotChange={form.setHoneypot}
      />
    </form>
  );
}
