"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ArrowLeft, PlusCircle, BookOpen, FileText, FileArchive, Upload, Image as ImageIcon } from "lucide-react";

export default function AddStoryPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("นิทานอีสป / ผจญภัย");
  const [description, setDescription] = useState("");
  
  const [imageName, setImageName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [ebookName, setEbookName] = useState("");
  const [ebookUrl, setEbookUrl] = useState("");
  const [zipName, setZipName] = useState("");
  const [zipUrl, setZipUrl] = useState("");

  // ถ้าระบบกำลังเช็คสถานะล็อกอิน
  if (status === "loading") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-sm text-slate-400">กำลังตรวจสอบสิทธิ์...</p>
      </div>
    );
  }

  // ถ้ายังไม่ล็อกอิน ให้ดีดไปหน้า signin
  if (!session) {
    router.push("/signin");
    return null;
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageName(file.name);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleEbookChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEbookName(file.name);
      setEbookUrl(URL.createObjectURL(file));
    }
  };

  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setZipName(file.name);
      setZipUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newStory = {
      id: Date.now(),
      title,
      category,
      description,
      image: imageUrl || "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop",
      ebookUrl: ebookUrl || "#",
      zipUrl: zipUrl || "#",
      zipFileName: zipName || "ไฟล์นิทาน.zip",
      link: "#"
    };

    const existingStories = JSON.parse(localStorage.getItem("customStories") || "[]");
    localStorage.setItem("customStories", JSON.stringify([newStory, ...existingStories]));

    alert("เพิ่มนิทานและอัปโหลดไฟล์สำเร็จแล้ว");
    router.push("/admin/stories");
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <button 
        onClick={() => router.push("/me")} 
        className="mb-4 flex items-center gap-1 text-xs font-bold text-pink-600 hover:underline cursor-pointer"
      >
        <ArrowLeft size={16} /> กลับไปหน้าโปรไฟล์
      </button>

      <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-100">
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-6">
          <BookOpen className="text-pink-600" size={24} /> เพิ่มนิทานเล่มใหม่
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">ชื่อเรื่องนิทาน</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm focus:bg-white focus:outline-none focus:border-pink-500"
              placeholder="เช่น มดน้อยหลงเข้าไปในเมือง"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">หมวดหมู่นิทาน</label>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm focus:bg-white focus:outline-none focus:border-pink-500"
            >
              <option value="นิทานอีสป / ผจญภัย">นิทานอีสป / ผจญภัย</option>
              <option value="นิทานคลาสสิก">นิทานคลาสสิก</option>
              <option value="นิทานก่อนนอน">นิทานก่อนนอน</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">คำอธิบายย่อ</label>
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm focus:bg-white focus:outline-none focus:border-pink-500"
              placeholder="รอยเรื่องย่อสั้นๆ ของนิทานเรื่องนี้"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
              <ImageIcon size={14} className="text-pink-600" /> อัปโหลดรูปภาพปกจากคอมพิวเตอร์
            </label>
            <div className="flex items-center gap-2">
              <label className="flex cursor-pointer items-center gap-2 rounded-2xl bg-pink-50 px-4 py-3 text-xs font-bold text-pink-600 border border-pink-100 hover:bg-pink-100 transition">
                <Upload size={16} /> เลือกรูปภาพ
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
              <span className="text-xs text-slate-500 truncate">
                {imageName ? `🖼️ ${imageName}` : "ยังไม่ได้เลือกรูปภาพ (ใช้รูปตัวอย่างอัตโนมัติ)"}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
              <FileText size={14} className="text-pink-600" /> อัปโหลดไฟล์ E-book (PDF) จากคอมพิวเตอร์
            </label>
            <div className="flex items-center gap-2">
              <label className="flex cursor-pointer items-center gap-2 rounded-2xl bg-pink-50 px-4 py-3 text-xs font-bold text-pink-600 border border-pink-100 hover:bg-pink-100 transition">
                <Upload size={16} /> เลือกไฟล์ PDF
                <input type="file" accept=".pdf" onChange={handleEbookChange} className="hidden" />
              </label>
              <span className="text-xs text-slate-500 truncate">
                {ebookName ? `📄 ${ebookName}` : "ยังไม่ได้เลือกไฟล์ PDF"}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
              <FileArchive size={14} className="text-pink-600" /> อัปโหลดไฟล์ ZIP จากคอมพิวเตอร์
            </label>
            <div className="flex items-center gap-2">
              <label className="flex cursor-pointer items-center gap-2 rounded-2xl bg-pink-50 px-4 py-3 text-xs font-bold text-pink-600 border border-pink-100 hover:bg-pink-100 transition">
                <Upload size={16} /> เลือกไฟล์ ZIP
                <input type="file" accept=".zip" onChange={handleZipChange} className="hidden" />
              </label>
              <span className="text-xs text-slate-500 truncate">
                {zipName ? `📁 ${zipName}` : "ยังไม่ได้เลือกไฟล์ ZIP"}
              </span>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full mt-4 flex items-center justify-center gap-2 rounded-2xl bg-pink-600 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-pink-700 cursor-pointer"
          >
            <PlusCircle size={18} /> บันทึกและเพิ่มนิทาน
          </button>
        </form>
      </div>
    </div>
  );
}