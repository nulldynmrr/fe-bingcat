"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import request from "@/utils/request";

export default function SignupPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const response = await request.post("/auth/signup", {
        full_name: fullName,
        email: email,
        password: password,
      });

      if (response.data.status === "success") {
        setSuccessMsg("Akun berhasil dibuat!");

        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Gagal mendaftar. Silakan coba lagi.";
      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  };

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
            Langkah pertama untuk lulus tes Bahasa Inggris
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-100 text-red-600 text-sm font-medium rounded-xl text-center">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            className="mb-6 p-4 bg-emerald-500 border-2 border-emerald-600 text-white text-sm font-bold rounded-2xl text-center shadow-[0_6px_0_rgb(5,150,105)] flex items-center justify-center gap-2"
          >
            {successMsg}
          </motion.div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Nama Panggilan"
              required
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-violet-500 focus:bg-white outline-none font-medium text-slate-700"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email "
              required
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-violet-500 focus:bg-white outline-none font-medium text-slate-700"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              minLength={6}
              className="w-full pl-12 pr-12 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-violet-500 focus:bg-white outline-none font-medium text-slate-700"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 rounded-2xl font-bold text-lg text-white shadow-[0_6px_0_rgb(124,58,237)] active:shadow-none active:translate-y-[6px] transition-all flex items-center justify-center gap-2 ${isLoading ? "bg-violet-400 cursor-not-allowed" : "bg-violet-500"}`}
            >
              {isLoading ? "MEMPROSES..." : "DAFTAR"}{" "}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </form>

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
