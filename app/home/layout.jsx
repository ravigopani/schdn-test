import { HomeHeader } from "@/components/home/home-header";
import { HomeFooter } from "@/components/home/home-footer";

export const metadata = {
  title: "OLX India - Buy & Sell",
  description: "Buy and sell everything from used cars to mobile phones.",
};

export default function HomeLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <HomeHeader />
      <main className="flex-1">{children}</main>
      <HomeFooter />
    </div>
  );
}
