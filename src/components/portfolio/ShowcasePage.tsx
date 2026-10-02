import React, { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { smoothScrollToElement, isSmoothScrolling } from "@/lib/smooth-scroll";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { LazyVideo } from "@/components/LazyVideo";
import { useLanguage } from "@/context/LanguageContext";
import {
  getCategoryLabel,
  getRoleLabel,
  videoPoster,
  getProjectPhotos,
  getProjectVideos,
  getMediaDimensions,
} from "@/lib/project-utils";
import type { Project } from "@/types/project";

type ShowcasePageProps = {
  type: "photo" | "video";
  projects: Project[];
};

export function ShowcasePage({ type, projects }: ShowcasePageProps) {
  const { lang } = useLanguage();
  const [activeSlug, setActiveSlug] = useState<string>(projects[0]?.slug || "");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileSelectorRef = useRef<HTMLDivElement | null>(null);
  const isProgrammaticScrollRef = useRef(false);
  const scrollLockTimerRef = useRef<NodeJS.Timeout | null>(null);

  const isPhoto = type === "photo";

  // Pre-filter project media to ensure strict type separation
  const projectMediaMap = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const p of projects) {
      if (isPhoto) {
        map.set(p.slug, getProjectPhotos(p));
      } else {
        map.set(p.slug, getProjectVideos(p));
      }
    }
    return map;
  }, [projects, isPhoto]);

  // Smooth guided jump to project section start with sticky header offset
  const scrollToProject = useCallback((slug: string) => {
    const target = document.getElementById(slug);
    if (!target) return;

    // Lock scroll-spy while animating so intermediate sections don't fight the target
    isProgrammaticScrollRef.current = true;
    if (scrollLockTimerRef.current) {
      clearTimeout(scrollLockTimerRef.current);
    }

    if (typeof window !== "undefined") {
      window.history.pushState(null, "", `#${slug}`);
    }
    setActiveSlug(slug);

    smoothScrollToElement(target, {
      onComplete: () => {
        isProgrammaticScrollRef.current = false;
        setActiveSlug(slug);
      },
    });

    scrollLockTimerRef.current = setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 1300);
  }, []);

  // 1. Initial direct URL load hash jump (immediate positioning, no long scroll down)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const hash = window.location.hash.replace("#", "");
    if (!hash) return;

    let cancelled = false;
    let frames = 0;
    const checkTarget = () => {
      if (cancelled) return;
      const el = document.getElementById(hash);
      if (el) {
        const rect = el.getBoundingClientRect();
        const style = window.getComputedStyle(el);
        const scrollMarginTop = parseFloat(style.scrollMarginTop) || 0;
        const targetY = Math.max(0, Math.round(window.scrollY + rect.top - scrollMarginTop));
        window.scrollTo(0, targetY);
        setActiveSlug(hash);
        return;
      }
      if (frames++ < 35) {
        requestAnimationFrame(checkTarget);
      }
    };
    requestAnimationFrame(checkTarget);

    return () => {
      cancelled = true;
    };
  }, []);

  // 2. Browser back / forward popstate navigation
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handlePopState = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        scrollToProject(hash);
      } else {
        window.scrollTo(0, 0);
        setActiveSlug(projects[0]?.slug || "");
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [scrollToProject, projects]);

  // 3. Scroll-spy with IntersectionObserver (passive indicator update only)
  useEffect(() => {
    if (typeof window === "undefined" || projects.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Ignore during programmatic smooth scroll
        if (isProgrammaticScrollRef.current || isSmoothScrolling()) return;

        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          visibleEntries.sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top)
          );
          const currentId = visibleEntries[0].target.getAttribute("id");
          if (currentId) {
            setActiveSlug(currentId);
          }
        }
      },
      {
        rootMargin: "-15% 0px -55% 0px",
        threshold: [0, 0.1, 0.4],
      }
    );

    projects.forEach((p) => {
      const el = document.getElementById(p.slug);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [projects]);

  // 4. Click outside to close mobile project dropdown
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        mobileSelectorRef.current &&
        !mobileSelectorRef.current.contains(e.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isMobileMenuOpen]);

  const activeProject = useMemo(
    () => projects.find((p) => p.slug === activeSlug) || projects[0],
    [projects, activeSlug]
  );

  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-neutral-900 selection:text-white">
      <Nav />

      {/* ── Page Header / Hero ── */}
      <header className="relative pt-28 pb-12 md:pt-40 md:pb-20 border-b border-border/70 bg-neutral-50/40">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <Reveal once>
            <Link
              to="/"
              className="label link-underline text-neutral-600 hover:text-black font-bold transition-colors inline-block text-xs md:text-sm mb-3 md:mb-4"
            >
              {lang === "RO" ? "← Înapoi la prima pagină" : "← Back to home"}
            </Link>
          </Reveal>

          <Reveal once delay={60}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-2">
              <div>
                <p className="label text-neutral-600 font-bold uppercase tracking-widest mb-1.5 md:mb-2 text-xs md:text-sm">
                  {isPhoto
                    ? lang === "RO"
                      ? "Portofoliu Fotografie"
                      : "Photography Showcase"
                    : lang === "RO"
                    ? "Portofoliu Video"
                    : "Video Showcase"}
                </p>
                <h1 className="display text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-black font-black uppercase">
                  {isPhoto ? (lang === "RO" ? "Foto" : "Photo") : "Video"}
                </h1>
              </div>

              <div className="flex flex-col md:items-end">
                <span className="font-mono text-xs md:text-sm text-neutral-500 font-semibold uppercase tracking-wider">
                  {projects.length} {lang === "RO" ? "Proiecte" : "Projects"}
                </span>
                <p className="text-xs md:text-sm text-neutral-500 mt-1 max-w-md text-left md:text-right">
                  {isPhoto
                    ? lang === "RO"
                      ? "Toate proiectele foto într-o singură galerie continuă, păstrând identitatea și compoziția fiecărui cadru."
                      : "All photography projects collected into a single continuous editorial feed, preserving the original framing and art direction."
                    : lang === "RO"
                    ? "Toate producțiile video într-un format continuu, cu previzualizări optimizate și acces direct la conținut."
                    : "All video work collected into a single continuous showcase, with optimized previews and direct playback."}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </header>

      {/* ── Mobile & Tablet Compact Sticky Project Selector ── */}
      <div
        ref={mobileSelectorRef}
        className="sticky z-30 xl:hidden border-b border-neutral-200/90 bg-white/95 backdrop-blur-md px-4 py-2.5 transition-all shadow-xs" style={{ top: `max(58px, calc(58px + env(safe-area-inset-top, 0px)))` }}
      >
        <div className="mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            aria-expanded={isMobileMenuOpen}
            aria-label={lang === "RO" ? "Alege proiectul" : "Select project"}
            className="flex items-center justify-between w-full text-left gap-3 focus:outline-none"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-400 shrink-0">
                {lang === "RO" ? "PROIECT" : "PROJECT"}
              </span>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-black truncate">
                {activeProject?.title}
              </span>
            </div>
            <span
              className={`text-xs text-neutral-500 transition-transform duration-200 shrink-0 ${
                isMobileMenuOpen ? "rotate-180" : ""
              }`}
            >
              ↓
            </span>
          </button>
        </div>

        {/* Dropdown list of projects */}
        {isMobileMenuOpen && (
          <div className="mt-2.5 max-h-[55vh] overflow-y-auto border-t border-neutral-100 pt-2 pb-1 flex flex-col gap-0.5">
            {projects.map((p) => {
              const isSelected = p.slug === activeSlug;
              return (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    scrollToProject(p.slug);
                  }}
                  className={`flex items-center justify-between w-full px-2.5 py-2 text-left rounded-sm transition-colors ${
                    isSelected
                      ? "bg-black text-white font-bold"
                      : "text-neutral-700 hover:bg-neutral-100 font-medium"
                  }`}
                >
                  <span className="text-xs uppercase tracking-wider truncate">
                    {p.title}
                  </span>
                  <span
                    className={`font-mono text-[10px] ml-2 shrink-0 ${
                      isSelected ? "text-neutral-300" : "text-neutral-400"
                    }`}
                  >
                    {p.index}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Main Showcase Area: Dedicated Project Flow + Reserved Sticky Index Column ── */}
      <div className="mx-auto max-w-[1720px] px-4 sm:px-6 md:px-10 flex items-start gap-8 xl:gap-10 2xl:gap-14 relative">
        {/* Left Column: Continuous Project Sections Flow */}
        <main className="flex-1 min-w-0">
        {projects.map((p, projectIdx) => {
          const mediaAssets = projectMediaMap.get(p.slug) || [];
          const activeNarrative =
            lang === "RO" ? p.narrative : p.narrativeEn || p.narrative;
          const activeCategory = getCategoryLabel(p.category, lang);
          const activeRole = getRoleLabel(p.role, lang);

          return (
            <section
              key={p.slug}
              id={p.slug}
              className="scroll-mt-28 md:scroll-mt-32 border-b border-neutral-200/60 last:border-b-0 py-16 md:py-28 lg:py-36 bg-background"
            >
              {/* Project Intro / Metadata Header */}
              <div className="w-full">
                <Reveal once delay={40}>
                  <div className="border-b border-neutral-200 pb-6 mb-8 md:mb-12">
                    <div className="flex items-center gap-2 text-neutral-500 font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2">
                      <span>{p.index}</span>
                      <span>—</span>
                      <span>{activeCategory}</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-black leading-tight">
                        {p.title}
                      </h2>
                      <span className="font-mono text-xs md:text-sm font-semibold text-neutral-400">
                        {p.year}
                      </span>
                    </div>
                  </div>
                </Reveal>

                {/* Narrative & Details Layout (matching work.$slug.tsx) */}
                <Reveal once delay={80}>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start mb-12 md:mb-20">
                    {/* Left Meta Definition List */}
                    <dl className="md:col-span-4 grid grid-cols-3 gap-2 sm:gap-4 md:block md:space-y-5 text-left">
                      {[
                        [lang === "RO" ? "Client" : "Client", p.client],
                        [lang === "RO" ? "An" : "Year", p.year],
                        [lang === "RO" ? "Rol" : "Role", activeRole],
                      ].map(([label, val]) => (
                        <div
                          key={label}
                          className="pt-1 md:border-t md:border-border md:pt-3 pb-1"
                        >
                          <dt className="label text-neutral-400 text-[10px] sm:text-xs uppercase tracking-wider font-semibold">
                            {label}
                          </dt>
                          <dd className="mt-0.5 md:mt-1 text-xs sm:text-sm font-medium text-foreground break-words">
                            {val}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    {/* Right Narrative Text & Subtle "View Project" Link */}
                    <div className="md:col-span-8 md:col-start-5">
                      <p className="text-sm leading-relaxed text-neutral-700 md:text-xl md:leading-relaxed font-normal text-left break-words">
                        {activeNarrative}
                      </p>

                      <div className="mt-6 md:mt-8 flex items-center gap-6">
                        <Link
                          to="/work/$slug"
                          params={{ slug: p.slug }}
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold tracking-wider uppercase text-neutral-900 hover:text-black link-underline py-0.5 transition-colors"
                        >
                          {lang === "RO"
                            ? "Vezi pagina completă a proiectului →"
                            : "View full project case study →"}
                        </Link>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Media Container — Respects art direction and natural aspect ratios */}
              <div className="w-full max-w-[1240px] mx-auto px-2 sm:px-4 md:px-6">
                <div className="flex flex-col items-center gap-12 sm:gap-16 md:gap-24">
                  {mediaAssets.map((src, mediaIdx) => {
                    const isVideoAsset = src.endsWith(".mp4");
                    const isEagerCandidate = projectIdx === 0 && mediaIdx < 2;
                    const dims = getMediaDimensions(src);
                    const aspectStyle = dims ? `${dims.width} / ${dims.height}` : undefined;

                    return (
                      <Reveal
                        key={src}
                        once
                        delay={(mediaIdx % 2) * 50}
                        className="w-full flex justify-center"
                      >
                        <div
                          className="w-full max-w-5xl flex justify-center bg-transparent relative overflow-hidden"
                          style={{
                            aspectRatio: aspectStyle,
                            maxHeight: "88vh",
                            width: dims
                              ? `min(100%, calc(88vh * ${dims.width / dims.height}))`
                              : "100%",
                          }}
                        >
                          {isVideoAsset ? (
                            <LazyVideo
                              src={src}
                              poster={videoPoster(src)}
                              controls
                              className="w-auto max-w-full h-auto max-h-[88vh] rounded-none shadow-sm"
                            />
                          ) : (
                            <img
                              src={src}
                              alt={`${p.title} — ${activeRole} ${mediaIdx + 1}`}
                              loading={isEagerCandidate ? "eager" : "lazy"}
                              decoding="async"
                              width={dims?.width}
                              height={dims?.height}
                              style={{ aspectRatio: aspectStyle }}
                              fetchPriority={
                                projectIdx === 0 && mediaIdx === 0 ? "high" : "auto"
                              }
                              className="w-auto max-w-full h-auto max-h-[88vh] rounded-none shadow-sm block transition-opacity duration-300"
                            />
                          )}
                        </div>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        })}
        </main>

        {/* Right Column: Reserved Sticky Index Sidebar Column (Desktop xl+) */}
        <aside
          aria-label={lang === "RO" ? "Index proiecte" : "Project Table of Contents"}
          className="hidden xl:block w-[180px] 2xl:w-[210px] shrink-0 sticky top-28 z-20 select-none pt-16 pb-12"
        >
          <div className="flex flex-col items-end gap-2 max-h-[calc(100vh-8.5rem)] overflow-y-auto py-2 pr-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-semibold mb-1 pr-1">
              {lang === "RO" ? "INDEX" : "INDEX"}
            </span>
            {projects.map((p) => {
              const isActive = activeSlug === p.slug;
              return (
                <a
                  key={p.slug}
                  href={`#${p.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToProject(p.slug);
                  }}
                  className={`group flex items-center justify-end gap-2 text-right transition-all duration-200 py-0.5 ${
                    isActive
                      ? "text-black opacity-100 font-bold"
                      : "text-neutral-500 opacity-40 hover:opacity-90 hover:text-black font-medium"
                  }`}
                >
                  <span className="font-sans text-[11px] uppercase tracking-wider transition-colors duration-150 truncate max-w-[160px] 2xl:max-w-[180px]">
                    {p.title}
                  </span>
                  <span
                    className={`block h-px shrink-0 transition-all duration-200 ${
                      isActive
                        ? "w-4 bg-black"
                        : "w-1.5 bg-neutral-300 group-hover:w-2.5 group-hover:bg-neutral-600"
                    }`}
                  />
                </a>
              );
            })}
          </div>
        </aside>
      </div>

      <Footer />
    </div>
  );
}
