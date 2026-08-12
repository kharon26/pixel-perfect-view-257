import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Work } from "@/components/Work";
import { About } from "@/components/About";
import { Clients } from "@/components/Clients";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const title = "George Roșu — Fotografie și Videografie Comercială";
const description =
  "Fotografie și videografie comercială, de produs, automotive și proiecte vizuale realizate de George Roșu. Portofoliu complet foto și video.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Only scroll to target if user deep-linked directly with a hash in URL on initial page load
    if (window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
          history.replaceState(null, "", window.location.pathname);
        }, 100);
      }
    }
  }, []);

  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <Work />
        <About />
        <Clients />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
