import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // ข้อมูลจำลองสำหรับเข้าสู่ระบบ
        if (credentials?.username === "admin" && credentials?.password === "1234") {
          return { id: "1", name: "Admin", email: "admin@example.com" };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET || "super-secret-key-for-dev",
});

export { handler as GET, handler as POST };