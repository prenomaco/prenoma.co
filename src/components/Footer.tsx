"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { hoverEffectEnter, hoverEffectLeave } from "@/components/hoverEffects";

export default function Footer(): React.JSX.Element {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!footerRef.current) return;
    const items = footerRef.current.children;
    gsap.fromTo(
      items,
      { opacity: 0, y: 6 },
      { opacity: 0.5, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.1, delay: 2.2 }
    );
  }, { scope: footerRef });

  return (
    <footer
      ref={footerRef}
      className="fixed bottom-0 right-0 z-40 pointer-events-none flex items-center gap-6 pb-10 pr-5 md:pr-12"
      aria-label="Site footer"
    >
      <Link
        href="/terms"
        className="pointer-events-auto lowercase"
        style={{
          fontFamily: "var(--font-mono, monospace)",
          fontSize: "16px",
          color: "#dbcba9",
          opacity: 0,
        }}
      >
        <div style={{ overflow: "hidden", lineHeight: "1.2", height: "1.2em" }}>
          <span
            className="flex flex-col"
            onMouseEnter={hoverEffectEnter}
            onMouseLeave={hoverEffectLeave}
          >
            <span>terms</span>
            <span aria-hidden="true">terms</span>
          </span>
        </div>
      </Link>
      <Link
        href="/privacy"
        className="pointer-events-auto lowercase"
        style={{
          fontFamily: "var(--font-mono, monospace)",
          fontSize: "16px",
          color: "#dbcba9",
          opacity: 0,
        }}
      >
        <div style={{ overflow: "hidden", lineHeight: "1.2", height: "1.2em" }}>
          <span
            className="flex flex-col"
            onMouseEnter={hoverEffectEnter}
            onMouseLeave={hoverEffectLeave}
          >
            <span>privacy_policy</span>
            <span aria-hidden="true">privacy_policy</span>
          </span>
        </div>
      </Link>
      <span
        className="lowercase"
        style={{
          fontFamily: "var(--font-mono, monospace)",
          fontSize: "16px",
          color: "#dbcba9",
          opacity: 0,
        }}
      >
        ©2026
      </span>
    </footer>
  );
}
