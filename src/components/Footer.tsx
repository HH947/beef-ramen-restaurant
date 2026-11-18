import Link from "next/link";
import { MapPin, Clock, Phone, AlertCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-stone-950 border-t border-stone-800 text-stone-400 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Brand story */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-amber-400">우원 (牛元)</span>
            <span className="text-xs text-stone-500">프리미엄 소고기 라멘</span>
          </div>
          <p className="text-sm text-stone-400 leading-relaxed">
            12시간 직화로 우려낸 최상급 사골 육수와 한우 차돌박이의 완벽한 앙상블.
            20,000원의 가치를 단 한 그릇에 오롯이 담아냅니다.
          </p>
          <div className="flex items-center gap-2 text-xs text-amber-500/80">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>당일 수량 소진 시 조기 마감될 수 있습니다.</span>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="space-y-3">
          <h4 className="text-stone-200 font-semibold text-sm flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-amber-400" />
            영업 시간 및 안내
          </h4>
          <ul className="text-sm space-y-1.5 text-stone-400">
            <li className="flex justify-between">
              <span>화요일 - 일요일:</span>
              <span className="text-stone-200">11:30 - 21:00</span>
            </li>
            <li className="flex justify-between">
              <span>브레이크 타임:</span>
              <span className="text-stone-300">15:00 - 17:00</span>
            </li>
            <li className="flex justify-between">
              <span>라스트 오더:</span>
              <span className="text-stone-300">20:30</span>
            </li>
            <li className="flex justify-between text-amber-400 font-medium">
              <span>정기 휴무:</span>
              <span>매주 월요일</span>
            </li>
          </ul>
        </div>

        {/* Location & Contact */}
        <div className="space-y-3">
          <h4 className="text-stone-200 font-semibold text-sm flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-amber-400" />
            오시는 길 & 문의
          </h4>
          <p className="text-sm text-stone-400">
            서울특별시 성동구 아차산로 100, 미식빌딩 1층 (성수역 3번 출구 도보 3분)
          </p>
          <div className="flex items-center gap-2 text-sm text-stone-300">
            <Phone className="w-4 h-4 text-amber-400" />
            <span>예약 및 대관 문의: 02-1234-5678</span>
          </div>
          <p className="text-xs text-stone-500">
            * 매장 앞 전용 주차장 4대 완비 (만차 시 인근 공영주차장 지원)
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
        <div>
          © 2026 우원 (牛元) Gourmet Beef Ramen. All rights reserved.
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="hover:text-stone-300 transition-colors">홈</Link>
          <Link href="/menu" className="hover:text-stone-300 transition-colors">메뉴</Link>
          <Link href="/reviews" className="hover:text-stone-300 transition-colors">후기작성</Link>
        </div>
      </div>
    </footer>
  );
}
