import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma" // ดึงฐานข้อมูลเดิมของคุณเอ้มาใช้
import Resend from "next-auth/providers/resend"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Resend({
      apiKey: process.env.RESEND_API_KEY,
      from: "onboarding@resend.dev", // เมลทดสอบฟรีของ Resend
    }),
  ],
  pages: {
    signIn: "/signin", // ให้เด้งไปหน้า SignIn สีชมพูของคุณเอ้
  },
})