# Prenoma Design System

This document outlines the core design language, styling tokens, and technology stack for the prenoma.co project. Use this reference for all future UI development to maintain a cohesive, high-quality, and structurally consistent application.

## Technology Stack
- **Framework:** Next.js 16.2
- **UI Library:** React 19
- **Styling Pipeline:** Tailwind CSS v4 (inline theme execution via `@import "tailwindcss"`)
- **Animations:** GSAP 3.14 + `@gsap/react`
- **Iconography:** `lucide-react` & `react-icons`
- **Language:** TypeScript
- **Package Manager:** npm

## Color Palette & Theming (CSS Variables)
Colors are defined directly in `src/app/globals.css` using the `@theme inline` feature, enabling them to be used as both native CSS variables and Tailwind utilities.

| Token Name | Hex Code | Description / Usage |
| :--- | :--- | :--- |
| `--color-ink` | `#1C1917` | Global Dark Background / Base Plate (Semantic: Background) |
| `--color-cream` | `#F3E2C8` | Lighter accents & Interactive Elements |
| `--color-parchment`| `#DBCBA9` | Primary Text & Content Foreground (Semantic: Foreground) |
| `--color-ember` | `#E84118` | Energetic accents, highlights, calls to action |
| `--color-sand` | `#D4B896` | Secondary accents and subtle contrasts |
| `--color-ash` | `#2A2825` | Secondary, raised backgrounds (e.g., cards, nav bars) |
| `--color-ghost` | `#C8BEA8` | Muted, inactive, or tertiary text |
| `--color-border` | `#2E2C28` | Strokes, dividers, and interface boundaries |

## Typography
- **Primary / Brand Font:** `Manrope` (CSS Var: `--font-sans`)

## Layout & Geometry
- **Borderless / Sharp Geometry:** The design strictly adheres to sharp angles. A global override `--radius-none: 0px` ensures no components use rounded corners. Custom components should NOT implement `rounded-*` utilities unless specifically designed to break this rule.
- **Dynamic Footer Clearing:** Contains predefined logic to reserve fixed footer space using the `--footer-h` variable based on breakpoints.
   - Mobile: `44px`
   - Medium (640px+): `48px`
   - Large (1024px+): `56px`
- **Structural Properties:** The core body is locked to a `100dvh` minimum height with anti-aliasing text features applied by default: `-webkit-font-smoothing: antialiased` & `-moz-osx-font-smoothing: grayscale`. Screen width is restricted using `overflow-x: hidden`.

## Animation & Effects
- Advanced fluid interactions and performance-focused sequence animations must be implemented using **GSAP**. Wait for DOM hydration appropriately when binding scroll or timeline effects.
- Ascii rendering and custom interactive animations run locally (refer to legacy implementation references in `design/ascii-art.*`).

---
_Keep all new UI code in absolute synchronization with this document. Always audit updates against the core `globals.css` structure._
