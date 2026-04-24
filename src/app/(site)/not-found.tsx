import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function NotFound(): React.JSX.Element {
  return (
    // Why: min-h-dvh so the main tag fully occupies the screen.
    // Navbar and Footer are automatically provided by layout.tsx
    <div className="min-h-dvh flex flex-col items-center justify-center bg-ink px-4 text-center">
      <h1 className="text-[80px] sm:text-[130px] font-bold text-cream leading-none tracking-tighter">
        404
      </h1>

      {/* Target heading with exact phrasing and branding colors */}
      <h2 className="text-[20px] sm:text-[26px] font-bold text-parchment uppercase tracking-normal sm:tracking-wide mt-2 sm:mt-4 mb-8">
        Oops, lost are we?
      </h2>

      <div className="w-12 h-1 bg-ember mb-10 mx-auto" aria-hidden="true" />

      {/* Call to action reusing the same premium button style from HeroCopy */}
      <Link
        href="/"
        className="
          inline-flex items-center justify-center gap-2
          bg-cream text-ink font-normal rounded-none
          text-[15px] w-[180px] h-[44px]
          sm:text-[17px] sm:w-[220px]
          hover:opacity-90 transition-opacity duration-200
        "
      >
        Go back home
        <ArrowUpRight size={18} strokeWidth={2} />
      </Link>
    </div>
  );
}
