"use client";

import React from "react";
import { motion } from "framer-motion";
import { Trophy, Crown, ShieldAlert, TrendingUp, Flame } from "lucide-react";

export default function LeaderboardPage() {
  const otherUsers = [
    { name: "Akmal", xp: 1750, rank: 4, isMe: false },
    { name: "Revi", xp: 1600, rank: 5, isMe: false },
    { name: "Nafisa", xp: 1420, rank: 6, isMe: false },
    { name: "Fadla", xp: 1300, rank: 7, isMe: false },
  ];

  return (
    <>
      <main className="flex-1 relative overflow-y-auto no-scrollbar flex flex-col text-slate-800">
        <div className="relative z-10 w-full max-w-2xl mx-auto px-8 pt-8 pb-32 mt-4 flex flex-col items-center">
          <div className="flex flex-col items-center mb-10 w-full">
            <Trophy className="w-12 h-12 text-yellow-500 fill-yellow-400 mb-3" />
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
              Liga Mahasiswa
            </h1>
            <p className="text-slate-500 text-sm font-bold mt-1 bg-white px-4 py-1.5 rounded-xl shadow-sm border border-slate-100">
              Top 3 dipromosikan ke Liga berikutnya!
            </p>
          </div>

          <div className="flex items-end justify-center gap-2 w-full max-w-md mb-12 h-64 mt-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center w-1/3 relative"
            >
              <div className="w-14 h-14 bg-slate-200 rounded-full border-4 border-white mb-3 overflow-hidden shadow-md z-10">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Lina"
                  alt="Lina"
                  className="w-full h-full object-cover bg-white"
                />
              </div>
              <div className="w-full h-32 bg-slate-200 rounded-t-3xl flex flex-col items-center justify-start pt-4 border-x-2 border-t-[6px] border-slate-300">
                <span className="font-black text-slate-600 text-sm truncate w-full text-center px-1">
                  Lina
                </span>
                <span className="text-[11px] font-bold text-slate-500 mt-1">
                  2,100 XP
                </span>
                <span className="text-4xl font-black text-slate-300/50 mt-auto mb-2">
                  2
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex flex-col items-center w-[40%] relative z-10"
            >
              <Crown className="text-yellow-500 w-10 h-10 mb-2 animate-bounce fill-yellow-400 drop-shadow-md" />
              <div className="w-20 h-20 bg-violet-100 rounded-full border-4 border-white mb-3 overflow-hidden shadow-xl">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Dinar"
                  alt="Dinar"
                  className="w-full h-full object-cover bg-white"
                />
              </div>
              <div className="w-full h-44 bg-violet-500 rounded-t-[2.5rem] flex flex-col items-center justify-start pt-5 border-x-2 border-t-[8px] border-violet-400 shadow-[0_-10px_30px_rgba(139,92,246,0.3)] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
                <span className="font-black text-white text-base truncate w-full text-center px-1 relative z-10">
                  Dinar
                </span>
                <span className="text-xs font-bold text-violet-200 mt-1 relative z-10">
                  2,450 XP
                </span>
                <span className="text-6xl font-black text-violet-600/30 mt-auto mb-4 relative z-10">
                  1
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-center w-1/3 relative"
            >
              <div className="w-14 h-14 bg-orange-100 rounded-full border-4 border-white mb-3 overflow-hidden shadow-md z-10">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Rafi"
                  alt="Rafi"
                  className="w-full h-full object-cover bg-white"
                />
              </div>
              <div className="w-full h-24 bg-orange-100 rounded-t-3xl flex flex-col items-center justify-start pt-4 border-x-2 border-t-[6px] border-orange-200">
                <span className="font-black text-orange-700 text-sm truncate w-full text-center px-1">
                  Rafi
                </span>
                <span className="text-[11px] font-bold text-orange-500 mt-1">
                  1,850 XP
                </span>
                <span className="text-4xl font-black text-orange-200/60 mt-auto mb-1">
                  3
                </span>
              </div>
            </motion.div>
          </div>

          <div className="w-full space-y-3">
            {otherUsers.map((user) => (
              <div
                key={user.rank}
                className="bg-white p-4 rounded-2xl border-b-[4px] border-slate-200 flex items-center justify-between hover:-translate-y-1 hover:shadow-md transition-all cursor-default"
              >
                <div className="flex items-center gap-5">
                  <span className="font-black text-slate-400 w-4 text-center">
                    {user.rank}
                  </span>
                  <div className="w-12 h-12 bg-slate-100 rounded-full overflow-hidden border-2 border-slate-50 shadow-inner">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                      alt={user.name}
                      className="w-full h-full object-cover bg-slate-50"
                    />
                  </div>
                  <span className="font-black text-slate-700 text-base">
                    {user.name}
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

      <aside className="w-[320px] bg-transparent border-l border-slate-100 hidden xl:flex flex-col p-6 space-y-6 overflow-y-auto no-scrollbar z-10 relative text-slate-800">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
              <ShieldAlert className="text-violet-600 w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800">Zona Promosi</h3>
          </div>
          <p className="text-sm font-bold text-slate-500 mb-4 leading-relaxed">
            Anda berada di posisi promosi! Pertahankan peringkat 3 besar untuk
            naik ke{" "}
            <span className="text-violet-600 font-black">Liga Ruby</span>.
          </p>
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
            <div className="bg-emerald-400 h-full w-[85%] rounded-full"></div>
          </div>
          <p className="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-widest text-center">
            Berakhir dalam 2 hari
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <TrendingUp className="text-blue-500 w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800">Aktivitas Liga</h3>
          </div>
          <ul className="space-y-4">
            <li className="flex gap-3 items-center">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <span className="text-emerald-600 font-black text-[10px]">
                  UP
                </span>
              </div>
              <p className="text-xs font-bold text-slate-500">
                <span className="text-slate-800">Akmal</span> naik ke peringkat
                4!
              </p>
            </li>
            <li className="flex gap-3 items-center">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
              </div>
              <p className="text-xs font-bold text-slate-500">
                <span className="text-slate-800">Lina</span> baru saja mendapat
                50 XP.
              </p>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
