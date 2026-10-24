import { V2FeaturedSection } from '@/features/v2/components/V2FeaturedSection.component';
import { V2Hero } from '@/features/v2/components/V2Hero.component';
import { V2Panel } from '@/features/v2/components/V2Panel.component';
import { V2QuoteForm } from '@/features/v2/components/V2QuoteForm.component';
import { V2SocialBar } from '@/features/v2/components/V2SocialBar.component';
import { getSiteData } from '@/server/siteData';
import styles from './page.module.css';

/** Version 2 home — the client's mockup, section by section. */
export default async function V2HomePage() {
  const { settings, products } = await getSiteData();
  return (
    <>
      <V2Hero settings={settings} />
      <V2FeaturedSection products={products} />
      <V2SocialBar settings={settings} />
      <div id="cotizar" className={styles.quote}>
        <V2Panel title="¿Algo personalizado?" id="v2-quote-title">
          <V2QuoteForm />
        </V2Panel>
      </div>
    </>
  );
}
