import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Work } from "@/components/Work";
import { About } from "@/components/About";
import { Clients } from "@/components/Clients";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const title = "Kai Marlow — Commercial Photographer & Filmmaker";
const description =
  "Dark, editorial commercial photography and motion for automotive, product, food, aesthetic and social campaigns. Selected work, studio approach and enquiries.";

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
