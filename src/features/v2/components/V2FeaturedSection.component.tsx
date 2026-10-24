import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/features/menu/types/Product.type';
import { V2_BASE } from '../config/v2Nav.constants';
import { formatV2Price, V2_FEATURED_CARDS } from '../config/v2Home.config';
import styles from './V2FeaturedSection.module.css';

/** Mockup "Los consentidos de la casa": three favorite cards + the seasonal column. */
export function V2FeaturedSection({ products }: { products: Product[] }) {
  const cards = V2_FEATURED_CARDS.flatMap((card) => {
    const product = products.find((item) => item.slug === card.slug);
    return product ? [{ card, product }] : [];
  });
  // Mockup order: the savory seasonal item first (pan de jamón), then the drink (ponche)
  const seasonal = products.filter((product) => product.isSeasonal).reverse().slice(0, 2);

  return (
    <section className={styles.section} aria-labelledby="v2-featured-title">
      <h2 id="v2-featured-title" className={styles.title}>
        Los consentidos de la casa
      </h2>
      <div className={styles.grid}>
        {cards.map(({ card, product }) => (
          <Link key={product.slug} href={`${V2_BASE}/menu#${product.slug}`} className={`${styles.card} ${styles[card.theme]}`}>
            <h3 className={styles.cardTitle}>{card.heading}</h3>
            <div className={styles.imageBox}>
              {product.mediaUrl && <Image src={product.mediaUrl} alt={product.name} fill sizes="(min-width: 1024px) 260px, (min-width: 640px) 45vw, 90vw" className={styles.image} />}
            </div>
            <div className={styles.badges}>
              <span className={`${styles.namePill} ${styles[`name_${card.namePill}`]}`}>{product.name}</span>
              <span className={`${styles.pricePill} ${styles[`price_${card.pricePill}`]}`}>
                {formatV2Price(product.price, product.variants.length > 1)}
              </span>
            </div>
          </Link>
        ))}

        <div className={styles.seasonal}>
          <h3 className={styles.seasonalTitle}>
            Especiales de
            <br />
            temporada
          </h3>
          {seasonal.map((product) => (
            <Link key={product.slug} href={`${V2_BASE}/menu#${product.slug}`} className={styles.seasonalImage} title={product.name}>
              {product.mediaUrl && <Image src={product.mediaUrl} alt={product.name} fill sizes="(min-width: 1024px) 260px, 90vw" className={styles.image} />}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
