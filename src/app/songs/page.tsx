"use client";

import { Music, Search, Play, Heart, Shuffle, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function SongsPage() {
  // ข้อมูลเพลงจำลอง (สามารถเพิ่มได้เรื่อยๆ)
  const allSongs = [
    {
      id: 1,
      title: "ดาวน้อยส่องแสง",
      language: "ไทย",
      duration: "2:19",
      image: "/images/song1.png",
      filterAge: "2-5 ปี",
      filterLanguage: "ไทย",
      // เพิ่มลิงก์ไฟล์เสียงตรงนี้ครับ (อย่าลืมเติม .mp3 ที่ไฟล์จริงในเครื่อง)
      audioSrc: "/songs-mp3/ดาวน้อยส่องแสง.mp3", 
    },
    {
      id: 2,
      title: "ดาวดวงน้อย",
      language: "ไทย",
      duration: "3:18",
      image: "/images/song2.png",
      filterAge: "2-5 ปี",
      filterLanguage: "ไทย",
      audioSrc: "/songs-mp3/ดาวดวงน้อย.mp3", 
    },
    {
      id: 3,
      title: "ไออุ่นใต้หลังคา",
      language: "ไทย",
      duration: "3:30",
      image: "/images/song3.png",
      filterAge: "ทั้งหมด",
      filterLanguage: "ไทย",
      audioSrc: "/songs-mp3/ไออุ่นใต้หลังคา.mp3",
    },
    {
      id: 4,
      title: "ดวงดาวในคืนฝนพรำ",
      language: "ไทย",
      duration: "2:04",
      image: "/images/song4.png",
      filterAge: "2-5 ปี",
      filterLanguage: "ไทย",
      audioSrc: "/songs-mp3/ดวงดาวในคืนฝนพรำ.mp3",
    },
    {
      id: 5,
      title: "วีวิชวิดา",
      language: "ไทย",
      duration: "1:45",
      image: "/images/song6.png",
      filterAge: "0-3 ปี",
      filterLanguage: "ไทย",
      audioSrc: "/songs-mp3/วีวิชวิดา.mp3",
    },
    {
      id: 6,
      title: "สายลมแห่งนิทาน",
      language: "ไทย",
      duration: "2:15",
      image: "/images/song7.png",
      filterAge: "0-3 ปี",
      filterLanguage: "ไทย",
      audioSrc: "/songs-mp3/สายลมแห่งนิทาน.mp3",
    },
    {
      id: 7,
      title: "นิทานดวงดาว",
      language: "ไทย",
      duration: "5:00",
      image: "/images/song8.png",
      filterAge: "ทั้งหมด",
      filterLanguage: "ไทย",
      audioSrc: "/songs-mp3/นิทานดวงดาว.mp3",
    }
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [filterValues, setFilterValues] = useState({
    age: "ทั้งหมด",
    language: "ทั้งหมด",
  });
  
  // State สำหรับเก็บเพลงที่ถูกคลิกเลือกให้ไปโชว์ฝั่งซ้าย
  const [currentSong, setCurrentSong] = useState(allSongs[0]);

  const filterOptions = [
    { id: "age", label: "ช่วงวัย", options: ["ทั้งหมด", "0-3 ปี", "2-5 ปี", "4-6 ปี"] },
    { id: "language", label: "ภาษาที่อยากฟัง", options: ["ทั้งหมด", "ไทย", "อังกฤษ", "บรรเลง"] },
  ];

  const handleFilterChange = (id: string, value: string) => {
    setFilterValues(prev => ({ ...prev, [id]: value }));
  };

  const filteredSongs = allSongs.filter((song) => {
    const searchLower = searchQuery.toLowerCase();
    const titleMatch = song.title.toLowerCase().includes(searchLower);

    const matchesAge = filterValues.age === "ทั้งหมด" || song.filterAge === filterValues.age || song.filterAge === "ทั้งหมด";
    const matchesLanguage = filterValues.language === "ทั้งหมด" || song.filterLanguage === filterValues.language;

    return titleMatch && matchesAge && matchesLanguage;
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      
      {}
      {/* Header Banner */}
      <div className="w-full mb-8">
        <img 
          src="/Image6.png" 
          alt="Header Banner" 
          className="w-full h-auto rounded-3xl shadow-md object-cover"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {}
        {/* ฝั่งซ้าย: กล่องเครื่องเล่นเพลง (Player Mockup) */}
        <div className="col-span-1">
          <div className="rounded-3xl bg-gradient-to-b from-indigo-50 to-purple-100 p-6 shadow-sm border border-indigo-50/50 flex flex-col items-center text-center h-full">
            
            {/* รูปปกอัลบั้ม */}
            <div className="w-full aspect-square rounded-2xl bg-white shadow-md mb-6 flex items-center justify-center overflow-hidden">
              {currentSong?.image ? (
                <img src={currentSong.image} alt={currentSong.title} className="w-full h-full object-cover" />
              ) : (
                <Music size={60} className="text-purple-300" />
              )}
            </div>

            {/* ชื่อเพลงที่เลือก */}
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              {currentSong ? currentSong.title : "เลือกเพลงที่ชอบ"}
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              แตะเพลงในรายการ เพื่อเล่นเพลง
            </p>

            {/* เครื่องเล่นเสียง (Audio Player) หรือ ปุ่มกดแบบเดิม */}
            {currentSong?.audioSrc ? (
              <div className="w-full mt-2 bg-white rounded-2xl p-1 shadow-sm border border-pink-100">
                <audio
                  key={currentSong.id} // สำคัญ: เพื่อให้ player รีเฟรชเวลากดเปลี่ยนเพลง
                  controls
                  autoPlay // เล่นอัตโนมัติเมื่อกดเลือกเพลง
                  className="w-full h-10 outline-none"
                  src={currentSong.audioSrc}
                >
                  เบราว์เซอร์ของคุณไม่รองรับการเล่นไฟล์เสียง
                </audio>
              </div>
            ) : (
              <button className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-slate-300 text-white font-bold cursor-not-allowed shadow-sm">
                <Play size={18} fill="currentColor" /> รอเพิ่มไฟล์เสียง
              </button>
            )}
          </div>
        </div>

        {/* ฝั่งขวา: รายการเพลงและระบบค้นหา */}
        <div className="col-span-1 lg:col-span-2">
          
          {/* ส่วนค้นหาและตัวกรอง */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                className="block w-full rounded-full border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500 shadow-sm"
                placeholder="ค้นหาชื่อเพลง..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-4 flex-1">
              {filterOptions.map((filter) => (
                <div key={filter.id} className="flex flex-col relative flex-1">
                  <label className="text-[10px] text-slate-400 mb-1 ml-1">{filter.label}</label>
                  <div className="relative">
                    <select
                      value={filterValues[filter.id as keyof typeof filterValues]}
                      onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                      className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2 pr-8 text-sm text-slate-600 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500 cursor-pointer shadow-sm"
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

          {/* แถบปุ่มควบคุมรายการ */}
          <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-100">
            <button className="flex items-center gap-2 rounded-full bg-pink-500 px-5 py-2 text-sm font-bold text-white shadow-sm hover:bg-pink-600 transition">
              <Play size={14} fill="currentColor" /> เล่นทั้งหมด
            </button>
            <button className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-bold text-slate-600 shadow-sm hover:bg-slate-50 transition">
              <Shuffle size={14} /> สุ่ม
            </button>
            <span className="text-sm font-medium text-slate-500 ml-auto">
              {filteredSongs.length} เพลง
            </span>
          </div>

          {}
          {/* รายการเพลง (List) */}
          <div className="flex flex-col gap-2">
            {filteredSongs.length > 0 ? (
              filteredSongs.map((song, index) => (
                <div 
                  key={song.id} 
                  onClick={() => setCurrentSong(song)}
                  className={`flex items-center justify-between p-3 rounded-2xl transition cursor-pointer border border-transparent hover:border-slate-100 hover:bg-slate-50 ${currentSong?.id === song.id ? 'bg-indigo-50/50 border-indigo-100' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <span className="w-6 text-center text-sm font-bold text-slate-400">
                      {index + 1}
                    </span>
                    
                    {/* รูปย่อ (Thumbnail) */}
                    <div className="h-12 w-16 rounded-xl bg-slate-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                      {song.image ? (
                        <img src={song.image} alt={song.title} className="h-full w-full object-cover" />
                      ) : (
                        <Music size={20} className="text-slate-400" />
                      )}
                    </div>
                    
                    {/* รายละเอียดเพลง */}
                    <div className="flex flex-col">
                      <h4 className="font-bold text-slate-800 text-sm line-clamp-1">{song.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-medium bg-slate-100 text-slate-500 px-2 py-0.5 rounded text-center min-w-[36px]">
                          {song.language}
                        </span>
                        <span className="text-[10px] font-medium bg-indigo-50 text-indigo-500 px-2 py-0.5 rounded">
                          {song.filterAge}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {song.duration}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ปุ่มด้านขวา (หัวใจ & เล่น) */}
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-pink-300 hover:text-pink-500 transition rounded-full hover:bg-pink-50">
                      <Heart size={18} />
                    </button>
                    <button className="p-2 text-pink-500 hover:text-pink-600 transition rounded-full hover:bg-pink-50">
                      <Play size={18} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-10 text-center text-slate-500">
                ไม่พบเพลงที่คุณค้นหา ลองเปลี่ยนตัวเลือกดูนะครับ
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}