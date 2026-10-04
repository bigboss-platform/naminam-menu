import type { Metadata } from 'next';
import { MenuContainer } from '@/features/menu/containers/MenuContainer.container';

export const metadata: Metadata = {
  title: 'Menú',
  description: 'Postres por ración, sbriciolatas y cheesecakes de Ñami Ñam, con precios.',
};

export default function MenuPage() {
  return <MenuContainer />;
}
