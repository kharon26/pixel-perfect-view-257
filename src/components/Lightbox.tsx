import { useState, useEffect, useRef } from "react";

interface LightboxProps {
  images: string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export function Lightbox({
  images,
  initialIndex,
  isOpen,
  onClose,
  title = "Project Image",
}: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // Keyboard navigation (ArrowLeft, ArrowRight, ESC)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, images.length]);

  // Prefetch adjacent images for instant full-res transitions
  useEffect(() => {
    if (!isOpen || images.length <= 1) return;
    const prefetch = (idx: number) => {
      const img = new Image();
      img.src = images[idx];
    };
    prefetch((currentIndex + 1) % images.length);
    if (images.length > 2) {
      prefetch(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
    }
  }, [isOpen, currentIndex, images]);

  if (!isOpen || images.length === 0) return null;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
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
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 40) handleNext();
    else if (diff < -40) handlePrev();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const formattedIndex = String(currentIndex + 1).padStart(2, "0");
  const formattedTotal = String(images.length).padStart(2, "0");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md select-none animate-fade-in"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      role="dialog"
      aria-label="Image gallery lightbox"
    >
      {/* Header bar — counter + close button */}
      <div
        className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-6 py-6 max-w-[1600px] mx-auto pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="font-mono text-xs tracking-widest uppercase text-white/80 font-bold bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
          {formattedIndex} / {formattedTotal}
        </span>

        <button
          onClick={onClose}
          aria-label="Close gallery"
          className="h-12 w-12 flex items-center justify-center text-white/70 hover:text-white transition-opacity duration-200 cursor-pointer active:scale-95"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Main Image Container */}
      <div
        className="relative z-10 flex h-full w-full items-center justify-center p-4 md:p-12 pointer-events-none"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          key={images[currentIndex]}
          src={images[currentIndex]}
          alt={`${title} image ${currentIndex + 1}`}
          className="max-h-[88vh] max-w-[92vw] object-contain shadow-2xl transition-opacity duration-300 animate-fade-in pointer-events-auto"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      </div>

      {/* Desktop Prev / Next Navigation Buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Previous image"
            className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-20 h-14 w-14 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20 transition-all duration-200 hover:bg-white hover:text-black shadow-xl cursor-pointer active:scale-90"
          >
            ←
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next image"
            className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-20 h-14 w-14 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20 transition-all duration-200 hover:bg-white hover:text-black shadow-xl cursor-pointer active:scale-90"
          >
            →
          </button>
        </>
      )}
    </div>
  );
}
