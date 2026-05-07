import AdminSidebar from "@/components/layout/AdminSidebar";
import AdminTopbar from "@/components/layout/AdminTopbar";

export default function AdministratorLayout({ children }) {
  return (
    <div className="h-screen w-screen bg-[#f8fafc] flex overflow-hidden font-sans">
      <AdminSidebar />

      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <AdminTopbar />

        <main className="flex-1 overflow-y-auto no-scrollbar p-6 lg:p-8">
          <div className="max-w-7xl mx-auto w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
