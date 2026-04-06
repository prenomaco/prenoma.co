import Link from "next/link";

const NAV_ITEMS = [
  { label: "home", href: "/" },
  { label: "works", href: "/works" },
  { label: "contact", href: "/contact" },
];

export default function Navbar(): React.JSX.Element {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between pt-6 sm:pt-8 lg:pt-[45px] lg:px-[50px] px-6"
      aria-label="Main navigation"
    >
      {/* Left: Navigation links */}
      <div className="flex items-center gap-6 sm:gap-8 lg:gap-10">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="text-[16px] sm:text-[18px] lg:text-[20px] font-normal text-parchment hover:text-ember transition-colors duration-200 lowercase"
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Right: Dual-tone logo */}
      <Link href="/" className="flex items-center" aria-label="prenoma.co home">
        <span className="text-[20px] sm:text-[24px] lg:text-[28px] font-bold text-cream leading-none tracking-tight">
          prenoma
        </span>
        <span className="text-[20px] sm:text-[24px] lg:text-[28px] font-bold text-ember leading-none tracking-tight">
          .co
        </span>
      </Link>
    </nav>
  );
}
