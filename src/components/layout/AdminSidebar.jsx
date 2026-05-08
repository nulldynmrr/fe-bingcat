"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Database,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    {
      path: "/administrator/dashboard",
      icon: LayoutDashboard,
      label: "Dashboard",
    },
    {
      path: "/administrator/question-bank",
      icon: Database,
      label: "Bank Soal",
    },
    { path: "/administrator/users-admin", icon: Users, label: "Pengguna" },
    { path: "/administrator/settings", icon: Settings, label: "Pengaturan" },
  ];

  return (
    <aside className="w-[260px] min-w-[260px] bg-slate-900 border-r border-slate-800 hidden lg:flex flex-col flex-shrink-0 h-full overflow-y-auto no-scrollbar z-20 text-slate-300">
      <div className="p-6 flex items-center gap-3 border-b border-slate-800">
        <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-violet-600/20">
          A
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white leading-none">
            Admin
          </h1>
          <p className="text-[10px] text-slate-400 font-medium mt-1 uppercase tracking-widest">
            Management System
          </p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-4 mb-4">
          Menu Utama
        </p>
        {navItems.map((item) => {
          const isActive =
            pathname === item.path || pathname?.startsWith(item.path);
          return (
            <Link key={item.path} href={item.path}>
              <div
                className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all font-bold text-sm ${
                  isActive
                    ? "bg-violet-600 text-white shadow-md shadow-violet-600/20"
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-slate-800">
        <button className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all font-bold text-sm text-rose-400 hover:bg-rose-500/10 w-full">
          <LogOut className="w-5 h-5" />
          <span>Keluar</span>
        </button>
      </div>
    </aside>
  );
}
