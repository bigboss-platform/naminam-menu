import 'server-only';
import { cache } from 'react';
import { STATIC_SITE_DATA } from '@/features/core/data/staticSiteData';
import type { SiteData } from '@/features/core/types/SiteData.type';

/**
 * The public site's single data source. MVP: static data (menu.data.ts + business.config.ts),
 * no database. When the back office is connected later, only this function changes.
 */
export const getSiteData = cache(async (): Promise<SiteData> => STATIC_SITE_DATA);
