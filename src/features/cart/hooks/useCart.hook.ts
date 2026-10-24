'use client';

import { useSyncExternalStore } from 'react';
import { getCartSnapshot, getServerCartSnapshot, setCartLines, subscribeCart } from '../store/cartStore';
import type { CartLine } from '../types/Cart.type';

export type AddToCartInput = Omit<CartLine, 'key' | 'quantity'>;

/** Cart state + actions, shared by every component (one store, many readers). */
export function useCart() {
  const lines = useSyncExternalStore(subscribeCart, getCartSnapshot, getServerCartSnapshot);

  // Actions read the store at call time (not the rendered `lines`), so fast repeated taps all count.
  const addItem = (item: AddToCartInput, quantity = 1) => {
    const current = getCartSnapshot();
    const key = `${item.slug}:${item.variantId}`;
    const existing = current.find((line) => line.key === key);
    setCartLines(
      existing
        ? current.map((line) => (line.key === key ? { ...line, quantity: line.quantity + quantity } : line))
        : [...current, { ...item, key, quantity }],
    );
  };

  /** +1 / −1 on a line; reaching 0 removes it. */
  const changeQuantity = (key: string, delta: number) => {
    const current = getCartSnapshot();
    setCartLines(
      current
        .map((line) => (line.key === key ? { ...line, quantity: line.quantity + delta } : line))
        .filter((line) => line.quantity > 0),
    );
  };

  const removeItem = (key: string) => setCartLines(getCartSnapshot().filter((line) => line.key !== key));
  const clearCart = () => setCartLines([]);

  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);
  const total = lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0);

  return { lines, itemCount, total, addItem, changeQuantity, removeItem, clearCart };
}

export type CartCtx = ReturnType<typeof useCart>;
