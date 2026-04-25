"use client";

import { useState, useCallback, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "@/components/SplitText";
import { CardStack } from "@/components/projects/CardStack";
import type { CardStackItem } from "@/components/projects/CardStack";
import FilterTabs from "@/components/projects/FilterTabs";
import ProjectCard from "@/components/projects/ProjectCard";
import { PROJECTS } from "@/data/projects";
import type { Project } from "@/data/projects";

export default function ProjectsPage(): React.JSX.Element {
  const [activeFilter, setActiveFilter] = useState("all");
  const dotRef = useRef<HTMLSpanElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { y: -16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.15 }
      );
    }
    if (filterRef.current) {
      gsap.to(filterRef.current, { opacity: 1, duration: 0.5, delay: 0.5, ease: "power2.out" });
    }
    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.35 }
      );
    }
    if (dotRef.current) {
      gsap.to(dotRef.current, { opacity: 1, duration: 0.3, delay: 1.4 });
    }
  }, []);

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
    <main className="h-dvh overflow-hidden flex flex-col pt-32 pb-8 px-12">
      <div
        ref={headerRef}
        className="flex items-end justify-between flex-none mb-4"
        style={{ opacity: 0 }}
      >
        <h1 className="font-bold lowercase leading-[1.1]" style={{ fontSize: "clamp(28px, 3.2vw, 52px)" }}>
          <SplitText text="our projects" as="span" delay={0.8} className="text-[#f3e2c8]" />
          <span className="text-[#f35226]" style={{ opacity: 0, display: "inline" }} ref={dotRef}>.</span>
        </h1>
        <div ref={filterRef} style={{ opacity: 0 }}>
          <FilterTabs active={activeFilter} onChange={setActiveFilter} />
        </div>
      </div>
      <div ref={cardsRef} className="flex-1 min-h-0 overflow-visible" style={{ opacity: 0 }}>
        <CardStack
          items={cardItems}
          cardWidth={300}
          cardHeight={354}
          spreadDeg={20}
          showDots={false}
          loop={true}
          renderCard={(item) => {
            const project = filtered.find((p) => p.id === item.id)!;
            return <ProjectCard project={project} />;
          }}
        />
      </div>
    </main>
  );
}
