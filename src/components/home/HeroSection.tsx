import AnimatedAsciiEye from "./AnimatedAsciiEye";
import HeroCopy from "./HeroCopy";

export default function HeroSection(): React.JSX.Element {
  return (
    // Why: relative so AnimatedAsciiEye can be positioned absolute within it
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

      {/* ─── Horizontal ruler 2 — footer separator ─── */}
      {/* Why: Uses --footer-h CSS token so this line always hugs the exact
          top edge of the footer bar at every breakpoint, without duplicating
          the footer height value in multiple places. */}
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

      {/* Animated ASCII eye — only visible on laptop (lg) and above */}
      {/* Why: ASCII art is too detail-heavy to read on smaller screens,
          and at reduced sizes the characters lose all legibility. */}
      <div className="hidden lg:block">
        <AnimatedAsciiEye />
      </div>

      {/* Hero copy — responsive positioning */}
      {/* Mobile/tablet: Centered layout shifted to the top area.
          Desktop (lg+): absolute at the Figma-specified 105px left offset, bottom-aligned. */}
      <div
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
