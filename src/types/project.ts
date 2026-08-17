// ─────────────────────────────────────────────────────────────
// PROJECT TYPES & CATEGORIES
// ─────────────────────────────────────────────────────────────

export const CATEGORIES = [
  "Auto",
  "Culinar",
  "Produs",
  "Reclamă & Brand",
  "Clinică Dentară",
  "Altele",
] as const;

export type Category = (typeof CATEGORIES)[number];

export type Project = {
  slug: string;
  index: string;
  title: string;
  client: string;
  category: Category | Category[];
  year: string;
  role: string;
  cover: string;
  coverPosition?: string;
  heroPosition?: string;
  heroLandscape?: string;
  narrative: string;
  narrativeEn: string;
  gallery: string[];
  video?: string;
};
