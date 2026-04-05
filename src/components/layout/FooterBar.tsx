export default function FooterBar(): React.JSX.Element {
  return (
    <footer
      className="
        fixed bottom-0 left-0 right-0 z-40
        flex flex-col items-center justify-center gap-4
        pb-6
        sm:pb-8
        lg:flex-row lg:justify-between lg:px-[50px] lg:pb-[45px]
        text-[16px] sm:text-[18px] font-normal tracking-wide text-parchment
        pointer-events-none font-sans
      "
    >
      {/* Left: email — extra left margin clears the Next.js dev toolbar badge */}
      <a
        href="mailto:hello@prenoma.co"
        className="pointer-events-auto text-ember hover:opacity-80 transition-opacity duration-200 lowercase"
      >
        hello@prenoma.co
      </a>

      {/* Right: legal + copyright */}
      <span className="flex items-center gap-5 sm:gap-7 pointer-events-auto">
        <a
          href="/terms"
          className="hover:text-ember transition-colors duration-200 lowercase"
        >
          terms
        </a>
        <a
          href="/privacy"
          className="hover:text-ember transition-colors duration-200 lowercase"
        >
          privacy_policy
        </a>
        <span className="lowercase">©2026</span>
      </span>
    </footer>
  );
}
