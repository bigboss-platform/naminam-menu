import type { Metadata } from 'next';
import { MenuContainer } from '@/features/menu/containers/MenuContainer.container';
import { getSiteData } from '@/server/siteData';

export const metadata: Metadata = {
  title: 'Menú',
  description: 'Postres por ración, sbriciolatas y cheesecakes de Ñami Ñam, con precios.',
};

export const revalidate = 60;

export default async function MenuPage() {
  const { products, categories } = await getSiteData();
  return <MenuContainer products={products} categories={categories} />;
}
