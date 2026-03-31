import { readFileSync } from "fs";
import { join } from "path";
import AsciiHoverCanvas from "./AsciiHoverCanvas";
import HeroCopy from "./HeroCopy";

// ── Read ASCII layer 1 at build/server time ──
// Why: Server Components can use Node.js APIs directly.
// The file is read once during build (or at request time in dev mode),
// and passed as a string prop to the client component — no bundle bloat.
const ASCII_L1 = readFileSync(
  join(process.cwd(), "design/ascii/ascii-l1.txt"),
  "utf-8"
);
const ASCII_L2 = readFileSync(
  join(process.cwd(), "design/ascii/ascii-l2.txt"),
  "utf-8"
);
// Adding this comment to force Next.js HMR to re-read the updated .txt files!
const ASCII_L3 = readFileSync(
  join(process.cwd(), "design/ascii/ascii-l3.txt"),
  "utf-8"
);

export default function HeroSection(): React.JSX.Element {
  return (
    // Why: relative so child elements can be positioned absolute within it
    <section className="relative w-full h-dvh overflow-hidden bg-ink">
      {/* ─── Vertical ruler — hidden on mobile, visible lg+ ─── */}
      {/* Why: This 1px gutter line is a design element only meaningful at desktop widths */}
      <div
        className="absolute z-10 pointer-events-none hidden lg:block"
        style={{
          left: "104px",
          top: 0,
          bottom: 0,
          width: "1px",
          background: "var(--color-border)",
        }}
        aria-hidden="true"
      />

      {/* ─── Horizontal ruler — footer separator ─── */}
      {/* Why: Uses --footer-h CSS token so this line always hugs the exact
          top edge of the footer bar at every breakpoint */}
      <div
        className="absolute z-10 pointer-events-none"
        style={{
          bottom: "var(--footer-h)",
          left: 0,
          right: 0,
          height: "1px",
          background: "var(--color-border)",
        }}
        aria-hidden="true"
      />

      {/* ─── ASCII art — desktop (lg+) only, hidden on mobile/tablet ─── */}
      {/* Why: ASCII art is too detail-heavy to read on smaller screens,
          and at reduced sizes the characters lose all legibility.
          Positioned per Figma: right 62.5% of viewport, top area. */}
      <div className="hidden lg:block">
        <AsciiHoverCanvas layer1={ASCII_L1} layer2={ASCII_L2} layer3={ASCII_L3} />
      </div>

      {/* ─── Hero copy — responsive positioning ─── */}
      {/* Mobile/tablet: Centered layout shifted to the top area.
          Desktop (lg+): absolute at the Figma-specified 105px left offset, bottom-aligned. */}
      <div
        data-hero-copy
        className="
          absolute z-20
          top-[30dvh] w-full px-4
          lg:w-auto lg:px-0 lg:top-auto lg:bottom-[var(--footer-h)] lg:left-[105px] lg:right-auto
        "
      >
        <HeroCopy />
      </div>
    </section>
  );
}
