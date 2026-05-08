"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  BookOpen,
  TrendingUp,
  Activity,
  ChevronRight,
  PlusCircle,
  FileText,
} from "lucide-react";
import Link from "next/link";
import request from "@/utils/request";
import { motion } from "framer-motion";

export default function AdminDashboardPage() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await request.get("/admin/dashboard");
        if (response.data.status === "success") {
          setData(response.data.data);
        }
      } catch (error) {
        console.error("Gagal memuat dashboard admin:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Pemetaan data API ke format UI stats
  const stats = [
    {
      label: "Total Mahasiswa",
      value: data?.overview?.total_mahasiswa?.toLocaleString() || "0",
      trend: "Data Realtime",
      icon: <Users className="w-6 h-6 text-blue-500" />,
      bgIcon: "bg-blue-50",
      trendColor: "text-blue-500",
    },
    {
      label: "Soal EPrT Aktif",
      value: data?.overview?.total_soal?.toLocaleString() || "0",
      trend: "Bank Soal",
      icon: <BookOpen className="w-6 h-6 text-violet-500" />,
      bgIcon: "bg-violet-50",
      trendColor: "text-violet-500",
    },
    {
      label: "Rata-rata XP",
      value: data?.overview?.rata_rata_xp?.toLocaleString() || "0",
      trend: "Performa Siswa",
      icon: <TrendingUp className="w-6 h-6 text-amber-500" />,
      bgIcon: "bg-amber-50",
      trendColor: "text-emerald-500",
    },
    {
      label: "Siswa Aktif Hari Ini",
      value: data?.overview?.siswa_aktif_hari_ini?.toLocaleString() || "0",
      trend: "Sedang belajar",
      icon: <Activity className="w-6 h-6 text-emerald-500" />,
      bgIcon: "bg-emerald-50",
      trendColor: "text-emerald-500",
    },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-slate-500 font-medium mt-1">
          Selamat datang kembali, Admin! Berikut ringkasan aktivitas EPrT hari
          ini.
        </p>
      </header>

      {/* Grid Statistik Dinamis */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={idx}
            className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:-translate-y-1 transition-transform cursor-default"
          >
            <div className="flex justify-between items-start mb-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bgIcon}`}
              >
                {stat.icon}
              </div>
            </div>
            <div>
              <p className="text-3xl font-black text-slate-800 mb-1">
                {stat.value}
              </p>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                {stat.label}
              </h3>
              <p
                className={`text-[11px] font-bold ${stat.trendColor} bg-slate-50 inline-flex px-2 py-1 rounded-md`}
              >
                {stat.trend}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-slate-800">
        {/* Aktivitas Terakhir Dinamis */}
        <div className="lg:col-span-2 bg-white rounded-[2rem] border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.02)] p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-extrabold text-slate-800">
              Aktivitas Terakhir
            </h2>
            <button className="text-sm font-bold text-violet-600 hover:text-violet-700">
              Lihat Semua
            </button>
          </div>

          <div className="space-y-5">
            {data?.recent_activity?.length > 0 ? (
              data.recent_activity.map((activity, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activity.full_name}`}
                      alt="Avatar"
                      className="w-full h-full object-cover bg-white"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-800">
                      {activity.full_name}
                    </p>
                    <p className="text-xs font-medium text-slate-500">
                      Baru saja aktif dengan akumulasi{" "}
                      {activity.xp.toLocaleString()} XP
                    </p>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 italic">
                    {new Date(activity.last_activity_at).toLocaleTimeString(
                      [],
                      { hour: "2-digit", minute: "2-digit" },
                    )}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center text-slate-400 py-10 font-bold italic">
                Belum ada aktivitas hari ini.
              </p>
            )}
          </div>
        </div>

        {/* Akses Cepat */}
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.02)] p-6 md:p-8 flex flex-col">
          <h2 className="text-xl font-extrabold text-slate-800 mb-6">
            Akses Cepat
          </h2>

          <div className="flex flex-col gap-4">
            <Link href="/administrator/question-bank" className="group">
              <div className="p-4 rounded-2xl bg-violet-50 border border-violet-100 flex items-center justify-between hover:bg-violet-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="bg-violet-600 p-2 rounded-xl text-white">
                    <PlusCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-violet-900">
                      Tambah Soal
                    </p>
                    <p className="text-[10px] font-medium text-violet-600">
                      Input data EPrT baru
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-violet-400 group-hover:text-violet-600 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>

            <Link href="/administrator/users-admin" className="group">
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-between hover:bg-blue-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500 p-2 rounded-xl text-white">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-blue-900">
                      Daftar Mahasiswa
                    </p>
                    <p className="text-[10px] font-medium text-blue-600">
                      Kelola akun & progres
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-blue-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          </div>

          <div className="mt-auto pt-8 flex justify-center opacity-50 grayscale">
            <div className="text-6xl">📊</div>
          </div>
        </div>
      </div>
    </div>
  );
}
