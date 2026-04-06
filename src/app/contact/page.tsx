"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import ContactHero from "@/components/contact/ContactHero";
import PricingBox from "@/components/contact/PricingBox";
import ContactForm from "@/components/contact/ContactForm";

export default function ContactPage(): React.JSX.Element {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    // Animate main content in
    gsap.from(contentRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
    });
  }, []);

  return (
    <main className="h-screen w-screen bg-ink overflow-hidden flex flex-col">
      {/* Main content - single screen, no scroll */}
      <div
        ref={contentRef}
        className="flex-1 flex items-center justify-center px-6 sm:px-8 lg:px-12 pt-20 pb-4"
      >
        {/* Background animated elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-ember/15 rounded-full blur-3xl opacity-40 animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-ember/10 rounded-full blur-3xl opacity-30" />
        </div>

        {/* Content container */}
        <div className="relative z-10 w-full max-w-7xl">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-[42px] sm:text-[56px] lg:text-[72px] font-bold text-cream lowercase leading-tight tracking-tight mb-3">
              Let's build something amazing
            </h1>
            <p className="text-[14px] sm:text-[16px] text-parchment/70">
              Get a custom quote tailored to your vision
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start max-w-5xl mx-auto">
            {/* Left: Pricing Box */}
            <div className="flex justify-center lg:justify-end">
              <PricingBox />
            </div>

            {/* Right: Contact Form */}
            <div className="flex justify-center lg:justify-start">
              <ContactForm />
            </div>
          </div>

          {/* Email CTA */}
          <div className="text-center mt-6">
            <p className="text-parchment/50 text-[12px] mb-2">or email us at</p>
            <a
              href="mailto:hello@prenoma.co"
              className="text-[18px] sm:text-[22px] font-bold text-ember hover:text-cream transition-colors duration-300 lowercase"
            >
              hello@prenoma.co
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
