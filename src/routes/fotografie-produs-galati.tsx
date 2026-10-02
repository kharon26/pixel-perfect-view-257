import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/services/ServicePage";

const title = "Fotografie de Produs Galați | Studio E-Commerce & Brand — George Roșu";
const description = "Servicii de fotografie de produs în Galați. Cadre de studio, e-commerce, packshot, texturi și compoziții publicitare pentru branduri și magazine online.";
const canonicalUrl = "https://georgerosu.eu/fotografie-produs-galati";
const ogImage = "https://georgerosu.eu/portfolio/motorpark-romania/BMW_74_-1200w.webp";

export const Route = createFileRoute("/fotografie-produs-galati")({
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
                { "@type": "ListItem", "position": 3, "name": "Fotografie de Produs Galați", "item": canonicalUrl }
              ]
            },
            {
              "@type": "Service",
              "@id": `${canonicalUrl}#service`,
              "name": "Fotografie de Produs Galați",
              "serviceType": "Fotografie de Produs Galați",
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
      slug="fotografie-produs-galati"
      title="Fotografie de Produs Galați"
      kickerBadge="FOTOGRAFIE DE PRODUS & PACKSHOT"
      kickerSubline="E-COMMERCE · CATALOG · COMPOZIȚII CREATIVE"
      description="Fotografie comercială de produs realizată în mediu de studio controlat, punând în valoare materialele, textura fină, reflexiile naturale și ambalajul. Cadre precise care cresc încrederea clienților și rata de conversie pe magazinele online."
      capabilitiesIntro="Fiecare produs este iluminat după o schemă tehnică adaptată proprietăților sale optice (mat, metalic, transparent), garantând fidelitate cromatică absolută și compatibilitate directă cu standardele marilor platforme de vânzare."
      ctaKicker="SESIUNE FOTO DE PRODUS"
      ctaHeading="Pregătești lansarea sau actualizarea catalogului?"
      ctaText="Trimite-ne produsele la studio sau planificăm o sesiune la sediul tău. Îți oferim imagini impecabile pentru magazinul online, ambalaje sau materiale promoționale."
      ctaButtonText="Planifică ședința foto de produs →"
      curatedProjectSlugs={["99beauty","raliw-forged-wheels","alex-macelarie"]}
      serviceFeatures={[{"title":"Packshot pe Fundal Alb / Neutru","description":"Cadre perfect decupabile, conforme cu standardele marketplace (eMAG, Amazon) și e-commerce modern."},{"title":"Compoziții Creative & Lifestyle","description":"Setups tematice cu recuzită atent aleasă pentru a transmite identitatea și valorile brandului tău."},{"title":"Cosmetică & Beauty","description":"Iluminare soft, evidențierea texturilor lichide/cremoase și reflexii impecabile pe ambalaje lucioase."},{"title":"Produse Industriale & Automotive","description":"Fotografie de înaltă precizie pentru jante, piese tehnice, accesorii și componente complexe."}]}
      processSteps={[{"step":"01","title":"Pregătire & Curățare","description":"Fiecare produs este inspectat, curățat și poziționat milimetric în fața luminilor de studio."},{"step":"02","title":"Iluminare & Fotografiere","description":"Construim o schemă de lumini dedicată fiecărui material (mat, lucios, metalic sau transparent)."},{"step":"03","title":"Retuș High-End","description":"Eliminarea imperfecțiunilor microscopice, corecție de culoare exactă și optimizare web rapidă."}]}
    />
  ),
});
