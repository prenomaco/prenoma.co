import React from "react";

const ITEM = "open to work";
const DIVIDER = "✦";

const track = Array.from({ length: 10 }, (_, i) => (
  <span key={i} className="inline-flex items-center gap-4 px-4">
    <span>{ITEM}</span>
    <span style={{ color: "#f35226" }}>{DIVIDER}</span>
  </span>
));

export default function MarqueeBanner(): React.JSX.Element {
  return (
    <>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee 25s linear infinite;
        }
        @keyframes bannerEntry {
          from { transform: translateY(-100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        .marquee-banner {
          animation: bannerEntry 0.55s cubic-bezier(0.22,1,0.36,1) 0.1s both;
        }
      `}</style>

      <div
        className="marquee-banner fixed left-0 right-0 z-[60] flex items-center overflow-hidden"
        style={{ top: 0, height: "38px", background: "#1a1718" }}
        aria-hidden="true"
      >
        <div
          className="marquee-track flex items-center whitespace-nowrap"
          style={{ color: "#dbcba9", fontSize: "13px", fontFamily: "var(--font-mono, monospace)", fontWeight: 700 }}
        >
          {track}
          {track}
        </div>
      </div>
    </>
  );
}
