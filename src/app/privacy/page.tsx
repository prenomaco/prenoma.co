import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Prenoma",
  description: "Privacy policy for Prenoma.co users.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-ink pt-[120px] pb-[80px] px-6 sm:px-10 lg:px-20 text-parchment">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cream mb-8 tracking-tight">
          Privacy Policy
        </h1>
        
        <div className="space-y-8 text-sm sm:text-base leading-relaxed">
          <p>
            Last updated: {new Date().toLocaleDateString()}
          </p>
          
          <section>
            <h2 className="text-xl font-bold text-cream mb-3">1. Information Collection</h2>
            <p className="mb-4">
              We collect information that you provide directly to us when you use our services, such as when you fill out a contact form or subscribe to our newsletter.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-cream mb-3">2. Use of Information</h2>
            <p className="mb-4">
              We use the information we collect to provide, maintain, and improve our services, to develop new ones, and to protect us and our users. We may also use this information to offer you tailored content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-cream mb-3">3. Data Security</h2>
            <p className="mb-4">
              We implement appropriate security measures to protect your personal information against accidental or unlawful destruction, loss, alteration, and unauthorized disclosure or access.
            </p>
            <p>
              Please also review our{" "}
              <Link
                href="/terms"
                className="text-cream underline decoration-cream/30 hover:text-ember hover:decoration-ember/30 transition-colors duration-200"
              >
                Terms of Service
              </Link>.
            </p>
          </section>

          <section className="pt-8">
            <Link
              href="/"
              className="text-cream underline decoration-cream/30 hover:text-ember hover:decoration-ember/30 transition-colors duration-200"
            >
              Back to Home
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
}
