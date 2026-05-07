"use client";

import React from "react";
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

const chapters = [
  {
    id: 1,
    chapter: "Chapter 1",
    title: "Communicative Competence – Part A",
    progress: 100,
    status: "completed",
    color: "bg-violet-500",
    shadow: "border-violet-600",
    icon: <MessageSquare className="w-6 h-6 text-white" fill="currentColor" />,
    indent: "ml-0",
  },
  {
    id: 2,
    chapter: "Chapter 2",
    title: "Communicative Competence – Part B",
    progress: 0,
    status: "locked",
    color: "bg-emerald-400",
    shadow: "border-emerald-500",
    icon: <Users className="w-6 h-6 text-white" fill="currentColor" />,
    indent: "ml-12",
  },
  {
    id: 3,
    chapter: "Chapter 3",
    title: "Communicative Competence – Part C",
    progress: 0,
    status: "locked",
    color: "bg-amber-400",
    shadow: "border-amber-500",
    icon: <Book className="w-6 h-6 text-white" fill="currentColor" />,
    indent: "ml-0",
  },
  {
    id: 4,
    chapter: "Chapter 4",
    title: "Grammar – Part A",
    progress: 0,
    status: "locked",
    color: "bg-blue-400",
    shadow: "border-blue-500",
    icon: <span className="text-white font-bold text-2xl">G</span>,
    indent: "ml-12",
  },
  {
    id: 5,
    chapter: "Chapter 5",
    title: "Grammar – Part B",
    progress: 0,
    status: "locked",
    color: "bg-rose-400",
    shadow: "border-rose-500",
    icon: <PenTool className="w-6 h-6 text-white" fill="currentColor" />,
    indent: "ml-0",
  },
  {
    id: 6,
    chapter: "Chapter 6",
    title: "Reading Comprehension",
    progress: 0,
    status: "locked",
    color: "bg-violet-500",
    shadow: "border-violet-600",
    icon: <BookOpen className="w-6 h-6 text-white" fill="currentColor" />,
    indent: "ml-12",
  },
];

export default function HomePage() {
  return (
    <>
      <main className="flex-1 relative overflow-y-auto no-scrollbar flex flex-col text-slate-800">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-gradient-to-b from-blue-50/50 to-[#f4f7fa]">
          <div className="absolute top-[200px] -left-[10%] w-[120%] h-[500px] bg-gradient-to-b from-green-100/40 to-transparent rounded-[100%] blur-3xl"></div>
        </div>

        <div className="relative z-10 px-8 pt-8 pb-32 max-w-2xl mx-auto w-full">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="text-sm font-semibold text-slate-500 mb-1">
                Good morning, Rizky! 👋
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

            {chapters.map((ch) => (
              <div
                key={ch.id}
                className={`relative flex items-center w-full max-w-sm ${ch.indent}`}
              >
                <div
                  className={`absolute -left-6 z-20 w-20 h-20 rounded-full flex items-center justify-center border-b-[6px] shadow-lg transition-transform cursor-pointer ${ch.color} ${ch.shadow} ${
                    ch.status === "locked"
                      ? "opacity-70 saturate-50"
                      : "hover:-translate-y-1"
                  }`}
                >
                  {ch.icon}

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
                  className={`ml-8 w-full bg-white/90 backdrop-blur-sm border ${
                    ch.status === "completed"
                      ? "border-violet-200 shadow-[0_0_20px_rgba(139,92,246,0.15)]"
                      : "border-slate-100 shadow-sm"
                  } rounded-3xl p-5 pl-10 relative`}
                >
                  {ch.status === "completed" && (
                    <span className="absolute top-2 right-4 text-xl">👑</span>
                  )}

                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    {ch.chapter}
                  </p>
                  <h4 className="font-bold text-slate-800 text-sm leading-snug mb-3 pr-6">
                    {ch.title}
                  </h4>

                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          ch.status === "completed"
                            ? "bg-violet-500"
                            : "bg-slate-300"
                        }`}
                        style={{ width: `${ch.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">
                      {ch.progress}%
                    </span>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-8 bg-white border border-slate-100 shadow-sm rounded-3xl p-4 flex items-center justify-between w-full max-w-sm cursor-pointer hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <div className="text-3xl">🧰</div>
                <span className="font-semibold text-sm text-slate-700 w-40">
                  Complete chapters to unlock rewards!
                </span>
              </div>
              <ChevronRight className="text-slate-400 w-5 h-5" />
            </div>
          </div>
        </div>
      </main>

      <aside className="w-[320px] bg-transparent border-l border-slate-100 hidden xl:flex flex-col p-6 space-y-6 overflow-y-auto no-scrollbar z-10 relative text-slate-800">
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
                  strokeDashoffset="0"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Target className="w-5 h-5 text-slate-300 mb-1" />
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-slate-800">15</span>
                  <span className="text-xs font-bold text-slate-400">/ 15</span>
                </div>
                <span className="text-[10px] font-bold text-slate-400">XP</span>
              </div>
            </div>
            <p className="mt-4 text-xs font-bold text-emerald-500 flex items-center gap-1">
              Goal completed! 🎉
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-50">
          <h3 className="font-bold text-slate-800 mb-4">Current Streak</h3>
          <div className="flex items-end gap-2 mb-6">
            <Flame className="w-8 h-8 text-orange-500 fill-orange-500" />
            <span className="text-3xl font-black text-slate-800 leading-none">
              12
            </span>
            <span className="text-sm font-bold text-slate-400 mb-1">days</span>
          </div>
          <div className="flex justify-between w-full">
            {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <span className="text-[10px] font-bold text-slate-400">
                  {day}
                </span>
                {i < 5 ? (
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-sm shadow-emerald-200">
                    <Check className="w-4 h-4" strokeWidth={3} />
                  </div>
                ) : i === 5 ? (
                  <div className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center text-white shadow-sm shadow-amber-200">
                    <Check className="w-4 h-4" strokeWidth={3} />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-300">
                    <Check className="w-4 h-4" strokeWidth={3} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-50">
          <h3 className="font-bold text-slate-800 mb-4">Your Stats</h3>
          <div className="space-y-4">
            <StatRow label="Total XP" value="1,250" color="text-violet-500" />
            <StatRow
              label="Chapters Done"
              value="1 / 6"
              color="text-slate-800"
            />
            <StatRow
              label="Questions Answered"
              value="40"
              color="text-blue-500"
            />
            <StatRow label="Accuracy" value="78%" color="text-emerald-500" />
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
            Try to review your incorrect answers. It's the fastest way to
            improve!
          </p>
          <button className="w-full bg-white text-violet-700 font-bold text-xs py-3 rounded-xl border border-violet-100 flex items-center justify-center gap-2 hover:bg-violet-100 transition-colors">
            Let's practice! <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </aside>
    </>
  );
}
