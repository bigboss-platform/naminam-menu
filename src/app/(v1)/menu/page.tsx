import type { Metadata } from 'next';
import { MenuContainer } from '@/features/menu/containers/MenuContainer.container';
import { getSiteData } from '@/server/siteData';

export const metadata: Metadata = {
  title: 'Menú',
  description: 'Tequeños, quesillos, tortas, pasapalos y bebidas venezolanas en Lima. Precios en soles.',
};


export default async function MenuPage() {
  const { products, categories } = await getSiteData();
  return <MenuContainer products={products} categories={categories} />;
}
