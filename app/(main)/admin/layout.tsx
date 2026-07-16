import type { ReactNode } from "react";
import AdminSidebar from "@/sections/other/AdminSidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 md:pl-64">
      <AdminSidebar />
      <main className="p-6 sm:p-10">
        <div className="mx-auto max-w-9xl">{children}</div>
      </main>
    </div>
  );
}