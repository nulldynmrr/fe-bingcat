"use client";

import React from "react";
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

export default function AdminDashboardPage() {
  // Dummy data statistik
  const stats = [
    {
      label: "Total Mahasiswa",
      value: "1,284",
      trend: "+12% bulan ini",
      icon: <Users className="w-6 h-6 text-blue-500" />,
      bgIcon: "bg-blue-50",
      trendColor: "text-emerald-500",
    },
    {
      label: "Soal EPrT Aktif",
      value: "350",
      trend: "+25 soal baru",
      icon: <BookOpen className="w-6 h-6 text-violet-500" />,
      bgIcon: "bg-violet-50",
      trendColor: "text-emerald-500",
    },
    {
      label: "Rata-rata XP",
      value: "1,420",
      trend: "Meningkat",
      icon: <TrendingUp className="w-6 h-6 text-amber-500" />,
      bgIcon: "bg-amber-50",
      trendColor: "text-emerald-500",
    },
    {
      label: "Siswa Aktif Hari Ini",
      value: "342",
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div
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
                className={`text-[11px] font-bold ${stat.trendColor} bg-emerald-50 inline-flex px-2 py-1 rounded-md`}
              >
                {stat.trend}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
            {[
              {
                name: "Lina",
                action: "Menyelesaikan Chapter 2",
                time: "10 menit yang lalu",
                avatar: "Lina",
              },
              {
                name: "Dinar Akbar",
                action: "Mendapat 50 XP dari Quiz",
                time: "32 menit yang lalu",
                avatar: "Dinar",
              },
              {
                name: "Rafi",
                action: "Naik ke peringkat 3 di Leaderboard",
                time: "1 jam yang lalu",
                avatar: "Rafi",
              },
              {
                name: "Siswa Baru",
                action: "Mendaftar ke platform",
                time: "2 jam yang lalu",
                avatar: "New",
              },
            ].map((activity, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activity.avatar}`}
                    alt="Avatar"
                    className="w-full h-full object-cover bg-white"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800">
                    {activity.name}
                  </p>
                  <p className="text-xs font-medium text-slate-500">
                    {activity.action}
                  </p>
                </div>
                <span className="text-[10px] font-bold text-slate-400">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </div>

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
                      Laporan Siswa
                    </p>
                    <p className="text-[10px] font-medium text-blue-600">
                      Lihat progres belajar
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-blue-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          </div>

          <div className="mt-auto pt-8 flex justify-center opacity-50">
            <div className="text-6xl">📊</div>
          </div>
        </div>
      </div>
    </div>
  );
}
