'use client';

import { useState } from 'react';
import { CATEGORIES, PRODUCTS } from '../data/menu.data';
import type { Category, Product } from '../types/Product.type';

export type MenuFilterId = 'todos' | Category['id'];

export type MenuPill = { id: MenuFilterId; label: string };

export type MenuSectionData = { category: Category; products: Product[] };

/** Lowercase + strip accents so "tiramisu" finds "Tiramisú" and "pirulín" finds "Pirulin". */
function normalize(text: string): string {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
}

export function useMenuFilter() {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<MenuFilterId>('todos');

  const pills: MenuPill[] = [
    { id: 'todos', label: 'Todos' },
    ...CATEGORIES.map((category) => ({ id: category.id, label: category.label })),
  ];

  const normalizedQuery = normalize(query);
  const matchesQuery = (product: Product) =>
    normalizedQuery === '' ||
    normalize(`${product.name} ${product.note} ${product.description}`).includes(normalizedQuery);
  const matchesFilter = (product: Product) => activeFilter === 'todos' || product.categoryId === activeFilter;

  const sections: MenuSectionData[] = CATEGORIES.map((category) => ({
    category,
    products: PRODUCTS.filter(
      (product) => product.categoryId === category.id && matchesFilter(product) && matchesQuery(product),
    ),
  })).filter((section) => section.products.length > 0);

  const resetFilters = () => {
    setQuery('');
    setActiveFilter('todos');
  };

  return {
    query,
    setQuery,
    activeFilter,
    setActiveFilter,
    pills,
    sections,
    hasResults: sections.length > 0,
    resetFilters,
  };
}

export type MenuCtx = ReturnType<typeof useMenuFilter>;
