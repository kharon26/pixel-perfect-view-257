import { CATEGORIES } from "@/types/project";
import { PROJECTS } from "@/data/projects";
import { getCategoryLabel } from "@/lib/project-utils";

type WorkFilterBarProps = {
  filter: string;
  setFilter: (filter: string) => void;
  lang: "RO" | "EN";
};

const WORK_CATEGORIES = CATEGORIES.filter((c) => c !== "Altele");

export function WorkFilterBar({ filter, setFilter, lang }: WorkFilterBarProps) {
  return (
    <div className="sticky top-[68px] z-30 -mx-6 mt-10 border-y border-border bg-background/95 px-6 py-4 backdrop-blur-md transform-gpu md:-mx-10 md:px-10">
      <ul className="flex snap-x gap-6 overflow-x-auto md:gap-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {(["Toate", ...WORK_CATEGORIES] as const).map((c) => (
          <li key={c} className="shrink-0 snap-start">
            <button
              onClick={() => setFilter(c)}
              className={`text-xs md:text-sm font-semibold tracking-wider uppercase whitespace-nowrap transition-colors ${
                filter === c
                  ? "text-black border-b-2 border-black pb-1 font-bold"
                  : "text-neutral-700 hover:text-black"
              }`}
            >
              {getCategoryLabel(c, lang)}
              <sup className="ml-1.5 font-mono text-[10px] text-neutral-800">
                {c === "Toate"
                  ? PROJECTS.length
                  : PROJECTS.filter((p) =>
                      Array.isArray(p.category) ? p.category.includes(c) : p.category === c
                    ).length}
              </sup>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
