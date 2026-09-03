/**
 * SkillsHomeLogo — canonical logo component used across the entire app.
 *
 * Direction: "Ascending Facets" — three interlocking, constant-weight chevrons.
 * Per the approved "Brass on Warm Black" system (design_system_brass):
 *  - NO background tile. The mark is three bare chevrons; anything needing a
 *    contained lockup composes the tile at the call site.
 *  - The ramp brightens DOWNWARD — the top chevron is the darkest. Inverted it
 *    reads as a different mark.
 *  - viewBox is tightened to the artwork bounds (`11 8 42 51`); a 0 0 64 64 box
 *    left ~40% empty and rendered the mark undersized beside the wordmark.
 *  - Below ~20px use `variant="mono"` — a three-step ramp turns to mud.
 *
 * Colors come from the shared skillshome-brand submodule's BRAND so a recolor is
 * a one-file change there.
 *
 * Props:
 *  variant — "dark" (brass ramp, default everywhere on the dark chrome) |
 *            "light" (deepened ramp for white/paper) | "mono" (flat brass, <20px)
 *  size    — Tailwind height class, e.g. "h-8", "h-9"   default: "h-9"
 */
import { BRAND } from '../theme/tokens';

type Variant = 'dark' | 'light' | 'mono';

interface SkillsHomeLogoProps {
  variant?: Variant;
  size?: string;
}

// Chevron path geometry on the 64×64 grid. Geometry is fixed; only fills move.
const CHEVRONS = {
  bottom: 'M13 57 L32 38 L51 57 L44 57 L32 45 L20 57 Z',
  middle: 'M17 38 L32 23 L47 38 L40.8 38 L32 29.2 L23.2 38 Z',
  top:    'M21 21 L32 10 L43 21 L37.6 21 L32 15.4 L26.4 21 Z',
} as const;

/** [bottom (brightest), middle, top (darkest)] per variant. */
const RAMP: Record<Variant, readonly [string, string, string]> = {
  dark:  [BRAND.brassLight, BRAND.brass, BRAND.brassDeepMark],
  light: [BRAND.brass, '#b3812c', '#6d5120'],
  mono:  [BRAND.brass, BRAND.brass, BRAND.brass],
};

export function SkillsHomeIcon({ variant = 'dark', size = 'h-9' }: SkillsHomeLogoProps) {
  const [bottom, middle, top] = RAMP[variant];

  return (
    <svg
      viewBox="11 8 42 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${size} w-auto flex-shrink-0`}
      role="img"
      aria-label="SkillsHome"
    >
      <path d={CHEVRONS.bottom} fill={bottom} />
      <path d={CHEVRONS.middle} fill={middle} />
      <path d={CHEVRONS.top} fill={top} />
    </svg>
  );
}

/** Full lockup: mark + "Skills·Home" wordmark side by side (Sora 700, −0.03em) */
export function SkillsHomeWordmark({
  variant = 'dark',
  size = 'h-9',
}: SkillsHomeLogoProps) {
  const skillsColor = variant === 'light' ? BRAND.brassInk : '#f7f4ee';
  const homeColor = variant === 'light' ? '#6d5120' : BRAND.brass;

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
