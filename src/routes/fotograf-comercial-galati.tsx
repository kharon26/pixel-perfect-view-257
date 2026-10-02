import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/services/ServicePage";

const title = "Fotograf Comercial Galați | Servicii Foto Profesionale — George Roșu";
const description = "Fotograf comercial în Galați și Brăila. Servicii foto profesionale de brand, produs, culinar, automotive și campanii publicitare. Disponibil în toată România.";
const canonicalUrl = "https://georgerosu.eu/fotograf-comercial-galati";
const ogImage = "https://georgerosu.eu/portfolio/motorpark-romania/BMW_74_-1200w.webp";

export const Route = createFileRoute("/fotograf-comercial-galati")({
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
                { "@type": "ListItem", "position": 3, "name": "Fotograf Comercial Galați", "item": canonicalUrl }
              ]
            },
            {
              "@type": "Service",
              "@id": `${canonicalUrl}#service`,
              "name": "Fotograf Comercial Galați",
              "serviceType": "Fotograf Comercial Galați",
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
      slug="fotograf-comercial-galati"
      title="Fotograf Comercial Galați"
      kickerBadge="FOTOGRAFIE COMERCIALĂ & BRAND"
      kickerSubline="GALAȚI · BRĂILA · PROIECTE NAȚIONALE"
      description="Servicii complete de fotografie comercială pentru companii, antreprenori și branduri ambițioase. Construim imagini strategice cu estetică minimalistă și claritate tehnică, concepute să consolideze poziționarea vizuală a afacerii tale pe piață."
      capabilitiesIntro="Fiecare ședință foto comercială pornește de la obiectivele de comunicare ale afacerii, asigurând active vizuale de rezoluție înaltă ideale pentru website-uri corporate, cataloage tipărite și campanii de imagine."
      ctaKicker="CONSULTANȚĂ PROIECT FOTO"
      ctaHeading="Ai în plan o campanie foto comercială?"
      ctaText="Fie că pregătești o relansare de brand, portrete profesionale de echipă sau imagini pentru noul tău website, hai să discutăm cerințele proiectului tău în Galați sau la nivel național."
      ctaButtonText="Solicită o ofertă foto →"
      curatedProjectSlugs={["alex-macelarie","bmw-romania","dentoart-clinic","99beauty"]}
      serviceFeatures={[{"title":"Campanii de Brand & Advertising","description":"Imagini publicitare de înaltă rezoluție create după brief strategic pentru lansări de produse și campanii de imagine."},{"title":"Fotografie Corporate & Medicală","description":"Portrete profesionale de echipă, spații de lucru, clinici și facilități industriale cu iluminare dedicată."},{"title":"Fotografie de Produs & E-Commerce","description":"Cadre de studio cu fundal controlat, evidențierea texturilor și detaliilor premium pentru magazine online și cataloage."},{"title":"Automotive & Lifestyle","description":"Fotografie auto pe circuit, showroom sau stradă, captând dinamica și detaliile de design specifice fiecărui brand."}]}
      processSteps={[{"step":"01","title":"Briefing & Concept","description":"Analizăm identitatea brandului, publicul țintă și cerințele specifice pentru a stabili direcția vizuală și lista de cadre."},{"step":"02","title":"Producție & Shooting","description":"Sesiune foto realizată în studio sau la locație, utilizând lumini de studio de precizie și tehnică profesională."},{"step":"03","title":"Retuș & Livrare","description":"Selecție atentă, retuș fin de culoare și detalii la standarde editoriale, cu livrare promptă în formate optimizate web și print."}]}
    />
  ),
});
