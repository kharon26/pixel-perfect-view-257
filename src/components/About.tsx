import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/context/LanguageContext";

export function About() {
  const { lang } = useLanguage();

  return (
    <section id="about" className="scroll-mt-24 border-t border-border bg-black text-white py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Title */}
          <Reveal className="md:col-span-5">
            <h2 className="display text-[clamp(2.75rem,8vw,7rem)] font-bold tracking-tight text-white uppercase leading-none">
              {lang === "RO" ? "CINE SUNT EU?" : "WHO AM I?"}
            </h2>
          </Reveal>

          {/* Bio text paragraphs matching user prompt */}
          <div className="md:col-span-7 md:col-start-6 space-y-8 text-base md:text-xl font-normal leading-relaxed text-neutral-300">
            <Reveal delay={60}>
              <p>
                {lang === "RO"
                  ? "Mă ocup de fotografie și videografie comercială. Specializat în automotive, food & product, dar extrem de versatil în toate domeniile."
                  : "I specialize in commercial photography and videography. Focused on automotive, food & product, yet highly versatile across all fields."}
              </p>
            </Reveal>

            <Reveal delay={120}>
              <p>
                {lang === "RO"
                  ? "Abordare cinematică, estetică minimalistă. Fiecare cadru construit strategic pentru a spune o poveste clară, fără zgomot vizual."
                  : "Cinematic approach, minimalist aesthetic. Every frame is strategically built to tell a clear story, without visual noise."}
              </p>
            </Reveal>

            <Reveal delay={180}>
              <p>
                {lang === "RO"
                  ? "Am fost featured de brand-uri precum BMW România, Mazda România, Motorpark România și am lucrat cu brand-uri locale care înțeleg valoarea unei imagini bine gândite."
                  : "Featured by brands such as BMW Romania, Mazda Romania, Motorpark Romania, working with clients who value well-crafted visuals."}
              </p>
            </Reveal>

            <Reveal delay={240}>
              <p className="font-medium text-white">
                {lang === "RO"
                  ? "Freelancer. Muncă bună, livrată la timp."
                  : "Freelancer. Great work, delivered on time."}
              </p>
            </Reveal>

            <Reveal delay={300}>
              <p>
                {lang === "RO"
                  ? "Pentru branduri care vor să iasă în față. Pentru oameni care știu că o imagine face diferența."
                  : "For brands aiming to stand out. For people who know a great image makes all the difference."}
              </p>
            </Reveal>

            <Reveal delay={360}>
              <div className="pt-4">
                <a
                  href="#contact"
                  className="inline-block border-b border-white text-white font-semibold text-lg md:text-xl hover:text-accent hover:border-accent transition-colors"
                >
                  {lang === "RO" ? "Hai să lucrăm" : "Let's work together"}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}