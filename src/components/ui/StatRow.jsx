import React from "react";

export default function StatRow({ label, value, color }) {
  return (
    <div className="flex justify-between items-center py-1.5">
      <span className="text-xs font-bold text-slate-500">{label}</span>
      <span className={`text-sm font-black ${color}`}>{value}</span>
    </div>
  );
}
