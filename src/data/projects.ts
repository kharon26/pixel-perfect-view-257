// ─────────────────────────────────────────────────────────────
// PROJECT DATA — Curated Editorial Galleries (George Roșu)
// ─────────────────────────────────────────────────────────────

export const CATEGORIES = [
  "Auto",
  "Culinar",
  "Produs",
  "Reclamă & Brand",
  "Clinică Dentară",
  "Altele",
] as const;

export type Category = typeof CATEGORIES[number];

export type Project = {
  slug: string;
  index: string;
  title: string;
  client: string;
  category: Category | string | (Category | string)[];
  year: string;
  role: string;
  cover: string;
  coverPosition?: string;
  heroLandscape?: string;
  narrative: string;
  narrativeEn: string;
  gallery: string[];
  video?: string;
};

const getSingleCategoryLabel = (cat: string, lang: "RO" | "EN" = "RO") => {
  if (lang === "RO") return cat;
  switch (cat) {
    case "Toate":
      return "All";
    case "Auto":
      return "Automotive";
    case "Culinar":
      return "Food & Culinary";
    case "Produs":
      return "Product";
    case "Reclamă & Brand":
      return "Brand & Advertising";
    case "Clinică Dentară":
      return "Dental Clinic";
    case "Altele":
      return "Other";
    default:
      return cat;
  }
};

export const getCategoryLabel = (
  cat: string | string[],
  lang: "RO" | "EN" = "RO"
): string => {
  if (Array.isArray(cat)) {
    return cat.map((c) => getSingleCategoryLabel(c, lang)).join(" / ");
  }
  return getSingleCategoryLabel(cat, lang);
};

export const getRoleLabel = (role: string, lang: "RO" | "EN" = "RO") => {
  if (lang === "RO") return role;
  switch (role) {
    case "Fotografie Comercială & Produs":
      return "Commercial & Product Photography";
    case "Fotografie Culinară & Motion Comercial":
      return "Culinary Photography & Commercial Motion";
    case "Fotografie Culinară & Video Promo":
      return "Culinary Photography & Promo Video";
    case "Fotografie Auto & Tehnică":
      return "Automotive & Technical Photography";
    case "Fotografie Comercială & Regie":
      return "Commercial Photography & Direction";
    case "Fotografie Comercială & Medicală":
      return "Commercial & Medical Photography";
    case "Fotografie Culinară & Reclame Social Media":
      return "Culinary Photography & Social Ads";
    case "Motion pe Circuit & Fotografie de Mare Viteză":
      return "Track Motion & High-Speed Photography";
    case "Fotografie Comercială de Produs & Motion":
      return "Commercial Product Photography & Motion";
    case "Fotografie Auto & Detaliu Tehnic":
      return "Automotive Photography & Technical Detail";
    case "Fotografie Comercială":
      return "Commercial Photography";
    case "Fotografie de Acțiune pe Circuit":
      return "Track Action Photography";
    case "Reclamă Video de Produs Comercial":
      return "Commercial Product Video Ad";
    case "Fotografie de Produs & Auto":
      return "Product & Automotive Photography";
    case "Fotografie Culinară":
      return "Culinary Photography";
    default:
      return role;
  }
};

export const PROJECTS: Project[] = [
  // ── 01 99Beauty ──
  {
    slug: "99beauty",
    index: "01",
    title: "99Beauty",
    client: "99% Beauty",
    category: "Produs",
    year: "2026",
    role: "Fotografie Comercială & Produs",
    cover: "/portfolio/beauty-editorial/99beauty__3_.webp",
    coverPosition: "object-[46%_50%]",
    heroLandscape: "/portfolio/beauty-editorial/99beauty__3_.webp",
    narrative:
      "O serie de imagini comerciale create pentru 99% Beauty, cu focus pe forma, textura și identitatea vizuală a produselor. Am construit un setup de studio minimalist, folosind lumină controlată și compoziții curate pentru a pune produsele în prim-plan și a păstra estetica brandului.",
    narrativeEn:
      "A series of commercial images created for 99% Beauty, focusing on product form, texture, and visual identity. Designed around a minimalist studio setup with precise lighting and clean compositions to keep the products front and center while upholding the brand's aesthetic.",
    gallery: [
      "/portfolio/beauty-editorial/99beauty__3_.webp",
      "/portfolio/beauty-editorial/99beauty__2_.webp",
      "/portfolio/beauty-editorial/99beauty_1_.webp",
      "/portfolio/beauty-editorial/99beauty__4_.webp",
      "/portfolio/beauty-editorial/99beauty__5_.webp",
      "/portfolio/beauty-editorial/99beauty__6_.webp",
    ],
  },

  // ── 02 Alex Măcelărie ──
  {
    slug: "alex-macelarie",
    index: "02",
    title: "Alex Măcelărie",
    client: "Măcelăria Alex",
    category: "Reclamă & Brand",
    year: "2025",
    role: "Fotografie Culinară & Motion Comercial",
    cover: "/portfolio/alex-macelarie/P1010164-1.webp",
    video: "/portfolio/alex-macelarie/macelarie-noua2_iris2.mp4",
    heroLandscape: "/portfolio/alex-macelarie/P1010164-1.webp",
    narrative:
      "O serie de materiale foto și video create pentru lansarea Măcelăriei Alex, de la primele cadre ale spațiului și produselor până la energia zilei de deschidere. Am construit un conținut vizual dinamic, gândit pentru promovarea brandului și pentru a transforma atmosfera lansării în materiale care continuă să atragă atenția și după deschidere.",
    narrativeEn:
      "A photo and video series created for the launch of Măcelăria Alex, capturing everything from initial interior and product shots to the vibrant energy of opening day. Crafted as dynamic visual content to build brand presence and turn launch-day momentum into lasting marketing assets.",
    gallery: [
      "/portfolio/alex-macelarie/P1010164-1.webp",
      "/portfolio/alex-macelarie/P1010154-1.webp",
      "/portfolio/alex-macelarie/macelarie-noua2_iris2.mp4",
      "/portfolio/alex-macelarie/P1010201-1.webp",
      "/portfolio/alex-macelarie/P1010241-1.webp",
      "/portfolio/alex-macelarie/alex-teaser11_prob4.mp4",
      "/portfolio/alex-macelarie/P1010304-1.webp",
      "/portfolio/alex-macelarie/P1010440-1.webp",
      "/portfolio/alex-macelarie/macelarie-noua_iris2.mp4",
      "/portfolio/alex-macelarie/P1010447-1.webp",
      "/portfolio/alex-macelarie/P1010466-1.webp",
      "/portfolio/alex-macelarie/P1010676-1.webp",
      "/portfolio/alex-macelarie/P1010706-1.webp",
    ],
  },

  // ── 03 Alex Restaurant ──
  {
    slug: "alex-restaurant",
    index: "03",
    title: "Alex Restaurant",
    client: "Alex Restaurant",
    category: "Culinar",
    year: "2026",
    role: "Fotografie Culinară & Video Promo",
    cover: "/portfolio/alex-restaurant/Grillhouse2-5.webp",
    video: "/portfolio/alex-restaurant/alex-video2_iris2.mp4",
    heroLandscape: "/portfolio/alex-restaurant/Grillhouse2-5.webp",
    narrative:
      "Proiect vizual realizat pentru Alex Restaurant, cu focus pe fotografie culinară și materiale promoționale dedicate comunicării brandului. Am creat imagini de prezentare pentru preparatele din meniu, alături de conținut vizual conceput pentru promovarea restaurantului și a ofertei sale.",
    narrativeEn:
      "Visual project produced for Alex Restaurant, focusing on culinary photography and promotional media for brand communications. Features signature menu presentations alongside tailored visual content created to elevate the restaurant's presence and promotional campaigns.",
    gallery: [
      "/portfolio/alex-restaurant/Grillhouse2-5.webp",
      "/portfolio/alex-restaurant/Alex-MICDEJUN-122.webp",
      "/portfolio/alex-restaurant/alex-video2_iris2.mp4",
      "/portfolio/alex-restaurant/Alex-MICDEJUN-127.webp",
      "/portfolio/alex-restaurant/Grillhouse2-6.webp",
      "/portfolio/alex-restaurant/anunt.mp4",
      "/portfolio/alex-restaurant/Alex-MICDEJUN-68.webp",
      "/portfolio/alex-restaurant/Alex-MICDEJUN-69.webp",
      "/portfolio/alex-restaurant/Grillhouse2-9.webp",
      "/portfolio/alex-restaurant/Alex-MICDEJUN-84.webp",
      "/portfolio/alex-restaurant/Alex-MICDEJUN-85.webp",
    ],
  },

  // ── 04 BCRacing Europe ──
  {
    slug: "bcracing-europe",
    index: "04",
    title: "BCRacing Europe",
    client: "BCRacing",
    category: "Auto",
    year: "2024",
    role: "Fotografie Auto & Tehnică",
    cover: "/portfolio/bcracing-europe/DSC02745-Enhanced-NR.webp",
    heroLandscape: "/portfolio/bcracing-europe/DSC02745-Enhanced-NR.webp",
    narrative:
      "Serie de imagini auto realizate pentru BCRacing Europe, ulterior featured de mai multe ori pe pagina oficială de Instagram. Fotografiile au fost utilizate ca materiale promoționale pentru promovarea suspensiilor și în campanii desfășurate de brand.",
    narrativeEn:
      "Automotive photo series produced for BCRacing Europe, subsequently featured across their official Instagram channels. The images served as key promotional assets for performance suspension campaigns.",
    gallery: [
      "/portfolio/bcracing-europe/DSC02745-Enhanced-NR.webp",
      "/portfolio/bcracing-europe/DSC02710-Enhanced-NR.webp",
      "/portfolio/bcracing-europe/DSC03828-Enhanced-NR.webp",
      "/portfolio/bcracing-europe/DSC03839-Enhanced-NR.webp",
      "/portfolio/bcracing-europe/DSC02598-Enhanced-NR.webp",
      "/portfolio/bcracing-europe/DSC03819-Enhanced-NR.webp",
    ],
  },

  // ── 05 BMW România ──
  {
    slug: "bmw-romania",
    index: "05",
    title: "BMW România",
    client: "BMW Romania",
    category: "Auto",
    year: "2023",
    role: "Fotografie Comercială & Regie",
    cover: "/portfolio/bmw-romania/DSC043461_1.webp",
    heroLandscape: "/portfolio/bmw-romania/DSC042801.webp",
    narrative:
      "Serie de imagini auto preluată și publicată în repetate rânduri pe paginile oficiale BMW România. Cadrele au fost utilizate ca material vizual pentru promovarea modelelor și comunicarea brandului în social media.",
    narrativeEn:
      "Automotive photo series acquired and frequently published across BMW Romania's official channels. The imagery served as core visual material for vehicle promotion and social media brand communications.",
    gallery: [
      "/portfolio/bmw-romania/DSC042801.webp",
      "/portfolio/bmw-romania/DSC043461_1.webp",
      "/portfolio/bmw-romania/DSC044011.webp",
      "/portfolio/bmw-romania/DSC043841_1.webp",
      "/portfolio/bmw-romania/DSC044102.webp",
      "/portfolio/bmw-romania/DSC044472.webp",
      "/portfolio/bmw-romania/DSC044702_1.webp",
      "/portfolio/bmw-romania/DSC044822_1.webp",
      "/portfolio/bmw-romania/DSC045272.webp",
      "/portfolio/bmw-romania/DSC045312.webp",
      "/portfolio/bmw-romania/DSC045511.jpg-curat.webp",
      "/portfolio/bmw-romania/DSC045581-curat.webp",
      "/portfolio/bmw-romania/DSC045652.webp",
    ],
  },

  // ── 06 Dentoart Clinic ──
  {
    slug: "dentoart-clinic",
    index: "06",
    title: "Dentoart Clinic",
    client: "Dentoart",
    category: "Clinică Dentară",
    year: "2026",
    role: "Fotografie Comercială & Medicală",
    cover: "/portfolio/dentoart-clinic/DentoArt-1.webp",
    heroLandscape: "/portfolio/dentoart-clinic/DentoArt-1.webp",
    narrative:
      "Fotografii realizate pentru clinica Dentoart, destinate utilizării în materialele media și pe website. Imagini naturale și profesioniste, construite pentru a susține comunicarea vizuală și identitatea clinicii.",
    narrativeEn:
      "Commercial photography created for Dentoart Clinic, crafted for website and promotional media use. Natural, polished imagery designed to strengthen the clinic's visual communication and brand identity.",
    gallery: [
      "/portfolio/dentoart-clinic/DentoArt-1.webp",
      "/portfolio/dentoart-clinic/DentoArt-4.webp",
      "/portfolio/dentoart-clinic/DentoArt-19.webp",
    ],
  },

  // ── 07 Famous Chicken ──
  {
    slug: "famous-chicken",
    index: "07",
    title: "Famous Chicken",
    client: "Famous Chicken",
    category: ["Reclamă & Brand", "Culinar"],
    year: "2025",
    role: "Fotografie Culinară & Reclame Social Media",
    cover: "/portfolio/famous-chicken/DSC054922_1.webp",
    video: "/portfolio/famous-chicken/famous-reclama112_prob4.mp4",
    heroLandscape: "/portfolio/famous-chicken/DSC054922_1.webp",
    narrative:
      "Materiale foto-video realizate pentru Famous Chicken, dedicate promovării pe social media. Conținut culinar și materiale de tip ads, cu focus pe produse și pe o prezentare vizuală atractivă, adaptată comunicării digitale a brandului.",
    narrativeEn:
      "Photo and video assets created for Famous Chicken's social media marketing. Culinary content and digital ad creative focused on product appeal and engaging visual presentation tailored for brand campaigns.",
    gallery: [
      "/portfolio/famous-chicken/DSC054922_1.webp",
      "/portfolio/famous-chicken/famous-reclama112_prob4.mp4",
      "/portfolio/famous-chicken/DSC055242_2.webp",
      "/portfolio/famous-chicken/famous-arcade_6_prob4.mp4",
      "/portfolio/famous-chicken/famous_reclamao_prob4.mp4",
    ],
  },

  // ── 08 Formula Xperience ──
  {
    slug: "formula-xperience",
    index: "08",
    title: "Formula Xperience",
    client: "Formula Xperience",
    category: "Auto",
    year: "2026",
    role: "Motion pe Circuit & Fotografie de Mare Viteză",
    cover: "/portfolio/formula-xperience/P10685322_2.webp",
    video: "/portfolio/formula-xperience/orizontal-portofoliu.mp4",
    heroLandscape: "/portfolio/formula-xperience/P1068258_HDR2.webp",
    narrative:
      "Conținut foto-video creat de la zero pentru Formula Xperience, înainte de lansarea conceptului. Am construit direcția vizuală a proiectului prin fotografie de acțiune și producție video pe circuit, punând bazele imaginii brandului încă din etapa de pre-lansare.",
    narrativeEn:
      "Photo and video content created from scratch for Formula Xperience prior to its official launch. Built the visual foundation of the concept through high-speed track action photography and video production.",
    gallery: [
      "/portfolio/formula-xperience/orizontal-portofoliu.mp4",
      "/portfolio/formula-xperience/linkinbio_final.mp4",
      "/portfolio/formula-xperience/P1068258_HDR2.webp",
      "/portfolio/formula-xperience/P1068266_HDR12_2.webp",
      "/portfolio/formula-xperience/P1068284_HDR2.webp",
      "/portfolio/formula-xperience/P1068330_HDR2_1.webp",
      "/portfolio/formula-xperience/P10683472_2.webp",
      "/portfolio/formula-xperience/P10683702.webp",
      "/portfolio/formula-xperience/P10683902_1.webp",
      "/portfolio/formula-xperience/P10683932.webp",
      "/portfolio/formula-xperience/P10683962_1.webp",
      "/portfolio/formula-xperience/P10684942.webp",
      "/portfolio/formula-xperience/P10685062.webp",
      "/portfolio/formula-xperience/P10685122.webp",
      "/portfolio/formula-xperience/P10685172.webp",
      "/portfolio/formula-xperience/P10685212.webp",
      "/portfolio/formula-xperience/P10685252.webp",
      "/portfolio/formula-xperience/P10685322_2.webp",
      "/portfolio/formula-xperience/P10685902.webp",
      "/portfolio/formula-xperience/P10686012.webp",
    ],
  },

  // ── 09 Harmonie Cafe ──
  {
    slug: "harmonie-cafe",
    index: "09",
    title: "Harmonie Cafe",
    client: "Harmonie Cafe",
    category: ["Reclamă & Brand", "Produs"],
    year: "2025",
    role: "Fotografie Comercială de Produs & Motion",
    cover: "/portfolio/harmonie-cafe/DSC02158-Enhanced-NR-Edit.webp",
    video: "/portfolio/harmonie-cafe/vid-cin-2.mp4",
    heroLandscape: "/portfolio/harmonie-cafe/DSC01961-Edit-Edit.webp",
    narrative:
      "Proiect foto-video dezvoltat de la zero pentru Harmonie Cafe, încă din etapa de lansare. Am construit direcția vizuală a brandului și am gestionat conținutul foto-video pentru comunicarea și promovarea cafenelei, de la primele materiale până la imaginea prezentată în social media.",
    narrativeEn:
      "Comprehensive photo and video project developed for Harmonie Cafe from its pre-launch stage. Established the brand's visual identity and crafted all media content for café promotion across digital and social channels.",
    gallery: [
      "/portfolio/harmonie-cafe/DSC01961-Edit-Edit.webp",
      "/portfolio/harmonie-cafe/vid-cin-2.mp4",
      "/portfolio/harmonie-cafe/DSC01989-Enhanced-NR-Edit.webp",
      "/portfolio/harmonie-cafe/Timeline_2_prob4.mp4",
      "/portfolio/harmonie-cafe/DSC02051-Enhanced-NR-Edit.webp",
      "/portfolio/harmonie-cafe/Timeline_6_prob4.mp4",
      "/portfolio/harmonie-cafe/DSC02124-Enhanced-NR-Edit.webp",
      "/portfolio/harmonie-cafe/DSC02158-Enhanced-NR-Edit.webp",
      "/portfolio/harmonie-cafe/DSC02178-Enhanced-NR-Edit.webp",
    ],
  },

  // ── 10 MAPET-TUNING airRIDE ──
  {
    slug: "mapet-tuning-airride",
    index: "10",
    title: "MAPET-TUNING airRIDE",
    client: "Mapet Tuning",
    category: "Auto",
    year: "2025",
    role: "Fotografie Auto & Detaliu Tehnic",
    cover: "/portfolio/mapet-tuning-airride/DSC09200-Enhanced-NR.webp",
    heroLandscape: "/portfolio/mapet-tuning-airride/DSC09200-Enhanced-NR.webp",
    narrative:
      "Fotografii auto realizate pentru Mapet Tuning Airride, ulterior preluate și featured de brand în postări de social media. Imaginile au fost folosite ca material promoțional pentru prezentarea proiectului și a sistemului de suspensie AirRide.",
    narrativeEn:
      "Automotive photography produced for Mapet Tuning Airride, subsequently acquired and featured across official social media channels to highlight the custom build and AirRide suspension setup.",
    gallery: [
      "/portfolio/mapet-tuning-airride/DSC09200-Enhanced-NR.webp",
      "/portfolio/mapet-tuning-airride/DSC09209-Enhanced-NR.webp",
      "/portfolio/mapet-tuning-airride/DSC09217-Enhanced-NR.webp",
      "/portfolio/mapet-tuning-airride/DSC09218-Enhanced-NR.webp",
      "/portfolio/mapet-tuning-airride/DSC09227-Enhanced-NR.webp",
      "/portfolio/mapet-tuning-airride/DSC09265-Enhanced-NR.webp",
      "/portfolio/mapet-tuning-airride/DSC09272-Enhanced-NR.webp",
      "/portfolio/mapet-tuning-airride/DSC09275-Enhanced-NR.webp",
      "/portfolio/mapet-tuning-airride/DSC09277-Enhanced-NR.webp",
    ],
  },

  // ── 11 Mazda România ──
  {
    slug: "mazda-romania",
    index: "11",
    title: "Mazda România",
    client: "Mazda Romania",
    category: "Auto",
    year: "2025",
    role: "Fotografie Comercială",
    cover: "/portfolio/mazda-romania/DSC07935-Enhanced-NR.webp",
    heroLandscape: "/portfolio/mazda-romania/DSC07935-Enhanced-NR.webp",
    narrative:
      "Fotografii auto ulterior preluate și publicate pe canalele oficiale de social media ale Mazda România. Cadrele au fost utilizate ca material vizual pentru promovarea modelelor și comunicarea brandului.",
    narrativeEn:
      "Automotive photo series acquired and published across Mazda Romania's official social media channels, highlighting key models and supporting brand marketing.",
    gallery: [
      "/portfolio/mazda-romania/DSC07935-Enhanced-NR.webp",
      "/portfolio/mazda-romania/DSC07938-Enhanced-NR.webp",
      "/portfolio/mazda-romania/DSC07951-Enhanced-NR.webp",
      "/portfolio/mazda-romania/DSC07970-Enhanced-NR.webp",
      "/portfolio/mazda-romania/DSC07971-Enhanced-NR.webp",
    ],
  },

  // ── 12 Motorpark România ──
  {
    slug: "motorpark-romania",
    index: "12",
    title: "Motorpark România",
    client: "Motorpark",
    category: "Auto",
    year: "2024",
    role: "Fotografie de Acțiune pe Circuit",
    cover: "/portfolio/motorpark-romania/BMW_74_.webp",
    heroLandscape: "/portfolio/motorpark-romania/BMW_74_.webp",
    narrative:
      "Fotografii de motorsport preluate și publicate de MotorPark România, utilizate ca material vizual pentru promovarea evenimentelor și activității de pe circuit.",
    narrativeEn:
      "Motorsport photography acquired and published by MotorPark Romania, used as key visual material for promoting track events and circuit activities.",
    gallery: [
      "/portfolio/motorpark-romania/BMW_74_.webp",
      "/portfolio/motorpark-romania/BMW_75_.webp",
      "/portfolio/motorpark-romania/BMW_76_.webp",
      "/portfolio/motorpark-romania/1.webp",
      "/portfolio/motorpark-romania/2.webp",
      "/portfolio/motorpark-romania/4.webp",
      "/portfolio/motorpark-romania/DSC04925-Enhanced-NR.webp",
      "/portfolio/motorpark-romania/DSC05427-Enhanced-NR2.webp",
    ],
  },

  // ── 13 Nespresso ──
  {
    slug: "nespresso",
    index: "13",
    title: "Nespresso",
    client: "Nespresso",
    category: "Reclamă & Brand",
    year: "2026",
    role: "Reclamă Video de Produs Comercial",
    cover: "/portfolio/nespresso/nespresso-final.mp4",
    video: "/portfolio/nespresso/nespresso-final.mp4",
    heroLandscape: "/portfolio/nespresso/nespresso-hero.jpg",
    narrative:
      "Material video realizat pe baza unui brief pentru Nespresso Vertuo World Influencers, conceput pentru participarea la concurs. Clipul a urmărit cerințele campaniei, dezvoltând brief-ul într-un format vizual adaptat competiției.",
    narrativeEn:
      "Commercial video produced from a creative brief for Nespresso Vertuo World Influencers as a contest submission. Designed to align with campaign guidelines while crafting a distinctive visual format for the competition.",
    gallery: ["/portfolio/nespresso/nespresso-final.mp4"],
  },

  // ── 14 Raliw Forged Wheels ──
  {
    slug: "raliw-forged-wheels",
    index: "14",
    title: "Raliw Forged Wheels",
    client: "Raliw Wheels",
    category: "Auto",
    year: "2025",
    role: "Fotografie de Produs & Auto",
    cover: "/portfolio/raliw-forged-wheels/DSC09061-Enhanced-NR.webp",
    heroLandscape: "/portfolio/raliw-forged-wheels/DSC09061-Enhanced-NR.webp",
    narrative:
      "Fotografii cu jantele forjate Raliw Wheels, preluate și publicate de brand ca material vizual pentru comunicarea și promovarea produselor pe canalele de social media.",
    narrativeEn:
      "Product photography of Raliw Forged Wheels, acquired and published by the brand for product promotion and social media marketing.",
    gallery: [
      "/portfolio/raliw-forged-wheels/DSC09061-Enhanced-NR.webp",
      "/portfolio/raliw-forged-wheels/DSC09078-Enhanced-NR.webp",
      "/portfolio/raliw-forged-wheels/DSC09079-Enhanced-NR.webp",
      "/portfolio/raliw-forged-wheels/DSC09085-Enhanced-NR.webp",
      "/portfolio/raliw-forged-wheels/DSC09087-Enhanced-NR.webp",
    ],
  },

  // ── 15 Royal Pizza ──
  {
    slug: "royal-pizza",
    index: "15",
    title: "Royal Pizza",
    client: "Royal Pizza",
    category: "Culinar",
    year: "2025",
    role: "Fotografie Culinară",
    cover: "/portfolio/royal-pizza/royal__5_.webp",
    heroLandscape: "/portfolio/royal-pizza/royal__11_.webp",
    narrative:
      "Material foto realizat pentru Royal Pizza, destinat promovării pe social media și în campanii de marketing. Cadre culinare concepute pentru a evidenția produsele și identitatea vizuală a brandului.",
    narrativeEn:
      "Commercial food photography produced for Royal Pizza for social media and marketing campaigns, designed to highlight dish aesthetics and brand identity.",
    gallery: [
      "/portfolio/royal-pizza/royal__5_.webp",
      "/portfolio/royal-pizza/royal__11_.webp",
      "/portfolio/royal-pizza/royal__2_.webp",
    ],
  },

  // ── 16 Toyota Brăila ──
  {
    slug: "toyota-braila",
    index: "16",
    title: "Toyota Brăila",
    client: "Toyota",
    category: "Auto",
    year: "2025",
    role: "Fotografie Comercială",
    cover: "/portfolio/toyota-braila/DSC03312.webp",
    heroLandscape: "/portfolio/toyota-braila/DSC03435_v3-Recovered-6.webp",
    narrative:
      "Ședință foto realizată special pentru reprezentanța Toyota Brăila. Materialele rezultate au fost publicate ulterior pe pagina oficială Toyota Brăila.",
    narrativeEn:
      "Commercial photoshoot produced specifically for the Toyota Brăila dealership, subsequently published on Toyota Brăila's official channels.",
    gallery: [
      "/portfolio/toyota-braila/DSC03312.webp",
      "/portfolio/toyota-braila/DSC03339.webp",
      "/portfolio/toyota-braila/DSC03435_v3-Recovered-6.webp",
      "/portfolio/toyota-braila/DSC03524.webp",
    ],
  },
];

/** Derive the poster image path for a video: `/x/video.mp4` → `/x/video.poster.jpg` */
export const videoPoster = (videoSrc: string) =>
  videoSrc.replace(/\.mp4$/i, ".poster.jpg");

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);
export const nextProject = (slug: string) => {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  return PROJECTS[(i + 1) % PROJECTS.length];
};