import { Link } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { CATEGORIES, PROJECTS } from "@/data/projects";
import { useLanguage } from "@/context/LanguageContext";
import { Reveal } from "@/components/Reveal";

export function Work() {
  const [filter, setFilter] = useState<string>("Toate");
  const { lang } = useLanguage();

  // Preload all 16 portfolio cover images into browser cache instantly upon mount
  useEffect(() => {
    PROJECTS.forEach((p) => {
      if (!p.cover.endsWith(".mp4")) {
        const img = new Image();
        img.src = p.cover;
      }
    });
  }, []);

  const items = useMemo(
    () => (filter === "Toate" ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter],
  );

  const getCategoryLabel = (cat: string) => {
    if (lang === "RO") return cat;
    switch (cat) {
      case "Toate": return "All";
      case "Auto": return "Auto";
      case "Auto & Comercial": return "Auto & Commercial";
      case "Comercial": return "Commercial";
      case "Comercial / Clinică": return "Commercial / Medical";
      case "Comercial / Produs": return "Commercial / Product";
      case "Fotografie de produs": return "Product Photography";
      case "Mâncare & Comercial": return "Food & Commercial";
      default: return cat;
    }
  };

  return (
    <section id="work" className="scroll-mt-24 border-t border-border py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <Reveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="label text-accent font-semibold tracking-widest mb-2">
                {lang === "RO" ? "Portofoliu" : "Portfolio"}
              </p>
              <h2 className="display text-[clamp(2.5rem,8vw,7rem)]">
                {lang === "RO" ? "Proiecte" : "Projects"}
              </h2>
            </div>
            <span className="label text-muted-foreground">
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
                  {getCategoryLabel(c)}
                  <sup className="ml-1.5 font-mono text-[10px] text-neutral-800">
                    {c === "Toate" ? PROJECTS.length : PROJECTS.filter((p) => (p.category as string) === c).length}
                  </sup>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick index — scan all 16 projects with full names visible */}
        <Reveal>
          <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3.5 border-b border-border pb-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
            {PROJECTS.map((p) => (
              <li key={p.slug}>
                <Link
                  to="/work/$slug"
                  params={{ slug: p.slug }}
                  className="text-xs font-semibold tracking-wider uppercase text-black hover:text-neutral-600 transition-colors whitespace-nowrap"
                >
                  <span className="font-mono text-neutral-500 mr-2">{p.index}</span>
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Portfolio grid — preloaded images with silky smooth staggered fade reveal */}
        <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-20 sm:grid-cols-2 lg:grid-cols-2">
          {items.map((p, i) => {
            const isVideoCover = p.cover.endsWith(".mp4");
            return (
              <Reveal key={p.slug} delay={(i % 2) * 120} className="w-full">
                <Link to="/work/$slug" params={{ slug: p.slug }} className="group block">
                  <div className="relative overflow-hidden bg-neutral-100 border border-border/30 aspect-[3/4] w-full flex items-center justify-center p-3 transition-all duration-500 group-hover:border-black transform-gpu">
                    {isVideoCover ? (
                      <video
                        src={p.cover}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        className="h-full w-full object-cover transform-gpu transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                      />
                    ) : (
                      <img
                        src={p.cover}
                        alt={`${p.title} — ${p.category} cover`}
                        loading="eager"
                        decoding="async"
                        className="h-full w-full object-cover transform-gpu transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                      />
                    )}
                    <span className="label absolute left-4 top-4 bg-white/90 px-2.5 py-1.5 text-foreground font-mono text-sm border border-border/30 font-bold z-10">
                      {p.index}
                    </span>
                  </div>
                  <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-border pt-4">
                    <h3 className="text-2xl font-bold uppercase tracking-tight transition-colors group-hover:text-black md:text-3xl">
                      {p.title}
                    </h3>
                    <span className="label shrink-0 text-muted-foreground font-mono text-sm">{p.year}</span>
                  </div>
                  <p className="label mt-1 text-muted-foreground font-medium text-xs">
                    {p.client} — {getCategoryLabel(p.category)}
                  </p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}