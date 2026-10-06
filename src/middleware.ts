export { auth as middleware } from "@/auth"

export const config = {
  // บรรทัดนี้คือการสั่งยามว่า "บล็อกทุกหน้าเลยนะ ยกเว้นพวกรูปภาพหรือหน้าล็อกอิน"
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images|books|signin).*)"],
}