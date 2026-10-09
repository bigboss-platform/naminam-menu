import { HomeContainer } from '@/features/home/containers/HomeContainer.container';
import { getSiteData } from '@/server/siteData';

export const revalidate = 60;

export default async function HomePage() {
  const { settings, products } = await getSiteData();
  return <HomeContainer settings={settings} featuredProducts={products.filter((product) => product.isFeatured)} />;
}
