"use client";

import { Clapperboard, Search, ArrowRight, ChevronDown, PlayCircle, Star, Shield, Droplet } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AnimationsPage() {
  // ข้อมูลสำหรับปุ่มหมวดหมู่ด่วน 
  const quickCategories = [
    { id: 1, title: "วิทยาศาสตร์", icon: Star, color: "bg-purple-100 text-purple-600", link: "#" },
    { id: 2, title: "สังคมและจริยธรรม", icon: Shield, color: "bg-blue-100 text-blue-600", link: "#" },
    { id: 3, title: "ธรรมชาติรอบตัว", icon: Droplet, color: "bg-emerald-100 text-emerald-600", link: "#" },
    { id: 4, title: "นิทานแอนิเมชัน", icon: PlayCircle, color: "bg-pink-100 text-pink-600", link: "#" },
  ];

  // ข้อมูลแอนิเมชันทั้งหมด
  const allAnimations = [
    {
      id: 12,
      title: "เด็กน้อยท่องอวกาศ",
      category: "วิทยาศาสตร์",
      description: "การผจญภัยแสนสนุกในอวกาศกว้างใหญ่ เรียนรู้เรื่องดวงดาวและจักรวาลไปพร้อมกับเด็กน้อย",
      link: "/video/space-kid",
      image: "https://img.youtube.com/vi/GQh_HpPJg6Y/hqdefault.jpg",
      filterAge: "7-12 ปี",
      filterLanguage: "ไทย",
      filterCategory: "วิทยาศาสตร์",
      filterDuration: "5-10 นาที",
    },
    {
      id: 13,
      title: "ภัยพิบัติที่ลบอารยธรรมมิโนอันหายไปจากแผนที่โลก",
      category: "ความรู้รอบตัว",
      description: "สารคดีแอนิเมชันย้อนรอยประวัติศาสตร์ การล่มสลายของอารยธรรมมิโนอันอันยิ่งใหญ่จากภัยพิบัติทางธรรมชาติ",
      link: "/video/minoan-disaster",
      image: "https://img.youtube.com/vi/0_Q3WpdqwaQ/hqdefault.jpg",
      filterAge: "7-12 ปี",
      filterLanguage: "ไทย",
      filterCategory: "ความรู้รอบตัว",
      filterDuration: "มากกว่า 10 นาที",
    },
    {
      id: 14,
      title: "กบในโลกกว้าง",
      category: "นิทานแอนิเมชัน",
      description: "เรื่องราวของเจ้ากบตัวน้อยที่ตัดสินใจกระโดดออกจากสระน้ำเดิมๆ เพื่อไปสำรวจโลกกว้างที่น่าตื่นเต้น",
      link: "/video/frog-wide-world",
      image: "https://img.youtube.com/vi/VEx02Ydp2pQ/hqdefault.jpg",
      filterAge: "4-6 ปี",
      filterLanguage: "ไทย",
      filterCategory: "นิทานแอนิเมชัน",
      filterDuration: "5-10 นาที",
    },
    {
      id: 1,
      title: "ไกด์น้อยพาท่องเที่ยว", // อัปเดตชื่อเรื่อง
      category: "สังคมและวัฒนธรรม", // อัปเดตหมวดหมู่
      description: "มะลิ ไกด์ตัวน้อยพาชาวต่างชาติเที่ยวชมความงามของประเทศไทย ทั้งวัดพระแก้ว ตลาดน้ำ นั่งรถตุ๊กๆ และชมพระอาทิตย์ตกที่วัดอรุณ", // อัปเดตคำอธิบาย
      link: "/video/little-guide", // อัปเดตลิงก์ไปยังหน้าวิดีโอที่จะสร้างใหม่
      image: "https://img.youtube.com/vi/u7a_QmNMXjc/hqdefault.jpg", // ดึงปกจาก YouTube
      filterAge: "7-12 ปี",
      filterLanguage: "ไทย",
      filterCategory: "สังคมและจริยธรรม", // จัดให้อยู่ในหมวดนี้
      filterDuration: "ไม่เกิน 5 นาที",
    },
    {
      id: 5,
      title: "ว่านหางจระเข้ สมุนไพรสารพัดประโยชน์",
      category: "ธรรมชาติ",
      description: "ทำความรู้จักว่านหางจระเข้ สมุนไพรที่มีประโยชน์มากมาย",
      link: "/video/aloe-vera",
      image: "https://img.youtube.com/vi/VurxhcW3kH4/hqdefault.jpg",
      filterAge: "7-12 ปี",
      filterLanguage: "ไทย",
      filterCategory: "ธรรมชาติรอบตัว",
      filterDuration: "ไม่เกิน 5 นาที",
    },
    {
      id: 6,
      title: "ต้นหอม ผักสวนครัวคู่บ้าน",
      category: "ธรรมชาติ",
      description: "รู้จักต้นหอม ผักสวนครัวที่ปลูกง่ายและมีประโยชน์",
      link: "/video/spring-onion",
      image: "https://img.youtube.com/vi/KkF02pv2W3Y/hqdefault.jpg",
      filterAge: "7-12 ปี",
      filterLanguage: "ไทย",
      filterCategory: "ธรรมชาติรอบตัว",
      filterDuration: "ไม่เกิน 5 นาที",
    },
    {
      id: 7,
      title: "ขิง สมุนไพรเผ็ดร้อน",
      category: "ธรรมชาติ",
      description: "ประโยชน์ของขิง สมุนไพรฤทธิ์ร้อนที่ช่วยบำรุงร่างกาย",
      link: "/video/ginger",
      image: "https://img.youtube.com/vi/O-UBuGpBtDY/hqdefault.jpg",
      filterAge: "7-12 ปี",
      filterLanguage: "ไทย",
      filterCategory: "ธรรมชาติรอบตัว",
      filterDuration: "ไม่เกิน 5 นาที",
    },
    {
      id: 8,
      title: "ตะไคร้ หอมกรุ่นไล่ยุง",
      category: "ธรรมชาติ",
      description: "ตะไคร้ สมุนไพรกลิ่นหอมที่มีสรรพคุณไล่ยุงและทำอาหาร",
      link: "/video/lemongrass",
      image: "https://img.youtube.com/vi/V_ZgubIp-0g/hqdefault.jpg",
      filterAge: "7-12 ปี",
      filterLanguage: "ไทย",
      filterCategory: "ธรรมชาติรอบตัว",
      filterDuration: "ไม่เกิน 5 นาที",
    },
    {
      id: 9,
      title: "มะนาว เปรี้ยวจี๊ดชื่นใจ",
      category: "ธรรมชาติ",
      description: "ความลับของมะนาว รสเปรี้ยวที่อุดมไปด้วยวิตามินซี",
      link: "/video/lime",
      image: "https://img.youtube.com/vi/AmsplHvPw5c/hqdefault.jpg",
      filterAge: "7-12 ปี",
      filterLanguage: "ไทย",
      filterCategory: "ธรรมชาติรอบตัว",
      filterDuration: "ไม่เกิน 5 นาที",
    },
    {
      id: 10,
      title: "ใบมะกรูด หอมสมุนไพรไทย",
      category: "ธรรมชาติ",
      description: "ใบมะกรูด ส่วนประกอบสำคัญในอาหารไทยที่ให้กลิ่นหอมเป็นเอกลักษณ์",
      link: "/video/kaffir-lime-leaves",
      image: "https://img.youtube.com/vi/JLi71LxOgQ8/hqdefault.jpg",
      filterAge: "7-12 ปี",
      filterLanguage: "ไทย",
      filterCategory: "ธรรมชาติรอบตัว",
      filterDuration: "ไม่เกิน 5 นาที",
    },
    {
      id: 11,
      title: "มะระขี้นก ขมเป็นยา",
      category: "ธรรมชาติ",
      description: "ทำไมมะระขี้นกถึงขม? และมีประโยชน์ต่อร่างกายอย่างไร?",
      link: "/video/bitter-gourd",
      image: "https://img.youtube.com/vi/yMh6vWzJCGQ/hqdefault.jpg",
      filterAge: "7-12 ปี",
      filterLanguage: "ไทย",
      filterCategory: "ธรรมชาติรอบตัว",
      filterDuration: "ไม่เกิน 5 นาที",
    }
  ];

  const [searchQuery, setSearchQuery] = useState("");
  
  const [filterValues, setFilterValues] = useState({
    age: "ทั้งหมด",
    language: "ทั้งหมด",
    category: "ทั้งหมด",
    duration: "ทั้งหมด",
  });

  const filterOptions = [
    { id: "age", label: "ช่วงวัย", options: ["ทั้งหมด", "0-3 ปี", "4-6 ปี", "7-12 ปี"] },
    { id: "language", label: "ภาษา", options: ["ทั้งหมด", "ไทย", "อังกฤษ", "ไม่มีเสียงพูด (ดนตรี)"] },
    { id: "category", label: "หมวดหมู่", options: ["ทั้งหมด", "วิทยาศาสตร์", "สังคมและจริยธรรม", "ธรรมชาติรอบตัว", "ความรู้รอบตัว", "นิทานแอนิเมชัน"] },
    { id: "duration", label: "ระยะเวลา", options: ["ทั้งหมด", "ไม่เกิน 5 นาที", "5-10 นาที", "มากกว่า 10 นาที"] },
  ];

  const handleFilterChange = (id: string, value: string) => {
    setFilterValues(prev => ({ ...prev, [id]: value }));
  };

  const filteredAnimations = allAnimations.filter((item) => {
    const searchLower = searchQuery.toLowerCase();
    const titleMatch = item.title.toLowerCase().includes(searchLower);
    const descMatch = item.description.toLowerCase().includes(searchLower);
    const matchesSearch = titleMatch || descMatch;

    const matchesAge = filterValues.age === "ทั้งหมด" || item.filterAge === filterValues.age;
    const matchesLanguage = filterValues.language === "ทั้งหมด" || item.filterLanguage === filterValues.language;
    const matchesCategory = filterValues.category === "ทั้งหมด" || item.filterCategory === filterValues.category;
    const matchesDuration = filterValues.duration === "ทั้งหมด" || item.filterDuration === filterValues.duration;

    return matchesSearch && matchesAge && matchesLanguage && matchesCategory && matchesDuration;
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      
      {/* Header Banner */}
      <div className="w-full mb-8">
        <img 
          src="/Image5.png" 
          alt="Header Banner" 
          className="w-full h-auto rounded-3xl shadow-md object-cover"
        />
      </div>

      {/* เมนูด่วน 4 หมวดหมู่ */}
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
            placeholder="ค้นหาแอนิเมชัน ชื่อเรื่อง หรือคีย์เวิร์ด..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-col gap-2">
          <p className="text-xs font-bold text-slate-500 flex items-center gap-1">
            <Clapperboard size={14} className="text-brand"/> ค้นหาแอนิเมชันที่เหมาะกับเด็กๆ
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

      {/* Title */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-ink flex items-center gap-2">
          <PlayCircle className="text-brand" size={22} /> แอนิเมชันมาใหม่
        </h2>
      </div>

      {/* กล่องรายการแอนิเมชัน */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
        {filteredAnimations.length > 0 ? (
          filteredAnimations.map((item) => (
            <div key={item.id} className="flex flex-col justify-between rounded-3xl bg-white p-5 shadow-sm border border-slate-100 transition hover:shadow-md">
              <div>
                <div className="mb-4 h-40 w-full rounded-2xl bg-slate-100 flex items-center justify-center relative overflow-hidden group">
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full bg-slate-200 flex flex-col items-center justify-center text-slate-400">
                      <PlayCircle size={32} className="mb-2 opacity-50" />
                      <span className="text-xs">รอใส่รูปภาพ</span>
                    </div>
                  )}
                  {/* ปุ่ม Play วางทับบนรูป (ถ้ามีรูป) */}
                  {item.image && (
                     <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                       <PlayCircle size={40} className="text-white drop-shadow-md" fill="currentColor" />
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
                <Link
                  href={item.link}
                  className="text-xs font-bold text-brand hover:underline flex items-center gap-1"
                >
                  รับชม <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-10 text-center text-slate-500">
            ไม่พบแอนิเมชันที่คุณค้นหา ลองเปลี่ยนตัวเลือกดูนะครับ
          </div>
        )}
      </div>

    </div>
  );
}