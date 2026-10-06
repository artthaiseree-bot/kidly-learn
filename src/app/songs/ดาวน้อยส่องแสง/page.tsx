"use client";

import { ArrowLeft, Music, Disc3 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

export default function AudioPlayerPage() {
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ถ้าเว็บยังโหลดไม่เสร็จ (อยู่ในขั้นตอนสร้างเว็บของ Vercel) ให้แสดงแค่หน้าโหลดก่อน
  // ป้องกัน Error สารพัดอย่างที่เกี่ยวกับ Browser DOM (DOM Exception)
  if (!isMounted) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin text-pink-400"><Disc3 size={40} /></div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      
      {/* ปุ่มกลับ */}
      <div className="mb-8 flex items-center justify-between">
        <Link href="/songs" className="flex items-center gap-2 text-sm text-slate-600 hover:text-pink-600 transition font-medium">
          <ArrowLeft size={18} /> กลับหน้าเพลงเด็ก
        </Link>
      </div>
      
      {/* กล่องเครื่องเล่น */}
      <div className="w-full rounded-3xl overflow-hidden border border-slate-100 shadow-xl bg-gradient-to-br from-indigo-50 via-white to-pink-50 p-8 flex flex-col items-center text-center relative">
        
        {/* ไอคอนตกแต่งพื้นหลัง */}
        <div className="absolute top-4 left-4 text-pink-200 opacity-50"><Music size={40} /></div>
        <div className="absolute bottom-4 right-4 text-indigo-200 opacity-50"><Music size={40} /></div>

        {/* แผ่นเสียงหมุนได้ */}
        <div className="w-48 h-48 bg-white rounded-full shadow-lg border-4 border-pink-100 flex items-center justify-center mb-8 relative z-10 animate-[spin_10s_linear_infinite]">
          <div className="w-16 h-16 bg-pink-50 rounded-full border border-pink-200 flex items-center justify-center">
            <Disc3 size={32} className="text-pink-400" />
          </div>
        </div>

        <h1 className="text-2xl font-black text-slate-800 mb-2 flex items-center gap-3">
          <Music className="text-pink-500" size={28} /> เพลง ดาวน้อยส่องแสง
        </h1>
        <p className="text-slate-500 mb-8 font-medium">เปิดฟังเพลินๆ เสริมพัฒนาการ</p>
        
        {/* เครื่องเล่นไฟล์ MP3 */}
        <div className="w-full max-w-md bg-white rounded-2xl p-2 shadow-sm border border-slate-100">
          <audio
            ref={audioRef}
            controls
            autoPlay
            className="w-full h-12 outline-none"
            src="/songs-mp3/ดาวน้อยส่องแสง.mp3"
          >
            เบราว์เซอร์ของคุณไม่รองรับการเล่นไฟล์เสียง
          </audio>
        </div>

      </div>

    </div>
  );
}