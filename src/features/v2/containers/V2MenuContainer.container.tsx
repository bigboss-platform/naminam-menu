'use client';

import { useState } from 'react';
import { PhotoCredits } from '@/features/core/components/PhotoCredits.component';
import type { Category, Product } from '@/features/menu/types/Product.type';
import { V2Page } from '../components/V2Page.component';
import { V2ProductCard } from '../components/V2ProductCard.component';
import styles from './V2MenuContainer.module.css';

/** Lowercase + no accents: "tequenos" finds "Tequeños". */
function normalize(text: string): string {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
}

/** Version 2 menu: category pills, search pill and product cards grouped by category. */
export function V2MenuContainer({ products, categories }: { products: Product[]; categories: Category[] }) {
  const [activeCategory, setActiveCategory] = useState('');
  const [query, setQuery] = useState('');
  const normalizedQuery = normalize(query);

  const sections = categories
    .filter((category) => activeCategory === '' || category.id === activeCategory)
    .map((category) => ({
      category,
      products: products.filter(
        (product) =>
          product.categoryId === category.id &&
          (normalizedQuery === '' ||
            normalize(`${product.name} ${product.description} ${product.variants.map((variant) => variant.label).join(' ')}`).includes(normalizedQuery)),
      ),
    }))
    .filter((section) => section.products.length > 0);

  return (
    <V2Page title="Nuestro menú" intro="Escoge lo que se te antoje, agrégalo al carrito y solicita tu pedido.">
      <div className={styles.toolbar}>
        <div className={styles.pills} role="group" aria-label="Categorías">
          <button type="button" className={`${styles.pill} ${activeCategory === '' ? styles.pillActive : ''}`} aria-pressed={activeCategory === ''} onClick={() => setActiveCategory('')}>
            Todo
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={`${styles.pill} ${activeCategory === category.id ? styles.pillActive : ''}`}
              aria-pressed={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>
        <label htmlFor="v2-menu-search" className="visually-hidden">
          ¿Qué se te antoja hoy?
        </label>
        <input
          id="v2-menu-search"
          type="search"
          className={styles.search}
          placeholder="¿Qué se te antoja hoy?"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      {sections.length === 0 ? (
        <p className={styles.empty}>No encontramos “{query}”. ¿Probamos con otra palabra?</p>
      ) : (
        sections.map((section) => (
          <section key={section.category.id} className={styles.section} aria-labelledby={`v2-cat-${section.category.id}`}>
            <h2 id={`v2-cat-${section.category.id}`} className={styles.sectionTitle}>
              {section.category.label}
            </h2>
            <p className={styles.tagline}>{section.category.tagline}</p>
            <div className={styles.grid}>
              {section.products.map((product, index) => (
                <V2ProductCard key={product.slug} product={product} index={index} />
              ))}
            </div>
          </section>
        ))
      )}
      <PhotoCredits />
    </V2Page>
  );
}
