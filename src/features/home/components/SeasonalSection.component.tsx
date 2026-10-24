import Link from 'next/link';
import { ProductImage } from '@/features/core/components/ProductImage.component';
import { formatPrice } from '@/features/core/utils/format.util';
import type { Product } from '@/features/menu/types/Product.type';
import styles from './SeasonalSection.module.css';

/** PRD 4.2 "Especiales de temporada" (products with isSeasonal — e.g. December). */
export function SeasonalSection({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  return (
    <aside className={styles.panel} aria-labelledby="seasonal-title">
      <h2 id="seasonal-title" className={`${styles.title} font-display`}>
        Especiales de temporada
      </h2>
      <ul className={styles.list}>
        {products.map((product) => (
          <li key={product.slug}>
            <Link href={`/menu#${product.slug}`} className={styles.tile}>
              <ProductImage src={product.mediaUrl} alt={product.name} sizes="(min-width: 900px) 240px, 90vw" className={styles.image} />
              <span className={styles.caption}>
                <span className={styles.name}>{product.name}</span>
                <span className={styles.price}>{formatPrice(product.price)}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
