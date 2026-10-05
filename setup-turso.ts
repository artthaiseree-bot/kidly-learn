import { createClient } from "@libsql/client";
import { execSync } from "child_process";
import fs from "fs";

// โหลดตัวแปรจากไฟล์ .env (เขียนแบบใหม่ ไม่มี Error แน่นอน)
const env = fs.readFileSync(".env", "utf-8");
const getEnv = (k: string) => {
  const lines = env.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith(k + '=')) {
      let val = trimmed.substring(k.length + 1).trim();
      if (val.startsWith('"') && val.endsWith('"')) {
        val = val.substring(1, val.length - 1);
      }
      return val;
    }
  }
  return undefined;
};

const TURSO_DATABASE_URL = getEnv("TURSO_DATABASE_URL");
const TURSO_AUTH_TOKEN = getEnv("TURSO_AUTH_TOKEN");

async function main() {
  if (!TURSO_DATABASE_URL || !TURSO_AUTH_TOKEN) {
    throw new Error("หา TURSO_DATABASE_URL หรือ TURSO_AUTH_TOKEN ในไฟล์ .env ไม่เจอครับ");
  }

  console.log("1/3 กำลังสร้างคำสั่ง SQL จากโครงสร้าง Prisma...");
  execSync("npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > setup.sql");
  
  const sql = fs.readFileSync("setup.sql", "utf-8");
  
  console.log("2/3 กำลังเชื่อมต่อฐานข้อมูล Turso...");
  const db = createClient({
    url: TURSO_DATABASE_URL,
    authToken: TURSO_AUTH_TOKEN,
  });

  console.log("3/3 กำลังสร้างตารางบนฐานข้อมูล Turso (อาจใช้เวลาสักครู่)...");
  
  try {
    await db.executeMultiple(sql);
    console.log("✅ สร้างตารางบน Turso สำเร็จเรียบร้อย!");
  } catch (err: any) {
    console.error("❌ เกิดข้อผิดพลาดตอนรัน SQL:", err.message);
  }
  
  if (fs.existsSync("setup.sql")) {
    fs.unlinkSync("setup.sql"); // ลบไฟล์ทิ้งหลังทำเสร็จ
  }
}

main().catch((e) => {
  console.error("❌ เกิดข้อผิดพลาด:", e.message || e);
  process.exit(1);
});