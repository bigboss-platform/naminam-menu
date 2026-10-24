import type { Metadata } from 'next';
import { Fredoka, Quicksand } from 'next/font/google';
import { V2Footer } from '@/features/v2/components/V2Footer.component';
import { V2Header } from '@/features/v2/components/V2Header.component';
import styles from '@/features/v2/styles/V2Theme.module.css';
import { getSiteData } from '@/server/siteData';

/** Version 2: the client's mockup (Fredoka + Quicksand, cartoon outlines). */
const fredoka = Fredoka({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-fredoka', display: 'swap' });
const quicksand = Quicksand({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-quicksand', display: 'swap' });

export const metadata: Metadata = {
  title: {
    default: 'Los Antojitos de Santanita',
    template: '%s · Los Antojitos de Santanita',
  },
};

export default async function V2Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { settings } = await getSiteData();
  return (
    <div className={`${fredoka.variable} ${quicksand.variable} ${styles.site}`}>
      <V2Header />
      <main className={styles.main}>{children}</main>
      <V2Footer settings={settings} />
    </div>
  );
}
