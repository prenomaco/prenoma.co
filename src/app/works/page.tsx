// Why: Interactive Works portfolio page - accordion gallery with global footer
// Features: Centered accordion, projects visible, full-height with footer

"use client";

import WorksHero from "@/components/works/WorksHero";
import ProjectGrid from "@/components/works/ProjectGrid";

export default function WorksPage(): React.JSX.Element {
  return (
    <main className="min-h-screen w-screen bg-ink flex flex-col relative">
      {/* Hero Section */}
      <WorksHero />
      
      {/* Project Grid - Takes remaining space */}
      <ProjectGrid />
    </main>
  );
}
