import type { MenuSectionData } from '../hooks/useMenuFilter.hook';
import { MenuItemCard } from './MenuItemCard.component';
import styles from './MenuSection.module.css';

export function MenuSection({ section }: { section: MenuSectionData }) {
  const { category, products } = section;
  const titleId = `section-${category.id}`;
  return (
    <section id={category.id} className={styles.section} aria-labelledby={titleId}>
      <header className={styles.header}>
        <h2 id={titleId} className={`${styles.title} font-display`}>
          {category.label}
        </h2>
        <p className={styles.tagline}>{category.tagline}</p>
      </header>
      <div className={styles.grid}>
        {products.map((product, index) => (
          <MenuItemCard key={product.slug} product={product} index={index} />
        ))}
      </div>
    </section>
  );
}
