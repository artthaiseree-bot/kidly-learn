import NextAuth from "next-auth"
import { authConfig } from "./auth.config"

// จุดสำคัญที่แก้คือบรรทัดนี้ครับ (สั่งให้ Next.js มองเห็นตัวดักจับ)
export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images|books|signin).*)"],
}