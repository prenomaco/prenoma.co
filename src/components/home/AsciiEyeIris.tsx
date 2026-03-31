"use client";

// Why: The iris/star pupil is a SEPARATE component so it can be animated
// independently — cursor-tracking (eye follows mouse).
// Currently renders as a positioned container over the star region.
// The star shape in the ASCII art is defined by the NEGATIVE SPACE
// (blank area) inside the dot pattern.

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AsciiEyeIris(): React.JSX.Element {
  const irisRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!irisRef.current) return;

    // Use GSAP's highly optimized quickTo for mouse movement tracking
    // The "power3.out" easing creates a natural, lerp-style lag
    const xTo = gsap.quickTo(irisRef.current, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(irisRef.current, "y", { duration: 0.6, ease: "power3.out" });

    // Define maximum bounds the iris can move within the eye body (pixels)
    const MAX_X = 50;
    const MAX_Y = 30;

    const handleMouseMove = (e: MouseEvent) => {
      // Get viewport center coordinates
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      // Calculate normalized mouse position from -1 to 1
      const normalizedX = (e.clientX - centerX) / centerX;
      const normalizedY = (e.clientY - centerY) / centerY;

      // Map normalized coordinates to absolute translation bounds
      xTo(normalizedX * MAX_X);
      yTo(normalizedY * MAX_Y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={irisRef}
      className="
        absolute
        pointer-events-none
        w-[360px] h-[144px]
      "
      style={{
        // Positioned accurately over the star cutout within the ASCII art frame
        left: "810px",
        top: "360px",
      }}
      data-iris="true"
    />
  );
}
