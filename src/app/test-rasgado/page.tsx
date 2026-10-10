import type { Metadata } from 'next';
import { SectionThemeScope } from '@/features/core/components/SectionThemeScope.component';
import { HomeContainer } from '@/features/home/containers/HomeContainer.container';
import { getSiteData } from '@/server/siteData';

/** The real home with the "torn" (paper) section theme — for comparison, not linked. */
export const metadata: Metadata = {
  title: 'Prueba · Rasgado',
  robots: { index: false, follow: false },
};

export const revalidate = 60;

export default async function TestTornPage() {
  const { settings, products } = await getSiteData();
  return (
    <>
      <SectionThemeScope theme="torn" />
      <HomeContainer settings={settings} featuredProducts={products.filter((product) => product.isFeatured)} />
    </>
  );
}
