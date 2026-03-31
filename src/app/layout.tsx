import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import FooterBar from "@/components/layout/FooterBar";
import LoadingScreen from "@/components/common/LoadingScreen";
import "./globals.css";

// Why: Manrope is the confirmed brand font from Figma.
// Load 400 (nav/body) and 700 (headline/tagline) weights only.
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "prenoma.co — We Make Stunning Websites",
  description:
    "Affordable, fast, and beautiful websites crafted by prenoma.co. Stunning single-page websites starting at ₹9,999.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} antialiased`}>
      <body className="font-sans" suppressHydrationWarning>
        <LoadingScreen />
        <Navbar />
        <main>{children}</main>
        <FooterBar />
      </body>
    </html>
  );
}
