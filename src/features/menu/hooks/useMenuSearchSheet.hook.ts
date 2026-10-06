'use client';

import { useEffect, useRef, useState } from 'react';

/** Wait this long after the last keystroke before filtering the menu. */
const SEARCH_DEBOUNCE_MS = 300;

/**
 * Mobile search drawer: searches while typing (debounced). The trash button empties
 * the field and clears the search immediately.
 */
export function useMenuSearchSheet(query: string, setQuery: (query: string) => void) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchDraft, setSearchDraft] = useState('');
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(debounceTimerRef.current), []);

  const openSearch = () => {
    setSearchDraft(query);
    setIsSearchOpen(true);
  };

  const closeSearch = () => setIsSearchOpen(false);

  const onSearchInput = (value: string) => {
    setSearchDraft(value);
    clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => setQuery(value.trim()), SEARCH_DEBOUNCE_MS);
  };

  const clearSearch = () => {
    clearTimeout(debounceTimerRef.current);
    setSearchDraft('');
    setQuery('');
  };

  return { isSearchOpen, searchDraft, openSearch, closeSearch, onSearchInput, clearSearch };
}
