import { BookOpen } from "lucide-react";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm border border-slate-100 text-center">
        
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-50 text-pink-600 shadow-inner">
          <BookOpen size={32} />
        </div>

        <h1 className="text-xl font-bold text-slate-800 mb-2">Kids Learning Library</h1>
        <p className="text-sm text-slate-500 mb-8">กรุณาเข้าสู่ระบบด้วยบัญชี Google เพื่อใช้งานเว็บไซต์</p>

        {/* ใช้ลิงก์ตรงไปที่ API ของ NextAuth ส่งไปหน้าแรกทันทีโดยไม่ผ่าน Server Action ให้ปวดหัว */}
        <Link
          href="/api/auth/signin/google?callbackUrl=/"
          className="w-full flex items-center justify-center gap-3 rounded-2xl bg-white border border-slate-200 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 cursor-pointer"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.18v3.14C3.15 21.32 7.22 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.62H1.18C.43 8.15 0 9.89 0 12s.43 3.85 1.18 5.38l4.09-3.14z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.22 0 3.15 2.68 1.18 6.62l4.09 3.14c.95-2.85 3.6-4.96 6.73-4.96z"
            />
          </svg>
          เข้าสู่ระบบด้วย Google
        </Link>
      </div>
    </div>
  );
}