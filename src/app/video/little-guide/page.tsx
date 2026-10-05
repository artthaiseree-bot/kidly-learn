"use client";

import { ArrowLeft, PlayCircle } from "lucide-react";
import Link from "next/link";

export default function LittleGuideVideoPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      
      {/* ส่วนหัว: ปุ่มกลับและชื่อเรื่อง */}
      <div className="mb-6 flex items-center justify-between">
        <Link href="/animations" className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition">
          <ArrowLeft size={16} /> กลับหน้าแอนิเมชัน
        </Link>
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <PlayCircle className="text-brand" size={24} /> รับชมแอนิเมชัน: ไกด์น้อยพาท่องเที่ยว
        </h1>
      </div>
      
      {/* กรอบวิดีโอ YouTube */}
      <div className="w-full aspect-video rounded-3xl overflow-hidden border border-slate-100 shadow-lg bg-black relative">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/u7a_QmNMXjc?autoplay=1"
          title="ไกด์น้อยพาท่องเที่ยว"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full absolute inset-0"
        />
      </div>
      
      {/* รายละเอียดด้านล่างวิดีโอ (เพิ่มเติม) */}
      <div className="mt-6 rounded-2xl bg-white p-6 border border-slate-100 shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 mb-2">เรื่องย่อ</h2>
        <p className="text-slate-600 text-sm leading-relaxed">
          เรื่องราวของ "มะลิ" ไกด์เด็กน้อยสุดน่ารักที่พาชาวต่างชาติท่องเที่ยวในประเทศไทย แนะนำสถานที่สำคัญอย่างวัดพระแก้ว สัมผัสวิถีชีวิตที่ตลาดน้ำ นั่งรถตุ๊กๆ ชมวิวเมือง และปิดท้ายความประทับใจด้วยการชมพระอาทิตย์ตกที่วัดอรุณ เป็นแอนิเมชันที่ช่วยปลูกฝังความภาคภูมิใจในวัฒนธรรมไทยให้กับเด็กๆ
        </p>
      </div>

    </div>
  );
}