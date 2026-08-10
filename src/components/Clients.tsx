import { Reveal } from "@/components/Reveal";

// TODO: replace with the real client list
const CLIENTS = [
  "BMW",
  "Mazda",
  "Motorpark",
  "Nespresso",
  "Client Five",
  "Client Six",
  "Client Seven",
  "Client Eight",
];

export function Clients() {
  return (
    <section id="clients" className="scroll-mt-24 overflow-hidden border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <Reveal>
          <p className="label text-muted-foreground">Selected Clients</p>
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