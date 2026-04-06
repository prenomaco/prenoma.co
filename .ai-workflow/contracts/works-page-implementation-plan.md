# Works Page Implementation Plan

## 📋 Executive Summary

**Objective**: Transform the `/works` page from a stub into an interactive portfolio showcase featuring **live, embedded websites** within project cards, with parallax depth effects and GSAP animations inspired by unseen.co.

**Key Innovation**: Instead of static screenshots, each project card will contain an **interactive iframe** displaying the actual live website, allowing visitors to browse and interact directly within the frame.

---

## 🎨 Design Reference Analysis

### From Works.png
- **Header Section**: "projects @prenoma.co" (left) + "Have a question? Connect w/ us" + "Check out Pricing" button (right)
- **Grid Layout**: 3 project cards in a row (desktop)
- **Card Structure**:
  - Large preview area (currently gray placeholders → will be interactive iframes)
  - Project title below
  - Project description
  - "Visit Site" button with arrow (cream/parchment background)
- **Visual Style**: Dark background (#161415), sharp corners, Manrope font

### From unseen.co Analysis
- **Parallax Depth**: Cards move at different speeds/depths on scroll
- **Smooth Animations**: GSAP-powered entrance animations with stagger
- **Interactive States**: Hover effects, micro-interactions
- **Performance**: Lazy loading, intersection observers

---

## 🏗️ Technical Architecture

### Component Hierarchy

```
WorksPage (page.tsx)
├── WorksHero (Header with title + CTAs)
├── ProjectGrid (Grid container with scroll animations)
│   ├── ProjectCard (Individual project wrapper)
│   │   ├── LiveWebsiteFrame (Interactive iframe with states)
│   │   ├── ProjectMeta (Title + description)
│   │   └── VisitButton (External link CTA)
│   ├── ProjectCard
│   └── ProjectCard
└── FooterBar (existing, fixed)
```

### File Structure

```
src/
├── app/works/
│   └── page.tsx                    // Main page (UPDATED)
├── components/works/
│   ├── WorksHero.tsx              // NEW - Header section
│   ├── ProjectGrid.tsx            // NEW - Grid with animations
│   ├── ProjectCard.tsx            // NEW - Card wrapper
│   └── LiveWebsiteFrame.tsx       // NEW - Interactive iframe
├── data/
│   └── projects.ts                // NEW - Project data
└── hooks/
    └── useParallax.ts             // NEW - Parallax scroll hook
```

---

## 📊 Data Model

### Project Interface

```typescript
// src/data/projects.ts

export interface Project {
  id: string;              // Unique identifier
  title: string;           // Display title
  description: string;     // Short description
  url: string;            // Website URL (for iframe src)
  category: string;       // e.g., "Enterprise Infrastructure", "E-commerce"
  tags?: string[];        // Tech stack: ["Next.js", "React"]
  year?: string;          // Project year
  thumbnail?: string;     // Fallback image if iframe fails
}

export const PROJECTS: Project[] = [
  {
    id: "computer-port",
    title: "Computer Port",
    description: "Enterprise infrastructure solutions for India's leading organizations",
    url: "https://computerport.in",
    category: "Enterprise B2B",
    tags: ["Next.js", "GSAP", "Enterprise"],
    year: "2024"
  },
  {
    id: "veloce",
    title: "Veloce",
    description: "Premium pre-owned car marketplace with verified listings",
    url: "https://veloce-dealer.vercel.app",
    category: "E-commerce",
    tags: ["Next.js", "Automotive"],
    year: "2024"
  },
  {
    id: "arr-dental-lab",
    title: "ARR Dental Lab",
    description: "Trusted dental laboratory services and solutions",
    url: "https://arrdentallab.com",
    category: "Healthcare",
    tags: ["Dental", "Services"],
    year: "2024"
  }
];
```

---

## 🎭 Interactive Iframe Strategy

### Implementation Approach

**Primary Method**: `<iframe>` with interactive capabilities

```tsx
<iframe
  src={project.url}
  title={project.title}
  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
  loading="lazy"
  className="w-full h-full pointer-events-auto"
  onLoad={handleIframeLoad}
  onError={handleIframeError}
/>
```

### State Management

```typescript
type FrameState = "loading" | "loaded" | "error" | "blocked";

const [frameState, setFrameState] = useState<FrameState>("loading");
```

### Fallback Strategy

1. **Loading State**: Show skeleton loader
2. **Loaded State**: Iframe is interactive
3. **Error State**: Display fallback image with "Visit Site" overlay
4. **Blocked State**: If CSP/X-Frame-Options blocks, show static preview

### Security & Performance

- **Sandbox Attributes**: Restrict capabilities while maintaining interactivity
- **Lazy Loading**: Only load iframes when in viewport (Intersection Observer)
- **CSP Handling**: Graceful degradation for blocked iframes
- **Pointer Events**: Enable `pointer-events: auto` on iframe for scrolling/clicking

---

## 🎬 Animation System

### GSAP Scroll Animations

Inspired by unseen.co's parallax depth:

```typescript
// Entrance animation (stagger effect)
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

// Parallax depth on scroll (DRAMATIC - closer to unseen.co intensity)
useGSAP(() => {
  gsap.to(".project-card", {
    y: (index) => -120 * (index % 2 === 0 ? 1 : -1), // Alternate direction, dramatic movement
    ease: "none",
    scrollTrigger: {
      trigger: ".project-grid",
      start: "top bottom",
      end: "bottom top",
      scrub: 1.5, // Slightly slower scrub for more dramatic effect
    }
  });
}, []);
```

### Hover Interactions

```typescript
// Card hover scale + shadow
const handleHover = () => {
  gsap.to(cardRef.current, {
    scale: 1.02,
    boxShadow: "0 20px 60px rgba(232, 65, 24, 0.15)",
    duration: 0.3,
    ease: "power2.out"
  });
};
```

---

## 📱 Responsive Layout

### Breakpoints

| Screen | Columns | Spacing | Card Height |
|--------|---------|---------|-------------|
| Mobile (< 640px) | 1 | 24px | 400px |
| Tablet (640-1024px) | 2 | 32px | 500px |
| Desktop (> 1024px) | 3 | 40px | 600px |

### Grid Implementation

```tsx
<div className="
  grid
  grid-cols-1
  sm:grid-cols-2
  lg:grid-cols-3
  gap-6
  sm:gap-8
  lg:gap-10
  px-6
  sm:px-12
  lg:px-[50px]
">
  {/* Cards */}
</div>
```

---

## 🎨 Design System Mapping

### Color Tokens

```css
/* From globals.css */
--color-ink: #161415        → Background
--color-cream: #F0DFC0      → Titles
--color-parchment: #D4C9A8  → Descriptions, buttons
--color-ember: #E84118      → Accents, hover states
--color-ghost: #B8AE94      → Borders (subtle)
```

### Typography

```typescript
// Title
className="text-[24px] lg:text-[28px] font-bold text-cream"

// Description  
className="text-[16px] lg:text-[18px] text-parchment"

// Button
className="text-[16px] font-medium text-ink bg-parchment hover:bg-ember hover:text-cream transition-all duration-300"
```

### Spacing

- **Card padding**: `p-6 lg:p-8`
- **Content gap**: `gap-4 lg:gap-6`
- **Button padding**: `px-8 py-3`

---

## 🔧 Component Specifications

### 1. WorksHero.tsx

**Purpose**: Header section with title and CTAs

```tsx
<section className="pt-32 pb-16 px-6 lg:px-[50px]">
  <div className="flex items-start justify-between">
    <h1 className="text-[48px] lg:text-[65px] font-bold text-cream">
      projects <span className="text-ember">@prenoma.co</span>
    </h1>
    <div className="flex items-center gap-6">
      <a href="/contact" className="text-parchment hover:text-ember">
        Have a question? Connect w/ us
      </a>
      <a href="/pricing" className="btn-primary">
        Check out Pricing →
      </a>
    </div>
  </div>
</section>
```

### 2. ProjectGrid.tsx

**Purpose**: Container with scroll-triggered animations

```tsx
<div 
  ref={gridRef}
  className="project-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-[50px] pb-32"
>
  {PROJECTS.map((project, index) => (
    <ProjectCard key={project.id} project={project} index={index} />
  ))}
</div>
```

**Animations**: GSAP ScrollTrigger for entrance + parallax

### 3. ProjectCard.tsx

**Purpose**: Individual project wrapper with hover effects

```tsx
<article 
  ref={cardRef}
  className="project-card group flex flex-col bg-ash border border-ghost/20 overflow-hidden transition-all duration-300"
>
  {/* Iframe area */}
  <div className="relative aspect-video overflow-hidden bg-ink">
    <LiveWebsiteFrame url={project.url} title={project.title} />
  </div>
  
  {/* Meta section */}
  <div className="p-6 flex flex-col gap-4">
    <h3 className="text-[24px] font-bold text-cream">{project.title}</h3>
    <p className="text-[16px] text-parchment">{project.description}</p>
    
    <a 
      href={project.url} 
      target="_blank"
      className="btn-visit-site"
    >
      Visit Site →
    </a>
  </div>
</article>
```

### 4. LiveWebsiteFrame.tsx

**Purpose**: Interactive iframe with loading/error states

```tsx
const [state, setState] = useState<FrameState>("loading");
const iframeRef = useRef<HTMLIFrameElement>(null);

return (
  <div className="relative w-full h-full">
    {/* Loading skeleton */}
    {state === "loading" && (
      <div className="absolute inset-0 bg-ink animate-pulse" />
    )}
    
    {/* Interactive iframe */}
    <iframe
      ref={iframeRef}
      src={url}
      title={title}
      sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      loading="lazy"
      className={cn(
        "w-full h-full border-0",
        state === "loaded" ? "pointer-events-auto" : "pointer-events-none"
      )}
      onLoad={() => setState("loaded")}
      onError={() => setState("error")}
    />
    
    {/* Error fallback */}
    {state === "error" && (
      <div className="absolute inset-0 flex items-center justify-center bg-ink">
        <p className="text-parchment">Preview unavailable</p>
      </div>
    )}
    
    {/* Interaction hint overlay (appears on hover) */}
    <div className="absolute inset-0 bg-ink/80 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center justify-center">
      <p className="text-cream text-[14px]">Click to interact</p>
    </div>
  </div>
);
```

---

## 🚀 Performance Optimizations

### 1. Lazy Loading

```typescript
// Only load iframe when in viewport
const { ref, inView } = useInView({
  threshold: 0.1,
  triggerOnce: true
});

{inView && <iframe src={url} />}
```

### 2. Debounced Scroll

```typescript
// Prevent excessive parallax calculations
const debouncedScroll = useMemo(
  () => debounce(() => {
    // Parallax logic
  }, 16), // ~60fps
  []
);
```

### 3. Resource Hints

```tsx
// In page.tsx
<link rel="dns-prefetch" href="https://computerport.in" />
<link rel="dns-prefetch" href="https://veloce-dealer.vercel.app" />
<link rel="dns-prefetch" href="https://arrdentallab.com" />
```

---

## 🎯 Unseen.co Pattern Adaptation

### What We're Borrowing

1. **Parallax Depth**: Cards move at different speeds on scroll
2. **Stagger Entrance**: Projects fade in sequentially, not all at once
3. **Smooth Scrolling**: GSAP scrub for buttery parallax
4. **Hover Micro-interactions**: Subtle scale + shadow on hover

### Prenoma Design Language Translation

| Unseen.co | Prenoma.co |
|-----------|------------|
| Light beige background | Dark ink (#161415) |
| Playful animations | Sophisticated, subtle |
| Rounded corners | Sharp, 0px border-radius |
| Sans-serif (Unseen font) | Manrope (brand font) |
| Bold colors | Cream, parchment, ember accent |

### Animation Values

```typescript
// Entrance stagger
stagger: 0.2      // 200ms delay between cards

// Parallax movement
y: -120 to 120    // 240px total range (DRAMATIC)

// Hover scale
scale: 1.02       // Subtle 2% growth

// Duration
entrance: 1.2s    // Slow, elegant
hover: 0.3s       // Quick response
```

---

## 🧪 Testing Checklist

### Iframe Compatibility

- [ ] Computer Port loads and is interactive
- [ ] Veloce loads and is interactive
- [ ] ARR Dental Lab loads and is interactive
- [ ] Fallback triggers if iframe blocked
- [ ] Loading states display correctly

### Responsive Design

- [ ] 1-column layout on mobile
- [ ] 2-column layout on tablet
- [ ] 3-column layout on desktop
- [ ] Touch interactions work on mobile

### Animations

- [ ] Cards fade in with stagger on scroll
- [ ] Parallax works smoothly (no jank)
- [ ] Hover effects trigger correctly
- [ ] No animation on reduced-motion preference

### Performance

- [ ] Lighthouse score > 90
- [ ] Iframes lazy load
- [ ] No layout shift (CLS < 0.1)
- [ ] Smooth 60fps scrolling

---

## 🚨 Edge Cases & Considerations

### 1. CSP/X-Frame-Options Blocking

**Scenario**: Website blocks iframe embedding

**Solution**: 
- Detect error state
- Show fallback thumbnail image
- Emphasize "Visit Site" button

### 2. Slow Network

**Scenario**: Iframe takes 10+ seconds to load

**Solution**:
- Show loading skeleton indefinitely
- Add optional "Load Preview" button
- Timeout after 15s, show error state

### 3. Mobile Touch Conflicts

**Scenario**: Scrolling iframe fights with page scroll

**Solution**:
- On mobile, make iframe `pointer-events: none` by default
- Add "Tap to interact" overlay
- On tap, enable pointer events for 5 seconds

### 4. Accessibility

**Scenario**: Screen readers can't navigate iframes

**Solution**:
- Add descriptive `title` attribute to iframe
- Include skip links
- Ensure "Visit Site" button is keyboard accessible

---

## 📅 Implementation Phases

### Phase 1: Foundation (1-2 hours)
1. Create component structure
2. Set up project data file
3. Build basic grid layout (no animations)
4. Test responsive breakpoints

### Phase 2: Interactive Frames (2-3 hours)
1. Implement LiveWebsiteFrame component
2. Add loading/error states
3. Test all 3 project URLs
4. Add fallback images

### Phase 3: Animations (1-2 hours)
1. GSAP entrance animations with stagger
2. Parallax scroll effect
3. Hover micro-interactions
4. Test performance (60fps)

### Phase 4: Polish (1 hour)
1. WorksHero component with CTAs
2. Fine-tune spacing/typography
3. Accessibility audit
4. Cross-browser testing

**Total Estimated Time**: 5-8 hours

---

## 🎯 Success Criteria

✅ All 3 projects display with interactive iframes  
✅ Smooth parallax depth effect on scroll  
✅ Staggered entrance animations work  
✅ Responsive across mobile/tablet/desktop  
✅ Lighthouse performance > 90  
✅ No accessibility violations  
✅ "Visit Site" buttons navigate correctly  
✅ Fallback works if iframe blocked  

---

## 🔄 Future Enhancements

- **Filtering**: Add category filters (like unseen.co's "All", "Branding", etc.)
- **Search**: Project search by name/tag
- **Load More**: Pagination for 10+ projects
- **Detail Views**: Click card → modal with full project details
- **Analytics**: Track which projects get most iframe interactions

---

## 📝 Notes for Implementation

1. **CTA Links**: "Have a question?" and "Check out Pricing" should link to `/contact` (not yet created)
2. **Image Fallbacks**: User will provide fallback images if iframe blocking occurs
3. **Animation Preference**: Respect `prefers-reduced-motion`
4. **Custom Cursor**: Existing custom cursor should work over iframes (may need z-index tweaks)

---

**Next Step**: Approve this plan, then delegate to @scribe-assistant to write formal contract, followed by @frontend-taste for implementation.
