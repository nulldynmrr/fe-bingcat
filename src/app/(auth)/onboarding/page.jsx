"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import request from "@/utils/request";

export default function OnboardingPage() {
  const router = useRouter();
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const levels = [
    {
      id: "zero",
      title: "Baru Mulai Banget",
      desc: "Belum tahu apa-apa, mulai dari nol.",
      emoji: "🐣",
      mood: "😸",
    },
    {
      id: "basic",
      title: "Level Dasar",
      desc: "Tahu sedikit kosakata sehari-hari.",
      emoji: "🚶‍♂️",
      mood: "😼",
    },
    {
      id: "intermediate",
      title: "Lumayan Bisa",
      desc: "Bisa baca, tapi grammar masih pusing.",
      emoji: "🏃‍♂️",
      mood: "🙀",
    },
    {
      id: "eprt",
      title: "Fokus EPrT",
      desc: "Butuh lulus tes buat sidang/wisuda.",
      emoji: "🎓",
      mood: "😻",
    },
  ];

  const currentMood = selectedLevel
    ? levels.find((l) => l.id === selectedLevel)?.mood
    : "👋";

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300 } },
  };

  const handleContinue = async () => {
    if (!selectedLevel) return;

    setIsLoading(true);
    setErrorMsg("");

    try {
      const response = await request.put("/user/onboarding", {
        level: selectedLevel,
      });

      if (response.data.status === "success") {
        router.push("/home");
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Gagal menyimpan data. Silakan coba lagi.";
      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-violet-50 flex justify-center items-center overflow-hidden sm:p-6 font-sans">
      <div className="w-full max-w-md h-full sm:h-auto sm:max-h-[95vh] bg-white sm:rounded-[2.5rem] shadow-2xl flex flex-col relative overflow-hidden px-6 pt-8 pb-6 border border-slate-100">
        <div className="w-full flex items-center gap-3 mb-6 shrink-0">
          <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden relative">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "30%" }}
              transition={{ duration: 1, type: "spring" }}
              className="absolute top-0 left-0 h-full bg-violet-500 rounded-full"
            >
              <div className="absolute top-1 left-2 right-2 h-1 bg-white/30 rounded-full"></div>
            </motion.div>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6 shrink-0">
          <motion.div
            key={currentMood}
            initial={{ scale: 0.5, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", bounce: 0.6 }}
            className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center shadow-inner border-4 border-white text-4xl shrink-0"
          >
            {currentMood}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-4 rounded-3xl rounded-tl-none shadow-md border border-slate-100 relative"
          >
            <p className="text-slate-700 font-extrabold text-sm leading-snug">
              Seberapa jago bahasa Inggris kamu sekarang?
            </p>
          </motion.div>
        </div>

        {/* Tampilkan error jika API gagal */}
        {errorMsg && (
          <div className="mb-4 p-3 bg-red-100 text-red-600 text-sm font-medium rounded-xl text-center shrink-0">
            {errorMsg}
          </div>
        )}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex-1 flex flex-col justify-center gap-3 w-full"
        >
          {levels.map((level) => (
            <motion.button
              variants={itemVariants}
              whileTap={{ scale: 0.97 }}
              key={level.id}
              onClick={() => setSelectedLevel(level.id)}
              className={`w-full p-4 rounded-2xl border-2 flex items-center gap-4 text-left transition-all relative outline-none ${
                selectedLevel === level.id
                  ? "border-violet-500 bg-violet-50 border-b-[6px] text-violet-700"
                  : "border-slate-200 bg-white border-b-[6px] hover:bg-slate-50 text-slate-700"
              }`}
            >
              <div
                className={`text-3xl ${selectedLevel === level.id ? "scale-110 transition-transform" : "grayscale opacity-70"}`}
              >
                {level.emoji}
              </div>
              <div className="flex-1">
                <h3
                  className={`font-black text-base leading-none mb-1 ${selectedLevel === level.id ? "text-violet-700" : "text-slate-700"}`}
                >
                  {level.title}
                </h3>
                <p
                  className={`font-bold text-[11px] leading-tight ${selectedLevel === level.id ? "text-violet-500" : "text-slate-400"}`}
                >
                  {level.desc}
                </p>
              </div>

              {selectedLevel === level.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-6 h-6 bg-violet-500 rounded-full flex items-center justify-center text-white shrink-0 absolute right-4"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </motion.div>

        <div className="pt-6 shrink-0">
          {/* Tag Link dihapus, diganti onClick pada button */}
          <button
            onClick={handleContinue}
            disabled={!selectedLevel || isLoading}
            className={`w-full py-4 rounded-2xl font-black text-base tracking-widest uppercase flex justify-center items-center gap-2 transition-all outline-none ${
              selectedLevel && !isLoading
                ? "bg-violet-500 text-white border-b-[6px] border-violet-700 hover:bg-violet-400 active:border-b-0 active:translate-y-[6px]"
                : "bg-slate-200 text-slate-400 border-b-[6px] border-slate-300 cursor-not-allowed"
            }`}
          >
            {isLoading ? "MENYIMPAN..." : "Lanjutkan"}
          </button>
        </div>
      </div>
    </div>
  );
}
