import { MAX_LINE_QUANTITY, type CartLine } from '../types/Cart.type';

/**
 * Tiny external store for the cart (read with useSyncExternalStore). Persisted in
 * localStorage so the cart survives reloads; every storage access is guarded (private
 * mode, blocked storage) and the cart simply starts empty when it fails.
 */
const STORAGE_KEY = 'santanita_cart_v1';
const EMPTY: CartLine[] = [];

let lines: CartLine[] = EMPTY;
let hasLoaded = false;
const listeners = new Set<() => void>();

function isCartLine(value: unknown): value is CartLine {
  const line = value as CartLine;
  return (
    typeof line?.key === 'string' &&
    typeof line.slug === 'string' &&
    typeof line.name === 'string' &&
    typeof line.unitPrice === 'number' &&
    Number.isInteger(line.quantity) &&
    line.quantity > 0
  );
}

function load() {
  if (hasLoaded) return;
  hasLoaded = true;
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '[]');
    lines = Array.isArray(parsed) ? parsed.filter(isCartLine) : EMPTY;
  } catch {
    lines = EMPTY;
  }
}

function emit() {
  listeners.forEach((listener) => listener());
}

export function setCartLines(next: CartLine[]) {
  lines = next.map((line) => ({ ...line, quantity: Math.min(line.quantity, MAX_LINE_QUANTITY) }));
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  } catch {
    // Storage unavailable: the cart still works for this visit.
  }
  emit();
}

export function subscribeCart(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    hasLoaded = false;
    load();
    emit();
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
}

export function getCartSnapshot(): CartLine[] {
  load();
  return lines;
}

export function getServerCartSnapshot(): CartLine[] {
  return EMPTY;
}
