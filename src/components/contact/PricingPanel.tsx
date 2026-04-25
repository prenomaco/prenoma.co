"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Check, CalendarDays } from "lucide-react";

const FEATURES = [
  "Single Page Interactive Website",
  "Figma + Code",
  "2 Revisions",
  "Custom Domain Setup",
  "Mobile Responsive",
  "SEO Optimised",
] as const;

export default function PricingPanel(): React.JSX.Element {
  const listRef = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      if (!listRef.current) return;
      const items = listRef.current.querySelectorAll<HTMLLIElement>("li");
      if (!items.length) return;

      gsap.fromTo(
        items,
        { opacity: 0, x: -12 },
        {
          opacity: 1,
          x: 0,
          duration: 0.45,
          stagger: 0.08,
          ease: "power2.out",
          delay: 0.7,
        }
      );
    },
    { scope: listRef }
  );

  return (
    <div className="rounded-[40px] bg-[rgba(22,20,21,0.2)] p-10 flex flex-col gap-6 h-full">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h2 className="text-[54px] font-bold text-[#f35226] leading-tight lowercase">
          get your best quote
        </h2>
        <p className="text-[24px] font-bold text-parchment lowercase">
          one time pricing, no secret charges
        </p>
      </div>

      {/* Feature checklist */}
      <ul ref={listRef} className="flex flex-col gap-3">
        {FEATURES.map((feature) => (
          <li key={feature} className="flex items-center gap-3">
            <Check size={18} className="text-ember shrink-0" />
            <span className="text-[18px] text-parchment lowercase">
              {feature.toLowerCase()}
            </span>
          </li>
        ))}
      </ul>

      {/* Schedule a call button */}
      <div className="flex flex-col gap-2 mt-auto">
        {/* TODO: replace with real booking URL */}
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#dbcba9] flex items-center gap-4 px-6 py-4 text-[#161415] text-[25px] font-normal rounded-[80px] lowercase"
        >
          <CalendarDays size={28} className="shrink-0" />
          <span className="w-px self-stretch bg-[#161415] opacity-40" />
          <span>schedule a call</span>
        </a>

        <p className="text-[14px] text-white opacity-60 lowercase text-center">
          powered by google calendar
        </p>
      </div>
    </div>
  );
}
