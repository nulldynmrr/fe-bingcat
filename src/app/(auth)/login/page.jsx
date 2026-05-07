"use client";
import { motion } from "framer-motion";
import { Cat, ArrowRight, Mail, Lock } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-violet-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-violet-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
      <div className="absolute top-[20%] right-[-10%] w-64 h-64 bg-mint-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-md bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(139,92,246,0.15)] border border-white z-10"
      >
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-20 h-20 bg-violet-100 rounded-full flex items-center justify-center mb-4 shadow-inner">
            <Cat className="w-10 h-10 text-violet-500" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800 mb-2 tracking-tight">
            Selamat Datang!
          </h1>
          <p className="text-slate-500 font-medium">
            Mari lanjutkan progres belajar EPrT kamu hari ini.
          </p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="email"
              placeholder="Email Mahasiswa"
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10 transition-all outline-none text-slate-700 font-medium"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10 transition-all outline-none text-slate-700 font-medium"
            />
          </div>

          <Link href="/home" className="block w-full pt-4">
            <button className="w-full py-4 rounded-2xl font-bold text-lg bg-violet-500 text-white shadow-[0_6px_0_rgb(124,58,237)] active:shadow-none active:translate-y-[6px] transition-all flex items-center justify-center gap-2">
              MASUK <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>

        <p className="text-center text-slate-400 font-medium mt-8">
          Belum punya akun?{" "}
          <Link
            href="/signup"
            className="text-violet-600 font-bold hover:underline"
          >
            Daftar sekarang
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
