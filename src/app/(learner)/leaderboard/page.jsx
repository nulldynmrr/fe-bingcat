"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Crown,
  ShieldAlert,
  TrendingUp,
  Flame,
  Flag,
  Zap,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import request from "@/utils/request";
import StatRow from "@/components/ui/StatRow";

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await request.get("/user/leaderboard");
        if (response.data.status === "success") {
          setLeaderboard(response.data.data);
        }
      } catch (error) {
        console.error("Gagal memuat leaderboard:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#f4f7fa]">
        <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const isRaceNotStarted =
    leaderboard.length === 0 || (leaderboard[0] && leaderboard[0].xp === 0);

  if (isRaceNotStarted) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center p-8 bg-[#f4f7fa] overflow-hidden">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center max-w-sm"
        >
          <div className="relative w-48 h-48 mx-auto mb-8">
            <div className="absolute inset-0 bg-violet-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <Image
              src="/assets/maskot bincat.png"
              alt="Race Start"
              width={192}
              height={192}
              priority
              className="relative z-10 drop-shadow-2xl"
            />
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -right-4 bottom-4 bg-emerald-500 p-3 rounded-2xl shadow-lg border-2 border-white"
            >
              <Flag className="w-6 h-6 text-white fill-white" />
            </motion.div>
          </div>

          <h1 className="text-3xl font-black text-slate-800 mb-3 uppercase tracking-tighter leading-none">
            BELUM ADA <br />
            YANG START!
          </h1>
          <p className="text-slate-500 font-bold mb-8 leading-snug text-sm px-4">
            Lintasan masih kosong melompong, Meow! Jadilah orang pertama yang
            mengumpulkan XP hari ini.
          </p>

          <Link href="/home">
            <button className="w-full py-4 bg-violet-600 text-white rounded-[2rem] font-black text-lg shadow-[0_6px_0_#4c1d95] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-3">
              <Zap className="w-5 h-5 fill-current text-amber-300" /> GAS
              SEKARANG!
            </button>
          </Link>
        </motion.div>
      </main>
    );
  }

  const top3 = leaderboard.slice(0, 3);
  const others = leaderboard.slice(3);
  const rank1 = top3[0];
  const rank2 = top3[1];
  const rank3 = top3[2];

  return (
    <>
      <main className="flex-1 relative overflow-y-auto no-scrollbar flex flex-col text-slate-800 bg-[#f4f7fa]">
        <div className="relative z-10 w-full max-w-2xl mx-auto px-8 pt-8 pb-32 mt-4 flex flex-col items-center text-slate-800">
          <div className="flex flex-col items-center mb-10 w-full">
            <Trophy className="w-12 h-12 text-yellow-500 fill-yellow-400 mb-3" />
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
              {rank1?.league || "Liga Mahasiswa"}
            </h1>
            <p className="text-slate-500 text-sm font-bold mt-1 bg-white px-4 py-1.5 rounded-xl shadow-sm border border-slate-100">
              Top 3 dipromosikan ke Liga berikutnya!
            </p>
          </div>

          <div className="flex items-end justify-center gap-2 w-full max-w-md mb-12 h-64 mt-8">
            {rank2 && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center w-1/3 relative"
              >
                <div className="w-14 h-14 bg-slate-200 rounded-full border-4 border-white mb-3 overflow-hidden shadow-md z-10">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${rank2.full_name}`}
                    alt={rank2.full_name}
                    className="w-full h-full object-cover bg-white"
                  />
                </div>
                <div className="w-full h-32 bg-slate-200 rounded-t-3xl flex flex-col items-center justify-start pt-4 border-x-2 border-t-[6px] border-slate-300">
                  <span className="font-black text-slate-600 text-sm truncate w-full text-center px-2">
                    {rank2.full_name.split(" ")[0]}
                  </span>
                  <span className="text-[11px] font-bold text-slate-500 mt-1">
                    {rank2.xp.toLocaleString()} XP
                  </span>
                  <span className="text-4xl font-black text-slate-300/50 mt-auto mb-2">
                    2
                  </span>
                </div>
              </motion.div>
            )}

            {rank1 && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex flex-col items-center w-[40%] relative z-10"
              >
                <Crown className="text-yellow-500 w-10 h-10 mb-2 animate-bounce fill-yellow-400 drop-shadow-md" />
                <div className="w-20 h-20 bg-violet-100 rounded-full border-4 border-white mb-3 overflow-hidden shadow-xl">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${rank1.full_name}`}
                    alt={rank1.full_name}
                    className="w-full h-full object-cover bg-white"
                  />
                </div>
                <div className="w-full h-44 bg-violet-500 rounded-t-[2.5rem] flex flex-col items-center justify-start pt-5 border-x-2 border-t-[8px] border-violet-400 shadow-[0_-10px_30px_rgba(139,92,246,0.3)] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
                  <span className="font-black text-white text-base truncate w-full text-center px-2 relative z-10">
                    {rank1.full_name.split(" ")[0]}
                  </span>
                  <span className="text-xs font-bold text-violet-200 mt-1 relative z-10">
                    {rank1.xp.toLocaleString()} XP
                  </span>
                  <span className="text-6xl font-black text-violet-600/30 mt-auto mb-4 relative z-10">
                    1
                  </span>
                </div>
              </motion.div>
            )}

            {rank3 && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col items-center w-1/3 relative"
              >
                <div className="w-14 h-14 bg-orange-100 rounded-full border-4 border-white mb-3 overflow-hidden shadow-md z-10">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${rank3.full_name}`}
                    alt={rank3.full_name}
                    className="w-full h-full object-cover bg-white"
                  />
                </div>
                <div className="w-full h-24 bg-orange-100 rounded-t-3xl flex flex-col items-center justify-start pt-4 border-x-2 border-t-[6px] border-orange-200">
                  <span className="font-black text-orange-700 text-sm truncate w-full text-center px-2">
                    {rank3.full_name.split(" ")[0]}
                  </span>
                  <span className="text-[11px] font-bold text-orange-500 mt-1">
                    {rank3.xp.toLocaleString()} XP
                  </span>
                  <span className="text-4xl font-black text-orange-200/60 mt-auto mb-1">
                    3
                  </span>
                </div>
              </motion.div>
            )}
          </div>

          <div className="w-full space-y-3">
            {others.map((user) => (
              <div
                key={user.id}
                className="bg-white p-4 rounded-2xl border-b-[4px] border-slate-200 flex items-center justify-between hover:-translate-y-1 hover:shadow-md transition-all cursor-default"
              >
                <div className="flex items-center gap-5">
                  <span className="font-black text-slate-400 w-4 text-center">
                    {user.rank}
                  </span>
                  <div className="w-12 h-12 bg-slate-100 rounded-full overflow-hidden border-2 border-slate-50 shadow-inner">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.full_name}`}
                      alt={user.full_name}
                      className="w-full h-full object-cover bg-slate-50"
                    />
                  </div>
                  <span className="font-black text-slate-700 text-base">
                    {user.full_name}
                  </span>
                </div>
                <span className="font-bold text-slate-400 text-sm bg-slate-50 px-3 py-1.5 rounded-xl">
                  {user.xp.toLocaleString()} XP
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>

      <aside className="w-[320px] bg-transparent border-l border-slate-100 hidden xl:flex flex-col p-6 space-y-6 overflow-y-auto no-scrollbar z-10 relative text-slate-800 bg-[#f4f7fa]">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-50 text-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
              <ShieldAlert className="text-violet-600 w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800">Zona Promosi</h3>
          </div>
          <p className="text-sm font-bold text-slate-500 mb-4 leading-relaxed">
            Peringkat 3 besar akan naik ke liga berikutnya setiap minggu!
            Kumpulkan XP sebanyak mungkin.
          </p>
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
            <div className="bg-emerald-400 h-full w-[100%] rounded-full"></div>
          </div>
          <p className="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-widest text-center">
            Peringkat Terakhir: Top 20
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-50 text-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <TrendingUp className="text-blue-500 w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800">Tips Peringkat</h3>
          </div>
          <ul className="space-y-4">
            <li className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 text-slate-800">
                <span className="text-emerald-600 font-black text-[10px]">
                  FIX
                </span>
              </div>
              <p className="text-xs font-bold text-slate-500 leading-tight">
                Selesaikan bab dengan skor sempurna untuk mendapatkan bonus XP
                ekstra.
              </p>
            </li>
            <li className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
              </div>
              <p className="text-xs font-bold text-slate-500 leading-tight">
                Pertahankan Streak untuk menjaga semangat belajarmu setiap hari.
              </p>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
