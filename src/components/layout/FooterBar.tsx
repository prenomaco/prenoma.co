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
        pl-[105px] pr-[105px] py-5
        text-xs font-normal tracking-wide text-parchment
        pointer-events-none font-mono
      "
    >
      {/* Left: email + live timestamp */}
      <span className="pointer-events-auto">
        hello@prenoma.co
        <span className="text-ember mx-1">•</span>
        {timestamp}
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
          Privacy Policy
        </a>
        {/* Why: "2K26" is intentional brand styling — NOT "2026" */}
        <span className="ml-6">©2K26 prenoma.co</span>
      </span>
    </footer>
  );
}
