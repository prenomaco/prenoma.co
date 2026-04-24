"use client";

const CATEGORIES = ["all", "design", "development", "motion"] as const;

interface FilterTabsProps {
  active: string;
  onChange: (cat: string) => void;
}

export default function FilterTabs({ active, onChange }: FilterTabsProps): React.JSX.Element {
  return (
    <div className="bg-[rgba(19,18,19,0.2)] backdrop-blur-sm border border-white/5 rounded-[90px] flex items-center p-1.5">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => onChange(cat)}
          className={[
            "px-5 py-2 rounded-full text-[15px] font-bold lowercase cursor-pointer",
            "transition-colors duration-200",
            active === cat
              ? "bg-[#f35226] text-[#f3e2c8]"
              : "bg-transparent text-[#dbcba9] hover:text-[#f3e2c8]",
          ].join(" ")}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
