import type { Metadata } from 'next';
import { CartContainer } from '@/features/cart/containers/CartContainer.container';

export const metadata: Metadata = {
  title: 'Tu pedido',
  robots: { index: false },
};

export default function CartPage() {
  return <CartContainer />;
}
