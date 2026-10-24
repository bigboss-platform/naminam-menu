/**
 * Downloads a subset of Material Symbols Outlined containing ONLY the icons this
 * site uses, as two static fonts (Google serves static instances when subsetting):
 *   src/app/fonts/material-symbols.ttf         → outline (FILL 0)
 *   src/app/fonts/material-symbols-filled.ttf  → filled  (FILL 1, `.icon-filled`)
 * Both are loaded with next/font/local in src/app/layout.tsx.
 *
 * Added a new icon? Add its name to ICON_NAMES and run:  node scripts/fetch-icon-font.mjs
 * Icon names: https://fonts.google.com/icons
 */
import { mkdir, writeFile } from 'node:fs/promises';

const ICON_NAMES = [
  'add', 'add_shopping_cart', 'arrow_back_ios_new', 'arrow_forward', 'auto_awesome', 'bakery_dining', 'block',
  'cake', 'call', 'celebration', 'chat_bubble', 'check', 'check_circle', 'close', 'cookie', 'delete',
  'delivery_dining', 'expand_more', 'favorite', 'gavel', 'home', 'icecream', 'info', 'ios_share', 'kitchen',
  'local_bar', 'location_on', 'mail', 'map', 'menu', 'menu_book', 'microwave', 'more_horiz', 'pie_chart',
  'redeem', 'remove', 'request_quote', 'restaurant', 'schedule', 'search', 'search_off', 'shopping_bag',
  'star', 'storefront', 'tapas', 'tips_and_updates', 'volunteer_activism', 'ac_unit', 'local_fire_department',
  'egg_alt', 'water_drop', 'handshake', 'eco',
];

async function downloadInstance(fill, fileName) {
  const cssUrl =
    `https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,${fill},0` +
    `&icon_names=${[...ICON_NAMES].sort().join(',')}&display=block`;
  const css = await (await fetch(cssUrl, { headers: { 'User-Agent': 'Mozilla/5.0 Chrome/120' } })).text();
  const fontUrl = css.match(/url\((https:[^)]+)\)/)?.[1];
  if (!fontUrl) throw new Error(`No font URL in Google Fonts response:\n${css}`);
  const font = Buffer.from(await (await fetch(fontUrl)).arrayBuffer());
  await writeFile(`src/app/fonts/${fileName}`, font);
  console.log(`${fileName}: ${ICON_NAMES.length} icons, ${(font.length / 1024).toFixed(1)} KB`);
}

await mkdir('src/app/fonts', { recursive: true });
await downloadInstance(0, 'material-symbols.ttf');
await downloadInstance(1, 'material-symbols-filled.ttf');
