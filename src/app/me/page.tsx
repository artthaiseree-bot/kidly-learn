"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { User, Mail, Shield, LogOut, BookPlus, LayoutDashboard } from "lucide-react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // ถ้าระบบกำลังโหลดข้อมูล ให้แสดงสถานะกำลังโหลด
  if (status === "loading") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-sm text-slate-400">กำลังโหลดข้อมูลโปรไฟล์...</p>
      </div>
    );
  }

  // ถ้ายังไม่ล็อกอิน ให้พาไปหน้า signin
  if (!session) {
    router.push("/signin");
    return null;
  }

  const userEmail = session.user?.email || "";
  const userName = session.user?.name || "เขมรุจิ กุลแพทย์";
  const userImage = session.user?.image || "/logo.png";
  
  // เช็คสิทธิ์ Admin จากอีเมลของคุณเอ้
  const isAdmin = userEmail.toLowerCase() === "artthaiseree@gmail.com" || session.user?.role === "ADMIN";

  const handleLogout = () => {
    signOut({ callbackUrl: "/signin" });
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-100">
        
        <div className="flex items-center gap-4 pb-6 border-b border-slate-100 mb-6">
          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-full bg-slate-100 border-2 border-pink-500/20 flex items-center justify-center shadow-md">
            <img 
              src={userImage} 
              alt="Profile" 
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">{userName}</h2>
            <p className="text-sm text-slate-500">{userEmail}</p>
            <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-pink-50 text-pink-600">
              {isAdmin ? "ผู้ดูแลระบบ (Admin)" : "สมาชิกทั่วไป (Member)"}
            </span>
          </div>
        </div>

        {isAdmin && (
          <div className="mb-6 rounded-2xl bg-pink-50/50 p-4 border border-pink-100">
            <h3 className="text-xs font-bold text-pink-600 uppercase mb-3 flex items-center gap-1.5">
              <Shield size={16} /> เมนูจัดการสำหรับผู้ดูแลระบบ (Admin)
            </h3>
            <div className="space-y-2">
              <button 
                onClick={() => router.push("/admin/stories")}
                className="w-full flex items-center justify-between rounded-xl bg-white p-3 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-pink-50 cursor-pointer"
              >
                <span className="flex items-center gap-2"><BookPlus size={16} className="text-pink-600" /> เพิ่มนิทาน / จัดการเนื้อหา</span>
                <span className="text-pink-600">→</span>
              </button>
              <button 
                onClick={() => router.push("/admin/users")}
                className="w-full flex items-center justify-between rounded-xl bg-white p-3 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-pink-50 cursor-pointer"
              >
                <span className="flex items-center gap-2"><LayoutDashboard size={16} className="text-pink-600" /> จัดการระบบและสมาชิก</span>
                <span className="text-pink-600">→</span>
              </button>
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 rounded-2xl bg-red-50 py-3.5 text-sm font-bold text-red-500 transition hover:bg-red-100 border border-red-100 cursor-pointer"
        >
          <LogOut size={16} /> ออกจากระบบ
        </button>
      </div>
    </div>
  );
}