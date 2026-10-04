/**
 * Builds every logo asset from the client's original artwork.
 *   input : public/brand/logo-original.png  (square, peach background — keep untouched)
 *   output: public/brand/logo.png           (lettering only, transparent bg, trimmed) → header/footer
 *           src/app/icon.png                (512px square, original bg)               → browser tab
 *           src/app/apple-icon.png          (180px square, original bg)               → iPhone home screen
 *
 * New logo from the client? Replace logo-original.png and run:  node scripts/process-logo.mjs
 */
import sharp from 'sharp';

const SOURCE = 'public/brand/logo-original.png';
// Colour distance from the background where a pixel starts / finishes being opaque
// (soft ramp keeps the lettering edges anti-aliased).
const TRANSPARENT_BELOW = 18;
const OPAQUE_ABOVE = 70;

const { data, info } = await sharp(SOURCE).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const [bgR, bgG, bgB] = [data[0], data[1], data[2]]; // top-left pixel = background colour

for (let offset = 0; offset < data.length; offset += 4) {
  const distance = Math.hypot(data[offset] - bgR, data[offset + 1] - bgG, data[offset + 2] - bgB);
  const ratio = (distance - TRANSPARENT_BELOW) / (OPAQUE_ABOVE - TRANSPARENT_BELOW);
  data[offset + 3] = Math.round(255 * Math.min(1, Math.max(0, ratio)));
}

await sharp(data, { raw: info })
  .trim({ threshold: 1 })
  .extend({ top: 8, bottom: 8, left: 8, right: 8, background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile('public/brand/logo.png');

await sharp(SOURCE).resize(512, 512).png().toFile('src/app/icon.png');
await sharp(SOURCE).resize(180, 180).png().toFile('src/app/apple-icon.png');

const meta = await sharp('public/brand/logo.png').metadata();
console.log(`logo.png ${meta.width}x${meta.height} · background was rgb(${bgR}, ${bgG}, ${bgB})`);
