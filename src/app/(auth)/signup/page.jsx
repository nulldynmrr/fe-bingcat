"use client";
import { motion } from "framer-motion";
import { Cat, User, Mail, Lock } from "lucide-react";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-violet-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-md bg-white p-8 rounded-[2.5rem] shadow-xl shadow-violet-200/50 border border-white z-10"
      >
        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-800 mb-2">
            Buat Akun Baru
          </h1>
          <p className="text-slate-500 font-medium">
            Langkah pertama untuk lulus EPrT!
          </p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Nama Panggilan"
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-violet-500 focus:bg-white outline-none font-medium text-slate-700"
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="email"
              placeholder="Email Mahasiswa"
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-violet-500 focus:bg-white outline-none font-medium text-slate-700"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-violet-500 focus:bg-white outline-none font-medium text-slate-700"
            />
          </div>

          <Link href="/onboarding" className="block w-full pt-4">
            <button className="w-full py-4 rounded-2xl font-bold text-lg bg-mint-500 text-white shadow-[0_6px_0_rgb(52,211,153)] active:shadow-none active:translate-y-[6px] transition-all">
              DAFTAR SEKARANG
            </button>
          </Link>
        </div>

        <p className="text-center text-slate-400 font-medium mt-8">
          Sudah punya akun?{" "}
          <Link
            href="/login"
            className="text-violet-600 font-bold hover:underline"
          >
            Masuk
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
