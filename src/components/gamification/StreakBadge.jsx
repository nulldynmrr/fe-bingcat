import { Flame } from "lucide-react";

export default function StreakBadge({ days = 0 }) {
  return (
    <div className="bg-white px-4 py-2 rounded-full shadow-sm flex items-center gap-2 border border-violet-100 font-bold">
      <Flame
        className={`w-5 h-5 ${days > 0 ? "fill-orange-500 text-orange-500" : "text-slate-300"}`}
      />
      <span className={days > 0 ? "text-orange-500" : "text-slate-400"}>
        {days}
      </span>
    </div>
  );
}
