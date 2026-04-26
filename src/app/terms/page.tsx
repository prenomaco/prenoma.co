import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Prenoma",
  description: "Terms and conditions for using Prenoma design and development services.",
};

const sections = [
  {
    title: "intellectual property & ownership",
    body: `Custom designs and code are "Work for Hire," with full copyright transferring to the Client only after 100% of the agreed payment is cleared. Prenoma retains all rights to its pre-existing tools, frameworks, and proprietary methodologies used in the delivery of services.`,
  },
  {
    title: "third-party infringement",
    body: `Prenoma is not liable for unauthorized site duplication or "scraping" by third parties. The sole responsibility to monitor and legally pursue infringers rests with the Client.`,
  },
  {
    title: "website revamping",
    body: `Prenoma is not liable for legacy issues, data breaches, or broken links stemming from the original site's code. The Client is responsible for maintaining all data backups prior to and during any revamp engagement.`,
  },
  {
    title: "seo & performance",
    body: `While Prenoma provides the best possible technical and design services at the time of development, we do not guarantee search engine rankings, traffic, or visibility, nor are we liable for ranking drops following a revamp or migration.`,
  },
  {
    title: "indemnity & warranty",
    body: `The Client warrants that they own or hold appropriate rights to all materials provided to Prenoma and agrees to indemnify Prenoma against all legal claims or damages arising from copyright infringement or breach of these terms.`,
  },
  {
    title: "governing law & jurisdiction",
    body: `These terms are governed by the laws of India. Any legal proceedings arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the courts in Secunderabad, Telangana.`,
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-ink pt-[120px] sm:pt-[180px] pb-[80px] px-6 sm:px-10 lg:px-20 text-parchment">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cream mb-4 tracking-tight lowercase">
          terms of service
        </h1>
        <p className="text-sm text-parchment/50 mb-12">
          Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div className="space-y-10 text-sm sm:text-base leading-relaxed">
          {sections.map((section, i) => (
            <section key={i}>
              <h2 className="text-base sm:text-lg font-semibold text-cream mb-3 lowercase">
                {i + 1}. {section.title}
              </h2>
              <p className="text-parchment/80">{section.body}</p>
            </section>
          ))}

          <section className="pt-10 border-t border-parchment/10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/privacy"
              className="text-cream underline decoration-cream/30 hover:text-ember hover:decoration-ember/30 transition-colors duration-200"
            >
              privacy policy →
            </Link>
            <Link
              href="/"
              className="text-cream underline decoration-cream/30 hover:text-ember hover:decoration-ember/30 transition-colors duration-200"
            >
              back to home →
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
}
