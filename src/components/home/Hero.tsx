"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Download } from "lucide-react";
import SplitText from "@/components/SplitText";

export default function Hero(): React.JSX.Element {
  const ctaRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const viewWorkRef = useRef<HTMLAnchorElement>(null);
  const contactRef = useRef<HTMLAnchorElement>(null);
  const downloadRef = useRef<HTMLAnchorElement>(null);
  const shineRef = useRef<HTMLSpanElement>(null);

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
    if (!shineRef.current) return;
    gsap.fromTo(
      shineRef.current,
      { x: "-100%" },
      { x: "250%", duration: 0.75, ease: "power1.inOut", delay: 2.6, repeat: -1, repeatDelay: 4 }
    );
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
    <section className="relative z-10 min-h-dvh flex flex-col justify-end pb-16 px-8 md:px-12 lg:pb-24 lg:px-16 xl:pb-28">
      <div ref={wordmarkRef} className="mb-4 flex items-baseline gap-0" style={{ opacity: 0 }}>
        <span className="font-bold lowercase leading-none tracking-[0.04em]" style={{ fontSize: "26px", color: "#f3e2c8" }}>prenoma</span>
        <span className="font-bold lowercase leading-none tracking-[0.04em]" style={{ fontSize: "26px", color: "#f35226" }}>.co</span>
      </div>

      <h1 className="mb-6">
        <SplitText
          text="crafting digital experiences that"
          as="span"
          delay={0.8}
          className="block font-bold lowercase leading-[1.05] text-[#f3e2c8]"
          style={{ fontSize: "clamp(40px, 5.2vw, 78px)" }}
        />
        <SplitText
          text="connect"
          as="span"
          delay={1.25}
          className="block font-bold lowercase leading-[1.05] text-[#f35226]"
          style={{ fontSize: "clamp(40px, 5.2vw, 78px)" }}
        />
      </h1>

      <div ref={taglineRef} className="flex flex-wrap items-center gap-2 mb-8">
        {["design", "development", "motion"].map((label, i) => (
          <span key={label} className="flex items-center gap-3">
            {i > 0 && (
              <span style={{ width: "20px", height: "1px", backgroundColor: "#f35226", display: "inline-block", marginBottom: "2px" }} />
            )}
            <span className="font-bold lowercase" style={{ fontSize: "clamp(14px, 1.4vw, 20px)", color: "#dbcba9" }}>
              {label}
            </span>
          </span>
        ))}
      </div>

      <div ref={ctaRef} className="flex flex-row flex-wrap items-center gap-4">
        <Link
          ref={viewWorkRef}
          href="/projects"
          className="relative overflow-hidden flex items-center gap-2.5 lowercase font-bold px-7 py-3 text-[15px] rounded-full"
          style={{ backgroundColor: "#e04b23", color: "#f3e2c8", boxShadow: "0px 3px 14px rgba(243,82,38,0.55)" }}
          onMouseEnter={() => { if (viewWorkRef.current) gsap.to(viewWorkRef.current, { scale: 1.04, y: -2, duration: 0.22, ease: "power2.out" }); }}
          onMouseLeave={() => { if (viewWorkRef.current) gsap.to(viewWorkRef.current, { scale: 1, y: 0, duration: 0.22, ease: "power2.out" }); }}
        >
          <span
            ref={shineRef}
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "40%",
              height: "100%",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)",
              transform: "skewX(-15deg)",
              pointerEvents: "none",
            }}
          />
          view our work
          <ArrowUpRight size={15} strokeWidth={2.5} />
        </Link>

        <Link
          ref={contactRef}
          href="/contact"
          className="flex items-center gap-2.5 lowercase font-bold rounded-full px-7 py-3 text-[15px]"
          style={{ color: "#dbcba9", border: "1.5px solid rgba(243,226,200,0.70)", backgroundColor: "rgba(243,226,200,0.04)" }}
          onMouseEnter={() => { if (contactRef.current) gsap.to(contactRef.current, { scale: 1.04, y: -2, duration: 0.22, ease: "power2.out" }); }}
          onMouseLeave={() => { if (contactRef.current) gsap.to(contactRef.current, { scale: 1, y: 0, duration: 0.22, ease: "power2.out" }); }}
        >
          get in touch
          <ArrowUpRight size={15} strokeWidth={2.5} />
        </Link>

        <a
          ref={downloadRef}
          href="#"
          className="flex items-center gap-2 lowercase font-normal text-[14px] ml-2"
          style={{ color: "#f3e2c8", opacity: 0.6 }}
          onMouseEnter={() => { if (downloadRef.current) gsap.to(downloadRef.current, { opacity: 1, duration: 0.2 }); }}
          onMouseLeave={() => { if (downloadRef.current) gsap.to(downloadRef.current, { opacity: 0.6, duration: 0.2 }); }}
        >
          <Download size={14} strokeWidth={2} />
          download showcase pdf
        </a>
      </div>
    </section>
  );
}
