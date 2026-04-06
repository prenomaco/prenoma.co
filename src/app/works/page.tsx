// Why: Interactive Works portfolio page - fixed viewport, no vertical scroll
// Features: Centered accordion, eye logo at bottom (cut off), full-height layout

"use client";

import { useEffect } from "react";
import WorksHero from "@/components/works/WorksHero";
import ProjectGrid from "@/components/works/ProjectGrid";
import Image from "next/image";

export default function WorksPage(): React.JSX.Element {
  // Why: Hide the global fixed footer and disable vertical scroll on this page
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (footer) {
      footer.style.display = "none";
    }
    
    // Disable vertical scrolling on works page
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    
    return () => {
      if (footer) {
        footer.style.display = "";
      }
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <main className="h-screen w-screen overflow-hidden bg-ink flex flex-col relative">
      {/* Hero Section */}
      <WorksHero />
      
      {/* Project Grid - Takes remaining space */}
      <ProjectGrid />
      
      {/* Footer Eye - Cut off at bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[60%] pointer-events-none">
        <Image
          src="/footer-eye.png"
          alt=""
          width={300}
          height={300}
          className="opacity-25 w-auto h-auto"
          priority={false}
          aria-hidden="true"
        />
      </div>
    </main>
  );
}
