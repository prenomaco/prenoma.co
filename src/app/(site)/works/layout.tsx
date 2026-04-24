import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Works — prenoma.co",
  description:
    "Explore our portfolio of stunning websites: Computer Port, Veloce, and ARR Dental Lab. Interactive previews showcasing enterprise, e-commerce, and healthcare solutions.",
};

export default function WorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
