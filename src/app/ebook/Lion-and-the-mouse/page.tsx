"use client";

import { ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

export default function EBookViewerPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // ฟังก์ชันนี้จะทำงานเมื่อนิทาน E-book โหลดเสร็จ
  const hideShareButton = () => {
    try {
      const iframe = iframeRef.current;
      // เช็คว่า iframe โหลดเนื้อหาในเว็บเราสำเร็จแล้ว
      if (iframe && iframe.contentWindow && iframe.contentWindow.document) {
        const iframeDoc = iframe.contentWindow.document;
        
        // สร้าง Tag <style> เพื่อเอาไปใส่ใน E-book
        const style = iframeDoc.createElement('style');
        style.innerHTML = `
          /* ดักจับปุ่มที่มีชื่อ Class หรือ ID เกี่ยวกับการแชร์ แล้วสั่งซ่อน */
          [class*="share"], 
          [id*="share"], 
          [title*="share" i], 
          [title*="แชร์" i],
          a[href*="share"], 
          button[aria-label*="share" i] {
            display: none !important;
            pointer-events: none !important;
            opacity: 0 !important;
          }
        `;
        // แอบยัดโค้ด CSS ซ่อนปุ่มเข้าไปในหัว (Head) ของ E-book
        iframeDoc.head.appendChild(style);
      }
    } catch (error) {
      console.log("ไม่สามารถซ่อนปุ่มแชร์ได้:", error);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/stories" className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900">
          <ArrowLeft size={16} /> กลับไปหน้านิทาน
        </Link>
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <BookOpen className="text-pink-600" size={24} /> อ่าน E-Book ราชสีห์กับหนู
        </h1>
      </div>
      
      <div className="w-full h-[700px] rounded-3xl overflow-hidden border border-slate-100 shadow-sm bg-white relative">
        <iframe
          ref={iframeRef}
          onLoad={hideShareButton} // เรียกใช้ฟังก์ชันซ่อนปุ่มเมื่อโหลดเสร็จ
          src="/books/Lion-and-the-mouse/index.html"
          className="w-full h-full border-0"
          title="E-Book ราชสีห์กับหนู"
        />
      </div>
    </div>
  );
}