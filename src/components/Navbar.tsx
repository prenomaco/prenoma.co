"use client";

import Link from "next/link";
import { useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { hoverEffectEnter, hoverEffectLeave } from "@/components/hoverEffects";

const FROSTED_ROUTES = ["/terms", "/privacy"];

const NAV_ITEMS = [
  { label: "home", href: "/" },
  { label: "projects", href: "/projects" },
  { label: "contact", href: "/contact" },
];

export default function Navbar(): React.JSX.Element {
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const frosted = FROSTED_ROUTES.includes(pathname);

  useGSAP(
    () => {
      if (!navRef.current) return;
      gsap.fromTo(
        navRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.3 }
      );
    },
    { scope: navRef }
  );

  return (
    <nav
      ref={navRef}
      className="fixed top-[38px] left-0 right-0 z-50 flex items-center justify-between px-12 pt-6 pb-4"
      style={{
        opacity: 0,
        background: frosted ? "rgba(22,20,21,0.55)" : "transparent",
        backdropFilter: frosted ? "blur(14px)" : "none",
        WebkitBackdropFilter: frosted ? "blur(14px)" : "none",
        borderBottom: frosted ? "1px solid rgba(255,255,255,0.04)" : "none",
      }}
      aria-label="Site navigation"
    >
      <Link href="/" aria-label="prenoma.co home">
        <img
          src="/logo-eye.svg"
          alt="prenoma"
          style={{ height: "36px", width: "auto" }}
        />
      </Link>

      <div className="flex items-center gap-10">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="font-bold lowercase"
            style={{ fontSize: "18px", color: "#dbcba9" }}
          >
            <div style={{ overflow: "hidden", lineHeight: "1.2", height: "1.2em" }}>
              <span
                className="flex flex-col"
                onMouseEnter={hoverEffectEnter}
                onMouseLeave={hoverEffectLeave}
              >
                <span>{item.label}</span>
                <span aria-hidden="true">{item.label}</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
}
