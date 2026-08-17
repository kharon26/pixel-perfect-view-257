import { Link } from "@tanstack/react-router";
import { PROJECTS } from "@/data/projects";
import { Reveal } from "@/components/Reveal";

export function WorkQuickIndex() {
  return (
    <Reveal>
      <ul className="mx-auto mt-7 md:mt-8 grid w-full max-w-[340px] grid-cols-2 gap-x-4 gap-y-3.5 border-b border-border pb-6 md:pb-7 sm:max-w-none sm:grid-cols-3 sm:gap-x-8 md:grid-cols-4 h-auto overflow-visible">
        {PROJECTS.map((p) => (
          <li key={p.slug} className="min-w-0 flex items-start">
            <Link
              to="/work/$slug"
              params={{ slug: p.slug }}
              className="group flex items-baseline gap-2.5 min-w-0 w-full transition-transform duration-300 ease-out hover:translate-x-1"
            >
              <span className="font-mono text-neutral-400 text-[10px] sm:text-[11px] shrink-0 select-none w-5 text-left font-normal tracking-tight">
                {p.index}
              </span>
              <span className="text-[11px] sm:text-xs md:text-[13px] font-semibold tracking-wider uppercase text-foreground/90 group-hover:text-black group-hover:underline underline-offset-4 decoration-border/80 transition-colors break-words min-w-0 flex-1 leading-snug">
                {p.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
