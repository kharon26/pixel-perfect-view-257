// ─────────────────────────────────────────────────────────────
// PROJECT UTILITY FUNCTIONS
// ─────────────────────────────────────────────────────────────

import { PROJECTS } from "@/data/projects";
import type { Category } from "@/types/project";

const getSingleCategoryLabel = (cat: Category | string, lang: "RO" | "EN" = "RO") => {
  if (lang === "RO") return cat;
  switch (cat) {
    case "Toate":
      return "All";
    case "Auto":
      return "Automotive";
    case "Culinar":
      return "Food & Culinary";
    case "Produs":
      return "Product";
    case "Reclamă & Brand":
      return "Brand & Advertising";
    case "Clinică Dentară":
      return "Dental Clinic";
    case "Altele":
      return "Other";
    default:
      return cat;
  }
};

export const getCategoryLabel = (
  cat: Category | Category[] | string | string[],
  lang: "RO" | "EN" = "RO"
): string => {
  if (Array.isArray(cat)) {
    return cat.map((c) => getSingleCategoryLabel(c, lang)).join(" / ");
  }
  return getSingleCategoryLabel(cat, lang);
};

export const getRoleLabel = (role: string, lang: "RO" | "EN" = "RO"): string => {
  if (lang === "RO") return role;
  switch (role) {
    case "Fotografie Comercială & Produs":
      return "Commercial & Product Photography";
    case "Fotografie Culinară & Motion Comercial":
      return "Culinary Photography & Commercial Motion";
    case "Fotografie Culinară & Video Promo":
      return "Culinary Photography & Promo Video";
    case "Fotografie Auto & Tehnică":
      return "Automotive & Technical Photography";
    case "Fotografie Comercială & Regie":
      return "Commercial Photography & Direction";
    case "Fotografie Comercială & Medicală":
      return "Commercial & Medical Photography";
    case "Fotografie Culinară & Reclame Social Media":
      return "Culinary Photography & Social Ads";
    case "Motion pe Circuit & Fotografie de Mare Viteză":
      return "Track Motion & High-Speed Photography";
    case "Fotografie Comercială de Produs & Motion":
      return "Commercial Product Photography & Motion";
    case "Fotografie Auto & Detaliu Tehnic":
      return "Automotive Photography & Technical Detail";
    case "Fotografie Comercială":
      return "Commercial Photography";
    case "Fotografie de Acțiune pe Circuit":
      return "Track Action Photography";
    case "Reclamă Video de Produs Comercial":
      return "Commercial Product Video Ad";
    case "Fotografie de Produs & Auto":
      return "Product & Automotive Photography";
    case "Fotografie Culinară":
      return "Culinary Photography";
    default:
      return role;
  }
};

/** Derive the poster image path for a video: `/x/video.mp4` → `/x/video.poster.jpg` */
export const videoPoster = (videoSrc: string): string =>
  videoSrc.replace(/\.mp4$/i, ".poster.jpg");

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);

export const nextProject = (slug: string) => {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  return PROJECTS[(i + 1) % PROJECTS.length];
};
