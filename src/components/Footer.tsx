import { Link } from "@tanstack/react-router";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { lang } = useLanguage();

  return (
    <footer className="border-t border-border py-10 md:py-12 bg-background text-foreground safe-area-bottom">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 flex flex-col gap-6">
        {/* Editorial Service Directory Links for Natural Crawling & Navigation */}
        <nav aria-label="Servicii Foto-Video Galați" className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-2 text-[10px] sm:text-[11px] md:text-xs text-neutral-500 font-mono uppercase tracking-wider">
          <Link
            to="/fotograf-comercial-galati"
            className="hover:text-black transition-colors"
          >
            Fotograf Comercial Galați
          </Link>
          <span className="text-neutral-300">·</span>
          <Link
            to="/videograf-comercial-galati"
            className="hover:text-black transition-colors"
          >
            Videograf Comercial Galați
          </Link>
          <span className="text-neutral-300">·</span>
          <Link
            to="/fotografie-produs-galati"
            className="hover:text-black transition-colors"
          >
            Fotografie de Produs
          </Link>
          <span className="text-neutral-300">·</span>
          <Link
            to="/fotografie-culinara-galati"
            className="hover:text-black transition-colors"
          >
            Fotografie Culinară
          </Link>
          <span className="text-neutral-300">·</span>
          <Link
            to="/content-creator-galati"
            className="hover:text-black transition-colors"
          >
            Content Creator Galați
          </Link>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs md:text-sm pt-4 border-t border-neutral-100">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
            <span className="label text-muted-foreground">© {new Date().getFullYear()} George Roșu</span>
            <span className="hidden sm:inline text-muted-foreground/40">•</span>
            <span className="label text-muted-foreground">
              Fotograf &amp; Videograf · Galați, România ·{" "}
              <a
                href="tel:+40746900286"
                className="hover:text-foreground transition-colors underline decoration-dotted"
              >
                0746 900 286
              </a>
            </span>
          </div>
          <div>
            <span className="text-[11px] font-mono text-neutral-400">
              Galați · Brăila · Disponibil în toată România
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
