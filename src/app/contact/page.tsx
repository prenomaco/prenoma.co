// Why: Contact page stub for Works page CTAs
export default function ContactPage(): React.JSX.Element {
  return (
    <section className="flex items-center justify-center min-h-screen bg-ink px-6">
      <div className="flex flex-col gap-6 items-center text-center">
        <h1 className="text-[48px] lg:text-[65px] font-bold text-cream lowercase">
          Contact
        </h1>
        <p className="text-[18px] lg:text-[20px] text-parchment max-w-2xl">
          Get in touch with us at{" "}
          <a
            href="mailto:hello@prenoma.co"
            className="text-ember hover:opacity-80 transition-opacity"
          >
            hello@prenoma.co
          </a>
        </p>
      </div>
    </section>
  );
}
