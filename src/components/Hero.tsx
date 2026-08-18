import { useState, useEffect, useRef, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Reveal } from "@/components/Reveal";

const DESKTOP_SLIDES = [
  {
    src: "/portfolio/alex-macelarie/P1010706-1.webp",
    position: "center 50%",
    altRo: "Fotografie culinară comercială Măcelăria Alex — George Roșu",
    altEn: "Commercial culinary photography Alex Butcher by George Roșu",
  },
  {
    src: "/portfolio/beauty-editorial/99beauty__5_.webp",
    position: "center 45%",
    altRo: "Fotografie editorială beauty 99 Beauty — George Roșu",
    altEn: "99 Beauty editorial skincare photography by George Roșu",
  },
  {
    src: "/portfolio/alex-restaurant/Alex-MICDEJUN-69.webp",
    position: "center 50%",
    altRo: "Fotografie gastronomică restaurant Alex — George Roșu",
    altEn: "Gastronomy and restaurant photography Alex by George Roșu",
  },
  {
    src: "/portfolio/formula-xperience/P1068258_HDR2.webp",
    position: "center 45%",
    altRo: "Fotografie motorsport auto FormulaXperience Motorpark România — George Roșu",
    altEn: "FormulaXperience motorsport photography Motorpark Romania by George Roșu",
  },
  {
    src: "/portfolio/motorpark-romania/BMW_74_.webp",
    position: "center 50%",
    altRo: "Fotografie comercială auto BMW România Motorpark — George Roșu",
    altEn: "BMW Romania automotive commercial photography by George Roșu",
  },
];

const MOBILE_SLIDES = [
  {
    src: "/portfolio/alex-macelarie/P1010201-1.webp",
    position: "12% 35%",
    altRo: "Fotografie produs culinar Măcelăria Alex — George Roșu",
    altEn: "Culinary product photography Alex Butcher by George Roșu",
  },
  {
    src: "/portfolio/alex-macelarie/P1010447-1.webp",
    position: "center 30%",
    altRo: "Fotografie preparate carne Măcelăria Alex — George Roșu",
    altEn: "Artisanal food photography Alex Butcher by George Roșu",
  },
  {
    src: "/portfolio/alex-restaurant/Alex-MICDEJUN-68.webp",
    position: "center 35%",
    altRo: "Fotografie mic dejun restaurant Alex — George Roșu",
    altEn: "Breakfast menu photography Alex Restaurant by George Roșu",
  },
  {
    src: "/portfolio/alex-restaurant/Grillhouse2-6.webp",
    position: "center 35%",
    altRo: "Fotografie preparate grillhouse Alex — George Roșu",
    altEn: "Grillhouse culinary photography Alex by George Roșu",
  },
  {
    src: "/portfolio/formula-xperience/P10685902.webp",
    position: "center 40%",
    altRo: "Fotografie cursă automotive FormulaXperience — George Roșu",
    altEn: "Motorsport action photography FormulaXperience by George Roșu",
  },
  {
    src: "/portfolio/royal-pizza/royal__5_.webp",
    position: "center 30%",
    altRo: "Fotografie comercială pizza Royal Pizza — George Roșu",
    altEn: "Commercial pizza photography Royal Pizza by George Roșu",
  },
  {
    src: "/portfolio/dentoart-clinic/DentoArt-19.webp",
    position: "center 25%",
    altRo: "Fotografie clinică estetică DentoArt — George Roșu",
    altEn: "Medical aesthetics photography DentoArt Clinic by George Roșu",
  },
];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const bgContainerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const { lang } = useLanguage();

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const slides = isMobile ? MOBILE_SLIDES : DESKTOP_SLIDES;

  // Preload and pre-decode all slides on mount to prevent any decode stalls or frame drops
  useEffect(() => {
    const preloadList = isMobile ? MOBILE_SLIDES : DESKTOP_SLIDES;
    preloadList.forEach((slide) => {
      const img = new Image();
      img.src = slide.src;
      if ("decode" in img) {
        img.decode().catch(() => {});
      }
    });
  }, [isMobile]);

  // Clean transition handler
  const changeSlide = useCallback((newIndex: number) => {
    setCurrentIndex(newIndex);
  }, []);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
  }, [slides.length]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const handlePrev = () => {
    changeSlide((currentIndex - 1 + slides.length) % slides.length);
    resetTimer();
  };

  const handleNext = () => {
    changeSlide((currentIndex + 1) % slides.length);
    resetTimer();
  };

  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches && e.touches[0]) {
      touchStartX.current = e.touches[0].clientX;
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches && e.touches[0]) {
      touchEndX.current = e.touches[0].clientX;
    }
  };

  const onTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 35) handleNext();
    else if (distance < -35) handlePrev();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Subtle, ultra-smooth GPU scroll animation (Parallax + Content Fade) active on both Mobile & Desktop
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY || window.pageYOffset;
          const heroHeight = sectionRef.current ? sectionRef.current.offsetHeight : window.innerHeight;

          if (scrollY <= heroHeight + 50) {
            const progress = Math.min(scrollY / heroHeight, 1);
            
            // Background subtle parallax & scale (pure GPU transform3d)
            if (bgContainerRef.current) {
              const bgY = scrollY * 0.22;
              const bgScale = 1 + progress * 0.025;
              bgContainerRef.current.style.transform = `translate3d(0, ${bgY}px, 0) scale(${bgScale})`;
              bgContainerRef.current.style.willChange = scrollY > 0 ? "transform" : "auto";
            }

            // Content fade-out and subtle upward drift (GPU transform3d + opacity)
            if (contentRef.current) {
              const contentOpacity = Math.max(0, 1 - progress * 1.4);
              const contentY = -scrollY * 0.14;
              contentRef.current.style.opacity = contentOpacity.toString();
              contentRef.current.style.transform = `translate3d(0, ${contentY}px, 0)`;
              contentRef.current.style.willChange = scrollY > 0 ? "opacity, transform" : "auto";
            }
          } else {
            // Free GPU memory once scrolled past hero
            if (bgContainerRef.current) {
              bgContainerRef.current.style.willChange = "auto";
            }
            if (contentRef.current) {
              contentRef.current.style.willChange = "auto";
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className="relative flex h-[100dvh] min-h-[100dvh] md:h-auto md:min-h-[100dvh] w-full flex-col justify-end overflow-hidden bg-black text-white"
    >
      {/* Background Slideshow — True crossfade with full opacity on incoming slide */}
      <div
        ref={bgContainerRef}
        className="absolute inset-0 z-0 overflow-hidden bg-black pointer-events-none origin-center"
      >
        {/* Desktop Landscape Slides */}
        <div className="hidden md:block absolute inset-0">
          {DESKTOP_SLIDES.map((slide, index) => {
            const isActive = index === (currentIndex % DESKTOP_SLIDES.length);
            const altText = lang === "RO" ? slide.altRo : slide.altEn;

            return (
              <div
                key={slide.src}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out will-change-[opacity] ${
                  isActive ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <img
                  src={slide.src}
                  alt={altText}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={index === 0 ? "high" : "auto"}
                  className="h-full w-full object-cover block select-none pointer-events-none"
                  style={{
                    objectPosition: slide.position,
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Mobile Portrait Slides */}
        <div className="block md:hidden absolute inset-0">
          {MOBILE_SLIDES.map((slide, index) => {
            const isActive = index === (currentIndex % MOBILE_SLIDES.length);
            const altText = lang === "RO" ? slide.altRo : slide.altEn;

            return (
              <div
                key={slide.src}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out will-change-[opacity] ${
                  isActive ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <img
                  src={slide.src}
                  alt={altText}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={index === 0 ? "high" : "auto"}
                  className="h-full w-full object-cover block select-none pointer-events-none"
                  style={{
                    objectPosition: slide.position,
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Dark Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 z-20 pointer-events-none" />
      </div>

      {/* Manual Navigation Buttons (Desktop Only) */}
      <button
        onClick={handlePrev}
        aria-label={lang === "RO" ? "Imaginea anterioară" : "Previous slide"}
        className="hidden md:flex absolute left-10 top-1/2 -translate-y-1/2 z-40 h-14 w-14 items-center justify-center rounded-full bg-black/70 text-white border border-white/20 transition-transform duration-150 active:scale-90 hover:bg-white hover:text-black shadow-xl cursor-pointer"
      >
        ←
      </button>

      <button
        onClick={handleNext}
        aria-label={lang === "RO" ? "Imaginea următoare" : "Next slide"}
        className="hidden md:flex absolute right-10 top-1/2 -translate-y-1/2 z-40 h-14 w-14 items-center justify-center rounded-full bg-black/70 text-white border border-white/20 transition-all duration-150 active:scale-90 hover:bg-white hover:text-black shadow-xl cursor-pointer"
      >
        →
      </button>

      {/* Hero Content with Scroll-Triggered Entrance Reveal Animation & Scroll-linked exit */}
      <div
        ref={contentRef}
        className="relative mx-auto w-full max-w-[1600px] px-6 pb-10 md:px-10 md:pb-20 z-30 text-center origin-bottom"
      >
        <Reveal once delay={100}>
          <h1 className="text-[clamp(2.75rem,7.5vw,7.5rem)] font-normal tracking-[0.04em] text-white uppercase leading-none w-full text-center mb-6 md:mb-8 font-sans drop-shadow-md">
            GEORGE ROȘU
          </h1>
        </Reveal>

        <Reveal once delay={250}>
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
        </Reveal>
      </div>
    </section>
  );
}
