import { NextResponse } from "next/server";
import { auth } from "@/auth";
export async function requireAdmin() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN")
    throw NextResponse.json({ error: "ไม่มีสิทธิ์เข้าถึง" }, { status: 403 });
  return session;
}
export async function requireUser() {
  const session = await auth();
  if (!session?.user?.id)
    throw NextResponse.json({ error: "กรุณาเข้าสู่ระบบ" }, { status: 401 });
  return session;
}
export const handle = (e: unknown) =>
  e instanceof NextResponse ? e : NextResponse.json({ error: String(e) }, { status: 400 });