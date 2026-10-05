"use client";

import { useState } from "react";
import { Plus, BookOpen, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
  const [stories, setStories] = useState([
    { id: 1, title: "กระต่ายกับเต่า", category: "นิทานคลาสสิก" },
    { id: 2, title: "ลูกหมูสามตัว", category: "นิทานคลาสสิก" }
  ]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("นิทานอีสป");

  const handleAddStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setStories([...stories, { id: Date.now(), title, category }]);
    setTitle("");
    alert("เพิ่มนิทานสำเร็จ!");
  };

  const handleDelete = (id: number) => {
    setStories(stories.filter(s => s.id !== id));
  };

  return (
    <div className="mx-auto max-w-[800px] px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/me" className="flex items-center gap-2 text-sm text-muted hover:text-ink">
          <ArrowLeft size={16} /> กลับหน้าโปรไฟล์
        </Link>
        <h1 className="text-2xl font-extrabold text-ink">ระบบจัดการหลังบ้าน (Admin)</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* ฟอร์มเพิ่มนิทาน */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-ink mb-4 flex items-center gap-2">
            <Plus className="text-brand" size={20} /> เพิ่มนิทานใหม่
          </h2>
          <form onSubmit={handleAddStory} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-bold text-muted mb-1">ชื่อเรื่องนิทาน</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="ระบุชื่อนิทาน..."
                className="w-full rounded-xl bg-slate-50 px-4 py-3 text-sm border border-slate-100 outline-none focus:border-brand"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-muted mb-1">หมวดหมู่</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl bg-slate-50 px-4 py-3 text-sm border border-slate-100 outline-none focus:border-brand"
              >
                <option value="นิทานอีสป">นิทานอีสป</option>
                <option value="นิทานคลาสสิก">นิทานคลาสสิก</option>
                <option value="นิทานก่อนนอน">นิทานก่อนนอน</option>
              </select>
            </div>
            <button
              type="submit"
              className="rounded-xl bg-brand py-3 text-sm font-bold text-white transition hover:opacity-90 shadow-md shadow-brand/20"
            >
              บันทึกนิทาน
            </button>
          </form>
        </div>

        {/* รายการนิทานที่มีอยู่ */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-ink mb-4 flex items-center gap-2">
            <BookOpen className="text-brand" size={20} /> รายการนิทานทั้งหมด ({stories.length})
          </h2>
          <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto">
            {stories.map((story) => (
              <div key={story.id} className="flex items-center justify-between rounded-xl bg-slate-50 p-3 border border-slate-100">
                <div>
                  <p className="font-semibold text-sm text-ink">{story.title}</p>
                  <span className="text-xs text-muted">{story.category}</span>
                </div>
                <button
                  onClick={() => handleDelete(story.id)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}