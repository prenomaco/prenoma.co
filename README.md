# prenoma.co

Corporate website for Prenoma — built with Next.js 16, React 19, and TypeScript.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | GSAP, Framer Motion |
| 3D / WebGL | Three.js, OGL |
| Email | Resend + React Email |
| Linting | ESLint 9 + eslint-config-next |

---

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero, marquee, wave background |
| `/projects` | Project showcase with filter tabs and card stack |
| `/contact` | Contact form + pricing panel |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Scripts

```bash
npm run dev      # Start dev server (Turbopack)
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # Run ESLint
```

> If changes don't appear after editing, clear the Turbopack cache:
> ```bash
> rm -rf .next && npm run dev
> ```

---

## Project Structure

```
src/
├── app/
│   ├── api/contact/     # Contact form API route (Resend)
│   ├── contact/
│   ├── privacy/
│   ├── projects/
│   ├── terms/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── home/            # Hero section
│   ├── contact/         # ContactForm, PricingPanel
│   ├── projects/        # ProjectCard, FilterTabs, CardStack
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── WaveBackground.tsx
│   ├── CustomCursor.tsx
│   ├── MarqueeBanner.tsx
│   └── SplitText.tsx
└── data/
    └── projects.ts      # Project entries
```

---

## Environment Variables

Create a `.env.local` at the project root:

```env
RESEND_API_KEY=your_resend_api_key
```

Required for the contact form API route to send emails.

---

## Deployment

Deployed on Vercel. Push to `main` triggers a production deploy automatically.
