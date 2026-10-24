import type { ReactNode } from 'react';
import styles from './forms.module.css';

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  children: ReactNode;
};

/** Label + control + hint/error. The control gets its aria wiring from fieldAria(). */
export function FormField({ id, label, error = '', hint = '', optional = false, children }: FieldProps) {
  return (
    <div className={`${styles.field} ${error ? styles.fieldInvalid : ''}`}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {optional && <span className={styles.optional}> (opcional)</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className={styles.error} role="alert">
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className={styles.hint}>
            {hint}
          </p>
        )
      )}
    </div>
  );
}

/** id/name/aria props for a control inside FormField. */
export function fieldAria(id: string, error?: string, hint?: string) {
  return {
    id,
    name: id,
    className: styles.input,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? `${id}-error` : hint ? `${id}-hint` : undefined,
  };
}
