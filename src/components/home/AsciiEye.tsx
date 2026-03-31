// Why: Orchestrator component that layers the ASCII eye body and iris.
// The body is a server-rendered <pre> block, the iris is a client component
// with a ref for future cursor-tracking animation (eye follows mouse).
// Both are absolutely positioned within this container.
import AsciiEyeBody from "./AsciiEyeBody";
import AsciiEyeIris from "./AsciiEyeIris";

export default function AsciiEye(): React.JSX.Element {
  return (
    // Why: This wrapper is positioned absolute within HeroSection.
    // The relative positioning here lets AsciiEyeIris overlay AsciiEyeBody.
    <div
      className="
        absolute
        w-[1800px] h-[990px]
        pointer-events-none select-none
      "
      style={{
        right: "-1150px",
        top: "-350px",
        transform: "scale(1.3)",
        transformOrigin: "top right",
      }}
      aria-hidden="true"
    >
      {/* Eye body — full dot pattern including the star void */}
      <AsciiEyeBody />

      {/* Star/iris — positioned over the pupil region for future animation */}
      <AsciiEyeIris />
    </div>
  );
}
