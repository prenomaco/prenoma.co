"use client";

import { useEffect, useRef, useCallback, useMemo } from "react";
import { gsap } from "gsap";

type AsciiHoverCanvasProps = {
  layer1: string;
  layer2?: string;
  layer3?: string;
};

/**
 * AsciiHoverCanvas — Renders ASCII art with a 3-layer depth-revealing
 * radial gradient mask effect tracking the mouse.
 */
export default function AsciiHoverCanvas({
  layer1,
  layer2,
  layer3,
}: AsciiHoverCanvasProps): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Create refs for the PRE tags to measure them
  const preBaseRef = useRef<HTMLPreElement>(null);
  const preMidRef = useRef<HTMLPreElement>(null);
  const preHighRef = useRef<HTMLPreElement>(null);

  // 1. Independent Trim function for each layer because they have different column counts
  const trimLayer = (layer?: string) => {
    if (!layer) return "";
    const lines = layer.split("\n");
    let top = 0;
    while (top < lines.length && lines[top].trim() === "") top++;

    let bottom = lines.length - 1;
    while (bottom >= 0 && lines[bottom].trim() === "") bottom--;

    if (top > bottom) return layer; // all empty

    let left = Infinity;
    let right = 0;
    for (let i = top; i <= bottom; i++) {
      const line = lines[i];
      const matchFirst = line.search(/[^\s]/);
      const matchLast = line.search(/[^\s](?=[\s]*$)/);
      if (matchFirst !== -1 && matchFirst < left) left = matchFirst;
      if (matchLast !== -1 && matchLast > right) right = matchLast;
    }

    if (left === Infinity) return layer;

    return lines
      .slice(top, bottom + 1)
      .map((line) => line.substring(left, right + 1))
      .join("\n");
  };

  const { trimmedL1, trimmedL2, trimmedL3 } = useMemo(() => {
    return {
      trimmedL1: trimLayer(layer1),
      trimmedL2: trimLayer(layer2),
      trimmedL3: trimLayer(layer3),
    };
  }, [layer1, layer2, layer3]);

  // 2. Mouse tracking for CSS variable masks & GSAP Fade In
  useEffect(() => {
    // Elegant entrance animation to wait for the page loader!
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 2, delay: 1.5, ease: "power2.out" }
      );
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      containerRef.current.style.setProperty("--m-x", `${x}px`);
      containerRef.current.style.setProperty("--m-y", `${y}px`);
    };

    if (containerRef.current) {
      containerRef.current.style.setProperty("--m-x", `-999px`);
      containerRef.current.style.setProperty("--m-y", `-999px`);
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 3. Responsive scaling: Scale independently but align centers
  const rescale = useCallback(() => {
    const container = containerRef.current;
    if (!container || !preBaseRef.current) return;

    const layers = [
      { pre: preBaseRef.current },
      { pre: preMidRef.current },
      { pre: preHighRef.current },
    ].filter(l => l.pre !== null);

    // Reset transforms to measure natural box
    layers.forEach(l => (l.pre!.style.transform = "translate(-50%, -50%)"));
    
    // Base layer bounds determine the overall container width/height
    const baseNaturalWidth = preBaseRef.current.scrollWidth;
    const baseNaturalHeight = preBaseRef.current.scrollHeight;
    if (baseNaturalWidth === 0 || baseNaturalHeight === 0) return;

    const section = container.closest("section");
    if (!section) return;
    const sectionRect = section.getBoundingClientRect();

    const asciiTop = 73;
    const copyEl = section.querySelector("[data-hero-copy]");
    let asciiBottomGap: number;
    if (copyEl) {
      const copyRect = copyEl.getBoundingClientRect();
      asciiBottomGap = sectionRect.bottom - copyRect.top;
    } else {
      asciiBottomGap = sectionRect.height * 0.29;
    }

    const availableHeight = sectionRect.height - asciiTop - asciiBottomGap;
    if (availableHeight <= 0) return;

    // Set container to match Base Layer's scaled bounds exactly as before
    const baseScale = availableHeight / baseNaturalHeight;
    const containerWidth = baseNaturalWidth * baseScale;

    container.style.top = `${asciiTop}px`;
    container.style.height = `${availableHeight}px`;
    container.style.width = `${containerWidth}px`;

    // Now scale EACH layer so it mathematically hits the SAME target height!
    // Since L2 and L3 have a smaller natural height, their scale multiplier 
    // will be larger, expanding their font visually to create the zoom effect!
    layers.forEach((l) => {
      const pre = l.pre!;
      const naturalHeight = pre.scrollHeight;
      if (naturalHeight > 0) {
        const scale = availableHeight / naturalHeight;
        pre.style.transform = `translate(-50%, -50%) scale(${scale})`;
      }
    });

  }, []);

  useEffect(() => {
    if (document.fonts?.ready) {
      document.fonts.ready.then(rescale);
    } else {
      rescale();
    }

    const section = containerRef.current?.closest("section");
    if (!section) return;

    const observer = new ResizeObserver(rescale);
    observer.observe(section);

    return () => observer.disconnect();
  }, [rescale, trimmedL1, trimmedL2, trimmedL3]);

  // Center alignment styling
  const preStyles: React.CSSProperties = {
    fontFamily: "'Courier New', Courier, monospace",
    fontSize: "10px",
    lineHeight: "10px",
    letterSpacing: "0px",
    transformOrigin: "center center",
    top: "50%",
    left: "50%",
  };

  return (
    <div
      ref={containerRef}
      id="ascii-hover-container"
      className="absolute overflow-visible pointer-events-none"
      style={{
        right: 0,
        "--m-x": "-999px",
        "--m-y": "-999px",
      } as React.CSSProperties}
      aria-hidden="true"
    >
      {/* LAYER 1: Base density (always visible outside hover radius) */}
      <div 
        className="absolute inset-0"
        style={{
          WebkitMaskImage: "radial-gradient(circle at var(--m-x) var(--m-y), transparent 0px, transparent 190px, black 270px)",
          maskImage: "radial-gradient(circle at var(--m-x) var(--m-y), transparent 0px, transparent 190px, black 270px)",
        }}
      >
        <pre
          ref={preBaseRef}
          className="absolute whitespace-pre select-none"
          style={{
            ...preStyles,
            color: "var(--color-ghost)",
            opacity: 0.25, // Increased brightness for L1
            transform: "translate(-50%, -50%)",
          }}
        >
          {trimmedL1}
        </pre>
      </div>

      {/* LAYER 2: Medium density */}
      {trimmedL2 && (
        <div 
          className="absolute inset-0"
          style={{
            WebkitMaskImage: "radial-gradient(circle at var(--m-x) var(--m-y), transparent 0px, transparent 70px, black 150px, black 190px, transparent 270px)",
            maskImage: "radial-gradient(circle at var(--m-x) var(--m-y), transparent 0px, transparent 70px, black 150px, black 190px, transparent 270px)",
          }}
        >
          <pre
            ref={preMidRef}
            className="absolute whitespace-pre select-none"
            style={{
              ...preStyles,
              color: "var(--color-ghost)",
              opacity: 0.6,
              transform: "translate(-50%, -50%)",
            }}
          >
            {trimmedL2}
          </pre>
        </div>
      )}

      {/* LAYER 3: High density core */}
      {trimmedL3 && (
        <div 
          className="absolute inset-0"
          style={{
            WebkitMaskImage: "radial-gradient(circle at var(--m-x) var(--m-y), black 0px, black 70px, transparent 150px)",
            maskImage: "radial-gradient(circle at var(--m-x) var(--m-y), black 0px, black 70px, transparent 150px)",
          }}
        >
          <pre
            ref={preHighRef}
            className="absolute whitespace-pre select-none"
            style={{
              ...preStyles,
              color: "var(--color-cream)",
              opacity: 1, 
              // Back to a single subtle drop-shadow to save frames!
              textShadow: "0 0 8px var(--color-ember)", 
              transform: "translate(-50%, -50%)",
            }}
          >
            {trimmedL3}
          </pre>
        </div>
      )}
    </div>
  );
}
