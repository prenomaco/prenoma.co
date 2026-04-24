# /new Site — Frontend Build Contract

## Status Legend
- ✅ Done
- 🔧 Needs polish
- ⬜ Not started

---

## Route Structure
```
src/app/new/
  layout.tsx            ✅ isolated layout (own navbar + animated bg + footer)
  page.tsx              ✅ home hero
  projects/page.tsx     ✅ projects grid  [NOTE: "projects" not "works"]
  contact/page.tsx      ✅ contact split panel
```

## New Components
```
src/components/new/
  WavyBackground.tsx        ✅ simplex-noise canvas (8 blobs, 2-pass underlay/core, grain, half-res)
  NewNavbar.tsx             ✅ GSAP fade-in, eye logo, nav links
  NewFooter.tsx             ✅ terms / privacy_policy / ©2026, JetBrains Mono
  SplitText.tsx             ✅ letter-by-letter reveal + per-letter hover bounce
  home/
    HeroNew.tsx             ✅ wordmark (26px), SplitText headline, tagline stagger anim, CTA row
  projects/
    FilterTabs.tsx          ✅ all / design / development / motion pills
    ProjectCard.tsx         ✅ image, badge, avatars, title, subtitle, CTA
    ProjectsGrid.tsx        ✅ 4-col responsive grid + client-side filter
  contact/
    PricingPanel.tsx        ✅ left panel: quote, checklist, schedule CTA
    ContactFormNew.tsx      ✅ right panel: Web3Forms (name/email/company/message)
```

---

## Animation Spec

### 1. Letter Reveal ✅
- `SplitText.tsx` — `translateY(110%)` → `translateY(0)`, stagger 0.028s, `power3.out`, 0.55s
- Headline line 1 fires at delay 0.8s, line 2 at 1.25s

### 2. Letter Hover Movement ✅
- Per-letter `mouseenter` → `y: -5`, `mouseleave` → elastic spring back
- GSAP only — no `transition-all`

### 3. Tagline Row Animation ✅
- `design · development · motion` spans animate from `{ opacity: 0, y: 8 }` → `{ opacity: 1, y: 0 }`
- Stagger 0.12s, delay 1.6s, `power2.out`, 0.5s

### 4. CTA Row ✅
- Fades in at 1.8s delay, `power2.out`, 0.7s

### 5. Navbar ✅
- Slides in from `y: -10, opacity: 0` at 0.3s delay

### 6. WavyBackground ✅
- simplex-noise canvas, 8 blobs (4 underlay maroon + 4 core orange-red)
- Two-pass draw, per-blob rotation, variable ellipse ry/rx (0.42–0.55)
- Opacity breathing via noise (±0.12), grain pass (~3% alpha dots)
- Half-resolution render for GPU performance
- Mouse parallax ±15px max, lerp 0.03

---

## Design Tokens
| Token     | Value     |
|-----------|-----------|
| bg        | `#161415` |
| cream     | `#f3e2c8` |
| parchment | `#dbcba9` |
| ember     | `#f35226` |
| Font body | Manrope (400, 700) |
| Font mono | JetBrains Mono (400) |

---

## Nav Links
| Label    | Route           |
|----------|-----------------|
| home     | `/new`          |
| projects | `/new/projects` |
| contact  | `/new/contact`  |

---

## Awwwwards Improvement Backlog

| Item | Priority | Notes |
|---|---|---|
| **Magnetic CTAs** | High | "view our work" btn pulls toward cursor within ~60px radius. Pure GSAP. |
| **Grain texture** | ✅ Done | Live in WavyBackground canvas grain pass |
| **Background glow height** | Low | Blob `by` values could shift up ~5% so warmth reaches top 30% |
| **Scroll-pinned hero** | Medium | Pin hero → dissolve → project grid reveal on scroll (ScrollTrigger) |
| **Preloader** | Low | 0.5–1s branded preloader before scene reveals |
| **Mobile animation graceful degradation** | Medium | Verify GSAP animations don't break on touch devices |

---

## Constraints
- NEVER use `transition-all` (GSAP conflict)
- No inline styles except where Tailwind cannot do it
- TypeScript strict — all components typed
- All new code in `src/app/new/` and `src/components/new/` — zero changes to existing `/` routes
- Pre-existing build error in `src/app/api/contact/route.ts` (Resend casing) — out of scope, ignore
- Run `npm run build` after any agent work to verify clean compile
