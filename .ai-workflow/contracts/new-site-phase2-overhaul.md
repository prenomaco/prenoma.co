# prenoma.co /new — Phase 2 Overhaul Contract

## Status Legend
- ✅ Done  - 🔧 Needs polish  - ⬜ Not started

---

## Agent Selection: Impeccable vs Taste

| Agent | Strength | When to use |
|---|---|---|
| **Frontend-Impeccable** | Maximum visual polish, premium aesthetics, hero-level showpieces | The component IS the visual attraction — shader backgrounds, 3D showcases, anything where visual quality is the metric |
| **Frontend-Taste** | High-end distinctive design + clean, maintainable code | Feature components where architecture and design both matter — forms, nav bars, structural UI |

---

## Task 1 — Marquee Banner ✅

**Agent: Frontend-Taste**

**Files:**
```
src/components/new/MarqueeBanner.tsx         ✅ created
src/app/new/layout.tsx                       ✅ MarqueeBanner injected above NewNavbar
src/components/new/NewNavbar.tsx             ✅ top-0 → top-[38px]
```

**What shipped:**
- Fixed top strip, z-[60], 38px height, #1a1718 background
- CSS-only `@keyframes marquee` (translateX 0 → -50%), 25s linear infinite
- Content: `open to work ✦` repeated, text #dbcba9 13px bold, divider #f35226
- Pure server component — no JS, no library

---

## Task 2 — 3D Project Cards + Infinite Carousel ✅

**Agent: Frontend-Impeccable**

**Files:**
```
src/components/new/projects/ProjectCardV2.tsx     ✅ dark glass card, aspect-ratio 407/479
src/components/new/projects/ProjectsCarousel.tsx  ✅ Embla + GSAP coverflow rotateY
src/components/new/projects/FilterTabs.tsx        ✅ pill container, right-aligned in heading row
src/app/new/projects/page.tsx                     ✅ filter state lifted to page, heading+tabs in flex row
```

**What shipped:**
- Embla carousel `loop: true, align: center, containScroll: false`
- Per-scroll GSAP coverflow: `rotateY = offset * 28°` (clamped ±55°), scale min 0.82, opacity min 0.55, z=-120 for off-center
- `perspective: 1800px` on viewport, `transformStyle: preserve-3d` on track
- FilterTabs: `bg-[rgba(19,18,19,0.2)]` pill container, `rounded-[90px]`, right-aligned
- Dark glass cards: `bg-[rgba(22,20,21,0.2)] backdrop-blur-md border border-white/10`
- Autoplay 4000ms, pause on hover, 3500ms resume delay
- Prev/Next arrow buttons

**Post-verification fixes applied:**
- Restored full-bleed image background on cards (`project.image` → `object-cover` + gradient overlay). Glass fallback when no image. This was removed by the Impeccable agent matching the Figma dark-glass placeholder — restored per original user spec.

**Verified state (screenshot):**
- 3D perspective fan ✅ — left/right cards rotated ~25-30° on Y-axis, center faces forward
- Filter tabs inline in heading row ✅ — right-aligned pill container
- Image backgrounds on cards ✅ — gradient overlay `from-black/88 via-black/35 to-transparent`
- Autoplay + arrow nav ✅
- Note: project SVG assets (`/projects/*.svg`) are logo-style vectors, not photos — card tops appear dark. Photo/render assets would improve visual quality significantly.

---

## Task 3 — Contact Page ✅

**Agent: Frontend-Taste**

**Files:**
```
src/app/new/contact/page.tsx                         ✅ full rewrite — Figma split layout
src/components/new/contact/ContactFormNew.tsx         ✅ wrapper stripped, form inside glass panel
src/components/new/contact/PricingPanel.tsx           ⬜ orphaned (not deleted, not used)
```

**What shipped:**
- Left panel (52%): wordmark `prenoma.co`, headline "have a project? let's discuss." (85px bold, `?` and `.` in ember), sub-tagline "we're always open to work", email pill `hello@prenoma.co`
- Right panel (48%): single glass container `bg-[rgba(22,20,21,0.2)] rounded-[16px] backdrop-blur-md`, `ContactFormNew` inside
- GSAP entrance: left `x: -40 → 0`, right `x: 40 → 0`, `power3.out`, staggered 0.2/0.35s delay
- SplitText on headline lines

**Figma match (screenshot):** ✅ Confirmed — "have a project? let's discuss." hero split layout, email pill, glass form panel all match Figma exactly

---

## Task 4 — WavyBackground V2 (ogl shader) ✅

**Agent: Frontend-Impeccable**

**Files:**
```
src/components/new/WavyBackgroundV2.tsx    ✅ ogl WebGL shader, full port
src/app/new/layout.tsx                     ✅ swapped from V1 canvas to V2 ogl
```

**What shipped (Phase 1 — initial port):**
- ogl Renderer, half-DPR, fullscreen quad
- GLSL simplex noise, 8-blob two-pass system exact port from canvas version
- Mouse parallax, grain overlay, resize observer

**What shipped (Phase 2 — blob uplift, current):**
- All 8 blob `by` values shifted up ~0.07 (warmth moves into upper viewport)
- Left core opacity 0.82 → 0.92 (brighter left peak)
- Underlay opacities +0.05 each
- New blob 9: upper warmth veil, `by=0.35`, `rx=1400`, `#c84010` at opacity 0.15

---

## Build Status

```
✅ npm run build — clean, 0 errors
✅ 12/12 routes compile
✅ TypeScript passes
Last clean build: 2026-04-24 (all tasks + image bg restore complete)
```

## Visual Verification (Chrome DevTools screenshots)

| Page | Status | Notes |
|---|---|---|
| `/new` (home) | ✅ | Marquee ticker, wavy bg warmth visible in upper viewport, hero text/CTAs correct |
| `/new/projects` | ✅ | 3D coverflow fan, filter tabs right-aligned, image card bgs, arrows |
| `/new/contact` | ✅ | Figma split layout — headline, tagline, email pill, glass form panel |

---

## Install Summary

```bash
npm install ogl embla-carousel embla-carousel-react
# react-fast-marquee NOT installed — CSS-only marquee
# motion NOT installed — GSAP handles all animation
```

---

## Remaining / Open Items

| Item | Priority | Notes |
|---|---|---|
| Project image assets | High | `/projects/*.svg` are logo vectors — not ideal as full-bleed card BGs. Replace with screenshots/renders for each project |
| PricingPanel.tsx cleanup | Low | File orphaned on disk — safe to delete |
| Calendar/booking URL | Low | Contact email pill done; original schedule-a-call CTA removed per Figma design |
| Mobile responsive pass | Low | All Figma specs are desktop-only — mobile breakpoints untested |

---

## File Map

```
src/app/new/
  layout.tsx                    ✅ MarqueeBanner + WavyBackgroundV2 + NewNavbar(top-[38px])
  page.tsx                      ✅ HeroNew
  projects/page.tsx             ✅ heading+FilterTabs row + ProjectsCarousel
  contact/page.tsx              ✅ Figma split layout

src/components/new/
  MarqueeBanner.tsx             ✅ CSS marquee ticker
  NewNavbar.tsx                 ✅ top-[38px]
  WavyBackground.tsx            (V1, kept as fallback reference)
  WavyBackgroundV2.tsx          ✅ ogl shader + blob uplift
  SplitText.tsx                 ✅ unchanged
  contact/
    ContactFormNew.tsx          ✅ wrapper stripped, form logic intact
    PricingPanel.tsx            ⬜ orphaned
  projects/
    FilterTabs.tsx              ✅ pill container, right-aligned
    ProjectCardV2.tsx           ✅ dark glass, aspect-ratio, coverflow-safe
    ProjectsCarousel.tsx        ✅ Embla + GSAP coverflow
    ProjectCard.tsx             (V1, kept for reference)
    ProjectsGrid.tsx            (V1, kept for reference)
```

---

## Design Tokens

| Token | Value |
|---|---|
| bg | `#161415` |
| cream | `#f3e2c8` |
| parchment | `#dbcba9` |
| ember | `#f35226` |
| Font body | Manrope (400, 700) |
| Font mono | JetBrains Mono (400) |

## Constraints (active)

- NEVER use `transition-all` (GSAP conflict)
- No inline styles except where Tailwind 4 cannot express it
- TypeScript strict — all components `(): React.JSX.Element`
- All work scoped to `src/app/new/` and `src/components/new/` — zero changes to `/` routes
- No hardcoded card px dimensions — use `aspect-ratio` + responsive `%` width
- Run `npm run build` after every agent session
