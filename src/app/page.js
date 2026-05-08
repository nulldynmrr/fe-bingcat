"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Cat,
  BatteryFull,
  MessageCircle,
  Users,
  BookOpen,
  Flame,
  Star,
  Target,
  Award,
  Edit3,
  Trophy,
  BarChart,
  Bot,
  TrendingUp,
  CheckCircle2,
  Map,
  BarChart2,
  Crown,
} from "lucide-react";

// --- CUSTOM HOOK UNTUK SCROLL REVEAL ---
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-10");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// --- CUSTOM HOOK UNTUK NUMBER COUNTER ---
function AnimatedCounter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const duration = 1800;
          const stepTime = 16;
          const step = target / (duration / stepTime);

          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, stepTime);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div
      ref={ref}
      className="font-['Fredoka',_sans-serif] text-[2.8rem] font-bold mb-1.5 bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent"
    >
      {count.toLocaleString("id-ID")}
      {suffix}
    </div>
  );
}

export default function BingCatLanding() {
  useScrollReveal();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0a1e] text-slate-50 font-['Plus_Jakarta_Sans',_sans-serif] overflow-x-hidden relative selection:bg-violet-500/30">
      {/* --- INLINE STYLES FOR KEYFRAMES (NO CONFIG NEEDED) --- */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        
        .noise-bg::before {
          content: ''; position: fixed; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 0; opacity: 0.4;
        }
        
        @keyframes pulse-orb {
          0% { transform: scale(1) translate(0, 0); opacity: 0.25; }
          100% { transform: scale(1.15) translate(20px, -20px); opacity: 0.35; }
        }
        .animate-pulse-orb { animation: pulse-orb 6s ease-in-out infinite alternate; }
        
        @keyframes float-1 { 0% { transform: translateY(0) rotate(-3deg); } 100% { transform: translateY(-12px) rotate(0deg); } }
        @keyframes float-2 { 0% { transform: translateY(0) rotate(2deg); } 100% { transform: translateY(-10px) rotate(-1deg); } }
        @keyframes float-3 { 0% { transform: translateY(0) rotate(-1deg); } 100% { transform: translateY(-14px) rotate(2deg); } }
        .animate-float-1 { animation: float-1 3s ease-in-out infinite alternate; }
        .animate-float-2 { animation: float-2 3.5s ease-in-out infinite alternate; }
        .animate-float-3 { animation: float-3 4s ease-in-out infinite alternate; }
        
        @keyframes scroll-left { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-scroll { animation: scroll-left 20s linear infinite; }
        
        @keyframes mascot-bounce {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          50% { transform: translateY(-14px) rotate(3deg); }
        }
        .animate-mascot { animation: mascot-bounce 3s ease-in-out infinite; }
      `,
        }}
      />

      <div className="noise-bg" />

      {/* ─── NAVBAR ─── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-6 lg:px-10 py-4 lg:py-5 flex items-center justify-between transition-all duration-300 border-b ${scrolled ? "bg-[#0f0a1e]/90 backdrop-blur-xl border-white/10" : "bg-transparent border-transparent"}`}
      >
        <a
          href="#"
          className="flex items-center gap-2 font-['Fredoka',_sans-serif] text-2xl font-bold"
        >
          <Cat className="w-8 h-8 text-violet-400" />
          <span>
            bing<span className="text-violet-400">Cat</span>
          </span>
        </a>
        <ul className="hidden md:flex gap-8 list-none">
          {["Features", "How It Works", "Gamification", "Testimonials"].map(
            (item) => (
              <li key={item}>
                <a
                  href={`#${item.split(" ")[0].toLowerCase()}`}
                  className="text-slate-400 hover:text-white font-semibold text-sm transition-colors"
                >
                  {item}
                </a>
              </li>
            ),
          )}
        </ul>
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="hidden sm:block px-5 py-2.5 rounded-full border border-white/10 text-sm font-bold hover:border-violet-400 hover:text-violet-400 transition-all"
          >
            Log In
          </a>
          <a
            href="#"
            className="px-5 py-2.5 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white text-sm font-bold shadow-[0_4px_20px_rgba(124,58,237,0.4)] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(124,58,237,0.6)] transition-all flex items-center gap-2"
          >
            🚀 <span className="hidden sm:inline">Start Free</span>
          </a>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center pt-32 pb-20 px-6 lg:px-10 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute w-[600px] h-[600px] rounded-full bg-violet-600 blur-[120px] opacity-30 -top-24 -left-24 animate-pulse-orb" />
          <div
            className="absolute w-[400px] h-[400px] rounded-full bg-orange-500 blur-[120px] opacity-30 top-48 -right-24 animate-pulse-orb"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute w-[300px] h-[300px] rounded-full bg-sky-500 blur-[120px] opacity-30 -bottom-12 left-[40%] animate-pulse-orb"
            style={{ animationDelay: "4s" }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col items-start reveal opacity-0 translate-y-10 transition-all duration-700">
            <div className="inline-flex items-center gap-2 bg-violet-600/15 border border-violet-600/30 rounded-full px-4 py-1.5 text-xs font-bold text-violet-400 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              #1 TOEFL & IELTS App di Indonesia
            </div>

            <h1 className="font-['Fredoka',_sans-serif] text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6">
              Belajar Bahasa Inggris
              <br />
              Jadi <span className="text-orange-500">Seru</span>,<br />
              Skormu Ikut <span className="text-emerald-400">Naik!</span>
            </h1>

            <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-lg">
              bingCat hadir dengan metode gamifikasi seperti Duolingo — tapi
              khusus dirancang untuk membantu kamu lulus TOEFL & IELTS dengan
              skor terbaik. Belajar tiap hari, raih hadiah nyata!
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#"
                className="px-8 py-4 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white font-bold text-base shadow-[0_8px_30px_rgba(124,58,237,0.5)] hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(124,58,237,0.7)] transition-all flex items-center gap-2"
              >
                <Cat className="w-5 h-5" /> Mulai Gratis Sekarang
              </a>
              <a
                href="#how"
                className="px-8 py-4 rounded-full bg-white/5 border border-white/10 font-bold text-base hover:bg-white/10 hover:-translate-y-0.5 transition-all flex items-center gap-2"
              >
                Lihat Demo
              </a>
            </div>

            <div className="flex items-center gap-3 mt-8">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-[#0f0a1e] bg-gradient-to-br from-violet-500 to-orange-400 flex items-center justify-center text-xs"
                  >
                    {["😸", "🙋", "🎓", "🚀"][i]}
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-400 font-semibold">
                Bergabung dengan <strong className="text-white">10.000+</strong>{" "}
                pelajar aktif
              </p>
            </div>
          </div>

          <div className="hidden lg:flex justify-center relative reveal opacity-0 translate-y-10 transition-all duration-700 delay-200">
            <div className="relative w-[320px] h-[580px]">
              <div className="w-full h-full bg-gradient-to-br from-[#1e1040] to-[#2d1b69] rounded-[48px] border-[1.5px] border-white/10 p-5 flex flex-col gap-4 overflow-hidden relative shadow-[0_30px_80px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.03),inset_0_1px_0_rgba(255,255,255,0.1)]">
                <div className="absolute top-[-60px] left-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-violet-600 rounded-full blur-[80px] opacity-30 pointer-events-none" />

                <div className="flex justify-between items-center px-2">
                  <span className="text-[0.7rem] font-bold text-white/40">
                    9:41
                  </span>
                  <span className="text-[0.65rem] font-bold text-violet-400">
                    bingCat
                  </span>
                  <BatteryFull className="w-4 h-4 text-white/60" />
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5">
                  <div className="flex justify-between items-center mb-2 text-[0.7rem] font-bold">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Flame className="w-3 h-3 text-orange-500" /> 12-day
                      streak
                    </span>
                    <span className="text-amber-500 flex items-center gap-1">
                      <Star className="w-3 h-3" /> 650 XP
                    </span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-[65%] bg-gradient-to-r from-violet-600 to-violet-400 rounded-full" />
                  </div>
                </div>

                <div className="bg-violet-600/10 border border-violet-600/40 rounded-[20px] p-4 flex items-center gap-3.5 relative overflow-hidden cursor-pointer hover:-translate-y-0.5 transition-transform">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-transparent pointer-events-none" />
                  <div className="w-11 h-11 rounded-xl bg-violet-600/30 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 text-violet-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[0.6rem] font-bold text-slate-400 uppercase tracking-widest mb-1">
                      Chapter 1
                    </div>
                    <div className="text-sm font-bold truncate mb-2">
                      Communicative Competence
                    </div>
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-full bg-gradient-to-r from-violet-600 to-violet-400 rounded-full" />
                    </div>
                  </div>
                  <Crown className="w-5 h-5 text-amber-400 shrink-0" />
                </div>

                <div className="bg-white/5 border border-white/10 rounded-[20px] p-4 flex items-center gap-3.5 relative overflow-hidden cursor-pointer hover:-translate-y-0.5 transition-transform">
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[0.6rem] font-bold text-slate-400 uppercase tracking-widest mb-1">
                      Chapter 2
                    </div>
                    <div className="text-sm font-bold truncate mb-2">
                      Listening Part B
                    </div>
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden" />
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-[20px] p-4 flex items-center gap-3.5 relative overflow-hidden cursor-pointer hover:-translate-y-0.5 transition-transform">
                  <div className="w-11 h-11 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[0.6rem] font-bold text-slate-400 uppercase tracking-widest mb-1">
                      Chapter 3
                    </div>
                    <div className="text-sm font-bold truncate mb-2">
                      Grammar Section
                    </div>
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden" />
                  </div>
                </div>
              </div>

              <div className="absolute top-10 -right-16 bg-white/95 rounded-2xl p-3 text-[#1e1b4b] text-[0.78rem] font-bold flex items-center gap-2.5 shadow-[0_20px_60px_rgba(0,0,0,0.4)] z-20 animate-float-1 whitespace-nowrap">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center text-white">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[0.65rem] opacity-80 mb-0.5">
                    Current Streak
                  </div>
                  <div className="text-base font-black">12 Days!</div>
                </div>
              </div>

              <div className="absolute bottom-32 -left-20 bg-white/95 rounded-2xl p-3 text-[#1e1b4b] text-[0.78rem] font-bold flex items-center gap-2.5 shadow-[0_20px_60px_rgba(0,0,0,0.4)] z-20 animate-float-2 whitespace-nowrap">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white">
                  <Star className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[0.65rem] opacity-80 mb-0.5">
                    XP Earned
                  </div>
                  <div className="text-base font-black">+50 XP</div>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-10 z-30 animate-mascot text-8xl drop-shadow-[0_10px_30px_rgba(124,58,237,0.5)]">
                😸
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST BAND ─── */}
      <div className="relative z-10 py-5 border-y border-white/10 bg-white/5 overflow-hidden flex">
        <div className="flex gap-16 animate-scroll w-max">
          {[...Array(2)].map((_, i) => (
            <React.Fragment key={i}>
              <div className="flex items-center gap-2.5 text-slate-400 text-sm font-bold whitespace-nowrap">
                <Trophy className="w-5 h-5 text-amber-400" /> TOEFL Preparation
              </div>
              <div className="flex items-center gap-2.5 text-slate-400 text-sm font-bold whitespace-nowrap">
                <Edit3 className="w-5 h-5 text-violet-400" /> IELTS Preparation
              </div>
              <div className="flex items-center gap-2.5 text-slate-400 text-sm font-bold whitespace-nowrap">
                <Target className="w-5 h-5 text-emerald-400" /> Adaptive
                Learning
              </div>
              <div className="flex items-center gap-2.5 text-slate-400 text-sm font-bold whitespace-nowrap">
                <Flame className="w-5 h-5 text-orange-500" /> Daily Streaks
              </div>
              <div className="flex items-center gap-2.5 text-slate-400 text-sm font-bold whitespace-nowrap">
                <Star className="w-5 h-5 text-yellow-400" /> XP & Rewards
              </div>
              <div className="flex items-center gap-2.5 text-slate-400 text-sm font-bold whitespace-nowrap">
                <BarChart className="w-5 h-5 text-sky-400" /> Progress Tracking
              </div>
              <div className="flex items-center gap-2.5 text-slate-400 text-sm font-bold whitespace-nowrap">
                <Bot className="w-5 h-5 text-rose-400" /> AI Tutor
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ─── STATS ─── */}
      <section className="py-20 px-6 lg:px-10 relative z-10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 reveal opacity-0 translate-y-10 transition-all duration-700">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center backdrop-blur-md hover:-translate-y-1.5 hover:border-violet-500/30 transition-all">
            <Users className="w-8 h-8 text-violet-400 mx-auto mb-3" />
            <AnimatedCounter target={10000} suffix="+" />
            <div className="text-sm font-semibold text-slate-400">
              Pelajar Aktif
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center backdrop-blur-md hover:-translate-y-1.5 hover:border-violet-500/30 transition-all">
            <TrendingUp className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
            <AnimatedCounter target={92} suffix="%" />
            <div className="text-sm font-semibold text-slate-400">
              Passing Rate TOEFL
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center backdrop-blur-md hover:-translate-y-1.5 hover:border-violet-500/30 transition-all">
            <CheckCircle2 className="w-8 h-8 text-sky-400 mx-auto mb-3" />
            <AnimatedCounter target={6} />
            <div className="text-sm font-semibold text-slate-400">
              Chapter Lengkap
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center backdrop-blur-md hover:-translate-y-1.5 hover:border-violet-500/30 transition-all">
            <Flame className="w-8 h-8 text-orange-500 mx-auto mb-3" />
            <AnimatedCounter target={365} />
            <div className="text-sm font-semibold text-slate-400">
              Hari Streak Max
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section id="features" className="py-20 px-6 lg:px-10 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 reveal opacity-0 translate-y-10 transition-all duration-700">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-violet-400 bg-violet-600/10 border border-violet-600/20 px-4 py-1.5 rounded-full mb-5">
            ✨ Fitur Unggulan
          </div>
          <h2 className="font-['Fredoka',_sans-serif] text-3xl md:text-5xl font-bold leading-tight mb-4">
            Semua yang Kamu Butuhkan untuk Sukses
          </h2>
          <p className="text-slate-400 leading-relaxed">
            Dirancang dengan metode terbukti, dikemas dalam pengalaman belajar
            yang menyenangkan seperti bermain game.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-[32px] p-8 md:p-10 relative overflow-hidden group hover:-translate-y-2 hover:border-white/20 transition-all reveal opacity-0 translate-y-10 duration-700">
            <div className="absolute top-0 left-0 right-0 h-1 bg-violet-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-14 h-14 rounded-[20px] bg-violet-600/20 flex items-center justify-center mb-6">
              <Map className="w-7 h-7 text-violet-400" />
            </div>
            <h3 className="font-['Fredoka',_sans-serif] text-2xl font-semibold mb-3">
              Learning Path Terstruktur
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-md">
              6 chapter terstruktur dari Communicative Competence hingga Reading
              Comprehension — semua dirancang khusus untuk ujian. Selesaikan
              satu, buka yang berikutnya!
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-white/10 border border-white/10 text-slate-300">
                Chapter-Based
              </span>
              <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-white/10 border border-white/10 text-slate-300">
                Unlockable Content
              </span>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 relative overflow-hidden group hover:-translate-y-2 hover:border-white/20 transition-all reveal opacity-0 translate-y-10 duration-700 delay-100">
            <div className="absolute top-0 left-0 right-0 h-1 bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-14 h-14 rounded-[20px] bg-orange-500/20 flex items-center justify-center mb-6">
              <Bot className="w-7 h-7 text-orange-400" />
            </div>
            <h3 className="font-['Fredoka',_sans-serif] text-xl font-semibold mb-3">
              AI Tutor Personal
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Dapatkan tips dan feedback instan dari AI tutor yang selalu siap
              membantumu. Belajar efisien dari kesalahan.
            </p>
          </div>

          {[
            {
              icon: Target,
              color: "emerald",
              title: "Daily Goal & Streak",
              desc: "Tetap termotivasi dengan target harian XP dan streak yang terjaga.",
            },
            {
              icon: BarChart2,
              color: "amber",
              title: "Progress Tracking",
              desc: "Pantau akurasi, XP total, dan chapter yang sudah selesai.",
            },
            {
              icon: Trophy,
              color: "sky",
              title: "Leaderboard & Rewards",
              desc: "Bersaing dengan teman dan kumpulkan badge eksklusif!",
            },
          ].map((feat, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-[32px] p-8 relative overflow-hidden group hover:-translate-y-2 hover:border-white/20 transition-all reveal opacity-0 translate-y-10 duration-700"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-${feat.color}-500 opacity-0 group-hover:opacity-100 transition-opacity`}
              />
              <div
                className={`w-14 h-14 rounded-[20px] bg-${feat.color}-500/20 flex items-center justify-center mb-6`}
              >
                <feat.icon className={`w-7 h-7 text-${feat.color}-400`} />
              </div>
              <h3 className="font-['Fredoka',_sans-serif] text-xl font-semibold mb-3">
                {feat.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how" className="py-20 px-6 lg:px-10 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 reveal opacity-0 translate-y-10 transition-all duration-700">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-violet-400 bg-violet-600/10 border border-violet-600/20 px-4 py-1.5 rounded-full mb-5">
              🗺️ Cara Kerja
            </div>
            <h2 className="font-['Fredoka',_sans-serif] text-3xl md:text-5xl font-bold">
              Mulai dalam 3 Langkah
            </h2>
          </div>

          <div className="flex flex-col gap-0 relative">
            {[
              {
                num: 1,
                title: "Daftar & Buat Profil",
                desc: "Buat akun gratis dalam hitungan detik. Set daily goal XP kamu dan biarkan bingCat merancang jalur belajar terbaik.",
              },
              {
                num: 2,
                title: "Mulai Chapter Pertama",
                desc: "Kerjakan soal interaktif, kumpulkan XP, dan selesaikan chapter satu per satu. Setiap chapter lebih menantang!",
              },
              {
                num: 3,
                title: "Raih Skor Impianmu!",
                desc: "Dengan latihan konsisten di bingCat, ribuan pelajar membuktikan peningkatan skor signifikan dalam waktu singkat.",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="flex gap-8 py-8 relative reveal opacity-0 translate-y-10 transition-all duration-700"
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                {i !== 2 && (
                  <div className="absolute top-[90px] left-[27px] bottom-[-10px] w-0.5 bg-gradient-to-b from-violet-600 to-violet-600/10 rounded-full" />
                )}
                <div className="w-14 h-14 rounded-[20px] bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center font-['Fredoka',_sans-serif] text-2xl font-bold shadow-[0_8px_24px_rgba(124,58,237,0.4)] shrink-0 z-10">
                  {step.num}
                </div>
                <div className="pt-3">
                  <h3 className="font-['Fredoka',_sans-serif] text-xl font-semibold mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GAMIFICATION ─── */}
      <section
        id="game"
        className="py-20 px-6 lg:px-10 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(124,58,237,0.12)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 relative z-10 items-start">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-violet-400 bg-violet-600/10 border border-violet-600/20 px-4 py-1.5 rounded-full mb-5 reveal opacity-0 translate-y-10 transition-all duration-700">
              🎮 Gamifikasi
            </div>
            <h2 className="font-['Fredoka',_sans-serif] text-3xl md:text-4xl font-bold mb-8 reveal opacity-0 translate-y-10 transition-all duration-700 delay-100">
              Belajar Terasa Seperti Game
            </h2>

            <div className="flex flex-col gap-4">
              {[
                {
                  icon: Flame,
                  color: "orange",
                  title: "Daily Streak",
                  desc: "Belajar setiap hari dan jaga streak-mu. Semakin panjang streak, semakin besar bonus XP!",
                  badge: "🔥 Hot",
                },
                {
                  icon: Star,
                  color: "violet",
                  title: "XP & Level Up",
                  desc: "Kumpulkan XP dari setiap soal yang dijawab benar. Naik level dan tunjukkan kelasmu!",
                  badge: "⭐ Epic",
                },
                {
                  icon: Award,
                  color: "amber",
                  title: "Badges & Achievements",
                  desc: "Koleksi badge eksklusif dari setiap pencapaian. Tunjukkan prestasimu ke teman!",
                  badge: "🏅 Rare",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-3xl p-5 flex items-center gap-5 hover:bg-white/10 hover:translate-x-2 transition-all cursor-default reveal opacity-0 translate-y-10 duration-700"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <card.icon
                    className={`w-8 h-8 text-${card.color}-500 shrink-0`}
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-sm mb-1">{card.title}</h4>
                    <p className="text-xs text-slate-400">{card.desc}</p>
                  </div>
                  <div
                    className={`px-3 py-1.5 rounded-full text-[0.7rem] font-extrabold bg-${card.color}-500/15 text-${card.color}-400 border border-${card.color}-500/30 shrink-0`}
                  >
                    {card.badge}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div className="bg-white/5 border border-white/10 rounded-[32px] p-7 reveal opacity-0 translate-y-10 transition-all duration-700 delay-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-['Fredoka',_sans-serif] text-lg font-semibold flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" /> Leaderboard Minggu
                Ini
              </h3>
              <span className="text-xs font-semibold text-slate-400">
                Top 5
              </span>
            </div>

            <div className="flex flex-col gap-2.5">
              {[
                {
                  rank: 1,
                  name: "Rizky A.",
                  xp: "2,450",
                  style:
                    "bg-gradient-to-br from-amber-400/10 to-amber-500/5 border border-amber-400/20 text-amber-500",
                  av: "from-amber-400 to-amber-600",
                },
                {
                  rank: 2,
                  name: "Siti R.",
                  xp: "2,210",
                  style:
                    "bg-gradient-to-br from-slate-400/10 to-transparent border border-slate-400/10 text-slate-300",
                  av: "from-slate-400 to-slate-600",
                },
                {
                  rank: 3,
                  name: "Budi S.",
                  xp: "1,980",
                  style:
                    "bg-gradient-to-br from-[#c27846]/10 to-transparent border border-[#b46e3c]/10 text-[#c27846]",
                  av: "from-[#c27846] to-[#92400e]",
                },
                {
                  rank: 4,
                  name: "Dewi P.",
                  xp: "1,750",
                  style:
                    "hover:bg-white/5 border border-transparent text-slate-400",
                  av: "from-violet-600 to-violet-400",
                },
                {
                  rank: 5,
                  name: "Ahmad F.",
                  xp: "1,600",
                  style:
                    "hover:bg-white/5 border border-transparent text-slate-400",
                  av: "from-sky-500 to-sky-400",
                },
              ].map((user) => (
                <div
                  key={user.rank}
                  className={`flex items-center gap-4 p-3 rounded-2xl transition-colors ${user.style}`}
                >
                  <div className="font-['Fredoka',_sans-serif] font-bold w-6 text-center">
                    {user.rank}
                  </div>
                  <div
                    className={`w-9 h-9 rounded-full bg-gradient-to-br flex items-center justify-center text-white text-sm ${user.av}`}
                  >
                    {user.name.charAt(0)}
                  </div>
                  <div className="font-bold text-sm flex-1 text-white">
                    {user.name}
                  </div>
                  <div className="text-xs font-bold text-amber-500">
                    {user.xp} XP
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-5 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-slate-400">Posisimu saat ini</span>
              <span className="font-bold text-violet-400">#247 • 450 XP</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 px-6 lg:px-10 relative z-10">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-violet-600/20 to-fuchsia-600/10 border border-violet-500/30 rounded-[48px] p-12 md:p-16 text-center relative overflow-hidden reveal opacity-0 translate-y-10 transition-all duration-700">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-violet-600/20 blur-[80px] rounded-full pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-violet-400 mb-5">
              🚀 Mulai Sekarang
            </div>
            <h2 className="font-['Fredoka',_sans-serif] text-3xl md:text-5xl font-bold mb-4">
              Siap Raih Skor
              <br />
              TOEFL & IELTS Impianmu?
            </h2>
            <p className="text-slate-300 mb-10 max-w-md mx-auto">
              Gratis selamanya. Mulai belajar hari ini bersama bingCat!
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white font-bold text-lg shadow-[0_10px_40px_rgba(124,58,237,0.6)] hover:-translate-y-1 hover:scale-105 transition-all"
            >
              <Cat className="w-6 h-6" /> Daftar Gratis — Mulai Belajar!
            </a>
          </div>

          <div className="absolute -bottom-4 right-8 text-7xl animate-mascot opacity-80 md:opacity-100 pointer-events-none">
            😸
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-white/10 px-10 py-10 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10 bg-[#0f0a1e]">
        <div className="font-['Fredoka',_sans-serif] text-xl font-bold flex items-center gap-2">
          <Cat className="w-6 h-6 text-violet-400" />
          bing<span className="text-violet-400">Cat</span>
        </div>
        <ul className="flex gap-6 list-none text-sm font-semibold text-slate-400">
          <li>
            <a href="#" className="hover:text-white transition-colors">
              Features
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-white transition-colors">
              Pricing
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-white transition-colors">
              Contact
            </a>
          </li>
        </ul>
        <div className="text-xs text-slate-500">
          © 2026 bingCat. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
