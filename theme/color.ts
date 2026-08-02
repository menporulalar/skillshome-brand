/**
 * Color helpers for consumers of ./tokens.
 *
 * Exists so alpha variants of a brand color don't get hand-written as
 * `rgba(158,141,255,.16)` — those literals survive recolors and were the most
 * common way the palette drifted out of sync.
 */

/** `withAlpha(BRAND.blueLight, 0.16)` -> `rgba(158, 141, 255, 0.16)`. */
export function withAlpha(hex: string, alpha: number): string {
  const m = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex);
  if (!m) throw new Error(`withAlpha expects a 6-digit hex color, got: ${hex}`);
  const [r, g, b] = m.slice(1).map((c) => parseInt(c, 16));
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
