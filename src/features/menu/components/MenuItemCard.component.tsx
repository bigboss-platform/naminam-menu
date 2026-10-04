import { WhatsAppIcon } from '@/features/core/components/BrandIcons.component';
import { ProductImage } from '@/features/core/components/ProductImage.component';
import { getProductImage } from '@/features/core/config/media.config';
import { formatPrice } from '@/features/core/utils/format.util';
import { buildProductWhatsAppUrl } from '@/features/core/utils/whatsapp.util';
import type { Product } from '../types/Product.type';
import styles from './MenuItemCard.module.css';

/**
 * Photo-first card: the photo spans the full card width. Tapping the card opens
 * WhatsApp asking if this dessert is available. Price pinned bottom-right.
 */
export function MenuItemCard({ product, index }: { product: Product; index: number }) {
  return (
    <a
      href={buildProductWhatsAppUrl(product.name)}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.card} stagger-in`}
      style={{ '--i': index } as React.CSSProperties}
      aria-label={`Pedir ${product.name} por WhatsApp`}
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
            <WhatsAppIcon size={18} />
            <span className={styles.price}>{formatPrice(product.price)}</span>
          </span>
        </div>
      </div>
    </a>
  );
}
