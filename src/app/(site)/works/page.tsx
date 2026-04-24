// Why: Interactive Works portfolio page - accordion gallery with global footer
// Features: Centered accordion, projects visible, full-height with footer

"use client";

import WorksHero from "@/components/works/WorksHero";
import ProjectGrid from "@/components/works/ProjectGrid";
import FooterEye from "@/components/layout/FooterEye";

export default function WorksPage(): React.JSX.Element {
  return (
    <div className="min-h-screen w-full bg-ink flex flex-col relative text-cream">
      {/* Hero Section */}
      <WorksHero />

      {/* Project Grid - Takes remaining space */}
      <ProjectGrid />

      {/* Decorative eye — behind footer */}
      <FooterEye />
    </div>
  );
}
