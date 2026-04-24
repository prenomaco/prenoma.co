import React from "react";

const ITEM = "open to work";
const DIVIDER = "✦";

// Build a single track: 10 repetitions for a seamless seamless loop when doubled
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
      `}</style>

      <div
        className="fixed left-0 right-0 z-[60] flex items-center overflow-hidden"
        style={{ top: 0, height: "38px", background: "#1a1718" }}
        aria-hidden="true"
      >
        {/* Two identical copies side-by-side → seamless loop */}
        <div
          className="marquee-track flex items-center whitespace-nowrap"
          style={{ color: "#dbcba9", fontSize: "13px", fontFamily: "Manrope, sans-serif", fontWeight: 700 }}
        >
          {track}
          {track}
        </div>
      </div>
    </>
  );
}
