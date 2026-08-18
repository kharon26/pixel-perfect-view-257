import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { lang } = useLanguage();

  return (
    <footer className="border-t border-border py-10 bg-background text-foreground">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-3 px-6 md:flex-row md:items-center md:justify-between md:px-10">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs md:text-sm">
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
      </div>
    </footer>
  );
}
