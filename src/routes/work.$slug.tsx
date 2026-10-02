import { useEffect, useLayoutEffect, useMemo } from "react";
import { createFileRoute, Link, useNavigate, notFound } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { LazyVideo } from "@/components/LazyVideo";
import { getProject, nextProject, prevProject, getCategoryLabel, getRoleLabel, videoPoster, getMediaDimensions } from "@/lib/project-utils";
import { useLanguage } from "@/context/LanguageContext";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project, next: nextProject(params.slug), prev: prevProject(params.slug) };
  },
  head: ({ loaderData }) => {
    const project = loaderData?.project;
    const serviceMap: Record<string, string> = {
      "99beauty": "Fotografie de Produs & Cosmetică",
      "alex-macelarie": "Fotografie Comercială & Brand Culinar",
      "alex-restaurant": "Fotografie & Video Culinar",
      "bcracing-europe": "Automotive Photography & Content",
      "bmw-romania": "Automotive Photography & Track Content",
      "dentoart-clinic": "Fotografie Corporate & Medicală",
      "famous-chicken": "Fotografie & Video Culinar",
      "formula-xperience": "Automotive Video & Content",
      "harmonie-cafe": "Fotografie de Brand & Social Media",
      "mapet-tuning-airride": "Automotive Photography & Video",
      "mazda-romania": "Automotive Photography",
      "motorpark-romania": "Circuit Track & Motorsport Photography",
      "nespresso": "Reclamă Video de Produs",
      "raliw-forged-wheels": "Automotive Product Photography",
      "royal-pizza": "Fotografie Comercială & Brand Culinar",
      "toyota-braila": "Automotive Photography & Social Media",
    };

    const serviceTitle = project ? (serviceMap[project.slug] || project.role) : "Fotografie & Video Comercial";
    const title = project
      ? `${project.title} — ${serviceTitle} | George Roșu`
      : "Portofoliu Comercial | George Roșu";
    
    const description = project
      ? `Proiectul ${project.title} (${project.client}) — ${serviceTitle.toLowerCase()}. ${project.narrative.slice(0, 130).trim()}... George Roșu, Galați & România.`
      : "Proiect de fotografie și videografie comercială realizat de George Roșu.";

    const heroSrc = project
      ? (project.heroLandscape || project.cover).endsWith(".mp4")
        ? videoPoster(project.heroLandscape || project.cover)
        : (project.heroLandscape || project.cover)
      : undefined;

    const fullImageUrl = heroSrc
      ? (heroSrc.startsWith("http") ? heroSrc : `https://georgerosu.eu${heroSrc}`)
      : "https://georgerosu.eu/portfolio/motorpark-romania/BMW_74_-1200w.webp";

    const canonicalUrl = project ? `https://georgerosu.eu/work/${project.slug}` : "https://georgerosu.eu/";

    // Construct rich JSON-LD for project page: Breadcrumbs + VideoObject if video is present
    const videoAsset = project?.gallery.find((src: string) => src.endsWith(".mp4")) || (project?.video ? project.video : null);
    const videoUrl = videoAsset ? (videoAsset.startsWith("http") ? videoAsset : `https://georgerosu.eu${videoAsset}`) : null;

    const schemaGraph: any[] = [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Acasă", "item": "https://georgerosu.eu" },
          { "@type": "ListItem", "position": 2, "name": "Portofoliu", "item": "https://georgerosu.eu/#work" },
          { "@type": "ListItem", "position": 3, "name": project?.title || "Proiect", "item": canonicalUrl }
        ]
      },
      {
        "@type": "CreativeWork",
        "@id": `${canonicalUrl}#work`,
        "name": title,
        "headline": project ? `${project.title} — ${serviceTitle}` : title,
        "description": description,
        "image": fullImageUrl,
        "author": { "@type": "Person", "name": "George Roșu", "url": "https://georgerosu.eu" },
        "publisher": { "@type": "Organization", "name": "George Roșu", "url": "https://georgerosu.eu" },
        "genre": project?.category || "Commercial Photography"
      }
    ];

    if (videoUrl && project) {
      schemaGraph.push({
        "@type": "VideoObject",
        "@id": `${canonicalUrl}#video`,
        "name": `${project.title} — ${serviceTitle}`,
        "description": project.narrative,
        "thumbnailUrl": fullImageUrl,
        "uploadDate": "2026-01-15T00:00:00+02:00",
        "contentUrl": videoUrl
      });
    }

    const jsonLdString = JSON.stringify({ "@context": "https://schema.org", "@graph": schemaGraph });

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: canonicalUrl },
        { property: "og:image", content: fullImageUrl },
        { property: "og:site_name", content: "George Roșu" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: fullImageUrl },
      ],
      links: [
        { rel: "canonical", href: canonicalUrl },
        ...(heroSrc
          ? [{ rel: "preload", href: heroSrc, as: "image", fetchPriority: "high" as any }]
          : []),
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: jsonLdString,
        },
      ],
    };
  },
  component: CaseStudy,
});

function CaseStudy() {
  const { project, next, prev } = Route.useLoaderData();
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const safeNext = next || nextProject(project.slug);
  const safePrev = prev || prevProject(project.slug);

  // Synchronous before-paint reset to guarantee top start without secondary scrolling
  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
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
    navigate({ to: "/", hash: "contact" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main id="top">
        {/* Hero Media Container (h-[50vh] min-h-[350px] on mobile, h-[60vh] on desktop) */}
        <div className="relative w-full h-[50vh] min-h-[350px] md:h-[60vh] md:min-h-[500px] flex flex-col justify-end overflow-hidden bg-background">
          {/* Media Fundal */}
          <img
            src={
              (project.heroLandscape || project.cover).endsWith(".mp4")
                ? videoPoster(project.heroLandscape || project.cover)
                : (project.heroLandscape || project.cover)
            }
            alt={`${project.title} — ${getRoleLabel(project.role, lang)} pentru ${project.client}`}
            loading="eager"
            decoding="sync"
            fetchPriority="high"
            className={`hero-project-img absolute inset-0 w-full h-full object-cover pointer-events-none select-none ${
              project.slug === "99beauty" ? "object-[48%_50%] md:object-[48%_50%]" : ""
            }`}
            style={{
              objectPosition: project.heroPositionMobile || project.heroPosition || "center center",
              ["--hero-pos" as any]: project.heroPosition || "center center",
              ["--hero-pos-mob" as any]: project.heroPositionMobile || project.heroPosition || "center center",
              transform: "translateZ(0)",
            }}
          />

          {/* Clean white gradient overlay at bottom for black text readability */}
          <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-background via-background/75 to-transparent pointer-events-none z-10" />

          {/* Text Overlay at bottom with dark text */}
          <div className="relative z-20 w-full max-w-[1600px] mx-auto px-4 pb-6 pt-16 md:px-10 md:pb-16 md:pt-28 pointer-events-auto text-center md:text-left">
            <Reveal once delay={60}>
              <Link to="/" className="label link-underline text-neutral-900 hover:text-black font-bold transition-colors inline-block text-xs md:text-sm mb-2 md:mb-4">
                {lang === "RO" ? "← Înapoi la portofoliu" : "← Back to portfolio"}
              </Link>
            </Reveal>
            <Reveal once delay={100}>
              <p className="label text-neutral-800 font-semibold mb-1.5 md:mb-3 text-xs md:text-sm tracking-wider uppercase">
                <span>{project.index} — </span>
                <Link
                  to={
                    project.category === "Produs"
                      ? "/fotografie-produs-galati"
                      : project.category === "Culinar"
                      ? "/fotografie-culinara-galati"
                      : project.mediaTypes.includes("video")
                      ? "/videograf-comercial-galati"
                      : "/fotograf-comercial-galati"
                  }
                  className="hover:underline transition-all"
                  title={`Vezi serviciile de ${activeCategory} în Galați`}
                >
                  {activeCategory}
                </Link>
              </p>
            </Reveal>
            <Reveal once delay={150}>
              <h1 className="text-3xl md:text-[clamp(2.5rem,6vw,5.5rem)] font-black tracking-tight text-black uppercase leading-tight mt-5 md:mt-0 text-center md:text-left mx-auto md:mx-0">
                {project.title}
              </h1>
            </Reveal>
          </div>
        </div>

        {/* Project details & narrative section (pt-4 pb-8 gap-4 on mobile) */}
        <section className="bg-background mx-auto max-w-[1600px] px-4 pt-4 pb-8 md:px-10 md:py-28 flex flex-col items-center text-center md:grid md:grid-cols-12 md:gap-12 md:items-start md:text-left">
          {/* Metadata */}
          <Reveal once className="w-full md:col-span-4" delay={60}>
            <dl className="grid grid-cols-3 gap-2 sm:gap-4 w-full max-w-md mx-auto text-center py-2 md:block md:space-y-6 md:py-0 md:text-left md:max-w-none md:mx-0">
              {[
                [lang === "RO" ? "Client" : "Client", project.client],
                [lang === "RO" ? "An" : "Year", project.year],
                [lang === "RO" ? "Categorie" : "Category", activeCategory],
              ].map(([k, v]) => (
                <div key={k} className="pt-1 md:border-t md:border-border md:pt-4 pb-1 text-center md:text-left">
                  <dt className="label text-muted-foreground text-[10px] sm:text-xs uppercase tracking-wider font-semibold">{k}</dt>
                  <dd className="mt-1 md:mt-2 text-xs sm:text-sm font-medium text-foreground break-words whitespace-normal">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* Description narrative & CTA */}
          <Reveal once className="w-full max-w-prose mx-auto md:max-w-none md:mx-0 md:col-span-7 md:col-start-6 mt-4 md:mt-0" delay={120}>
            <p className="text-sm leading-relaxed text-neutral-700 md:text-2xl md:leading-relaxed font-normal text-justify hyphens-auto [word-break:break-word] break-words md:text-left md:hyphens-none overflow-visible">
              {activeNarrative}
            </p>
            <div className="mt-6 md:mt-10 flex justify-center md:justify-start">
              <button
                onClick={handleContactClick}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 md:px-5 md:py-2.5 min-h-[40px] md:min-h-[44px] text-xs sm:text-sm font-medium tracking-wider uppercase border border-neutral-300 hover:border-black bg-transparent hover:bg-black hover:text-white text-neutral-800 transition-colors duration-200 cursor-pointer active:scale-98 text-center"
              >
                {lang === "RO" ? "Discută despre un proiect similar →" : "Discuss a similar project →"}
              </button>
            </div>
          </Reveal>
        </section>

        {/* Gallery — grouped media flow with staggered entrance reveal */}
        <section className="bg-background mx-auto max-w-[1180px] px-4 pb-14 md:px-10 md:pb-36">
          <div className="flex flex-col items-center gap-16 md:gap-24">
            {sortedGallery.map((src: string, i: number) => {
              const isVideo = src.endsWith(".mp4");
              const dims = getMediaDimensions(src);

              return (
                <Reveal
                  key={i}
                  once
                  delay={(i % 2) * 60}
                  className="w-full flex justify-center"
                >
                  <div
                    className="w-full max-w-5xl flex justify-center bg-transparent relative overflow-hidden"
                    style={{
                      aspectRatio: dims ? `${dims.width} / ${dims.height}` : undefined,
                      maxHeight: "88vh",
                      width: dims
                        ? `min(100%, calc(88vh * ${dims.width / dims.height}))`
                        : "100%",
                    }}
                  >
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
                        alt={`${project.title} — ${getRoleLabel(project.role, lang)} (${project.client}) cadru ${i + 1}`}
                        loading={i < 2 ? "eager" : "lazy"}
                        decoding="async"
                        width={dims?.width}
                        height={dims?.height}
                        style={{
                          aspectRatio: dims ? `${dims.width} / ${dims.height}` : undefined,
                        }}
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

        {/* Previous & Next project navigation side-by-side on mobile and desktop */}
        <section className="border-t border-border bg-neutral-50/50">
          <div className="mx-auto max-w-[1600px] grid grid-cols-2 divide-x divide-border">
            {/* Previous Project Button */}
            <Reveal once delay={60} className="w-full h-full">
              <Link
                to="/work/$slug"
                params={{ slug: safePrev.slug }}
                resetScroll={true}
                className="group flex flex-col justify-between h-full gap-1.5 md:gap-3 p-4 sm:p-6 md:px-10 md:py-16 hover:bg-neutral-100/70 transition-colors duration-300 text-left min-h-[100px] md:min-h-[140px]"
              >
                <div className="flex items-center gap-1.5 md:gap-2 text-neutral-600 group-hover:text-black transition-colors">
                  <span className="text-xs md:text-sm transition-transform duration-300 group-hover:-translate-x-1.5">←</span>
                  <span className="font-mono text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-widest truncate">
                    {lang === "RO" ? "Anterior" : "Previous"}
                    <span className="hidden sm:inline"> — {safePrev.index}</span>
                  </span>
                </div>
                <span className="text-sm sm:text-base md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-black leading-tight group-hover:text-neutral-700 transition-colors truncate">
                  {safePrev.title}
                </span>
                <p className="text-[10px] sm:text-xs md:text-sm font-medium text-neutral-500 group-hover:text-neutral-800 transition-colors truncate">
                  {safePrev.client}
                </p>
              </Link>
            </Reveal>

            {/* Next Project Button */}
            <Reveal once delay={100} className="w-full h-full">
              <Link
                to="/work/$slug"
                params={{ slug: safeNext.slug }}
                resetScroll={true}
                className="group flex flex-col justify-between h-full gap-1.5 md:gap-3 p-4 sm:p-6 md:px-10 md:py-16 hover:bg-neutral-100/70 transition-colors duration-300 text-right items-end min-h-[100px] md:min-h-[140px]"
              >
                <div className="flex items-center gap-1.5 md:gap-2 text-neutral-600 group-hover:text-black transition-colors justify-end">
                  <span className="font-mono text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-widest truncate">
                    {lang === "RO" ? "Următor" : "Next"}
                    <span className="hidden sm:inline"> — {safeNext.index}</span>
                  </span>
                  <span className="text-xs md:text-sm transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                </div>
                <span className="text-sm sm:text-base md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-black leading-tight group-hover:text-neutral-700 transition-colors truncate">
                  {safeNext.title}
                </span>
                <p className="text-[10px] sm:text-xs md:text-sm font-medium text-neutral-500 group-hover:text-neutral-800 transition-colors truncate">
                  {safeNext.client}
                </p>
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
