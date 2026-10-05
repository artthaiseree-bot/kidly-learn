"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, ShieldCheck, ArrowRight, KeyRound } from "lucide-react";

export default function SignInPage() {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [systemOtp, setSystemOtp] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("กรุณากรอกอีเมลของคุณ");
      return;
    }
    
    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setSystemOtp(randomOtp);
    setError("");
    setStep("otp");
    
    alert(`[ระบบจำลองการส่งอีเมล]\nรหัส OTP ของคุณคือ: ${randomOtp}`);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpInput !== systemOtp) {
      setError("รหัส OTP ไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง");
      return;
    }

    const role = email.toLowerCase() === "admin@gmail.com" ? "admin" : "member";
    
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userRole", role);

    router.push("/");
  };

  return (
    <div className="flex min-h-[75vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm border border-slate-100">
        <h1 className="text-2xl font-bold text-slate-800 mb-2 text-center">
          {step === "email" ? "เข้าสู่ระบบ / สมัครสมาชิก" : "ยืนยันรหัส OTP"}
        </h1>
        <p className="text-xs text-slate-500 text-center mb-6">
          {step === "email" 
            ? "กรอกอีเมลของคุณเพื่อรับรหัสผ่านใช้งานครั้งเดียว (OTP)" 
            : `ระบบได้ส่งรหัส OTP ไปยังอีเมล ${email} แล้ว`}
        </p>

        {error && (
          <div className="mb-4 rounded-2xl bg-red-50 p-3 text-center text-xs font-bold text-red-500 border border-red-100">
            {error}
          </div>
        )}

        {step === "email" ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
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
                />
              </div>
              <p className="mt-1.5 text-[11px] text-slate-400">
                *หากใช้ <span className="font-semibold text-slate-600">admin@gmail.com</span> จะได้สิทธิ์ผู้ดูแลระบบ (Admin)
              </p>
            </div>

            <button 
              type="submit" 
              className="w-full mt-2 flex items-center justify-center gap-2 rounded-2xl bg-pink-600 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-pink-700"
            >
              รับรหัส OTP <ArrowRight size={16} />
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">กรอกรหัส OTP 6 หลัก</label>
              <div className="relative flex items-center">
                <KeyRound className="absolute left-3 text-slate-400" size={18} />
                <input 
                  type="text" 
                  maxLength={6}
                  value={otpInput} 
                  onChange={(e) => setOtpInput(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-center tracking-widest text-lg font-bold focus:bg-white focus:outline-none focus:border-pink-500"
                  placeholder="------"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full mt-2 flex items-center justify-center gap-2 rounded-2xl bg-pink-600 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-pink-700"
            >
              ยืนยันเข้าสู่ระบบ <ShieldCheck size={18} />
            </button>

            <button 
              type="button" 
              onClick={() => setStep("email")}
              className="w-full text-center text-xs text-slate-500 hover:underline mt-2"
            >
              เปลี่ยนอีเมล / ขอรหัสใหม่อีกครั้ง
            </button>
          </form>
        )}
      </div>
    </div>
  );
}