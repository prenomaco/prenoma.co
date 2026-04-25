"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Mail } from "lucide-react";
import ContactFormNew from "@/components/new/contact/ContactFormNew";
import SplitText from "@/components/new/SplitText";

const TRUST_SIGNALS = [
  "response within 24h",
  "nda on request",
  "based in india",
];

export default function ContactPage(): React.JSX.Element {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      leftRef.current,
      { x: -40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.2 }
    );
    gsap.fromTo(
      rightRef.current,
      { x: 40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.35 }
    );
  });

  return (
    <main className="h-dvh overflow-hidden w-full flex items-center px-16 pt-24 pb-8">
      <div className="w-full h-full flex gap-10 items-stretch">
        {/* LEFT */}
        <div
          ref={leftRef}
          className="basis-[52%] flex flex-col justify-center gap-6"
        >
          {/* Headline */}
          <h1
            className="font-bold text-[#f3e2c8] lowercase leading-[1.025]"
            style={{ fontSize: "clamp(40px, 5.2vw, 78px)" }}
          >
            <span className="block">
              <SplitText as="span" text="have a project" delay={0.4} className="inline" />
              <span className="text-[#f35226]">?</span>
            </span>
            <span className="block">
              <SplitText as="span" text="let's discuss" delay={0.85} className="inline" />
              <span className="text-[#f35226]">.</span>
            </span>
          </h1>

          {/* Sub-tagline */}
          <p
            className="font-bold text-[#dbcba9] lowercase"
            style={{ fontSize: "clamp(15px, 1.8vw, 24px)" }}
          >
            we&apos;re always open to work
          </p>

          {/* Email pill */}
          <a
            href="mailto:hello@prenoma.co"
            className="self-start bg-[#f35226] rounded-full px-6 py-3 inline-flex items-center gap-2 text-[15px] text-[#f3e2c8] font-bold lowercase"
            style={{ boxShadow: "0px 3px 14px rgba(243,82,38,0.55)" }}
          >
            <Mail size={15} strokeWidth={2.5} />
            hello@prenoma.co
          </a>

          {/* Trust signals */}
          <ul className="flex flex-col gap-1.5 mt-1">
            {TRUST_SIGNALS.map((signal) => (
              <li key={signal} className="flex items-center gap-2">
                <span className="text-[#f35226] text-[13px] leading-none select-none">·</span>
                <span className="text-[13px] text-[#dbcba9]/50 lowercase leading-none">
                  {signal}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT — glass card */}
        <div
          ref={rightRef}
          className="basis-[48%] flex items-center"
        >
          <div className="relative w-full h-full rounded-[16px] border border-white/[0.06] bg-[rgba(14,12,13,0.6)] backdrop-blur-xl p-10 flex flex-col overflow-hidden">
            {/* Inner top highlight */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
            <ContactFormNew />
          </div>
        </div>
      </div>
    </main>
  );
}
