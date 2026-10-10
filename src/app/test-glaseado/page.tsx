import type { Metadata } from 'next';
import { HomeContainer } from '@/features/home/containers/HomeContainer.container';
import { getSiteData } from '@/server/siteData';

/** The real home with the "icing" layout (pink wheel band + melting dividers) — for review, not linked. */
export const metadata: Metadata = {
  title: 'Prueba · Glaseado',
  robots: { index: false, follow: false },
};

export const revalidate = 60;

export default async function TestIcingPage() {
  const { settings, products } = await getSiteData();
  return (
    <HomeContainer
      settings={settings}
      featuredProducts={products.filter((product) => product.isFeatured)}
      layout="icing"
    />
  );
}
