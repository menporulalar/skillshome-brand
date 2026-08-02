/**
 * Palette-swaps the wordmark lockup PNGs (logo/assets/skillshome-logo-{dark,light}.png).
 *
 * Unlike every other asset these can't be regenerated from tokens.ts: they contain
 * rendered Sora text, and re-rendering would depend on the font being installed and
 * would not reproduce the original kerning. So a recolor remaps their pixels instead —
 * each pixel snaps to the nearest color in the OLD palette and takes the corresponding
 * NEW color, with alpha preserved so the anti-aliasing survives.
 *
 * This is a one-shot migration, not part of `npm run build`: it needs to know the
 * palette being replaced, which tokens.ts no longer records after the edit. Run it in
 * the same commit as a BRAND change, passing the previous values:
 *
 *   node --experimental-strip-types scripts/recolor-raster-lockups.mjs \
 *     --from '#423182,#786cc2,#9e8dff,#cac4ff,#f4f5f8'
 *
 * --from is the old blueDeep,blue,blueLight,blueSky,white in that order; the new values
 * are read from tokens.ts. Requires sharp (borrowed from the consuming repo).
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { BRAND } from '../theme/tokens.ts';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const fromArg = process.argv[process.argv.indexOf('--from') + 1];
if (!process.argv.includes('--from') || !fromArg) {
  console.error('Missing --from "<old blueDeep,blue,blueLight,blueSky,white>". See the header comment.');
  process.exit(1);
}

const parse = (hex) => {
  const m = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex.trim());
  if (!m) throw new Error(`Not a 6-digit hex color: ${hex}`);
  return m.slice(1).map((c) => parseInt(c, 16));
};

const oldPalette = fromArg.split(',').map(parse);
const newPalette = [BRAND.blueDeep, BRAND.blue, BRAND.blueLight, BRAND.blueSky, BRAND.white].map(parse);

if (oldPalette.length !== newPalette.length) {
  console.error(`--from needs exactly ${newPalette.length} colors, got ${oldPalette.length}.`);
  process.exit(1);
}

const require = createRequire(import.meta.url);
let sharp = null;
for (const from of [ROOT, join(ROOT, '..')]) {
  try {
    sharp = (await import(pathToFileURL(require.resolve('sharp', { paths: [from] })).href)).default;
    break;
  } catch {
    /* try the next location */
  }
}
if (!sharp) {
  console.error('sharp is not resolvable — run this from a repo that has it installed (e.g. skillshome-app).');
  process.exit(1);
}

/** Index of the old-palette entry closest to (r,g,b) by squared RGB distance. */
const nearest = (r, g, b) => {
  let best = 0;
  let bestDistance = Infinity;
  oldPalette.forEach(([pr, pg, pb], i) => {
    const d = (r - pr) ** 2 + (g - pg) ** 2 + (b - pb) ** 2;
    if (d < bestDistance) {
      bestDistance = d;
      best = i;
    }
  });
  return best;
};

for (const name of ['skillshome-logo-dark.png', 'skillshome-logo-light.png']) {
  const path = join(ROOT, 'logo/assets', name);
  const { data, info } = await sharp(readFileSync(path))
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  let remapped = 0;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] === 0) continue;
    const [r, g, b] = newPalette[nearest(data[i], data[i + 1], data[i + 2])];
    if (data[i] !== r || data[i + 1] !== g || data[i + 2] !== b) remapped++;
    data[i] = r;
    data[i + 1] = g;
    data[i + 2] = b;
  }

  const out = await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toBuffer();
  writeFileSync(path, out);
  console.log(`${name}: remapped ${remapped} pixel(s)`);
}
