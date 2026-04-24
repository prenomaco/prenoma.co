import Navbar from "@/components/layout/Navbar";
import FooterBar from "@/components/layout/FooterBar";
import LoadingScreen from "@/components/common/LoadingScreen";
import CustomCursor from "@/components/common/CustomCursor";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <Navbar />
      <main className="flex-1 flex flex-col min-h-screen">{children}</main>
      <FooterBar />
    </>
  );
}
