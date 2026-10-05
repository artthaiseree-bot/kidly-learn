"use client";

import { ArrowLeft, PlayCircle } from "lucide-react";
import Link from "next/link";

export default function KindUncleVideoPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      
      {}
      <div className="mb-6 flex items-center justify-between">
        <Link href="/learn" className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition">
          <ArrowLeft size={16} /> กลับหน้าเรียนรู้
        </Link>
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <PlayCircle className="text-pink-500" size={24} /> รับชมวิดีโอ: คุณลุงใจดี
        </h1>
      </div>
      
      {}
      <div className="w-full aspect-video rounded-3xl overflow-hidden border border-slate-100 shadow-lg bg-black relative">
        <iframe
          width="100%"
          height="100%"
          /* แก้ไขลิงก์ให้เป็นรูปแบบ embed ที่ถูกต้องเพื่อไม่ให้โดนบล็อก */
          src="https://www.youtube.com/embed/y5EO4jqMXf0?autoplay=1"
          title="คุณลุงใจดี"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full absolute inset-0"
        />
      </div>

    </div>
  );
}