import { PHOTO_CREDITS } from '../config/brandAssets.config';
import styles from './PhotoCredits.module.css';

/** Temporary product photos: attribution for the CC BY ones (the rest are CC0 / public domain). */
export function PhotoCredits() {
  return (
    <p className={styles.credits}>
      Fotos referenciales de Wikimedia Commons.{' '}
      {PHOTO_CREDITS.map((credit, index) => (
        <span key={credit.product}>
          {index > 0 && ' · '}
          {credit.product}:{' '}
          <a href={credit.url} target="_blank" rel="noopener noreferrer">
            {credit.author}
          </a>{' '}
          ({credit.license})
        </span>
      ))}
    </p>
  );
}
