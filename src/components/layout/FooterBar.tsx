"use client";

import { useEffect, useState } from "react";

function formatTimestamp(date: Date): string {
  // Why: Format matches Figma design exactly: DD-MM-YYYY HH:MM AM/PM IST
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const h12 = String(hours % 12 || 12).padStart(2, "0");
  return `${dd}-${mm}-${yyyy} ${h12}:${minutes} ${ampm} IST`;
}

export default function FooterBar(): React.JSX.Element {
  const [timestamp, setTimestamp] = useState<string>("");

  useEffect(() => {
    // Why: Client-only to avoid SSR hydration mismatch on live timestamp
    setTimestamp(formatTimestamp(new Date()));
    const interval = setInterval(() => {
      setTimestamp(formatTimestamp(new Date()));
    }, 60_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer
      className="
        fixed bottom-0 left-0 right-0 z-40
        flex items-center justify-between
        px-4 py-3
        sm:px-8 sm:py-4
        lg:pl-[105px] lg:pr-[105px] lg:py-5
        text-xs font-normal tracking-wide text-parchment
        pointer-events-none font-sans
      "
    >
      {/* Left: email + live timestamp */}
      <span className="pointer-events-auto flex items-center flex-wrap gap-x-1">
        {/* Hide email on very small screens to prevent overflow */}
        <span className="hidden sm:inline">hello@prenoma.co</span>
        <span className="text-ember mx-0.5 hidden sm:inline">•</span>
        <span>{timestamp}</span>
      </span>

      {/* Right: legal + copyright */}
      <span className="flex items-center gap-1 pointer-events-auto">
        <a
          href="/terms"
          className="hover:text-cream transition-colors duration-200"
        >
          Terms
        </a>
        <span className="text-ember mx-1">•</span>
        <a
          href="/privacy"
          className="hover:text-cream transition-colors duration-200"
        >
          {/* Abbreviate on mobile */}
          <span className="hidden sm:inline">Privacy Policy</span>
          <span className="sm:hidden">Privacy</span>
        </a>
        {/* Why: "2K26" is intentional brand styling — NOT "2026" */}
        <span className="ml-3 sm:ml-6 hidden sm:inline">©2K26 prenoma.co</span>
      </span>
    </footer>
  );
}
