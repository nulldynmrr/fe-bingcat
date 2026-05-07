"use client";

import React from "react";
import { Upload, Plus, Search, FileText } from "lucide-react";

export default function QuestionBankPage() {
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
          <button className="flex-1 sm:flex-none bg-white border border-slate-200 text-slate-600 px-4 py-2.5 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-slate-50 hover:text-slate-800 transition-all shadow-sm">
            <Upload className="w-4 h-4" /> Upload JSON
          </button>
          <button className="flex-1 sm:flex-none bg-violet-600 text-white px-4 py-2.5 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-violet-700 shadow-sm transition-all active:scale-95">
            <Plus className="w-4 h-4" /> Tambah Soal
          </button>
        </div>
      </header>

      <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
        <div className="relative mb-6 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari berdasarkan teks soal atau ID..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-violet-500 focus:bg-white transition-all font-medium text-slate-700"
          />
        </div>

        <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="text-lg font-bold text-slate-700 mb-1">
            Belum ada soal
          </h3>
          <p className="text-slate-400 font-medium max-w-sm">
            Mulai bangun database soal EPrT dengan menambahkan soal secara
            manual atau upload file JSON.
          </p>
        </div>
      </div>
    </div>
  );
}
