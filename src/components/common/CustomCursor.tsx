"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [isVisible]);

  // We only render this custom cursor dynamically when a mouse is detected,
  // preventing it from showing awkwardly mapped to a touch event on mobile.
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        width: "12px",
        height: "12px",
        borderRadius: "50%",
        backgroundColor: "var(--color-ember)",
        transform: "translate3d(-100px, -100px, 0)",
        marginTop: "-6px", // Center exactly on mouse tip
        marginLeft: "-6px",
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.2s ease-out",
        willChange: "transform",
      }}
      aria-hidden="true"
    />
  );
}
