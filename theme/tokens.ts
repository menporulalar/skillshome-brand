/**
 * SkillsHome brand tokens — "Ascending Facets" identity.
 *
 * BRAND is the core 5-color identity used by the logo (see ../logo/SkillsHomeLogo.tsx) —
 * do not recolour outside this set. THEME is the broader app-chrome palette (surfaces,
 * borders, grid pattern) derived from BRAND, used to style page layout. A future
 * white-labeled tenant would likely swap THEME but keep BRAND, or swap both — kept as
 * two separate exports so either is independently reusable.
 */

export const BRAND = {
  navy: '#1E3A5F',
  teal: '#028090',
  mint: '#02C39A',
  offWhite: '#EAF2F1',
  tealLight: '#39ADBD',
} as const;

/** Current production app-chrome theme ("Brand dark skin" — deep-navy surfaces, teal/mint accents). */
export const THEME = {
  bg: '#0e2236',
  panel: '#14304a',
  panel2: '#112a41',
  ink: '#eaf2f1',
  ink2: '#a9c0c4',
  ink3: '#6e8b92',
  line: '#244257',
  accent: '#02c39a',
  acBg: '#16323f',
  grid: 'rgba(2,195,154,.05)',
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

export type BrandPalette = typeof BRAND;
export type ThemePalette = typeof THEME;
