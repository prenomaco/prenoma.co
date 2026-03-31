"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function HeroCopy(): React.JSX.Element {
  const logoRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Why: Staggered entry builds visual rhythm and premium feel
    const tl = gsap.timeline();
    tl.fromTo(
      logoRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      0.3
    )
      .fromTo(
        headlineRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        0.5
      )
      .fromTo(
        taglineRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out" },
        0.8
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        1.0
      );
  }, []);

  return (
    <div className="flex flex-col">
      {/* Logo wordmark — Figma node 2:92, group size: 285.41 × 45px */}
      {/* Why: Source PNG is 1080×1080 square which distorts at 285×45. Using text spans
          with proper font/color gives pixel-perfect match to the Figma vector group.
          'prenoma' in parchment, '.co' in ember — exact brand colours. */}
      <div ref={logoRef} className="mb-0 opacity-0 h-[35px] flex items-center">
        <span className="text-[28px] font-bold text-cream leading-none tracking-tight">
          prenoma
        </span>
        <span className="text-[28px] font-bold text-ember leading-none tracking-tight">
          .co
        </span>
      </div>

      {/* ─── Horizontal ruler 1 (Figma vector 2:128, y=813) ─── */}
      {/* Why: Sits at the TOP EDGE of the headline, right below the logo.
          In Figma this line goes full-width at y=813, touching the cap-height
          of "WE MAKE STUNNING WEBSITES". We use negative margin to extend
          the line beyond the parent's 105px left offset to cover full viewport width. */}
      <div
        className="pointer-events-none"
        style={{
          marginLeft: "-105px",
          width: "100vw",
          height: "1px",
          background: "var(--color-border)",
        }}
        aria-hidden="true"
      />

      {/* Hero headline — EXACT: 65.439px, font-bold (700), #F3E2C8 */}
      {/* Why: Figma node 2:104 specifies exactly 65.439px at position y:807.886 */}
      <h1
        ref={headlineRef}
        className="text-[50px] font-bold leading-normal text-cream uppercase whitespace-nowrap opacity-0"
      >
        WE MAKE STUNNING WEBSITES
      </h1>

      {/* Tagline — EXACT: 31.123px, font-bold (700), #DBCBA9, gap: 18px */}
      {/* Why: Bullets are SVG ellipses (11×11px) per Figma, NOT typed '•' characters */}
      <div
        ref={taglineRef}
        className="flex items-center gap-[15px] mt-0 opacity-0"
      >
        <span className="text-[23px] font-bold text-parchment leading-normal">
          affordable
        </span>
        {/* Scaled: 11px -> 8px */}
        <div className="w-[8px] h-[8px] rounded-full bg-ember shrink-0" />
        <span className="text-[23px] font-bold text-parchment leading-normal">
          fast
        </span>
        <div className="w-[8px] h-[8px] rounded-full bg-ember shrink-0" />
        <span className="text-[23px] font-bold text-parchment leading-normal">
          beautiful
        </span>
      </div>

      {/* CTA Row */}
      <div ref={ctaRef} className="flex items-center gap-[30px] mt-5 opacity-0">
        <Link
          href="/pricing"
          className="inline-flex items-center justify-center gap-2 bg-parchment text-ink text-[19px] font-normal w-[240px] h-[46px] rounded-none hover:opacity-90 transition-opacity duration-200"
        >
          Check out Pricing
          <ArrowUpRight size={18} strokeWidth={2} />
        </Link>
        <Link
          href="/contact"
          className="text-[16px] font-bold text-cream underline underline-offset-2 hover:opacity-90 transition-colors duration-200"
        >
          Have a question? Connect w/ us
        </Link>
      </div>
    </div>
  );
}
