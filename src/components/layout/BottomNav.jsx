"use client";
import Link from "next/link";
import { Home, Trophy, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/home", icon: Home, label: "Belajar" },
    { href: "/leaderboard", icon: Trophy, label: "Peringkat" },
    { href: "/profile", icon: User, label: "Profil" },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-[380px] px-6 z-50">
      <nav className="bg-white/95 backdrop-blur-xl border-2 border-slate-100 shadow-[0_20px_40px_-10px_rgba(139,92,246,0.15)] rounded-[2rem] px-8 py-4 flex justify-between items-center">
        {navItems.map((item) => {
          const isActive = pathname?.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex flex-col items-center group"
            >
              <item.icon
                className={`w-7 h-7 transition-all duration-300 ${
                  isActive
                    ? "text-violet-500 scale-110"
                    : "text-slate-300 group-hover:text-violet-300 group-hover:scale-105"
                }`}
              />

              {isActive && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute -bottom-2.5 w-1.5 h-1.5 bg-violet-500 rounded-full shadow-[0_0_8px_rgba(139,92,246,0.8)]"
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
