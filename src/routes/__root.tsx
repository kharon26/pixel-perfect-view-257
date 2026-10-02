import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

import appCss from "../styles.css?url";
import { LanguageProvider } from "@/context/LanguageContext";
import { smoothScrollToElement } from "@/lib/smooth-scroll";
import { ScrollToTop } from "@/components/ScrollToTop";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-6 py-24">
      <div className="max-w-md text-center">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-400">
          Eroare 404 / Error 404
        </span>
        <h1 className="mt-4 text-6xl md:text-8xl font-black uppercase tracking-tight text-foreground font-sans">
          404
        </h1>
        <h2 className="mt-4 text-lg md:text-xl font-bold text-foreground uppercase tracking-wider">
          Pagina nu a fost găsită
        </h2>
        <p className="mt-2 text-xs md:text-sm text-muted-foreground leading-relaxed">
          Pagina pe care o căutați nu există sau a fost mutată. Explorați portofoliul sau reveniți la prima pagină.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-black text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors hover:bg-neutral-800"
          >
            ← Înapoi la prima pagină
          </Link>
          <Link
            to="/photo"
            className="inline-flex items-center justify-center border border-neutral-300 text-neutral-900 px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors hover:border-black"
          >
            Portofoliu Foto
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    /* error handled */
  }, [error]);

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

const jsonLdString = JSON.stringify({"@context":"https://schema.org","@graph":[{"@type":["LocalBusiness","ProfessionalService","Photographer"],"@id":"https://georgerosu.eu/#business","name":"George Roșu","description":"Servicii profesionale de fotografie și videografie comercială, auto, culinară și de produs în Galați și la nivel național în România.","url":"https://georgerosu.eu","telephone":"+40746900286","email":"26georgerosu@gmail.com","image":"https://georgerosu.eu/portfolio/motorpark-romania/BMW_74_-1200w.webp","logo":"https://georgerosu.eu/logo.svg","address":{"@type":"PostalAddress","addressLocality":"Galați","addressRegion":"Galați","addressCountry":"RO"},"areaServed":[{"@type":"City","name":"Galați"},{"@type":"City","name":"Brăila"},{"@type":"City","name":"Tecuci"},{"@type":"AdministrativeArea","name":"Județul Galați"},{"@type":"AdministrativeArea","name":"Județul Brăila"},{"@type":"Country","name":"România"}],"knowsAbout":["Fotografie Comercială","Videografie Comercială","Content Creator","Fotografie Auto","Fotografie Culinară","Fotografie de Produs","Reclame Social Media","Producție Video Branduri"],"hasOfferCatalog":{"@type":"OfferCatalog","name":"Servicii Foto-Video Comerciale","itemListElement":[{"@type":"Offer","itemOffered":{"@type":"Service","name":"Fotografie Comercială Galați","url":"https://georgerosu.eu/fotograf-comercial-galati"}},{"@type":"Offer","itemOffered":{"@type":"Service","name":"Videografie Comercială Galați","url":"https://georgerosu.eu/videograf-comercial-galati"}},{"@type":"Offer","itemOffered":{"@type":"Service","name":"Fotografie de Produs Galați","url":"https://georgerosu.eu/fotografie-produs-galati"}},{"@type":"Offer","itemOffered":{"@type":"Service","name":"Fotografie Culinară Galați","url":"https://georgerosu.eu/fotografie-culinara-galati"}},{"@type":"Offer","itemOffered":{"@type":"Service","name":"Content Creator Galați","url":"https://georgerosu.eu/content-creator-galati"}}]}},{"@type":"Person","@id":"https://georgerosu.eu/#person","name":"George Roșu","jobTitle":"Fotograf & Videograf Comercial","url":"https://georgerosu.eu","telephone":"+40746900286","email":"26georgerosu@gmail.com","worksFor":{"@id":"https://georgerosu.eu/#business"}},{"@type":"WebSite","@id":"https://georgerosu.eu/#website","url":"https://georgerosu.eu","name":"George Roșu — Fotograf & Videograf","publisher":{"@id":"https://georgerosu.eu/#business"},"inLanguage":["ro-RO","en-US"]}]});

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0, viewport-fit=cover" },
      { name: "theme-color", content: "#000000" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { title: "George Roșu | Fotograf & Videograf Comercial Galați" },
      { name: "application-name", content: "George Roșu" },
      { name: "apple-mobile-web-app-title", content: "George Roșu" },
      { name: "msapplication-TileColor", content: "#000000" },
      { name: "msapplication-TileImage", content: "/icon-512.png?v=20261002" },
      { name: "msapplication-config", content: "/browserconfig.xml" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "description", content: "Fotografie și videografie comercială — bazat în Galați, disponibil în toată România. Auto, produs, culinar, branduri. Portofoliu BMW, Mazda, Motorpark, Nespresso." },
      { name: "author", content: "George Roșu" },
      { property: "og:title", content: "George Roșu — Fotograf & Videograf Comercial Galați | Disponibil în toată România" },
      { property: "og:description", content: "Fotografie și videografie comercială — bazat în Galați, disponibil în toată România. Auto, produs, culinar, branduri. Portofoliu BMW, Mazda, Motorpark, Nespresso." },
      { property: "og:image", content: "https://georgerosu.eu/portfolio/motorpark-romania/BMW_74_-1200w.webp" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "ro_RO" },
      { property: "og:site_name", content: "George Roșu" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "George Roșu — Fotograf & Videograf Comercial Galați | Disponibil în toată România" },
      { name: "twitter:description", content: "Fotografie și videografie comercială — bazat în Galați, disponibil în toată România. Auto, produs, culinar, branduri. Portofoliu BMW, Mazda, Motorpark, Nespresso." },
      { name: "twitter:image", content: "https://georgerosu.eu/portfolio/motorpark-romania/BMW_74_-1200w.webp" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;700;800&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      // Modern SVG favicon with cache-busting
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg?v=20261002" },
      // Standard PNG favicons across multiple sizes
      { rel: "icon", type: "image/png", sizes: "48x48", href: "/favicon-48x48.png?v=20261002" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png?v=20261002" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png?v=20261002" },
      // Direct ICO shortcuts for browsers requesting .ico
      { rel: "shortcut icon", href: "/favicon.ico?v=20261002" },
      { rel: "alternate icon", href: "/favicon.ico?v=20261002", type: "image/x-icon" },
      // Safari Pinned Tab Mask Icon
      { rel: "mask-icon", href: "/favicon.svg?v=20261002", color: "#000000" },
      // Apple Touch Icons for iOS Homescreen & Safari Bookmarks
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png?v=20261002" },
      { rel: "apple-touch-icon-precomposed", href: "/apple-touch-icon-precomposed.png?v=20261002" },
      // Web App Manifest
      { rel: "manifest", href: "/site.webmanifest?v=20261002" },
      {
        rel: "preload",
        as: "image",
        href: "/portfolio/alex-macelarie/P1010706-1.webp",
        media: "(min-width: 768px)",
      },
      {
        rel: "preload",
        as: "image",
        href: "/portfolio/alex-macelarie/P1010201-1.webp",
        media: "(max-width: 767px)",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: jsonLdString,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ro" className="bg-background text-foreground">
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
              if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
              }
              function markLoaded() {
                if (document.body) {
                  document.body.classList.add('loaded');
                }
              }
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', markLoaded);
              } else {
                markLoaded();
              }
              setTimeout(markLoaded, 400);
            })();`,
          }}
        />
        <noscript>
          <style>{`body { opacity: 1 !important; }`}</style>
        </noscript>
      </head>
      <body className="bg-background text-foreground antialiased min-h-[100dvh] w-full">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

/**
 * Deterministic scroll and hash management across routes:
 * 1. Fresh routes without hash ALWAYS scroll to (0, 0).
 * 2. Routes with hash wait via RAF for the destination element to mount and scroll into view.
 * 3. Browser popstate (back/forward) behaves naturally.
 */
function ScrollAndHashManager() {
  const location = useRouterState({ select: (s) => s.location });
  const prevLocationRef = useRef<{ pathname: string; hash: string } | null>(null);
  const isPopStateRef = useRef(false);
  const isInitialLoadRef = useRef(true);

  useEffect(() => {
    const handlePopState = () => {
      isPopStateRef.current = true;
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useIsomorphicLayoutEffect(() => {
    const prev = prevLocationRef.current;
    prevLocationRef.current = { pathname: location.pathname, hash: location.hash };
    const isPop = isPopStateRef.current;
    isPopStateRef.current = false;
    const isInitial = isInitialLoadRef.current;
    isInitialLoadRef.current = false;

    const rawHash = location.hash ? location.hash.replace(/^#/, "") : "";

    if (rawHash) {
      let cancelled = false;
      let frameCount = 0;
      const attemptScroll = () => {
        if (cancelled) return;
        const target = document.getElementById(rawHash);
        if (target) {
          const rect = target.getBoundingClientRect();
          const style = window.getComputedStyle(target);
          const scrollMarginTop = parseFloat(style.scrollMarginTop) || 0;
          const targetY = Math.max(0, Math.round(window.scrollY + rect.top - scrollMarginTop));

          if (isInitial || isPop || (!prev || prev.pathname !== location.pathname)) {
            // Direct load, history pop, or cross-route entry (e.g. /video -> /#clients):
            // Position directly at destination section as the new route fades in,
            // completely eliminating top-of-page flash and jarring long-distance leaps!
            window.scrollTo(0, targetY);
          }
          return;
        }
        if (frameCount++ < 40) {
          requestAnimationFrame(attemptScroll);
        }
      };
      requestAnimationFrame(attemptScroll);
      return () => {
        cancelled = true;
      };
    } else {
      // No hash: regular route navigation always starts at top (0, 0)
      if (!prev || prev.pathname !== location.pathname) {
        window.scrollTo(0, 0);
      }
    }
  }, [location.pathname, location.hash]);

  return null;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <ScrollAndHashManager />
        <div key={pathname} className="route-fade-container min-h-screen">
          <Outlet />
        </div>
        <ScrollToTop />
      </LanguageProvider>
    </QueryClientProvider>
  );
}
