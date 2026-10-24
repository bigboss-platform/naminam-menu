import { BottomNav } from '@/features/core/components/BottomNav.component';
import { FloatingContactButtons } from '@/features/core/components/FloatingContactButtons.component';
import { Footer } from '@/features/core/components/Footer.component';
import { ThemeSwitcher } from '@/features/core/components/ThemeSwitcher.component';
import { TopBar } from '@/features/core/components/TopBar.component';
import { getSiteData } from '@/server/siteData';

/** Version 1 (our layout with Santanita's branding): top bar, footer, mobile tab bar. */
export default async function V1Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { settings } = await getSiteData();
  return (
    <>
      <TopBar />
      <main>{children}</main>
      <Footer settings={settings} />
      <BottomNav />
      <FloatingContactButtons />
      <ThemeSwitcher />
    </>
  );
}
