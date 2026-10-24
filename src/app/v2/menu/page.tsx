import type { Metadata } from 'next';
import { V2MenuContainer } from '@/features/v2/containers/V2MenuContainer.container';
import { getSiteData } from '@/server/siteData';

export const metadata: Metadata = {
  title: 'Menú',
  description: 'Tequeños, quesillos, tortas, pasapalos y bebidas venezolanas en Lima. Precios en soles.',
};

export default async function V2MenuPage() {
  const { products, categories } = await getSiteData();
  return <V2MenuContainer products={products} categories={categories} />;
}
