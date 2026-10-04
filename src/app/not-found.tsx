import { ActionButton } from '@/features/core/components/ActionButton.component';
import { BrandLogo } from '@/features/core/components/BrandLogo.component';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={`${styles.page} page-fade-in`}>
      <BrandLogo height={96} />
      <h1 className={`${styles.title} font-display`}>Este postre no está en la vitrina</h1>
      <p className={styles.text}>Puede que el enlace haya cambiado. Mira todo lo que tenemos hoy.</p>
      <ActionButton href="/menu" isBlockOnMobile={false}>
        Ver menú
      </ActionButton>
    </div>
  );
}
