import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

const DESKTOP_SLIDES = [
  { src: "/portfolio/beauty-editorial/99beauty__5_.webp", position: "center 45%" },
  { src: "/portfolio/alex-macelarie/P1010706-1.webp", position: "center 50%" },
  { src: "/portfolio/alex-restaurant/Alex-MICDEJUN-69.webp", position: "center 50%" },
  { src: "/portfolio/formula-xperience/P1068258_HDR2.webp", position: "center 45%" },
  { src: "/portfolio/motorpark-romania/BMW_74_.webp", position: "center 50%" },
];

const MOBILE_SLIDES = [
  { src: "/portfolio/alex-macelarie/P1010201-1.webp", position: "12% 35%" },
  { src: "/portfolio/alex-macelarie/P1010447-1.webp", position: "center 30%" },
  { src: "/portfolio/alex-restaurant/Alex-MICDEJUN-68.webp", position: "center 35%" },
  { src: "/portfolio/alex-restaurant/Grillhouse2-6.webp", position: "center 35%" },
  { src: "/portfolio/formula-xperience/P10685902.webp", position: "center 40%" },
  { src: "/portfolio/royal-pizza/royal__5_.webp", position: "center 30%" },
  { src: "/portfolio/dentoart-clinic/DentoArt-19.webp", position: "center 25%" },
];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const { lang } = useLanguage();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });

    let ticking = false;
    let lastScroll = -1;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sy = window.scrollY;
          // Stop updating state once scrolled past Hero (> 900px)
          if (sy <= 900 || lastScroll <= 900) {
            setScrollY(sy);
            lastScroll = sy;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const slides = isMobile ? MOBILE_SLIDES : DESKTOP_SLIDES;

  useEffect(() => {
    const nextIndex = (currentIndex + 1) % slides.length;
    if (slides[nextIndex]) {
      const img = new Image();
      img.src = slides[nextIndex].src;
    }
  }, [currentIndex, slides]);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isMobile, slides.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    resetTimer();
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    resetTimer();
  };

  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches && e.touches[0]) {
      touchStartX.current = e.touches[0].clientX;
      touchEndX.current = e.touches[0].clientX;
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches && e.touches[0]) {
      touchEndX.current = e.touches[0].clientX;
    }
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 30) handleNext();
    else if (distance < -30) handlePrev();
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Parallax Scroll Reveal Math
  const bgScale = 1 + Math.min(scrollY / 800, 0.12);
  const bgOpacity = Math.max(0, 1 - scrollY / 650);
  const textTranslateY = -Math.min(scrollY * 0.35, 120);
  const textOpacity = Math.max(0, 1 - scrollY / 450);

  return (
    <section
      id="hero"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className="relative flex h-[100dvh] min-h-[100dvh] md:h-auto md:min-h-screen w-full flex-col justify-end overflow-hidden border-b border-border bg-black text-white"
    >
      {/* Background Slideshow with Parallax Zoom Reveal */}
      <div
        className="absolute inset-0 z-0 will-change-transform"
        style={{
          transform: `scale(${bgScale})`,
          opacity: bgOpacity,
        }}
      >
        {/* Desktop Landscape Slides */}
        <div className="hidden md:block absolute inset-0">
          {DESKTOP_SLIDES.map((slide, index) => {
            const isActive = index === (currentIndex % DESKTOP_SLIDES.length);
            const isNext = index === ((currentIndex + 1) % DESKTOP_SLIDES.length);
            if (!isActive && !isNext) return null;

            return (
              <div
                key={slide.src}
                className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                style={{
                  opacity: isActive ? 0.95 : 0,
                  zIndex: isActive ? 10 : 0,
                  pointerEvents: isActive ? "auto" : "none",
                }}
              >
                <img
                  src={slide.src}
                  alt="George Roșu Portfolio Hero Landscape Slide"
                  loading={isActive ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={isActive ? "high" : "auto"}
                  className="h-full w-full object-cover"
                  style={{ objectPosition: slide.position }}
                />
              </div>
            );
          })}
        </div>

        {/* Mobile Portrait Slides */}
        <div className="block md:hidden absolute inset-0">
          {MOBILE_SLIDES.map((slide, index) => {
            const isActive = index === (currentIndex % MOBILE_SLIDES.length);
            const isNext = index === ((currentIndex + 1) % MOBILE_SLIDES.length);
            if (!isActive && !isNext) return null;

            return (
              <div
                key={slide.src}
                className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                style={{
                  opacity: isActive ? 0.95 : 0,
                  zIndex: isActive ? 10 : 0,
                  pointerEvents: isActive ? "auto" : "none",
                }}
              >
                <img
                  src={slide.src}
                  alt="George Roșu Portfolio Hero Portrait Mobile Slide"
                  loading={isActive ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={isActive ? "high" : "auto"}
                  className="h-full w-full object-cover"
                  style={{ objectPosition: slide.position }}
                />
              </div>
            );
          })}
        </div>

        {/* Dark Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 z-10" />
      </div>

      {/* Manual Navigation Buttons (Desktop Only) */}
      <button
        onClick={handlePrev}
        aria-label={lang === "RO" ? "Imaginea anterioară" : "Previous slide"}
        className="hidden md:flex absolute left-10 top-1/2 -translate-y-1/2 z-30 h-14 w-14 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20 transition-transform duration-150 active:scale-90 hover:bg-white hover:text-black shadow-xl cursor-pointer"
        style={{ opacity: textOpacity }}
      >
        ←
      </button>

      <button
        onClick={handleNext}
        aria-label={lang === "RO" ? "Imaginea următoare" : "Next slide"}
        className="hidden md:flex absolute right-10 top-1/2 -translate-y-1/2 z-30 h-14 w-14 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20 transition-all duration-150 active:scale-90 hover:bg-white hover:text-black shadow-xl cursor-pointer"
        style={{ opacity: textOpacity }}
      >
        →
      </button>

      {/* Hero Content with Smooth Scroll Reveal Fade & Parallax Shift */}
      <div
        className="relative mx-auto w-full max-w-[1600px] px-5 pb-10 md:px-10 md:pb-20 z-20 text-center will-change-transform"
        style={{
          transform: `translateY(${textTranslateY}px)`,
          opacity: textOpacity,
        }}
      >
        <h1 className="text-[clamp(2.75rem,10.5vw,10rem)] font-normal tracking-[0.04em] text-white uppercase leading-none w-full text-center mb-6 md:mb-8 font-sans drop-shadow-md">
          GEORGE ROȘU
        </h1>

        <div className="flex flex-col justify-between gap-5 border-t border-white/30 pt-5 text-[11px] md:text-sm md:flex-row md:items-start font-sans text-white/95 font-normal uppercase tracking-wider">
          <div className="space-y-1 leading-relaxed text-center md:text-left">
            <p className="font-semibold text-white">
              {lang === "RO" ? "CREATOR VIZUAL" : "VISUAL CREATOR"}
            </p>
            <p>GALAȚI, ROMÂNIA</p>
            <p>{lang === "RO" ? "DISPONIBIL ÎN TOATĂ LUMEA" : "AVAILABLE WORLDWIDE"}</p>
          </div>
          <div className="space-y-1 text-center md:text-right leading-relaxed">
            <p className="font-semibold text-white">
              {lang === "RO" ? "FOTOGRAFIE & VIDEOGRAFIE COMERCIALĂ" : "COMMERCIAL PHOTOGRAPHY & VIDEOGRAPHY"}
            </p>
            <p>{lang === "RO" ? "AUTO · CULINAR · PRODUS" : "AUTOMOTIVE · FOOD · PRODUCT"}</p>
          </div>
        </div>
      </div>
    </section>
  );
}