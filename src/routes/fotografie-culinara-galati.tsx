import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/services/ServicePage";

const title = "Fotografie Culinară Galați | Foto & Video HoReCa — George Roșu";
const description = "Fotografie și video culinar pentru restaurante, cafenele și branduri food în Galați și Brăila. Meniuri, preparate gourmet și promovare social media.";
const canonicalUrl = "https://georgerosu.eu/fotografie-culinara-galati";
const ogImage = "https://georgerosu.eu/portfolio/motorpark-romania/BMW_74_-1200w.webp";

export const Route = createFileRoute("/fotografie-culinara-galati")({
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
                { "@type": "ListItem", "position": 3, "name": "Fotografie Culinară Galați", "item": canonicalUrl }
              ]
            },
            {
              "@type": "Service",
              "@id": `${canonicalUrl}#service`,
              "name": "Fotografie Culinară Galați",
              "serviceType": "Fotografie Culinară Galați",
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
      slug="fotografie-culinara-galati"
      title="Fotografie Culinară Galați"
      kickerBadge="FOTOGRAFIE & VIDEO GASTRONOMIC"
      kickerSubline="RESTAURANTE · BISTROURI · SPECIALTY COFFEE · MENIURI"
      description="Servicii dedicate sectorului gastronomic și HoReCa. Punem în evidență plating-ul, prospețimea ingredientelor și atmosfera distinctă a locației tale prin compoziții apetisante și iluminare caldă, dedicată mâncării bune."
      capabilitiesIntro="Colaborăm îndeaproape cu echipa din bucătărie pentru a surprinde fiecare preparat la momentul optim de prospețime, creând imagini ideale pentru meniuri fizice, platforme de delivery (Glovo, Tazz, Bolt Food) și promovare pe rețele sociale."
      ctaKicker="PENTRU LOCAȚII HORECA & FOOD"
      ctaHeading="Vrei un meniu care să vândă din prima privire?"
      ctaText="Programăm ședința foto în timpul pregătirilor de bucătărie din locația ta din Galați sau Brăila. Creăm imagini și clipuri video care transformă privitorii în oaspeți fideli."
      ctaButtonText="Programează ședința foto culinară →"
      curatedProjectSlugs={["famous-chicken","alex-restaurant","harmonie-cafe","royal-pizza"]}
      serviceFeatures={[{"title":"Meniuri Digitale & Print","description":"Fotografii individuale pentru fiecare preparat, optimizate pentru meniuri fizice, site-uri web și aplicații de livrare."},{"title":"Conținut de Social Media & Ads","description":"Fotografii vibrante și reels atractive care stimulează pofta și generează comenzi pe Instagram și Facebook."},{"title":"Food Styling & Atmosferă","description":"Punem în valoare plating-ul bucătarului, atmosfera localului și procesul autentic de preparare."},{"title":"Specialty Coffee & Deserturi","description":"Cadre intime de cafenea, latte art, texturi pufoase și momente calde de lifestyle culinar."}]}
      processSteps={[{"step":"01","title":"Sincronizare cu Bucătăria","description":"Stabilim ordinea optimă de servire a preparatelor pentru ca fiecare farfurie să fie fotografiată proaspătă."},{"step":"02","title":"Shooting cu Lumină Dedicată","description":"Lumină naturală sau flash-uri de studio difuzate pentru a da strălucire sosurilor și prospețime ingredientelor."},{"step":"03","title":"Livrare Rapidă","description":"Editare impecabilă a culorilor mâncării și livrare în format gata de publicare online sau trimitere la tipar."}]}
    />
  ),
});
