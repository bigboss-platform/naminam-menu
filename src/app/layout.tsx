import type { Metadata, Viewport } from 'next';
import { Nunito, Shantell_Sans } from 'next/font/google';
import localFont from 'next/font/local';
import { SECTION_THEME } from '@/features/core/config/sectionTheme.config';
import { SiteSettingsProvider } from '@/features/core/context/SiteSettings.context';
import { getSiteData } from '@/server/siteData';
import './globals.css';

/**
 * Shared shell for both site versions: fonts, global styles and business settings.
 * Each version brings its own header/footer: app/(v1)/layout.tsx and app/v2/layout.tsx.
 * PRD 3.3 fonts (v1): Shantell Sans for titles, Nunito for body. v2 loads the mockup fonts.
 */
const displayFont = Shantell_Sans({ subsets: ['latin'], weight: ['400', '600', '700', '800'], variable: '--font-display', display: 'swap' });
const sansFont = Nunito({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
/** Self-hosted subsets of Material Symbols (only the icons we use) — see scripts/fetch-icon-font.mjs */
const iconFont = localFont({ src: './fonts/material-symbols.ttf', variable: '--font-icons', display: 'block' });
const iconFilledFont = localFont({
  src: './fonts/material-symbols-filled.ttf',
  variable: '--font-icons-filled',
  display: 'block',
});

const DESCRIPTION = 'Tequeños, quesillos, tortas y pasapalos venezolanos con giros peruanos, hechos a mano en San Martín de Porres, Lima. Delivery gratis en SMP.';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Los Antojitos de Santanita · Antojitos venezolanos en Lima',
    template: '%s · Los Antojitos de Santanita',
  },
  description: DESCRIPTION,
  appleWebApp: { capable: true, title: 'Santanita', statusBarStyle: 'default' },
  openGraph: {
    title: 'Los Antojitos de Santanita',
    description: 'La felicidad empieza por un buen bocado.',
    locale: 'es_PE',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#fff6e4',
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { settings } = await getSiteData();
  return (
    <html
      lang="es-PE"
      data-section-theme={SECTION_THEME}
      className={`${displayFont.variable} ${sansFont.variable} ${iconFont.variable} ${iconFilledFont.variable}`}
    >
      <body>
        <SiteSettingsProvider settings={settings}>{children}</SiteSettingsProvider>
      </body>
    </html>
  );
}
