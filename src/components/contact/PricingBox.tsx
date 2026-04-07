"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function PricingBox(): React.JSX.Element {
  const boxRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!boxRef.current) return;

      // Entrance animation
      gsap.from(boxRef.current, {
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: "power3.out",
      });

      // Floating animation
      gsap.to(boxRef.current, {
        y: 10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Glow pulse effect
      gsap.to(boxRef.current, {
        boxShadow:
          "0 0 30px rgba(232, 65, 24, 0.3), 0 0 60px rgba(232, 65, 24, 0.1)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: boxRef }
  );

  return (
    <div
      ref={boxRef}
      className="
        relative
        w-full
        max-w-md
        p-6
        backdrop-blur-xl
        bg-gradient-to-br
        from-ember/25
        to-ember/5
        border
        border-ember/50
        shadow-2xl
        transition-all
        duration-300
        hover:border-ember/70
      "
    >
      <div className="space-y-3">
        {/* Headline */}
        <h3 className="text-[24px] font-bold text-cream lowercase leading-tight">
          get your best quote
        </h3>

        {/* Subheading */}
        <p className="text-ember font-bold text-[13px] tracking-wider lowercase">
          no fixed pricing
        </p>

        {/* Description */}
        <p className="text-parchment text-[12px] leading-relaxed lowercase">
          every project is unique. we tailor pricing to your company's needs—whether you're a solo founder or an enterprise.
        </p>

        {/* Features */}
        <div className="pt-3 space-y-2 border-t border-white/10">
          {[
            "custom scoped to your vision",
            "transparent, no hidden fees",
            "flexible engagement models",
            "scalable solutions",
          ].map((feature, index) => (
            <div key={index} className="flex items-start gap-2">
              <span className="text-ember font-bold text-sm mt-0.5">✓</span>
              <span className="text-parchment/80 text-[11px] lowercase">{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <p className="text-[11px] text-parchment/60 italic pt-2 lowercase">
          fill out the form to request a quote →
        </p>
      </div>

      {/* Decorative blur element */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-ember/20 rounded-full blur-3xl opacity-50 pointer-events-none" />
    </div>
  );
}
