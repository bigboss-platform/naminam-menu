import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ActionButton } from '@/features/core/components/ActionButton.component';
import { ContentPage } from '@/features/content/components/ContentPage.component';
import { getTipArticle, TIP_ARTICLES } from '@/features/content/data/tips.data';
import styles from './page.module.css';

type ArticlePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return TIP_ARTICLES.map((article) => ({ slug: article.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = getTipArticle((await params).slug);
  if (!article) return {};
  return { title: article.title, description: article.summary, openGraph: { type: 'article', title: article.title, description: article.summary } };
}

export default async function TipArticlePage({ params }: ArticlePageProps) {
  const article = getTipArticle((await params).slug);
  if (!article) notFound();
  const others = TIP_ARTICLES.filter((item) => item.slug !== article.slug).slice(0, 3);

  return (
    <ContentPage eyebrow={`Consejos · ${article.readingMinutes} min`} title={article.title} intro={article.summary} width="narrow">
      <article className={styles.article}>
        {article.sections.map((section) => (
          <section key={section.heading}>
            <h2 className={`${styles.heading} font-display`}>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </article>
      <div className={styles.cta}>
        <ActionButton href="/menu">¿Se te antojó? Ver el menú</ActionButton>
      </div>
      <nav className={styles.more} aria-label="Más consejos">
        <h2 className={`${styles.moreTitle} font-display`}>Más consejos</h2>
        <ul>
          {others.map((item) => (
            <li key={item.slug}>
              <Link href={`/consejos/${item.slug}`}>{item.title}</Link>
            </li>
          ))}
        </ul>
        <Link href="/consejos" className={styles.back}>
          ← Todos los consejos
        </Link>
      </nav>
    </ContentPage>
  );
}
