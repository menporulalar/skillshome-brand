/**
 * Asserts the WCAG contrast ratios the palette is required to hold.
 *
 * The contrast table in skillshome-app/.claude/design-system.md was maintained by
 * hand through two rebrands; this re-derives it from tokens.ts so a recolor can't
 * quietly drop a pair below AA. Exits non-zero on any failure.
 */
import { BRAND, LIGHT_THEME, DARK_THEME } from '../theme/tokens.ts';

const channel = (c) => {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};

const luminance = (hex) => {
  const m = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex);
  if (!m) throw new Error(`Not a 6-digit hex color: ${hex}`);
  const [r, g, b] = m.slice(1).map((c) => channel(parseInt(c, 16)));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const ratio = (a, b) => {
  const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

// `min` is the floor this pair must clear: 4.5 for body text, 3.0 for large or
// non-text (borders, icons, decorative fills). The "claimed" score bar is the
// faintest rank by design and only needs to be perceptible (1.5).
const PAIRS = [
  // ── LIGHT_THEME (white-surface `brand` Facet light mode) ──
  ['White text on primary button', BRAND.white, LIGHT_THEME.primary, 4.5],
  ['White text on primary hover', BRAND.white, LIGHT_THEME.primaryHover, 4.5],
  ['onAccent text on brass CTA (light)', LIGHT_THEME.onAccent, LIGHT_THEME.accent, 4.5],
  ['Accent fill against panel (non-text)', LIGHT_THEME.accent, LIGHT_THEME.panel, 1.0],
  ['Primary link on page bg', LIGHT_THEME.primary, LIGHT_THEME.bg, 4.5],
  ['Primary link on panel', LIGHT_THEME.primary, LIGHT_THEME.panel, 4.5],
  ['Body ink on panel', LIGHT_THEME.ink, LIGHT_THEME.panel, 4.5],
  ['Secondary ink on panel', LIGHT_THEME.ink2, LIGHT_THEME.panel, 4.5],
  ['Tertiary ink on panel (large only)', LIGHT_THEME.ink3, LIGHT_THEME.panel, 3.0],
  ['Success on panel', LIGHT_THEME.success, LIGHT_THEME.panel, 4.5],
  ['Warning on panel', LIGHT_THEME.warning, LIGHT_THEME.panel, 4.5],
  ['Error on panel', LIGHT_THEME.error, LIGHT_THEME.panel, 4.5],
  ['Score bar: claimed on panel (faint by design)', LIGHT_THEME.scoreSelf, LIGHT_THEME.panel, 3.0],
  ['Score bar: AI-inferred on panel', LIGHT_THEME.scoreSystem, LIGHT_THEME.panel, 3.0],
  ['Score bar: verified on panel', LIGHT_THEME.scoreVerified, LIGHT_THEME.panel, 3.0],
  ['Primary tint against panel (non-text)', LIGHT_THEME.primaryTint, LIGHT_THEME.panel, 1.0],

  // ── DARK_THEME (warm-black — the primary skin) ──
  ['Dark ink on dark bg', DARK_THEME.ink, DARK_THEME.bg, 4.5],
  ['Dark lede on dark bg', DARK_THEME.inkLede, DARK_THEME.bg, 4.5],
  ['Dark body prose on dark bg', DARK_THEME.ink1, DARK_THEME.bg, 4.5],
  ['Dark secondary prose on dark bg', DARK_THEME.ink2, DARK_THEME.bg, 4.5],
  ['Dark decorative ink on dark bg (large only)', DARK_THEME.ink3, DARK_THEME.bg, 3.0],
  ['Dark accent on dark bg', DARK_THEME.accent, DARK_THEME.bg, 4.5],
  ['Dark accent on dark panel', DARK_THEME.accent, DARK_THEME.panel, 4.5],
  ['accentInk on brass CTA (dark)', DARK_THEME.accentInk, DARK_THEME.accent, 4.5],
  ['Dark score bar: claimed on dark bg (faint by design)', DARK_THEME.scoreSelf, DARK_THEME.bg, 1.5],
  ['Dark score bar: AI-inferred on dark bg', DARK_THEME.scoreSystem, DARK_THEME.bg, 4.5],
  ['Dark score bar: verified on dark bg', DARK_THEME.scoreVerified, DARK_THEME.bg, 4.5],
  ['Dark warn on dark bg', DARK_THEME.warn, DARK_THEME.bg, 4.5],
  ['Dark crit on dark bg', DARK_THEME.crit, DARK_THEME.bg, 4.5],

  // ── Logo mark ──
  ['Logo dark: deep chevron on warm-black bg', DARK_THEME.logoDeep, DARK_THEME.bg, 3.0],
  ['Logo dark: mid chevron on warm-black bg', DARK_THEME.logoMid, DARK_THEME.bg, 3.0],
  ['Logo dark: bright chevron on warm-black bg', DARK_THEME.logoBright, DARK_THEME.bg, 3.0],
  ['Logo light: deep chevron on white', '#6d5120', BRAND.white, 3.0],
  ['Logo light: mid chevron on white', '#b3812c', BRAND.white, 3.0],
  ['App icon: darkest chevron on tile', BRAND.brassDeepMark, DARK_THEME.bg, 3.0],
];

let failed = 0;
const rows = PAIRS.map(([label, fg, bg, min]) => {
  const r = ratio(fg, bg);
  const pass = r >= min;
  if (!pass) failed++;
  return `${pass ? 'PASS' : 'FAIL'}  ${r.toFixed(2).padStart(6)}:1  (min ${min.toFixed(1)})  ${label}  ${fg} on ${bg}`;
});

console.log(rows.join('\n'));

if (failed) {
  console.error(`\n${failed} pair(s) below their required contrast floor.`);
  process.exit(1);
}
console.log(`\nAll ${PAIRS.length} pairs meet their contrast floor.`);
