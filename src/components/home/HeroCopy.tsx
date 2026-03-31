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
    // Why: Staggered entry builds visual rhythm and premium feel.
    // Delay timeline 1.5s to wait for the LoadingScreen to fade out!
    const tl = gsap.timeline({ delay: 1.5 });
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
    <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
      {/* Logo wordmark */}
      {/* Why: 'prenoma' in cream, '.co' in ember — exact brand colours. */}
      <div ref={logoRef} className="mb-6 lg:mb-0 opacity-0 flex items-center h-[28px] sm:h-[35px]">
        <span className="text-[24px] sm:text-[28px] font-bold text-cream leading-none tracking-tight">
          prenoma
        </span>
        <span className="text-[24px] sm:text-[28px] font-bold text-ember leading-none tracking-tight">
          .co
        </span>
      </div>

      {/* ─── Horizontal ruler 1 — top edge of the headline ─── */}
      {/* Why: Hidden on mobile/tablet. Negative margin mirrors the parent's col px-4 offset at each breakpoint:
          -ml-4 negates the `px-4` on mobile, -ml-[105px] negates `lg:left-[105px]` on desktop.
          w-screen then stretches the line across the full viewport width.
          self-start avoids it being squashed by flex items-center. */}
      <div
        className="hidden lg:block self-start pointer-events-none -ml-4 lg:-ml-[105px] w-screen h-px mb-6 lg:mb-0"
        style={{ background: "var(--color-border)" }}
        aria-hidden="true"
      />

      {/* Hero headline — responsive font-size */}
      {/* Why: `text-balance` is ideal, but here we manually split for lg+.
          `whitespace-nowrap` is REMOVED for mobile — it only makes sense on lg+. */}
      <h1
        ref={headlineRef}
        className="
          text-[32px] leading-tight mb-6 lg:mb-0
          sm:text-[42px]
          md:text-[48px]
          lg:text-[50px] lg:whitespace-nowrap lg:leading-normal
          font-bold text-cream uppercase opacity-0
        "
      >
        WE MAKE STUNNING WEBSITES
      </h1>

      {/* Tagline — responsive font-size and spacing */}
      <div
        ref={taglineRef}
        className="flex items-center gap-[12px] sm:gap-[15px] mb-8 lg:mb-0 lg:mt-0 opacity-0"
      >
        <span className="text-[18px] sm:text-[20px] lg:text-[23px] font-bold text-parchment leading-normal">
          affordable
        </span>
        <div className="w-[6px] h-[6px] sm:w-[8px] sm:h-[8px] rounded-full bg-ember shrink-0" />
        <span className="text-[18px] sm:text-[20px] lg:text-[23px] font-bold text-parchment leading-normal">
          fast
        </span>
        <div className="w-[6px] h-[6px] sm:w-[8px] sm:h-[8px] rounded-full bg-ember shrink-0" />
        <span className="text-[18px] sm:text-[20px] lg:text-[23px] font-bold text-parchment leading-normal">
          beautiful
        </span>
      </div>

      {/* CTA Row — stack on mobile, row on sm+ */}
      <div ref={ctaRef} className="flex flex-col sm:flex-row items-center gap-6 sm:gap-[30px] opacity-0 lg:mt-5">
        <Link
          href="/pricing"
          className="
            inline-flex items-center justify-center gap-2
            bg-parchment text-ink font-normal rounded-none
            text-[16px] w-[200px] h-[46px]
            sm:text-[19px] sm:w-[240px]
            hover:opacity-90 transition-opacity duration-200
          "
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
