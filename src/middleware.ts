import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname, search } = req.nextUrl;

  if (!isLoggedIn) {
    const signInUrl = new URL("/signin", req.nextUrl.origin);
    signInUrl.searchParams.set("callbackUrl", pathname + search);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

// 🔒 ยามจะทำงานเฉพาะ 6 เส้นทางนี้เท่านั้น หน้าอื่นไม่ถูกแตะเลย
export const config = {
  matcher: [
    "/stories/:path*",
    "/animations/:path*",
    "/ebook/:path*",
    "/learn/:path*",
    "/songs/:path*",
    "/video/:path*",
  ],
};