import { auth } from "./auth"

export default auth((req) => {
  // Auth.js จะตรวจสอบ session ให้อัตโนมัติ
})

export const config = {
  matcher: [
    "/stories/:path*",
    "/animations/:path*",
    "/ebook/:path*",
    "/learn/:path*",
    "/songs/:path*",
    "/video/:path*",
  ],
}