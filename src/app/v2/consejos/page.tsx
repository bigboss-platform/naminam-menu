import type { Metadata } from 'next';
import Link from 'next/link';
import { TIP_ARTICLES } from '@/features/content/data/tips.data';
import { V2Page } from '@/features/v2/components/V2Page.component';
import { V2_BASE } from '@/features/v2/config/v2Nav.constants';
import ui from '@/features/v2/styles/V2Content.module.css';

export const metadata: Metadata = {
  title: 'Consejos de consumo',
  description: 'Cómo freír, hornear, guardar y recalentar tequeños, quesillos y postres venezolanos para que sepan como recién hechos.',
};

const TONES = [ui.teal, ui.pink, ui.yellow];
/** Emoji per article icon (the mockup uses playful glyphs, not UI icons). */
const EMOJI: Record<string, string> = {
  ac_unit: '❄️', kitchen: '🧊', local_fire_department: '🔥', microwave: '♨️', water_drop: '🥣', egg_alt: '🥚', handshake: '🤝',
};

export default function V2TipsPage() {
  return (
    <V2Page title="Consejos de consumo" intro="Todo lo que necesitas saber para disfrutar tus antojitos como recién salidos de la cocina de Santanita.">
      <ul className={ui.cards}>
        {TIP_ARTICLES.map((article, index) => (
          <li key={article.slug}>
            <Link href={`${V2_BASE}/consejos/${article.slug}`} className={`${ui.card} ${TONES[index % TONES.length]}`}>
              <span className={ui.cardIcon} aria-hidden="true">
                {EMOJI[article.icon] ?? '✨'}
              </span>
              <h2 className={ui.cardTitle}>{article.title}</h2>
              <p className={ui.cardText}>{article.summary}</p>
              <span className={ui.cardMeta}>{article.readingMinutes} min de lectura</span>
            </Link>
          </li>
        ))}
      </ul>
    </V2Page>
  );
}
