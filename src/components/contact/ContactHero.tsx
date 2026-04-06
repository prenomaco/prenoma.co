"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactHero(): React.JSX.Element {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const bgBlobsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !titleRef.current) return;

    // Parallax on scroll
    gsap.to(heroRef.current, {
      y: window.innerHeight * 0.3,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    });

    // Title character stagger animation on load
    const title = titleRef.current;
    const originalText = title.textContent || "";
    title.innerHTML = originalText
      .split("")
      .map((char, i) => `<span class="inline-block" style="display: inline-block;">${char}</span>`)
      .join("");

    gsap.from(title.querySelectorAll("span"), {
      opacity: 0,
      y: 50,
      rotationZ: -10,
      duration: 0.8,
      stagger: 0.05,
      ease: "back.out(1.5)",
    });

    // Subtitle fade and slide
    gsap.from(subtitleRef.current, {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.8,
      ease: "power2.out",
    });

    // Animate background blobs
    if (bgBlobsRef.current) {
      const blobs = bgBlobsRef.current.querySelectorAll("div");
      gsap.to(blobs[0], {
        x: 20,
        y: -20,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(blobs[1], {
        x: -30,
        y: 30,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.2,
      });
    }
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[60vh] flex flex-col justify-center px-6 sm:px-10 lg:px-12 pt-32 pb-16 overflow-hidden"
    >
      {/* Animated background blur elements */}
      <div ref={bgBlobsRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-80 h-80 bg-ember/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-ember/10 rounded-full blur-3xl opacity-30" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto">
        {/* Title */}
        <h1
          ref={titleRef}
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
          let's create something amazing
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="
            text-[18px]
            sm:text-[20px]
            lg:text-[24px]
            text-parchment/80
            max-w-2xl
            leading-relaxed
          "
        >
          Whether you're scaling a startup or reinventing an enterprise,
          we build custom solutions that drive real results.
        </p>
      </div>
    </section>
  );
}

