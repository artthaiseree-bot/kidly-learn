"use client";
import { useState } from "react";
import { signIn } from "next-auth/react"; // ดึงระบบล็อกอินตัวจริงมาใช้
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // สั่งให้ NextAuth ยิงอีเมลผ่านปลั๊กอิน Resend ที่เราตั้งค่าไว้
    await signIn("resend", { 
      email, 
      redirect: false, // ป้องกันการเปลี่ยนหน้า เพื่อให้โชว์ข้อความสำเร็จด้านล่าง
      callbackUrl: "/" // เมื่อกดลิงก์จากในเมล ให้พาไปที่หน้าแรก
    });
    
    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <div className="flex min-h-[75vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm border border-slate-100">
        {!isSubmitted ? (
          <>
            <h1 className="text-2xl font-bold text-slate-800 mb-2 text-center">
              เข้าสู่ระบบนิทาน
            </h1>
            <p className="text-xs text-slate-500 text-center mb-6">
              กรอกอีเมลเพื่อรับลิงก์สำหรับเข้าสู่ระบบ (ไม่ต้องใช้รหัสผ่าน)
            </p>
            
            <form onSubmit={handleSendMagicLink} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">อีเมลของคุณ</label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3 text-slate-400" size={18} />
                  <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm focus:bg-white focus:outline-none focus:border-pink-500"
                    placeholder="example@gmail.com"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full mt-2 flex items-center justify-center gap-2 rounded-2xl bg-pink-600 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-pink-700 disabled:opacity-70"
              >
                {isLoading ? "กำลังส่งลิงก์..." : "รับลิงก์เข้าสู่ระบบ"} <ArrowRight size={16} />
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-6">
            <CheckCircle2 className="mx-auto text-green-500 mb-4" size={60} />
            <h2 className="text-xl font-bold text-slate-800 mb-2">ส่งอีเมลสำเร็จ!</h2>
            <p className="text-sm text-slate-600 mb-6">
              เราได้ส่งลิงก์เข้าสู่ระบบไปที่ <br/><span className="font-bold text-pink-600">{email}</span><br/> แล้วครับ
            </p>
            <p className="text-xs text-slate-500">
              กรุณาเปิดกล่องจดหมายของคุณ (หรือโฟลเดอร์จดหมายขยะ) และคลิกที่ลิงก์เพื่อเข้าเว็บไซต์ได้เลย
            </p>
            <button 
              onClick={() => setIsSubmitted(false)}
              className="mt-6 text-xs text-pink-600 font-bold hover:underline"
            >
              แก้ไข / ลองใช้อีเมลอื่น
            </button>
          </div>
        )}
      </div>
    </div>
  );
}