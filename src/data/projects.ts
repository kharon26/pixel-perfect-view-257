// ─────────────────────────────────────────────────────────────
// PROJECT DATA — swap placeholder content for real work here.
// Each entry drives both the grid card and the case-study page.
// ─────────────────────────────────────────────────────────────
import automotive from "@/assets/ph-automotive.jpg";
import product from "@/assets/ph-product.jpg";
import food from "@/assets/ph-food.jpg";
import medical from "@/assets/ph-medical.jpg";
import social from "@/assets/ph-social.jpg";

export const CATEGORIES = [
  "Automotive",
  "Product & E-commerce",
  "Food & Beverage",
  "Medical/Aesthetic",
  "Social Content",
] as const;

export type Category = (typeof CATEGORIES)[number];

export type Project = {
  slug: string;
  index: string; // grid label, e.g. "01"
  title: string;
  client: string;
  category: Category;
  year: string;
  role: string;
  cover: string; // TODO: replace with real cover image
  narrative: string;
  gallery: string[]; // TODO: replace with real gallery images / video posters
  // TODO: optional video — set to an .mp4 URL to autoplay a loop on the case study hero
  video?: string;
};

const COVER: Record<Category, string> = {
  Automotive: automotive,
  "Product & E-commerce": product,
  "Food & Beverage": food,
  "Medical/Aesthetic": medical,
  "Social Content": social,
};

const RAW: Array<[title: string, client: string, category: Category, year: string]> = [
  ["Night Shift", "BMW", "Automotive", "2025"],
  ["Coastal Run", "Mazda", "Automotive", "2025"],
  ["Apex", "Motorpark", "Automotive", "2024"],
  ["Cold Start", "Placeholder Client", "Automotive", "2024"],
  ["Still Objects", "Nespresso", "Product & E-commerce", "2025"],
  ["Glass & Grain", "Placeholder Client", "Product & E-commerce", "2025"],
  ["Catalogue 04", "Placeholder Client", "Product & E-commerce", "2024"],
  ["Matte Series", "Placeholder Client", "Product & E-commerce", "2024"],
  ["Slow Pour", "Placeholder Client", "Food & Beverage", "2025"],
  ["Table Light", "Placeholder Client", "Food & Beverage", "2024"],
  ["Harvest Menu", "Placeholder Client", "Food & Beverage", "2024"],
  ["Clinic", "Placeholder Client", "Medical/Aesthetic", "2025"],
  ["Skin Study", "Placeholder Client", "Medical/Aesthetic", "2024"],
  ["Before / After", "Placeholder Client", "Medical/Aesthetic", "2024"],
  ["Vertical Cut", "Placeholder Client", "Social Content", "2025"],
  ["Always On", "Placeholder Client", "Social Content", "2025"],
];

export const PROJECTS: Project[] = RAW.map(([title, client, category, year], i) => ({
  slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
  index: String(i + 1).padStart(2, "0"),
  title,
  client,
  category,
  year,
  role: "Direction · Photography · Edit",
  cover: COVER[category],
  narrative:
    "Placeholder narrative. Two or three sentences on the brief, the approach and the constraint that shaped the result. Replace with the real case-study copy — keep it short; the images should carry the weight.",
  gallery: [COVER[category], COVER[category], COVER[category]],
}));

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);
export const nextProject = (slug: string) => {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  return PROJECTS[(i + 1) % PROJECTS.length];
};