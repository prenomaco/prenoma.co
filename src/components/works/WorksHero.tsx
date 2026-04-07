// Why: Compact header section for Works page
// Features: Large title with good spacing, right-aligned inline CTAs

import Link from "next/link";

export default function WorksHero(): React.JSX.Element {
  return (
    <section className="pt-40 sm:pt-48 lg:pt-24 pb-4 px-6 sm:px-10 lg:px-12 flex-shrink-0">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-8 max-w-[1400px] mx-auto">
        {/* Left: Title */}
        <h1 className="text-[36px] sm:text-[44px] lg:text-[52px] font-bold text-cream lowercase leading-tight">
          projects @prenoma<span className="text-ember">.co</span>
        </h1>

        {/* Right: Inline CTAs (side-by-side) */}
        <div className="flex items-center gap-4 lg:gap-6 flex-wrap lg:flex-nowrap">
          {/* Connect CTA */}
          <Link
            href="/contact"
            className="text-[14px] lg:text-[16px] text-parchment hover:text-ember transition-colors duration-200 lowercase whitespace-nowrap">
            Have a question? Connect w/ us
          </Link>

          {/* Pricing CTA Button */}
          <Link
            href="/contact"
            className="
              px-5 lg:px-6 py-2.5
              bg-parchment text-ink text-[14px] font-medium
              hover:bg-ember hover:text-cream
              transition-colors duration-300
              lowercase
              whitespace-nowrap
              inline-flex items-center gap-2
            ">
            Check out Pricing →
          </Link>
        </div>
      </div>
    </section>
  );
}
