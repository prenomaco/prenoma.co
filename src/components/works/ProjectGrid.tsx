"use client";

// Why: Expanding accordion gallery - cards expand on CLICK only
// Features: Center card (Veloce) expanded by default, image backgrounds

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { PROJECTS } from "@/data/projects";
import ProjectCard from "./ProjectCard";

// Register useGSAP hook
gsap.registerPlugin(useGSAP as any);

export default function ProjectGrid(): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  // Center project (index 1 = Veloce) expanded by default
  const [expandedIndex, setExpandedIndex] = useState<number>(1);
  const reducedMotion = useRef(false);

  // Why: Detect reduced motion preference on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      reducedMotion.current = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
    }
  }, []);

  // Why: GSAP entrance animation
  useGSAP(
    () => {
      if (reducedMotion.current || !containerRef.current) return;

      const cards = containerRef.current.querySelectorAll(".project-card");
      if (cards.length === 0) return;

      // Entrance Animation: Staggered fade-in from bottom
      gsap.from(cards, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
      });
    },
    { scope: containerRef }
  );

  return (
    <div className="flex-1 flex items-start justify-center px-6 sm:px-10 lg:px-12 pt-2">
      <div
        ref={containerRef}
        className="
          horizontal-accordion
          flex
          w-full
          max-w-[1400px]
          h-[420px]
          overflow-hidden
        "
      >
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            isExpanded={expandedIndex === index}
            onExpand={() => setExpandedIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
