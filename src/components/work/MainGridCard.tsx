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
  const [shouldFetch, setShouldFetch] = useState(i < 4);
  const [isLoaded, setIsLoaded] = useState(false);

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
      img.onerror = () => {
        const fallbackImg = new Image();
        fallbackImg.src = imgSrc;
        fallbackImg.onload = handleReady;
        fallbackImg.onerror = handleReady;
      };
    }

    return () => {
      active = false;
    };
  }, [shouldFetch, imgSrc1200wNatural, imgSrc]);

  // 3. Continuous reveal observer — zero React re-render, direct GPU CSS variable updates via rAF
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Initialize progress for top visible cards
    if (i < 2) {
      el.style.setProperty("--reveal-progress", "1");
    }

    const revealIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          requestAnimationFrame(() => {
            const targetEl = ref.current;
            if (!targetEl) return;
            if (entry.isIntersecting) {
              targetEl.style.setProperty("--reveal-progress", "1");
            } else {
              targetEl.style.setProperty("--reveal-progress", "0");
            }
          });
        });
      },
      { rootMargin: "0px 0px -30px 0px", threshold: [0, 0.15] }
    );

    revealIo.observe(el);
    return () => revealIo.disconnect();
  }, [i]);

  // Stagger calculation: index-based (index * 60ms on desktop in 2-col pairs, max 30ms on mobile)
  const desktopDelay = (i % 2) * 60;
  const mobileDelay = Math.min(30, (i % 2) * 25);

  return (
    <div
      ref={ref}
      style={{
        ["--stagger-delay" as any]: `${desktopDelay}ms`,
        ["--stagger-delay-mobile" as any]: `${mobileDelay}ms`,
        ...(i < 2 ? { ["--reveal-progress" as any]: "1" } : {}),
      }}
      className="w-full main-grid-card-reveal"
    >
      <Link to="/work/$slug" params={{ slug: p.slug }} resetScroll={true} preload="intent" className="group block">
        <div className="main-grid-card-interactive relative overflow-hidden bg-neutral-100 border border-border/30 aspect-[3/4] w-full flex items-center justify-center p-3 transition-colors duration-500 group-hover:border-black">
          {shouldFetch ? (
            <img
              src={imgSrc1200wNatural}
              srcSet={srcSet}
              sizes={sizes}
              alt={`${p.title} — ${p.client} | ${getCategoryLabel(p.category, lang)} fotograf Galați ${p.year}`}
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
