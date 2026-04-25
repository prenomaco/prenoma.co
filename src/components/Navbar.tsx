"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
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
  const overlayRef = useRef<HTMLDivElement>(null);
  const topBarRef = useRef<HTMLSpanElement>(null);
  const bottomBarRef = useRef<HTMLSpanElement>(null);
  const scrollBgRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
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

  const openMenu = () => {
    if (!overlayRef.current) return;
    gsap.set(overlayRef.current, { display: "flex", y: "100%" });
    gsap.to(overlayRef.current, { y: "0%", duration: 0.55, ease: "power3.inOut" });
    if (topBarRef.current) {
      gsap.to(topBarRef.current, { rotate: 45, y: 7.5, duration: 0.3, ease: "power2.inOut" });
    }
    if (bottomBarRef.current) {
      gsap.to(bottomBarRef.current, { rotate: -45, y: -7.5, duration: 0.3, ease: "power2.inOut" });
    }
    setIsOpen(true);
  };

  const closeMenu = () => {
    if (!overlayRef.current) return;
    gsap.to(overlayRef.current, {
      y: "100%",
      duration: 0.45,
      ease: "power3.inOut",
      onComplete: () => {
        if (overlayRef.current) gsap.set(overlayRef.current, { display: "none" });
      },
    });
    if (topBarRef.current) {
      gsap.to(topBarRef.current, { rotate: 0, y: 0, duration: 0.3, ease: "power2.inOut" });
    }
    if (bottomBarRef.current) {
      gsap.to(bottomBarRef.current, { rotate: 0, y: 0, duration: 0.3, ease: "power2.inOut" });
    }
    setIsOpen(false);
  };

  const toggleMenu = () => {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  useEffect(() => {
    if (frosted) return;
    const onScroll = () => {
      if (!scrollBgRef.current) return;
      const scrolled = window.scrollY > 60;
      gsap.to(scrollBgRef.current, { opacity: scrolled ? 1 : 0, duration: 0.35, ease: "power2.out" });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [frosted]);

  // Close menu on route change
  useEffect(() => {
    if (isOpen) {
      closeMenu();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-[38px] left-0 right-0 z-50 flex items-center justify-between px-5 md:px-12 pt-6 pb-4"
        style={{
          opacity: 0,
          background: frosted ? "rgba(22,20,21,0.55)" : "transparent",
          backdropFilter: frosted ? "blur(14px)" : "none",
          WebkitBackdropFilter: frosted ? "blur(14px)" : "none",
          borderBottom: frosted ? "1px solid rgba(255,255,255,0.04)" : "none",
        }}
        aria-label="Site navigation"
      >
        <div
          ref={scrollBgRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[-1]"
          style={{
            opacity: 0,
            background: "rgba(22,20,21,0.82)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
          }}
        />
        <Link href="/" aria-label="prenoma.co home">
          <img
            src="/logo-eye.svg"
            alt="prenoma"
            style={{ height: "36px", width: "auto" }}
          />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-10">
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

        {/* Mobile hamburger button */}
        <button
          className="flex md:hidden flex-col justify-center items-center gap-0 w-8 h-8"
          onClick={toggleMenu}
          aria-label={isOpen ? "close menu" : "open menu"}
          aria-expanded={isOpen}
        >
          <span
            ref={topBarRef}
            style={{
              display: "block",
              width: "22px",
              height: "1.5px",
              backgroundColor: "#dbcba9",
              marginBottom: "6px",
              transformOrigin: "center",
            }}
          />
          <span
            ref={bottomBarRef}
            style={{
              display: "block",
              width: "22px",
              height: "1.5px",
              backgroundColor: "#dbcba9",
              transformOrigin: "center",
            }}
          />
        </button>
      </nav>

      {/* Full-screen overlay menu */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[49] flex flex-col justify-end px-8 pb-16 pt-24 h-full"
        style={{ display: "none", backgroundColor: "#161415" }}
        aria-hidden={!isOpen}
      >
        {NAV_ITEMS.map((item, index) => (
          <div key={item.label}>
            <Link
              href={item.href}
              className="block font-bold lowercase leading-[1.1]"
              style={{
                fontSize: "48px",
                color: pathname === item.href ? "#f35226" : "#f3e2c8",
              }}
              onClick={closeMenu}
            >
              {item.label}
            </Link>
            {index < NAV_ITEMS.length - 1 && (
              <div className="w-full h-px bg-white/10 my-4" />
            )}
          </div>
        ))}
        <p
          className="lowercase mt-8"
          style={{ fontSize: "13px", color: "rgba(219,203,169,0.5)" }}
        >
          prenoma.co — crafting digital experiences
        </p>
      </div>
    </>
  );
}
