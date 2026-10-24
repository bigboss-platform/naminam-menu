import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { BRAND_ASSETS } from '@/features/core/config/brandAssets.config';
import { ABOUT_STORY, BRAND_VALUES } from '@/features/content/data/pages.data';
import { V2Page } from '@/features/v2/components/V2Page.component';
import { V2_BASE } from '@/features/v2/config/v2Nav.constants';
import ui from '@/features/v2/styles/V2Content.module.css';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Sobre Santanita',
  description: 'Quiénes somos: antojitos venezolanos hechos a mano en San Martín de Porres, Lima, con giros peruanos.',
};

const TONES = [ui.teal, ui.pink, ui.yellow, ui.cream];
const EMOJI = ['🤲', '🌿', '💛', '✨'];

export default function V2AboutPage() {
  return (
    <V2Page title="Sobre Santanita">
      <div className={styles.story}>
        <div className={ui.mascotFrame}>
          <Image src={BRAND_ASSETS.aboutPhoto || BRAND_ASSETS.mascot} alt="Santanita" fill sizes="300px" className={ui.mascotImage} />
        </div>
        <div className={ui.prose}>
          {ABOUT_STORY.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>

      <h2 className={styles.valuesTitle}>Lo que nos mueve</h2>
      <ul className={`${ui.cards} ${styles.values}`}>
        {BRAND_VALUES.map((value, index) => (
          <li key={value.title} className={`${ui.card} ${TONES[index % TONES.length]}`}>
            <span className={ui.cardIcon} aria-hidden="true">
              {EMOJI[index]}
            </span>
            <h3 className={ui.cardTitle}>{value.title}</h3>
            <p className={ui.cardText}>{value.text}</p>
          </li>
        ))}
      </ul>

      <div className={ui.center}>
        <Link href={`${V2_BASE}/menu`} className={`${ui.button} ${ui.buttonTeal}`}>
          Probar nuestros antojitos
        </Link>
      </div>
    </V2Page>
  );
}
