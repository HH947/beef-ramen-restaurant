"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Star, Flame, Sparkles, Clock, MapPin, Award, CheckCircle2 } from "lucide-react";
import { supabase, Review } from "@/lib/supabase";

const INITIAL_REVIEWS: Review[] = [
  {
    id: "init-1",
    author: "미식가김선생",
    rating: 5,
    menu_name: "특선 한우 소고기 라멘",
    content: "2만원이라는 가격이 전혀 아깝지 않은 라멘입니다. 차돌박이 양도 엄청 많고 국물이 일반 돈코츠랑 차원이 다르게 진해요. 면발도 수제 생면이라 쫄깃하고 국물이 싹 배어있습니다.",
    password_hash: "1234",
    created_at: new Date().toISOString(),
  },
  {
    id: "init-2",
    author: "면돌이",
    rating: 5,
    menu_name: "특제 매운 소고기 라멘",
    content: "매콤한 맛 시켰는데 느끼함 싹 잡아주고 국물 한입 마시자마자 감탄했습니다. 고기 질이 정말 좋네요. 재방문 의사 200%입니다.",
    password_hash: "1234",
    created_at: new Date().toISOString(),
  },
  {
    id: "init-3",
    author: "성수동직장인",
    rating: 5,
    menu_name: "화이트 트러플 비프 쇼유 라멘",
    content: "트러플 향이 은은하게 퍼지면서 소고기 풍미랑 기가 막히게 어울립니다. 분위기도 고급스럽고 데이트 코스로도 강추합니다.",
    password_hash: "1234",
    created_at: new Date().toISOString(),
  },
];

export default function HomePage() {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);

  useEffect(() => {
    async function loadLatestReviews() {
      try {
        const { data } = await supabase
          .from("reviews")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(3);

        if (data && data.length > 0) {
          setReviews(data);
        }
      } catch (e) {
        console.error("Home reviews load error:", e);
      }
    }

    loadLatestReviews();
  }, []);

  return (
    <div className="space-y-24 pb-20">
      {/* 1. Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-stone-800">
        {/* Background Image with Dark Vignette */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1920&q=80"
            alt="우원 프리미엄 한우 소고기 라멘"
            className="w-full h-full object-cover opacity-25 scale-105 transform hover:scale-100 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-stone-950/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-6 pt-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-sm animate-pulse">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>최상급 투뿔 한우 직화 차돌박이의 압도적 풍미</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-stone-100 leading-[1.15]">
            20,000원의 가치를 <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-yellow-500">
              증명하는 단 한 그릇
            </span>
          </h1>

          <p className="text-stone-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            12시간 정성으로 직화 추출한 진한 비프 사골 브로스와 매일 아침 뽑아내는 수제 숙성 생면.
            라멘 그 이상의 미식 다이닝을 선사합니다.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/menu"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-stone-950 font-bold text-base shadow-lg shadow-amber-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <span>시그니처 메뉴 보기</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/reviews"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-stone-900/90 hover:bg-stone-800 text-stone-200 font-semibold text-base border border-stone-700/80 backdrop-blur-sm transition-all hover:border-amber-500/40"
            >
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              <span>방문객 후기 남기기</span>
            </Link>
          </div>

          {/* Quick Metrics */}
          <div className="pt-8 grid grid-cols-3 gap-2 sm:gap-6 max-w-xl mx-auto text-center border-t border-stone-800/80">
            <div className="p-2 sm:p-4">
              <p className="text-amber-400 font-black text-xl sm:text-3xl">12h</p>
              <p className="text-stone-400 text-xs sm:text-sm mt-1">사골 직화 우림</p>
            </div>
            <div className="p-2 sm:p-4 border-x border-stone-800/80">
              <p className="text-amber-400 font-black text-xl sm:text-3xl">1++</p>
              <p className="text-stone-400 text-xs sm:text-sm mt-1">한우 직화 차돌</p>
            </div>
            <div className="p-2 sm:p-4">
              <p className="text-amber-400 font-black text-xl sm:text-3xl">20,000</p>
              <p className="text-stone-400 text-xs sm:text-sm mt-1">품격의 시그니처</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Brand Philosophy / 3 Pillars */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-3 mb-14">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">Craftsmanship</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-100">
            우원이 고집하는 세 가지 원칙
          </h2>
          <p className="text-stone-400 text-sm sm:text-base max-w-xl mx-auto">
            왜 2만원이어야 하는가? 모든 재료와 공정에서 타협하지 않는 철학입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="p-8 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-amber-500/40 transition-all group">
            <div className="w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
              <Flame className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-stone-100 mb-3">12시간 직화 비프 사골</h3>
            <p className="text-stone-400 text-sm leading-relaxed">
              기름지고 텁텁한 돼지 육수와 달리, 소 뼈와 양지를 장시간 직화로 우려내 묵직하면서도 뒷맛이 깔끔하고 기품 있는 프리미엄 육수입니다.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-amber-500/40 transition-all group">
            <div className="w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
              <Award className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-stone-100 mb-3">한우 1++ 차돌박이 직화 토핑</h3>
            <p className="text-stone-400 text-sm leading-relaxed">
              수입산 냉동 육류 대신, 마블링이 최상급인 한우 차돌박이를 주문 즉시 토치로 직화하여 진한 불향과 녹아내리는 육즙을 전달합니다.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-amber-500/40 transition-all group">
            <div className="w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-stone-100 mb-3">매일 아침 수제 숙성 자가제면</h3>
            <p className="text-stone-400 text-sm leading-relaxed">
              고단백 밀가루와 알칼리수를 최적의 비율로 배합하여 진한 소고기 육수를 풍성하게 끌어올리는 탄력 있는 특제 면발을 고집합니다.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Signature Highlight Banner (20,000 KRW Ramen Showcase) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-stone-900 via-stone-950 to-stone-900 border border-amber-500/30 p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
                Signature Masterpiece
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-stone-100 leading-tight">
                특선 한우 소고기 라멘 <br />
                <span className="text-amber-400">20,000 KRW</span>
              </h3>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                시중의 인스턴트나 일반 라멘과는 궤를 달리합니다. 두툼한 한우 차돌박이가 면을 가득 덮고, 12시간 끓인 육향 가득한 국물에 한 입 베어 무는 순간 2만원의 값어치가 고스란히 느껴집니다.
              </p>

              <div className="space-y-2 text-sm text-stone-300">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>주문 즉시 직화 그릴링하는 1++ 한우 차돌박이 120g</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>24시간 가쓰오 특제 간장에 숙성시킨 아지타마고 기본 제공</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>공깃밥 & 수제 갓김치 무한 무료 제공</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/menu"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold transition-all shadow-md shadow-amber-500/20"
                >
                  <span>전체 메뉴판 확인하기</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-2xl border border-stone-800 group">
              <img
                src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1000&q=80"
                alt="특선 한우 소고기 라멘"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 right-4 bg-stone-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-amber-500/40 text-amber-400 font-mono font-bold text-sm">
                ₩ 20,000
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Latest Customer Reviews Teaser */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">Real Reviews</span>
            <h2 className="text-3xl font-extrabold text-stone-100 mt-1">방문객 솔직 후기</h2>
            <p className="text-stone-400 text-sm mt-1">우원을 방문해주신 손님들의 생생한 한 줄 평가</p>
          </div>
          <Link
            href="/reviews"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-400 hover:text-amber-300"
          >
            <span>모든 후기 보기 & 작성하기</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800 flex flex-col justify-between space-y-4 hover:border-stone-700 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-stone-200 text-sm">{rev.author}</span>
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>
                {rev.menu_name && (
                  <span className="inline-block text-xs text-amber-400/90 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    {rev.menu_name}
                  </span>
                )}
                <p className="text-stone-300 text-sm leading-relaxed line-clamp-3">
                  &quot;{rev.content}&quot;
                </p>
              </div>
              <div className="text-[11px] text-stone-500 pt-2 border-t border-stone-800/80">
                {new Date(rev.created_at).toLocaleDateString("ko-KR")}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Location & Visiting Guide */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-stone-900/40 border border-stone-800 p-8 sm:p-12">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">Location & Hours</span>
            <h2 className="text-3xl font-extrabold text-stone-100">오시는 길 & 매장 정보</h2>
            <p className="text-stone-400 text-sm">성수동 골목길, 정갈하게 준비된 미식의 공간으로 초대합니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Visual Map Placeholder Card */}
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-stone-800 bg-stone-950 flex flex-col items-center justify-center p-6 text-center group">
              <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3 group-hover:scale-110 transition-transform">
                <MapPin className="w-7 h-7" />
              </div>
              <h4 className="text-stone-200 font-bold text-lg mb-1">성수동 우원 본점</h4>
              <p className="text-stone-400 text-sm mb-4">서울특별시 성동구 아차산로 100, 미식빌딩 1층</p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-900 text-xs text-amber-400 border border-stone-700">
                <span>지하철: 2호선 성수역 3번 출구 도보 3분</span>
              </div>
            </div>

            {/* Hours & Tips */}
            <div className="space-y-6">
              <div className="space-y-3">
                <h4 className="text-base font-bold text-stone-200 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-400" />
                  <span>영업 및 웨이팅 안내</span>
                </h4>
                <div className="space-y-2 text-sm text-stone-300">
                  <div className="flex justify-between py-1.5 border-b border-stone-800/80">
                    <span className="text-stone-400">점심 영업</span>
                    <span className="font-semibold text-stone-200">11:30 ~ 15:00 (라스트오더 14:30)</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-stone-800/80">
                    <span className="text-stone-400">브레이크 타임</span>
                    <span className="text-amber-400/90 font-medium">15:00 ~ 17:00</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-stone-800/80">
                    <span className="text-stone-400">저녁 영업</span>
                    <span className="font-semibold text-stone-200">17:00 ~ 21:00 (라스트오더 20:30)</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-stone-800/80">
                    <span className="text-stone-400">휴무일</span>
                    <span className="text-red-400 font-semibold">매주 월요일 정기 휴무</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed">
                💡 하루 100그릇 한정 육수를 생산하므로 재료 소진 시 조기 마감될 수 있습니다. 
                차량을 이용하시는 고객님께서는 매장 앞 전용 주차구역(4대)을 이용해주시기 바랍니다.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
