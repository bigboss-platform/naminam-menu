'use client';

import { DOCUMENT_TYPES } from '../config/requests.constants';
import type { ComplaintFormCtx } from './ComplaintForm.component';
import { FormField, fieldAria } from './FormField.component';
import styles from './forms.module.css';

/** Section 1 of the Libro de Reclamaciones: identification of the consumer. */
export function ComplaintConsumerFields({ form }: { form: ComplaintFormCtx }) {
  const { values, errors, setField } = form;
  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>1. Identificación del consumidor</legend>
      <FormField id="lr-fullName" label="¿Cuál es tu nombre completo?" error={errors.fullName}>
        <input
          {...fieldAria('lr-fullName', errors.fullName)}
          autoComplete="name"
          value={values.fullName}
          onChange={(event) => setField('fullName', event.target.value)}
        />
      </FormField>
      <div className={styles.row}>
        <FormField id="lr-documentType" label="¿Qué documento tienes?" error={errors.documentType}>
          <select
            {...fieldAria('lr-documentType', errors.documentType)}
            value={values.documentType}
            onChange={(event) => setField('documentType', event.target.value)}
          >
            {DOCUMENT_TYPES.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </FormField>
        <FormField id="lr-documentNumber" label="¿Cuál es el número de tu documento?" error={errors.documentNumber}>
          <input
            {...fieldAria('lr-documentNumber', errors.documentNumber)}
            inputMode="text"
            value={values.documentNumber}
            onChange={(event) => setField('documentNumber', event.target.value)}
          />
        </FormField>
      </div>
      <FormField id="lr-address" label="¿Dónde vives?" error={errors.address}>
        <input
          {...fieldAria('lr-address', errors.address)}
          autoComplete="street-address"
          value={values.address}
          onChange={(event) => setField('address', event.target.value)}
        />
      </FormField>
      <div className={styles.row}>
        <FormField id="lr-phone" label="¿Cuál es tu celular?" error={errors.phone}>
          <input
            {...fieldAria('lr-phone', errors.phone)}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="987 654 321"
            value={values.phone}
            onChange={(event) => setField('phone', event.target.value)}
          />
        </FormField>
        <FormField id="lr-email" label="¿Cuál es tu correo?" error={errors.email}>
          <input
            {...fieldAria('lr-email', errors.email)}
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => setField('email', event.target.value)}
          />
        </FormField>
      </div>
      <FormField id="lr-parentName" label="Si eres menor de edad, ¿quién es tu padre, madre o apoderado?" optional error={errors.parentName}>
        <input
          {...fieldAria('lr-parentName', errors.parentName)}
          value={values.parentName}
          onChange={(event) => setField('parentName', event.target.value)}
        />
      </FormField>
    </fieldset>
  );
}
