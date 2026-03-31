import Link from "next/link";

interface NavItem {
  readonly label: string;
  readonly href: string;
}

const NAV_ROW_ONE: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Works", href: "/works" },
];

const NAV_ROW_TWO: NavItem[] = [{ label: "Pricing", href: "/pricing" }];

export default function Navbar(): React.JSX.Element {
  return (
    <nav
      className="fixed top-0 left-0 z-50 pt-[73px] pl-[105px]"
      aria-label="Main navigation"
    >
      {/* Why: Two-row nav per Figma — Home+Works on row 1, Pricing on row 2 */}
      <div className="flex flex-col">
        {/* Row 1: Home at x:105, Works at x:272 — gap = 272-105-85 = 82px */}
        {/* Why (Scaled): 82px gap remains same to anchor positions */}
        <div className="flex items-center gap-[82px]">
          {NAV_ROW_ONE.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[31.123px] font-normal text-parchment hover:opacity-70 transition-opacity duration-200"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Row 2: Pricing at y:121 — delta from Home y:73 = 48px, minus text height ~43px = 5px gap */}
        {/* Why: Using mt-[5px] because flexbox auto-stacks and the text items are ~43px tall */}
        <div className="mt-[5px]">
          {NAV_ROW_TWO.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[31.123px] font-normal text-parchment hover:opacity-70 transition-opacity duration-200"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
