"use client";

import React, { useState, useEffect } from "react";
import {
  Upload,
  Plus,
  Search,
  FileText,
  ChevronRight,
  Edit3,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import request from "@/utils/request";

export default function QuestionBankPage() {
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await request.get(`/admin/questions?q=${search}`);
        if (response.data.status === "success") {
          setQuestions(response.data.data);
        }
      } catch (error) {
        console.error("Gagal mengambil data soal:", error);
      } finally {
        setIsLoading(false);
      }
    };
    const delayDebounceFn = setTimeout(() => {
      fetchQuestions();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Bank Soal
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Kelola soal-soal EPrT untuk kuis mahasiswa.
          </p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Link
            href="/administrator/question-bank/upload"
            className="flex-1 sm:flex-none"
          >
            <button className="w-full bg-white border border-slate-200 text-slate-600 px-4 py-2.5 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-slate-50 transition-all shadow-sm">
              <Upload className="w-4 h-4" /> Upload JSON
            </button>
          </Link>
          <Link
            href="/administrator/question-bank/add"
            className="flex-1 sm:flex-none"
          >
            <button className="w-full bg-violet-600 text-white px-4 py-2.5 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-violet-700 shadow-sm transition-all active:scale-95">
              <Plus className="w-4 h-4" /> Tambah Soal
            </button>
          </Link>
        </div>
      </header>

      <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
        <div className="relative mb-6 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari berdasarkan teks soal..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-violet-500 focus:bg-white transition-all font-medium text-slate-700"
          />
        </div>

        {isLoading ? (
          <div className="py-20 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500"></div>
          </div>
        ) : questions.length > 0 ? (
          <div className="overflow-hidden rounded-2xl border border-slate-100">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">
                    Tipe
                  </th>
                  <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">
                    Teks Soal
                  </th>
                  <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-right">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {questions.map((q) => (
                  <tr
                    key={q.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${
                          q.type === "reading"
                            ? "bg-blue-50 text-blue-600"
                            : q.type === "listening"
                              ? "bg-violet-50 text-violet-600"
                              : "bg-orange-50 text-orange-600"
                        }`}
                      >
                        {q.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-slate-700 line-clamp-1">
                        {q.question_text}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 text-slate-400 hover:text-violet-600 transition-colors">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-rose-600 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-700 mb-1">
              Belum ada soal ditemukan
            </h3>
            <p className="text-slate-400 font-medium max-w-sm">
              Mulai bangun database soal EPrT dengan menambahkan soal secara
              manual atau upload file JSON.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
