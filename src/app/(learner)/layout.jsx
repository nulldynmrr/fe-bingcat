import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import BottomNav from "@/components/layout/BottomNav";

export default function LearnerLayout({ children }) {
  return (
    <div className="h-screen w-screen bg-violet-50 flex justify-center items-center sm:p-4 md:p-6 overflow-hidden">
      <div className="w-full h-full bg-[#f4f7fa] sm:rounded-[2rem] shadow-xl shadow-violet-200/40 flex relative overflow-hidden">
        <Sidebar />

        <div className="flex-1 flex flex-col h-full overflow-hidden relative">
          <Topbar />

          <div className="flex-1 flex overflow-hidden">{children}</div>
        </div>

        <div className="absolute bottom-0 w-full z-50 lg:hidden">
          <BottomNav />
        </div>
      </div>
    </div>
  );
}
