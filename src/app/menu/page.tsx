"use client";

import { useEffect, useState } from "react";
import { supabase, MenuItem } from "@/lib/supabase";
import { Flame, Sparkles, AlertCircle, Utensils, Check } from "lucide-react";

const CATEGORIES = [
  { id: "all", label: "전체 메뉴" },
  { id: "ramen", label: "🍜 프리미엄 라멘" },
  { id: "side", label: "🥟 사이드 & 밥" },
  { id: "topping", label: "🥩 토핑 추가" },
  { id: "drink", label: "🍺 주류 & 음료" },
];

export default function MenuPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMenuItems() {
      try {
        const { data, error } = await supabase
          .from("menu_items")
          .select("*")
          .order("order_index", { ascending: true });

        if (error) {
          console.error("Failed to load menu items:", error);
        } else if (data) {
          setItems(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadMenuItems();
  }, []);

  const filteredItems =
    selectedCategory === "all"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Title Header */}
      <div className="text-center space-y-3">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
          Gourmet Dining Menu
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-stone-100">
          우원 정갈한 차림표
        </h1>
        <p className="text-stone-400 text-sm sm:text-base max-w-xl mx-auto">
          최상급 한우 1++ 차돌박이와 12시간 직화 비프 사골로 끓여낸 품격 있는 프리미엄 라멘
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-stone-950 shadow-md shadow-amber-500/20 scale-105"
                : "bg-stone-900/80 text-stone-400 hover:text-stone-200 hover:bg-stone-800 border border-stone-800"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-96 rounded-2xl bg-stone-900/40 border border-stone-800 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const isSignature = item.badge === "SIGNATURE";
            return (
              <div
                key={item.id}
                className={`relative rounded-2xl overflow-hidden bg-stone-900/70 border transition-all duration-300 flex flex-col justify-between group ${
                  isSignature
                    ? "border-amber-500/60 shadow-xl shadow-amber-500/10 hover:border-amber-400"
                    : "border-stone-800 hover:border-stone-700"
                }`}
              >
                <div>
                  {/* Image Container */}
                  <div className="relative aspect-16/10 overflow-hidden bg-stone-950">
                    <img
                      src={
                        item.image_url ||
                        "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80"
                      }
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Badge */}
                    {item.badge && (
                      <div
                        className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase backdrop-blur-md ${
                          isSignature
                            ? "bg-amber-500 text-stone-950 shadow-lg shadow-amber-500/30"
                            : item.badge === "BEST"
                            ? "bg-red-600 text-white"
                            : "bg-stone-900/90 text-amber-400 border border-amber-500/30"
                        }`}
                      >
                        {item.badge}
                      </div>
                    )}

                    {/* Spicy Level */}
                    {item.spicy_level && item.spicy_level > 0 ? (
                      <div className="absolute top-3 right-3 bg-stone-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-xs text-red-400 border border-red-500/30 font-semibold">
                        {"🌶️".repeat(item.spicy_level)} 매콤
                      </div>
                    ) : null}
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-xl font-bold text-stone-100 group-hover:text-amber-400 transition-colors">
                        {item.name}
                      </h3>
                      <span className="text-lg font-black text-amber-400 shrink-0 font-mono">
                        {item.price.toLocaleString()}원
                      </span>
                    </div>

                    <p className="text-stone-400 text-sm leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Footer status / tags */}
                <div className="px-6 pb-6 pt-2 border-t border-stone-800/60 flex items-center justify-between text-xs text-stone-500">
                  <span className="flex items-center gap-1 text-stone-400">
                    <Check className="w-3.5 h-3.5 text-amber-500" />
                    수제 자가제면
                  </span>
                  {item.category === "ramen" && (
                    <span className="text-amber-400/80">공깃밥 무료 제공</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom Service Notice */}
      <div className="rounded-2xl bg-gradient-to-r from-stone-900 via-stone-900 to-amber-950/40 border border-amber-500/20 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <Utensils className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-bold text-stone-100">
              우원만의 정갈한 무료 식사 서비스
            </h4>
            <p className="text-stone-400 text-sm mt-0.5">
              라멘을 주문하신 모든 고객님께 국내산 햅쌀 공깃밥과 특제 갓김치를 무한 리필해 드립니다.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-amber-300 bg-amber-500/10 border border-amber-500/30 px-4 py-2 rounded-xl shrink-0">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>육수 간 조절(싱겁게/짜게) 가능합니다. 주문 시 말씀해 주세요.</span>
        </div>
      </div>
    </div>
  );
}
