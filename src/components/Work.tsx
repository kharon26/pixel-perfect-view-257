import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CATEGORIES, PROJECTS, type Category } from "@/data/projects";
import { Reveal } from "@/components/Reveal";

// Asymmetric rhythm: alternating wide/tall tiles with offset columns.
const LAYOUT = [
  { span: "md:col-span-7", aspect: "aspect-[16/10]", offset: "" },
  { span: "md:col-span-5", aspect: "aspect-[4/5]", offset: "md:mt-28" },
  { span: "md:col-span-5", aspect: "aspect-[4/5]", offset: "" },
  { span: "md:col-span-7", aspect: "aspect-[16/11]", offset: "md:mt-20" },
  { span: "md:col-span-6", aspect: "aspect-[3/2]", offset: "" },
  { span: "md:col-span-6", aspect: "aspect-[3/2]", offset: "md:mt-16" },
];

export function Work() {
  const [filter, setFilter] = useState<Category | "All">("All");
  const items = useMemo(
    () => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <section id="work" className="scroll-mt-24 border-t border-border py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <Reveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="display text-[clamp(2.5rem,8vw,7rem)]">Selected Work</h2>
            <span className="label text-muted-foreground">16 Projects</span>
          </div>
        </Reveal>

        {/* Persistent filter bar */}
        <div className="sticky top-[68px] z-30 -mx-6 mt-10 border-y border-border bg-background/90 px-6 py-3 backdrop-blur-md md:-mx-10 md:px-10">
          <ul className="flex snap-x gap-6 overflow-x-auto md:gap-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {(["All", ...CATEGORIES] as const).map((c) => (
              <li key={c} className="shrink-0 snap-start">
                <button
                  onClick={() => setFilter(c)}
                  className={`label whitespace-nowrap transition-colors ${
                    filter === c ? "text-accent" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c}
                  <sup className="ml-1 tracking-normal">
                    {c === "All" ? PROJECTS.length : PROJECTS.filter((p) => p.category === c).length}
                  </sup>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick index — scan all 16 and jump straight to one */}
        <Reveal>
          <ul className="mt-6 grid grid-cols-4 gap-x-6 gap-y-2 border-b border-border pb-6 sm:grid-cols-6 lg:grid-cols-8">
            {PROJECTS.map((p) => (
              <li key={p.slug}>
                <Link
                  to="/work/$slug"
                  params={{ slug: p.slug }}
                  className="label block truncate text-muted-foreground transition-colors hover:text-accent"
                >
                  {p.index} {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-12">
          {items.map((p, i) => {
            const l = LAYOUT[i % LAYOUT.length]!;
            return (
            <Reveal key={p.slug} delay={(i % 2) * 90} className={`${l.span} ${l.offset}`}>
              <Link to="/work/$slug" params={{ slug: p.slug }} className="group block">
                <div className={`relative overflow-hidden bg-secondary ${l.aspect}`}>
                  <img
                    src={p.cover}
                    alt={`${p.title} — ${p.category} placeholder cover`}
                    loading="lazy"
                    className="h-full w-full object-cover opacity-85 transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] group-hover:opacity-100"
                  />
                  <span className="label absolute left-4 top-4 text-foreground/70">{p.index}</span>
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-border pt-3">
                  <h3 className="text-lg font-bold uppercase tracking-tight transition-colors group-hover:text-accent md:text-2xl">
                    {p.title}
                  </h3>
                  <span className="label shrink-0 text-muted-foreground">{p.year}</span>
                </div>
                <p className="label mt-1 text-muted-foreground">
                  {p.client} — {p.category}
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