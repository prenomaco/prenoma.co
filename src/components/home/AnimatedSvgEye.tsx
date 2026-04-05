"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function AnimatedSvgEye(): React.JSX.Element {
  const eyeHolderRef = useRef<HTMLImageElement>(null);
  const eyeBallRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!eyeHolderRef.current || !eyeBallRef.current) return;

    // Use GSAP quickTo for smooth high-performance tracking
    const xTo = gsap.quickTo(eyeBallRef.current, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(eyeBallRef.current, "y", { duration: 0.6, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      if (!eyeHolderRef.current) return;

      const rect = eyeHolderRef.current.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;

      const deltaX = e.clientX - eyeCenterX;
      const deltaY = e.clientY - eyeCenterY;

      // Max travel of the eye ball within the holder
      // Reduced bounds to ensure the ball doesn't clip into the boundary

      // Extremely restricted max boundary limits so it cannot possibly hit the line
      const maxMoveX = 22;
      const maxMoveY = 14;

      const moveX = Math.max(-maxMoveX, Math.min(maxMoveX, deltaX * 0.10));
      const moveY = Math.max(-maxMoveY, Math.min(maxMoveY, deltaY * 0.10));

      xTo(moveX);
      yTo(moveY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    // Why: Matching similar visible dimensions to the ASCII eye (~650px visible on right edge).
    // Positioned using absolute to sit on the right side of the screen.
    <div
      className="absolute pointer-events-none select-none"
      style={{
        right: "0%", // Fixed to right edge as requested
        top: "73px", // Aligned perfectly with Navbar pt-[73px]
        width: "720px", // Scaled down somewhat from 850px
        height: "420px"
      }}
      aria-hidden="true"
    >
      <div className="relative w-full h-full">
        <Image
          ref={eyeHolderRef}
          src="/images/eye-holder.svg"
          alt=""
          fill
          className="object-contain"
        />
        <Image
          ref={eyeBallRef}
          src="/images/eye-ball.svg"
          alt=""
          width={200}
          height={200}
          className="absolute w-[35%] h-[35%] object-contain"
        />
      </div>
    </div>
  );
}
