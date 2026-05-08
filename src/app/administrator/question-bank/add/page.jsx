"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Save,
  HelpCircle,
  BookOpen,
  List,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import request from "@/utils/request";

export default function AddQuestionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const [formData, setFormData] = useState({
    chapter_id: "1",
    type: "structure",
    context_type: "none",
    context: "",
    question_text: "",
    options: ["", "", "", ""],
    correct_answer: "A",
    explanation: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg({ type: "", text: "" });

    try {
      const payload = {
        ...formData,
        chapter_id: parseInt(formData.chapter_id),
        context: { content: formData.context },
        options: formData.options,
      };

      const response = await request.post("/admin/questions", payload);
      if (response.data.status === "success") {
        setMsg({ type: "success", text: "Meow! Soal berhasil ditambahkan!" });
        setTimeout(() => router.push("/administrator/question-bank"), 1500);
      }
    } catch (err) {
      setMsg({
        type: "error",
        text: err.response?.data?.message || "Gagal menambah soal.",
      });
    } finally {
      setLoading(false);
    }
  };

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
          Tambah Soal Baru
        </h1>
        <p className="text-slate-500 font-medium">
          Input materi EPrT sesuai format Language Center[cite: 7, 9].
        </p>
      </header>

      {msg.text && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`p-4 rounded-2xl font-bold text-center border-2 ${msg.type === "success" ? "bg-emerald-50 border-emerald-100 text-emerald-600" : "bg-red-50 border-red-100 text-red-600"}`}
        >
          {msg.text}
        </motion.div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8 text-slate-800"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-black text-slate-700 uppercase flex items-center gap-2 italic">
              <BookOpen className="w-4 h-4" /> Chapter ID
            </label>
            <input
              type="number"
              required
              value={formData.chapter_id}
              onChange={(e) =>
                setFormData({ ...formData, chapter_id: e.target.value })
              }
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-3 outline-none focus:border-violet-500 transition-all font-bold"
            />
          </div>
          <div className="space-y-2 text-slate-800">
            <label className="text-sm font-black text-slate-700 uppercase flex items-center gap-2 italic">
              <List className="w-4 h-4" /> Tipe Soal
            </label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-3 outline-none focus:border-violet-500 transition-all font-bold"
            >
              <option value="structure">Structure (Grammar)</option>
              <option value="listening">Listening (Communicative)</option>
              <option value="reading">Reading Comprehension</option>
            </select>
          </div>
        </div>

        <div className="space-y-2 text-slate-800">
          <label className="text-sm font-black text-slate-700 uppercase flex items-center gap-2 italic text-slate-800">
            <MessageSquare className="w-4 h-4" /> Konteks / Skrip (Opsional)
          </label>
          <textarea
            rows="3"
            placeholder="Masukkan skrip dialog atau teks bacaan jika ada..."
            value={formData.context}
            onChange={(e) =>
              setFormData({ ...formData, context: e.target.value })
            }
            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-3 outline-none focus:border-violet-500 transition-all font-medium text-slate-600"
          />
        </div>

        <div className="space-y-2 text-slate-800">
          <label className="text-sm font-black text-slate-700 uppercase italic">
            Teks Pertanyaan
          </label>
          <input
            type="text"
            required
            placeholder="Contoh: What does the woman ask the man to do?"
            value={formData.question_text}
            onChange={(e) =>
              setFormData({ ...formData, question_text: e.target.value })
            }
            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-3 outline-none focus:border-violet-500 transition-all font-bold"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-800">
          {formData.options.map((opt, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center font-black text-violet-600 shrink-0">
                {String.fromCharCode(65 + idx)}
              </div>
              <input
                type="text"
                required
                placeholder={`Pilihan ${String.fromCharCode(65 + idx)}`}
                value={opt}
                onChange={(e) => {
                  const newOpts = [...formData.options];
                  newOpts[idx] = e.target.value;
                  setFormData({ ...formData, options: newOpts });
                }}
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-3 outline-none focus:border-violet-500 transition-all font-bold"
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-800">
          <div className="space-y-2 text-slate-800">
            <label className="text-sm font-black text-slate-700 uppercase italic">
              Jawaban Benar
            </label>
            <select
              value={formData.correct_answer}
              onChange={(e) =>
                setFormData({ ...formData, correct_answer: e.target.value })
              }
              className="w-full bg-emerald-50 border-2 border-emerald-100 text-emerald-700 rounded-2xl px-4 py-3 outline-none font-black text-slate-800"
            >
              <option value="A">Opsi A</option>
              <option value="B">Opsi B</option>
              <option value="C">Opsi C</option>
              <option value="D">Opsi D</option>
            </select>
          </div>
          <div className="space-y-2 text-slate-800">
            <label className="text-sm font-black text-slate-700 uppercase italic">
              Penjelasan (Hint)
            </label>
            <input
              type="text"
              placeholder="Kenapa jawaban ini benar?"
              value={formData.explanation}
              onChange={(e) =>
                setFormData({ ...formData, explanation: e.target.value })
              }
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-3 outline-none focus:border-violet-500 transition-all font-medium text-slate-800"
            />
          </div>
        </div>

        <div className="pt-6 border-t border-slate-50">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-violet-600 text-white rounded-2xl font-black text-lg shadow-[0_6px_0_#4c1d95] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-3"
          >
            <Save className="w-6 h-6" />{" "}
            {loading ? "SEDANG MENYIMPAN..." : "SIMPAN SOAL"}
          </button>
        </div>
      </form>
    </div>
  );
}
