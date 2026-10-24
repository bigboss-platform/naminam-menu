import type { Metadata } from 'next';
import Image from 'next/image';
import { ActionButton } from '@/features/core/components/ActionButton.component';
import { BrandAnimation } from '@/features/core/components/BrandAnimation.component';
import { BRAND_ASSETS } from '@/features/core/config/brandAssets.config';
import { ContentPage } from '@/features/content/components/ContentPage.component';
import { ABOUT_STORY, BRAND_VALUES } from '@/features/content/data/pages.data';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Sobre Santanita',
  description: 'Quiénes somos: antojitos venezolanos hechos a mano en San Martín de Porres, Lima, con giros peruanos.',
};

export default function AboutPage() {
  return (
    <ContentPage eyebrow="Nuestra historia" title="Sobre Santanita">
      <div className={styles.story}>
        <div className={styles.photo}>
          {BRAND_ASSETS.aboutPhoto ? (
            <Image src={BRAND_ASSETS.aboutPhoto} alt="Santanita en su cocina" fill sizes="(min-width: 900px) 420px, 90vw" className={styles.image} />
          ) : (
            <BrandAnimation label="Foto de Santanita" emoji="👩🏻‍🍳" />
          )}
        </div>
        <div className={styles.text}>
          {ABOUT_STORY.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>

      <section aria-labelledby="values-title" className={styles.values}>
        <h2 id="values-title" className={`${styles.valuesTitle} font-display`}>
          Lo que nos mueve
        </h2>
        <ul className={styles.valuesGrid}>
          {BRAND_VALUES.map((value) => (
            <li key={value.title} className={styles.value}>
              <span className="material-symbols-outlined" aria-hidden="true">
                {value.icon}
              </span>
              <h3 className="font-display">{value.title}</h3>
              <p>{value.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <div className={styles.cta}>
        <ActionButton href="/menu">Probar nuestros antojitos</ActionButton>
      </div>
    </ContentPage>
  );
}
