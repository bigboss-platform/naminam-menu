import Link from 'next/link';
import { ProductImage } from '@/features/core/components/ProductImage.component';
import { formatPrice } from '@/features/core/utils/format.util';
import type { Product } from '@/features/menu/types/Product.type';
import styles from './FeaturedProductCard.module.css';

const FRAME_COLORS = ['turquesa', 'guayaba', 'cacao'] as const;

/** "Los consentidos de la casa" card: photo, title, mini story, price, link to add it from the menu. */
export function FeaturedProductCard({ product, index }: { product: Product; index: number }) {
  const frame = FRAME_COLORS[index % FRAME_COLORS.length];
  const fromPrice = product.variants.length > 1 ? `Desde ${formatPrice(product.price)}` : formatPrice(product.price);
  return (
    <article className={`${styles.frame} ${styles[frame]} stagger-in`} style={{ '--i': index } as React.CSSProperties}>
      <div className={styles.card}>
        <div className={styles.media}>
          <ProductImage src={product.mediaUrl} alt={product.name} sizes="(min-width: 900px) 280px, 90vw" />
          {product.badge && <span className={styles.badge}>{product.badge}</span>}
        </div>
        <h3 className={`${styles.name} font-display`}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.footer}>
          <span className={styles.price}>{fromPrice}</span>
          <Link href={`/menu#${product.slug}`} className={styles.link} aria-label={`Pedir ${product.name}`}>
            <span className="material-symbols-outlined" aria-hidden="true">
              add_shopping_cart
            </span>
            Pedir
          </Link>
        </div>
      </div>
    </article>
  );
}
