"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import request from "@/utils/request";
import Cookies from "js-cookie";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const response = await request.post("/auth/login", { email, password });
      const resData = response.data;

      if (resData.status === "success") {
        Cookies.set("admin_token", resData.data.token, { expires: 1 });
        localStorage.setItem("user_data", JSON.stringify(resData.data.user));

        if (resData.data.role === "admin") {
          router.push("/administrator/dashboard");
        } else {
          if (!resData.data.user.onboarding_level) {
            router.push("/onboarding");
          } else {
            router.push("/home");
          }
        }
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Email atau password salah.";
      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  };
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
          <div className="w-24 h-24 flex items-center justify-center mb-4">
            <Image
              src="/assets/logo.png"
              alt="binCat Logo"
              width={96}
              height={96}
              className="object-contain drop-shadow-md"
            />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800 mb-2 tracking-tight">
            Selamat Datang!
          </h1>
          <p className="text-slate-500 font-medium">
            Belajar santuy bahasa Inggris dengan binCat!
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-100 text-red-600 text-sm font-medium rounded-xl text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10 transition-all outline-none text-slate-700 font-medium"
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
              className="w-full pl-12 pr-12 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10 transition-all outline-none text-slate-700 font-medium"
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
              {isLoading ? "MEMPROSES..." : "MASUK"}{" "}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </form>

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
