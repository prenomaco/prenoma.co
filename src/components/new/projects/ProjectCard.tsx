"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

const AVATAR_COLORS = ["#f35226", "#dbcba9", "#f3e2c8", "#8b7355"];

export default function ProjectCard({ project }: ProjectCardProps): React.JSX.Element {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const card = cardRef.current;
      if (!card) return;

      const enter = () =>
        gsap.to(card, { scale: 1.02, duration: 0.3, ease: "power2.out" });
      const leave = () =>
        gsap.to(card, { scale: 1, duration: 0.3, ease: "power2.out" });

      card.addEventListener("mouseenter", enter);
      card.addEventListener("mouseleave", leave);

      return () => {
        card.removeEventListener("mouseenter", enter);
        card.removeEventListener("mouseleave", leave);
      };
    },
    { scope: cardRef }
  );

  const handleClick = () => {
    window.open(project.url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      className="relative rounded-[20px] overflow-hidden bg-[rgba(22,20,21,0.2)] w-full aspect-[407/479] flex flex-col cursor-pointer"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      aria-label={`view ${project.title} case study`}
    >
      {/* Image area — 52% height */}
      <div className="bg-[#d9d9d9] rounded-[20px] overflow-hidden" style={{ height: "52%" }}>
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : null}
      </div>

      {/* Info area — 48% height */}
      <div className="p-7 flex flex-col gap-2" style={{ height: "48%" }}>
        {/* Category badge */}
        <span className="bg-[#f35226] rounded-[80px] px-[10px] text-[18px] text-white self-start lowercase">
          {project.category.toLowerCase()}
        </span>

        {/* Title */}
        <p className="text-[24px] font-normal text-white lowercase leading-snug">
          {project.title.toLowerCase()}
        </p>

        {/* Description — single line truncate */}
        <p className="text-[18px] font-normal text-white lowercase truncate opacity-70">
          {project.description.toLowerCase()}
        </p>

        {/* Bottom row */}
        <div className="flex items-center justify-between mt-auto">
          {/* Avatar stack */}
          <div className="flex items-center">
            {AVATAR_COLORS.map((color, i) => (
              <span
                key={i}
                className="inline-block rounded-full border-2 border-[#161415]"
                style={{
                  width: 26,
                  height: 26,
                  backgroundColor: color,
                  marginLeft: i === 0 ? 0 : -4,
                }}
              />
            ))}
          </div>

          {/* View case study button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
            className="bg-[#f35226] rounded-[80px] px-[30px] py-[10px] text-[18px] text-white flex items-center gap-2 lowercase"
          >
            view case study
            <ArrowUpRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
