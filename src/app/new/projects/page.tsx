"use client";

import { useState, useCallback } from "react";
import SplitText from "@/components/new/SplitText";
import { CardStack } from "@/components/new/projects/CardStack";
import type { CardStackItem } from "@/components/new/projects/CardStack";
import FilterTabs from "@/components/new/projects/FilterTabs";
import ProjectCardV2 from "@/components/new/projects/ProjectCardV2";
import { PROJECTS } from "@/data/projects";
import type { Project } from "@/data/projects";

export default function ProjectsPage(): React.JSX.Element {
  const [activeFilter, setActiveFilter] = useState("all");

  const getFiltered = useCallback((cat: string): Project[] => {
    if (cat === "all") return PROJECTS;
    return PROJECTS.filter((p) => p.category.toLowerCase() === cat);
  }, []);

  const filtered = getFiltered(activeFilter);

  const cardItems: CardStackItem[] = filtered.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    imageSrc: p.image,
    href: p.url,
    tag: p.category,
  }));

  return (
    <main className="h-dvh overflow-hidden flex flex-col pt-36 pb-8 px-16">
      <div className="flex items-center justify-between flex-none mb-6">
        <h1 className="font-bold lowercase leading-[1.1]" style={{ fontSize: "clamp(28px, 3.2vw, 52px)" }}>
          <SplitText
            text="our projects"
            as="span"
            delay={0.8}
            className="text-[#f3e2c8]"
          />
          <span className="text-[#f35226]">.</span>
        </h1>
        <FilterTabs active={activeFilter} onChange={setActiveFilter} />
      </div>
      <div className="flex-1 min-h-0 overflow-visible">
        <CardStack
          items={cardItems}
          cardWidth={300}
          cardHeight={354}
          spreadDeg={20}
          showDots={false}
          loop={true}
          renderCard={(item) => {
            const project = filtered.find((p) => p.id === item.id)!;
            return <ProjectCardV2 project={project} />;
          }}
        />
      </div>
    </main>
  );
}
