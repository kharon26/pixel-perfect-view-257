import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/context/LanguageContext";

const BRAND_LOGOS = [
  { src: "/logos/user-only/brand-logo-1.png", alt: "Nespresso", scale: "max-h-[85%] max-w-[95%]" },
  { src: "/logos/user-only/brand-logo-2.png", alt: "Măcelăria Alex", scale: "max-h-[85%] max-w-[95%]" },
  { src: "/logos/user-only/brand-logo-3.png", alt: "Alex Restaurant", scale: "max-h-[95%] max-w-[85%]" },
  { src: "/logos/user-only/brand-logo-4.png", alt: "Harmonie Cafe", scale: "max-h-[85%] max-w-[95%]" },
  { src: "/logos/user-only/brand-logo-5.png", alt: "BC Racing", scale: "max-h-[90%] max-w-[95%]" },
  { src: "/logos/user-only/brand-logo-6.png", alt: "Mazda", scale: "max-h-[85%] max-w-[95%]" },
  { src: "/logos/user-only/brand-logo-7.png", alt: "Raliw Forged Wheels", scale: "max-h-[80%] max-w-[98%]" },
  { src: "/logos/user-only/brand-logo-8.png", alt: "Famous Chicken", scale: "max-h-[95%] max-w-[80%]" },
  { src: "/logos/user-only/brand-logo-9.png", alt: "Royal Pizza", scale: "max-h-[80%] max-w-[98%]" },
];

export function Clients() {
  const { lang } = useLanguage();

  return (
    <section id="clients" className="scroll-mt-24 overflow-hidden border-t border-border py-16 md:py-24">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 mb-8">
        <Reveal>
          <p className="label text-muted-foreground font-semibold tracking-widest uppercase text-xs">
            {lang === "RO" ? "Clienți & Colaboratori" : "Clients & Collaborators"}
          </p>
        </Reveal>
      </div>

      <div className="flex w-max marquee-track items-center">
        {[0, 1].map((dup) => (
          <ul
            key={dup}
            className="flex shrink-0 items-center gap-2.5 md:gap-16 pr-2.5 md:pr-16"
            aria-hidden={dup === 1}
          >
            {BRAND_LOGOS.map((logo, i) => (
              <li
                key={i}
                className="flex w-36 h-24 md:w-64 md:h-32 shrink-0 items-center justify-center opacity-90 hover:opacity-100 transition-opacity duration-300"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className={`w-auto h-auto object-contain ${logo.scale}`}
                  loading="eager"
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}