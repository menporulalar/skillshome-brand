/**
 * SkillsHome theme system — unified export for all available themes.
 *
 * Themes:
 * - 'light': Primary production theme (white surfaces, brass accents)
 * - 'dark': Marketing / admin / legal warm-black skin (brass accents)
 * - 'console': Archived lime/charcoal aesthetic
 * - 'lattice': Archived dark-first design system (oklch-based, graph-native)
 */

export { BRAND, LIGHT_THEME, DARK_THEME, CONSOLE_THEME, LATTICE_THEME } from './tokens';
export type {
  BrandPalette,
  LightThemePalette,
  DarkThemePalette,
  ThemeId,
} from './tokens';

/**
 * Get human-readable name for a theme ID
 */
export function getThemeName(themeId: string): string {
  const names: Record<string, string> = {
    light: 'SkillsHome (Default)',
    dark: 'SkillsHome (Admin dark)',
    console: 'Console (Archived)',
    lattice: 'Lattice (Archived)',
  };
  return names[themeId] || themeId;
}

/**
 * Theme metadata for admin UI
 */
export const AVAILABLE_THEMES = [
  {
    id: 'light',
    name: 'SkillsHome (Default)',
    description: 'Current production theme — white surfaces, brass accents',
  },
  {
    id: 'dark',
    name: 'SkillsHome (Admin dark)',
    description: 'Warm-black skin used for marketing, admin portal and legal pages',
  },
  {
    id: 'console',
    name: 'Console (Archived)',
    description: 'Original lime and charcoal aesthetic — retained for reference',
  },
  {
    id: 'lattice',
    name: 'Lattice (Archived)',
    description: 'Prior candidate design system — oklch colors, graph-native, four semantic hues',
  },
] as const;
