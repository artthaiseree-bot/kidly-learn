"use client";

import { ArrowLeft, PlayCircle } from "lucide-react";
import Link from "next/link";

export default function KorHorVideoPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      
      <div className="mb-6 flex items-center justify-between">
        <Link href="/learn" className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition">
          <ArrowLeft size={16} /> กลับหน้าเรียนรู้
        </Link>
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <PlayCircle className="text-pink-500" size={24} /> รับชมวิดีโอ: เพลง ก-ฮ
        </h1>
      </div>
      
      <div className="w-full aspect-video rounded-3xl overflow-hidden border border-slate-100 shadow-lg bg-black relative">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/w04aYqMnS-s?autoplay=1"
          title="เพลง ก-ฮ"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full absolute inset-0"
        />
      </div>

    </div>
  );
}