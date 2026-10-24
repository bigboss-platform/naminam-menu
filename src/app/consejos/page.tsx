import type { Metadata } from 'next';
import Link from 'next/link';
import { ContentPage } from '@/features/content/components/ContentPage.component';
import { TIP_ARTICLES } from '@/features/content/data/tips.data';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Consejos de consumo',
  description: 'Cómo freír, hornear, guardar y recalentar tequeños, quesillos y postres venezolanos para que sepan como recién hechos.',
};

export default function TipsPage() {
  return (
    <ContentPage
      eyebrow="Blog"
      title="Consejos de consumo"
      intro="Todo lo que necesitas saber para disfrutar tus antojitos como recién salidos de la cocina de Santanita."
    >
      <ul className={styles.grid}>
        {TIP_ARTICLES.map((article, index) => (
          <li key={article.slug} className="stagger-in" style={{ '--i': index } as React.CSSProperties}>
            <Link href={`/consejos/${article.slug}`} className={styles.card}>
              <span className={`material-symbols-outlined ${styles.icon}`} aria-hidden="true">
                {article.icon}
              </span>
              <h2 className={`${styles.title} font-display`}>{article.title}</h2>
              <p className={styles.summary}>{article.summary}</p>
              <span className={styles.meta}>{article.readingMinutes} min de lectura · Leer →</span>
            </Link>
          </li>
        ))}
      </ul>
    </ContentPage>
  );
}
