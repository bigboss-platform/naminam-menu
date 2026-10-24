import { HONEYPOT_FIELD } from '../config/requests.constants';
import styles from './forms.module.css';

type FormFooterProps = {
  label: string;
  sendingLabel?: string;
  isSending: boolean;
  formMessage: string;
  honeypot: string;
  onHoneypotChange: (value: string) => void;
  /** "light": on colored panels (Guayaba) the message is white. */
  tone?: 'default' | 'light';
};

/** Submit button + form-level message + the hidden anti-bot field. */
export function FormFooter({
  label,
  sendingLabel = 'Enviando…',
  isSending,
  formMessage,
  honeypot,
  onHoneypotChange,
  tone = 'default',
}: FormFooterProps) {
  return (
    <div className={styles.footer}>
      <input
        type="text"
        name={HONEYPOT_FIELD}
        value={honeypot}
        onChange={(event) => onHoneypotChange(event.target.value)}
        className={styles.honeypot}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      {formMessage && (
        <p className={`${styles.formMessage} ${tone === 'light' ? styles.formMessageLight : ''}`} role="alert">
          {formMessage}
        </p>
      )}
      <button type="submit" className={styles.submit} disabled={isSending}>
        {isSending ? sendingLabel : label}
      </button>
    </div>
  );
}
