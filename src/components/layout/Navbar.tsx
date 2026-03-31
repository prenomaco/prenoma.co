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
      className="
        fixed top-0 left-0 right-0 lg:right-auto z-50
        pt-6 flex justify-center
        sm:pt-10
        lg:block lg:pt-[73px] lg:pl-[105px]
      "
      aria-label="Main navigation"
    >
      {/* Why: One-row nav on mobile/tablet, Two-row nav per Figma on desktop */}
      <div className="flex flex-row lg:flex-col items-center lg:items-start gap-6 sm:gap-10 lg:gap-0 lg:w-auto">
        {/* Row 1 */}
        <div className="flex items-center gap-6 sm:gap-10 lg:gap-[82px]">
          {NAV_ROW_ONE.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="
                text-[18px] sm:text-[24px] lg:text-[31.123px]
                font-normal text-parchment
                hover:opacity-70 transition-opacity duration-200
              "
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Row 2 */}
        <div className="flex items-center lg:mt-[5px]">
          {NAV_ROW_TWO.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="
                text-[18px] sm:text-[24px] lg:text-[31.123px]
                font-normal text-parchment
                hover:opacity-70 transition-opacity duration-200
              "
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
