import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Vollkorn } from 'next/font/google';
import localFont from 'next/font/local';
import { BottomNav } from '@/features/core/components/BottomNav.component';
import { FloatingContactButtons } from '@/features/core/components/FloatingContactButtons.component';
import { Footer } from '@/features/core/components/Footer.component';
import { TopBar } from '@/features/core/components/TopBar.component';
import './globals.css';

const displayFont = Vollkorn({ subsets: ['latin'], variable: '--font-display', display: 'swap' });
const sansFont = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
/** Self-hosted subsets of Material Symbols (only the icons we use) — see scripts/fetch-icon-font.mjs */
const iconFont = localFont({ src: './fonts/material-symbols.ttf', variable: '--font-icons', display: 'block' });
const iconFilledFont = localFont({
  src: './fonts/material-symbols-filled.ttf',
  variable: '--font-icons-filled',
  display: 'block',
});

export const metadata: Metadata = {
  title: {
    default: 'Ñami Ñam · Dulcería-Pastelería',
    template: '%s · Ñami Ñam',
  },
  description: 'Postres, cheesecakes y dulces hechos para consentirte. Pide por WhatsApp.',
  appleWebApp: { capable: true, title: 'Ñami Ñam', statusBarStyle: 'default' },
  openGraph: {
    title: 'Ñami Ñam · Dulcería-Pastelería',
    description: 'Un poquito de felicidad en cada bocado.',
    locale: 'es_VE',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#fdf6f0',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${displayFont.variable} ${sansFont.variable} ${iconFont.variable} ${iconFilledFont.variable}`}>
      <body>
        <TopBar />
        <main>{children}</main>
        <Footer />
        <BottomNav />
        <FloatingContactButtons />
      </body>
    </html>
  );
}
