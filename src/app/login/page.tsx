"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm border border-slate-100">
        <h1 className="text-2xl font-bold text-ink mb-2 text-center">เข้าสู่ระบบ</h1>
        <p className="text-xs text-muted text-center mb-6">กรอกข้อมูลเพื่อเข้าสู่ระบบจัดการนิทาน</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-ink mb-1">ชื่อผู้ใช้งาน</label>
            <div className="relative flex items-center">
              <User className="absolute left-3 text-muted" size={18} />
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm focus:bg-white focus:outline-none focus:border-brand"
                placeholder="กรอกชื่อผู้ใช้ของคุณ"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-ink mb-1">รหัสผ่าน</label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 text-muted" size={18} />
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm focus:bg-white focus:outline-none focus:border-brand"
                placeholder="กรอกรหัสผ่านของคุณ"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full mt-2 flex items-center justify-center gap-2 rounded-2xl bg-brand py-3.5 text-sm font-bold text-white shadow-md shadow-brand/20 transition hover:opacity-90"
          >
            เข้าสู่ระบบ <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}