"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Mail } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import SplitText from "@/components/SplitText";

export default function ContactPage(): React.JSX.Element {
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const pillRef = useRef<HTMLAnchorElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const cardInnerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(taglineRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 1.1 });
    gsap.fromTo(pillRef.current, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.45, ease: "power2.out", delay: 1.3 });
    gsap.fromTo(statusRef.current, { opacity: 0, x: -8 }, { opacity: 1, x: 0, duration: 0.4, ease: "power2.out", delay: 1.5 });
    gsap.fromTo(rightRef.current, { opacity: 0, scale: 0.97, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.35 });

    if (cardInnerRef.current) {
      gsap.fromTo(
        cardInnerRef.current,
        { borderColor: "rgba(255,255,255,0.06)" },
        { borderColor: "rgba(255,255,255,0.12)", duration: 0.6, ease: "power2.inOut", delay: 1.15, yoyo: true, repeat: 1 }
      );
    }
  });

  return (
    <main className="h-dvh overflow-hidden w-full flex items-center px-12 pt-36 pb-24">
      <div className="w-full h-full flex gap-10 items-stretch">
        {/* LEFT */}
        <div className="basis-[52%] flex flex-col justify-center pb-4 gap-5">
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

          <p
            ref={taglineRef}
            className="font-bold text-[#dbcba9] lowercase"
            style={{ fontSize: "clamp(15px, 1.8vw, 24px)", opacity: 0 }}
          >
            we&apos;re always open to work
          </p>

          <a
            ref={pillRef}
            href="mailto:hello@prenoma.co"
            className="self-start mt-1 bg-[#f35226] rounded-full px-6 py-3 inline-flex items-center gap-2 text-[15px] text-[#f3e2c8] font-bold lowercase"
            style={{ boxShadow: "0px 3px 14px rgba(243,82,38,0.55)", opacity: 0 }}
          >
            <Mail size={15} strokeWidth={2.5} />
            hello@prenoma.co
          </a>

          {/* Pulse status indicator */}
          <div ref={statusRef} className="flex items-center gap-2.5 mt-3" style={{ opacity: 0 }}>
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ backgroundColor: "#f35226" }} />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ backgroundColor: "#f35226" }} />
            </span>
            <span className="text-[13px] text-[#dbcba9]/65 lowercase leading-none">responds within 24–48h</span>
          </div>
        </div>

        {/* RIGHT — glass card */}
        <div ref={rightRef} className="basis-[48%] flex items-stretch" style={{ opacity: 0 }}>
          <div
            ref={cardInnerRef}
            className="relative w-full h-full rounded-[16px] border border-white/[0.06] bg-[rgba(14,12,13,0.6)] backdrop-blur-xl px-10 pt-7 pb-10 flex flex-col overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
