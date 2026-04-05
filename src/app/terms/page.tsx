import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Prenoma",
  description: "Terms and conditions for using Prenoma.co services.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-ink pt-[120px] pb-[80px] px-6 sm:px-10 lg:px-20 text-parchment">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cream mb-8 tracking-tight">
          Terms of Service
        </h1>
        
        <div className="space-y-8 text-sm sm:text-base leading-relaxed">
          <p>
            Last updated: {new Date().toLocaleDateString()}
          </p>
          
          <section>
            <h2 className="text-xl font-bold text-cream mb-3">1. Agreement to Terms</h2>
            <p className="mb-4">
              By accessing or using our services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-cream mb-3">2. Intellectual Property</h2>
            <p className="mb-4">
              The service and its original content, features, and functionality are and will remain the exclusive property of Prenoma and its licensors.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-cream mb-3">3. Links To Other Web Sites</h2>
            <p className="mb-4">
              Our service may contain links to third-party web sites or services that are not owned or controlled by Prenoma. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third party web sites or services.
            </p>
            <p>
              For more information, please read our{" "}
              <Link
                href="/privacy"
                className="text-cream underline decoration-cream/30 hover:text-ember hover:decoration-ember/30 transition-colors duration-200"
              >
                Privacy Policy
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
