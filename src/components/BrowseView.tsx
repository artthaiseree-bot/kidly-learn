import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import Hero from "./Hero";
import Filters from "./Filters";
import ContentGrid from "./ContentGrid";
import type { CType } from "@/lib/utils";
import type { Prisma } from "@prisma/client";

const ICON: Record<string, string> = { STORY: "", LEARN: "", ANIMATION: "", SONG: "" };

export default async function BrowseView({
  type, searchParams,
}: { type: CType; searchParams: Record<string, string | undefined> }) {
  const { age, lang, narration, category, duration, q } = searchParams;
  const filtering = Boolean(age || lang || narration || category || duration || q);
  const where: Prisma.ContentWhereInput = { type, isPublished: true };

  if (lang) where.languages = { has: lang };
  if (narration) where.narration = narration as any;
  if (category) where.category = { slug: category };
  if (duration) where.durationSec = { lte: Number(duration) * 60 };
  if (q) where.OR = [
    { title: { contains: q, mode: "insensitive" } },
    { description: { contains: q, mode: "insensitive" } },
    { tags: { has: q } },
  ];
  if (age) { const [a, b] = age.split("-").map(Number); where.ageMin = { lte: b }; where.ageMax = { gte: a }; }

  const [banner, categories, session] = await Promise.all([
    prisma.banner.findUnique({ where: { type } }),
    prisma.category.findMany({ where: { type }, orderBy: { sortOrder: "asc" } }),
    auth(),
  ]);

  const favIds = session?.user?.id
    ? (await prisma.favorite.findMany({ where: { userId: session.user.id }, select: { contentId: true } })).map(f => f.contentId)
    : [];
  const mark = (arr: any[]) => arr.map(c => ({ ...c, favorited: favIds.includes(c.id) }));

  const results = filtering
    ? await prisma.content.findMany({ where, orderBy: { createdAt: "desc" }, take: 60 })
    : [];
  const latest = await prisma.content.findMany({ where: { type, isPublished: true }, orderBy: { createdAt: "desc" }, take: 4 });
  const popular = await prisma.content.findMany({ where: { type, isPublished: true }, orderBy: { views: "desc" }, take: 4 });

  return (
    <>
      <Hero eyebrow={banner?.eyebrow} title={banner?.title ?? "คลังเนื้อหา"}
        subtitle={banner?.subtitle} imageUrl={banner?.imageUrl} icon={ICON[type]} />
      <Filters categories={categories} />
      {filtering ? (
        <ContentGrid items={mark(results)} eyebrow="ผลการค้นหา"
          title={`พบ ${results.length} รายการ`} empty="ไม่พบเนื้อหาที่ตรงกับตัวกรอง ลองปรับเงื่อนไขดูนะคะ" />
      ) : (
        <>
          <ContentGrid items={mark(latest)} eyebrow="เพิ่งเพิ่มเข้ามาใหม่" title="เรื่องใหม่ที่น่าค้นพบ" />
          <ContentGrid items={mark(popular)} eyebrow="เด็ก ๆ เปิดบ่อยที่สุด" title="ยอดนิยม" />
        </>
      )}
    </>
  );
}
