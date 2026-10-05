import ContentCard, { type CardItem } from "./ContentCard";

export default function ContentGrid({
  items, eyebrow, title, empty = "ยังไม่มีเนื้อหาในหมวดนี้",
}: { items: CardItem[]; eyebrow?: string; title?: string; empty?: string }) {
  return (
    <section className="mt-7">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      {title && <h2 className="h2 mb-3">{title}</h2>}
      {items.length === 0 ? (
        <div className="rounded-2xl bg-slate-50 py-12 text-center text-sm text-muted">{empty}</div>
      ) : (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {items.map(i => <ContentCard key={i.id} item={i} />)}
        </div>
      )}
    </section>
  );
}
