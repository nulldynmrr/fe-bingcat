"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Map, BookA, Trophy, User, Bot } from "lucide-react";
import request from "@/utils/request";

export default function Sidebar() {
  const pathname = usePathname();
  const [userProfile, setUserData] = useState(null);

  const fetchShortProfile = async () => {
    try {
      const response = await request.get("/user/profile");
      if (response.data.status === "success") {
        setUserData(response.data.data);
      }
    } catch (error) {
      console.error("Gagal sinkronisasi profil di sidebar:", error);
    }
  };

  useEffect(() => {
    fetchShortProfile();
  }, []);

  const navItems = [
    { path: "/home", icon: Map, label: "Map" },
    { path: "/learn", icon: BookA, label: "Learning" },
    { path: "/leaderboard", icon: Trophy, label: "Leaderboard" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <aside className="w-[240px] min-w-[240px] bg-white border-r border-slate-100 hidden lg:flex flex-col flex-shrink-0 h-full overflow-y-auto no-scrollbar z-20">
      <div className="p-6 flex items-center gap-3">
        <div className="relative w-12 h-12 flex-shrink-0">
          <Image
            src="/assets/logo.png"
            alt="binCat Logo"
            width={48}
            height={48}
            className="object-contain"
            priority
          />
        </div>
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">
            binCat
          </h1>
        </div>
      </div>

      <nav className="flex-1 px-4 py-2 space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.path || pathname?.startsWith(item.path);
          return (
            <Link key={item.path} href={item.path}>
              <div
                className={`flex items-center gap-4 px-4 py-3 rounded-2xl cursor-pointer transition-all font-bold text-sm ${
                  isActive
                    ? "bg-violet-100 text-violet-600"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 flex flex-col items-center">
        <div className="relative w-full bg-white rounded-3xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-50 text-center mt-16">
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-28 h-28 drop-shadow-md">
            <Image
              src="/assets/maskot bincat.png"
              alt="binCat Mascot"
              fill
              sizes="(max-width: 768px) 100vw, 112px"
              priority={true}
              className="object-contain"
            />
          </div>
          <h3 className="font-bold text-slate-800 text-sm mt-10">
            {userProfile
              ? `Keep it up, ${userProfile.full_name.split(" ")[0]}!`
              : "Keep going!"}
          </h3>
          <p className="text-xs text-slate-500 mt-1 mb-2">
            Every step makes you better ✨
          </p>
        </div>

        <Link href="/tanyaAI" className="w-full">
          <button className="w-full mt-4 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl p-3 flex flex-col items-center justify-center shadow-[0_4px_0_#5b21b6] active:translate-y-1 active:shadow-none transition-all">
            <Bot className="w-6 h-6 mb-1" />
            <span className="font-bold text-sm">AI Tutor</span>
            <span className="text-[10px] text-violet-200">
              Ask me anything!
            </span>
          </button>
        </Link>
      </div>
    </aside>
  );
}
