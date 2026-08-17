import { useEffect, useMemo } from "react";
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

    // Preload the hero image so the browser fetches it before React mounts
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
        ? [{ rel: "preload", href: heroSrc, as: "image" }]
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

  // Reset scroll to top whenever changing project pages
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
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
        {/* Hero — interactive landscape image background */}
        <div className="relative w-full h-[85vh] md:h-[90vh] min-h-[520px] flex flex-col justify-end overflow-hidden bg-black">
          {/* Media Fundal - direct fără chenare sau filtre active pe scroll */}
          <img
            src={
              (project.heroLandscape || project.cover).endsWith(".mp4")
                ? videoPoster(project.heroLandscape || project.cover)
                : (project.heroLandscape || project.cover)
            }
            alt={project.title}
            loading="eager"
            decoding="sync"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
            style={{
              objectPosition: project.heroPosition || "center center",
              transform: "translateZ(0)",
            }}
          />

          {/* Gradient fin curat strict peste bază (fără backdrop-filter) */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10" />

          {/* Container Text */}
          <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pb-16 md:pb-24 pt-32 pointer-events-auto">
            <Link to="/" className="label link-underline text-neutral-700 hover:text-black font-semibold transition-colors inline-block mb-4">
              {lang === "RO" ? "← Înapoi la portofoliu" : "← Back to portfolio"}
            </Link>
            <p className="label text-neutral-800 font-bold mb-2 text-xs uppercase tracking-widest">
              {project.index} — {activeCategory}
            </p>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight text-black uppercase">
              {project.title}
            </h1>
          </div>
        </div>

        <section className="bg-background mx-auto grid max-w-[1600px] grid-cols-1 gap-12 px-6 py-20 md:grid-cols-12 md:px-10 md:py-28">
          <Reveal once className="md:col-span-4">
            <dl className="space-y-6">
              {[
                [lang === "RO" ? "Client" : "Client", project.client],
                [lang === "RO" ? "An" : "Year", project.year],
                [lang === "RO" ? "Categorie" : "Category", activeCategory],
              ].map(([k, v]) => (
                <div key={k} className="border-t border-border pt-3">
                  <dt className="label text-muted-foreground">{k}</dt>
                  <dd className="mt-2 text-sm font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal once className="md:col-span-7 md:col-start-6" delay={100}>
            <p className="text-lg leading-relaxed text-neutral-600 md:text-2xl md:leading-relaxed font-normal">
              {activeNarrative}
            </p>
            <div className="mt-10">
              <button
                onClick={handleContactClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-neutral-400/80 bg-neutral-100 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 text-black px-6 py-3.5 text-xs font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer active:scale-95 text-center shadow-xs"
              >
                {lang === "RO" ? "Discută despre un proiect similar →" : "Discuss a similar project →"}
              </button>
            </div>
          </Reveal>
        </section>

        {/* Gallery — grouped media flow (videos sequentially together, followed by photo series) */}
        <section className="mx-auto max-w-[1180px] px-6 pb-24 md:px-10 md:pb-36">
          <div className="flex flex-col items-center gap-14 md:gap-24">
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

        <section className="border-t border-border">
          <Link
            to="/work/$slug"
            params={{ slug: safeNext.slug }}
            className="group mx-auto flex max-w-[1600px] flex-col gap-2 px-6 py-16 md:px-10 md:py-24"
          >
            <span className="label text-muted-foreground">
              {lang === "RO" ? "Următorul proiect —" : "Next project —"} {safeNext.index}
            </span>
            <span className="display text-[clamp(2.25rem,8vw,7rem)] transition-colors group-hover:text-accent">
              {safeNext.title}
            </span>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}