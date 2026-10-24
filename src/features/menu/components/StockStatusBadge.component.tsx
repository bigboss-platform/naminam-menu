import type { StockStatus } from '../types/Product.type';
import styles from './StockStatusBadge.module.css';

const STATUS_LABELS: Record<StockStatus, { label: string; icon: string }> = {
  in_stock: { label: 'Disponible en stock', icon: 'check_circle' },
  on_order: { label: 'Disponible por encargo', icon: 'schedule' },
  sold_out: { label: 'Agotado', icon: 'block' },
};

/** PRD 4.3 inventory status. */
export function StockStatusBadge({ status }: { status: StockStatus }) {
  const { label, icon } = STATUS_LABELS[status];
  return (
    <span className={`${styles.badge} ${styles[status]}`}>
      <span className="material-symbols-outlined" aria-hidden="true">
        {icon}
      </span>
      {label}
    </span>
  );
}
