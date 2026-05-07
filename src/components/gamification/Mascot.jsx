"use client";
import { motion } from "framer-motion";
import { Cat } from "lucide-react";

export default function Mascot({ message = "Semangat belajar!" }) {
  return (
    <div className="flex items-center gap-4 p-4">
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-violet-100"
      >
        <Cat className="w-10 h-10 text-violet-500" />
      </motion.div>

      <div className="bg-white p-4 rounded-3xl rounded-tl-sm shadow-sm border border-violet-100 relative max-w-[200px]">
        <p className="text-sm font-bold text-slate-700">{message}</p>

        <div className="absolute top-2 -left-2 w-4 h-4 bg-white rotate-45 border-l border-b border-violet-100" />
      </div>
    </div>
  );
}
