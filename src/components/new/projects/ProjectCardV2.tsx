"use client";

import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

interface ProjectCardV2Props {
  project: Project;
}

const AVATAR_COLORS = ["#f35226", "#dbcba9", "#f3e2c8", "#8b7355"] as const;

export default function ProjectCardV2({ project }: ProjectCardV2Props): React.JSX.Element {
  const handleViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(project.url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-2xl"
      style={
        project.image
          ? undefined
          : { background: "rgba(14,12,13,0.9)", backdropFilter: "blur(24px)" }
      }
    >
      {/* Image card: full-bleed photo */}
      {project.image && (
        <>
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* 3-stop gradient: transparent top → mid → near-opaque bottom */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(12,10,11,0.97) 0%, rgba(12,10,11,0.5) 50%, rgba(0,0,0,0) 100%)",
            }}
          />
        </>
      )}

      {/* No-image card: abstract depth layers */}
      {!project.image && (
        <>
          {/* Orange tint — top-right warmth */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 65% 50% at 90% 5%, rgba(243,82,38,0.12) 0%, rgba(243,82,38,0.04) 50%, transparent 100%)",
            }}
          />
          {/* Neutral dark — bottom-left depth */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 10% 95%, rgba(8,6,7,0.6) 0%, transparent 70%)",
            }}
          />
          {/* Abstract mark: large outlined circle, partially off-card top-right */}
          <div
            className="absolute rounded-full"
            style={{
              width: 220,
              height: 220,
              top: -80,
              right: -60,
              border: "1px solid rgba(243,82,38,0.10)",
              pointerEvents: "none",
            }}
          />
          {/* Smaller inner ring for depth */}
          <div
            className="absolute rounded-full"
            style={{
              width: 140,
              height: 140,
              top: -40,
              right: -20,
              border: "1px solid rgba(243,82,38,0.06)",
              pointerEvents: "none",
            }}
          />
        </>
      )}

      {/* Content layer */}
      <div className="absolute inset-0 flex flex-col p-5">
        {/* Spacer: pushes content to bottom */}
        <div className="flex-1" />

        {/* Bottom content section */}
        <div className="flex flex-col">
          {/* Type tag: monospace label, no pill */}
          <span
            className="font-mono uppercase tracking-[0.18em] text-[10px] mb-2"
            style={{ color: "rgba(243,82,38,0.70)" }}
          >
            {project.category}
          </span>

          {/* Title */}
          <p
            className="text-[20px] font-bold leading-tight line-clamp-2 lowercase"
            style={{ color: "#f3e2c8" }}
          >
            {project.title.toLowerCase()}
          </p>

          {/* Description */}
          <p
            className="text-[11px] leading-relaxed line-clamp-2 lowercase mt-1.5"
            style={{ color: "rgba(219,203,169,0.50)" }}
          >
            {project.description.toLowerCase()}
          </p>

          {/* Separator */}
          <div className="mt-3 mb-3 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />

          {/* Bottom row: avatar stack + icon button */}
          <div className="flex items-center justify-between">
            {/* Avatar stack */}
            <div className="flex items-center">
              {AVATAR_COLORS.map((color, i) => (
                <span
                  key={i}
                  className="inline-block rounded-full"
                  style={{
                    width: 18,
                    height: 18,
                    backgroundColor: color,
                    border: "2px solid #161415",
                    marginLeft: i === 0 ? 0 : -4,
                    flexShrink: 0,
                  }}
                />
              ))}
            </div>

            {/* Icon-only view button */}
            <button
              type="button"
              onClick={handleViewClick}
              className="flex items-center justify-center rounded-full"
              style={{
                width: 32,
                height: 32,
                background: "#f35226",
                color: "#f3e2c8",
                flexShrink: 0,
              }}
              aria-label={`View ${project.title}`}
            >
              <ArrowUpRight size={13} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
