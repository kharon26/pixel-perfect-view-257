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
    <>
      <Nav />
      <main id="top">
        {/* Hero — interactive landscape image background */}
        <section className="relative flex min-h-[75svh] items-end overflow-hidden bg-neutral-900 group">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={
                (project.heroLandscape || project.cover).endsWith(".mp4")
                  ? videoPoster(project.heroLandscape || project.cover)
                  : (project.heroLandscape || project.cover)
              }
              alt={`${project.title} case study cover`}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className={`h-full w-full object-cover opacity-85 transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 ${project.heroPosition ?? "object-center"}`}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          <div className="relative mx-auto w-full max-w-[1600px] px-6 pb-14 md:px-10 md:pb-20">
            <Link to="/" className="label link-underline text-muted-foreground hover:text-foreground font-medium">
              {lang === "RO" ? "← Înapoi la portofoliu" : "← Back to portfolio"}
            </Link>
            <p className="label mt-8 text-accent font-semibold">
              {project.index} — {activeCategory}
            </p>
            <h1 className="display mt-4 text-[clamp(2.5rem,10vw,9rem)]">{project.title}</h1>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 px-6 py-20 md:grid-cols-12 md:px-10 md:py-28">
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
                          alt={`${project.title} gallery item ${i + 1}`}
                          loading={i < 2 ? "eager" : "lazy"}
                          decoding="async"
                          fetchPriority={i < 1 ? "high" : "auto"}
                          className="w-auto max-w-full h-auto max-h-[88vh] rounded-none shadow-sm transition-opacity duration-300"
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
    </>
  );
}