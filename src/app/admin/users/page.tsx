"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Users } from "lucide-react";

export default function AdminUsersPage() {
  const router = useRouter();

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail") || "";
    const isAdmin = userEmail.toLowerCase() === "artthaiseree@gmail.com" || userEmail.toLowerCase() === "admin@gmail.com";
    if (!isAdmin) {
      router.push("/");
    }
  }, [router]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <button 
        onClick={() => router.push("/me")} 
        className="mb-4 flex items-center gap-1 text-xs font-bold text-pink-600 hover:underline"
      >
        <ArrowLeft size={16} /> กลับหน้าโปรไฟล์
      </button>

      <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-100">
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-6">
          <Users className="text-pink-600" size={24} /> จัดการระบบและสมาชิก
        </h1>
        <p className="text-xs text-slate-500">รายชื่อผู้ใช้งานทั้งหมดและการตั้งค่าระบบ</p>
      </div>
    </div>
  );
}