"use client";

import { BookOpen, Heart, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const featuredStories = [
    {
      id: 1,
      title: "ลูกเสือหลงฝูงไปในฝูงหมูป่า",
      category: "นิทานอีสป / ผจญภัย",
      description: "เรื่องราวการเดินทางอันแสนอบอุ่นในป่าใหญ่",
      link: "/ebook",
      image: "/images/tiger-cover.jpg",
    },
    {
      id: 2,
      title: "กระต่ายกับเต่า",
      category: "นิทานคลาสสิก",
      description: "นิทานคลาสสิกสอนใจเรื่องความพยายาม",
      link: "/ebook/rabbit-turtle",
      image: "/images/The Tortoise and the Hare.jpg",
    },
    {
      id: 3,
      title: "จรเข้น้อยเที่ยวในเมือง",
      category: "นิทานก่อนนอน",
      description: "นิทานสนุกสนานที่ช่วยฝึกความคิดสร้างสรรค์",
      link: "/ebook/little-crocodile-visits-the-city",
      image: "/images/Little Crocodile Visits the City.png",
    },
    {
      id: 4,
      title: "เด็กเลี้ยงแกะ",
      category: "นิทานก่อนนอน",
      description: "ผลของการโกหก",
      link: "/ebook/The-Shepherd-Boy",
      image: "/images/Shepherd-Boy2.png",
    },
    {
      id: 5,
      title: "ราชสีห์กับหนู",
      category: "นิทานก่อนนอน",
      description: "ถึงจะตัวเล็กแต่ใจใหญ่",
      link: "/ebook/Lion-and-the-mouse",
      image: "images/Lion-and-Mouse.png",
    },
    {
      id: 6,
      title: "หมาป่ากับลูกหมูสามตัว",
      category: "นิทานก่อนนอน",
      description: "ความฉลาดไม่เท่ากันแต่อยู่ด้วยกันได้",
      link: "/ebook/Wolf-and-Pigs",
      image: "images/Wolf-and-Pigs.png",
    }
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* --- ส่วนแบนเนอร์ Header --- */}
      <div className="w-full mb-8">
        <img 
          src="/Image2.png" 
          alt="Header Banner" 
          className="w-full h-auto rounded-3xl shadow-md object-cover"
        />
      </div>

      {/* --- หัวข้อ นิทานแนะนำสำหรับคุณ --- */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-ink flex items-center gap-2">
          <BookOpen className="text-brand" size={22} /> นิทานแนะนำสำหรับคุณ
        </h2>
      </div>

      {}
      {/* --- กล่องนิทานทั้ง 6 กล่อง --- */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {featuredStories.map((story) => (
          <div key={story.id} className="flex flex-col justify-between rounded-3xl bg-white p-5 shadow-sm border border-slate-100 transition hover:shadow-md">
            <div>
              <div className="mb-4 h-48 w-full rounded-2xl bg-slate-100 flex items-center justify-center relative overflow-hidden group">
                {/* ตรวจสอบว่ามีรูปภาพหรือไม่ ถ้าไม่มีให้แสดงเป็นกล่องสีเทาๆ ว่างๆ */}
                {story.image ? (
                  <img 
                    src={story.image} 
                    alt={story.title}
                    className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-full w-full bg-slate-200 flex items-center justify-center">
                    <span className="text-slate-400 text-sm">รอใส่รูปภาพ</span>
                  </div>
                )}
                <span className="absolute bottom-3 left-3 rounded-lg bg-white/90 px-2.5 py-1 text-xs font-bold text-brand shadow-sm">
                  {story.category}
                </span>
              </div>
              <h3 className="font-bold text-ink text-lg mb-1">{story.title}</h3>
              <p className="text-xs text-muted line-clamp-2">{story.description}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <Link
                href={story.link}
                className="text-xs font-bold text-brand hover:underline flex items-center gap-1"
              >
                อ่านเรื่องนี้ <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}