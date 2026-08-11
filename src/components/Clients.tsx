import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/context/LanguageContext";

const CLIENTS = [
  "99% Beauty",
  "Măcelăria Alex",
  "Alex Restaurant",
  "BCRacing Europe",
  "BMW România",
  "Dentoart Clinic",
  "Famous Chicken",
  "Formula Xperience",
  "Harmonie Cafe",
  "MAPET-TUNING airRIDE",
  "Mazda România",
  "Motorpark România",
  "Nespresso",
  "Raliw Forged Wheels",
  "Royal Pizza",
  "Toyota Brăila",
];

export function Clients() {
  const { lang } = useLanguage();

  return (
    <section id="clients" className="scroll-mt-24 overflow-hidden border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <Reveal>
          <p className="label text-muted-foreground">
            {lang === "RO" ? "Clienți & Colaboratori" : "Clients & Collaborators"}
          </p>
        </Reveal>
      </div>

      <div className="mt-10 flex w-max marquee-track">
        {[0, 1].map((dup) => (
          <ul key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
            {CLIENTS.map((c) => (
              <li
                key={c}
                className="whitespace-nowrap px-8 text-[clamp(2rem,5vw,4.5rem)] font-extralight uppercase tracking-tight text-muted-foreground"
              >
                {c}
                <span className="px-8 text-accent">·</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}