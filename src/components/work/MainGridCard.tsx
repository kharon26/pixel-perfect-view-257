import React, { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import type { Project } from "@/types/project";
import { getCategoryLabel, videoPoster } from "@/lib/project-utils";

type MainGridCardProps = {
  project: Project;
  index: number;
  lang: "RO" | "EN";
};

export const MainGridCard = React.memo(function MainGridCard({
  project: p,
  index: i,
  lang,
}: MainGridCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shouldFetch, setShouldFetch] = useState(i < 2);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isIntersected, setIsIntersected] = useState(false);

  const imgSrc = p.cover.endsWith(".mp4") ? videoPoster(p.cover) : p.cover;
  const imgSrc1200wNatural = imgSrc.replace(/\.(webp|jpg|jpeg|png)$/i, "-1200w-natural.webp");
  const srcSet = `${imgSrc1200wNatural} 1200w, ${imgSrc} 3200w`;
  const sizes = "(max-width: 768px) 100vw, 50vw";

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
    img.src = imgSrc1200wNatural;

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
  }, [shouldFetch, imgSrc1200wNatural]);

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

  const isVisible = isIntersected;
  const delay = (i % 2) * 100;

  return (
    <div
      ref={ref}
      style={{ transitionDelay: isVisible ? `${delay}ms` : "0ms" }}
      className={`w-full main-grid-card-reveal ${
        isVisible ? "is-visible" : ""
      }`}
    >
      <Link to="/work/$slug" params={{ slug: p.slug }} preload="intent" className="group block">
        <div className="relative overflow-hidden bg-neutral-100 border border-border/30 aspect-[3/4] w-full flex items-center justify-center p-3 transition-colors duration-500 group-hover:border-black">
          {shouldFetch ? (
            <img
              src={imgSrc1200wNatural}
              srcSet={srcSet}
              sizes={sizes}
              alt={`${p.title} — ${p.category} cover`}
              loading={i < 2 ? "eager" : "lazy"}
              decoding="async"
              fetchPriority={i < 2 ? "high" : "auto"}
              className={`h-full w-full object-cover ${
                p.coverPosition ?? "object-center"
              } gpu-photo-layer transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
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
});
