"use client";

import React, { useEffect, useState, Suspense } from "react";
import { motion } from "framer-motion";
import {
  Gem,
  Trophy,
  Star,
  ArrowRight,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import request from "@/utils/request";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

function ResultContent() {
  const searchParams = useSearchParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const correct = parseInt(searchParams.get("c")) || 0;
  const incorrect = parseInt(searchParams.get("i")) || 0;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await request.get("/user/dashboard");
        if (res.data.status === "success") {
          setProfile(res.data.data.profile);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading)
    return (
      <div className="flex-1 flex items-center justify-center bg-[#f4f7fa]">
        <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <main className="h-screen w-full flex flex-col items-center justify-center bg-[#f4f7fa] p-6 text-slate-800 overflow-hidden">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-md w-full bg-white rounded-[3rem] p-8 shadow-2xl border border-slate-100 text-center relative"
      >
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32">
          <Image
            src="/assets/maskot bincat.png"
            fill
            className="object-contain"
            alt="Success"
          />
        </div>

        <h1 className="text-3xl font-black mb-1 text-violet-600 uppercase italic mt-8">
          Chapter Selesai!
        </h1>
        <p className="text-slate-400 font-bold text-sm mb-6">
          Meow-mazing! Hasil belajarmu hari ini:
        </p>

        <div className="flex gap-3 mb-6">
          <div className="flex-1 bg-emerald-50 p-4 rounded-3xl border-2 border-emerald-100 flex flex-col items-center">
            <CheckCircle className="text-emerald-500 w-5 h-5 mb-1" />
            <span className="text-xl font-black text-emerald-700">
              {correct}
            </span>
            <span className="text-[9px] font-black uppercase text-emerald-600/60 leading-none">
              Benar
            </span>
          </div>
          <div className="flex-1 bg-rose-50 p-4 rounded-3xl border-2 border-rose-100 flex flex-col items-center">
            <XCircle className="text-rose-500 w-5 h-5 mb-1" />
            <span className="text-xl font-black text-rose-700">
              {incorrect}
            </span>
            <span className="text-[9px] font-black uppercase text-rose-600/60 leading-none">
              Salah
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-slate-50 p-4 rounded-3xl border-b-4 border-slate-200 flex flex-col items-center justify-center gap-1">
            <Star className="text-amber-500 w-5 h-5 fill-amber-500" />
            <span className="text-base font-black text-slate-700">
              +{correct * 10} XP
            </span>
          </div>
          <div className="bg-slate-50 p-4 rounded-3xl border-b-4 border-slate-200 flex flex-col items-center justify-center gap-1">
            <Gem className="text-blue-500 w-5 h-5 fill-blue-500" />
            <span className="text-base font-black text-slate-700">
              +{Math.floor(correct / 3)} Gems
            </span>
          </div>
        </div>

        {/* Level Progress */}
        <div className="bg-violet-600 p-5 rounded-[2rem] border-b-[6px] border-violet-800 text-white mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="font-black uppercase tracking-widest text-[10px] opacity-80 text-white">
              Level {profile?.level}
            </span>
            <Trophy className="w-3 h-3 text-white" />
          </div>
          <div className="w-full h-3 bg-violet-900/30 rounded-full overflow-hidden mb-1">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "75%" }}
              className="h-full bg-white"
            />
          </div>
          <p className="text-[9px] font-bold text-left text-violet-200">
            Sedikit lagi menuju Level {profile?.level + 1}!
          </p>
        </div>

        <Link href="/home">
          <button className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-black text-base uppercase tracking-widest border-b-[6px] border-emerald-700 active:translate-y-1 active:border-b-0 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-200">
            LANJUTKAN <ArrowRight className="w-5 h-5" />
          </button>
        </Link>
      </motion.div>
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={null}>
      <ResultContent />
    </Suspense>
  );
}
