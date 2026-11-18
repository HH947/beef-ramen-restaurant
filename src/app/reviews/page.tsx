"use client";

import { useEffect, useState } from "react";
import { supabase, Review } from "@/lib/supabase";
import { Star, MessageSquarePlus, Trash2, CheckCircle2, AlertCircle, X, ShieldCheck } from "lucide-react";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Deletion modal state
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Form inputs
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(5);
  const [menuName, setMenuName] = useState("특선 한우 소고기 라멘 (20,000원)");
  const [content, setContent] = useState("");
  const [password, setPassword] = useState("");

  const menuOptions = [
    "특선 한우 소고기 라멘 (20,000원)",
    "특제 매운 소고기 라멘 (21,000원)",
    "화이트 트러플 비프 쇼유 라멘 (23,000원)",
    "맑은 청탕 소고기 라멘 (19,000원)",
    "직화 차돌 미니 덮밥 (6,000원)",
    "기타 / 전체적인 매장 만족도",
  ];

  // Load reviews from Supabase
  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching reviews:", error);
      } else if (data) {
        setReviews(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Submit review
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!author.trim()) {
      setErrorMsg("작성자 닉네임을 입력해 주세요.");
      return;
    }
    if (!content.trim()) {
      setErrorMsg("후기 내용을 입력해 주세요.");
      return;
    }
    if (!password || password.length < 4) {
      setErrorMsg("후기 삭제 관리를 위한 비밀번호 4자리 이상을 입력해 주세요.");
      return;
    }

    setSubmitting(true);
    try {
      const { data, error } = await supabase.from("reviews").insert([
        {
          author: author.trim(),
          rating,
          menu_name: menuName,
          content: content.trim(),
          password_hash: password.trim(),
        },
      ]).select();

      if (error) {
        throw error;
      }

      setSuccessMsg("소중한 방문 후기가 정상적으로 등록되었습니다!");
      setAuthor("");
      setContent("");
      setPassword("");
      setRating(5);
      setShowForm(false);
      fetchReviews();
    } catch (err: unknown) {
      console.error(err);
      setErrorMsg("후기 등록 중 오류가 발생했습니다. 다시 시도해 주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  // Delete review
  const handleDelete = async () => {
    if (!deletingId || !deletePassword) {
      setDeleteError("비밀번호를 입력해 주세요.");
      return;
    }

    setIsDeleting(true);
    setDeleteError("");

    try {
      // Find review to check password
      const target = reviews.find((r) => r.id === deletingId);
      if (!target || target.password_hash !== deletePassword.trim()) {
        setDeleteError("비밀번호가 일치하지 않습니다.");
        setIsDeleting(false);
        return;
      }

      const { error } = await supabase
        .from("reviews")
        .delete()
        .eq("id", deletingId)
        .eq("password_hash", deletePassword.trim());

      if (error) {
        throw error;
      }

      setReviews((prev) => prev.filter((r) => r.id !== deletingId));
      setDeletingId(null);
      setDeletePassword("");
    } catch (err) {
      console.error(err);
      setDeleteError("삭제 도중 오류가 발생했습니다.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Stats calculation
  const totalReviews = reviews.length;
  const avgRating = totalReviews > 0
    ? (reviews.reduce((acc, cur) => acc + cur.rating, 0) / totalReviews).toFixed(1)
    : "0.0";

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-10">
      {/* Header & Stats Banner */}
      <div className="text-center space-y-3">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
          Guest Feedback
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-stone-100">
          방문 고객 리얼 후기
        </h1>
        <p className="text-stone-400 text-sm sm:text-base max-w-lg mx-auto">
          별도의 회원가입 없이 누구나 솔직한 방문 소감을 남기실 수 있습니다.
        </p>
      </div>

      {/* Stats & Write Action Card */}
      <div className="rounded-3xl bg-stone-900/60 border border-stone-800 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="text-4xl sm:text-5xl font-black text-amber-400 font-mono">
                {avgRating}
              </span>
              <span className="text-stone-500 text-lg">/ 5.0</span>
            </div>
            <div className="flex items-center gap-1 text-amber-400 justify-center md:justify-start mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.round(Number(avgRating))
                      ? "fill-amber-400 text-amber-400"
                      : "text-stone-600"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-stone-400 mt-1">
              총 <strong className="text-stone-200">{totalReviews}개</strong>의 고객 평가
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setShowForm(!showForm);
            setErrorMsg("");
          }}
          className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-stone-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all hover:scale-105 active:scale-95"
        >
          <MessageSquarePlus className="w-5 h-5" />
          <span>{showForm ? "작성창 닫기" : "솔직 후기 작성하기"}</span>
        </button>
      </div>

      {/* Notification messages */}
      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Review Write Form Box */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-stone-900 border border-amber-500/40 p-6 sm:p-8 space-y-6 shadow-2xl transition-all"
        >
          <div className="flex items-center justify-between border-b border-stone-800 pb-4">
            <h3 className="text-lg font-bold text-stone-100 flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              <span>방문 후기 작성 (비회원 간편 등록)</span>
            </h3>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="text-stone-400 hover:text-stone-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Nickname */}
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                작성자 닉네임 <span className="text-amber-400">*</span>
              </label>
              <input
                type="text"
                placeholder="예: 라멘러버"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                maxLength={20}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 placeholder:text-stone-600 focus:outline-none focus:border-amber-500 text-sm"
              />
            </div>

            {/* Menu select */}
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                주문하신 메뉴
              </label>
              <select
                value={menuName}
                onChange={(e) => setMenuName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 focus:outline-none focus:border-amber-500 text-sm"
              >
                {menuOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-2">
              만족도 별점 <span className="text-amber-400">*</span>
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 hover:scale-125 transition-transform"
                >
                  <Star
                    className={`w-7 h-7 ${
                      star <= rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-stone-700 hover:text-stone-500"
                    }`}
                  />
                </button>
              ))}
              <span className="text-sm font-bold text-amber-400 ml-2 font-mono">
                {rating}점 ({rating === 5 ? "최고예요!" : rating === 4 ? "맛있어요" : rating === 3 ? "보통이에요" : "아쉬워요"})
              </span>
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1.5">
              솔직한 방문 후기 <span className="text-amber-400">*</span>
            </label>
            <textarea
              rows={4}
              placeholder="소고기 라멘의 맛, 육수의 진함, 매장 분위기 등 생생한 후기를 남겨주세요."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 placeholder:text-stone-600 focus:outline-none focus:border-amber-500 text-sm leading-relaxed"
            />
          </div>

          {/* Password for deletion */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1.5">
              삭제 비밀번호 (4자리 이상) <span className="text-amber-400">*</span>
            </label>
            <input
              type="password"
              placeholder="본인 확인 및 후기 삭제 시 사용할 4자리 비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              maxLength={12}
              className="w-full sm:w-72 px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 placeholder:text-stone-600 focus:outline-none focus:border-amber-500 text-sm"
            />
            <p className="text-[11px] text-stone-500 mt-1">
              * 별도 로그인 없이 본인 글을 삭제할 때 사용되는 비밀번호입니다.
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-sm font-medium transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-stone-950 font-bold text-sm transition-colors shadow-md shadow-amber-500/20"
            >
              {submitting ? "등록 중..." : "후기 등록하기"}
            </button>
          </div>
        </form>
      )}

      {/* Reviews Feed List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-stone-200 flex items-center justify-between">
          <span>최신 방문 후기 목록</span>
          <span className="text-xs text-stone-500 font-normal">
            최신순 실시간 연동
          </span>
        </h2>

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-32 rounded-2xl bg-stone-900/40 border border-stone-800 animate-pulse"
              />
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-stone-900/40 border border-stone-800 text-stone-500">
            아직 등록된 후기가 없습니다. 첫 번째 후기를 남겨주세요!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-stone-700 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-200 text-sm">
                          {rev.author}
                        </span>
                        <div className="flex items-center gap-0.5 text-amber-400">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                          ))}
                        </div>
                      </div>
                      {rev.menu_name && (
                        <span className="inline-block text-[11px] text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 mt-1">
                          {rev.menu_name}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        setDeletingId(rev.id);
                        setDeletePassword("");
                        setDeleteError("");
                      }}
                      title="후기 삭제"
                      className="text-stone-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-stone-800 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-stone-300 text-sm leading-relaxed whitespace-pre-wrap">
                    {rev.content}
                  </p>
                </div>

                <div className="text-[11px] text-stone-500 pt-3 border-t border-stone-800/80 flex items-center justify-between">
                  <span>{new Date(rev.created_at).toLocaleString("ko-KR")}</span>
                  <span className="text-stone-600 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-stone-500" />
                    비회원 인증 후기
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Password Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl bg-stone-900 border border-stone-700 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-stone-100 text-base">후기 삭제 확인</h4>
              <button
                onClick={() => setDeletingId(null)}
                className="text-stone-400 hover:text-stone-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-stone-400">
              후기 작성 시 등록하셨던 비밀번호를 입력해주세요. 일치할 경우 즉시 삭제됩니다.
            </p>

            {deleteError && (
              <p className="text-xs text-red-400 bg-red-950/50 p-2 rounded border border-red-500/30">
                {deleteError}
              </p>
            )}

            <input
              type="password"
              placeholder="비밀번호 입력"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 placeholder:text-stone-600 focus:outline-none focus:border-amber-500 text-sm"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium"
              >
                취소
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold disabled:opacity-50"
              >
                {isDeleting ? "삭제 중..." : "영구 삭제"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
