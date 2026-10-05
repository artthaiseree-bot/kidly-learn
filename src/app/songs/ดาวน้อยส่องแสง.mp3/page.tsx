"use client";

import { ArrowLeft, Music, Disc3 } from "lucide-react";
import Link from "next/link";

export default function AudioPlayerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      
      {/* ส่วนหัว: ปุ่มกลับและชื่อเรื่อง */}
      <div className="mb-8 flex items-center justify-between">
        <Link href="/songs" className="flex items-center gap-2 text-sm text-slate-600 hover:text-pink-600 transition font-medium">
          <ArrowLeft size={18} /> กลับหน้าเพลงเด็ก
        </Link>
      </div>
      
      {/* กล่องเครื่องเล่นเพลง */}
      <div className="w-full rounded-3xl overflow-hidden border border-slate-100 shadow-xl bg-gradient-to-br from-indigo-50 via-white to-pink-50 p-8 flex flex-col items-center text-center relative">
        
        {/* ไอคอนตกแต่งพื้นหลัง */}
        <div className="absolute top-4 left-4 text-pink-200 opacity-50"><Music size={40} /></div>
        <div className="absolute bottom-4 right-4 text-indigo-200 opacity-50"><Music size={40} /></div>

        {/* รูปปกแผ่นเสียงจำลอง (หมุนได้ถ้าต้องการใส่ CSS เพิ่ม) */}
        <div className="w-48 h-48 bg-white rounded-full shadow-lg border-4 border-pink-100 flex items-center justify-center mb-8 relative z-10">
          <div className="w-16 h-16 bg-pink-50 rounded-full border border-pink-200 flex items-center justify-center">
            <Disc3 size={32} className="text-pink-400" />
          </div>
        </div>

        {/* ชื่อเพลง */}
        <h1 className="text-2xl font-black text-slate-800 mb-2 flex items-center gap-3">
          <Music className="text-pink-500" size={28} /> เพลง ดาวน้อยส่องแสง
        </h1>
        <p className="text-slate-500 mb-8 font-medium">เปิดฟังเพลินๆ เสริมพัฒนาการ</p>
        
        {/* เครื่องเล่นเสียง (Audio Player) */}
        <div className="w-full max-w-md bg-white rounded-2xl p-2 shadow-sm border border-slate-100">
          <audio
            controls
            autoPlay
            className="w-full h-12 outline-none"
            /* เปลี่ยนชื่อไฟล์ตรงนี้ให้ตรงกับที่คุณเซฟไว้ในโฟลเดอร์ public/songs-mp3/ */
            src="/songs-mp3/ดาวน้อยส่องแสง.mp3"
          >
            เบราว์เซอร์ของคุณไม่รองรับการเล่นไฟล์เสียง
          </audio>
        </div>

      </div>

    </div>
  );
}