"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useParams } from "next/navigation";
import { Map, BookA, Trophy, User, Bot, ChevronLeft } from "lucide-react";
import request from "@/utils/request";

export default function Sidebar() {
  const pathname = usePathname();
  const params = useParams();
  const [userProfile, setUserData] = useState(null);
  const [quizMeta, setQuizMeta] = useState({ total: 0, current: 0 });
  const [answeredIndices, setAnsweredIndices] = useState([]);

  const isQuizPage = pathname?.includes("/quiz/");
  const chapterId = params?.chapterId;
  const currentIdx = parseInt(params?.questionIndex) || 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resProf = await request.get("/user/profile");
        if (resProf.data.status === "success") setUserData(resProf.data.data);

        if (isQuizPage && chapterId) {
          const resMeta = await request.get(`/user/chapters/${chapterId}`);
          if (resMeta.data.status === "success") {
            setQuizMeta({
              total: resMeta.data.data.total_questions,
              current: currentIdx,
            });
          }
          const savedAnswers = sessionStorage.getItem(
            `quiz_${chapterId}_answers`,
          );
          if (savedAnswers) {
            setAnsweredIndices(
              Object.keys(JSON.parse(savedAnswers)).map(Number),
            );
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [pathname, chapterId, currentIdx, isQuizPage]);

  const navItems = [
    { path: "/home", icon: Map, label: "Map" },
    { path: "/learn", icon: BookA, label: "Learning" },
    { path: "/leaderboard", icon: Trophy, label: "Leaderboard" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <aside className="w-[240px] min-w-[240px] bg-white border-r border-slate-100 hidden lg:flex flex-col flex-shrink-0 h-full overflow-y-auto no-scrollbar z-50">
      <div className="p-6 flex items-center gap-3">
        <Image
          src="/assets/logo.png"
          alt="binCat Logo"
          width={40}
          height={40}
        />
        <h1 className="text-xl font-black text-slate-900">binCat</h1>
      </div>

      <nav className="flex-1 px-4 py-2">
        {isQuizPage ? (
          <div className="space-y-6">
            <Link
              href="/home"
              className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-bold text-xs mb-4 px-2"
            >
              <ChevronLeft className="w-4 h-4" /> KELUAR KUIS
            </Link>
            <div className="px-2">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
                Progres Soal
              </p>
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: quizMeta.total || 0 }).map((_, i) => {
                  const num = i + 1;
                  const isCurrent = num === quizMeta.current;
                  const isDone = answeredIndices.includes(num);
                  return (
                    <Link key={num} href={`/learn/quiz/${chapterId}/${num}`}>
                      <div
                        className={`h-10 w-full rounded-xl flex items-center justify-center font-black text-xs transition-all border-2 ${isCurrent ? "bg-violet-600 border-violet-600 text-white" : isDone ? "bg-emerald-500 border-emerald-500 text-white" : "bg-slate-50 border-slate-100 text-slate-400"}`}
                      >
                        {num}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive =
                pathname === item.path || pathname?.startsWith(item.path);
              return (
                <Link key={item.path} href={item.path}>
                  <div
                    className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all font-bold text-sm ${isActive ? "bg-violet-100 text-violet-600" : "text-slate-500 hover:bg-slate-50"}`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </nav>

      {!isQuizPage && (
        <div className="p-4 mt-auto pb-10">
          {" "}
          <div className="relative w-full bg-slate-50 rounded-3xl p-4 text-center mt-12">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-20 h-20">
              <Image
                src="/assets/maskot bincat.png"
                alt="Mascot"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="font-bold text-slate-800 text-xs mt-8">
              {userProfile
                ? `Keep it up, ${userProfile.full_name.split(" ")[0]}!`
                : "Keep going!"}
            </h3>
            <Link href="/tanyaAI" className="block mt-4">
              <button className="w-full bg-violet-600 text-white rounded-xl p-2.5 flex items-center justify-center gap-2 shadow-[0_4px_0_#5b21b6] active:translate-y-1">
                <Bot className="w-4 h-4" />
                <span className="font-bold text-xs uppercase">AI Tutor</span>
              </button>
            </Link>
          </div>
        </div>
      )}
    </aside>
  );
}
