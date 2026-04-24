"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const NAV_ITEMS = [
  { label: "home", href: "/new" },
  { label: "projects", href: "/new/projects" },
  { label: "contact", href: "/new/contact" },
];

export default function NewNavbar(): React.JSX.Element {
  const navRef = useRef<HTMLElement>(null);

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
      className="fixed top-[38px] left-0 right-0 z-50 flex items-center justify-between px-12 pt-10"
      style={{ opacity: 0 }}
      aria-label="New site navigation"
    >
      {/* Logo — eye icon only */}
      <Link href="/new" aria-label="prenoma.co home">
        <img
          src="/logo-eye.svg"
          alt="prenoma"
          style={{ height: "36px", width: "auto" }}
        />
      </Link>

      {/* Nav links */}
      <div className="flex items-center gap-10">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="font-bold lowercase transition-colors duration-200"
            style={{ fontSize: "18px", color: "#dbcba9" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "#f35226";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "#dbcba9";
            }}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
