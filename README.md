# SkillsHome brand

Shared brand identity and app-chrome theme for the SkillsHome repos — `skillshome-app`,
`skillshome-desktop`, `skillshome-marketing`. Each of those repos consumes this one as a git
submodule at `brand/`.

## Layout

```
theme/
  tokens.ts            ** the only place a hex value is written **
                       BRAND (core 5-color identity, do not recolour outside this set),
                       LIGHT_THEME / DARK_THEME (app-chrome palettes derived from BRAND),
                       CONSOLE_THEME / LATTICE_THEME (archived, kept for reference)
  tokens.css           GENERATED — CSS custom properties (`--brand-*`) for consumers whose
                       stylesheets can't import a .ts module
logo/
  SkillsHomeLogo.tsx   SkillsHomeIcon + SkillsHomeWordmark components. "Ascending Facets"
                       mark: three interlocking chevrons rising bottom -> top. Imports its
                       colors from theme/tokens — no hex of its own.
  assets/              GENERATED — static SVG mark variants (icon, color/color-dark/mono/
                       reversed)
scripts/
  build-tokens.mjs     regenerates tokens.css + logo/assets/*.svg from tokens.ts
```

`BRAND` is the actual trademark-level identity — logo colors, unlikely to change often.
`LIGHT_THEME`/`DARK_THEME` are page-chrome palettes (surfaces, borders, grid) built on top of
`BRAND` — more likely to vary per-surface or, eventually, per-tenant. Kept as separate exports
so a consumer can take just the logo, just a theme, or both.

## Changing a brand color

Edit `theme/tokens.ts`, then:

```bash
npm run build     # regenerates tokens.css + every SVG mark variant
```

Commit the regenerated files alongside the token change. `npm run check` re-derives every
output and exits non-zero if a committed file no longer matches `tokens.ts` — wire it into CI
in each consuming repo so a half-applied recolor can't merge. (It exists because
`skillshome-mark-color.svg` sat on a superseded hex for three weeks when the assets were
maintained by hand.)

**Never** write a hex literal outside `tokens.ts`. Consumers import `BRAND`/`LIGHT_THEME`/
`DARK_THEME` in TS, or `var(--brand-*)` from `tokens.css` in CSS.

## Using this repo

Each consuming repo has this as a submodule at `brand/`. On a fresh clone:

```bash
git clone --recurse-submodules <repo-url>
# or, if you already cloned without that flag:
git submodule update --init
```

Import directly by relative path — no build step of its own:

```tsx
import { SkillsHomeIcon } from '../brand/logo/SkillsHomeLogo';
import { BRAND, THEME } from '../brand/theme/tokens';
```

To pull the latest brand changes into a consuming repo:

```bash
cd brand
git pull origin main
cd ..
git add brand
git commit -m "chore: bump brand submodule"
```

## Relationship to skillshome-specs

Separate repo, not folded into `skillshome-specs`, on purpose: specs are read-only reference
material never touched by a build; this repo's contents *are* imported at build time. Mixing
the two would mean CI sometimes needs submodules recursed and sometimes doesn't, depending on
which files a given consumer happens to touch — kept apart so the contract per submodule stays
unambiguous (`specs/` never needs recursing in CI, `brand/` always does).
