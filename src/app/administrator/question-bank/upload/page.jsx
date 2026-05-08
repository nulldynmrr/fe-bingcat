"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  UploadCloud,
  FileJson,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import request from "@/utils/request";
import { Copy } from "lucide-react";

export default function UploadJsonPage() {
  const [jsonInput, setJsonInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    if (!jsonInput.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const parsedData = JSON.parse(jsonInput);
      const response = await request.post(
        "/admin/questions/upload",
        parsedData,
      );

      if (response.data.status === "success") {
        setResult({ type: "success", message: response.data.message });
        setJsonInput("");
      }
    } catch (err) {
      setResult({
        type: "error",
        message: "Format JSON tidak valid atau data duplikat.",
      });
    } finally {
      setLoading(false);
    }
  };

  const jsonExample = `[
  {
    "chapter_id": 1,
    "type": "listening",
    "context_type": "dialogue",
    "context": { "script": "Man: Excuse me, Professor. Could you tell me who my lab partner is? My name is Mike Wheeler. \\nWoman: Of course, Mike. Your lab partner is Parvati Sharma. \\nNarrator: Why does the man see the woman?" },
    "question_text": "Why does the man see the woman?",
    "options": ["To ask about his lab partner", "To change his lab partner", "To leave the lab early", "To submit his lab work"],
    "correct_answer": "A",
    "explanation": "Pria tersebut bertanya langsung kepada profesor mengenai siapa partner labnya."
  },
  {
    "chapter_id": 1,
    "type": "structure",
    "context_type": "none",
    "context": {},
    "question_text": "The ancient Greeks worshiped _______ gods within a culture that tolerated diversity.",
    "options": ["many", "a little", "every", "Much"],
    "correct_answer": "A",
    "explanation": "Kata 'gods' adalah countable noun jamak, sehingga menggunakan 'many'."
  },
  {
    "chapter_id": 1,
    "type": "reading",
    "context_type": "text",
    "context": { "content": "Glass fibers are extremely strong; for their weight, they are stronger than steel. They are made by forcing molten glass through tiny holes called spinnerets." },
    "question_text": "Glass fibers are made by forcing molten glass through",
    "options": ["Spinners", "Spiderets", "Spinnerets", "Spinets"],
    "correct_answer": "C",
    "explanation": "Berdasarkan teks, serat kaca dibuat melalui spinnerets."
  }
]`;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link
        href="/administrator/question-bank"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-violet-600 font-bold text-sm transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />{" "}
        Kembali ke Bank Soal
      </Link>

      <header>
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight text-slate-800">
          Upload JSON Massal
        </h1>
        <p className="text-slate-500 font-medium">
          Tempel array JSON soal EPrT untuk impor cepat ke database.
        </p>
      </header>

      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6 text-slate-800">
        <div className="relative group">
          <div className="absolute top-4 right-4 text-slate-300 group-focus-within:text-violet-500 transition-colors">
            <FileJson className="w-10 h-10" />
          </div>
          <textarea
            rows="15"
            placeholder='[ { "chapter_id": 1, "type": "listening", ... } ]'
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            className="w-full bg-slate-900 border-4 border-slate-800 rounded-3xl p-6 font-mono text-xs text-emerald-400 outline-none focus:border-violet-500/50 transition-all shadow-inner"
          />
        </div>

        {result && (
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`p-5 rounded-2xl flex items-center gap-4 border-2 ${result.type === "success" ? "bg-emerald-50 border-emerald-100 text-emerald-700" : "bg-red-50 border-red-100 text-red-700"}`}
          >
            {result.type === "success" ? (
              <CheckCircle2 className="w-6 h-6" />
            ) : (
              <AlertCircle className="w-6 h-6" />
            )}
            <p className="font-bold">{result.message}</p>
          </motion.div>
        )}

        <button
          onClick={handleUpload}
          disabled={loading || !jsonInput}
          className={`w-full py-4 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 ${
            loading || !jsonInput
              ? "bg-slate-100 text-slate-400 cursor-not-allowed"
              : "bg-violet-600 text-white shadow-[0_6px_0_#4c1d95] active:translate-y-1 active:shadow-none"
          }`}
        >
          <UploadCloud className="w-6 h-6" />{" "}
          {loading ? "MEMPROSES DATA..." : "IMPOR SEKARANG"}
        </button>

        <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 text-slate-800">
          <h4 className="text-sm font-black text-blue-800 uppercase mb-2">
            Petunjuk Format:
          </h4>
          <ul className="text-[11px] font-bold text-blue-600 space-y-1 list-disc pl-4 italic mb-6">
            <li>Pastikan data berupa Array `[ ... ]`.</li>
            <li>
              Field wajib: `chapter_id`, `type`, `question_text`, `options`
              (Array), `correct_answer`.
            </li>
            <li>
              Tipe harus salah satu dari: `listening`, `reading`, atau
              `structure`.
            </li>
          </ul>

          <h4 className="text-sm font-black text-blue-800 uppercase mb-2">
            Contoh JSON:
          </h4>
          <div className="relative group">
            <pre className="w-full bg-slate-900 rounded-3xl p-6 font-mono text-[10px] text-emerald-400 overflow-x-auto border-4 border-slate-800 shadow-inner leading-relaxed custom-scrollbar">
              {jsonExample}
            </pre>

            <button
              onClick={() => {
                navigator.clipboard.writeText(jsonExample);
              }}
              className="absolute top-4 right-4 px-4 py-2 bg-violet-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl border-b-4 border-violet-800 hover:bg-violet-500 active:border-b-0 active:translate-y-1 transition-all opacity-0 group-hover:opacity-100 flex items-center gap-2 shadow-lg"
            >
              <Copy className="w-3 h-3" /> Copy Full JSON
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
