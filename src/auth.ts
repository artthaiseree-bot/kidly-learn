import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma" 
import Resend from "next-auth/providers/resend"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Resend({
      apiKey: process.env.RESEND_API_KEY,
      from: "onboarding@resend.dev", 
    }),
  ],
  pages: {
    signIn: "/signin", 
  },
  // เติมกฎให้ยามเฝ้าประตูตรงนี้ครับ
  callbacks: {
    authorized({ auth }) {
      // ถ้าไม่มีข้อมูลล็อกอิน (ไม่มีบัตร) จะเด้งกลับไปหน้าล็อกอินอัตโนมัติ
      return !!auth;
    }
  }
})