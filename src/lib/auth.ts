import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: { signIn: "/me" },
  providers: [
    ...(process.env.AUTH_GOOGLE_ID
      ? [Google({ allowDangerousEmailAccountLinking: true })]
      : []),
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(c) {
        const email = String(c?.email || "").toLowerCase();
        const password = String(c?.password || "");
        if (!email || !password) return null;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user?.password) return null;
        if (!(await bcrypt.compare(password, user.password))) return null;
        return { id: user.id, name: user.name, email: user.email, image: user.image };
      },
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      if (token.email) {
        const u = await prisma.user.findUnique({ where: { email: token.email } });
        if (u) { token.uid = u.id; token.role = u.role; token.name = u.name; token.picture = u.image; }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.uid as string;
        session.user.role = token.role as "USER" | "ADMIN";
      }
      return session;
    },
  },
});