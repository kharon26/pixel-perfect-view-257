import { createFileRoute } from "@tanstack/react-router";
import { ShowcasePage } from "@/components/portfolio/ShowcasePage";
import { getPhotoProjects } from "@/lib/project-utils";

const title = "Fotografie Comercială & Content pentru Branduri | George Roșu";
const description =
  "Portofoliu de fotografie comercială, de produs, culinară și automotive. George Roșu — fotograf comercial în Galați, Brăila și disponibil în toată România.";
const ogImage = "https://georgerosu.eu/portfolio/motorpark-romania/BMW_74_-1200w.webp";

export const Route = createFileRoute("/photo")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:image", content: ogImage },
      { property: "og:site_name", content: "George Roșu" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
    ],
    links: [{ rel: "canonical", href: "https://georgerosu.eu/photo" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Acasă", "item": "https://georgerosu.eu" },
                { "@type": "ListItem", "position": 2, "name": "Foto", "item": "https://georgerosu.eu/photo" }
              ]
            },
            {
              "@type": "CollectionPage",
              "@id": "https://georgerosu.eu/photo#collection",
              "name": title,
              "description": description,
              "url": "https://georgerosu.eu/photo",
              "isPartOf": { "@id": "https://georgerosu.eu/#website" }
            }
          ]
        })
      }
    ],
  }),
  component: PhotoPage,
});

function PhotoPage() {
  const photoProjects = getPhotoProjects();
  return <ShowcasePage type="photo" projects={photoProjects} />;
}
