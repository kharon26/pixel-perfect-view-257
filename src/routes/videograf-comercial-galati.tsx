import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/services/ServicePage";

const title = "Videograf Comercial Galați | Producție Video & Reclame — George Roșu";
const description = "Videograf comercial în Galați și Brăila. Producție video publicitară, spoturi de brand, automotive motion și conținut social media. Disponibil în toată România.";
const canonicalUrl = "https://georgerosu.eu/videograf-comercial-galati";
const ogImage = "https://georgerosu.eu/portfolio/motorpark-romania/BMW_74_-1200w.webp";

export const Route = createFileRoute("/videograf-comercial-galati")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonicalUrl },
      { property: "og:image", content: ogImage },
      { property: "og:site_name", content: "George Roșu" },
      { property: "og:locale", content: "ro_RO" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
    ],
    links: [
      { rel: "canonical", href: canonicalUrl },
    ],
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
                { "@type": "ListItem", "position": 2, "name": "Servicii", "item": "https://georgerosu.eu/#about" },
                { "@type": "ListItem", "position": 3, "name": "Videograf Comercial Galați", "item": canonicalUrl }
              ]
            },
            {
              "@type": "Service",
              "@id": `${canonicalUrl}#service`,
              "name": "Videograf Comercial Galați",
              "serviceType": "Videograf Comercial Galați",
              "description": description,
              "provider": {
                "@type": "LocalBusiness",
                "@id": "https://georgerosu.eu/#business",
                "name": "George Roșu",
                "url": "https://georgerosu.eu"
              },
              "areaServed": [
                { "@type": "City", "name": "Galați" },
                { "@type": "City", "name": "Brăila" },
                { "@type": "Country", "name": "România" }
              ],
              "url": canonicalUrl
            }
          ]
        })
      }
    ],
  }),
  component: () => (
    <ServicePage
      slug="videograf-comercial-galati"
      title="Videograf Comercial Galați"
      kickerBadge="PRODUCȚIE VIDEO & MOTION"
      kickerSubline="SPOTURI PUBLICITARE · AUTOMOTIVE · BRAND FILMS"
      description="Producție video profesională orientată pe dinamism, compoziție cinematică și ritm contemporan. Realizăm spoturi publicitare, clipuri de produs și filme de prezentare gândite pentru a capta atenția instant pe platformele digitale."
      capabilitiesIntro="De la cadre dinamice filmate cu stabilizare avansată până la color grading și sound design fin, livrăm videoclipuri comerciale calibrate pentru rate mari de retenție și conversie."
      ctaKicker="INIȚIAZĂ O PRODUCȚIE VIDEO"
      ctaHeading="Vrei un clip video care să oprească scroll-ul?"
      ctaText="Construim concepte video dinamice adaptate obiectivelor tale comerciale — de la reclame scurte pentru social media la prezentări video ample de companie."
      ctaButtonText="Discută producția video →"
      curatedProjectSlugs={["nespresso","formula-xperience","famous-chicken","alex-restaurant"]}
      serviceFeatures={[{"title":"Reclame Video de Produs","description":"Spoturi scurte și dinamice care pun în valoare caracteristicile, utilitatea și calitatea produselor comerciale."},{"title":"Spoturi de Brand & Social Media","description":"Conținut video optimizat vertical (Reels, TikTok, Shorts) și orizontal pentru campanii de marketing plătite."},{"title":"Automotive Motion & Circuit","description":"Filmări de mare viteză pe circuit și traseu, tracking shots și cadre dramatice dedicate industriei auto."},{"title":"Prezentări Video HoReCa","description":"Materiale video apetisante pentru restaurante, cafenele și locații gastronomice care atrag noi oaspeți."}]}
      processSteps={[{"step":"01","title":"Scenariu & Planificare","description":"Stabilim mesajul cheie, ritmul videoclipului, storyboard-ul și elementele de decor sau locație."},{"step":"02","title":"Filmări Profesionale","description":"Captură 4K, stabilizare avansată pe gimbal, iluminare cinematică și înregistrare audio dedicată."},{"step":"03","title":"Montaj, Culoare & Sound","description":"Montaj dinamic, color grading profesional, sound design captivant și livrare în formate 16:9 și 9:16."}]}
    />
  ),
});
