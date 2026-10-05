import { NextResponse } from "next/server";
import { writeFile, mkdir, rm, access } from "fs/promises";
import path from "path";
import AdmZip from "adm-zip";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const PUBLIC_DIR = path.join(process.cwd(), "public");
const BOOKS_DIR = path.join(PUBLIC_DIR, "books");
const IMAGES_DIR = path.join(PUBLIC_DIR, "images");

// ทำชื่อโฟลเดอร์ให้ปลอดภัย (ตัดอักขระแปลก ๆ ออก)
function safeName(input: string) {
  return input
    .normalize("NFKD")
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-zA-Z0-9ก-๙\-_ ]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .toLowerCase();
}

function uniqueSuffix() {
  return Date.now().toString(36);
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const title = String(form.get("title") || "").trim();
    const description = String(form.get("description") || "").trim();
    const categoryId = String(form.get("categoryId") || "").trim();
    const ageMin = String(form.get("ageMin") || "").trim();
    const ageMax = String(form.get("ageMax") || "").trim();
    const isPublished = form.get("isPublished") === "on";
    const isFeatured = form.get("isFeatured") === "on";

    const cover = form.get("cover") as File | null;
    const zipFile = form.get("zip") as File | null;

    if (!title) {
      return NextResponse.json(
        { ok: false, message: "กรุณากรอกชื่อเรื่องนิทาน" },
        { status: 400 }
      );
    }
    if (!zipFile || zipFile.size === 0) {
      return NextResponse.json(
        { ok: false, message: "กรุณาเลือกไฟล์นิทาน (.zip)" },
        { status: 400 }
      );
    }

    // ---------- 1) ตั้งชื่อโฟลเดอร์จากชื่อไฟล์ ZIP ----------
    let slug = safeName(zipFile.name) || safeName(title) || "story";

    // ถ้าชื่อซ้ำกับที่มีอยู่ ให้เติมตัวเลขท้าย
    const existing = await prisma.content.findUnique({ where: { slug } });
    if (existing) slug = `${slug}-${uniqueSuffix()}`;

    // ---------- 2) แตกไฟล์ ZIP ----------
    const bookDir = path.join(BOOKS_DIR, slug);
    await mkdir(bookDir, { recursive: true });

    const zipBuffer = Buffer.from(await zipFile.arrayBuffer());
    const zip = new AdmZip(zipBuffer);
    const entries = zip.getEntries().filter((e) => !e.isDirectory);

    if (entries.length === 0) {
      await rm(bookDir, { recursive: true, force: true });
      return NextResponse.json(
        { ok: false, message: "ไฟล์ ZIP ว่างเปล่า" },
        { status: 400 }
      );
    }

    // ถ้าไฟล์ทั้งหมดอยู่ในโฟลเดอร์ชั้นเดียวกัน ให้ตัดชั้นนั้นออก
    let root = "";
    const firstParts = entries[0].entryName.split("/");
    if (firstParts.length > 1) {
      const candidate = firstParts[0] + "/";
      if (entries.every((e) => e.entryName.startsWith(candidate))) {
        root = candidate;
      }
    }

    for (const entry of entries) {
      const rel = entry.entryName.slice(root.length);
      if (!rel) continue;
      if (rel.includes("..")) continue;
      if (rel.startsWith("__MACOSX")) continue;
      if (path.basename(rel).startsWith("._")) continue;

      const dest = path.join(bookDir, rel);
      if (!dest.startsWith(bookDir)) continue;

      await mkdir(path.dirname(dest), { recursive: true });
      await writeFile(dest, entry.getData());
    }

    // ---------- 3) ตรวจว่ามี index.html ไหม ----------
    let readerPath = `/books/${slug}/index.html`;
    try {
      await access(path.join(bookDir, "index.html"));
    } catch {
      await rm(bookDir, { recursive: true, force: true });
      return NextResponse.json(
        {
          ok: false,
          message:
            "ไม่พบไฟล์ index.html ในไฟล์ ZIP กรุณาบีบอัดโดยเลือกไฟล์ทั้งหมดในโฟลเดอร์ แล้วสั่ง Compress",
        },
        { status: 400 }
      );
    }

    // ---------- 4) บันทึกรูปหน้าปก ----------
    let coverUrl: string | null = null;
    if (cover && cover.size > 0) {
      await mkdir(IMAGES_DIR, { recursive: true });
      const ext = (cover.name.split(".").pop() || "jpg").toLowerCase();
      const coverName = `${slug}-cover.${ext}`;
      const coverBuffer = Buffer.from(await cover.arrayBuffer());
      await writeFile(path.join(IMAGES_DIR, coverName), coverBuffer);
      coverUrl = `/images/${coverName}`;
    }

    // ---------- 5) บันทึกลงฐานข้อมูล ----------
    const data: Record<string, unknown> = {
      type: "ebook",
      title,
      slug,
      description: description || null,
      coverUrl,
      pdfUrl: readerPath, // เก็บลิงก์เปิดอ่านนิทานไว้ที่นี่
      isPublished,
      isFeatured,
    };

    if (ageMin) data.ageMin = Number(ageMin);
    if (ageMax) data.ageMax = Number(ageMax);
    if (categoryId) data.categoryId = categoryId;

    const created = await prisma.content.create({ data: data as never });

    return NextResponse.json({
      ok: true,
      message: "เพิ่มนิทานเรียบร้อยแล้ว",
      id: created.id,
      slug,
      readerPath,
      coverUrl,
    });
  } catch (err) {
    console.error("[upload-story]", err);
    const msg = err instanceof Error ? err.message : "เกิดข้อผิดพลาด";
    return NextResponse.json({ ok: false, message: msg }, { status: 500 });
  }
}