"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flame, UtensilsCrossed, MessageSquareText, Home } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "홈", icon: Home },
    { href: "/menu", label: "메뉴 소개", icon: UtensilsCrossed },
    { href: "/reviews", label: "방문 후기", icon: MessageSquareText },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-stone-950/80 border-b border-amber-500/20 text-stone-100 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 flex items-center justify-center text-stone-950 font-bold shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <Flame className="w-6 h-6 text-stone-950" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-wider text-amber-400">우원</span>
              <span className="text-xs px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 font-medium">牛元</span>
            </div>
            <p className="text-[10px] text-stone-400 font-light tracking-widest uppercase">Gourmet Beef Ramen</p>
          </div>
        </Link>

        {/* Navigation items */}
        <nav className="flex items-center gap-1 sm:gap-2">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm shadow-amber-500/10"
                    : "text-stone-300 hover:text-amber-200 hover:bg-stone-900/60"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-amber-400" : "text-stone-400"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-3">
          <span className="text-xs text-amber-400/90 bg-amber-950/60 border border-amber-600/30 px-3 py-1 rounded-full font-mono">
            한우 차돌 2만원의 미학
          </span>
        </div>
      </div>
    </header>
  );
}
