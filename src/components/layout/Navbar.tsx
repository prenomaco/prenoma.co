import Link from "next/link";

const NAV_ITEMS = [
  { label: "home", href: "/" },
  { label: "works", href: "/works" },
  { label: "contact", href: "/contact" },
];

export default function Navbar(): React.JSX.Element {
  return (
    <nav
      className="absolute lg:fixed top-0 left-0 right-0 z-50 flex flex-col lg:flex-row items-center lg:justify-between pt-6 sm:pt-8 lg:pt-[45px] lg:px-[50px] px-6 gap-4 lg:gap-0"
      aria-label="Main navigation"
    >
      {/* Dual-tone logo: Top Center on mobile, Right on Desktop */}
      <Link href="/" className="flex items-center lg:order-2" aria-label="prenoma.co home">
        <span className="text-[24px] sm:text-[28px] lg:text-[28px] font-bold text-cream leading-none tracking-tight">
          prenoma
        </span>
        <span className="text-[24px] sm:text-[28px] lg:text-[28px] font-bold text-ember leading-none tracking-tight">
          .co
        </span>
      </Link>

      {/* Navigation links: Bottom Center on mobile, Left on Desktop */}
      <div className="flex items-center gap-6 sm:gap-8 lg:gap-10 lg:order-1">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="text-[16px] sm:text-[20px] lg:text-[22px] font-normal text-parchment hover:text-ember transition-colors duration-200 lowercase"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
