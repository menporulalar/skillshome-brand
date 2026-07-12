/**
 * SkillsHomeLogo — canonical logo component used across the entire app.
 *
 * Direction: "Ascending Facets" (brand handoff, design_handoff_skillshome_logo).
 * Three interlocking, constant-weight chevrons stacked and rising
 * (navy → teal → mint, bottom to top). Reads as layered verified skills, an
 * upward arrow (growth), and a roofline (home).
 *
 * Palette (final — do not recolour outside this set):
 *   Navy #1E3A5F · Teal #028090 · Mint #02C39A
 *   On dark → Off-white #EAF2F1 · Teal-light #39ADBD · Mint #02C39A
 *
 * Props:
 *  variant — "light" (navy/teal/mint on light bg) | "dark" (off-white/teal-light/mint on dark bg)
 *  size    — Tailwind height class, e.g. "h-8", "h-9", "h-12"   default: "h-9"
 */

interface SkillsHomeLogoProps {
  variant?: 'light' | 'dark';
  size?: string;
}

// Brand palette
const BRAND = {
  navy: '#1E3A5F',
  teal: '#028090',
  mint: '#02C39A',
  offWhite: '#EAF2F1',
  tealLight: '#39ADBD',
} as const;

// Chevron path geometry on the 64×64 grid (final, from the brand spec).
const CHEVRONS = {
  bottom: 'M13 57 L32 38 L51 57 L44 57 L32 45 L20 57 Z',
  middle: 'M17 38 L32 23 L47 38 L40.8 38 L32 29.2 L23.2 38 Z',
  top:    'M21 21 L32 10 L43 21 L37.6 21 L32 15.4 L26.4 21 Z',
} as const;

export function SkillsHomeIcon({ variant = 'light', size = 'h-9' }: SkillsHomeLogoProps) {
  const c =
    variant === 'dark'
      ? { bottom: BRAND.offWhite, middle: BRAND.tealLight, top: BRAND.mint }
      : { bottom: BRAND.navy, middle: BRAND.teal, top: BRAND.mint };

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${size} w-auto flex-shrink-0`}
      role="img"
      aria-label="SkillsHome"
    >
      <path d={CHEVRONS.bottom} fill={c.bottom} />
      <path d={CHEVRONS.middle} fill={c.middle} />
      <path d={CHEVRONS.top} fill={c.top} />
    </svg>
  );
}

/** Full lockup: mark + "Skills·Home" wordmark side by side (Sora 700, −0.03em) */
export function SkillsHomeWordmark({
  variant = 'light',
  size = 'h-9',
}: SkillsHomeLogoProps) {
  const skillsColor = variant === 'dark' ? BRAND.offWhite : BRAND.navy;
  const homeColor = variant === 'dark' ? BRAND.mint : BRAND.navy;

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <SkillsHomeIcon variant={variant} size={size} />
      <span
        style={{
          fontFamily: '"Sora", system-ui, sans-serif',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          fontSize: '1.18em',
          lineHeight: 1,
        }}
      >
        <span style={{ color: skillsColor }}>Skills</span>
        <span style={{ color: homeColor }}>Home</span>
      </span>
    </span>
  );
}

export default SkillsHomeWordmark;
