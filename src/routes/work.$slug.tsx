import { useEffect, useLayoutEffect, useMemo } from "react";
import { createFileRoute, Link, useNavigate, notFound } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { LazyVideo } from "@/components/LazyVideo";
import { getProject, nextProject, getCategoryLabel, getRoleLabel, videoPoster } from "@/lib/project-utils";
import { useLanguage } from "@/context/LanguageContext";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project, next: nextProject(params.slug) };
  },
  head: ({ loaderData }) => {
    const title = loaderData
      ? `${loaderData.project.title} — ${loaderData.project.client} | George Roșu`
      : "Case study | George Roșu";
    const description = loaderData
      ? `${loaderData.project.category} case study for ${loaderData.project.client}, ${loaderData.project.year}. Commercial photography and motion by George Roșu.`
      : "Commercial photography and motion case study by George Roșu.";

    const heroSrc = loaderData
      ? (loaderData.project.heroLandscape || loaderData.project.cover).endsWith(".mp4")
        ? videoPoster(loaderData.project.heroLandscape || loaderData.project.cover)
        : (loaderData.project.heroLandscape || loaderData.project.cover)
      : undefined;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: heroSrc
        ? [{ rel: "preload", href: heroSrc, as: "image", fetchpriority: "high" as any }]
        : [],
    };
  },
  component: CaseStudy,
});

function CaseStudy() {
  const { project, next } = Route.useLoaderData();
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const safeNext = next || getProject("99beauty")!;

  // Synchronous before-paint reset to guarantee top start
  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [project.slug]);

  // Smooth scroll sync after route transition mounts (50ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, 50);

    return () => clearTimeout(timer);
  }, [project.slug]);

  const activeNarrative = lang === "RO" ? project.narrative : (project.narrativeEn || project.narrative);
  const activeCategory = getCategoryLabel(project.category, lang);
  const activeRole = getRoleLabel(project.role, lang);

  const { photos, sortedGallery } = useMemo(() => {
    const p = project.gallery.filter((src: string) => !src.endsWith(".mp4"));
    const v = project.gallery.filter((src: string) => src.endsWith(".mp4"));
    return { photos: p, sortedGallery: [...v, ...p] };
  }, [project.gallery]);

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate({ to: "/", hash: "contact" }).then(() => {
      setTimeout(() => {
        const el = document.getElementById("contact");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main id="top">
        {/* Hero — perfectly proportioned 60-65vh container preventing excessive crop */}
        <div className="relative w-full h-[45vh] min-h-[300px] md:h-[60vh] md:min-h-[500px] flex flex-col justify-end overflow-hidden bg-background">
          {/* Media Fundal */}
          <img
            src={
              (project.heroLandscape || project.cover).endsWith(".mp4")
                ? videoPoster(project.heroLandscape || project.cover)
                : (project.heroLandscape || project.cover)
            }
            alt={project.title}
            loading="eager"
            decoding="sync"
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none [object-position:var(--hero-pos-mob)] md:[object-position:var(--hero-pos)]"
            style={{
              ["--hero-pos" as any]: project.heroPosition || "center center",
              ["--hero-pos-mob" as any]: project.heroPositionMobile || project.heroPosition || "center center",
              transform: "translateZ(0)",
            }}
          />

          {/* Gradient fin curat strict peste bază */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background via-background/85 to-transparent pointer-events-none z-10" />

          {/* Container Text cu animație de reveal */}
          <div className="relative z-20 w-full max-w-[1600px] mx-auto px-4 md:px-10 pb-6 md:pb-16 pt-12 md:pt-28 pointer-events-auto">
            <Reveal once delay={60}>
              <Link to="/" className="label link-underline text-neutral-900 hover:text-black font-bold transition-colors inline-block text-sm mb-3 md:mb-4">
                {lang === "RO" ? "← Înapoi la portofoliu" : "← Back to portfolio"}
              </Link>
            </Reveal>
            <Reveal once delay={100}>
              <p className="label text-neutral-900 font-semibold mb-2 md:mb-3 text-sm tracking-wider uppercase">
                {project.index} — {activeCategory}
              </p>
            </Reveal>
            <Reveal once delay={150}>
              <h1 className="text-4xl sm:text-5xl md:text-[clamp(2.5rem,6vw,5.5rem)] font-black tracking-tight text-black uppercase leading-tight mb-2 md:mb-3">
                {project.title}
              </h1>
            </Reveal>
          </div>
        </div>

        {/* Project details & narrative */}
        <section className="bg-background mx-auto grid max-w-[1600px] grid-cols-1 gap-6 px-4 pt-6 pb-14 md:grid-cols-12 md:gap-12 md:px-10 md:py-28">
          <Reveal once className="md:col-span-4" delay={60}>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-3 md:block md:space-y-6">
              {[
                [lang === "RO" ? "Client" : "Client", project.client, "col-span-1"],
                [lang === "RO" ? "An" : "Year", project.year, "col-span-1"],
                [lang === "RO" ? "Categorie" : "Category", activeCategory, "col-span-2 md:col-span-1"],
              ].map(([k, v, spanClass]) => (
                <div key={k} className={`border-t border-border pt-2.5 md:pt-4 pb-1 ${spanClass}`}>
                  <dt className="label text-muted-foreground text-xs uppercase tracking-wider font-semibold">{k}</dt>
                  <dd className="mt-1 md:mt-2 text-sm font-medium text-foreground truncate">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal once className="md:col-span-7 md:col-start-6 mt-1 md:mt-0" delay={120}>
            <p className="text-base leading-relaxed text-neutral-700 md:text-2xl md:leading-relaxed font-normal max-w-full overflow-visible">
              {activeNarrative}
            </p>
            <div className="mt-6 md:mt-10">
              <button
                onClick={handleContactClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-neutral-400/80 bg-neutral-100 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 text-black px-6 py-3.5 text-sm font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer active:scale-98 text-center shadow-xs"
              >
                {lang === "RO" ? "Discută despre un proiect similar →" : "Discuss a similar project →"}
              </button>
            </div>
          </Reveal>
        </section>

        {/* Gallery — grouped media flow with staggered entrance reveal */}
        <section className="bg-background mx-auto max-w-[1180px] px-4 pb-20 md:px-10 md:pb-36">
          <div className="flex flex-col items-center gap-16 md:gap-24">
            {sortedGallery.map((src: string, i: number) => {
              const isVideo = src.endsWith(".mp4");

              return (
                <Reveal
                  key={i}
                  once
                  delay={(i % 2) * 60}
                  className="w-full flex justify-center"
                >
                  <div className="w-full max-w-5xl flex justify-center bg-transparent relative overflow-hidden">
                    {isVideo ? (
                      <LazyVideo
                        src={src}
                        poster={videoPoster(src)}
                        controls
                        className="w-auto max-w-full h-auto max-h-[88vh] rounded-none shadow-sm"
                      />
                    ) : (
                      <img
                        src={src}
                        alt={`${project.title} — ${getRoleLabel(project.role, lang)} photo ${i + 1}`}
                        loading={i < 2 ? "eager" : "lazy"}
                        decoding="async"
                        fetchPriority={i < 1 ? "high" : "auto"}
                        className="w-auto max-w-full h-auto max-h-[88vh] rounded-none shadow-sm block transition-opacity duration-300"
                      />
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Next project teaser with high contrast & smooth hover */}
        <section className="border-t border-border bg-neutral-50/50 hover:bg-neutral-100/60 transition-colors duration-300">
          <Reveal once delay={60} className="w-full">
            <Link
              to="/work/$slug"
              params={{ slug: safeNext.slug }}
              resetScroll={true}
              className="group mx-auto flex max-w-[1600px] flex-col gap-3 px-4 py-14 md:px-10 md:py-24"
            >
              <div className="flex items-center gap-2 text-neutral-600 group-hover:text-black transition-colors">
                <span className="font-mono text-xs md:text-sm font-bold uppercase tracking-widest">
                  {lang === "RO" ? "Următorul proiect —" : "Next project —"} {safeNext.index}
                </span>
                <span className="text-sm transition-transform duration-300 group-hover:translate-x-1.5">→</span>
              </div>
              <span className="text-[clamp(2.25rem,6vw,5.5rem)] font-black uppercase tracking-tight text-black leading-tight group-hover:text-neutral-700 transition-colors">
                {safeNext.title}
              </span>
              <p className="text-xs md:text-sm font-medium text-neutral-500 group-hover:text-neutral-800 transition-colors">
                {safeNext.client} — {getCategoryLabel(safeNext.category, lang)}
              </p>
            </Link>
          </Reveal>
        </section>
      </main>
      <Footer />
    </div>
  );
}
