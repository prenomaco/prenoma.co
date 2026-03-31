"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { EYE_HOLDER, EYE_BALL } from "./AsciiEyeData";

type AnimatedAsciiEyeProps = {
  className?: string;
  scale?: number;
  maxMoveX?: number;
  maxMoveY?: number;
};

export default function AnimatedAsciiEye({
  className = "absolute right-[0%] top-[73px] w-[820px] h-[460px] pointer-events-none select-none text-ghost",
  scale = 0.45,
  maxMoveX = 42,
  maxMoveY = 22,
}: AnimatedAsciiEyeProps): React.JSX.Element {
  const eyeHolderRef = useRef<HTMLPreElement>(null);
  const eyeBallRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (!eyeHolderRef.current || !eyeBallRef.current) return;

    const xTo = gsap.quickTo(eyeBallRef.current, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(eyeBallRef.current, "y", { duration: 0.6, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      if (!eyeHolderRef.current) return;

      const rect = eyeHolderRef.current.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;

      const deltaX = e.clientX - eyeCenterX;
      const deltaY = e.clientY - eyeCenterY;

      // Scale max movement by the visual scale so the ball stays within
      // the rendered eye boundary regardless of how large/small the eye appears
      const activeMaxX = maxMoveX * scale;
      const activeMaxY = maxMoveY * scale;

      const moveX = Math.max(-activeMaxX, Math.min(activeMaxX, deltaX * 0.15));
      const moveY = Math.max(-activeMaxY, Math.min(activeMaxY, deltaY * 0.15));

      xTo(moveX);
      yTo(moveY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [maxMoveX, maxMoveY]);

  return (
    // We use a relative container scaled to match the visual footprint of the SVG version
    <div className={className} aria-hidden="true">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Holder Layer */}
        {/* Why: We use an explicit 10px line-height and letter-spacing with a scale matrix 
            to coerce the characters into fitting exactly into the target container at a 1:1 square aspect ratio. */}
        <pre
          ref={eyeHolderRef}
          className="absolute font-mono whitespace-pre opacity-65 flex items-center justify-center text-center"
          style={{
            fontSize: "12px",
            lineHeight: "10px",
            letterSpacing: "1.4px",
            transformOrigin: "center",
            transform: `scale(${scale})`, 
          }}
        >
          {EYE_HOLDER}
        </pre>
        
        {/* Ball Layer */}
        <pre
          ref={eyeBallRef}
          className="absolute font-mono whitespace-pre opacity-65 flex items-center justify-center text-center"
          style={{
            fontSize: "12px",
            lineHeight: "10px",
            letterSpacing: "1.4px",
            transformOrigin: "center",
            transform: `scale(${scale})`, 
          }}
        >
          {EYE_BALL}
        </pre>
      </div>
    </div>
  );
}
