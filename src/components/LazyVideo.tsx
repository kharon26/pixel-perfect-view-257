import { useState, useEffect, useRef, useCallback } from "react";

type LazyVideoProps = {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  controls?: boolean;
};

/**
 * Lazy-loaded video with poster-first strategy.
 *
 * Gallery mode (controls=true):
 *   Shows poster image + play button overlay. Video loads only on click.
 *
 * Cover mode (autoPlay, no controls):
 *   Uses IntersectionObserver to mount <video> when near viewport,
 *   but with preload="none" + poster so no bytes are fetched early.
 */
export function LazyVideo({
  src,
  poster,
  className = "",
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  controls = false,
}: LazyVideoProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Gallery mode: click-to-play
  if (controls) {
    return <ClickToPlayVideo src={src} poster={poster} className={className} />;
  }

  // Cover mode: IntersectionObserver lazy mount
  return (
    <CoverVideo
      containerRef={containerRef}
      videoRef={videoRef}
      src={src}
      poster={poster}
      className={className}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
    />
  );
}

/* ── Click-to-play (gallery videos) ─────────────────────── */

function ClickToPlayVideo({
  src,
  poster,
  className,
}: {
  src: string;
  poster?: string | undefined;
  className: string;
}) {
  const [playing, setPlaying] = useState(false);
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Only render poster once near viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handlePlay = useCallback(() => setPlaying(true), []);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden flex items-center justify-center max-w-full"
    >
      {playing ? (
        <video
          src={src}
          controls
          autoPlay
          playsInline
          preload="auto"
          poster={poster}
          className={`w-auto max-w-full h-auto ${className}`}
        />
      ) : inView ? (
        <button
          type="button"
          onClick={handlePlay}
          aria-label="Redă video"
          className="relative max-w-full cursor-pointer group focus:outline-none flex justify-center"
        >
          {poster ? (
            <img
              src={poster}
              alt=""
              loading="lazy"
              decoding="async"
              className={`w-auto max-w-full h-auto ${className}`}
            />
          ) : (
            <div className="aspect-video w-full max-w-4xl bg-neutral-900/60" />
          )}
          {/* Play button overlay */}
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-sm border border-white/20 transition-transform duration-200 group-hover:scale-110 shadow-2xl">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-7 w-7 md:h-8 md:w-8 ml-0.5"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
        </button>
      ) : (
        <div className="aspect-video w-full max-w-4xl bg-neutral-900/60" />
      )}
    </div>
  );
}

/* ── Cover video (autoplay muted loop) ──────────────────── */

function CoverVideo({
  containerRef,
  videoRef,
  src,
  poster,
  className,
  autoPlay,
  loop,
  muted,
  playsInline,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  src: string;
  poster?: string | undefined;
  className: string;
  autoPlay: boolean;
  loop: boolean;
  muted: boolean;
  playsInline: boolean;
}) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [containerRef]);

  // Pause video when scrolled out of view to save CPU/GPU resources
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !inView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.05, rootMargin: "100px 0px" },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [inView, videoRef]);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden w-full flex items-center justify-center bg-neutral-950/40"
    >
      {inView ? (
        <video
          ref={videoRef}
          src={src}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          preload="none"
          poster={poster}
          className={`w-full h-auto object-contain transform-gpu ${className}`}
        />
      ) : poster ? (
        <img
          src={poster}
          alt=""
          loading="lazy"
          decoding="async"
          className={`w-full h-auto object-contain ${className}`}
        />
      ) : (
        <div className="aspect-video w-full bg-neutral-950/40" />
      )}
    </div>
  );
}
