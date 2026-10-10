import type { Metadata } from 'next';
import { RadialTestContainer } from '@/features/radial-selector/containers/RadialTestContainer.container';
import { getSiteData } from '@/server/siteData';

/** Playground for components under evaluation — not linked from the navigation. */
export const metadata: Metadata = {
  title: 'Prueba',
  robots: { index: false, follow: false },
};

export const revalidate = 60;

export default async function TestPage() {
  const { products } = await getSiteData();
  // Same products as the home wheel ("Nuestros favoritos")
  return <RadialTestContainer products={products.filter((product) => product.isFeatured)} />;
}
