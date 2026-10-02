import { createFileRoute } from "@tanstack/react-router";
import { ShowcasePage } from "@/components/portfolio/ShowcasePage";
import { getVideoProjects } from "@/lib/project-utils";

const title = "Videografie Comercială & Social Media Content | George Roșu";
const description =
  "Producție video comercială, reclame de brand, automotive motion și content social media / reels. George Roșu — videograf comercial Galați și România.";
const ogImage = "https://georgerosu.eu/portfolio/nespresso/nespresso-hero.jpg";

export const Route = createFileRoute("/video")({
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
    links: [{ rel: "canonical", href: "https://georgerosu.eu/video" }],
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
                { "@type": "ListItem", "position": 2, "name": "Video", "item": "https://georgerosu.eu/video" }
              ]
            },
            {
              "@type": "CollectionPage",
              "@id": "https://georgerosu.eu/video#collection",
              "name": title,
              "description": description,
              "url": "https://georgerosu.eu/video",
              "isPartOf": { "@id": "https://georgerosu.eu/#website" }
            }
          ]
        })
      }
    ],
  }),
  component: VideoPage,
});

function VideoPage() {
  const videoProjects = getVideoProjects();
  return <ShowcasePage type="video" projects={videoProjects} />;
}
