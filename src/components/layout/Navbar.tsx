import Link from "next/link";

const NAV_ITEMS = [
  { label: "home", href: "/" },
  { label: "works", href: "/works" },
  { label: "contact", href: "/contact" },
];

export default function Navbar(): React.JSX.Element {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center pt-6 sm:pt-8 lg:justify-start lg:pt-[45px] lg:pl-[50px]"
      aria-label="Main navigation"
    >
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
    </nav>
  );
}
