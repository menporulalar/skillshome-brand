/**
 * SkillsHome brand tokens — "Ascending Facets" identity, Purple/White system.
 *
 * BRAND is the core 5-color identity used by the logo (see ../logo/SkillsHomeLogo.tsx) —
 * do not recolour outside this set. LIGHT_THEME is the primary app-chrome palette (white
 * surfaces, purple accents) used across the main product. DARK_THEME is the dark-navy skin
 * used for admin/legal surfaces. Both derive their primary hue from BRAND.blue (kept the
 * `blue*` key names for continuity even though the hue is now purple — recolored 2026-07-27
 * to match LATTICE_THEME's --brand hue, oklch(0.71 0.17 288)).
 *
 * Multiple themes are available:
 * - LIGHT_THEME: Primary app-chrome (white bg, purple accents) — current default
 * - DARK_THEME: Admin portal / legal-page dark skin (deep navy, purple accents)
 * - CONSOLE_THEME: Archived console theme (lime/charcoal)
 * - LATTICE_THEME: Archived dark-first design system (oklch-based, graph-native) — this is
 *   where the new purple hue comes from; not itself changed by this recolor
 *
 * A future white-labeled tenant would likely swap LIGHT_THEME/DARK_THEME but keep BRAND,
 * or swap both.
 *
 * Only the brand-hue fields moved in this recolor (primary/accent/info/scoreSelf and their
 * tints/hovers). Neutral surfaces/ink and the other semantic colors (success/warning/error/
 * scoreVerified) are unchanged — they were never derived from BRAND's blue.
 *
 * All foreground/background pairs below are WCAG AA-checked (>=4.5:1 for body text,
 * >=3:1 for large/tertiary text) — see .claude/design-system.md in skillshome-app for the
 * contrast table.
 */

export const BRAND = {
  blueDeep: '#423182',
  blue: '#7166b6',
  blueLight: '#9e8dff',
  white: '#FFFFFF',
  blueSky: '#cac4ff',
} as const;

/** Primary app-chrome theme — white surfaces, purple accents, cool-gray neutrals. */
export const LIGHT_THEME = {
  // Surfaces
  bg: '#F7F9FC',
  panel: '#FFFFFF',
  panel2: '#F3F6FA',
  line: '#E4E7EB',
  lineStrong: '#C9D1D9',

  // Text
  ink: '#1D1F22',
  ink2: '#566573',
  ink3: '#86929D',

  // Primary / interactive
  primary: '#7166b6',
  primaryHover: '#4d3898',
  primaryTint: '#f3f2fd',
  accent: '#9e8dff',

  // Scoring triad (self-assessed / system-evaluated / verified)
  scoreSelf: '#7166b6',
  scoreSystem: '#6E42CC',
  scoreVerified: '#057642',

  // Semantic
  success: '#057642',
  warning: '#B45309',
  error: '#CC1016',
  info: '#9e8dff',

  sans: '"Sora", system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
} as const;

/**
 * Admin portal / legal-page dark skin ("Brand dark skin" — near-black surfaces, purple
 * accents). Neutrals unified 2026-07-27 to match LATTICE_THEME's bg0/bg1/bg2/line/fg
 * scale (was deep-navy, kept as its own palette from before this recolor) — app and
 * marketing now share one dark neutral scale, not just the accent hue.
 */
export const DARK_THEME = {
  bg: '#0f0f0f',
  panel: '#1a1a1a',
  panel2: '#252525',
  ink: '#f8f8f8',
  ink2: '#c8c8c8',
  ink3: '#888888',
  line: '#505050',
  accent: '#9e8dff',
  acBg: '#322f43',
  grid: 'rgba(158,141,255,.05)',

  // Scoring triad, brightened for dark surfaces
  scoreSelf: '#9e8dff',
  scoreSystem: '#9A7BE8',
  scoreVerified: '#3DDC97',

  sans: '"Sora", system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
} as const;

/**
 * Archived original "Console" (lime/charcoal) theme — retained so the look can be
 * restored or referenced. Also available as the `console` Facet theme in skillshome-app.
 */
export const CONSOLE_THEME = {
  bg: '#0d0e0a',
  panel: '#141611',
  panel2: '#101208',
  ink: '#eef0e2',
  ink2: '#9b9e8c',
  ink3: '#6a6d5d',
  line: '#25271d',
  accent: '#b6f04a',
  acBg: '#1c2410',
  grid: 'rgba(182,240,74,.05)',
  sans: '"Space Grotesk", system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
} as const;

/**
 * Archived — Lattice, a dark-first design system ported from ThinkAI.Social.
 * Uses oklch color space for precise perceptual control.
 * Four semantic edge-type hues: cite, elaborate, challenge, synthesise.
 * Kept for reference / possible future graph-native surfaces.
 */
export const LATTICE_THEME = {
  bgVoid: '#0a0a0a',
  bg0: '#0f0f0f',
  bg1: '#1a1a1a',
  bg2: '#252525',
  bg3: '#303030',

  lineSoft: '#3a3a3a',
  line: '#505050',

  fg3: '#5a5a5a',
  fg2: '#888888',
  fg1: '#c8c8c8',
  fg0: '#f8f8f8',

  cite: 'oklch(0.72 0.15 248)',
  elaborate: 'oklch(0.76 0.15 168)',
  challenge: 'oklch(0.73 0.16 42)',
  synthesise: 'oklch(0.71 0.17 295)',

  brand: 'oklch(0.71 0.17 288)',
  brandDim: 'oklch(0.58 0.13 288)',
  ok: 'oklch(0.76 0.15 168)',
  warn: 'oklch(0.80 0.15 85)',
  crit: 'oklch(0.66 0.20 25)',

  userScore: 'oklch(0.72 0.15 248)',
  systemScore: 'oklch(0.71 0.17 295)',
  verifiedScore: 'oklch(0.76 0.15 168)',

  sans: '"Space Grotesk", system-ui, sans-serif',
  serif: '"Newsreader", Georgia, "Times New Roman", serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
} as const;

export type BrandPalette = typeof BRAND;
export type LightThemePalette = typeof LIGHT_THEME;
export type DarkThemePalette = typeof DARK_THEME;

export type ThemeId = 'light' | 'dark' | 'console' | 'lattice';
