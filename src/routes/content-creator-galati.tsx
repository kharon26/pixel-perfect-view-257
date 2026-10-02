import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/services/ServicePage";

const title = "Content Creator Galați | Foto-Video Social Media & Brand — George Roșu";
const description = "Content creator în Galați pentru branduri și afaceri. Producție continuă de conținut foto-video, reels, reclame digitale și storytelling vizual.";
const canonicalUrl = "https://georgerosu.eu/content-creator-galati";
const ogImage = "https://georgerosu.eu/portfolio/motorpark-romania/BMW_74_-1200w.webp";

export const Route = createFileRoute("/content-creator-galati")({
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
                { "@type": "ListItem", "position": 3, "name": "Content Creator Galați", "item": canonicalUrl }
              ]
            },
            {
              "@type": "Service",
              "@id": `${canonicalUrl}#service`,
              "name": "Content Creator Galați",
              "serviceType": "Content Creator Galați",
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
      slug="content-creator-galati"
      title="Content Creator Galați"
      kickerBadge="CREARE CONȚINUT FOTO-VIDEO"
      kickerSubline="ABONAMENTE LUNARE · REELS · TIKTOK · STORYTELLING"
      description="Creare continuă de conținut foto și video vertical pentru branduri care vor o prezență digitală constantă, profesională și relevantă. Eliminăm stresul generării de conținut zilnic prin sesiuni organizate și livrări previzibile."
      capabilitiesIntro="Planificăm din timp pachetele lunare de conținut pentru ca afacerea ta să aibă întotdeauna materiale proaspete pentru Instagram Reels, TikTok, Facebook Ads și newslettere, fără compromisuri la calitatea imaginii."
      ctaKicker="PARTENERIAT DE CONȚINUT LUNAR"
      ctaHeading="Ai nevoie de o sursă constantă de conținut de înaltă calitate?"
      ctaText="Stabilim un ritm lunar de producție adaptat obiectivelor brandului tău din Galați sau Brăila, astfel încât să ai mereu postări și reclame video pregătite din timp."
      ctaButtonText="Discută un abonament de conținut →"
      curatedProjectSlugs={["famous-chicken","harmonie-cafe","toyota-braila","mapet-tuning-airride"]}
      serviceFeatures={[{"title":"Pachete Lunare de Content","description":"Număr predictibil de fotografii și clipuri scurte livrate periodic pentru a susține calendarul de postări."},{"title":"Reels, Shorts & TikTok","description":"Format 9:16 nativ, hook vizual rapid, dinamică ridicată și muzică sincronizată pentru engagement maxim."},{"title":"Storytelling Vizual de Brand","description":"Prezentarea oamenilor din spatele afacerii, culiselor de producție și valorilor companiei tale."},{"title":"Materiale Promoționale pentru Ads","description":"Cadre specifice pentru campanii de Meta Ads și Google Display care opresc scroll-ul utilizatorului."}]}
      processSteps={[{"step":"01","title":"Planificare Conținut","description":"Stabilim obiectivele lunare, temele vizuale și calendarul de filmare pentru eficiență maximă."},{"step":"02","title":"Sesiune Concentrată","description":"O singură zi sau jumătate de zi de producție eficientă din care extragem materiale pentru săptămâni întregi."},{"step":"03","title":"Pachet Gata de Postare","description":"Fișiere calibrate cromatic, dimensionate corespunzător și ușor de încărcat direct pe platformele sociale."}]}
    />
  ),
});
