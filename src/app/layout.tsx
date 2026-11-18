import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "우원 (牛元) | 2만원의 프리미엄 소고기 라멘 다이닝",
  description: "최상급 한우 차돌박이와 12시간 우려낸 깊은 사골 육수로 빚어낸 20,000원 프리미엄 비프 라멘 전문점",
  keywords: ["소고기라멘", "우육라멘", "프리미엄라멘", "한우차돌라멘", "성수동맛집", "우원"],
  openGraph: {
    title: "우원 (牛元) | 프리미엄 소고기 라멘",
    description: "20,000원의 품격을 증명하는 특선 한우 소고기 라멘",
    images: [
      {
        url: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "우원 프리미엄 소고기 라멘",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="dark scroll-smooth">
      <body className="min-h-screen flex flex-col bg-stone-950 text-stone-100 antialiased selection:bg-amber-500 selection:text-stone-950">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
