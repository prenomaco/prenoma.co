import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
// {/* V1 backup: WavyBackground.tsx */}
import WavyBackgroundV2 from "@/components/new/WavyBackgroundV2";
import NewNavbar from "@/components/new/NewNavbar";
import NewFooter from "@/components/new/NewFooter";
import CustomCursor from "@/components/common/CustomCursor";
import MarqueeBanner from "@/components/new/MarqueeBanner";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "prenoma.co — crafting digital experiences",
  description: "design. development. motion.",
};

export default function NewLayout({
  children,
}: Readonly<{ children: React.ReactNode }>): React.JSX.Element {
  return (
    <div className={`${jetbrainsMono.variable}`} style={{ minHeight: "100dvh", overflowY: "auto" }}>
      <MarqueeBanner />
      <CustomCursor />
      <WavyBackgroundV2 />
      <NewNavbar />
      <main className="relative z-10">{children}</main>
      <NewFooter />
    </div>
  );
}
