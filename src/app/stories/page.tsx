"use client";

import { BookOpen, Search, ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function StoriesPage() {
  const allStories = [
    {
      id: 1,
      title: "ลูกเสือหลงฝูงไปในฝูงหมูป่า",
      category: "นิทานอีสป / ผจญภัย",
      description: "เรื่องราวการเดินทางอันแสนอบอุ่นในป่าใหญ่",
      link: "/ebook",
      image: "/images/tiger-cover.jpg",
      filterAge: "4-6 ปี",
      filterLanguage: "ไทย",
      filterType: "นิทานภาพ",
      filterCategory: "ผจญภัย",
      filterDuration: "5-10 นาที",
    },
    {
      id: 2,
      title: "กระต่ายกับเต่า",
      category: "นิทานคลาสสิก",
      description: "นิทานคลาสสิกสอนใจเรื่องความพยายาม",
      link: "/ebook/rabbit-turtle",
      image: "/images/The Tortoise and the Hare.jpg",
      filterAge: "4-6 ปี",
      filterLanguage: "ไทย",
      filterType: "นิทานภาพ",
      filterCategory: "คลาสสิก",
      filterDuration: "ไม่เกิน 5 นาที",
    },
    {
      id: 3,
      title: "จรเข้น้อยเที่ยวในเมือง",
      category: "นิทานก่อนนอน",
      description: "นิทานสนุกสนานที่ช่วยฝึกความคิดสร้างสรรค์",
      link: "/ebook/little-crocodile-visits-the-city",
      image: "/images/Little Crocodile Visits the City.png",
      filterAge: "0-3 ปี",
      filterLanguage: "สองภาษา",
      filterType: "นิทานภาพ",
      filterCategory: "ก่อนนอน",
      filterDuration: "5-10 นาที",
    },
    {
      id: 4,
      title: "เด็กเลี้ยงแกะ",
      category: "นิทานก่อนนอน",
      description: "ผลของการโกหก",
      link: "/ebook/The-Shepherd-Boy",
      image: "/images/Shepherd-Boy2.png",
      filterAge: "7-9 ปี",
      filterLanguage: "ไทย",
      filterType: "นิทานภาพ",
      filterCategory: "ก่อนนอน",
      filterDuration: "ไม่เกิน 5 นาที",
    },
    {
      id: 5,
      title: "ราชสีห์กับหนู",
      category: "นิทานก่อนนอน",
      description: "ถึงจะตัวเล็กแต่ใจใหญ่",
      link: "/ebook/Lion-and-the-mouse",
      image: "/images/Lion-and-Mouse.png", // เพิ่มเครื่องหมาย / ด้านหน้าให้แล้วครับ
      filterAge: "10 ปีขึ้นไป",
      filterLanguage: "ไทย",
      filterType: "นิทานแอนิเมชั่น",
      filterCategory: "ครอบครัว",
      filterDuration: "5-10 นาที",
    },
    {
      id: 6,
      title: "หมาป่ากับลูกหมูสามตัว",
      category: "นิทานก่อนนอน",
      description: "ความฉลาดบางคนไม่เท่ากันแต่อยู่ร่วมกันได้",
      link: "/ebook/Wolf-and-Pigs",
      image: "/images/Wolf-and-Pigs.png", // เพิ่มเครื่องหมาย / ด้านหน้าให้แล้วครับ
      filterAge: "10 ปีขึ้นไป",
      filterLanguage: "ไทย",
      filterType: "นิทานแอนิเมชั่น",
      filterCategory: "ครอบครัว",
      filterDuration: "5-10 นาที",
    }
  ];

  const [searchQuery, setSearchQuery] = useState("");
  
  const [filterValues, setFilterValues] = useState({
    age: "ทั้งหมด",
    language: "ทั้งหมด",
    type: "ทั้งหมด",
    category: "ทั้งหมด",
    duration: "ทั้งหมด",
  });

  const filterOptions = [
    { id: "age", label: "ช่วงวัย", options: ["ทั้งหมด", "0-3 ปี", "4-6 ปี", "7-9 ปี", "10 ปีขึ้นไป"] },
    { id: "language", label: "ภาษา", options: ["ทั้งหมด", "ไทย", "อังกฤษ", "สองภาษา"] },
    { id: "type", label: "เนื้อหา/บรรยาย", options: ["ทั้งหมด", "นิทานภาพ", "นิทานเสียง", "นิทานแอนิเมชั่น"] },
    { id: "category", label: "หมวด", options: ["ทั้งหมด", "ผจญภัย", "คลาสสิก", "ก่อนนอน", "สัตว์", "ครอบครัว"] },
    { id: "duration", label: "ระยะเวลา", options: ["ทั้งหมด", "ไม่เกิน 5 นาที", "5-10 นาที", "มากกว่า 10 นาที"] },
  ];

  const handleFilterChange = (id: string, value: string) => {
    setFilterValues(prev => ({ ...prev, [id]: value }));
  };

  // ระบบคัดกรองข้อมูลจากทั้งคำค้นหา และตัวเลือก Dropdown
  const filteredStories = allStories.filter((story) => {
    const searchLower = searchQuery.toLowerCase();
    const titleMatch = story.title.toLowerCase().includes(searchLower);
    const descMatch = story.description.toLowerCase().includes(searchLower);
    const matchesSearch = titleMatch || descMatch;

    const matchesAge = filterValues.age === "ทั้งหมด" || story.filterAge === filterValues.age;
    const matchesLanguage = filterValues.language === "ทั้งหมด" || story.filterLanguage === filterValues.language;
    const matchesType = filterValues.type === "ทั้งหมด" || story.filterType === filterValues.type;
    const matchesCategory = filterValues.category === "ทั้งหมด" || story.filterCategory === filterValues.category;
    const matchesDuration = filterValues.duration === "ทั้งหมด" || story.filterDuration === filterValues.duration;

    return matchesSearch && matchesAge && matchesLanguage && matchesType && matchesCategory && matchesDuration;
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      
      {/* Header Banner */}
      <div className="w-full mb-8">
        <img 
          src="/Image2.png" 
          alt="Header Banner" 
          className="w-full h-auto rounded-3xl shadow-md object-cover"
        />
      </div>

      {/* Search & Filters */}
      <div className="mb-8 rounded-3xl bg-white p-5 shadow-sm border border-slate-100">
        
        {/* ช่องค้นหา */}
        <div className="relative mb-6">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full rounded-full border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:border-brand focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand"
            placeholder="ค้นหาชื่อเรื่อง หรือคำที่สนใจ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-col gap-2">
          <p className="text-xs font-bold text-slate-500 flex items-center gap-1">
            <BookOpen size={14} className="text-brand"/> เลือกสิ่งที่คุณสนใจ เพื่อให้เราแนะนำสิ่งดี ๆ
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {filterOptions.map((filter) => (
              <div key={filter.id} className="flex flex-col relative">
                <label htmlFor={filter.id} className="text-[10px] text-slate-400 mb-1 ml-1">{filter.label}</label>
                <div className="relative">
                  <select
                    id={filter.id}
                    value={filterValues[filter.id as keyof typeof filterValues]}
                    onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2 pr-8 text-sm text-slate-600 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand cursor-pointer"
                  >
                    {filter.options.map((opt, idx) => (
                      <option key={idx} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-ink flex items-center gap-2">
          <BookOpen className="text-brand" size={22} /> นิทานทั้งหมดของเรา
        </h2>
      </div>

      {/* กล่องนิทาน */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {filteredStories.length > 0 ? (
          filteredStories.map((story) => (
            <div key={story.id} className="flex flex-col justify-between rounded-3xl bg-white p-5 shadow-sm border border-slate-100 transition hover:shadow-md">
              <div>
                <div className="mb-4 h-48 w-full rounded-2xl bg-slate-100 flex items-center justify-center relative overflow-hidden group">
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
          ))
        ) : (
          <div className="col-span-full py-10 text-center text-slate-500">
            ไม่พบนิทานที่คุณค้นหา ลองเปลี่ยนตัวเลือก หรือใช้คำค้นหาอื่นดูนะครับ
          </div>
        )}
      </div>

    </div>
  );
}