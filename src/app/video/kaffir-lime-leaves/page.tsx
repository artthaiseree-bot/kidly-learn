"use client";

import { ArrowLeft, PlayCircle } from "lucide-react";
import Link from "next/link";

export default function KaffirLimeLeavesVideoPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      
      {/* ส่วนหัว */}
      <div className="mb-6 flex items-center justify-between">
        <Link href="/animations" className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition">
          <ArrowLeft size={16} /> กลับ
        </Link>
        <h1 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          ใบมะกรูด
        </h1>
      </div>
      
      {/* กรอบวิดีโอ Shorts (แนวตั้ง) */}
      <div className="w-full aspect-[9/16] rounded-3xl overflow-hidden border border-slate-100 shadow-lg bg-black relative mx-auto max-h-[80vh]">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/JLi71LxOgQ8?autoplay=1"
          title="ใบมะกรูด"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full absolute inset-0"
        />
      </div>

    </div>
  );
}