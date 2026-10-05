"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Shield, LogOut, BookPlus, LayoutDashboard } from "lucide-react";

export default function ProfilePage() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (!loggedIn) {
      router.push("/signin");
      return;
    }
    const userEmail = localStorage.getItem("userEmail") || "";
    setEmail(userEmail);

    if (userEmail.toLowerCase() === "artthaiseree@gmail.com" || userEmail.toLowerCase() === "admin@gmail.com") {
      setRole("admin");
      setName("เขมรุจิ กุลแพทย์");
      setAvatar("/logo.png");
    } else {
      setRole("member");
      const emailName = userEmail.split("@")[0] || "สมาชิก";
      setName(emailName.charAt(0).toUpperCase() + emailName.slice(1));
      setAvatar(`https://api.dicebear.com/7.x/avataaars/svg?seed=${userEmail}`);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/signin");
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-100">
        
        <div className="flex items-center gap-4 pb-6 border-b border-slate-100 mb-6">
          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-full bg-slate-100 border-2 border-pink-500/20 flex items-center justify-center">
            <img 
              src={avatar} 
              alt="Profile" 
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">{name}</h2>
            <p className="text-sm text-slate-500">{email}</p>
            <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-pink-50 text-pink-600">
              {role === "admin" ? "ผู้ดูแลระบบ (Admin)" : "สมาชิกทั่วไป (Member)"}
            </span>
          </div>
        </div>

        {role === "admin" && (
          <div className="mb-6 rounded-2xl bg-pink-50/50 p-4 border border-pink-100">
            <h3 className="text-xs font-bold text-pink-600 uppercase mb-3 flex items-center gap-1.5">
              <Shield size={16} /> เมนูจัดการสำหรับผู้ดูแลระบบ (Admin)
            </h3>
            <div className="space-y-2">
              <button 
                onClick={() => router.push("/admin/stories")}
                className="w-full flex items-center justify-between rounded-xl bg-white p-3 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-pink-50"
              >
                <span className="flex items-center gap-2"><BookPlus size={16} className="text-pink-600" /> เพิ่มนิทาน / จัดการเนื้อหา</span>
                <span className="text-pink-600">→</span>
              </button>
              <button 
                onClick={() => router.push("/admin/users")}
                className="w-full flex items-center justify-between rounded-xl bg-white p-3 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-pink-50"
              >
                <span className="flex items-center gap-2"><LayoutDashboard size={16} className="text-pink-600" /> จัดการระบบและสมาชิก</span>
                <span className="text-pink-600">→</span>
              </button>
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 rounded-2xl bg-red-50 py-3.5 text-sm font-bold text-red-500 transition hover:bg-red-100 border border-red-100"
        >
          <LogOut size={16} /> ออกจากระบบ
        </button>
      </div>
    </div>
  );
}