import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const { lang, setLang } = useLanguage();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: lang === "RO" ? "Portofoliu" : "Portfolio", to: "/#work" },
    { label: lang === "RO" ? "Despre" : "About", to: "/#about" },
    { label: lang === "RO" ? "Clienți" : "Clients", to: "/#clients" },
    { label: lang === "RO" ? "Contact" : "Contact", to: "/#contact" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 pointer-events-none">
      {/* Background Layer 1 — Top Gradient (fades out smoothly on scroll) */}
      <div
        className={`absolute inset-0 bg-gradient-to-b from-black/85 via-black/45 to-transparent pb-6 transition-opacity duration-700 ease-in-out ${
          solid ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Background Layer 2 — Solid White Bar (fades in smoothly on scroll) */}
      <div
        className={`absolute inset-0 border-b border-neutral-200/80 bg-white/95 backdrop-blur-md shadow-sm transition-opacity duration-700 ease-in-out ${
          solid ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Foreground Content */}
      <nav className="relative z-10 mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10 pointer-events-auto">
        <Link
          to="/"
          className={`text-sm md:text-base font-bold tracking-widest uppercase transition-colors duration-500 ${
            solid ? "text-black" : "text-white"
          }`}
        >
          George&nbsp;Roșu
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          <ul className="flex items-center gap-10">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.to}
                  className={`text-xs md:text-sm font-semibold tracking-widest uppercase transition-colors duration-500 ${
                    solid
                      ? "text-neutral-800 hover:text-black"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Language Switcher Button (RO | EN) */}
          <div
            className={`flex items-center border rounded-full px-2.5 py-1 text-xs font-mono font-bold tracking-wider transition-colors duration-500 ${
              solid
                ? "border-black/20 bg-neutral-100 text-black"
                : "border-white/30 bg-black/30 text-white backdrop-blur-sm"
            }`}
          >
            <button
              onClick={() => setLang("RO")}
              className={`px-1.5 py-0.5 transition-opacity ${
                lang === "RO" ? "opacity-100 underline decoration-2 underline-offset-4 font-extrabold" : "opacity-50 hover:opacity-100"
              }`}
            >
              RO
            </button>
            <span className="opacity-40">|</span>
            <button
              onClick={() => setLang("EN")}
              className={`px-1.5 py-0.5 transition-opacity ${
                lang === "EN" ? "opacity-100 underline decoration-2 underline-offset-4 font-extrabold" : "opacity-50 hover:opacity-100"
              }`}
            >
              EN
            </button>
          </div>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-4 md:hidden">
          <div
            className={`flex items-center border rounded-full px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider ${
              solid
                ? "border-black/20 bg-neutral-100 text-black"
                : "border-white/30 bg-black/30 text-white"
            }`}
          >
            <button
              onClick={() => setLang("RO")}
              className={`${lang === "RO" ? "opacity-100 underline" : "opacity-50"}`}
            >
              RO
            </button>
            <span className="px-1 opacity-40">|</span>
            <button
              onClick={() => setLang("EN")}
              className={`${lang === "EN" ? "opacity-100 underline" : "opacity-50"}`}
            >
              EN
            </button>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className={`text-xs font-bold tracking-widest uppercase transition-colors duration-500 ${
              solid ? "text-black" : "text-white"
            }`}
          >
            {open ? (lang === "RO" ? "Închide" : "Close") : (lang === "RO" ? "Meniu" : "Menu")}
          </button>
        </div>
      </nav>

      {open && (
        <ul className="relative z-10 flex flex-col gap-6 border-t border-neutral-200 bg-white px-6 py-8 md:hidden shadow-lg pointer-events-auto">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.to}
                onClick={() => setOpen(false)}
                className="text-sm font-bold tracking-widest uppercase text-black"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}