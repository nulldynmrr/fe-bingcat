"use client";

import React from "react";
import { Settings, Flame, Zap, Medal, Crown } from "lucide-react";

export default function ProfilePage() {
  return (
    <>
      <main className="flex-1 relative overflow-y-auto no-scrollbar flex flex-col text-slate-800 bg-[#f4f7fa]">
        <div className="relative z-10 w-full max-w-2xl mx-auto px-8 pt-8 pb-32 mt-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
              Profil Saya
            </h1>
            <button className="w-12 h-12 bg-white rounded-2xl border-b-4 border-slate-200 shadow-sm flex items-center justify-center text-slate-400 hover:-translate-y-1 hover:border-b-[6px] active:translate-y-1 active:border-b-0 transition-all">
              <Settings className="w-6 h-6" />
            </button>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col items-center mb-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-violet-100 to-fuchsia-50 opacity-50"></div>

            <div className="relative z-10 w-28 h-28 bg-gradient-to-tr from-violet-500 to-fuchsia-500 rounded-full p-1.5 shadow-xl shadow-violet-200 mb-5 border-4 border-white">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-4xl font-black text-violet-500">
                D
              </div>
              <div className="absolute -bottom-2 -right-2 bg-amber-400 text-white text-xs font-black px-2 py-1 rounded-xl border-2 border-white shadow-sm">
                LV. 8
              </div>
            </div>
            <h2 className="text-2xl font-black text-slate-800 mb-1">
              Dinar Muhammad Akbar
            </h2>
            <p className="text-sm font-bold text-slate-400 mb-4 text-center">
              Telkom University
              <br />
              S1 Informatika
            </p>
            <p className="text-sm font-bold text-violet-500 flex items-center gap-1 bg-violet-50 px-4 py-2 rounded-xl">
              Bergabung sejak April {new Date().getFullYear()}
            </p>
          </div>

          <h3 className="font-extrabold text-slate-800 mb-4 text-lg">
            Statistik
          </h3>
          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="bg-white p-5 rounded-3xl border-b-[6px] border-slate-200 shadow-sm flex flex-col items-start hover:-translate-y-1 transition-transform cursor-default">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                  <Zap className="text-amber-500 w-6 h-6 fill-amber-500" />
                </div>
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">
                  Total XP
                </span>
              </div>
              <span className="text-2xl font-black text-slate-800">2,450</span>
            </div>

            <div className="bg-white p-5 rounded-3xl border-b-[6px] border-slate-200 shadow-sm flex flex-col items-start hover:-translate-y-1 transition-transform cursor-default">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                  <Flame className="text-orange-500 w-6 h-6 fill-orange-500" />
                </div>
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">
                  Hari Streak
                </span>
              </div>
              <span className="text-2xl font-black text-slate-800">12</span>
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <h3 className="font-extrabold text-slate-800 text-lg">
              Pencapaian
            </h3>
            <span className="text-xs font-bold text-violet-500 cursor-pointer hover:text-violet-600">
              Lihat Semua
            </span>
          </div>

          <div className="space-y-4">
            {[
              {
                title: "Pejuang Grammar",
                desc: "Selesaikan 10 modul grammar.",
                progress: 80,
                color: "bg-violet-500",
                icon: <Medal className="text-violet-500 w-6 h-6" />,
                bgIcon: "bg-violet-50",
              },
              {
                title: "Master Vocab",
                desc: "Kuasai 500 kosakata baru.",
                progress: 40,
                color: "bg-emerald-500",
                icon: <Crown className="text-emerald-500 w-6 h-6" />,
                bgIcon: "bg-emerald-50",
              },
            ].map((ach, i) => (
              <div
                key={i}
                className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex gap-5 items-center hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-14 h-14 ${ach.bgIcon} rounded-2xl flex items-center justify-center shrink-0`}
                >
                  {ach.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-end mb-1">
                    <h4 className="text-base font-black text-slate-700">
                      {ach.title}
                    </h4>
                    <span className="text-[10px] font-black text-slate-400">
                      {ach.progress}%
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-400 mb-3">
                    {ach.desc}
                  </p>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${ach.color} rounded-full`}
                      style={{ width: `${ach.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <aside className="w-[320px] bg-transparent border-l border-slate-100 hidden xl:flex flex-col p-6 space-y-6 overflow-y-auto no-scrollbar z-10 relative text-slate-800">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-50">
          <h3 className="font-bold text-slate-800 mb-4">Teman Anda</h3>
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Friend${item}`}
                      alt="Avatar"
                      className="w-full h-full object-cover bg-white"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      Siswa {item}
                    </p>
                    <p className="text-xs font-bold text-slate-400">2400 XP</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 bg-slate-100 text-slate-500 font-bold text-xs py-3 rounded-xl hover:bg-slate-200 transition-colors uppercase tracking-widest">
            Cari Teman
          </button>
        </div>
      </aside>
    </>
  );
}
