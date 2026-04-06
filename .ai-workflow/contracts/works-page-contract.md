# Contract: Interactive Works Page with Live Iframe Embeds

**ID**: frontend-contract-002  
**Created**: 2026-04-06  
**Target Agent**: @frontend-taste  
**Status**: pending

---

## Objective

Build an interactive `/works` portfolio page featuring live, embedded website previews in project cards with dramatic parallax animations, responsive grid layouts, and GSAP-powered entrance effects.

---

## Context

The Works page is currently a stub. The design reference (Works.png) shows a 3-project portfolio with large preview areas (currently gray placeholders) that must be replaced with **interactive iframes** allowing visitors to browse and interact with actual live websites directly within the cards. The visual style draws inspiration from unseen.co's sophisticated parallax depth effects while maintaining prenoma.co's design language: dark ink backgrounds, sharp corners, Manrope typography, and a cream/parchment/ember color palette.

**Key Innovation**: Instead of static screenshots, each project card contains a fully interactive iframe with loading states, error fallbacks, and pointer-events management for seamless user interaction.

---

## Requirements

### 1. Component Architecture
- **WorksHero** (`src/components/works/WorksHero.tsx`): Header section with "projects @prenoma.co" title, "Have a question? Connect w/ us" link, and "Check out Pricing" button
- **ProjectGrid** (`src/components/works/ProjectGrid.tsx`): Grid container with GSAP scroll animations and parallax logic
- **ProjectCard** (`src/components/works/ProjectCard.tsx`): Individual project wrapper with hover effects and card-level animations
- **LiveWebsiteFrame** (`src/components/works/LiveWebsiteFrame.tsx`): Interactive iframe component with loading/error states and fallback strategy
- **Page Component** (`src/app/works/page.tsx`): Updated to integrate all components and add resource hints

### 2. Data Structure
- Create `src/data/projects.ts` with Project interface and PROJECTS array containing 3 projects:
  - **Computer Port**: Enterprise infrastructure (https://computerport.in)
  - **Veloce**: Premium pre-owned car marketplace (https://veloce-dealer.vercel.app)
  - **ARR Dental Lab**: Dental laboratory services (https://arrdentallab.com)
- Each project must include: id, title, description, url, category, tags, year, optional thumbnail fallback

### 3. Interactive Iframe Implementation
- Use sandboxed `<iframe>` with attributes: `sandbox="allow-scripts allow-same-origin allow-popups allow-forms"`
- Implement lazy loading via Intersection Observer (load only when in viewport)
- State management with 4 states: "loading", "loaded", "error", "blocked"
- Loading state: Skeleton pulse animation (20-30% opacity, animated)
- Error state: Display message "Preview unavailable" with fallback image overlay
- Pointer events: Enable `pointer-events: auto` only when `state === "loaded"`
- CSP/X-Frame-Options handling: Graceful fallback to static image + "Visit Site" button

### 4. Animation System (GSAP + ScrollTrigger)

#### Entrance Animations (Stagger)
- Trigger: When project grid enters viewport (start: "top 80%")
- Animation: `y: 100` → `0`, `opacity: 0` → `1`
- Duration: 1.2s, Ease: "power3.out"
- Stagger: 0.2s (200ms delay between each card)
- Apply to `.project-card` class

#### Parallax Depth (Scroll-triggered)
- **Dramatic range**: y-axis movement between -120px and +120px (240px total)
- Alternating direction per card: index % 2 === 0 ? positive : negative
- ScrollTrigger settings:
  - trigger: ".project-grid"
  - start: "top bottom"
  - end: "bottom top"
  - **scrub: 1.5** (linked to scrollbar with 1.5s inertia for dramatic effect)
  - ease: "none" (linear movement tied to scroll position)
- Result: Cards drift at different depths creating visual depth illusion

#### Hover Micro-interactions
- Scale: 1.02 (2% growth)
- Box-shadow: `0 20px 60px rgba(232, 65, 24, 0.15)` (ember glow)
- Duration: 0.3s
- Ease: "power2.out"
- Apply on card hover via ref-based animation

#### Reduced Motion Respect
- Detect `prefers-reduced-motion: reduce` via `window.matchMedia()`
- Disable all animations if preference detected
- Fall back to static layout with instant transitions

### 5. Responsive Grid Layout

| Breakpoint | Columns | Spacing | Card Height | Px Padding |
|---|---|---|---|---|
| Mobile (< 640px) | 1 | gap-6 (24px) | 400px | px-6 |
| Tablet (640-1024px) | 2 | gap-8 (32px) | 500px | px-12 |
| Desktop (> 1024px) | 3 | gap-10 (40px) | 600px | px-[50px] |

- Grid implementation: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- ProjectCard aspect-video (16:9) for iframe preview area
- Meta section (title, description, button): Fixed height within card

### 6. Design System Tokens

#### Colors
- **Background**: ink (`#161415`)
- **Text Primary**: cream (`#F0DFC0`) - titles
- **Text Secondary**: parchment (`#D4C9A8`) - descriptions, secondary text
- **Accent**: ember (`#E84118`) - hover states, highlights
- **Borders**: ghost (`#B8AE94` at 20% opacity)

#### Typography
- **Title (WorksHero)**: 48px mobile / 65px desktop, bold, cream
- **Card Title**: 24px mobile / 28px desktop, bold, cream
- **Description**: 16px mobile / 18px desktop, regular, parchment
- **Button Text**: 16px, medium weight, ink on parchment background
- **Font Family**: Manrope (entire page)

#### Spacing
- Card padding: `p-6 lg:p-8`
- Internal gap: `gap-4 lg:gap-6`
- Button padding: `px-8 py-3`
- Hero section: `pt-32 pb-16`

#### Visual Style
- Border radius: 0px (sharp corners)
- Transitions: 300ms ease for hover states
- Shadows: Subtle on hover, no default shadows

### 7. CTA Links and Navigation

#### WorksHero CTAs
- "Have a question? Connect w/ us" → Links to `/contact`
- "Check out Pricing" → Links to `/pricing` (button styled with bg-parchment, text-ink, hover:bg-ember hover:text-cream)

#### ProjectCard CTAs
- "Visit Site →" button on each card
- Opens project URL in new tab (`target="_blank"`)
- Background: parchment, text: ink
- Hover: background: ember, text: cream
- Includes arrow icon (→)

### 8. Performance Requirements

- **Lighthouse Performance Score**: > 90
- **Lazy Loading**: Iframes load only when in viewport (use `react-intersection-observer` or native API)
- **Layout Shift**: CLS < 0.1 (avoid shift from loading state transitions)
- **Frame Rate**: Smooth 60fps scrolling during parallax animations
- **Resource Hints**: Add DNS prefetch for all 3 project URLs in page head
- **Bundle Impact**: Minimize GSAP tree-shaking; import only ScrollTrigger + from utilities

### 9. Fallback Strategies

#### Iframe Loading Failures
1. **Timeout**: If iframe doesn't load within 15 seconds, trigger error state
2. **CSP Blocking**: Detect via `onError` callback; show fallback image
3. **Network Errors**: Display message "Preview unavailable" with link to "Visit Site"
4. **Mobile Touch**: Make iframe `pointer-events: none` by default; show "Tap to interact" overlay; enable events on tap for 5 seconds

#### Error State Display
- Centered message in gray box
- Fallback image if available (optional thumbnail prop)
- Prominent "Visit Site" button as primary CTA
- Maintain card styling and spacing

### 10. Accessibility Requirements

- **iframe title**: Descriptive alt text (e.g., "Computer Port live preview")
- **Keyboard Navigation**: All buttons must be keyboard accessible (tab order, focus states)
- **Skip Links**: Add skip link for users to bypass iframe zones
- **ARIA Labels**: Add `aria-label` to buttons and interactive regions
- **Color Contrast**: Ensure text meets WCAG AA (4.5:1 for normal text)
- **Reduced Motion**: Fully functional without animations

### 11. Security Constraints

- Sandbox iframe with minimal permissions: `allow-scripts allow-same-origin allow-popups allow-forms`
- No `allow-same-origin` abuse; sites are third-party
- Prevent form submission outside iframe scope
- Block window.top access if possible

---

## Acceptance Criteria

- [ ] **Component Structure**: All 5 components (WorksHero, ProjectGrid, ProjectCard, LiveWebsiteFrame, updated page.tsx) created and integrated
- [ ] **Data Model**: `src/data/projects.ts` exists with 3 projects (Computer Port, Veloce, ARR Dental Lab) and correct interface
- [ ] **Iframe Interactivity**: All 3 project iframes load, display content, and allow user interaction (scrolling, clicking within frame)
- [ ] **Loading States**: Skeleton loader displays while iframe loads; seamless transition to interactive state
- [ ] **Error Handling**: Fallback displays correctly if iframe blocked; "Visit Site" button remains functional
- [ ] **Entrance Animation**: Cards fade in with stagger (0.2s delay, 1.2s duration, "power3.out" ease) when grid enters viewport
- [ ] **Parallax Animation**: Cards move smoothly in opposite directions (±120px range) on scroll with scrub: 1.5
- [ ] **Hover Effects**: Cards scale 1.02 with ember glow shadow on hover (0.3s "power2.out")
- [ ] **Responsive Grid**: 1 column on mobile, 2 on tablet, 3 on desktop; all spacing and heights as specified
- [ ] **Design System**: All colors, typography, spacing use tokens from globals.css; Manrope font applied throughout
- [ ] **CTA Links**: "Connect w/ us" → `/contact`, "Check out Pricing" → `/pricing`, "Visit Site" → external URLs in new tabs
- [ ] **Performance**: Lazy loading implemented; Lighthouse score > 90; no CLS issues; 60fps scrolling
- [ ] **Accessibility**: All buttons keyboard accessible; iframe titles descriptive; respects prefers-reduced-motion
- [ ] **Reduced Motion**: No animations play when `prefers-reduced-motion: reduce` is set
- [ ] **Cross-browser Testing**: Works on Chrome, Safari, Firefox; mobile touch interactions functional
- [ ] **CSP Compliance**: DNS prefetch links added; iframe sandbox attributes correct

---

## References

- **Implementation Plan**: `.ai-workflow/contracts/works-page-implementation-plan.md` (source of truth for animations, data, component specs)
- **Design Reference**: Works.png (provided by design)
- **Design System**: `src/styles/globals.css` (color tokens, base styles)
- **GSAP Docs**: ScrollTrigger parallax patterns
- **Unseen.co**: Visual inspiration for parallax depth and animation sophistication

---

## Technical Specifications

### File Structure
```
src/
├── app/works/
│   └── page.tsx                    // UPDATED: Integrate components, add resource hints
├── components/works/
│   ├── WorksHero.tsx              // NEW
│   ├── ProjectGrid.tsx            // NEW
│   ├── ProjectCard.tsx            // NEW
│   └── LiveWebsiteFrame.tsx       // NEW
├── data/
│   └── projects.ts                // NEW: Project interface + PROJECTS array
└── hooks/
    └── useParallax.ts             // OPTIONAL: Custom hook for parallax logic (if extracted)
```

### GSAP Imports Required
```typescript
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);
```

### Animation Pseudo-code Structure

**Entrance (ProjectGrid)**:
```typescript
useGSAP(() => {
  gsap.from(".project-card", {
    y: 100,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".project-grid",
      start: "top 80%",
    }
  });
}, []);
```

**Parallax (ProjectGrid)**:
```typescript
useGSAP(() => {
  gsap.to(".project-card", {
    y: (index) => -120 * (index % 2 === 0 ? 1 : -1),
    ease: "none",
    scrollTrigger: {
      trigger: ".project-grid",
      start: "top bottom",
      end: "bottom top",
      scrub: 1.5,
    }
  });
}, []);
```

**Hover (ProjectCard)**:
```typescript
const handleMouseEnter = () => {
  gsap.to(cardRef.current, {
    scale: 1.02,
    boxShadow: "0 20px 60px rgba(232, 65, 24, 0.15)",
    duration: 0.3,
    ease: "power2.out"
  });
};
```

### LiveWebsiteFrame State Machine
```typescript
type FrameState = "loading" | "loaded" | "error" | "blocked";

// Transitions:
// loading → loaded (onLoad)
// loading → error (onError)
// error → blocked (CSP detection)
```

---

## Notes & Constraints

1. **Mobile Touch Interaction**: On mobile, consider making iframe `pointer-events: none` by default with an overlay tap-to-interact prompt. This prevents scroll conflicts.

2. **CSP/X-Frame-Options**: Some sites block iframe embedding. The fallback strategy (error state + "Visit Site" button) handles this gracefully. Test all 3 URLs before implementation.

3. **Custom Cursor**: Prenoma's existing custom cursor should work over iframes, but z-index adjustments may be needed. Test cursor behavior over embedded content.

4. **Future CTAs**: Links to `/contact` and `/pricing` are assumed to exist. Confirm routes or adjust references if needed.

5. **Fallback Images**: User will provide fallback images if iframe blocking occurs. Add optional `thumbnail` prop to Project interface for this use case.

6. **Animation Performance**: Use `will-change: transform` on `.project-card` to enable GPU acceleration during parallax.

7. **Browser Support**: Test on Safari (older versions may have iframe performance issues). Use GSAP's built-in fallbacks for unsupported features.

8. **Loading Timeout**: Consider a 15-second timeout for iframe loading. If exceeded, automatically trigger error state to prevent indefinite skeleton display.

---

## Implementation Phases (Reference)

This contract encompasses the full implementation. For execution planning:
- **Phase 1** (1-2h): Component structure + basic grid
- **Phase 2** (2-3h): LiveWebsiteFrame + loading/error states
- **Phase 3** (1-2h): GSAP animations (entrance + parallax + hover)
- **Phase 4** (1h): Hero component, polish, accessibility audit

**Estimated Total**: 5-8 hours

---

## Success Metrics

Upon completion, the page should:
1. Display all 3 projects with fully interactive iframes
2. Animate entrance with staggered fade-in (0.2s delay)
3. Move cards smoothly in parallax depth on scroll (±120px, scrub: 1.5)
4. Scale and glow on hover (1.02 scale, ember shadow)
5. Respond responsively (1/2/3 columns across breakpoints)
6. Load iframes lazily and handle errors gracefully
7. Achieve Lighthouse > 90 performance score
8. Pass accessibility audit (WCAG AA)
9. Respect user motion preferences
10. Maintain smooth 60fps during all interactions

---

## Questions for Clarification (Before Start)

- Are fallback images available for iframe-blocked scenarios? If not, should we request from design?
- Should the `/contact` and `/pricing` routes be created before this contract, or can we reference them as planned?
- Any specific behavior for mobile iframe interaction? (e.g., single-tap to enable, or always interactive?)
- Should we track analytics on iframe interactions or "Visit Site" button clicks?

---

**Status**: Ready for Implementation by @frontend-taste

**Next Step**: Once approved, @frontend-taste will read this contract and implement according to specifications. Upon completion, a log file will be created at `.ai-workflow/contracts/works-page-contract-log.md`.
