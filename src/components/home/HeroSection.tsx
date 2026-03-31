import AnimatedAsciiEye from "./AnimatedAsciiEye";
import HeroCopy from "./HeroCopy";

export default function HeroSection(): React.JSX.Element {
  return (
    // Why: relative so AnimatedAsciiEye can be positioned absolute within it
    <section className="relative w-full h-dvh overflow-hidden bg-ink">
      {/* ─── Vertical ruler (Figma vector 2:127, x=104, full height) ─── */}
      {/* Why: Runs the entire viewport height at x:104, 1px to the left
          of the 105px content gutter. All content sits immediately right of this line. */}
      <div
        className="absolute z-10 pointer-events-none"
        style={{
          left: "104px",
          top: 0,
          bottom: 0,
          width: "1px",
          background: "var(--color-border)",
        }}
        aria-hidden="true"
      />

      {/* ─── Horizontal ruler 2 (Figma vector 2:132, y=1004) ─── */}
      {/* Why: Sits at the TOP EDGE of the footer bar, acting as a separator.
          The footer is fixed at bottom with py-5 (20px padding).
          Footer total height ≈ 56px. In Figma: y=1004 → 76px from 1080 bottom.
          76px / 1080px = 7.037% from bottom. Using a bottom-anchored approach
          that's relative to the footer's top edge. */}
      <div
        className="absolute z-10 pointer-events-none"
        style={{
          bottom: "56px",
          left: 0,
          right: 0,
          height: "1px",
          background: "var(--color-border)",
        }}
        aria-hidden="true"
      />

      {/* Animated ASCII eye — tracking pupil generated from SVGs */}
      <AnimatedAsciiEye />

      {/* Hero copy — Figma: logo at y:766, headline at y:807, tagline at y:887 */}
      {/* Why: Bottom-left positioning — tagline bottom at y=930, which is
          exactly 150px from the 1080 frame bottom (1080-930=150). */}
      {/* Why: bottom-[56px] aligns the CTA button's bottom edge with
          the horizontal ruler line at bottom:56px (footer separator). */}
      <div className="absolute bottom-[56px] left-[105px]">
        <HeroCopy />
      </div>
    </section>
  );
}
