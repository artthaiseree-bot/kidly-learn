import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/signin",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;

      // หน้าเหล่านี้อนุญาตให้ทุกคนเข้าชมได้ทันทีโดยไม่ต้องล็อกอิน
      const isPublicPage = pathname === "/" || pathname.startsWith("/stories") || pathname.startsWith("/learn") || pathname.startsWith("/animations") || pathname.startsWith("/songs") || pathname.startsWith("/search");

      // ถ้าเป็นหน้า signin และล็อกอินแล้ว ให้เด้งกลับหน้าแรก
      if (pathname.startsWith("/signin")) {
        if (isLoggedIn) return Response.redirect(new URL("/", nextUrl));
        return true;
      }

      // ถ้าเป็นหน้าส่วนตัวเช่น /me บังคับว่าต้องล็อกอินถึงจะเข้าได้
      if (pathname.startsWith("/me")) {
        return isLoggedIn;
      }

      // หน้าอื่นๆ นอกเหนือจากนี้ อนุญาตให้ผ่านได้ปกติ
      return true;
    },
  },
};