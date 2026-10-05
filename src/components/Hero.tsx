import Image from "next/image";
import { Star } from "lucide-react";

export default function Hero({
  eyebrow, title, subtitle, imageUrl, icon = "",
}: { eyebrow?: string | null; title: string; subtitle?: string | null; imageUrl?: string | null; icon?: string }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-light via-purple-50 to-sky-50 p-6 md:p-8">
      <div className="relative z-10 max-w-lg">
        {eyebrow && (
          <p className="mb-2 flex items-center gap-1.5 text-xs font-bold text-brand">
            <Star size={13} className="fill-amber-400 text-amber-400" />{eyebrow}
          </p>
        )}
        <h1 className="text-3xl font-extrabold leading-tight md:text-4xl">
          <span className="mr-2">{icon}</span>
          <span className="bg-gradient-to-r from-grape via-sky2 to-brand bg-clip-text text-transparent">{title}</span>
        </h1>
        {subtitle && <p className="mt-3 whitespace-pre-line text-sm text-ink/60">{subtitle}</p>}
      </div>
      {imageUrl && (
        <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-[45%] md:block">
          <Image src={imageUrl} alt="" fill unoptimized className="object-cover object-center" priority />
        </div>
      )}
    </div>
  );
}
