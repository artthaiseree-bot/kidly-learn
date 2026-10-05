import { createClient } from "@libsql/client";
import bcrypt from "bcryptjs";
import fs from "fs";

// ฟังก์ชันดึงตัวแปรจากไฟล์ .env
function getEnvVar(key: string) {
  if (process.env[key]) return process.env[key];
  try {
    const envLines = fs.readFileSync(".env", "utf-8").split('\n');
    for (const line of envLines) {
      const trimmed = line.trim();
      if (trimmed.startsWith(key + '=')) {
        let val = trimmed.substring(key.length + 1).trim();
        if (val.startsWith('"') && val.endsWith('"')) val = val.substring(1, val.length - 1);
        return val;
      }
    }
  } catch (e) {}
  return undefined;
}

const img = (t: string) => `https://placehold.co/600x450/FCE7F3/EC4899?text=${encodeURIComponent(t)}`;

async function main() {
  console.log("กำลังเตรียมการเชื่อมต่อฐานข้อมูล Turso...");
  const tUrl = getEnvVar("TURSO_DATABASE_URL");
  const tToken = getEnvVar("TURSO_AUTH_TOKEN");

  if (!tUrl || !tToken) throw new Error("หาตัวแปร TURSO_DATABASE_URL หรือ TURSO_AUTH_TOKEN ไม่เจอครับ");

  // เชื่อมต่อตรงไปยัง Turso ตัดปัญหา Prisma ทิ้งไปเลย!
  const db = createClient({ url: tUrl, authToken: tToken });
  console.log("กำลังเพิ่มข้อมูลตัวอย่างลง Turso แบบ Direct SQL...");

  const queries = [];
  const now = new Date().toISOString();

  // 1. เพิ่มผู้ดูแลระบบ
  const adminPw = await bcrypt.hash("admin1234", 10);
  queries.push({
    sql: `INSERT INTO "User" (id, email, name, role, password) VALUES ('u-admin', 'admin@kidly.com', 'ผู้ดูแลระบบ', 'ADMIN', ?) ON CONFLICT(email) DO UPDATE SET password = excluded.password`,
    args: [adminPw]
  });

  // 2. หมวดหมู่
  const cats = [
    { id: "cat-moral", name: "นิทานคุณธรรม", slug: "moral", type: "STORY", sort: 0 },
    { id: "cat-animal", name: "นิทานสัตว์", slug: "animal", type: "STORY", sort: 1 },
    { id: "cat-math", name: "คณิตศาสตร์", slug: "math", type: "LEARN", sort: 2 },
    { id: "cat-en", name: "ภาษาอังกฤษ", slug: "english", type: "LEARN", sort: 3 },
    { id: "cat-shorts", name: "การ์ตูนสั้น", slug: "shorts", type: "ANIMATION", sort: 4 },
    { id: "cat-lullaby", name: "เพลงกล่อมเด็ก", slug: "lullaby", type: "SONG", sort: 5 },
  ];
  for (const c of cats) {
    queries.push({
      sql: `INSERT INTO "Category" (id, name, slug, type, sortOrder) VALUES (?, ?, ?, ?, ?) ON CONFLICT(slug) DO NOTHING`,
      args: [c.id, c.name, c.slug, c.type, c.sort]
    });
  }

  // 3. แบนเนอร์
  const banners = [
    { id: "bn-story", type: "STORY", eyebrow: "ทุกเรื่องราว คือการเรียนรู้ที่ยิ่งใหญ่", title: "คลังนิทาน", subtitle: "เปิดโลกจินตนาการ ผ่านเรื่องราวแสนสนุก\nพร้อมให้อ่านและฟังไปด้วยกัน" },
    { id: "bn-learn", type: "LEARN", eyebrow: "สนุกคิด สนุกรู้", title: "ห้องเรียนรู้", subtitle: "กิจกรรมฝึกคิด ฝึกทำ\nเรียนได้ทุกที่ทุกเวลา" },
    { id: "bn-anim", type: "ANIMATION", eyebrow: "ดู ฟัง เพลิน", title: "แอนิเมชัน", subtitle: "การ์ตูนสั้นสร้างสรรค์\nปลอดภัยสำหรับเด็ก ๆ" },
    { id: "bn-song", type: "SONG", eyebrow: "ร้อง เล่น เต้น เรียนรู้", title: "ร้องสนุกกับเพลงเด็ก", subtitle: "เดินรอยยิ้มด้วยทำนองสดใส\nให้ทุกวันเป็นช่วงเวลาแห่งความสุข" },
  ];
  for (const b of banners) {
    queries.push({
      sql: `INSERT INTO "Banner" (id, type, eyebrow, title, subtitle, imageUrl, isActive) VALUES (?, ?, ?, ?, ?, ?, 1) ON CONFLICT(type) DO NOTHING`,
      args: [b.id, b.type, b.eyebrow, b.title, b.subtitle, img(b.title)]
    });
  }

  // 4. เนื้อหา
  const items = [
    { id: "c1", type: "STORY", title: "กระต่ายน้อยผจญป่ามหัศจรรย์", slug: "rabbit-forest", ageMin: 4, ageMax: 7, languages: "th,en", narration: "SELF_READ", views: 9, isFeatured: 1, categoryId: "cat-moral", durationSec: 180 },
    { id: "c2", type: "STORY", title: "ช้างน้อยแบ่งปัน", slug: "sharing-elephant", ageMin: 3, ageMax: 5, languages: "th,en", narration: "SELF_READ", views: 41, isFeatured: 1, categoryId: "cat-moral", durationSec: 180 },
    { id: "c3", type: "STORY", title: "หมีน้อยยอดฝันดี", slug: "sleepy-bear", ageMin: 1, ageMax: 4, languages: "th,en", narration: "AUDIO", views: 41, isFeatured: 0, categoryId: "cat-moral", durationSec: 180 },
    { id: "c4", type: "STORY", title: "วันที่จิ้งจอกกับกระต่ายคืนดีกัน", slug: "fox-and-rabbit", ageMin: 5, ageMax: 7, languages: "th,en", narration: "AUDIO", views: 2, isFeatured: 0, categoryId: "cat-moral", durationSec: 180 },
    { id: "c5", type: "STORY", title: "หนูน้อยหมวกแดง", slug: "red-riding-hood", ageMin: 2, ageMax: 5, languages: "th,en", narration: "SELF_READ", views: 41, isFeatured: 0, categoryId: "cat-moral", durationSec: 180 },
    { id: "c6", type: "STORY", title: "วาฬน้อยนับดาว", slug: "whale-counting", ageMin: 2, ageMax: 5, languages: "en", narration: "SELF_READ", views: 36, isFeatured: 0, categoryId: "cat-moral", durationSec: 180 },
    { id: "c7", type: "LEARN", title: "นับเลข 1-10 กับเพื่อนสัตว์", slug: "count-1-10", ageMin: 2, ageMax: 5, languages: "th", narration: "AUDIO", views: 12, isFeatured: 0, categoryId: null, durationSec: 180 },
    { id: "c8", type: "LEARN", title: "ABC Phonics สนุก ๆ", slug: "abc-phonics", ageMin: 3, ageMax: 6, languages: "en", narration: "AUDIO", views: 20, isFeatured: 0, categoryId: null, durationSec: 180 },
    { id: "c9", type: "ANIMATION", title: "นากน้อยผจญโลกใต้ทะเล", slug: "otter-sea", ageMin: 2, ageMax: 5, languages: "th,en", narration: "SELF_READ", views: 18, isFeatured: 0, categoryId: null, durationSec: 180, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { id: "c10", type: "SONG", title: "ดาวน้อยส่องแสง", slug: "twinkle-th", ageMin: 2, ageMax: 5, languages: "th", narration: "AUDIO", durationSec: 60, categoryId: "cat-lullaby", views: 0, isFeatured: 0, audioUrl: "https://www.w3schools.com/html/horse.mp3" },
    { id: "c11", type: "SONG", title: "Twinkle Twinkle Little Star", slug: "twinkle-en", ageMin: 2, ageMax: 5, languages: "en", narration: "AUDIO", durationSec: 60, categoryId: "cat-lullaby", views: 0, isFeatured: 0, audioUrl: "https://www.w3schools.com/html/horse.mp3" },
    { id: "c12", type: "SONG", title: "ฝนเอยฝนตก", slug: "rain-song", ageMin: 2, ageMax: 6, languages: "th", narration: "AUDIO", durationSec: 44, categoryId: "cat-lullaby", views: 0, isFeatured: 0, audioUrl: "https://www.w3schools.com/html/horse.mp3" },
  ];
  
  const bodyText = "กาลครั้งหนึ่งนานมาแล้ว...\n\nในป่าใหญ่ที่เต็มไปด้วยต้นไม้สูงใหญ่ มีเพื่อนตัวน้อยอาศัยอยู่ด้วยกันอย่างมีความสุข";
  for (const [i, it] of items.entries()) {
    queries.push({
      sql: `INSERT INTO "Content" (id, type, title, slug, ageMin, ageMax, languages, narration, views, isFeatured, categoryId, coverUrl, description, body, durationSec, isPublished, sortOrder, videoUrl, audioUrl, updatedAt) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?, ?) ON CONFLICT(slug) DO NOTHING`,
      args: [it.id, it.type, it.title, it.slug, it.ageMin, it.ageMax, it.languages, it.narration, it.views, it.isFeatured, it.categoryId, img(it.title), "เรื่องราวแสนอบอุ่นที่เด็ก ๆ จะได้เรียนรู้ไปพร้อมกัน", bodyText, it.durationSec, i, (it as any).videoUrl || null, (it as any).audioUrl || null, now]
    });
  }

  // 5. ตั้งค่าเว็บไซต์
  const settings = [
    { k: "siteName", v: "นิทานแบ่งปันสุข" },
    { k: "tagline", v: "โลกแห่งการเรียนรู้ เพื่อช่วงเวลาดี ๆ ของเด็ก ๆ" },
    { k: "footerNote", v: "พื้นที่เล็ก ๆ ของการเรียนรู้ที่ยิ่งใหญ่" },
    { k: "credit", v: "โดย เขมรุจิ กุลแพทย์" },
  ];
  for (const s of settings) {
    queries.push({
      sql: `INSERT INTO "SiteSetting" ("key", "value") VALUES (?, ?) ON CONFLICT("key") DO NOTHING`,
      args: [s.k, s.v]
    });
  }

  // รันคำสั่งยิงข้อมูล
  for (const q of queries) await db.execute(q);

  console.log("✅ Seed เสร็จแล้ว (Turso SQLite) - admin@kidly.com / admin1234");
}

main().catch(e => {
  console.error("❌ เกิดข้อผิดพลาด:", e);
  process.exit(1);
});