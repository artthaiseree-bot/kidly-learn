"use client";

import { ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

export default function LearnViewerPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const hideShareButton = () => {
    try {
      const iframe = iframeRef.current;
      if (iframe && iframe.contentWindow && iframe.contentWindow.document) {
        const iframeDoc = iframe.contentWindow.document;
        const style = iframeDoc.createElement('style');
        style.innerHTML = `
          [class*="share"], [id*="share"], [title*="share" i], [title*="แชร์" i],
          a[href*="share"], button[aria-label*="share" i] {
            display: none !important;
            pointer-events: none !important;
            opacity: 0 !important;
          }
        `;
        iframeDoc.head.appendChild(style);
      }
    } catch (error) {
      console.log("ไม่สามารถซ่อนปุ่มแชร์ได้:", error);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/learn" className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900">
          <ArrowLeft size={16} /> กลับหน้าเรียนรู้
        </Link>
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <BookOpen className="text-pink-600" size={24} /> เริ่มเรียน ก-ฮ
        </h1>
      </div>
      
      <div className="w-full h-[700px] rounded-3xl overflow-hidden border border-slate-100 shadow-sm bg-white relative">
        <iframe
          ref={iframeRef}
          onLoad={hideShareButton}
          src="/books/thai-alphabet/index.html"
          className="w-full h-full border-0"
          title="เริ่มเรียน ก-ฮ"
        />
      </div>
    </div>
  );
}