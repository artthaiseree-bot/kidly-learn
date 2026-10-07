"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ArrowLeft, Users } from "lucide-react";

export default function AdminUsersPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;

    const userEmail = session?.user?.email?.toLowerCase() || "";
    const isAdmin =
      userEmail === "artthaiseree@gmail.com" ||
      session?.user?.role === "ADMIN";

    if (!isAdmin) {
      router.replace("/");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-100">
          กำลังตรวจสอบสิทธิ์...
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <button
        onClick={() => router.push("/me")}
        className="mb-4 flex items-center gap-1 text-xs font-bold text-pink-600 hover:underline"
      >
        <ArrowLeft size={16} /> กลับหน้าบัญชีของฉัน
      </button>

      <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-100">
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-6">
          <Users className="text-pink-600" size={24} /> จัดการระบบสมาชิก
        </h1>

        <p className="text-xs text-slate-500">
          รายชื่อผู้ใช้งานและการจัดการสมาชิกของระบบ
        </p>
      </div>
    </div>
  );
}
