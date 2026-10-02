import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Work } from "@/components/Work";
import { About } from "@/components/About";
import { Clients } from "@/components/Clients";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const title = "George Roșu | Fotograf & Videograf Comercial Galați";
const description =
  "Fotografie, videografie comercială și content pentru branduri, produse, restaurante și automotive. George Roșu — Galați, disponibil pentru proiecte în România.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "ro_RO" },
      { property: "og:site_name", content: "George Roșu" },
      { property: "og:image", content: "https://georgerosu.eu/portfolio/motorpark-romania/BMW_74_-1200w.webp" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: "https://georgerosu.eu/portfolio/motorpark-romania/BMW_74_-1200w.webp" },
    ],
    links: [
      { rel: "canonical", href: "https://georgerosu.eu/" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <Clients />
        <Work />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
