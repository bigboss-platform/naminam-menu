'use client';

import { useState } from 'react';
import { CATEGORIES, PRODUCTS } from '../data/menu.data';
import type { Category, Product } from '../types/Product.type';
import { useFilterTransition } from './useFilterTransition.hook';

export type MenuFilterId = 'todos' | Category['id'];

export type MenuPill = { id: MenuFilterId; label: string };

export type MenuSectionData = { category: Category; products: Product[] };

/** Lowercase + strip accents so "tiramisu" finds "Tiramisú" and "pirulín" finds "Pirulin". */
function normalize(text: string): string {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
}

export function useMenuFilter() {
  const [query, setQueryState] = useState('');
  const [activeFilter, setActiveFilter] = useState<MenuFilterId>('todos');
  // Every filter/search change: scroll to top → brief skeleton → first card centered + focused.
  const { isFiltering, startFilterTransition } = useFilterTransition();

  // No "Todos" option: with nothing selected the whole menu shows.
  const pills: MenuPill[] = CATEGORIES.map((category) => ({ id: category.id, label: category.label }));

  /** Tap a category to filter; tap the selected one again to go back to everything. */
  const toggleCategory = (categoryId: MenuFilterId) => {
    setActiveFilter((current) => (current === categoryId ? 'todos' : categoryId));
    startFilterTransition();
  };

  const setQuery = (nextQuery: string) => {
    if (nextQuery === query) return;
    setQueryState(nextQuery);
    startFilterTransition();
  };

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
    setQueryState('');
    setActiveFilter('todos');
    startFilterTransition();
  };

  return {
    query,
    setQuery,
    isFiltering,
    activeFilter,
    toggleCategory,
    pills,
    sections,
    hasResults: sections.length > 0,
    resetFilters,
  };
}
