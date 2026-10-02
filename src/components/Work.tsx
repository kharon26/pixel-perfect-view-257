import { useMemo } from "react";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { PROJECTS } from "@/data/projects";
import { useLanguage } from "@/context/LanguageContext";
import { Reveal } from "@/components/Reveal";
import { MainGridCard } from "@/components/work/MainGridCard";
import { WorkFilterBar } from "@/components/work/WorkFilterBar";
import { WorkQuickIndex } from "@/components/work/WorkQuickIndex";

export function Work() {
  const { lang } = useLanguage();
  const search = useSearch({ strict: false }) as { category?: string };
  const navigate = useNavigate();

  const filter = search.category || "Toate";

  const setFilter = (c: string) => {
    navigate({
      to: ".",
      search: (prev: any) => ({
        ...prev,
        category: c === "Toate" ? undefined : c,
      }),
      replace: true,
      resetScroll: false,
    });
  };

  const items = useMemo(
    () =>
      filter === "Toate"
        ? PROJECTS
        : PROJECTS.filter((p) =>
            Array.isArray(p.category) ? (p.category as string[]).includes(filter) : p.category === filter,
          ),
    [filter],
  );

  return (
    <section id="work" className="scroll-mt-24 pt-10 pb-20 md:pt-16 md:pb-36 bg-white text-black">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <Reveal>
          <div className="flex flex-col items-center text-center gap-2.5 md:flex-row md:items-end md:justify-between md:text-left md:gap-4">
            <div className="flex flex-col items-center md:items-start">
              <p className="label text-neutral-900 font-bold uppercase tracking-widest mb-1 md:mb-2 text-center md:text-left">
                {lang === "RO" ? "Portofoliu" : "Portfolio"}
              </p>
              <h2 className="display text-[clamp(2.5rem,6vw,5.5rem)] text-center md:text-left">
                {lang === "RO" ? "Proiecte" : "Projects"}
              </h2>
            </div>
            <div className="flex flex-col items-center md:items-end gap-1.5">
              <span className="label text-muted-foreground text-center md:text-right">
                {PROJECTS.length} {lang === "RO" ? "Proiecte" : "Projects"}
              </span>
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider mt-0.5">
                <Link
                  to="/photo"
                  className="text-neutral-600 hover:text-black hover:underline underline-offset-4 transition-colors"
                >
                  {lang === "RO" ? "Foto (15) →" : "Photo (15) →"}
                </Link>
                <span className="text-neutral-300 select-none">·</span>
                <Link
                  to="/video"
                  className="text-neutral-600 hover:text-black hover:underline underline-offset-4 transition-colors"
                >
                  {lang === "RO" ? "Video (6) →" : "Video (6) →"}
                </Link>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Persistent filter bar */}
        <WorkFilterBar filter={filter} setFilter={setFilter} lang={lang} />

        {/* Quick index */}
        <WorkQuickIndex />

        {/* Portfolio grid — pre-decoded images with decoupled scroll reveal */}
        <div className="mt-8 md:mt-10 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-2 md:gap-x-12 md:gap-y-20">
          {items.map((p, i) => (
            <MainGridCard key={p.slug} project={p} index={i} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}
