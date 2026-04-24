"use client";

import { useState, useCallback } from "react";
import ProjectsCarousel from "@/components/new/projects/ProjectsCarousel";
import FilterTabs from "@/components/new/projects/FilterTabs";
import { PROJECTS } from "@/data/projects";
import type { Project } from "@/data/projects";

export default function ProjectsPage(): React.JSX.Element {
  const [activeFilter, setActiveFilter] = useState("all");

  const getFiltered = useCallback((cat: string): Project[] => {
    if (cat === "all") return PROJECTS;
    return PROJECTS.filter(
      (p) =>
        p.category.toLowerCase().includes(cat) ||
        p.tags.some((t) => t.toLowerCase().includes(cat))
    );
  }, []);

  const filtered = getFiltered(activeFilter);

  return (
    <main className="h-dvh overflow-hidden flex flex-col pt-32 pb-8 px-16">
      <div className="flex items-center justify-between mb-10 flex-none">
        <h1 className="font-bold text-[#f3e2c8] lowercase leading-[1.025]" style={{ fontSize: "clamp(40px, 5.2vw, 78px)" }}>
          our projects<span className="text-[#f35226]">.</span>
        </h1>
        <FilterTabs active={activeFilter} onChange={setActiveFilter} />
      </div>
      <div className="flex-1 min-h-0 overflow-hidden">
        <ProjectsCarousel projects={filtered} />
      </div>
    </main>
  );
}
