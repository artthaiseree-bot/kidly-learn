import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";

export const metadata = {
  title: "นิทานแบ่งปันสุข",
  description: "โลกแห่งการเรียนรู้ เพื่อช่วงเวลาดี ๆ ของเด็ก ๆ",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className="min-h-screen text-ink antialiased">
        <div className="fixed inset-0 -z-20 bg-[url('/bg-library.jpg')] bg-cover bg-center bg-no-repeat" />
        <div className="fixed inset-0 -z-10 bg-gradient-to-b from-white/60 via-white/40 to-white/70" />
        <SessionProvider>
          <Navbar />
          <main className="mx-auto w-full max-w-[1240px] px-3 pb-10 pt-5 md:px-4">
            <div className="rounded-4xl bg-white/95 p-4 shadow-card backdrop-blur md:p-7">
              {children}
            </div>
          </main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}