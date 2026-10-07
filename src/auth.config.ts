import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

// ไฟล์นี้ต้อง "เบา" เพราะ middleware ต้องใช้ ห้าม import Prisma เข้ามา
export const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: "/signin",   // ถ้ายังไม่ login ให้เด้งมาหน้านี้
    error: "/signin",
  },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        (session.user as any).id = token.sub;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;