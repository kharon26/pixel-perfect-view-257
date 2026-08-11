// ─────────────────────────────────────────────────────────────
// PROJECT DATA — Curated Editorial Galleries (George Roșu)
// ─────────────────────────────────────────────────────────────

export const CATEGORIES = [
  "Auto",
  "Auto & Comercial",
  "Comercial / Clinică",
  "Comercial / Produs",
  "Fotografie de produs",
  "Mâncare & Comercial",
] as const;

export type Category = string;

export type Project = {
  slug: string;
  index: string;
  title: string;
  client: string;
  category: Category;
  year: string;
  role: string;
  cover: string;
  heroLandscape?: string;
  narrative: string;
  narrativeEn: string;
  gallery: string[];
  video?: string;
};

export const getCategoryLabel = (cat: string, lang: "RO" | "EN" = "RO") => {
  if (lang === "RO") return cat;
  switch (cat) {
    case "Toate":
      return "All";
    case "Auto":
      return "Automotive";
    case "Auto & Comercial":
      return "Automotive & Commercial";
    case "Comercial":
      return "Commercial";
    case "Comercial / Clinică":
      return "Commercial / Medical";
    case "Comercial / Produs":
      return "Commercial / Product";
    case "Fotografie de produs":
      return "Product Photography";
    case "Mâncare & Comercial":
      return "Food & Commercial";
    default:
      return cat;
  }
};

export const getRoleLabel = (role: string, lang: "RO" | "EN" = "RO") => {
  if (lang === "EN") return role;
  switch (role) {
    case "Commercial & Product Photography":
      return "Fotografie Comercială & Produs";
    case "Commercial Food Photography & Motion":
      return "Fotografie Culinară & Motion Comercial";
    case "Food Photography & Promo Videos":
      return "Fotografie Culinară & Video Promo";
    case "Automotive & Technical Photography":
      return "Fotografie Auto & Tehnică";
    case "Commercial Photography & Direction":
      return "Fotografie Comercială & Regie";
    case "Commercial & Medical Photography":
      return "Fotografie Comercială & Medicală";
    case "Food Photography & Social Ads":
      return "Fotografie Culinară & Reclame Social Media";
    case "Track Motion & High-Speed Photography":
      return "Motion pe Circuit & Fotografie de Mare Viteză";
    case "Commercial Product & Motion":
      return "Fotografie Comercială de Produs & Motion";
    case "Automotive Feature Photography":
      return "Fotografie Auto & Detaliu Tehnic";
    case "Commercial Photography":
      return "Fotografie Comercială";
    case "Track Action Photography":
      return "Fotografie de Acțiune pe Circuit";
    case "Commercial Product Motion":
      return "Reclamă Video de Produs Comercial";
    case "Product & Automotive Photography":
      return "Fotografie de Produs & Auto";
    case "Food Photography":
      return "Fotografie Culinară";
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
    category: "Fotografie de produs",
    year: "2026",
    role: "Commercial & Product Photography",
    cover: "/portfolio/beauty-editorial/99beauty__3_.webp",
    heroLandscape: "/portfolio/beauty-editorial/99beauty__3_.webp",
    narrative:
      "Proiect foto editorial realizat pentru brandul de cosmetică 99% Beauty. O abordare minimalistă axată pe claritatea formelor, textura produselor și o iluminare precisă de studio.",
    narrativeEn:
      "Editorial product photography created for the 99% Beauty cosmetics brand. A minimalist approach focusing on clean geometry, product texture, and precise studio lighting.",
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
    category: "Mâncare & Comercial",
    year: "2025",
    role: "Commercial Food Photography & Motion",
    cover: "/portfolio/alex-macelarie/P1010164-1.webp",
    video: "/portfolio/alex-macelarie/macelarie-noua2_iris2.mp4",
    heroLandscape: "/portfolio/alex-macelarie/P1010164-1.webp",
    narrative:
      "Campanie foto și video comercială realizată pentru Măcelăria Alex. Documentarea vizuală a produselor artizanale și a procesului de pregătire, într-o estetică curată și autentică.",
    narrativeEn:
      "Commercial photo and video campaign produced for Măcelăria Alex. Visual documentation of artisanal products and preparation processes with a clean, authentic aesthetic.",
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
    category: "Mâncare & Comercial",
    year: "2023",
    role: "Food Photography & Promo Videos",
    cover: "/portfolio/alex-restaurant/Grillhouse2-5.webp",
    video: "/portfolio/alex-restaurant/alex-video2_iris2.mp4",
    heroLandscape: "/portfolio/alex-restaurant/Grillhouse2-5.webp",
    narrative:
      "Proiect vizual integrat pentru Alex Restaurant, cuprinzând fotografie culinară și materiale video promoționale. Accent pe prospețimea ingredientelor și prezentarea preparatelor de meniu.",
    narrativeEn:
      "Integrated visual project for Alex Restaurant featuring food photography and promotional video assets. Focused on ingredient freshness and refined menu presentation.",
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
    year: "2025",
    role: "Automotive & Technical Photography",
    cover: "/portfolio/bcracing-europe/DSC03819-Enhanced-NR.webp",
    heroLandscape: "/portfolio/bcracing-europe/DSC02598-Enhanced-NR.webp",
    narrative:
      "Ședință foto comercială dedicată suspensiilor de performanță BCRacing. Imagini tehnice de produs și cadre pe vehicul dinamic, evidențiind ingineria și detaliile de construcție.",
    narrativeEn:
      "Commercial photography project dedicated to BCRacing performance suspensions. Technical product imagery and dynamic vehicle shots showcasing engineering details.",
    gallery: [
      "/portfolio/bcracing-europe/DSC02598-Enhanced-NR.webp",
      "/portfolio/bcracing-europe/DSC03819-Enhanced-NR.webp",
      "/portfolio/bcracing-europe/DSC02710-Enhanced-NR.webp",
      "/portfolio/bcracing-europe/DSC02745-Enhanced-NR.webp",
      "/portfolio/bcracing-europe/DSC03828-Enhanced-NR.webp",
      "/portfolio/bcracing-europe/DSC03839-Enhanced-NR.webp",
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
    role: "Commercial Photography & Direction",
    cover: "/portfolio/bmw-romania/DSC043461_1.webp",
    heroLandscape: "/portfolio/bmw-romania/DSC042801.webp",
    narrative:
      "Serie foto editorială realizată pentru BMW România. Cadre nocturne și de studio construite pentru a scoate în evidență liniile de design ale caroseriei și lumina dramatică.",
    narrativeEn:
      "Editorial photo series produced for BMW Romania. Nighttime and studio setups designed to highlight dynamic body contours and dramatic lighting contrast.",
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
    category: "Comercial / Clinică",
    year: "2026",
    role: "Commercial & Medical Photography",
    cover: "/portfolio/dentoart-clinic/DentoArt-1.webp",
    heroLandscape: "/portfolio/dentoart-clinic/DentoArt-1.webp",
    narrative:
      "Fotografie de brand și arhitectură de interior pentru clinica stomatologică Dentoart. Cadre luminoase și compoziții echilibrate care reflectă standardul profesional al clinicii.",
    narrativeEn:
      "Brand and interior architecture photography for Dentoart dental clinic. Bright imagery and balanced compositions reflecting the clinic's professional standard.",
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
    category: "Mâncare & Comercial",
    year: "2025",
    role: "Food Photography & Social Ads",
    cover: "/portfolio/famous-chicken/DSC054922_1.webp",
    video: "/portfolio/famous-chicken/famous-reclama112_prob4.mp4",
    heroLandscape: "/portfolio/famous-chicken/DSC054922_1.webp",
    narrative:
      "Proiect foto-video dinamic destinat canalelor de comunicare Famous Chicken. Conținut vizual vibrant conceput pentru impact imediat și lizibilitate în mediul digital.",
    narrativeEn:
      "Dynamic photo-video project crafted for Famous Chicken brand communications. Vibrant visual assets designed for immediate digital engagement.",
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
    category: "Auto & Comercial",
    year: "2026",
    role: "Track Motion & High-Speed Photography",
    cover: "/portfolio/formula-xperience/P10685322_2.webp",
    video: "/portfolio/formula-xperience/orizontal-portofoliu.mp4",
    heroLandscape: "/portfolio/formula-xperience/P1068258_HDR2.webp",
    narrative:
      "Proiect vizual realizat pe circuitul de curse pentru Formula Xperience. Producție video de mare viteză și fotografie de acțiune ce surprind dinamica monoposturilor.",
    narrativeEn:
      "Trackside visual production for Formula Xperience. High-speed video capture and action photography documenting single-seater dynamics.",
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
    category: "Comercial / Produs",
    year: "2025",
    role: "Commercial Product & Motion",
    cover: "/portfolio/harmonie-cafe/DSC02158-Enhanced-NR-Edit.webp",
    video: "/portfolio/harmonie-cafe/vid-cin-2.mp4",
    heroLandscape: "/portfolio/harmonie-cafe/DSC01961-Edit-Edit.webp",
    narrative:
      "Identitate vizuală foto-video creată pentru Harmonie Cafe. O estetică caldă, centrată pe băuturile de specialitate, deserturile artizanale și atmosfera spațiului.",
    narrativeEn:
      "Photo and video asset creation for Harmonie Cafe. A warm aesthetic highlighting specialty beverages, artisanal desserts, and ambient space design.",
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
    role: "Automotive Feature Photography",
    cover: "/portfolio/mapet-tuning-airride/DSC09200-Enhanced-NR.webp",
    heroLandscape: "/portfolio/mapet-tuning-airride/DSC09200-Enhanced-NR.webp",
    narrative:
      "Ședință foto de portofoliu realizată pentru un proiect Corvette echipată cu suspensie pneumatică AirRide. Focus pe detaliile tehnice și postura vehiculului.",
    narrativeEn:
      "Portfolio photography featuring a Corvette build equipped with AirRide air suspension. Highlighting technical modifications and vehicle stance.",
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
    role: "Commercial Photography",
    cover: "/portfolio/mazda-romania/DSC07935-Enhanced-NR.webp",
    heroLandscape: "/portfolio/mazda-romania/DSC07935-Enhanced-NR.webp",
    narrative:
      "Fotografie comercială outdoor realizată pentru Mazda România. Cadre în mediu natural care subliniază reflexiile caroseriei și filosofia de design Kodo.",
    narrativeEn:
      "Outdoor commercial photography created for Mazda Romania. Natural environment settings underscoring body reflections and Kodo design aesthetics.",
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
    role: "Track Action Photography",
    cover: "/portfolio/motorpark-romania/BMW_74_.webp",
    heroLandscape: "/portfolio/motorpark-romania/BMW_74_.webp",
    narrative:
      "Fotografie de motorsport realizată în cadrul evenimentelor de pe circuitul Motorpark România. Cadre de acțiune în viraje și momente cheie de pe pistă.",
    narrativeEn:
      "Motorsport photography captured during events at the Motorpark Romania circuit. High-speed cornering shots and key trackside moments.",
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
    category: "Comercial / Produs",
    year: "2026",
    role: "Commercial Product Motion",
    cover: "/portfolio/nespresso/nespresso-final.mp4",
    video: "/portfolio/nespresso/nespresso-final.mp4",
    heroLandscape: "/portfolio/nespresso/nespresso-final.mp4",
    narrative:
      "Proiect video comercial dezvoltat pentru Nespresso, axat pe evidențierea detaliilor fine și a ritualului espresso. Detalii macro fluide, reflexii de lumină controlate și o estetică vizuală minimalistă care reflectă caracterul premium al brandului.",
    narrativeEn:
      "A commercial video project created for Nespresso, highlighting fine details and the espresso ritual. Smooth macro shots, controlled light reflections, and a minimalist aesthetic capturing the brand's premium identity.",
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
    role: "Product & Automotive Photography",
    cover: "/portfolio/raliw-forged-wheels/DSC09061-Enhanced-NR.webp",
    heroLandscape: "/portfolio/raliw-forged-wheels/DSC09061-Enhanced-NR.webp",
    narrative:
      "Fotografie tehnică de produs și integrare pe automobil pentru jantele forjate Raliw Wheels. Evidențierea texturilor din aluminiu și a detaliilor de finisaj.",
    narrativeEn:
      "Technical product and automotive photography for Raliw Forged Wheels. Highlighting aluminum craftsmanship, surface textures, and custom wheel finishes.",
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
    category: "Mâncare & Comercial",
    year: "2025",
    role: "Food Photography",
    cover: "/portfolio/royal-pizza/royal__5_.webp",
    heroLandscape: "/portfolio/royal-pizza/royal__11_.webp",
    narrative:
      "Materiale foto promoționale realizate pentru Royal Pizza. Cadre de produs axate pe calitatea ingredientelor proaspete și textura preparatelor culinare.",
    narrativeEn:
      "Promotional product photography created for Royal Pizza. Focused on fresh ingredient quality, crust texture, and culinary presentation.",
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
    role: "Commercial Photography",
    cover: "/portfolio/toyota-braila/DSC03312.webp",
    heroLandscape: "/portfolio/toyota-braila/DSC03312.webp",
    narrative:
      "Ședință foto comercială realizată pentru Toyota Brăila. Imagini de portofoliu destinate prezentării spațiului de showroom și a noii game de modele hibride.",
    narrativeEn:
      "Commercial photography project executed for Toyota Brăila. Portfolio imagery designed for showroom presentation and the new hybrid lineup.",
    gallery: [
      "/portfolio/toyota-braila/DSC03312.webp",
      "/portfolio/toyota-braila/DSC03339.webp",
      "/portfolio/toyota-braila/DSC03435_v3-Recovered-6.webp",
      "/portfolio/toyota-braila/DSC03524.webp",
    ],
  },
];

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);
export const nextProject = (slug: string) => {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  return PROJECTS[(i + 1) % PROJECTS.length];
};