'use client';

import { MENU_CONTROLS_IDLE_HIDE_MS, useHideOnScroll } from '@/features/core/hooks/useHideOnScroll.hook';
import { useMenuFilter } from './useMenuFilter.hook';
import { useMenuScrollSnap } from './useMenuScrollSnap.hook';
import { useMenuSearchSheet } from './useMenuSearchSheet.hook';
import type { Category, Product } from '../types/Product.type';

/** Everything the menu page needs: filtering, mobile search drawer, hide-on-scroll controls. */
export function useMenu(products: Product[], categories: Category[]) {
  const filter = useMenuFilter(products, categories);
  const search = useMenuSearchSheet(filter.query, filter.setQuery);
  // Scrolling down (or 2s without activity) hides the filters (toolbar, category rail, search
  // button); scrolling up brings them back. The top bar and tab bar follow the same rule.
  const isFiltersHidden = useHideOnScroll(MENU_CONTROLS_IDLE_HIDE_MS);
  // Mobile scroll assistant: after the user stops scrolling, glide gently to center the nearest card.
  useMenuScrollSnap();

  return { ...filter, ...search, isFiltersHidden };
}

export type MenuCtx = ReturnType<typeof useMenu>;
