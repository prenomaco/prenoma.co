"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";

export default function HeroCopy(): React.JSX.Element {
  const logoRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLAnchorElement>(null);
  // Only the text group rotates — arrow stays static
  const rotatingGroupRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 1.5 });
    tl.fromTo(
      logoRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      0.2
    )
      .fromTo(
        headlineRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        0.4
      )
      .fromTo(
        taglineRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out" },
        0.7
      )
      .fromTo(
        badgeRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" },
        0.9
      );

    // ── Rotate the text <g> around SVG center (80, 80) ──
    // svgOrigin uses absolute SVG coordinate space — must match viewBox center exactly.
    if (rotatingGroupRef.current) {
      gsap.to(rotatingGroupRef.current, {
        rotation: 360,
        duration: 14,
        repeat: -1,
        ease: "linear",
        svgOrigin: "80 80",
      });
    }
  }, []);

  return (
    <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
      {/* Logo wordmark */}
      <div ref={logoRef} data-logo-target className="mb-4 sm:mb-6 lg:mb-2 opacity-0 flex items-center justify-center lg:justify-start">
        <span className="text-[26px] sm:text-[30px] lg:text-[34px] font-bold text-cream leading-none tracking-tight">
          prenoma
        </span>
        <span className="text-[26px] sm:text-[30px] lg:text-[34px] font-bold text-ember leading-none tracking-tight">
          .co
        </span>
      </div>

      {/* Hero headline */}
      <h1
        ref={headlineRef}
        className="
          text-[30px] leading-[1.05] mb-5
          sm:text-[40px] sm:mb-8
          lg:text-[66px] lg:whitespace-nowrap lg:mb-5
          font-bold text-cream lowercase opacity-0
        "
      >
        we convert your websites<br />
        into ones that click
      </h1>

      {/* Tagline */}
      <div
        ref={taglineRef}
        data-tagline-target
        className="flex items-center gap-[12px] sm:gap-[16px] opacity-0 justify-center lg:justify-start"
      >
        <span className="text-[15px] sm:text-[17px] lg:text-[20px] font-normal text-parchment leading-normal lowercase">
          interactive
        </span>
        <div className="w-[5px] h-[5px] sm:w-[6px] sm:h-[6px] rounded-full bg-ember shrink-0" />
        <span className="text-[15px] sm:text-[17px] lg:text-[20px] font-normal text-parchment leading-normal lowercase">
          stunning
        </span>
        <div className="w-[5px] h-[5px] sm:w-[6px] sm:h-[6px] rounded-full bg-ember shrink-0" />
        <span className="text-[15px] sm:text-[17px] lg:text-[20px] font-normal text-parchment leading-normal lowercase">
          profitable
        </span>
      </div>

      {/*
        ════════════════════════════════════════════════════════════
        Circular CTA badge — inline on mobile, fixed bottom-right on desktop
        ════════════════════════════════════════════════════════════
      */}
      <Link
        ref={badgeRef}
        href="/contact"
        className="
          relative mt-8 z-30 opacity-0
          sm:mt-12
          lg:fixed lg:mt-0 lg:bottom-[170px] lg:right-[100px] 
          group
        "
        aria-label="Contact us for pricing"
      >
        <div className="relative w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] lg:w-[160px] lg:h-[160px]">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 160 160"
            aria-hidden="true"
          >
            <defs>
              {/* Circular text path — radius 58 */}
              <path
                id="badge-text-path"
                d="M 80,80 m -58,0 a 58,58 0 1,1 116,0 a 58,58 0 1,1 -116,0"
              />
            </defs>

            {/* ── Thicker outer border ring — radius 78 (more gap from edge) ── */}
            <circle
              cx="80"
              cy="80"
              r="78"
              fill="none"
              stroke="var(--color-parchment)"
              strokeOpacity="0.8"
              strokeWidth="2.5"
            />

            {/* ── ROTATING group: pivots at (80,80) ── */}
            <g ref={rotatingGroupRef}>
              <text
                style={{
                  fontSize: "13px",
                  fontWeight: "700",
                  fill: "var(--color-parchment)",
                  fontFamily: "var(--font-sans)",
                  letterSpacing: "0.5px",
                  textTransform: "lowercase",
                } as React.CSSProperties}
              >
                <textPath
                  href="#badge-text-path"
                  startOffset="0%"
                  textLength={2 * Math.PI * 58}
                  lengthAdjust="spacing"
                >
                  {"contact us for pricing • contact us for pricing •\u00A0"}
                </textPath>
              </text>
            </g>

            {/*
              ── STATIC arrow: larger (64-96 span) and bold (5px) ──
              Centered exactly at (80,80)
            */}
            <g
              className="transition-transform duration-300 ease-out group-hover:scale-125 origin-center"
              stroke="var(--color-ember)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            >
              <line x1="64" y1="96" x2="96" y2="64" />
              <line x1="76" y1="64" x2="96" y2="64" />
              <line x1="96" y1="64" x2="96" y2="84" />
            </g>
          </svg>
        </div>
      </Link>
    </div>
  );
}
