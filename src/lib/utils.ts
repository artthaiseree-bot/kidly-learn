export const TYPE_MAP = {
    STORY: { label: "นิทาน", path: "/stories" },
    LEARN: { label: "เรียนรู้", path: "/learn" },
    ANIMATION: { label: "แอนิเมชัน", path: "/animations" },
    SONG: { label: "เพลงเด็ก", path: "/songs" },
  } as const;
  export type CType = keyof typeof TYPE_MAP;
  export const mmss = (s: number) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  export const minutes = (s: number) => `${Math.max(1, Math.round(s / 60))} นาที`;
  export const slugify = (s: string) =>
    s.trim().toLowerCase().replace(/[^\w\u0E00-\u0E7F]+/g, "-").replace(/^-|-$/g, "") ||
    `item-${Date.now()}`;
  