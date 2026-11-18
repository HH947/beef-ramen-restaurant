# 🍜 우원 (牛元) - 20,000원 프리미엄 소고기 라멘 다이닝

> **"20,000원의 가치를 증명하는 묵직한 단 한 그릇"**  
> 최상급 1++ 한우 차돌박이와 12시간 직화 비프 사골 육수로 빚어낸 프리미엄 소고기 라멘 전문점 웹사이트

---

## 🌟 주요 기능 및 페이지 구성

### 1. 홈 (`/`)
- **히어로 섹션**: 감각적인 다크 & 골드 럭셔리 비주얼, 12시간 사골 직화 우림 & 1++ 한우 차돌 강조
- **장인정신 3대 철학**: 12시간 직화 비프 브로스, 최상급 한우 차돌박이 직화 그릴링, 매일 아침 수제 자가제면
- **20,000원 시그니처 쇼케이스**: 대표 메뉴 상세 스펙 및 비주얼 조명
- **실시간 고객 후기 & 매장 정보**: 성수동 본점 위치, 영업시간, 주차 및 웨이팅 안내

### 2. 메뉴 소개 (`/menu`)
- **카테고리별 탭 필터링**:
  - 🍜 **프리미엄 라멘**: 특선 한우 소고기 라멘 (20,000원), 특제 매운 소고기 라멘 (21,000원), 화이트 트러플 라멘 (23,000원), 맑은 청탕 라멘 (19,000원)
  - 🥟 **사이드 & 밥**: 직화 차돌 미니 덮밥 (6,000원), 수제 바삭 교자 5p (5,000원)
  - 🥩 **토핑 추가**: 한우 차돌박이 추가 100g (8,000원), 아지타마고 (1,500원)
  - 🍺 **주류 & 음료**: 산토리 프리미엄 하이볼 (8,000원), 에비스 프리미엄 생맥주 (9,000원)
- 메뉴 카드별 가격, 맵기 표시(🌶️), 추천 배지(SIGNATURE, BEST, PREMIUM) 및 무료 밥/갓김치 리필 안내

### 3. 방문 고객 리얼 후기 (`/reviews`)
- **비회원 간편 후기 작성 시스템**: 로그인 없이 닉네임, 만족도 별점(1~5점), 메뉴 선택, 4자리 관리 비밀번호 입력
- **실시간 평점 대시보드**: 평균 평점 통계 및 총 리뷰 수 실시간 집계
- **작성자 본인 삭제 기능**: 본인이 등록한 4자리 비밀번호 일치 시 즉시 삭제 지원

---

## 🛠️ 기술 스택 (Tech Stack)

- **Frontend & Fullstack**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4, Lucide React
- **Database & Backend**: Supabase (PostgreSQL, Row Level Security)
- **Deployment**: Vercel

---

## 🚀 환경 변수 설정 (.env.local)

```env
NEXT_PUBLIC_SUPABASE_URL=https://kfisfduehoqeloshnsdc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmaXNmZHVlaG9xZWxvc2huc2RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ5ODk2NzUsImV4cCI6MjExMDU2NTY3NX0.AvIi4mjie6BD4HKJHHVuU4BRYs7Q7B0m0MW-tHe8Tzw
```
