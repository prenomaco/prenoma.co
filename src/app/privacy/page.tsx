import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Prenoma",
  description: "How Prenoma collects, uses, and protects your personal data in compliance with Indian IT law.",
};

const sections = [
  {
    title: "information collection and consent",
    body: `Prenoma collects personal information such as names and email addresses only when provided voluntarily by the Client through our contact forms or service agreements. By using our website and services, you provide explicit consent for the collection and processing of such data for project-related purposes.`,
  },
  {
    title: "purpose and usage",
    body: `The data collected is used solely to provide custom technical and design services, maintain project communication, and improve service delivery. We do not use your data for any undisclosed purposes without your additional consent.`,
  },
  {
    title: "reasonable security practices",
    body: `In compliance with Section 43A of the IT Act, Prenoma implements a documented information security program and Reasonable Security Practices — including physical, electronic, and procedural safeguards — to protect your data from unauthorized access, loss, or disclosure.`,
  },
  {
    title: "third-party disclosure and transfers",
    body: `We do not sell or share your personal data with third parties for marketing. Data is only shared with trusted service providers necessary to fulfill our contract, or when required by Indian law enforcement agencies.`,
  },
  {
    title: "data retention and accuracy",
    body: `We retain personal information only for as long as necessary to fulfill project goals or satisfy legal requirements. Clients have the right to review, update, or correct any inaccurate personal information we hold.`,
  },
  {
    title: "right to withdraw consent",
    body: `You have the right to opt-out or withdraw your consent for data processing at any time. Please note that withdrawing consent may limit our ability to provide certain technical services.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-ink pt-[120px] pb-[80px] px-6 sm:px-10 lg:px-20 text-parchment">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cream mb-4 tracking-tight lowercase">
          privacy policy
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

          {/* Grievance Redressal */}
          <section>
            <h2 className="text-base sm:text-lg font-semibold text-cream mb-3 lowercase">
              7. grievance redressal
            </h2>
            <p className="text-parchment/80 mb-4">
              In accordance with the Information Technology Act, any discrepancies or grievances regarding your personal data can be addressed to our designated Grievance Officer. We will acknowledge your grievance and provide a resolution within 30 days.
            </p>
            <div className="border border-parchment/10 rounded-lg p-5 space-y-2 text-sm text-parchment/70">
              <p>
                <span className="text-cream font-medium">name</span>
                <br />
                Hemanth Tenneti
              </p>
              <p>
                <span className="text-cream font-medium">email</span>
                <br />
                <a
                  href="mailto:hemath@prenoma.co"
                  className="hover:text-ember transition-colors duration-200"
                >
                  hemath@prenoma.co
                </a>
              </p>
              <p>
                <span className="text-cream font-medium">address</span>
                <br />
                Defence Colony, Sainikpuri, Secunderabad
                <br />
                Hyderabad – 500094, Telangana, India
              </p>
            </div>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-base sm:text-lg font-semibold text-cream mb-3 lowercase">
              8. governing law
            </h2>
            <p className="text-parchment/80">
              This Privacy Policy is governed by the laws of India. Any disputes arising out of or in connection with this policy are subject to the exclusive jurisdiction of the courts in Secunderabad, Telangana.
            </p>
          </section>

          <section className="pt-10 border-t border-parchment/10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/terms"
              className="text-cream underline decoration-cream/30 hover:text-ember hover:decoration-ember/30 transition-colors duration-200"
            >
              terms of service →
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
