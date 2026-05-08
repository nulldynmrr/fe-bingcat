"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  Flame,
  Zap,
  Medal,
  Crown,
  UserPlus,
  Search,
} from "lucide-react";
import request from "@/utils/request";
import StatRow from "@/components/ui/StatRow";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await request.get("/user/profile");
        if (response.data.status === "success") {
          setProfile(response.data.data);
        }
      } catch (error) {
        console.error("Gagal mengambil data profil:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#f4f7fa]">
        <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!profile) return null;

  const joinDate = new Date(profile.created_at);
  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const formattedDate = `${monthNames[joinDate.getMonth()]} ${joinDate.getFullYear()}`;

  return (
    <>
      <main className="flex-1 relative overflow-y-auto no-scrollbar flex flex-col text-slate-800 bg-[#f4f7fa]">
        <div className="relative z-10 w-full max-w-2xl mx-auto px-8 pt-8 pb-32 mt-4">
          <div className="flex justify-between items-center mb-8 text-slate-800">
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
              Profil Saya
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col items-center mb-8 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-violet-100 to-fuchsia-50 opacity-50"></div>

            <div className="relative z-10 w-28 h-28 bg-gradient-to-tr rounded-full p-1.5 shadow-xl shadow-violet-200 mb-5 border-4 border-white">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-4xl font-black text-violet-500 overflow-hidden">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.full_name}`}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-amber-400 text-white text-xs font-black px-2 py-1 rounded-xl border-2 border-white shadow-sm">
                LV. {profile.level}
              </div>
            </div>

            <h2 className="text-2xl font-black text-slate-800 mb-1">
              {profile.full_name}
            </h2>
            <p className="text-sm font-bold text-slate-400 mb-4 text-center">
              {profile.university}
              <br />
              {profile.major}
            </p>
            <p className="text-sm font-bold text-violet-500 flex items-center gap-1 bg-violet-50 px-4 py-2 rounded-xl">
              Bergabung sejak {formattedDate}
            </p>
          </motion.div>

          <h3 className="font-extrabold text-slate-800 mb-4 text-lg">
            Statistik
          </h3>
          <div className="grid grid-cols-2 gap-4 mb-10 text-slate-800">
            <div className="bg-white p-5 rounded-3xl border-b-[6px] border-slate-200 shadow-sm flex flex-col items-start hover:-translate-y-1 transition-transform cursor-default">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                  <Zap className="text-amber-500 w-6 h-6 fill-amber-500" />
                </div>
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">
                  Total XP
                </span>
              </div>
              <span className="text-2xl font-black text-slate-800">
                {profile.xp.toLocaleString()}
              </span>
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
              <span className="text-2xl font-black text-slate-800">
                {profile.streak_count}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center mb-4 text-slate-800">
            <h3 className="font-extrabold text-slate-800 text-lg">
              Pencapaian
            </h3>
            <span className="text-xs font-bold text-violet-500 cursor-pointer hover:text-violet-600">
              Lihat Semua
            </span>
          </div>

          <div className="space-y-4 text-slate-800">
            {profile.achievements.map((ach, i) => (
              <div
                key={i}
                className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex gap-5 items-center hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-14 h-14 ${i % 2 === 0 ? "bg-violet-50" : "bg-emerald-50"} rounded-2xl flex items-center justify-center shrink-0`}
                >
                  {i % 2 === 0 ? (
                    <Medal className="text-violet-500 w-6 h-6" />
                  ) : (
                    <Crown className="text-emerald-500 w-6 h-6" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-end mb-1">
                    <h4 className="text-base font-black text-slate-700">
                      {ach.title}
                    </h4>
                    <span className="text-[10px] font-black text-slate-400">
                      {Math.round(ach.progress_percent)}%
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-400 mb-3">
                    {ach.description}
                  </p>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${i % 2 === 0 ? "bg-violet-500" : "bg-emerald-500"} rounded-full transition-all duration-1000`}
                      style={{ width: `${ach.progress_percent}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <aside className="w-[320px] bg-transparent border-l border-slate-100 hidden xl:flex flex-col p-6 space-y-6 overflow-y-auto no-scrollbar z-10 relative text-slate-800 bg-[#f4f7fa]">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-50 mt-4 text-slate-800">
          <h3 className="font-bold text-slate-800 mb-4">Teman Kampus</h3>
          <div className="flex flex-col gap-4">
            {profile.friends && profile.friends.length > 0 ? (
              profile.friends.map((friend) => (
                <div
                  key={friend.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden border border-slate-50">
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${friend.full_name}`}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        {friend.full_name.split(" ")[0]}
                      </p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                        Level {friend.level}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-black text-violet-500 bg-violet-50 px-2 py-1 rounded-lg">
                    {friend.xp.toLocaleString()} XP
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs font-bold text-slate-400 text-center py-4 italic">
                Belum ada teman dari {profile.university}
              </p>
            )}
          </div>
          <button className="w-full mt-6 bg-slate-100 text-slate-500 font-bold text-xs py-3 rounded-xl hover:bg-slate-200 transition-colors uppercase tracking-widest flex items-center justify-center gap-2">
            <Search className="w-3.5 h-3.5" /> Cari Teman
          </button>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-50 text-slate-800">
          <h3 className="font-bold text-slate-800 mb-4">Statistik Global</h3>
          <StatRow
            label="Total XP Akumulasi"
            value={profile.xp.toLocaleString()}
            color="text-violet-500"
          />
          <StatRow
            label="Liga Saat Ini"
            value="Liga Mahasiswa"
            color="text-slate-800"
          />
        </div>
      </aside>
    </>
  );
}
