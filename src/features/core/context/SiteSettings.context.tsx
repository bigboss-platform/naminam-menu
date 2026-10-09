'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { FALLBACK_SITE_DATA } from '../data/fallbackSiteData';
import type { SiteSettings } from '../types/SiteData.type';

/**
 * Business info (WhatsApp, Instagram, address…) for client components. The root layout
 * reads it on the server (src/server/siteData.ts) and passes it down once.
 */
const SiteSettingsContext = createContext<SiteSettings>(FALLBACK_SITE_DATA.settings);

export function SiteSettingsProvider({ settings, children }: { settings: SiteSettings; children: ReactNode }) {
  return <SiteSettingsContext.Provider value={settings}>{children}</SiteSettingsContext.Provider>;
}

export function useSiteSettings(): SiteSettings {
  return useContext(SiteSettingsContext);
}
