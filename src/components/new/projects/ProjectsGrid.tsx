"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { PROJECTS } from "@/data/projects";
import FilterTabs from "./FilterTabs";
import ProjectCard from "./ProjectCard";

export default function ProjectsGrid(): React.JSX.Element {
  const [activeFilter, setActiveFilter] = useState("all");
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered =
    activeFilter === "all"
      ? PROJECTS
      : PROJECTS.filter((p) =>
          p.category.toLowerCase().includes(activeFilter)
        );

  const handleFilterChange = (cat: string) => {
    const grid = gridRef.current;
    if (!grid) {
      setActiveFilter(cat);
      return;
    }

    const cards = grid.querySelectorAll<HTMLElement>(".project-card-item");

    gsap.to(cards, {
      opacity: 0,
      y: 10,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        setActiveFilter(cat);
      },
    });
  };

  // Fade in whenever filtered list updates
  useGSAP(
    () => {
      const grid = gridRef.current;
      if (!grid) return;
      const cards = grid.querySelectorAll<HTMLElement>(".project-card-item");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out", stagger: 0.05 }
      );
    },
    { dependencies: [activeFilter], scope: gridRef }
  );

  return (
    <div className="flex flex-col gap-10">
      <FilterTabs active={activeFilter} onChange={handleFilterChange} />
      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[49px]"
      >
        {filtered.map((project) => (
          <div key={project.id} className="project-card-item">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
  );
}
