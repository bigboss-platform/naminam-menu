import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTipArticle, TIP_ARTICLES } from '@/features/content/data/tips.data';
import { V2Page } from '@/features/v2/components/V2Page.component';
import { V2Panel } from '@/features/v2/components/V2Panel.component';
import { V2_BASE } from '@/features/v2/config/v2Nav.constants';
import ui from '@/features/v2/styles/V2Content.module.css';

type ArticlePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return TIP_ARTICLES.map((article) => ({ slug: article.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = getTipArticle((await params).slug);
  if (!article) return {};
  return { title: article.title, description: article.summary };
}

export default async function V2TipArticlePage({ params }: ArticlePageProps) {
  const article = getTipArticle((await params).slug);
  if (!article) notFound();
  const others = TIP_ARTICLES.filter((item) => item.slug !== article.slug).slice(0, 3);

  return (
    <V2Page title={article.title} intro={article.summary} width="narrow">
      <V2Panel title={`${article.readingMinutes} min de lectura`} tone="cream" id="v2-article">
        <div className={ui.prose}>
          {article.sections.map((section) => (
            <section key={section.heading}>
              <h2 className={ui.proseHeading}>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </div>
      </V2Panel>
      <div className={ui.center}>
        <Link href={`${V2_BASE}/menu`} className={`${ui.button} ${ui.buttonPink}`}>
          ¿Se te antojó? Ver Menú
        </Link>
      </div>
      <nav aria-label="Más consejos" style={{ marginTop: 40 }}>
        <ul className={ui.pillRow}>
          {others.map((item) => (
            <li key={item.slug} style={{ listStyle: 'none' }}>
              <Link href={`${V2_BASE}/consejos/${item.slug}`} className={ui.pill}>
                {item.title}
              </Link>
            </li>
          ))}
          <li style={{ listStyle: 'none' }}>
            <Link href={`${V2_BASE}/consejos`} className={`${ui.pill} ${ui.pillDark}`}>
              Ver todos los consejos
            </Link>
          </li>
        </ul>
      </nav>
    </V2Page>
  );
}
