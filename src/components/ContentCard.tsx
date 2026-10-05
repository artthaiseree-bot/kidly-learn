"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, Clock, Eye, Volume2, BookOpen } from "lucide-react";
import { TYPE_MAP, minutes, type CType } from "@/lib/utils";

export type CardItem = {
  id: string;
  slug: string;
  title: string;
  coverUrl: string | null;
  type: CType;
  ageMin: number;
  ageMax: number;
  durationSec: number;
  languages: string | string[] | null | undefined;
  narration: "AUDIO" | "SELF_READ";
  views: number;
  favorited?: boolean;
};

export default function ContentCard({ item }: { item: CardItem }) {
  const [fav, setFav] = useState(!!item.favorited);
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  const languages = Array.isArray(item.languages)
    ? item.languages
    : typeof item.languages === "string"
      ? item.languages.split(",").map((language) => language.trim())
      : [];

  const toggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (busy) return;

    setBusy(true);

    try {
      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contentId: item.id,
        }),
      });

      if (response.status === 401) {
        router.push("/me");
        return;
      }

      const data = await response.json();
      setFav(data.favorited);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Link
      href={`${TYPE_MAP[item.type].path}/${item.slug}`}
      className="group block overflow-hidden rounded-2xl bg-white ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-card"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-light">
        {item.coverUrl && (
          <Image
            src={item.coverUrl}
            alt={item.title}
            fill
            sizes="300px"
            unoptimized
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        )}

        <button
          onClick={toggle}
          aria-label="ถูกใจ"
          disabled={busy}
          className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-white/90 shadow disabled:opacity-60"
        >
          <Heart
            size={15}
            className={fav ? "fill-brand text-brand" : "text-brand"}
          />
        </button>
      </div>

      <div className="space-y-1.5 p-3">
        <div className="flex items-center gap-2 text-[11px] text-muted">
          <span className="rounded bg-brand-light px-1.5 py-0.5 font-bold text-brand">
            {item.ageMin}-{item.ageMax} ปี
          </span>

          <span className="flex items-center gap-1">
            <Clock size={11} />
            {minutes(item.durationSec)}
          </span>
        </div>

        <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-bold leading-tight">
          {item.title}
        </h3>

        <div className="flex items-center justify-between text-[11px] text-muted">
          <span className="flex items-center gap-1">
            {languages.map((language) => (
              <span key={language}>
                {language === "th"
                  ? "TH"
                  : language === "en"
                    ? "EN"
                    : language}
              </span>
            ))}

            {item.narration === "AUDIO" ? (
              <>
                <Volume2 size={11} className="text-brand" />
                มีเสียง
              </>
            ) : (
              <>
                <BookOpen size={11} className="text-grape" />
                อ่านเอง
              </>
            )}
          </span>

          <span className="flex items-center gap-1">
            <Eye size={11} />
            {item.views}
          </span>
        </div>
      </div>
    </Link>
  );
}