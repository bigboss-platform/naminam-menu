import 'server-only';
import { MongoClient } from 'mongodb';
import { cache } from 'react';
import { FALLBACK_SITE_DATA } from '@/features/core/data/fallbackSiteData';
import type { SiteData, SiteSettings } from '@/features/core/types/SiteData.type';
import type { Category, Product } from '@/features/menu/types/Product.type';

/**
 * The public site's single data source. Reads the menu + business info that the back
 * office (naminam/backoffice-app) writes to MongoDB. Server-only — the browser never sees
 * MONGODB_URI. Without MONGODB_URI (or if MongoDB is down) it serves FALLBACK_SITE_DATA, so
 * the site never breaks. Pages are cached and refreshed every 60s + on demand (/api/revalidate).
 */
const globalForMongo = globalThis as typeof globalThis & { naminamSiteClient?: Promise<MongoClient> };

function getClient(uri: string): Promise<MongoClient> {
  globalForMongo.naminamSiteClient ??= new MongoClient(uri, { maxPoolSize: 3, serverSelectionTimeoutMS: 4000 }).connect();
  return globalForMongo.naminamSiteClient;
}

type ProductDocument = Product & { isAvailable: boolean; sortOrder: number };
type CategoryDocument = { slug: string; label: string; tagline: string; sortOrder: number };
type SettingsDocument = Partial<SiteSettings> & { _id: string };

async function readFromMongo(uri: string, dbName: string): Promise<SiteData> {
  const db = (await getClient(uri)).db(dbName);
  const [productDocs, categoryDocs, settingsDoc] = await Promise.all([
    db.collection<ProductDocument>('products').find({ isAvailable: true }).sort({ sortOrder: 1 }).toArray(),
    db.collection<CategoryDocument>('categories').find().sort({ sortOrder: 1 }).toArray(),
    db.collection<SettingsDocument>('settings').findOne({ _id: 'business' }),
  ]);

  const categories: Category[] = categoryDocs.map(({ slug, label, tagline }) => ({ id: slug, label, tagline }));
  const products: Product[] = productDocs.map((doc) => ({
    slug: doc.slug,
    name: doc.name,
    categoryId: doc.categoryId,
    price: doc.price,
    description: doc.description,
    note: doc.note,
    badge: doc.badge,
    isFeatured: doc.isFeatured,
    isAddOn: doc.isAddOn,
    mediaType: doc.mediaType === 'video' ? 'video' : 'image',
    mediaUrl: doc.mediaUrl ?? '',
    posterUrl: doc.posterUrl ?? '',
  }));
  const fallback = FALLBACK_SITE_DATA.settings;
  const settings: SiteSettings = {
    name: settingsDoc?.name || fallback.name,
    tagline: settingsDoc?.tagline ?? fallback.tagline,
    whatsappNumber: settingsDoc?.whatsappNumber || fallback.whatsappNumber,
    phoneNumber: settingsDoc?.phoneNumber ?? '',
    instagramHandle: settingsDoc?.instagramHandle ?? '',
    address: settingsDoc?.address ?? '',
    city: settingsDoc?.city ?? '',
    mapLatitude: settingsDoc?.mapLatitude ?? 0,
    mapLongitude: settingsDoc?.mapLongitude ?? 0,
    hours: (settingsDoc?.hours ?? []).map(({ label, opensAt, closesAt }) => ({ label, opensAt, closesAt })),
    heroImageUrl: settingsDoc?.heroImageUrl ?? '',
  };
  return { settings, categories, products };
}

export const getSiteData = cache(async (): Promise<SiteData> => {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB;
  if (!uri || !dbName) return FALLBACK_SITE_DATA;
  try {
    return await readFromMongo(uri, dbName);
  } catch (error) {
    console.error('[siteData] MongoDB no disponible — usando datos de respaldo:', error);
    return FALLBACK_SITE_DATA;
  }
});
