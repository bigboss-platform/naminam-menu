'use client';

import { CLAIM_TYPES, ITEM_TYPES } from '../config/requests.constants';
import type { ComplaintFormCtx } from './ComplaintForm.component';
import { FormField, fieldAria } from './FormField.component';
import styles from './forms.module.css';

/** Sections 2 and 3 of the Libro de Reclamaciones: contracted item + claim detail. */
export function ComplaintClaimFields({ form }: { form: ComplaintFormCtx }) {
  const { values, errors, setField } = form;
  return (
    <>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>2. Identificación del bien contratado</legend>
        <p className={styles.label}>¿Fue un producto o un servicio?</p>
        <div className={styles.choiceGroup} role="radiogroup" aria-label="¿Fue un producto o un servicio?">
          {ITEM_TYPES.map((type) => (
            <label key={type} className={styles.choice}>
              <input
                type="radio"
                name="lr-itemType"
                value={type}
                checked={values.itemType === type}
                onChange={() => setField('itemType', type)}
              />
              {type}
            </label>
          ))}
        </div>
        <FormField id="lr-amount" label="¿Cuánto pagaste? (S/)" optional error={errors.amount}>
          <input
            {...fieldAria('lr-amount', errors.amount)}
            inputMode="decimal"
            placeholder="25.00"
            value={values.amount}
            onChange={(event) => setField('amount', event.target.value)}
          />
        </FormField>
        <FormField id="lr-itemDescription" label="¿Qué producto o servicio fue?" error={errors.itemDescription}>
          <input
            {...fieldAria('lr-itemDescription', errors.itemDescription)}
            placeholder="Ej. Quesillo clásico, pedido PED-…"
            value={values.itemDescription}
            onChange={(event) => setField('itemDescription', event.target.value)}
          />
        </FormField>
      </fieldset>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>3. Detalle de la reclamación</legend>
        <p className={styles.label}>¿Es un reclamo o una queja?</p>
        <div className={styles.choiceGroup} role="radiogroup" aria-label="¿Es un reclamo o una queja?">
          {CLAIM_TYPES.map((type) => (
            <label key={type.value} className={styles.choice} title={type.hint}>
              <input
                type="radio"
                name="lr-claimType"
                value={type.value}
                checked={values.claimType === type.value}
                onChange={() => setField('claimType', type.value)}
              />
              {type.value}
            </label>
          ))}
        </div>
        <p className={styles.hint}>{CLAIM_TYPES.find((type) => type.value === values.claimType)?.hint}</p>
        <FormField id="lr-detail" label="¿Qué pasó?" error={errors.detail}>
          <textarea
            {...fieldAria('lr-detail', errors.detail)}
            rows={4}
            value={values.detail}
            onChange={(event) => setField('detail', event.target.value)}
          />
        </FormField>
        <FormField id="lr-request" label="¿Qué solución esperas?" error={errors.request}>
          <textarea
            {...fieldAria('lr-request', errors.request)}
            rows={3}
            placeholder="Ej. Que me cambien el producto"
            value={values.request}
            onChange={(event) => setField('request', event.target.value)}
          />
        </FormField>
      </fieldset>
    </>
  );
}
