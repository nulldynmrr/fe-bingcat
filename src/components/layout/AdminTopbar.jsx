"use client";

import React from "react";
import { Bell, Search, ChevronDown } from "lucide-react";

export default function AdminTopbar() {
  return (
    <header className="w-full px-8 py-4 flex justify-between items-center z-10 bg-white border-b border-slate-100 shrink-0 h-[72px]">
      <div className="relative w-full max-w-md hidden sm:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Cari menu, pengguna, atau id soal..."
          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm outline-none focus:border-violet-500 focus:bg-white transition-all font-medium text-slate-700"
        />
      </div>

      <div className="flex items-center gap-6 ml-auto">
        <button className="relative text-slate-400 hover:text-slate-600 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-white box-content"></span>
        </button>

        <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>

        <div className="flex items-center gap-3 cursor-pointer">
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-sm font-bold text-slate-700 leading-none">
              Admin Utama
            </span>
            <span className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wider">
              Superadmin
            </span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-violet-100 flex items-center justify-center border border-violet-200 shadow-sm text-violet-600 font-black text-sm">
            AU
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </div>
      </div>
    </header>
  );
}
