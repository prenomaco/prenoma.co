import Link from "next/link";

export default function NewFooter(): React.JSX.Element {
  return (
    <footer
      className="fixed bottom-0 right-0 z-40 pointer-events-none flex items-center gap-6 pb-10 pr-12"
      aria-label="Site footer"
    >
      <Link
        href="/terms"
        className="pointer-events-auto lowercase transition-opacity duration-200 hover:opacity-80"
        style={{
          fontFamily: "var(--font-mono, monospace)",
          fontSize: "16px",
          color: "#dbcba9",
          opacity: 0.5,
        }}
      >
        terms
      </Link>
      <Link
        href="/privacy"
        className="pointer-events-auto lowercase transition-opacity duration-200 hover:opacity-80"
        style={{
          fontFamily: "var(--font-mono, monospace)",
          fontSize: "16px",
          color: "#dbcba9",
          opacity: 0.5,
        }}
      >
        privacy_policy
      </Link>
      <span
        className="lowercase"
        style={{
          fontFamily: "var(--font-mono, monospace)",
          fontSize: "16px",
          color: "#dbcba9",
          opacity: 0.5,
        }}
      >
        ©2026
      </span>
    </footer>
  );
}
