# CLAUDE.md — Ecliptic Explorer

Technical context for AI coding agents working in this repository.
Read this before making changes.

---

## 1. What this project is

An interactive web app that shows which constellation the Sun was actually in on a
given date, according to IAU constellation boundaries — as opposed to the traditional
12-sign tropical zodiac.

The astronomical facts the app is built on:

- The ecliptic passes through **13** IAU constellations, not 12. The extra one is **Ophiuchus**.
- The periods are **unequal**: Virgo 44 days, Scorpius 7 days, Ophiuchus 18 days.
- **Precession** has shifted the tropical signs roughly a month out of alignment with
  the constellations they are named after.

Data accuracy is the point of this project. A wrong date is a real defect, not a cosmetic one.

---

## 2. Stack

| Concern | Choice | Version |
|---|---|---|
| Framework | Next.js, App Router | 16.2.4 |
| UI | React | 19.2.4 |
| Language | TypeScript, `strict: true` | 5.9.3 |
| 3D | Three.js | 0.184.0 |
| 3D in React | @react-three/fiber | 9.6.1 |
| 3D helpers | @react-three/drei | 10.7.7 |
| State | Zustand | 5.0.12 |
| Animation | Framer Motion | 12.38.0 |
| Styling | Tailwind CSS | 4.2.4 |
| Testing | Vitest + Testing Library + jsdom | 4.1.5 |
| Hosting | Vercel | — |

Constraints:

- Never import `three` directly in a component — go through `@react-three/fiber`
  and `@react-three/drei`.
- No new dependencies without a stated reason. The dependency list is deliberately short.
- No environment variables. The app has no backend state, no secrets, and no external
  services; keep it that way unless a feature genuinely requires otherwise.

---

## 3. Architecture — four independent systems

The codebase is organized so that each concern has exactly one home. The boundaries
matter more than the file names.

### System 1 — Simulation (`app/simulation/`)
The 3D scene: Sun position, ecliptic ring, stars, asterisms, time controls.
Owns `SolarCanvas.tsx`, `TimeEngine.ts`, `SolarPosition.ts`, `EclipticPath.tsx`,
`NamedStars.tsx`, `ConstellationAsterisms.tsx`, `utils/raDecToCanvas.ts`.
Does not own UI chrome or constellation lookup.

### System 2 — UI (`app/components/`)
Panels, overlays, labels, tooltips, sliders, navigation.
Receives data from Systems 1 and 3. **Calculates nothing.**

### System 3 — Domain logic (`app/logic/`)
Pure TypeScript, zero React, fully testable.
- `constellations.ts` — the 13-constellation dataset and its source audit log
- `zodiacLogic.ts` — `getConstellationByDate(date)`, the single source of truth
- `eclipticAngles.ts` — proportional angle ranges for the ecliptic ring

### System 4 — Content (`app/content/`)
All user-facing copy. No business logic.
`explanations.ts`, `comparisons.ts`.

**Rule:** constellation logic exists in `app/logic/` and nowhere else. Any surface that
needs a date → constellation mapping imports `getConstellationByDate()` — it never
reimplements it. This includes the API route.

---

## 4. Domain model

```typescript
interface Constellation {
  name: string             // Official IAU name
  nameEs: string           // Spanish name (the UI is Spanish)
  startDate: string        // "MM-DD"
  endDate: string          // "MM-DD"
  durationDays: number     // Days the Sun spends in this constellation
  order: number            // Position along the ecliptic, 1–13
  zodiacEquivalent: string | null   // null for Ophiuchus — it has no tropical sign
  emoji: string
}

interface ZodiacResult {
  constellation: Constellation
  inputDate: string
  traditionalSign: string  // The tropical sign, for comparison only
  isMatch: boolean         // Astronomical == traditional?
  surprise: boolean        // Ophiuchus, or any mismatch
  shareText: string
}
```

### Dataset rules

The dataset lives in `app/logic/constellations.ts` with an inline verification log
listing every source consulted. **Do not change a date without citing a source in
that log.** Current sources: EarthSky year-by-year solar transit data (2018, 2019,
2021), Wikipedia `Template:Zodiac_date_IAU` (Shapiro 2011), and the IAU Office of
Astronomy for Education.

Known properties, worth preserving:

- `durationDays` across all 13 sums to **365**.
- Sagittarius **wraps the calendar year** (Dec 18 → Jan 18), so `startDate > endDate`
  lexicographically. Range checks must handle this; `isMMDDInRange()` does.
- Dates carry a documented **±1 day** tolerance year to year. The dataset stores mean
  values, and the file says so.
- Feb 29 is normalized to Feb 28 for lookup.

---

## 5. Astronomical calculations

**Equatorial → ecliptic** (`app/simulation/utils/raDecToCanvas.ts`) — stars are stored
as J2000 RA/Dec and transformed at render time using the obliquity of the ecliptic
(ε = 23.4393°):

```
sin β = sin δ · cos ε − cos δ · sin ε · sin α
λ     = atan2( sin δ · sin ε + cos δ · cos ε · sin α ,  cos δ · cos α )
```

λ maps to ring azimuth against a calibrated vernal-equinox offset
(`CANVAS_VERNAL_EQUINOX_DEG`); β maps to canvas height. Star positions are never
hand-placed — if a star looks wrong, fix the coordinates or the transform, not the output.

**Solar longitude** (`app/simulation/SolarPosition.ts`) — low-precision standard formula
(mean longitude plus the first two equation-of-center terms), accurate to about ±1°.
That is sufficient for this visualization. If higher precision is ever needed, the
reference is Meeus, *Astronomical Algorithms*, ch. 25.

**Ring geometry** (`app/logic/eclipticAngles.ts`) — the 360° ring is divided
proportionally by `durationDays`. Sagittarius (order 1) starts at 90°, angles increase
clockwise. Angles may exceed 360°; `getVisualSolarAngle()` normalizes to [0, 360).

### Star and asterism data

- `NamedStars.tsx` — 19 primary named stars, plus 166 extended stars from SIMBAD
  (185 total). Extended set renders only at viewport ≥ 640px. Magnitude drives point
  size and opacity.
- `asterismData.ts` — 148 line segments across the 13 constellations, from Stellarium's
  `constellationship.fab` HIP pairs, resolved to 147 unique Hipparcos stars, J2000.

---

## 6. Code conventions

**TypeScript**
- `strict: true`, no exceptions. No explicit `any` — use `unknown` with a type guard.
- `interface` for domain objects, `type` for unions and primitives.
- Domain types are exported from `app/types/index.ts`.

**React**
- Function components only. Props typed with a named interface (`interface ButtonProps`).
- One component per file. Past ~120 lines, consider splitting.
- No business logic in components — extract to a hook or to `app/logic/`.
- No `useEffect` for values that can be derived with `useMemo`.

**State**
- Zustand, in three atomic stores under `app/store/`: `simulationStore` (time, solar
  position), `uiStore` (panels, toggles, 2D fallback), `userStore` (user date, result).
- Don't reach for `useState` when the state is shared across unrelated components.

**Content**
- No hardcoded user-facing strings in components. Copy lives in `app/content/`.

**Naming**
- Components `PascalCase.tsx`; logic `camelCase.ts`; tests `name.test.ts`;
  global constants `UPPER_SNAKE_CASE`.

**Imports** — external, then internal, then types:
```typescript
import { useState } from 'react'
import { useZodiac } from '@/app/hooks/useZodiac'
import type { ZodiacResult } from '@/app/types'
```

**Commits** — Conventional Commits: `feat(scope):`, `fix:`, `test:`, `docs:`, `refactor:`,
`perf:`, `chore:`.

---

## 7. Responsive and 3D constraints

`useLayoutMode()` (`app/hooks/useLayoutMode.ts`) is the single source of truth for
`isPhone`, `isPortraitPhone`, `isLandscapePhone`. Do not re-derive layout mode from
`window.innerWidth` in a component.

- Verified desktop camera values: `CAMERA_START [0, 22, 18]`, `CAMERA_END [0, 12, 8]`.
  **Never change desktop camera values while working on a mobile issue.**
- Phones render the 19 primary stars only; ≥ 640px gets all 185.
- `useWebGLDetect()` sets a 2D fallback when no WebGL context is available.
  `WebGLContextGuard` handles context loss mid-session.
- The 3D scene is an enhancement. The calculator is the core — never sacrifice the
  calculator's UX for a visual effect.

Performance targets: 60 fps desktop, 30 fps minimum on mobile, LCP < 2.5s, CLS < 0.1,
Lighthouse > 90, WCAG AA.

---

## 8. Testing

100 tests across 3 files, run with Vitest:

```
app/logic/zodiacLogic.test.ts       45
app/logic/eclipticAngles.test.ts    25
app/simulation/TimeEngine.test.ts   30
```

```bash
npm test          # watch
npm run test:run  # single run
```

Tests live next to the code they cover. `__tests__/` exists but is empty.

Anything touching the dataset, the date → constellation mapping, the ring angle math,
or calendar arithmetic **must** ship with tests. These are the parts where a silent
error becomes a factual error in the product.

---

## 9. Current state

Six routes are implemented and deployed: `/`, `/calculator`, `/simulation`,
`/durations`, `/compare`, `/learn`.

SEO is in place: per-route Open Graph metadata, six dynamic OG images via
`ImageResponse`, `sitemap.ts`, `robots.ts`, and JSON-LD (`FAQPage` on `/learn`,
`WebApplication` on `/calculator`, `WebSite` on `/`). Routes that are `use client`
(`/calculator`, `/compare`) carry their metadata in a sibling `layout.tsx`.

Known gaps:

- `app/api/zodiac/route.ts` is a documented stub returning `501`. Nothing depends on
  it; the client calls `getConstellationByDate()` directly. If implemented, it must
  delegate to that function rather than reimplement the mapping.
- The ambient audio toggle is wired but no audio asset ships in the repo.
- The UI is Spanish-only; there is no i18n layer.

---

## 10. Glossary

- **Ecliptic** — the plane of Earth's orbit; from Earth, the apparent annual path of the Sun.
- **IAU constellation** — one of the 88 official sky regions with boundaries fixed by the
  International Astronomical Union in 1930.
- **Astronomical sign** — the constellation the Sun is actually in on a date, per IAU boundaries.
- **Astrological (tropical) sign** — the traditional system of 12 equal 30° signs, anchored
  to the Sun's position roughly 2,000 years ago.
- **Ophiuchus** — the 13th ecliptic constellation, omitted by the tropical zodiac.
  The Sun crosses it for 18 days (Nov 30 – Dec 17).
- **Precession** — the ~26,000-year wobble of Earth's axis that has shifted the tropical
  signs about one month relative to the constellations.
- **RA / Dec** — right ascension and declination, equatorial coordinates. Stored at epoch J2000.
- **Apparent magnitude** — observed brightness of a star; lower is brighter.
