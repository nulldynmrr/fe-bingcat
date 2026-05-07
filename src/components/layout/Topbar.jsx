"use client";

import React from "react";
import { Flame, Zap, Gem, ChevronDown } from "lucide-react";

export default function Topbar() {
  return (
    <header className="w-full px-8 py-5 flex justify-between items-center z-10 bg-[#f4f7fa]">
      <div className="flex gap-6 bg-white px-5 py-2.5 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-2 font-bold text-slate-700">
          <Flame className="w-5 h-5 text-orange-500 fill-orange-500" /> 12
        </div>
        <div className="flex items-center gap-2 font-bold text-slate-700">
          <Zap className="w-5 h-5 text-amber-400 fill-amber-400" /> 2450
        </div>
        <div className="flex items-center gap-2 font-bold text-slate-700">
          <Gem className="w-5 h-5 text-blue-400 fill-blue-400" /> 85
        </div>
      </div>
      <div className="flex items-center gap-3 cursor-pointer bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100">
        <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden shadow-sm">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Dinar"
            alt="Avatar"
            className="w-full h-full object-cover bg-white"
          />
        </div>
        <div className="flex flex-col hidden sm:flex">
          <span className="text-sm font-bold leading-none">Dinar M.</span>
          <span className="text-[10px] text-slate-400 font-medium mt-1">
            Level 8
          </span>
        </div>
        <ChevronDown className="w-4 h-4 text-slate-400 ml-1" />
      </div>
    </header>
  );
}
