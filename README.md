# SkillsHome brand

Shared brand identity and app-chrome theme for the SkillsHome repos — `skillshome-app`,
`skillshome-desktop`, `skillshome-marketing`. Each of those repos consumes this one as a git
submodule at `brand/`.

## Layout

```
logo/
  SkillsHomeLogo.tsx   SkillsHomeIcon + SkillsHomeWordmark components (zero app-specific
                       imports — portable as-is). "Ascending Facets" mark: three interlocking
                       chevrons, navy -> teal -> mint, bottom to top.
  assets/              exported static SVG/PNG variants (icon, color/mono/reversed marks,
                       favicons, app icons) generated from the same source
theme/
  tokens.ts            BRAND (core 5-color identity, do not recolour outside this set),
                       THEME (current production app-chrome palette derived from BRAND),
                       CONSOLE_THEME (archived alternate palette, kept for reference)
```

`BRAND` is the actual trademark-level identity — logo colors, unlikely to change often.
`THEME`/`CONSOLE_THEME` are page-chrome palettes (surfaces, borders, grid) built on top of
`BRAND` — more likely to vary per-surface or, eventually, per-tenant. Kept as separate exports
so a consumer can take just the logo, just a theme, or both.

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
