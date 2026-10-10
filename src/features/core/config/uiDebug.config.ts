/**
 * UI/UX audit helpers (element code tags + component outlines). Turn on with
 * NEXT_PUBLIC_UI_DEBUG=true in .env.local — never set it on the production host.
 */
export const IS_UI_DEBUG = process.env.NEXT_PUBLIC_UI_DEBUG === 'true';

/** Fake "Test N · …" products appended to the home wheel to stress-test it (UI debug only). */
export const UI_DEBUG_WHEEL_EXTRA_ITEMS = IS_UI_DEBUG
  ? Number(process.env.NEXT_PUBLIC_UI_DEBUG_WHEEL_EXTRA_ITEMS ?? '0') || 0
  : 0;
