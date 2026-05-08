"use client";

import React, { useState, useEffect } from "react";
import {
  MessageSquare,
  Users,
  Book,
  PenTool,
  BookOpen,
  Check,
  Lock,
  ChevronRight,
  Target,
  Flame,
  Bot,
} from "lucide-react";
import StatRow from "@/components/ui/StatRow";
import request from "@/utils/request";

export default function HomePage() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const response = await request.get("/user/dashboard");
      if (response.data.status === "success") {
        setUserData(response.data.data);
      }
    } catch (error) {
      console.error("Gagal mengambil data dashboard:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const getChapterIcon = (id) => {
    const icons = {
      1: <MessageSquare className="w-6 h-6 text-white" fill="currentColor" />,
      2: <Users className="w-6 h-6 text-white" fill="currentColor" />,
      3: <Book className="w-6 h-6 text-white" fill="currentColor" />,
      4: <span className="text-white font-bold text-2xl">G</span>,
      5: <PenTool className="w-6 h-6 text-white" fill="currentColor" />,
      6: <BookOpen className="w-6 h-6 text-white" fill="currentColor" />,
    };
    return (
      icons[id] || (
        <BookOpen className="w-6 h-6 text-white" fill="currentColor" />
      )
    );
  };

  if (isLoading)
    return (
      <div className="flex-1 flex items-center justify-center font-bold text-violet-500">
        Loading binCat...
      </div>
    );

  const { profile, map_progress, streak } = userData;

  return (
    <>
      <main className="flex-1 relative overflow-y-auto no-scrollbar flex flex-col text-slate-800">
        <div className="relative z-10 px-8 pt-8 pb-32 max-w-2xl mx-auto w-full">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="text-sm font-semibold text-slate-500 mb-1">
                Good morning, {profile.full_name}! 👋
              </p>
              <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight leading-tight">
                Let's improve your
                <br />
                English today!
              </h2>
              <p className="text-slate-500 mt-2 text-sm">
                Choose a chapter and start learning
              </p>
            </div>

            <div className="w-32 h-32 relative">
              <div className="absolute bottom-0 right-0 text-9xl leading-none">
                😸
              </div>
            </div>
          </div>

          <div className="relative flex flex-col items-center gap-6 mt-8">
            <div className="absolute top-10 bottom-10 left-1/2 -translate-x-1/2 w-64 pointer-events-none -z-10">
              <svg
                width="100%"
                height="100%"
                preserveAspectRatio="none"
                className="stroke-slate-200 stroke-[4px]"
                strokeDasharray="10 12"
                fill="none"
              >
                <path d="M 128 0 Q 180 80 128 160 T 128 320 Q 80 400 128 480 T 128 640 Q 180 720 128 800 T 128 960" />
              </svg>
            </div>

            {/* Loop Map Progress dari Database */}
            {map_progress.map((ch, index) => (
              <div
                key={ch.chapter_id}
                className={`relative flex items-center w-full max-w-sm ${index % 2 !== 0 ? "ml-12" : "ml-0"}`}
              >
                <div
                  className={`absolute -left-6 z-20 w-20 h-20 rounded-full flex items-center justify-center border-b-[6px] shadow-lg transition-transform cursor-pointer bg-violet-500 border-violet-600 ${ch.status === "locked" ? "opacity-70 saturate-50" : "hover:-translate-y-1"}`}
                >
                  {getChapterIcon(ch.chapter_id)}
                  <div className="absolute -bottom-2 right-0 w-7 h-7 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center shadow-sm">
                    {ch.status === "completed" ? (
                      <Check
                        className="w-4 h-4 text-emerald-500"
                        strokeWidth={4}
                      />
                    ) : (
                      <Lock className="w-4 h-4 text-slate-300" />
                    )}
                  </div>
                </div>

                <div
                  className={`ml-8 w-full bg-white/90 backdrop-blur-sm border ${ch.status === "completed" ? "border-violet-200 shadow-[0_0_20px_rgba(139,92,246,0.15)]" : "border-slate-100 shadow-sm"} rounded-3xl p-5 pl-10 relative`}
                >
                  {ch.status === "completed" && (
                    <span className="absolute top-2 right-4 text-xl">👑</span>
                  )}
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Chapter {ch.chapter_id}
                  </p>
                  <h4 className="font-bold text-slate-800 text-sm leading-snug mb-3 pr-6">
                    Materi Bab {ch.chapter_id}
                  </h4>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${ch.status === "completed" ? "bg-violet-500" : "bg-slate-300"}`}
                        style={{ width: `${ch.progress_percent}%` }}
                      ></div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">
                      {ch.progress_percent}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <aside className="w-[320px] bg-transparent border-l border-slate-100 hidden xl:flex flex-col p-6 space-y-6 overflow-y-auto no-scrollbar z-10 relative text-slate-800">
        {/* Daily Goal Section */}
        <div className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-50">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800">Daily Goal</h3>
            <button className="text-xs font-bold text-violet-500 hover:text-violet-600">
              Edit
            </button>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke="#f1f5f9"
                  strokeWidth="12"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="12"
                  strokeDasharray="351"
                  strokeDashoffset={351 - (351 * Math.min(profile.xp, 15)) / 15}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Target className="w-5 h-5 text-slate-300 mb-1" />
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-slate-800">
                    {profile.xp > 15 ? 15 : profile.xp}
                  </span>
                  <span className="text-xs font-bold text-slate-400">/ 15</span>
                </div>
                <span className="text-[10px] font-bold text-slate-400">XP</span>
              </div>
            </div>
            <p className="mt-4 text-xs font-bold text-emerald-500 flex items-center gap-1">
              {profile.xp >= 15 ? "Goal completed! 🎉" : "Keep going! 💪"}
            </p>
          </div>
        </div>

        {/* Current Streak Section (Real dari Database) */}
        <div className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-50">
          <h3 className="font-bold text-slate-800 mb-4">Current Streak</h3>
          <div className="flex items-end gap-2 mb-6">
            <Flame className="w-8 h-8 text-orange-500 fill-orange-500" />
            <span className="text-3xl font-black text-slate-800 leading-none">
              {streak.count}
            </span>
            <span className="text-sm font-bold text-slate-400 mb-1">days</span>
          </div>
          <div className="flex justify-between w-full">
            {streak.checklist.map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <span className="text-[10px] font-bold text-slate-400">
                  {item.day}
                </span>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-white shadow-sm ${item.completed ? "bg-emerald-500 shadow-emerald-200" : "bg-slate-100 text-slate-300"}`}
                >
                  <Check className="w-4 h-4" strokeWidth={3} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Your Stats Section (Real dari Profile) */}
        <div className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-50">
          <h3 className="font-bold text-slate-800 mb-4">Your Stats</h3>
          <div className="space-y-4">
            <StatRow
              label="Total XP"
              value={profile.xp.toLocaleString()}
              color="text-violet-500"
            />
            <StatRow
              label="Current Level"
              value={`Level ${profile.level}`}
              color="text-slate-800"
            />
            <StatRow label="Gems" value={profile.gems} color="text-blue-500" />
            <StatRow
              label="Status"
              value={profile.streak_count > 0 ? "🔥 On Fire" : "💤 Chilling"}
              color="text-emerald-500"
            />
          </div>
        </div>

        <div className="bg-violet-50 rounded-3xl p-6 border border-violet-100 relative">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="font-bold text-violet-800 text-sm">
              Tip from AI Tutor
            </h3>
            <div className="bg-violet-600 rounded-lg p-1 text-white ml-auto">
              <Bot className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xs text-violet-900 leading-relaxed mb-4 font-medium">
            Keep up your {streak.count} day streak,{" "}
            {profile.full_name.split(" ")[0]}! You're doing great.
          </p>
          <button className="w-full bg-white text-violet-700 font-bold text-xs py-3 rounded-xl border border-violet-100 flex items-center justify-center gap-2 hover:bg-violet-100 transition-colors">
            Let's practice! <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </aside>
    </>
  );
}
