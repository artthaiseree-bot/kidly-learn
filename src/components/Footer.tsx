export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-100 bg-white py-6">
      <div className="mx-auto flex w-full max-w-[1240px] flex-col items-center justify-between gap-4 px-4 sm:flex-row">
        
        {/* โลโก้และชื่อเว็บ (ซ้าย) */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-400 to-purple-500 text-lg font-bold text-white shadow-sm">
            kul
          </div>
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
            <span className="font-bold text-slate-800">Kids Learning Library</span>
            <span className="text-sm text-slate-500">พื้นที่เล็ก ๆ ของการเรียนรู้ที่ยิ่งใหญ่</span>
          </div>
        </div>

        {/* เครดิต (ขวา) */}
        <div className="text-sm text-slate-500">
          โดยเขมรุจิ กุลแพทย์
        </div>
        
      </div>
    </footer>
  );
}