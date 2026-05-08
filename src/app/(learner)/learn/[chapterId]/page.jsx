"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Target,
  Star,
  BookOpen,
  Clock,
  Gem,
  Bot,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import request from "@/utils/request";
import StatRow from "@/components/ui/StatRow";

export default function ChapterIntroPage({ params }) {
  const chapterId = params?.chapterId || "1";
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const response = await request.get(`/user/chapters/${chapterId}`);
        if (response.data.status === "success") {
          setData(response.data.data);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchChapter();
  }, [chapterId]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#f4f7fa]">
        <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-[#f4f7fa]">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className="relative w-48 h-48 mx-auto mb-6">
            <Image
              src="/assets/maskot bincat.png"
              alt="Empty State"
              fill
              className="grayscale opacity-50 object-contain"
            />
          </div>
          <h2 className="text-2xl font-black text-slate-400 mb-2">
            Ups! Bab Belum Tersedia
          </h2>
          <p className="text-slate-400 font-bold mb-8">
            binCat belum menyiapkan materi untuk bab ini, Meow!
          </p>
          <Link href="/home">
            <button className="px-8 py-3 bg-violet-500 text-white rounded-2xl font-black shadow-[0_4px_0_#5b21b6] active:translate-y-1 active:shadow-none transition-all">
              KEMBALI KE PETA
            </button>
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <>
      <main className="flex-1 relative overflow-y-auto no-scrollbar flex flex-col text-slate-800 bg-[#f4f7fa]">
        <div className="relative z-10 w-full max-w-3xl mx-auto px-8 pt-8 pb-32 mt-4">
          <Link
            href="/home"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-600 font-bold text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={3} /> Kembali ke Peta
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-violet-100 to-transparent opacity-50 rounded-bl-full pointer-events-none"></div>

            <div className="flex flex-col md:flex-row gap-10 items-start relative z-10">
              <div className="w-full md:w-1/2">
                <div className="w-24 h-24 bg-violet-500 rounded-3xl rotate-3 mb-8 flex items-center justify-center shadow-lg border-b-[6px] border-violet-600">
                  <BookOpen
                    className="w-10 h-10 text-white -rotate-3"
                    strokeWidth={2.5}
                  />
                </div>

                <h2 className="text-xs font-black uppercase tracking-widest text-violet-500 mb-2">
                  CHAPTER {data.chapter_id} • MATERI UTAMA
                </h2>
                <h1 className="text-4xl font-extrabold text-slate-800 leading-tight mb-4 tracking-tight">
                  Materi Pembelajaran
                </h1>
                <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6">
                  Selesaikan total {data.total_questions} pertanyaan untuk
                  menguasai bab ini. Dapatkan XP dan Gems maksimal dengan
                  menjawab semua soal dengan benar.
                </p>

                <div className="flex items-center gap-2 text-slate-400 text-xs font-bold bg-slate-50 inline-flex px-4 py-2 rounded-xl">
                  <Clock className="w-4 h-4" /> Estimasi waktu:{" "}
                  {data.time_estimate}
                </div>
              </div>

              <div className="w-full md:w-1/2 flex flex-col gap-8">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Target
                      className="w-5 h-5 text-slate-800"
                      strokeWidth={2.5}
                    />
                    <h3 className="font-extrabold text-slate-800 text-lg">
                      Target Belajar
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {data.targets.map((obj, idx) => (
                      <li
                        key={idx}
                        className="flex gap-3 items-start bg-slate-50 p-4 rounded-2xl border border-slate-100"
                      >
                        <div className="mt-0.5 w-6 h-6 rounded-full bg-violet-50 flex items-center justify-center shrink-0">
                          <Star className="w-3 h-3 text-violet-500 fill-current" />
                        </div>
                        <span className="text-sm font-bold text-slate-600 leading-snug">
                          {obj}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-extrabold text-slate-800 text-lg mb-3">
                    Hadiah
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex flex-col items-center justify-center">
                      <span className="text-2xl font-black text-amber-500 mb-1">
                        +{data.rewards_potential.xp}
                      </span>
                      <span className="text-[10px] font-black text-amber-600/60 uppercase tracking-wider">
                        XP Points
                      </span>
                    </div>
                    <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex flex-col items-center justify-center">
                      <div className="flex items-center gap-1 mb-1">
                        <Gem className="w-5 h-5 text-blue-500 fill-blue-500" />
                        <span className="text-2xl font-black text-blue-500">
                          +{data.rewards_potential.gems}
                        </span>
                      </div>
                      <span className="text-[10px] font-black text-blue-600/60 uppercase tracking-wider">
                        Gems
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-100 flex justify-end">
              <Link
                href={`/learn/quiz/${chapterId}/1`}
                className="w-full md:w-auto"
              >
                <button className="w-full md:w-64 py-4 rounded-2xl font-black text-lg uppercase tracking-widest text-white transition-all active:translate-y-1 active:border-b-0 bg-violet-500 border-b-[6px] border-violet-600 hover:brightness-110 shadow-lg">
                  Mulai Belajar
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      <aside className="w-[320px] bg-transparent border-l border-slate-100 hidden xl:flex flex-col p-6 space-y-6 overflow-y-auto no-scrollbar z-10 relative text-slate-800">
        <div className="bg-violet-50 rounded-3xl p-6 border border-violet-100 relative shadow-sm mt-4">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="font-bold text-violet-800 text-sm">Tip Persiapan</h3>
            <div className="bg-violet-600 rounded-lg p-1 text-white ml-auto">
              <Bot className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xs text-violet-900 leading-relaxed mb-4 font-medium">
            Pastikan kamu berada di tempat yang tenang karena bab ini
            membutuhkan fokus tinggi untuk menganalisis teks percakapan.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-50">
          <h3 className="font-bold text-slate-800 mb-4">Detail Bab</h3>
          <StatRow
            label="Jumlah Soal"
            value={data.total_questions}
            color="text-slate-800"
          />
          <StatRow
            label="Maksimal XP"
            value={`+${data.rewards_potential.xp}`}
            color="text-violet-500"
          />
        </div>
      </aside>
    </>
  );
}
