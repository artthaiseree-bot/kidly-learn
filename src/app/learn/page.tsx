"use client";

import { Sparkles, Search, ArrowRight, ChevronDown, BookA, Languages, Calculator, Globe } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LearnPage() {
  const quickCategories = [
    { id: 1, title: "ภาษาไทย", icon: BookA, color: "bg-pink-100 text-pink-600", link: "#" },
    { id: 2, title: "ภาษาอังกฤษ", icon: Languages, color: "bg-emerald-100 text-emerald-600", link: "#" },
    { id: 3, title: "ตัวเลขและคณิตศาสตร์", icon: Calculator, color: "bg-sky-100 text-sky-600", link: "#" },
    { id: 4, title: "เรียนรู้รอบตัว", icon: Globe, color: "bg-amber-100 text-amber-600", link: "#" },
  ];

  const allLearningItems = [
    {
      id: 1,
      title: "เริ่มเรียน ก-ฮ",
      category: "ภาษาไทย",
      description: "แบบฝึกหัดและบัตรคำศัพท์ สำหรับเริ่มเรียนพยัญชนะไทย 44 ตัว",
      link: "/ebook/thai-alphabet",
      image: "/images/thai-cover.png", 
      filterAge: "0-3 ปี",
      filterGroup: "ภาษาไทย",
      filterLanguage: "ไทย",
      filterType: "บัตรคำศัพท์",
    },
    {
      id: 2,
      title: "เพลง ก-ฮ",
      category: "ภาษาไทย",
      description: "คลิปวิดีโอสนุกๆ ปูพื้นฐานภาษาไทยด้วยเพลง ก-ฮ",
      link: "/video/kor-hor", // <-- เปลี่ยนเป็นลิงก์นี้ครับ
      image: "https://img.youtube.com/vi/w04aYqMnS-s/hqdefault.jpg",
      filterAge: "4-6 ปี",
      filterGroup: "ภาษาไทย",
      filterLanguage: "ไทย",
      filterType: "วิดีโอ",
    },
    {
      id: 3,
      title: "เพลง ABC",
      category: "ภาษาอังกฤษ",
      description: "คลิปวิดีโอสนุกๆ ปูพื้นฐานภาษาอังกฤษด้วยเพลง ABC",
      link: "/video/abc-song", 
      image: "https://img.youtube.com/vi/aKSgn-4gBqA/hqdefault.jpg",
      filterAge: "4-6 ปี",
      filterGroup: "ภาษาอังกฤษ",
      filterLanguage: "อังกฤษ",
      filterType: "วิดีโอ",
    },
    {
      id: 4,
      title: "คุณลุงใจดี",
      category: "ไทย",
      description: "เรียนรู้เด็กๆ",
      link: "/video/kind-uncle",
      image: "https://img.youtube.com/vi/y5EO4jqMXf0/hqdefault.jpg",
      filterAge: "0-3 ปี",
      filterGroup: "รอบตัว",
      filterLanguage: "ไทย",
      filterType: "วิดีโอ",
    }
  ];

  const [searchQuery, setSearchQuery] = useState("");
  
  const [filterValues, setFilterValues] = useState({
    age: "ทั้งหมด",
    group: "ทั้งหมด",
    language: "ทั้งหมด",
    type: "ทั้งหมด",
  });

  const filterOptions = [
    { id: "age", label: "ช่วงวัย", options: ["ทั้งหมด", "0-3 ปี", "4-6 ปี", "7-9 ปี"] },
    { id: "group", label: "กลุ่มการเรียนรู้", options: ["ทั้งหมด", "ภาษาไทย", "ภาษาอังกฤษ", "คณิตศาสตร์", "รอบตัว"] },
    { id: "language", label: "ภาษา", options: ["ทั้งหมด", "ไทย", "อังกฤษ", "สองภาษา"] },
    { id: "type", label: "รูปแบบ", options: ["ทั้งหมด", "บัตรคำศัพท์", "แบบฝึกหัด", "เกมการศึกษา", "วิดีโอ"] },
  ];

  const handleFilterChange = (id: string, value: string) => {
    setFilterValues(prev => ({ ...prev, [id]: value }));
  };

  const filteredItems = allLearningItems.filter((item) => {
    const searchLower = searchQuery.toLowerCase();
    const titleMatch = item.title.toLowerCase().includes(searchLower);
    const descMatch = item.description.toLowerCase().includes(searchLower);
    const matchesSearch = titleMatch || descMatch;

    const matchesAge = filterValues.age === "ทั้งหมด" || item.filterAge === filterValues.age;
    const matchesGroup = filterValues.group === "ทั้งหมด" || item.filterGroup === filterValues.group;
    const matchesLanguage = filterValues.language === "ทั้งหมด" || item.filterLanguage === filterValues.language;
    const matchesType = filterValues.type === "ทั้งหมด" || item.filterType === filterValues.type;

    return matchesSearch && matchesAge && matchesGroup && matchesLanguage && matchesType;
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="w-full mb-8">
        <img 
          src="/Image4.png" 
          alt="Header Banner" 
          className="w-full h-auto rounded-3xl shadow-md object-cover"
        />
      </div>

      <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        {quickCategories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link key={cat.id} href={cat.link} className={`flex flex-col items-center justify-center p-6 rounded-3xl transition hover:scale-105 hover:shadow-md ${cat.color} bg-opacity-50 border border-white/50 shadow-sm`}>
              <Icon size={32} className="mb-3" />
              <h3 className="font-bold text-sm md:text-base text-center">{cat.title}</h3>
            </Link>
          );
        })}
      </div>

      <div className="mb-8 rounded-3xl bg-white p-5 shadow-sm border border-slate-100">
        <div className="relative mb-6">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full rounded-full border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:border-brand focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand"
            placeholder="ค้นหาบทเรียน เช่น ตัวอักษร, ตัวเลข, สัตว์..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-xs font-bold text-slate-500 flex items-center gap-1">
            <Sparkles size={14} className="text-brand"/> เลือกเรื่องที่ใช่ ค้นหาสิ่งที่ชอบ
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-ink flex items-center gap-2">
          <Sparkles className="text-brand" size={22} /> เรื่องใหม่ที่น่าค้นพบ
        </h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item.id} className="flex flex-col justify-between rounded-3xl bg-white p-5 shadow-sm border border-slate-100 transition hover:shadow-md">
              <div>
                <div className="mb-4 h-40 w-full rounded-2xl bg-slate-100 flex items-center justify-center relative overflow-hidden group">
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full bg-slate-200 flex items-center justify-center">
                      <span className="text-slate-400 text-sm">รอใส่รูปภาพ</span>
                    </div>
                  )}
                  <span className="absolute bottom-3 left-3 rounded-lg bg-white/90 px-2.5 py-1 text-[10px] font-bold text-brand shadow-sm">
                    {item.category}
                  </span>
                </div>
                <h3 className="font-bold text-ink text-base mb-1 line-clamp-1">{item.title}</h3>
                <p className="text-[11px] text-muted line-clamp-2">{item.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <a
                  href={item.link}
                  target={item.link.startsWith("http") || item.link.endsWith(".pdf") ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-brand hover:underline flex items-center gap-1"
                >
                  เริ่มเรียน <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-10 text-center text-slate-500">
            ไม่พบสื่อการเรียนรู้ที่คุณค้นหา ลองเปลี่ยนตัวเลือกดูนะครับ
          </div>
        )}
      </div>
    </div>
  );
}