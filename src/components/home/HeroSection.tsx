import { readFileSync } from "fs";
import { join } from "path";
import AsciiHoverCanvas from "./AsciiHoverCanvas";
import HeroCopy from "./HeroCopy";

export default function HeroSection(): React.JSX.Element {
  // ── Read ASCII layers freshly inside component to avoid caching ──
  const ASCII_L1 = readFileSync(
    join(process.cwd(), "design/ascii/ascii-new-l1.txt"),
    "utf-8"
  );
  const ASCII_L2 = readFileSync(
    join(process.cwd(), "design/ascii/ascii-new-l2.txt"),
    "utf-8"
  );
  const ASCII_L3 = readFileSync(
    join(process.cwd(), "design/ascii/ascii-new-l3.txt"),
    "utf-8"
  );

  return (
    <section className="relative w-full h-dvh overflow-hidden bg-ink">
      {/* ASCII art — desktop (lg+) only */}
      <div className="hidden lg:block">
        <AsciiHoverCanvas layer1={ASCII_L1} layer2={ASCII_L2} layer3={ASCII_L3} />
      </div>

      {/* ── Background Shield: Smooth, non-harsh transparency gradient ── */}
      <div
        className="absolute bottom-0 left-0 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] pointer-events-none z-10"
        style={{
          background: "radial-gradient(circle at bottom left, #161415 40%, transparent 50%)",
        }}
      />

      {/* Hero copy — bottom-left on desktop, centered-lower on mobile */}
      <div
        data-hero-copy
        className="
          absolute z-20
          bottom-[240px] left-6 right-6
          sm:bottom-[320px] sm:left-10
          lg:bottom-[140px] lg:left-[50px] lg:right-auto
        "
      >
        <HeroCopy />
      </div>
    </section>
  );
}
