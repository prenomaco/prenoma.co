"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function ContactHero(): React.JSX.Element {
  const heroRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const title = "let's create something amazing";

  useGSAP(
    () => {
      if (!heroRef.current) return;

      // Parallax on scroll
      gsap.to(heroRef.current, {
        y: 100, // Simpler fixed value for stability
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Character stagger animation
      const chars = heroRef.current.querySelectorAll(".char");
      gsap.from(chars, {
        opacity: 0,
        y: 50,
        rotationZ: -10,
        duration: 0.8,
        stagger: 0.03,
        ease: "back.out(1.5)",
      });

      // Subtitle fade
      gsap.from(".subtitle", {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.6,
        ease: "power2.out",
      });
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      className="relative min-h-[60vh] flex flex-col justify-center px-6 sm:px-10 lg:px-12 pt-24 pb-12 overflow-hidden"
    >
      {/* Animated background blur elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-80 h-80 bg-ember/20 rounded-full blur-3xl opacity-50 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-ember/10 rounded-full blur-3xl opacity-30" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto">
        <h1
          className="
            text-[56px]
            sm:text-[72px]
            lg:text-[96px]
            font-bold
            text-cream
            lowercase
            leading-tight
            tracking-tight
            mb-6
          "
        >
          {title.split("").map((char, i) => (
            <span key={i} className="char inline-block">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        <p className="subtitle text-[18px] sm:text-[20px] lg:text-[24px] text-parchment/80 max-w-2xl leading-relaxed">
          Whether you're scaling a startup or reinventing an enterprise, we
          build custom solutions that drive real results.
        </p>
      </div>
    </section>
  );
}

