import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

// Curated 5 premium horizontal landscape photos for desktop with targeted focal points
const DESKTOP_SLIDES = [
  { src: "/portfolio/beauty-editorial/99beauty__5_.webp", position: "center 45%" },
  { src: "/portfolio/alex-macelarie/P1010706-1.webp", position: "center 50%" },
  { src: "/portfolio/alex-restaurant/Alex-MICDEJUN-69.webp", position: "center 50%" },
  { src: "/portfolio/formula-xperience/P1068258_HDR2.webp", position: "center 45%" },
  { src: "/portfolio/motorpark-romania/BMW_74_.webp", position: "center 50%" },
];

// Curated 8 premium vertical portrait photos requested by user for mobile/phone with targeted focal points
const MOBILE_SLIDES = [
  { src: "/portfolio/alex-macelarie/P1010201-1.webp", position: "12% 35%" },
  { src: "/portfolio/alex-macelarie/P1010447-1.webp", position: "center 30%" },
  { src: "/portfolio/alex-restaurant/Alex-MICDEJUN-68.webp", position: "center 35%" },
  { src: "/portfolio/alex-restaurant/Grillhouse2-6.webp", position: "center 35%" },
  { src: "/portfolio/formula-xperience/P10685902.webp", position: "center 40%" },
  { src: "/portfolio/royal-pizza/royal__5_.webp", position: "center 30%" },
  { src: "/portfolio/dentoart-clinic/DentoArt-19.webp", position: "center 25%" },
  { src: "/portfolio/raliw-forged-wheels/DSC09078-Enhanced-NR.webp", position: "center 45%" },
];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const { lang } = useLanguage();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const slides = isMobile ? MOBILE_SLIDES : DESKTOP_SLIDES;

  // Preload both mobile & desktop images into browser memory cache
  useEffect(() => {
    [...DESKTOP_SLIDES, ...MOBILE_SLIDES].forEach((slide) => {
      const img = new Image();
      img.src = slide.src;
    });
  }, []);

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

  // Touch Swipe Gesture Handlers for Mobile
  const onTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    if (e.targetTouches && e.targetTouches[0]) {
      touchStartX.current = e.targetTouches[0].clientX;
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.targetTouches && e.targetTouches[0]) {
      touchEndX.current = e.targetTouches[0].clientX;
    }
  };

  const onTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 30;
    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
  };

  return (
    <section
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className="relative flex min-h-svh flex-col justify-end overflow-hidden bg-neutral-900 select-none"
    >
      {/* Background Image Slider — Crisp visibility with dark overlay */}
      <div className="absolute inset-0 bg-neutral-950">
        {/* Desktop Landscape Slides */}
        <div className="hidden md:block absolute inset-0">
          {DESKTOP_SLIDES.map((slide, index) => {
            const isActive = index === (currentIndex % DESKTOP_SLIDES.length);
            return (
              <div
                key={slide.src}
                className="absolute inset-0 transition-opacity duration-500 ease-in-out"
                style={{
                  opacity: isActive ? 0.95 : 0,
                  zIndex: isActive ? 10 : 0,
                  pointerEvents: isActive ? "auto" : "none",
                }}
              >
                <img
                  src={slide.src}
                  alt="George Roșu Portfolio Hero Landscape Slide"
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
            return (
              <div
                key={slide.src}
                className="absolute inset-0 transition-opacity duration-500 ease-in-out"
                style={{
                  opacity: isActive ? 0.95 : 0,
                  zIndex: isActive ? 10 : 0,
                  pointerEvents: isActive ? "auto" : "none",
                }}
              >
                <img
                  src={slide.src}
                  alt="George Roșu Portfolio Hero Portrait Mobile Slide"
                  className="h-full w-full object-cover"
                  style={{ objectPosition: slide.position }}
                />
              </div>
            );
          })}
        </div>

        {/* Subtle dark gradient overlay ensuring clear text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
      </div>

      {/* Manual Left & Right Navigation Buttons (Desktop Only) */}
      <button
        onClick={handlePrev}
        aria-label={lang === "RO" ? "Imaginea anterioară" : "Previous slide"}
        className="hidden md:flex absolute left-10 top-1/2 -translate-y-1/2 z-30 h-14 w-14 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20 transition-transform duration-150 active:scale-90 hover:bg-white hover:text-black shadow-xl cursor-pointer"
      >
        ←
      </button>

      <button
        onClick={handleNext}
        aria-label={lang === "RO" ? "Imaginea următoare" : "Next slide"}
        className="hidden md:flex absolute right-10 top-1/2 -translate-y-1/2 z-30 h-14 w-14 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20 transition-all duration-150 active:scale-90 hover:bg-white hover:text-black shadow-xl cursor-pointer"
      >
        →
      </button>

      {/* Hero Content — Perfectly Centered Title & Metadata */}
      <div className="relative mx-auto w-full max-w-[1600px] px-6 pb-14 md:px-10 md:pb-20 z-20 text-center">
        <h1 className="text-[clamp(3.5rem,11.5vw,10rem)] font-normal tracking-[0.04em] text-white uppercase leading-none w-full text-center mb-8 font-sans drop-shadow-md">
          GEORGE ROȘU
        </h1>
        <div className="flex flex-col justify-between gap-6 border-t border-white/30 pt-6 text-xs md:text-sm md:flex-row md:items-start font-sans text-white/95 font-normal uppercase tracking-wider">
          <div className="space-y-1 leading-relaxed text-center md:text-left">
            <p className="font-normal text-white">
              {lang === "RO" ? "CREATOR VIZUAL" : "VISUAL CREATOR"}
            </p>
            <p>GALAȚI, ROMÂNIA</p>
            <p>{lang === "RO" ? "DISPONIBIL ÎN TOATĂ LUMEA" : "AVAILABLE WORLDWIDE"}</p>
          </div>
          <div className="space-y-1 text-center md:text-right leading-relaxed">
            <p className="font-normal text-white">
              {lang === "RO" ? "FOTOGRAFIE & VIDEOGRAFIE COMERCIALĂ" : "COMMERCIAL PHOTOGRAPHY & VIDEOGRAPHY"}
            </p>
            <p>{lang === "RO" ? "AUTO · CULINAR · PRODUS" : "AUTOMOTIVE · FOOD · PRODUCT"}</p>
          </div>
        </div>
      </div>
    </section>
  );
}