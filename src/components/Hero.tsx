import heroImage from "@/assets/hero.jpg";

// TODO: swap the still below for a looping showreel:
// <video src="/your-reel.mp4" autoPlay muted loop playsInline className="h-full w-full object-cover" />
export function Hero() {
  return (
    <section className="relative flex min-h-svh flex-col justify-end overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Photographer silhouetted in a dark studio under a single beam of warm light"
          width={1920}
          height={1080}
          className="h-full w-full origin-center animate-[pan_28s_ease-in-out_infinite_alternate] object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/70" />
      </div>

      <div className="relative mx-auto w-full max-w-[1600px] px-6 pb-16 md:px-10 md:pb-24">
        <p className="label mb-8 text-accent">Photography · Motion · Direction</p>
        <h1 className="display text-[clamp(3rem,13vw,11rem)]">
          Kai
          <br />
          <span className="ml-[8vw] block">Marlow</span>
        </h1>
        <div className="mt-10 flex flex-col gap-8 border-t border-border pt-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
            Commercial imagery for brands that would rather be remembered than liked. Cars, objects,
            food, skin — lit hard, cut short.
          </p>
          <a href="#work" className="label link-underline self-start text-foreground">
            Selected Work ↓
          </a>
        </div>
      </div>

      <style>{`
        @keyframes pan {
          from { transform: scale(1.08) translate3d(-1.5%, 0, 0); }
          to   { transform: scale(1.16) translate3d(1.5%, -2%, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [class*="animate-[pan"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}