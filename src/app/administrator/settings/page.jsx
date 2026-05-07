"use client";

import React, { useState } from "react";
import {
  BellRing,
  Volume2,
  Moon,
  Globe,
  ShieldCheck,
  Trophy,
  Smartphone,
} from "lucide-react";

export default function SettingsPage() {
  // State untuk masing-masing toggle (On/Off)
  const [settings, setSettings] = useState({
    dailyReminder: true,
    streakAlert: true,
    leagueUpdates: false,
    soundEffects: true,
    darkMode: false,
    publicProfile: true,
    showOnline: false,
  });

  // Fungsi untuk mengubah state toggle
  const handleToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <>
      <main className="flex-1 relative overflow-y-auto no-scrollbar flex flex-col text-slate-800 bg-[#f4f7fa]">
        <div className="relative z-10 w-full max-w-2xl mx-auto px-8 pt-8 pb-32 mt-4">
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
              Pengaturan
            </h1>
            <p className="text-slate-500 font-medium mt-1">
              Sesuaikan preferensi belajar dan notifikasi kamu.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 px-2">
              Notifikasi
            </h2>
            <div className="flex flex-col gap-3">
              <SettingRow
                icon={<Smartphone className="w-5 h-5 text-violet-500" />}
                title="Pengingat Belajar Harian"
                desc="Beri tahu saya untuk belajar setiap hari"
                isActive={settings.dailyReminder}
                onToggle={() => handleToggle("dailyReminder")}
              />
              <SettingRow
                icon={<Flame className="w-5 h-5 text-orange-500" />}
                title="Peringatan Streak"
                desc="Ingatkan jika streak saya hampir hilang"
                isActive={settings.streakAlert}
                onToggle={() => handleToggle("streakAlert")}
              />
              <SettingRow
                icon={<Trophy className="w-5 h-5 text-amber-500" />}
                title="Update Liga & Leaderboard"
                desc="Info saat saya naik atau turun peringkat"
                isActive={settings.leagueUpdates}
                onToggle={() => handleToggle("leagueUpdates")}
              />
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 px-2">
              Tampilan & Audio
            </h2>
            <div className="flex flex-col gap-3">
              <SettingRow
                icon={<Volume2 className="w-5 h-5 text-blue-500" />}
                title="Efek Suara"
                desc="Bunyi saat jawaban benar atau salah"
                isActive={settings.soundEffects}
                onToggle={() => handleToggle("soundEffects")}
              />
              <SettingRow
                icon={<Moon className="w-5 h-5 text-slate-500" />}
                title="Mode Gelap (Dark Mode)"
                desc="Ubah tema aplikasi menjadi gelap"
                isActive={settings.darkMode}
                onToggle={() => handleToggle("darkMode")}
              />
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 px-2">
              Privasi
            </h2>
            <div className="flex flex-col gap-3">
              <SettingRow
                icon={<Globe className="w-5 h-5 text-emerald-500" />}
                title="Profil Publik"
                desc="Izinkan orang lain melihat profil saya"
                isActive={settings.publicProfile}
                onToggle={() => handleToggle("publicProfile")}
              />
              <SettingRow
                icon={<ShieldCheck className="w-5 h-5 text-emerald-500" />}
                title="Status Online"
                desc="Tampilkan saat saya sedang aktif belajar"
                isActive={settings.showOnline}
                onToggle={() => handleToggle("showOnline")}
              />
            </div>
          </div>
        </div>
      </main>

      <aside className="w-[320px] bg-transparent border-l border-slate-100 hidden xl:flex flex-col p-6 space-y-6 overflow-y-auto no-scrollbar z-10 relative">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-50 mt-4 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full mx-auto flex items-center justify-center mb-4">
            <BellRing className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="font-bold text-slate-800 mb-2">Pusat Kontrol</h3>
          <p className="text-xs font-medium text-slate-500 leading-relaxed">
            Semua perubahan yang kamu buat di sini akan otomatis tersimpan ke
            akun kamu.
          </p>
        </div>
      </aside>
    </>
  );
}

function SettingRow({ icon, title, desc, isActive, onToggle }) {
  return (
    <div className="bg-white p-5 rounded-2xl border-b-[4px] border-slate-200 flex items-center justify-between hover:bg-slate-50 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="font-extrabold text-slate-700 text-sm leading-tight mb-0.5">
            {title}
          </h3>
          <p className="font-medium text-xs text-slate-400">{desc}</p>
        </div>
      </div>

      {/* Memanggil Komponen Toggle Switch */}
      <ToggleSwitch isActive={isActive} onToggle={onToggle} />
    </div>
  );
}

// Komponen Toggle Switch (On/Off) murni Tailwind
function ToggleSwitch({ isActive, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
        isActive ? "bg-violet-500" : "bg-slate-300"
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
          isActive ? "translate-x-7" : "translate-x-1"
        }`}
      />
    </button>
  );
}

// Icon tambahan yang tidak ada di import atas (Flame)
function Flame(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}
