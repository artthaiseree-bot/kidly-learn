"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ArrowLeft, Plus, BookOpen } from "lucide-react";

export default function AdminStoriesPage() {
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
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <BookOpen className="text-pink-600" size={24} /> จัดการนิทานและเนื้อหา
          </h1>

          <button
            onClick={() => router.push("/admin/stories/new")}
            className="flex items-center gap-1.5 rounded-2xl bg-pink-600 px-4 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-pink-700"
          >
            <Plus size={16} /> เพิ่มนิทานใหม่
          </button>
        </div>

        <p className="text-xs text-slate-500">
          ระบบสำหรับเพิ่มเติม แก้ไข และจัดการรายการนิทานในระบบ
        </p>
      </div>
    </div>
  );
}
