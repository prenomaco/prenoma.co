"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Skip on touch devices
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      
      // Main cursor - follows exactly
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      
      // Glassy bubble - follows with slight delay
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isVisible]);

  // Don't render on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Glassy bubble - outer glow */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(232,65,24,0.15) 0%, rgba(232,65,24,0.05) 50%, transparent 70%)",
          border: "1px solid rgba(232,65,24,0.2)",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
          transform: "translate3d(-100px, -100px, 0)",
          marginTop: "-20px",
          marginLeft: "-20px",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s ease-out, transform 0.15s ease-out",
          willChange: "transform",
          boxShadow: "0 0 20px rgba(232,65,24,0.1), inset 0 0 10px rgba(232,65,24,0.05)",
        }}
        aria-hidden="true"
      />
      
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: "var(--color-ember)",
          transform: "translate3d(-100px, -100px, 0)",
          marginTop: "-4px",
          marginLeft: "-4px",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.2s ease-out",
          willChange: "transform",
        }}
        aria-hidden="true"
      />
    </>
  );
}
