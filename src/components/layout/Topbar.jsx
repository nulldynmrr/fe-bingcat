"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Flame,
  Zap,
  Gem,
  ChevronDown,
  LogOut,
  User,
  Settings,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import request from "@/utils/request";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Topbar() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Ambil data profil dari API Dashboard
  const fetchTopbarData = async () => {
    try {
      const response = await request.get("/user/dashboard");
      if (response.data.status === "success") {
        setUserData(response.data.data.profile);
      }
    } catch (error) {
      console.error("Gagal mengambil data topbar:", error);
    }
  };

  useEffect(() => {
    fetchTopbarData();

    // Fungsi untuk menutup dropdown jika klik di luar area menu
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // FUNGSI LOGOUT: Hapus Cookies dan Token
  const handleLogout = () => {
    Cookies.remove("admin_token"); // Hapus token auth
    localStorage.removeItem("user_data"); // Bersihkan data lokal
    localStorage.removeItem("admin"); // Bersihkan data admin jika ada

    // Alihkan ke halaman login
    router.push("/login");
  };

  const stats = userData || {
    streak_count: 0,
    xp: 0,
    gems: 0,
    full_name: "Loading...",
    level: 0,
  };

  return (
    <header className="w-full px-8 py-5 flex justify-between items-center z-30 bg-[#f4f7fa] relative">
      {/* Bagian Statistik (Kiri) */}
      <div className="flex gap-6 bg-white px-5 py-2.5 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-2 font-bold text-slate-700">
          <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
          {stats.streak_count}
        </div>
        <div className="flex items-center gap-2 font-bold text-slate-700">
          <Zap className="w-5 h-5 text-amber-400 fill-amber-400" />
          {stats.xp.toLocaleString()}
        </div>
        <div className="flex items-center gap-2 font-bold text-slate-700">
          <Gem className="w-5 h-5 text-blue-400 fill-blue-400" />
          {stats.gems}
        </div>
      </div>

      {/* Bagian Profil & Dropdown (Kanan) */}
      <div className="relative" ref={menuRef}>
        <div
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`flex items-center gap-3 cursor-pointer bg-white px-4 py-2 rounded-2xl shadow-sm border transition-all group ${
            isMenuOpen
              ? "border-violet-500 ring-4 ring-violet-500/10"
              : "border-slate-100 hover:border-violet-200"
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden shadow-sm border-2 border-white">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${stats.full_name}`}
              alt="Avatar"
              className="w-full h-full object-cover bg-white"
            />
          </div>
          <div className="flex flex-col hidden sm:flex">
            <span className="text-sm font-bold leading-none text-slate-800">
              {stats.full_name.split(" ").slice(0, 2).join(" ")}
            </span>
            <span className="text-[10px] text-slate-400 font-medium mt-1 uppercase tracking-wider">
              Level {stats.level}
            </span>
          </div>
          <motion.div
            animate={{ rotate: isMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown
              className={`w-4 h-4 ml-1 transition-colors ${isMenuOpen ? "text-violet-500" : "text-slate-400"}`}
            />
          </motion.div>
        </div>

        {/* Menu Dropdown Animation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-slate-100 p-2 z-50 overflow-hidden"
            >
              <div className="px-4 py-3 mb-1 border-b border-slate-50 sm:hidden">
                <p className="text-sm font-bold text-slate-800">
                  {stats.full_name}
                </p>
                <p className="text-[10px] text-slate-400">
                  Level {stats.level}
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
              >
                <LogOut className="w-4 h-4" /> Keluar
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
