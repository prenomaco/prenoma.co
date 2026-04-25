"use client";

const OPTIONS = ["all", "design", "development", "motion"] as const;

interface FilterTabsProps {
  active: string;
  onChange: (cat: string) => void;
}

export default function FilterTabs({ active, onChange }: FilterTabsProps): React.JSX.Element {
  return (
    <div className="bg-[rgba(19,18,19,0.2)] backdrop-blur-sm border border-white/5 rounded-[90px] flex items-center p-1">
      {OPTIONS.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={[
            "px-4 py-1.5 rounded-full text-[13px] font-bold lowercase cursor-pointer",
            "transition-colors duration-200",
            active === opt
              ? "bg-[#f35226] text-[#f3e2c8]"
              : "bg-transparent text-[#dbcba9] hover:text-[#f3e2c8]",
          ].join(" ")}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
