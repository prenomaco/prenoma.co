"use client";

import { ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

const MAX_BADGES = 4;

export default function ProjectCard({ project }: ProjectCardProps): React.JSX.Element {
  const router = useRouter();

  const handleViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.url.startsWith("/")) {
      router.push(project.url);
    } else {
      window.open(project.url, "_blank", "noopener,noreferrer");
    }
  };

  if (project.isPlaceholder) {
    return (
      <div
        className="relative h-full w-full overflow-hidden rounded-2xl cursor-pointer"
        style={{ background: "rgba(14,12,13,0.9)", backdropFilter: "blur(24px)" }}
        onClick={handleViewClick}
        role="link"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleViewClick(e as unknown as React.MouseEvent); }}
        aria-label="Contact us about a motion project"
      >
        {/* ember radial glow — centered */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(243,82,38,0.14) 0%, rgba(243,82,38,0.05) 50%, transparent 100%)",
          }}
        />
        {/* subtle outer ring */}
        <div
          className="absolute rounded-full"
          style={{ width: 260, height: 260, top: "50%", left: "50%", transform: "translate(-50%, -50%)", border: "1px solid rgba(243,82,38,0.08)", pointerEvents: "none" }}
        />
        <div
          className="absolute rounded-full"
          style={{ width: 160, height: 160, top: "50%", left: "50%", transform: "translate(-50%, -50%)", border: "1px solid rgba(243,82,38,0.05)", pointerEvents: "none" }}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <p
            className="font-bold italic leading-tight lowercase"
            style={{ fontSize: "18px", color: "#f3e2c8", letterSpacing: "-0.01em" }}
          >
            you could be here
          </p>
          <p
            className="font-mono uppercase tracking-[0.16em] mt-2"
            style={{ fontSize: "11px", color: "#f35226" }}
          >
            let&#39;s talk &rarr;
          </p>
        </div>
      </div>
    );
  }

  const badges = project.stack ?? [];
  const visibleBadges = badges.slice(0, MAX_BADGES);
  const overflow = badges.length - visibleBadges.length;

  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-2xl"
      style={
        project.image
          ? undefined
          : { background: "rgba(14,12,13,0.9)", backdropFilter: "blur(24px)" }
      }
    >
      {project.image && (
        <>
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ filter: "saturate(0.88) brightness(0.96)" }}
          />
          <div className="absolute inset-0" style={{ background: "rgba(12,10,11,0.10)" }} />
          {/* bottom gradient — only the lower 40% fades hard for text readability */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(12,10,11,1.0) 0%, rgba(12,10,11,0.90) 22%, rgba(12,10,11,0.55) 40%, rgba(12,10,11,0.10) 60%, rgba(0,0,0,0) 75%)",
            }}
          />
        </>
      )}

      {!project.image && (
        <>
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 65% 50% at 90% 5%, rgba(243,82,38,0.12) 0%, rgba(243,82,38,0.04) 50%, transparent 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 10% 95%, rgba(8,6,7,0.6) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute rounded-full"
            style={{ width: 220, height: 220, top: -80, right: -60, border: "1px solid rgba(243,82,38,0.10)", pointerEvents: "none" }}
          />
          <div
            className="absolute rounded-full"
            style={{ width: 140, height: 140, top: -40, right: -20, border: "1px solid rgba(243,82,38,0.06)", pointerEvents: "none" }}
          />
        </>
      )}

      <div className="absolute inset-0 flex flex-col p-5">
        <div className="flex-1" />
        <div className="flex flex-col">
          <span
            className="font-mono uppercase tracking-[0.14em] text-[9px] mb-2 px-2 py-0.5 rounded-full self-start"
            style={{
              background: "#f35226",
              color: "#f3e2c8",
            }}
          >
            {project.category}
          </span>
          <p
            className="text-[20px] font-bold leading-tight line-clamp-2 lowercase"
            style={{ color: "#f3e2c8" }}
          >
            {project.title.toLowerCase()}
          </p>
          <p
            className="text-[11px] leading-relaxed line-clamp-2 lowercase mt-1.5"
            style={{ color: "rgba(219,203,169,0.50)" }}
          >
            {project.description.toLowerCase()}
          </p>
          <div className="mt-3 mb-3 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
          <div className="flex items-center justify-between gap-2">
            {/* tech stack badges */}
            <div className="flex items-center gap-1 flex-wrap min-w-0">
              {visibleBadges.map((tech) => (
                <span
                  key={tech}
                  className="font-mono uppercase tracking-[0.10em] text-[9px] px-1.5 py-0.5 rounded-full whitespace-nowrap"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    color: "rgba(219,203,169,0.75)",
                  }}
                >
                  {tech}
                </span>
              ))}
              {overflow > 0 && (
                <span
                  className="font-mono uppercase tracking-[0.10em] text-[9px] px-1.5 py-0.5 rounded-full whitespace-nowrap"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    color: "rgba(219,203,169,0.75)",
                  }}
                >
                  +{overflow}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={handleViewClick}
              className="flex items-center justify-center rounded-full"
              style={{ width: 32, height: 32, background: "#f35226", color: "#f3e2c8", flexShrink: 0 }}
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
