"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Home, BookOpen, Sparkles, Clapperboard, Music, Search, Heart, User, Shield, Menu, X } from "lucide-react";
import clsx from "clsx";
import { useState } from "react";

const NAV = [
  { href: "/", label: "หน้าแรก", icon: Home },
  { href: "/stories", label: "นิทาน", icon: BookOpen },
  { href: "/learn", label: "เรียนรู้", icon: Sparkles },
  { href: "/animations", label: "แอนิเมชัน", icon: Clapperboard },
  { href: "/songs", label: "เพลงเด็ก", icon: Music },
];

export default function Navbar() {
  const path = usePathname();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  // Hide Navbar in admin routes
  if (path?.startsWith("/admin")) return null;

  const Item = ({ href, label, icon: Icon }: any) => {
    const active = href === "/" ? path === "/" : path?.startsWith(href);
    return (
      <Link 
        href={href} 
        onClick={() => setOpen(false)}
        className={clsx(
          "flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold transition",
          active ? "bg-brand-light text-brand" : "text-ink/70 hover:bg-slate-50"
        )}
      >
        <Icon size={16} />{label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-2 px-4">
        
        {/* Logo and Brand Name Section */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-10 w-10 overflow-hidden rounded-full shadow-md">
            <img src="/logo.png" alt="Logo" className="h-full w-full object-cover" />
          </div>
          <span className="leading-tight">
            <span className="block text-base font-extrabold md:text-lg">
              {/* เปลี่ยนจาก Kids Learning Library เป็น นิทานแบ่งปันสุข พร้อมคงการไล่สี */}
              <span className="text-grape">นิทาน</span>
              <span className="text-sky2">แบ่งปัน</span>
              <span className="text-brand">สุข</span>
            </span>
            <span className="hidden text-[10px] text-muted md:block">
              โลกแห่งการเรียนรู้ เพื่อช่วงเวลาดี ๆ ของเด็ก ๆ
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map(n => <Item key={n.href} {...n} />)}
        </nav>

        {/* Right Action Icons */}
        <div className="flex items-center gap-1.5">
          <Link href="/search" className="grid h-9 w-9 place-items-center rounded-full bg-brand-light text-brand">
            <Search size={16} />
          </Link>
          
          <Link href="/me" className="hidden items-center gap-1.5 rounded-full bg-brand-light px-3 py-2 text-xs font-bold text-brand sm:flex">
            <Heart size={14} />ของฉัน
          </Link>
          
          {session?.user?.role === "ADMIN" && (
            <Link href="/admin" className="grid h-9 w-9 place-items-center rounded-full bg-grape text-white" title="หลังบ้าน">
              <Shield size={16} />
            </Link>
          )}
          
          <Link href="/me" className="grid h-9 w-9 place-items-center rounded-full bg-brand text-white">
            <User size={16} />
          </Link>
          
          <button 
            onClick={() => setOpen(v => !v)} 
            className="grid h-9 w-9 place-items-center rounded-full bg-slate-100 lg:hidden"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {open && (
        <nav className="flex flex-col gap-1 border-t border-slate-100 bg-white px-4 py-3 lg:hidden">
          {NAV.map(n => <Item key={n.href} {...n} />)}
        </nav>
      )}
    </header>
  );
}