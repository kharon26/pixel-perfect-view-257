import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  ScrollRestoration,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { LanguageProvider } from "@/context/LanguageContext";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
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
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
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

const jsonLdString = JSON.stringify({"@context":"https://schema.org","@graph":[{"@type":["LocalBusiness","ProfessionalService","Photographer"],"@id":"https://georgerosu.eu/#business","name":"George Roșu","legalName":"George Roșu PFA","description":"Servicii profesionale de fotografie și videografie comercială, auto, culinară și de produs în Galați și la nivel național în România.","url":"https://georgerosu.eu","telephone":"+40746900286","email":"26georgerosu@gmail.com","image":"https://georgerosu.eu/portfolio/motorpark-romania/BMW_74_-1200w.webp","logo":"https://georgerosu.eu/logo.svg","priceRange":"$$","address":{"@type":"PostalAddress","addressLocality":"Galați","addressRegion":"Galați","addressCountry":"RO"},"geo":{"@type":"GeoCoordinates","latitude":45.4353,"longitude":28.008},"areaServed":[{"@type":"Country","name":"România"},{"@type":"City","name":"Galați"},{"@type":"City","name":"Brăila"},{"@type":"City","name":"Tecuci"}],"knowsAbout":["Fotografie Comercială","Videografie Comercială","Fotografie Auto","Fotografie Culinară","Fotografie de Produs","Reclamă Brand"]},{"@type":"Person","@id":"https://georgerosu.eu/#person","name":"George Roșu","jobTitle":"Fotograf & Videograf Comercial","url":"https://georgerosu.eu","telephone":"+40746900286","email":"26georgerosu@gmail.com","worksFor":{"@id":"https://georgerosu.eu/#business"}},{"@type":"WebSite","@id":"https://georgerosu.eu/#website","url":"https://georgerosu.eu","name":"George Roșu — Fotograf & Videograf","publisher":{"@id":"https://georgerosu.eu/#business"},"inLanguage":["ro-RO","en-US"]}]});

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0, viewport-fit=cover" },
      { name: "theme-color", content: "#000000" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { title: "George Roșu — Fotograf & Videograf Comercial Galați | Disponibil în toată România" },
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
      { rel: "canonical", href: "https://georgerosu.eu/" },
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
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "apple-touch-icon", href: "/logo.svg" },
      { rel: "alternate icon", href: "/favicon.ico", type: "image/x-icon" },
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
            __html: `if ('scrollRestoration' in history && window.location.pathname.startsWith('/work/')) { history.scrollRestoration = 'manual'; window.scrollTo(0, 0); }`,
          }}
        />
      </head>
      <body className="bg-background text-foreground antialiased min-h-[100dvh] w-full">
        <ScrollRestoration
          getKey={(location) => {
            if (location.pathname.startsWith("/work/")) {
              return null;
            }
            return location.pathname;
          }}
        />
        {children}
        <Scripts />
      </body>
    </html>
  );
}


function ScrollManager() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // 1. Reset scroll on popstate (browser back/forward button)
  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname.startsWith("/work/")) {
        window.scrollTo(0, 0);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // 2. Clear any persisted sessionStorage scroll keys for /work/*
  useEffect(() => {
    const clearWorkScrollCache = () => {
      try {
        Object.keys(sessionStorage).forEach((key) => {
          if (
            (key.startsWith("scroll-") || key.includes("tsr") || key.includes("tanstack")) &&
            key.includes("/work/")
          ) {
            sessionStorage.removeItem(key);
          }
        });
      } catch {
        // ignore
      }
    };

    clearWorkScrollCache();
    window.addEventListener("beforeunload", clearWorkScrollCache);
    return () => window.removeEventListener("beforeunload", clearWorkScrollCache);
  }, []);

  // 3. Whenever navigating to a project page (/work/*), always reset scroll immediately to top
  useEffect(() => {
    if (pathname.startsWith("/work/")) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <ScrollManager />
        <div key={pathname} className="route-fade-container min-h-screen">
          <Outlet />
        </div>
      </LanguageProvider>
    </QueryClientProvider>
  );
}
