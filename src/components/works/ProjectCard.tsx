"use client";

// Why: Accordion-style project card that expands/collapses on CLICK only
// Features: Collapsed = image background with vertical text, Expanded = full content visible

import { useRef, useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
  isExpanded: boolean;
  onExpand: () => void;
}

export default function ProjectCard({
  project,
  isExpanded,
  onExpand,
}: ProjectCardProps): React.JSX.Element {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useRef(false);

  // Why: Detect reduced motion preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      reducedMotion.current = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
    }
  }, []);

  // Why: Animate content opacity while CSS transition handles smooth flex/width changes
  useEffect(() => {
    if (!cardRef.current || reducedMotion.current) return;

    if (isExpanded) {
      // Expand: fade in content after flex transition starts
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          delay: 0.2, // Start after flex transition begins
        });
      }
    } else {
      // Collapse: fade out content immediately
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
        });
      }
    }
  }, [isExpanded]);

  return (
    <div
      ref={cardRef}
      className="project-card relative h-full overflow-hidden cursor-pointer group"
      onClick={onExpand}
      style={{
        flex: isExpanded ? 4 : 1,
        minWidth: 0,
      }}
    >
      {/* Background Image - Always visible */}
      <div className="absolute inset-0">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority
        />
        {/* Dark overlay - darker on collapsed */}
        <div 
          className={`absolute inset-0 transition-all duration-500 ${
            isExpanded 
              ? "bg-ink/40" 
              : "bg-ink/70 group-hover:bg-ink/60"
          }`}
        />
      </div>

      {/* Collapsed State: Vertical Text */}
      <div 
        className={`absolute inset-0 flex items-end justify-center pb-8 transition-opacity duration-300 ${
          isExpanded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <h3
          className="text-[16px] font-bold text-cream whitespace-nowrap tracking-wider uppercase"
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            transform: "rotate(180deg)",
          }}
        >
          {project.title}
        </h3>
      </div>

      {/* Expanded State: Full Content */}
      <div
        ref={contentRef}
        className={`absolute inset-0 flex flex-col justify-end p-6 ${
          isExpanded ? "" : "pointer-events-none"
        }`}
        style={{ opacity: isExpanded ? 1 : 0 }}
      >
        {/* Content card with glass effect */}
        <div className="bg-ink/80 backdrop-blur-sm p-5 border border-ghost/20">
          {/* Category tag */}
          <p className="text-[11px] text-ember uppercase tracking-widest mb-2">
            {project.category}
          </p>

          {/* Title */}
          <h3 className="text-[28px] font-bold text-cream leading-tight mb-2">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-[14px] text-parchment/90 leading-relaxed mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* CTA Button */}
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-2
              px-5 py-2.5
              bg-parchment text-ink text-[13px] font-semibold
              hover:bg-ember hover:text-cream
              transition-all duration-300
              uppercase tracking-wide
            "
            onClick={(e) => e.stopPropagation()}
            aria-label={`Visit ${project.title} website`}
          >
            Visit Site
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      {/* Subtle border between cards */}
      <div className="absolute right-0 top-0 bottom-0 w-px bg-ghost/20" />
    </div>
  );
}
