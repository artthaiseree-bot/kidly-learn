"use client";

import { ArrowLeft, PlayCircle } from "lucide-react";
import Link from "next/link";

export default function VideoViewerPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      
      {/* ส่วนหัว: ปุ่มกลับและชื่อเรื่อง */}
      <div className="mb-6 flex items-center justify-between">
        <Link href="/learn" className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition">
          <ArrowLeft size={16} /> กลับหน้าเรียนรู้
        </Link>
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <PlayCircle className="text-brand" size={24} /> รับชมวิดีโอ: เพลง ABC
        </h1>
      </div>
      
      {/* กรอบวิดีโอ YouTube */}
      <div className="w-full aspect-video rounded-3xl overflow-hidden border border-slate-100 shadow-lg bg-black relative">
        <iframe
          width="100%"
          height="100%"
          /* เปลี่ยนจาก youtu.be เป็น youtube.com/embed/ ตามด้วยรหัสวิดีโอ */
          src="https://www.youtube.com/embed/aKSgn-4gBqA?autoplay=1"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full absolute inset-0"
        />
      </div>

    </div>
  );
}