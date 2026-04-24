"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Download } from "lucide-react";
import SplitText from "@/components/new/SplitText";

export default function HeroNew(): React.JSX.Element {
  const ctaRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!wordmarkRef.current) return;
    gsap.fromTo(
      wordmarkRef.current,
      { opacity: 0, x: -16 },
      { opacity: 1, x: 0, duration: 0.5, ease: "power2.out", delay: 0.1 }
    );
  });

  useGSAP(() => {
    if (!ctaRef.current) return;
    gsap.set(ctaRef.current, { opacity: 0, y: 12 });
    gsap.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 1.8 });
  });

  useGSAP(() => {
    if (!taglineRef.current) return;
    const children = taglineRef.current.children;
    if (!children.length) return;
    gsap.fromTo(
      children,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.12, delay: 1.6 }
    );
  });

  return (
    <section className="relative z-10 min-h-dvh flex flex-col justify-end pb-16 px-8 lg:pb-24 lg:px-16">
      {/* prenoma.co wordmark above headline */}
      <div ref={wordmarkRef} className="mb-3 flex items-baseline gap-0" style={{ opacity: 0 }}>
        <span className="font-bold lowercase leading-none" style={{ fontSize: "26px", color: "#f3e2c8" }}>prenoma</span>
        <span className="font-bold lowercase leading-none" style={{ fontSize: "26px", color: "#f35226" }}>.co</span>
      </div>

      {/* Headline */}
      <h1 className="mb-5">
        <SplitText
          text="crafting digital experiences that"
          as="span"
          delay={0.8}
          className="block font-bold lowercase leading-[1.1] text-[#f3e2c8]"
          style={{ fontSize: "clamp(40px, 5.2vw, 78px)" }}
        />
        <SplitText
          text="connect"
          as="span"
          delay={1.25}
          className="block font-bold lowercase leading-[1.1] text-[#f35226]"
          style={{ fontSize: "clamp(40px, 5.2vw, 78px)" }}
        />
      </h1>

      {/* Tagline row */}
      <div ref={taglineRef} className="flex flex-wrap items-center gap-3 mb-7">
        {["design", "development", "motion"].map((label, i) => (
          <span key={label} className="flex items-center gap-3">
            {i > 0 && (
              <div className="rounded-full shrink-0" style={{ width: "8px", height: "8px", backgroundColor: "#f35226" }} />
            )}
            <span className="font-bold lowercase" style={{ fontSize: "clamp(15px, 1.8vw, 24px)", color: "#dbcba9" }}>
              {label}
            </span>
          </span>
        ))}
      </div>

      {/* CTA row */}
      <div ref={ctaRef} className="flex flex-row flex-wrap items-center gap-3">
        <Link
          href="/new/projects"
          className="flex items-center gap-2 lowercase font-bold px-6 py-3 text-[15px] rounded-full"
          style={{ backgroundColor: "#e04b23", color: "#f3e2c8", boxShadow: "0px 3px 14px rgba(243,82,38,0.55)" }}
        >
          view our work
          <ArrowUpRight size={15} strokeWidth={2.5} />
        </Link>

        <Link
          href="/new/contact"
          className="flex items-center gap-2 lowercase font-bold border border-[#f3e2c8] rounded-full px-6 py-3 text-[15px]"
          style={{ color: "#dbcba9" }}
        >
          get in touch
          <ArrowUpRight size={15} strokeWidth={2.5} />
        </Link>

        <a
          href="#"
          className="flex items-center gap-2 underline lowercase font-normal text-[15px]"
          style={{ color: "#f3e2c8" }}
        >
          <Download size={14} strokeWidth={2} />
          download showcase pdf
        </a>
      </div>
    </section>
  );
}
