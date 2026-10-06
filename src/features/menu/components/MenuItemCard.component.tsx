import { WhatsAppIcon } from '@/features/core/components/BrandIcons.component';
import { ProductImage } from '@/features/core/components/ProductImage.component';
import { getProductImage } from '@/features/core/config/media.config';
import { formatPrice } from '@/features/core/utils/format.util';
import { buildProductWhatsAppUrl } from '@/features/core/utils/whatsapp.util';
import type { Product } from '../types/Product.type';
import styles from './MenuItemCard.module.css';

/**
 * Photo-first card. Only its WhatsApp button opens WhatsApp (asking if the dessert is
 * available). `id={slug}` lets the home wheel deep-link here (/menu#slug).
 */
export function MenuItemCard({ product, index }: { product: Product; index: number }) {
  return (
    <article
      id={product.slug}
      data-menu-card
      // Focusable from code only: the first result is focused (and pulses) after filtering
      tabIndex={-1}
      className={`${styles.card} stagger-in`}
      style={{ '--i': index } as React.CSSProperties}
    >
      <div className={styles.media}>
        <ProductImage
          src={getProductImage(product.slug)}
          alt={product.name}
          sizes="(min-width: 1100px) 280px, (min-width: 900px) 33vw, (min-width: 600px) 50vw, 100vw"
        />
        {product.badge && <span className={styles.badge}>{product.badge}</span>}
      </div>
      <div className={styles.body}>
        <h3 className={`${styles.name} font-display`}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.footer}>
          <span className={styles.note}>{product.isAddOn ? 'Complemento' : product.note}</span>
          <span className={styles.priceGroup}>
            <span className={styles.price}>{formatPrice(product.price)}</span>
            <a
              href={buildProductWhatsAppUrl(product.name)}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappButton}
              aria-label={`Pedir ${product.name} por WhatsApp`}
            >
              <WhatsAppIcon size={24} />
            </a>
          </span>
        </div>
      </div>
    </article>
  );
}
