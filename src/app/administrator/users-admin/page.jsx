"use client";

import React from "react";
import { Search, MoreVertical, ShieldCheck } from "lucide-react";

export default function UsersAdminPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
          Manajemen Pengguna
        </h1>
        <p className="text-slate-500 font-medium mt-1">
          Pantau data mahasiswa dan progres belajar mereka.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total Siswa
            </p>
            <p className="text-2xl font-black text-slate-800">1,284</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
        <div className="relative mb-6 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari mahasiswa berdasarkan nama atau NIM..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-violet-500 focus:bg-white transition-all font-medium text-slate-700"
          />
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-100">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-extrabold rounded-tl-xl">Nama Siswa</th>
                <th className="p-4 font-extrabold">Email Institusi</th>
                <th className="p-4 font-extrabold">Total XP</th>
                <th className="p-4 font-extrabold text-center rounded-tr-xl">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((item) => (
                <tr
                  key={item}
                  className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden shrink-0">
                        <img
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Student${item}`}
                          alt="Avatar"
                          className="w-full h-full object-cover bg-white"
                        />
                      </div>
                      <span className="font-bold text-slate-700">
                        Mahasiswa {item}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 font-medium text-slate-500">
                    mhs{item}@student.telkomuniversity.ac.id
                  </td>
                  <td className="p-4 font-black text-violet-600">1,200</td>
                  <td className="p-4 flex justify-center">
                    <button className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-lg transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
