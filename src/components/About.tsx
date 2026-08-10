import portrait from "@/assets/portrait.jpg";
import { Reveal } from "@/components/Reveal";

export function About() {
  return (
    <section id="about" className="scroll-mt-24 border-t border-border py-24 md:py-36">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 px-6 md:grid-cols-12 md:px-10">
        <Reveal className="md:col-span-5">
          {/* TODO: replace with the real portrait */}
          <img
            src={portrait}
            alt="Black and white portrait of the photographer, half in shadow"
            loading="lazy"
            width={1200}
            height={1500}
            className="aspect-[4/5] w-full object-cover grayscale"
          />
        </Reveal>

        <div className="md:col-span-6 md:col-start-7">
          <Reveal>
            <p className="label text-accent">About</p>
            <h2 className="display mt-6 text-[clamp(2.25rem,6vw,5rem)]">
              Light first,
              <br />
              everything else after
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Twelve years shooting commercial work across Europe — most of it after dark. I build
              images the way a set gets lit: one decision at a time, nothing in frame that isn't
              earning its place.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <dl className="mt-12 grid grid-cols-1 gap-x-10 gap-y-6 border-t border-border pt-8 sm:grid-cols-2">
              {[
                ["Approach", "Pre-light, shoot tight, grade cold. Small crews."],
                ["Bodies", "Sony FX3 · A7R V · Phase One IQ4"],
                ["Glass", "Zeiss Supreme Primes · Laowa Probe"],
                ["Based", "Bucharest — working worldwide"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="label text-muted-foreground">{k}</dt>
                  <dd className="mt-2 text-sm leading-relaxed">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}