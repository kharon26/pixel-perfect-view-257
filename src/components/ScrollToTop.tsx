import { useState, useEffect } from "react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past 400px
      const threshold = Math.min(window.innerHeight * 0.45, 400);
      setVisible(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Înapoi sus"
      className={`fixed bottom-6 right-6 z-50 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-neutral-900/80 hover:bg-black text-white backdrop-blur-md border border-white/20 shadow-md transition-all duration-300 active:scale-90 cursor-pointer ${
        visible
          ? "opacity-80 hover:opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 h-4"
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}
