"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import type { Project } from "@/data/projects";

interface ProjectCardV2Props {
  project: Project;
}

const AVATAR_COLORS = ["#f35226", "#dbcba9", "#f3e2c8", "#8b7355"] as const;

export default function ProjectCardV2({ project }: ProjectCardV2Props): React.JSX.Element {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, { scale: 1.02, duration: 0.35, ease: "power2.out" });
  };

  const handleLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, { scale: 1, duration: 0.6, ease: "power3.out" });
  };

  const handleClick = () => {
    window.open(project.url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      role="button"
      tabIndex={0}
      aria-label={`view ${project.title} case study`}
      className="relative w-full cursor-pointer overflow-hidden rounded-[20px] border border-white/10"
      style={{
        aspectRatio: "407 / 479",
        background: project.image ? undefined : "rgba(22,20,21,0.2)",
        backdropFilter: project.image ? undefined : "blur(12px)",
      }}
    >
      {/* Full-bleed image background */}
      {project.image && (
        <>
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Gradient overlay — dark at bottom for text legibility, subtle at top */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.08) 100%)" }} />
        </>
      )}

      {/* Glass fallback background (no image) */}
      {!project.image && (
        <div className="absolute inset-0 bg-[rgba(22,20,21,0.2)]" />
      )}

      <div className="absolute inset-0 flex flex-col justify-end p-7 gap-3">
        <span className="self-start bg-[#f35226] rounded-full px-3 py-0.5 text-[14px] text-[#f3e2c8] lowercase font-normal">
          {project.category.toLowerCase()}
        </span>
        <p className="text-[22px] font-medium text-[#f3e2c8] leading-snug lowercase">
          {project.title.toLowerCase()}
        </p>
        <p className="text-[15px] text-[#dbcba9]/70 lowercase leading-relaxed line-clamp-2">
          {project.description.toLowerCase()}
        </p>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center">
            {AVATAR_COLORS.map((color, i) => (
              <span
                key={i}
                className="inline-block rounded-full border-2 border-[#161415]"
                style={{ width: 24, height: 24, backgroundColor: color, marginLeft: i === 0 ? 0 : -6, flexShrink: 0 }}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); handleClick(); }}
            className="bg-[#f35226] rounded-full px-4 py-2 text-[14px] text-[#f3e2c8] flex items-center gap-1.5 lowercase font-medium"
          >
            view case study
            <ArrowUpRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
