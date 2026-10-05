"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { SlidersHorizontal, Search } from "lucide-react";

const AGES = [["", "ทั้งหมด"], ["1-3", "1-3 ปี"], ["3-5", "3-5 ปี"], ["4-7", "4-7 ปี"], ["6-9", "6-9 ปี"]];
const LANGS = [["", "ทั้งหมด"], ["th", "ไทย"], ["en", "อังกฤษ"]];
const NARR = [["", "ทั้งหมด"], ["AUDIO", "มีเสียงบรรยาย"], ["SELF_READ", "อ่านเอง"]];
const DUR = [["", "ทั้งหมด"], ["3", "ไม่เกิน 3 นาที"], ["5", "ไม่เกิน 5 นาที"], ["10", "ไม่เกิน 10 นาที"]];
const ACCESS = [["", "ทั้งหมด"], ["free", "ชมฟรี"], ["member", "เฉพาะสมาชิก"]];

export default function Filters({ categories }: { categories: { slug: string; name: string }[] }) {
  const router = useRouter();
  const path = usePathname();
  const sp = useSearchParams();

  const set = (k: string, v: string) => {
    const p = new URLSearchParams(sp.toString());
    v ? p.set(k, v) : p.delete(k);
    router.push(`${path}?${p.toString()}`, { scroll: false });
  };

  const Select = ({ label, k, opts }: { label: string; k: string; opts: any[][] }) => (
    <div>
      <label className="label">{label}</label>
      <select className="input" value={sp.get(k) ?? ""} onChange={e => set(k, e.target.value)}>
        {opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
      </select>
    </div>
  );

  return (
    <div className="mt-5 space-y-4">
      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
        <input defaultValue={sp.get("q") ?? ""} placeholder="ค้นหาชื่อเรื่อง หรือคำที่สนใจ..."
          onKeyDown={e => e.key === "Enter" && set("q", (e.target as HTMLInputElement).value)}
          className="w-full rounded-full border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" />
      </div>
      <div className="panel">
        <p className="mb-3 flex items-center gap-2 text-sm font-bold">
          <SlidersHorizontal size={15} className="text-brand" />เลือกสิ่งที่ใช่
          <span className="font-normal text-muted">เพื่อให้พอดีกับน้อง ๆ</span>
        </p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          <Select label="ช่วงวัย" k="age" opts={AGES} />
          <Select label="ภาษา" k="lang" opts={LANGS} />
          <Select label="เสียงบรรยาย" k="narration" opts={NARR} />
          <Select label="หมวด" k="category" opts={[["", "ทั้งหมด"], ...categories.map(c => [c.slug, c.name])]} />
          <Select label="การเข้าถึง" k="access" opts={ACCESS} />
          <Select label="ระยะเวลา" k="duration" opts={DUR} />
        </div>
      </div>
    </div>
  );
}
