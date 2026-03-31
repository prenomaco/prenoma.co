# CONTRACT.md — prenoma.co Landing Page

**Scope**: Three-page Next.js 16 marketing website for design/web agency  
**Status**: Approved & Ready for Implementation  
**Last Updated**: 2026-03-29

---

## Executive Summary

Build a premium marketing landing page for prenoma.co featuring:

- Home page with cursor-tracking ASCII art eye | The eye should be the exact same as the branding logo (hero element)
- Works portfolio showcase (3 projects in grid)
- Pricing page with single package + preview panel
- Smooth scroll (Lenis) + GSAP animations throughout
- Strict brand color palette & Manrope typography
- Fully responsive, production-ready

**Tech Stack**: Next.js 16 (Turbopack) • TypeScript • React 19 • GSAP • Lenis • Tailwind CSS • shadcn/ui

---

## I. File Structure

```
prenoma.co/
├── Design/
│   └── DESIGN.md                    # ← Single source of truth
├── .ai-workflow/
│   └── contracts/
│       └── frontend-contract-1.md   # ← This file
├── media/                            # Assets (logo, eye graphic, etc.)
├── public/
│   ├── fonts/
│   │   └── Manrope-Variable.woff2
│   └── images/
│       ├── branding-logo.png
│       ├── branding-logo-vertical.png
│       ├── eye-logo.png
│       └── text-logo.png
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout + providers
│   │   ├── page.tsx                # Home page
│   │   ├── works/
│   │   │   └── page.tsx
│   │   ├── pricing/
│   │   │   └── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navigation.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── PageWrapper.tsx
│   │   ├── home/
│   │   │   ├── AsciiEye.tsx
│   │   │   ├── ascii-data.ts
│   │   │   └── HeroContent.tsx
│   │   ├── works/
│   │   │   ├── ProjectHeader.tsx
│   │   │   ├── ProjectGrid.tsx
│   │   │   └── ProjectCard.tsx
│   │   ├── pricing/
│   │   │   ├── PricingCard.tsx
│   │   │   └── PreviewPanel.tsx
│   │   └── ui/
│   │       ├── button.tsx
│   │       └── logo.tsx
│   ├── providers/
│   │   ├── LenisProvider.tsx
│   │   └── MouseProvider.tsx
│   ├── hooks/
│   │   ├── useMousePosition.ts
│   │   ├── useLiveTime.ts
│   │   └── useGsapAnimation.ts
│   ├── lib/
│   │   ├── utils.ts
│   │   └── constants.ts
│   └── types/
│       └── index.ts
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## II. Brand Tokens (Immutable)

### Color Palette

```typescript
// src/lib/constants.ts
export const COLORS = {
  coal: "#161415", // Primary background
  cream: "#F3E2C8", // Primary text
  sand: "#DBCBA9", // Secondary text
  ember: "#F35226", // Accent (price, ".co", highlights)
} as const;

export const TAILWIND_COLORS = {
  bg: "bg-[#161415]",
  text: {
    primary: "text-[#F3E2C8]",
    secondary: "text-[#DBCBA9]",
    accent: "text-[#F35226]",
  },
} as const;
```

### Typography

```typescript
export const TYPOGRAPHY = {
  font: "'Manrope', system-ui, -apple-system, sans-serif",
  weights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    black: 800,
  },
} as const;
```

---

## III. Page Routes & Layouts

### Route Map

| Route      | Component                  | Purpose                       |
| ---------- | -------------------------- | ----------------------------- |
| `/`        | `src/app/page.tsx`         | Home page with ASCII eye hero |
| `/works`   | `src/app/works/page.tsx`   | Portfolio showcase            |
| `/pricing` | `src/app/pricing/page.tsx` | Pricing page                  |

### Root Layout (`src/app/layout.tsx`)

**Responsibilities**:

- Initialize Lenis provider
- Initialize Mouse position provider
- Mount Navigation, Footer, PageWrapper
- Import globals.css
- Set metadata (title, description, favicon)

**Structure**:

```
<html>
  <head>
    <meta charset="utf-8" />
    <viewport ... />
    <meta property="og:title" content="prenoma.co" />
    ...
  </head>
  <body className="bg-coal text-cream">
    <LenisProvider>
      <MouseProvider>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </MouseProvider>
    </LenisProvider>
  </body>
</html>
```

**Tailwind Classes**:

- `bg-coal` (background)
- `text-cream` (text)
- `font-['Manrope']` (font)

---

## IV. Component Specifications

### Navigation Component

**File**: `src/components/layout/Navigation.tsx`

**Props Interface**:

```typescript
interface NavigationProps {
  className?: string;
}
```

**Behavior**:

- Fixed top-left positioning
- Links: Home, Works, Pricing
- Active page indicator: left border (4px, ember color)
- Hover state: text color transitions to ember
- Uses `usePathname()` from Next.js to determine active page

**Tailwind Classes**:

```tsx
<nav className="fixed top-0 left-0 z-50 pt-8 pl-8">
  <div className="flex flex-col gap-6 text-lg font-medium text-cream">
    {/* Nav items */}
  </div>
</nav>
```

### Footer Component

**File**: `src/components/layout/Footer.tsx`

**Dependencies**:

- `useLiveTime()` hook for real-time IST clock

**Props Interface**:

```typescript
interface FooterProps {
  className?: string;
}
```

**Content**:

```
Left:  hello@prenoma.co • [Live Time]
Right: Terms • Privacy Policy • ©2K26 prenoma.co
```

**Tailwind Classes**:

```tsx
<footer className="fixed bottom-0 left-0 right-0 bg-coal border-t border-sand/10 px-8 py-4">
  <div className="flex justify-between items-center text-xs text-sand">
    {/* Content */}
  </div>
</footer>
```

### Button Component (shadcn/ui-based)

**File**: `src/components/ui/button.tsx`

**Variants**:

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "text";
  size?: "sm" | "md" | "lg";
  withArrow?: boolean;
}
```

**Styles**:

- **Primary**: `bg-cream text-coal hover:bg-cream/90`
- **Secondary**: `border-2 border-sand text-cream hover:border-cream`
- **Text**: `text-cream hover:text-ember`

**With Arrow**: Append `↗` or use icon

---

### AsciiEye Component (Core)

**File**: `src/components/home/AsciiEye.tsx`

**Props Interface**:

```typescript
interface AsciiEyeProps {
  className?: string;
  maxPupilOffset?: number; // Default: 30
  smoothness?: number; // GSAP duration in seconds, default: 0.15
}
```

**Features**:

1. **Static ASCII Art**: Rendered as monospace text using Sand color (`#DBCBA9`)
2. **Dynamic Pupil**: Ember-colored circle (`#F35226`) that tracks cursor position
3. **Bounds Clamping**: Pupil cannot move outside eye radius
4. **GSAP Interpolation**: Smooth following with power2.out easing
5. **Responsive Sizing**: 20rem on mobile → 30rem on desktop

**Algorithm**:

```typescript
// Pseudo-code
const eyeCenter = calculateEyeBounds();
const mousePos = useMousePosition();

const vector = {
  x: mousePos.x - eyeCenter.x,
  y: mousePos.y - eyeCenter.y,
};

const distance = Math.hypot(vector.x, vector.y);
const normalizedVector = normalize(vector);
const clampedOffset = clamp(normalizedVector, maxPupilOffset);

gsap.to(pupilElement, {
  x: clampedOffset.x,
  y: clampedOffset.y,
  duration: smoothness,
  ease: "power2.out",
});
```

**HTML Structure**:

```tsx
<div className="relative font-mono text-sm leading-none tracking-tighter select-none">
  <pre className="text-sand/80 whitespace-pre">{/* ASCII art rows */}</pre>

  <div
    ref={pupilRef}
    className="absolute top-1/2 left-1/2 w-2 h-2 bg-ember rounded-full pointer-events-none"
    style={{
      transform: "translate(-50%, -50%)",
    }}
  />
</div>
```

**Dependencies**:

- `useMousePosition()` from context
- `gsap` for animation

---

### ProjectCard Component

**File**: `src/components/works/ProjectCard.tsx`

**Props Interface**:

```typescript
interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  siteUrl: string;
}
```

**Structure**:

```tsx
<div className="flex flex-col bg-coal border border-sand/10 overflow-hidden hover:border-sand/30 transition-all">
  <div className="aspect-video w-full overflow-hidden bg-sand/5">
    <img
      src={imageUrl}
      alt={title}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
    />
  </div>

  <div className="flex flex-col gap-4 p-6">
    <h4 className="text-2xl font-semibold text-cream">{title}</h4>
    <p className="text-sm text-sand">{description}</p>

    <button
      onClick={() => window.open(siteUrl, "_blank")}
      className="w-full mt-auto px-6 py-3 bg-cream text-coal font-medium hover:bg-cream/90">
      Visit Site ↗
    </button>
  </div>
</div>
```

---

### PricingCard Component

**File**: `src/components/pricing/PricingCard.tsx`

**Props Interface**:

```typescript
interface PricingCardProps {
  price: string;
  period: string;
  features: string[];
  ctaText?: string;
  onCta?: () => void;
}
```

**Structure**:

```tsx
<div className="flex flex-col gap-8 p-8 bg-coal border border-sand/10">
  <div>
    <h3 className="text-4xl font-bold text-ember mb-2">{price}</h3>
    <p className="text-lg text-cream font-medium">{period}</p>
  </div>

  <ul className="flex flex-col gap-4 text-cream">
    {features.map(feature => (
      <li key={feature} className="flex items-start gap-3">
        <svg className="w-6 h-6 text-ember shrink-0 mt-0.5">
          <path
            d="M5 13l4 4L19 7"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
        <span>{feature}</span>
      </li>
    ))}
  </ul>

  <button className="w-full px-8 py-4 bg-cream text-coal font-medium hover:bg-cream/90 mt-auto">
    {ctaText} ↗
  </button>
</div>
```

---

## V. Hooks & Providers

### useMousePosition Hook

**File**: `src/hooks/useMousePosition.ts`

**Returns**:

```typescript
{
  x: number;
  y: number;
}
```

**Behavior**:

- Subscribes to `mousemove` events
- Throttles updates to RAF (60fps max)
- Returns cursor position relative to viewport

---

### useLiveTime Hook

**File**: `src/hooks/useLiveTime.ts`

**Returns**:

```typescript
{
  time: string; // Format: "DD-MM-YYYY HH:MM AM/PM IST"
}
```

**Behavior**:

- Updates every 1000ms (1 second)
- Formats time in IST timezone (UTC+5:30)
- Cleans up interval on unmount

**Example**:

```typescript
const { time } = useLiveTime();
// "28-03-2026 04:24 PM IST"
```

---

### MouseProvider Context

**File**: `src/providers/MouseProvider.tsx`

**Context Shape**:

```typescript
interface MouseContextValue {
  position: { x: number; y: number };
}

export const MouseContext = createContext<MouseContextValue | undefined>(
  undefined,
);

export function useMousePosition() {
  const context = useContext(MouseContext);
  if (!context) {
    throw new Error("useMousePosition must be used within MouseProvider");
  }
  return context.position;
}
```

---

### LenisProvider Context

**File**: `src/providers/LenisProvider.tsx`

**Configuration**:

```typescript
{
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
  smoothWheel: true,
  syncTouch: false,
  wheelMultiplier: 1,
  touchMultiplier: 2,
}
```

**Behavior**:

- Wraps entire app in smooth scroll container
- Uses `requestAnimationFrame` for RAF sync
- Cleans up RAF loop on unmount

---

## VI. Page Specifications

### Home Page (`src/app/page.tsx`)

**Layout**:

```
[Navigation - fixed top-left]

┌─────────────────────────────────────┐
│                                     │
│  [LEFT: Text Content] [RIGHT: Eye]  │
│                                     │
│  prenoma.co                         │
│  WE MAKE STUNNING WEBSITES          │
│  affordable • fast • beautiful      │
│                                     │
│  [CTA Buttons]                      │
│                                     │
└─────────────────────────────────────┘

[Footer - fixed bottom]
```

**Sections**:

1. **Hero Container**: Min height 100vh, flexbox centered, dark coal background
2. **Left Column**: Logo, heading, tagline, CTAs
3. **Right Column**: AsciiEye component
4. **Bottom**: Fade to footer with padding

**Tailwind Grid Layout**:

```tsx
<section className="min-h-screen w-full bg-coal flex items-center pt-20 pb-20">
  <div className="container">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
      {/* Left: Text */}
      <div>{/* Logo, heading, tagline, buttons */}</div>

      {/* Right: Eye */}
      <div className="flex items-center justify-center lg:justify-end">
        <AsciiEye />
      </div>
    </div>
  </div>
</section>
```

---

### Works Page (`src/app/works/page.tsx`)

**Layout**:

```
[Navigation - fixed]

[Section Header + CTAs]

[3-column grid of ProjectCards]

[Footer - fixed]
```

**Header Section**:

```tsx
<section className="pt-32 pb-16 bg-coal">
  <div className="container">
    <div className="flex items-center justify-between mb-16">
      <h2>
        PROJECTS @<span className="text-ember">prenoma.co</span>
      </h2>
      <div className="flex gap-4">{/* CTAs */}</div>
    </div>
  </div>
</section>
```

**Grid Section**:

```tsx
<section className="py-12 bg-coal">
  <div className="container">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map(project => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>
  </div>
</section>
```

**Data Structure**:

```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  siteUrl: string;
}

const projects: Project[] = [
  {
    id: "computer-port",
    title: "Computer Port IT Solutions",
    description: "Our latest work",
    imageUrl: "/projects/project-1.jpg", // Placeholder gray image
    siteUrl: "https://example.com",
  },
  {
    id: "veloce",
    title: "Velocè",
    description: "Single Page",
    imageUrl: "/projects/project-2.jpg",
    siteUrl: "https://example.com",
  },
  {
    id: "ar-dental",
    title: "AR Dental Lab",
    description: "Three.js website",
    imageUrl: "/projects/project-3.jpg",
    siteUrl: "https://example.com",
  },
];
```

---

### Pricing Page (`src/app/pricing/page.tsx`)

**Layout**:

```
[Navigation - fixed]

[Section Header]

[2-column grid: PricingCard + PreviewPanel]

[Footer - fixed]
```

**Header Section**:

```tsx
<section className="pt-32 pb-16 bg-coal">
  <div className="container">
    <h2 className="text-5xl font-bold text-cream mb-6">Our Pricing</h2>
    <p className="text-lg text-sand max-w-2xl">
      Transparent, straightforward pricing for stunning website solutions.
    </p>
  </div>
</section>
```

**Pricing + Preview Grid**:

```tsx
<section className="py-20 bg-coal">
  <div className="container">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
      <PricingCard
        price="₹9,999/-"
        period="One Time Pricing"
        features={[
          "Single Page Interactive Website",
          "Figma + Code",
          "2 Revisions",
          "ABC",
          "DEF",
          "GHI",
        ]}
        ctaText="Contact Us"
      />

      <PreviewPanel />
    </div>
  </div>
</section>
```

**PreviewPanel Component**:

```tsx
<div className="flex flex-col gap-6 p-8 bg-sand/5 border border-sand/10 min-h-96 items-center justify-center">
  <img src="/branding-logo.png" alt="prenoma.co" className="h-16" />
  <p className="text-sand text-sm">Website Preview</p>
</div>
```

---

## VII. Animations & Interactions

### GSAP Timeline Rules

**Eye Pupil Following**:

- Trigger: `mousemove` event
- Target: Pupil DOM element
- Animation: `gsap.to(pupil, { x, y, duration: 0.15, ease: 'power2.out' })`
- Throttle: RAF (60fps max)

**Button Hover**:

- Trigger: `mouseenter` / `mouseleave`
- Animation: Scale 1 → 1.02, duration 200ms, ease power2.out
- Tailwind fallback: `hover:scale-102` (if defined)

**Page Transitions**:

- Trigger: Route change
- Animation: Fade in (opacity 0 → 1), slide Y (20px → 0), duration 600ms

---

## VIII. Tailwind Configuration

**Must-Have Extends**:

```typescript
// tailwind.config.ts
module.exports = {
  extend: {
    colors: {
      coal: "#161415",
      cream: "#F3E2C8",
      sand: "#DBCBA9",
      ember: "#F35226",
    },
    fontFamily: {
      sans: ["'Manrope'", "system-ui", "-apple-system", "sans-serif"],
    },
    fontSize: {
      xs: ["12px", "1.4"],
      sm: ["14px", "1.5"],
      base: ["16px", "1.6"],
      lg: ["18px", "1.6"],
      "2xl": ["24px", "1.4"],
      "4xl": ["48px", "1.2"],
      "5xl": ["48px", "1.2"],
      "6xl": ["60px", "1.2"],
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        md: "2rem",
        lg: "3rem",
      },
    },
  },
};
```

---

## IX. Dependencies (package.json)

```json
{
  "dependencies": {
    "next": "^16.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "gsap": "^3.12.0",
    "lenis": "^1.1.0",
    "lucide-react": "^0.400.0",
    "react-icons": "^5.0.0",
    "phosphor-react": "^1.4.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "tailwindcss": "^4.0.0",
    "@types/react": "^19.0.0",
    "@types/node": "^20.0.0"
  }
}
```

---

## X. Implementation Checklist

### Phase 1: Setup

- [ ] Next.js 16 project initialized with Turbopack
- [ ] TypeScript configured
- [ ] Tailwind CSS installed
- [ ] Manrope font imported (globals.css)
- [ ] Color tokens in tailwind.config.ts

### Phase 2: Layout & Navigation

- [ ] RootLayout component created
- [ ] Navigation component built & positioned
- [ ] Footer component built with live clock
- [ ] LenisProvider implemented
- [ ] MouseProvider implemented

### Phase 3: Home Page

- [ ] AsciiEye component created
- [ ] useMousePosition hook implemented
- [ ] Hero content section completed
- [ ] Button components styled
- [ ] Responsive layout tested

### Phase 4: Works Page

- [ ] ProjectCard component built
- [ ] ProjectGrid component created
- [ ] Project data structure finalized
- [ ] Responsive grid (1 → 2 → 3 columns)

### Phase 5: Pricing Page

- [ ] PricingCard component built
- [ ] PreviewPanel component created
- [ ] 2-column layout with responsive fallback
- [ ] Feature checkmarks styled

### Phase 6: Animations & Polish

- [ ] GSAP eye pupil tracking working
- [ ] Button hover animations
- [ ] Page transition animations
- [ ] Lenis smooth scroll verified
- [ ] `prefers-reduced-motion` applied

### Phase 7: Testing & Optimization

- [ ] Responsive design across breakpoints (mobile, tablet, desktop)
- [ ] Accessibility audit (contrast, labels, focus states)
- [ ] Performance check (bundle size, LCP, CLS)
- [ ] Cross-browser testing (Chrome, Firefox, Safari)
- [ ] Mobile touch interactions verified

---

## XI. Success Criteria

- ✅ All three pages render correctly
- ✅ Eye pupil tracks cursor smoothly (60fps)
- ✅ Scroll feels premium (Lenis) with no jank
- ✅ GSAP animations are smooth and purposeful
- ✅ Colors match exact brand hex codes
- ✅ Typography uses Manrope exclusively
- ✅ Mobile responsive (< 640px works perfectly)
- ✅ Footer clock shows correct IST time
- ✅ No console errors or warnings
- ✅ Meets WCAG 2.1 AA accessibility standards

---

## XII. Notes for Developer

1. **Tailwind-First**: Use Tailwind utilities before writing custom CSS. Only add custom classes for complex animations or specific layout needs.
2. **Component Reusability**: Build for extension. Every component should accept `className` prop for override flexibility.
3. **Type Safety**: All components must have full TypeScript interfaces. No `any` types.
4. **Performance**: Use `React.memo` for heavy components (ProjectCard grid), `useMemo` for expensive calculations (eye bounds).
5. **Accessibility**: Every interactive element must have proper ARIA labels, focus states, and keyboard support.
6. **Responsive**: Mobile-first approach. Start with base styles, then add breakpoints (sm:, md:, lg:).
7. **No Custom CSS**: Reference DESIGN.md for all styling decisions. If custom CSS is needed, document why in a comment.

---

**Ready for implementation.** All critical decisions have been made. Developer should reference DESIGN.md for visual details and this CONTRACT.md for technical specifications.
