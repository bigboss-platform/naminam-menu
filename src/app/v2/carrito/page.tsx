import type { Metadata } from 'next';
import { V2CartContainer } from '@/features/v2/containers/V2CartContainer.container';

export const metadata: Metadata = {
  title: 'Tu pedido',
  robots: { index: false },
};

export default function V2CartPage() {
  return <V2CartContainer />;
}
