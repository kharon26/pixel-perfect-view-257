import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { CATEGORIES, PROJECTS, videoPoster, getCategoryLabel } from "@/data/projects";
import { useLanguage } from "@/context/LanguageContext";
import { Reveal } from "@/components/Reveal";

function MainGridCard({
  project: p,
  index: i,
  lang,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
  lang: "RO" | "EN";
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shouldFetch, setShouldFetch] = useState(i < 2);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isIntersected, setIsIntersected] = useState(false);

  const imgSrc = p.cover.endsWith(".mp4") ? videoPoster(p.cover) : p.cover;

  // 1. Proximity observer (350px rootMargin) — only fetch image when card approaches viewport
  useEffect(() => {
    if (shouldFetch) return;

    const el = ref.current;
    if (!el) return;

    const proximityIo = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShouldFetch(true);
          proximityIo.disconnect();
        }
      },
      { rootMargin: "350px 0px 350px 0px", threshold: 0 }
    );

    proximityIo.observe(el);
    return () => proximityIo.disconnect();
  }, [shouldFetch]);

  // 2. Decode image ONCE shouldFetch is true
  useEffect(() => {
    if (!shouldFetch) return;

    let active = true;
    const img = new Image();
    img.src = imgSrc;

    const handleReady = () => {
      if (active) setIsLoaded(true);
    };

    if (img.complete) {
      handleReady();
    } else {
      img.onload = () => {
        if ("decode" in img) {
          img.decode().then(handleReady).catch(handleReady);
        } else {
          handleReady();
        }
      };
      img.onerror = handleReady;
    }

    return () => {
      active = false;
    };
  }, [shouldFetch, imgSrc]);

  // 3. Reveal observer (80px rootMargin) — tracks viewport entry/exit for scroll reveal
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const revealIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsIntersected(entry.isIntersecting);
        });
      },
      { rootMargin: "0px 0px 80px 0px", threshold: 0 }
    );

    revealIo.observe(el);
    return () => revealIo.disconnect();
  }, []);

  const isVisible = isLoaded && isIntersected;
  const delay = (i % 2) * 100;

  return (
    <div
      ref={ref}
      style={{ transitionDelay: isVisible ? `${delay}ms` : "0ms" }}
      className={`w-full main-grid-card-reveal ${
        isVisible ? "is-visible" : ""
      }`}
    >
      <Link to="/work/$slug" params={{ slug: p.slug }} className="group block">
        <div className="relative overflow-hidden bg-neutral-100 border border-border/30 aspect-[3/4] w-full flex items-center justify-center p-3 transition-colors duration-500 group-hover:border-black">
          {shouldFetch ? (
            <img
              src={imgSrc}
              alt={`${p.title} — ${p.category} cover`}
              loading={i < 2 ? "eager" : "lazy"}
              decoding="async"
              fetchPriority={i < 2 ? "high" : "auto"}
              className={`h-full w-full object-cover ${
                p.coverPosition ?? "object-center"
              } transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]`}
            />
          ) : (
            <div className="h-full w-full bg-neutral-100" />
          )}
          <span className="label absolute left-4 top-4 bg-white/90 px-2.5 py-1.5 text-foreground font-mono text-sm border border-border/30 font-bold z-10">
            {p.index}
          </span>
        </div>
        <div className="mt-5 flex items-baseline justify-between gap-3 border-t border-border pt-4 min-w-0">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-tight leading-snug text-foreground transition-colors group-hover:text-black min-w-0 break-words flex-1">
            {p.title}
          </h3>
          <span className="label shrink-0 text-muted-foreground font-mono text-xs md:text-sm font-semibold select-none ml-2">
            {p.year}
          </span>
        </div>
        <p className="label mt-1.5 text-muted-foreground font-medium text-xs tracking-wider block leading-relaxed break-words h-auto overflow-visible">
          {p.client} — {getCategoryLabel(p.category, lang)}
        </p>
      </Link>
    </div>
  );
}

export function Work() {
  const [filter, setFilter] = useState<string>("Toate");
  const { lang } = useLanguage();

  const items = useMemo(
    () =>
      filter === "Toate"
        ? PROJECTS
        : PROJECTS.filter((p) =>
            Array.isArray(p.category) ? p.category.includes(filter) : p.category === filter,
          ),
    [filter],
  );

  return (
    <section id="work" className="scroll-mt-24 border-t border-border py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <Reveal>
          <div className="flex flex-col items-center text-center gap-2.5 md:flex-row md:items-end md:justify-between md:text-left md:gap-4">
            <div className="flex flex-col items-center md:items-start">
              <p className="label text-accent font-semibold tracking-widest mb-1 md:mb-2 text-center md:text-left">
                {lang === "RO" ? "Portofoliu" : "Portfolio"}
              </p>
              <h2 className="display text-[clamp(2.5rem,8vw,7rem)] text-center md:text-left">
                {lang === "RO" ? "Proiecte" : "Projects"}
              </h2>
            </div>
            <span className="label text-muted-foreground text-center md:text-right">
              {PROJECTS.length} {lang === "RO" ? "Proiecte" : "Projects"}
            </span>
          </div>
        </Reveal>

        {/* Persistent filter bar */}
        <div className="sticky top-[68px] z-30 -mx-6 mt-10 border-y border-border bg-background/95 px-6 py-4 backdrop-blur-md md:-mx-10 md:px-10">
          <ul className="flex snap-x gap-6 overflow-x-auto md:gap-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {(["Toate", ...CATEGORIES] as const).map((c) => (
              <li key={c} className="shrink-0 snap-start">
                <button
                  onClick={() => setFilter(c)}
                  className={`text-xs md:text-sm font-semibold tracking-wider uppercase whitespace-nowrap transition-colors ${
                    filter === c
                      ? "text-black border-b-2 border-black pb-1 font-bold"
                      : "text-neutral-700 hover:text-black"
                  }`}
                >
                  {getCategoryLabel(c, lang)}
                  <sup className="ml-1.5 font-mono text-[10px] text-neutral-800">
                    {c === "Toate"
                      ? PROJECTS.length
                      : PROJECTS.filter((p) =>
                          Array.isArray(p.category) ? p.category.includes(c) : p.category === c,
                        ).length}
                  </sup>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick index — scan all 16 projects with editorial tabular alignment & centered mobile 2-column grid */}
        <Reveal>
          <ul className="mx-auto mt-8 grid w-full max-w-[340px] grid-cols-2 gap-x-4 gap-y-3.5 border-b border-border pb-8 sm:max-w-none sm:grid-cols-3 sm:gap-x-8 md:grid-cols-4 h-auto overflow-visible">
            {PROJECTS.map((p) => (
              <li key={p.slug} className="min-w-0 flex items-start">
                <Link
                  to="/work/$slug"
                  params={{ slug: p.slug }}
                  className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-black hover:text-neutral-600 transition-colors flex items-baseline gap-2 min-w-0 w-full"
                >
                  <span className="font-mono text-neutral-400 text-[10px] sm:text-xs shrink-0 select-none w-5 text-left font-medium">
                    {p.index}
                  </span>
                  <span className="break-words min-w-0 flex-1 leading-snug font-medium">
                    {p.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Portfolio grid — pre-decoded images with decoupled scroll reveal */}
        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-2 md:gap-x-12 md:gap-y-20">
          {items.map((p, i) => (
            <MainGridCard key={p.slug} project={p} index={i} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}