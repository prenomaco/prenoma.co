import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import WaveBackground from "@/components/WaveBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import MarqueeBanner from "@/components/MarqueeBanner";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "prenoma.co — crafting digital experiences",
  description: "design. development. motion.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} antialiased`}>
      <body suppressHydrationWarning style={{ minHeight: "100dvh", overflowX: "hidden" }}>
        <MarqueeBanner />
        <CustomCursor />
        <WaveBackground />
        <Navbar />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
