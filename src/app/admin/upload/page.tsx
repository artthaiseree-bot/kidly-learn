"use client";

import { useState } from "react";

export default function UploadStoryPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    ok: boolean;
    message: string;
    readerPath?: string;
  } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);

    try {
      const res = await fetch("/api/admin/upload-story", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      setResult(json);
      if (json.ok) formEl.reset();
    } catch {
      setResult({ ok: false, message: "เชื่อมต่อไม่สำเร็จ ลองใหม่อีกครั้ง" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10">
      <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
        <h1 className="mb-1 text-2xl font-bold text-pink-600">
          เพิ่มนิทานเล่มใหม่
        </h1>
        <p className="mb-8 text-sm text-slate-500">
          อัปโหลดไฟล์นิทาน (.zip) และรูปหน้าปก ระบบจะนำขึ้นเว็บให้อัตโนมัติ
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ชื่อเรื่อง */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              ชื่อเรื่องนิทาน <span className="text-pink-500">*</span>
            </label>
            <input
              name="title"
              required
              placeholder="เช่น จระเข้น้อยเที่ยวในเมือง"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-pink-400"
            />
          </div>

          {/* คำอธิบาย */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              คำอธิบายย่อ
            </label>
            <textarea
              name="description"
              rows={3}
              placeholder="นิทานสนุกสนานที่ช่วยฝึกความคิดสร้างสรรค์"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-pink-400"
            />
          </div>

          {/* ช่วงอายุ */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                อายุต่ำสุด (ปี)
              </label>
              <input
                name="ageMin"
                type="number"
                min={0}
                max={18}
                placeholder="3"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-pink-400"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                อายุสูงสุด (ปี)
              </label>
              <input
                name="ageMax"
                type="number"
                min={0}
                max={18}
                placeholder="8"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-pink-400"
              />
            </div>
          </div>

          {/* รูปหน้าปก */}
          <div className="rounded-xl bg-pink-50/60 p-4">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              รูปภาพหน้าปก
            </label>
            <input
              name="cover"
              type="file"
              accept="image/*"
              className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-full file:border-0 file:bg-pink-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
            />
            <p className="mt-2 text-xs text-slate-500">
              ระบบจะเก็บไว้ใน public/images ให้อัตโนมัติ
            </p>
          </div>

          {/* ไฟล์ ZIP */}
          <div className="rounded-xl bg-pink-50/60 p-4">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              ไฟล์นิทาน (.zip) <span className="text-pink-500">*</span>
            </label>
            <input
              name="zip"
              type="file"
              accept=".zip"
              required
              className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-full file:border-0 file:bg-pink-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
            />
            <p className="mt-2 text-xs text-slate-500">
              บีบอัดโฟลเดอร์นิทานที่มี index.html, assets, pages
            </p>
          </div>

          {/* ตัวเลือกการแสดงผล */}
          <div className="space-y-3 rounded-xl border border-slate-200 p-4">
            <label className="flex items-center gap-3 text-sm text-slate-700">
              <input
                name="isPublished"
                type="checkbox"
                defaultChecked
                className="h-4 w-4 accent-pink-500"
              />
              เผยแพร่ทันที (แสดงในหน้านิทาน)
            </label>
            <label className="flex items-center gap-3 text-sm text-slate-700">
              <input
                name="isFeatured"
                type="checkbox"
                defaultChecked
                className="h-4 w-4 accent-pink-500"
              />
              ปักหมุดหน้าแรก (นิทานแนะนำสำหรับคุณ)
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-pink-600 py-3.5 text-sm font-bold text-white transition hover:bg-pink-700 disabled:opacity-50"
          >
            {loading ? "กำลังอัปโหลด กรุณารอสักครู่..." : "บันทึกและเพิ่มนิทาน"}
          </button>
        </form>

        {result && (
          <div
            className={`mt-6 rounded-xl p-4 text-sm ${
              result.ok
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            <p className="font-semibold">{result.message}</p>
            {result.ok && result.readerPath && (
              <a
                href={result.readerPath}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block underline"
              >
                คลิกเพื่อเปิดดูนิทานที่เพิ่งอัปโหลด
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}