import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { smoothScrollToElement, smoothScrollToY } from "@/lib/smooth-scroll";

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const { lang, setLang } = useLanguage();
  const navigate = useNavigate();
  const currentPath = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    let lastSolid = false;
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isSolid = window.scrollY > 40;
          if (isSolid !== lastSolid) {
            lastSolid = isSolid;
            setSolid(isSolid);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: lang === "RO" ? "Portofoliu" : "Portfolio", to: "/#work" },
    { label: lang === "RO" ? "Clienți" : "Clients", to: "/#clients" },
    { label: lang === "RO" ? "Foto" : "Photo", to: "/photo" },
    { label: lang === "RO" ? "Video" : "Video", to: "/video" },
    { label: lang === "RO" ? "Despre" : "About", to: "/#about" },
    { label: lang === "RO" ? "Contact" : "Contact", to: "/#contact" },
  ];

  const handleLinkClick = (e: React.MouseEvent, targetTo: string) => {
    setOpen(false);

    // 1. Cross-route or on-page section anchors (/#work, /#about, /#clients, /#contact)
    if (targetTo.startsWith("/#") || targetTo.startsWith("#")) {
      e.preventDefault();
      const sectionId = targetTo.replace(/^\/?#/, "");

      if (window.location.pathname === "/") {
        const el = document.getElementById(sectionId);
        if (el) {
          // Update URL hash without causing native browser hash jump
          window.history.pushState(null, "", `/#${sectionId}`);
          smoothScrollToElement(el);
        }
      } else {
        // From any other route (/photo, /video, /work/*), navigate to / with hash
        navigate({ to: "/", hash: sectionId });
      }
      return;
    }

    // 2. Direct full-page routes (/photo, /video) when already on that page
    if (targetTo === currentPath) {
      e.preventDefault();
      // Remove stale hash from URL if present (e.g. /photo#dentoart -> /photo)
      if (window.location.hash) {
        window.history.pushState(null, "", targetTo);
      }
      // Fluid guided return to top
      smoothScrollToY(0);
      return;
    }

    // 3. Navigating to another route (/photo or /video from / or elsewhere)
    e.preventDefault();
    navigate({ to: targetTo });
  };

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
        className={`absolute inset-0 border-b border-neutral-200/80 bg-white/95 backdrop-blur-md transform-gpu shadow-sm transition-opacity duration-700 ease-in-out ${
          solid ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Foreground Content */}
      <nav
        className="relative z-10 mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 md:px-10 pointer-events-auto"
        style={{
          paddingLeft: `max(1.5rem, calc(1.5rem + env(safe-area-inset-left, 0px)))`,
          paddingRight: `max(1.5rem, calc(1.5rem + env(safe-area-inset-right, 0px)))`,
        }}
      >
        <Link
          to="/"
          onClick={(e) => {
            if (currentPath === "/") {
              e.preventDefault();
              if (window.location.hash) {
                window.history.pushState(null, "", "/");
              }
              smoothScrollToY(0);
            }
          }}
          className={`text-sm md:text-base font-bold tracking-wider uppercase transition-colors duration-500 ${
            solid
              ? "text-black hover:text-neutral-700"
              : "text-white hover:text-neutral-300"
          }`}
        >
          George&nbsp;Roșu
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          <ul className="flex items-center gap-10">
            {links.map((l) => {
              const isActive = l.to === currentPath;
              return (
                <li key={l.label}>
                  <a
                    href={l.to}
                    onClick={(e) => handleLinkClick(e, l.to)}
                    className={`text-xs md:text-sm font-semibold tracking-widest uppercase transition-colors duration-500 ${
                      isActive
                        ? solid
                          ? "text-black underline decoration-2 underline-offset-4 font-bold"
                          : "text-white underline decoration-2 underline-offset-4 font-bold"
                        : solid
                        ? "text-neutral-800 hover:text-black"
                        : "text-white/90 hover:text-white"
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Language Switcher Button (RO | EN) */}
          <div
            className={`flex items-center border rounded-full px-3 py-1 text-xs font-mono font-bold tracking-wider transition-colors duration-500 ${
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
        <div className="flex items-center gap-3 md:hidden">
          <div
            className={`flex items-center border rounded-full px-2.5 py-1 text-xs font-mono font-bold tracking-wider ${
              solid
                ? "border-black/20 bg-neutral-100 text-black"
                : "border-white/30 bg-black/30 text-white"
            }`}
          >
            <button
              onClick={() => setLang("RO")}
              className={`px-1 ${lang === "RO" ? "opacity-100 font-extrabold underline" : "opacity-50"}`}
            >
              RO
            </button>
            <span className="px-0.5 opacity-40">|</span>
            <button
              onClick={() => setLang("EN")}
              className={`px-1 ${lang === "EN" ? "opacity-100 font-extrabold underline" : "opacity-50"}`}
            >
              EN
            </button>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
              solid ? "bg-black/5 text-black" : "bg-white/10 text-white backdrop-blur-sm"
            }`}
          >
            {open ? (lang === "RO" ? "Închide" : "Close") : (lang === "RO" ? "Meniu" : "Menu")}
          </button>
        </div>
      </nav>

      {open && (
        <ul
          className="relative z-10 flex flex-col gap-6 border-b border-neutral-200 bg-white/98 backdrop-blur-xl px-6 py-8 md:hidden shadow-2xl pointer-events-auto"
          style={{
            paddingLeft: `max(1.5rem, calc(1.5rem + env(safe-area-inset-left, 0px)))`,
            paddingRight: `max(1.5rem, calc(1.5rem + env(safe-area-inset-right, 0px)))`,
          }}
        >
          {links.map((l) => {
            const isActive = l.to === currentPath;
            return (
              <li key={l.label}>
                <a
                  href={l.to}
                  onClick={(e) => handleLinkClick(e, l.to)}
                  className={`text-base font-bold tracking-widest uppercase block py-1 transition-colors ${
                    isActive ? "text-black underline underline-offset-4 font-extrabold" : "text-neutral-800 hover:text-black"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </header>
  );
}
