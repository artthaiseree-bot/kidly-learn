import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Clock, Eye, Volume2, Download } from "lucide-react";
import { minutes } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = await prisma.content.findUnique({ where: { slug }, include: { category: true } });
  if (!c || !c.isPublished) notFound();
  
  await prisma.content.update({ where: { id: c.id }, data: { views: { increment: 1 } } });
  
  return (
    <article className="mx-auto max-w-3xl">
      {c.coverUrl && (
        <div className="relative aspect-[16/9] overflow-hidden rounded-3xl">
          <Image src={c.coverUrl} alt={c.title} fill className="object-cover" priority />
        </div>
      )}
      <p className="eyebrow mt-5">{c.category?.name ?? "เนื้อหาแนะนำ"}</p>
      <h1 className="text-2xl font-extrabold md:text-3xl">{c.title}</h1>
      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted">
        <span className="rounded bg-brand-light px-2 py-1 font-bold text-brand">{c.ageMin}-{c.ageMax} ปี</span>
        <span className="flex items-center gap-1"><Clock size={12} />{minutes(c.durationSec)}</span>
        <span className="flex items-center gap-1"><Eye size={12} />{c.views}</span>
        {(Array.isArray(c.languages)
  ? c.languages
  : typeof c.languages === "string"
    ? c.languages.split(",").map((l) => l.trim())
    : []
).map((l) => (
  <span key={l}>
    {l === "th" ? "ไทย" : l === "en" ? "English" : l}
  </span>
))}
      </div>
      {c.videoUrl && (
        <video controls className="mt-5 w-full rounded-2xl bg-black" poster={c.coverUrl ?? undefined}>
          <source src={c.videoUrl} />
        </video>
      )}
      {c.audioUrl && (
        <div className="mt-5 flex items-center gap-3 rounded-2xl bg-brand-light p-4">
          <Volume2 className="text-brand" />
          <audio controls src={c.audioUrl} className="w-full" />
        </div>
      )}
      {c.description && <p className="mt-5 text-ink/70">{c.description}</p>}
      {c.body && <div className="mt-4 whitespace-pre-line leading-8 text-ink/85">{c.body}</div>}
      {c.pdfUrl && (
        <a href={c.pdfUrl} target="_blank" className="btn-brand mt-6"><Download size={16} />ดาวน์โหลดใบงาน PDF</a>
      )}
    </article>
  );
}
