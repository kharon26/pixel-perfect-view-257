import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { getProject, nextProject } from "@/data/projects";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project, next: nextProject(params.slug) };
  },
  head: ({ loaderData }) => {
    const title = loaderData
      ? `${loaderData.project.title} — ${loaderData.project.client} | Kai Marlow`
      : "Case study | Kai Marlow";
    const description = loaderData
      ? `${loaderData.project.category} case study for ${loaderData.project.client}, ${loaderData.project.year}. Commercial photography and motion by Kai Marlow.`
      : "Commercial photography and motion case study by Kai Marlow.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CaseStudy,
});

function CaseStudy() {
  const { project, next } = Route.useLoaderData();

  return (
    <>
      <Nav />
      <main id="top">
        {/* Hero — TODO: swap for project video when available */}
        <section className="relative flex min-h-[80svh] items-end overflow-hidden">
          <img
            src={project.cover}
            alt={`${project.title} case study cover`}
            className="absolute inset-0 h-full w-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/60" />
          <div className="relative mx-auto w-full max-w-[1600px] px-6 pb-14 md:px-10 md:pb-20">
            <Link to="/" hash="work" className="label link-underline text-muted-foreground hover:text-foreground">
              ← All work
            </Link>
            <p className="label mt-8 text-accent">
              {project.index} — {project.category}
            </p>
            <h1 className="display mt-4 text-[clamp(2.5rem,10vw,9rem)]">{project.title}</h1>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 px-6 py-20 md:grid-cols-12 md:px-10 md:py-28">
          <Reveal className="md:col-span-4">
            <dl className="space-y-6">
              {[
                ["Client", project.client],
                ["Year", project.year],
                ["Role", project.role],
              ].map(([k, v]) => (
                <div key={k} className="border-t border-border pt-3">
                  <dt className="label text-muted-foreground">{k}</dt>
                  <dd className="mt-2 text-sm">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal className="md:col-span-7 md:col-start-6" delay={100}>
            <p className="text-lg leading-relaxed text-muted-foreground md:text-2xl md:leading-relaxed">
              {project.narrative}
            </p>
          </Reveal>
        </section>

        {/* Gallery — TODO: replace placeholders with the real image/video set */}
        <section className="mx-auto max-w-[1600px] px-6 pb-24 md:px-10 md:pb-32">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            {project.gallery.map((src, i) => (
              <Reveal
                key={i}
                delay={(i % 2) * 90}
                className={i % 3 === 0 ? "md:col-span-12" : "md:col-span-6"}
              >
                <img
                  src={src}
                  alt={`${project.title} gallery placeholder ${i + 1}`}
                  loading="lazy"
                  className={`w-full object-cover ${i % 3 === 0 ? "aspect-[16/9]" : "aspect-[4/5]"}`}
                />
              </Reveal>
            ))}
          </div>
        </section>

        <section className="border-t border-border">
          <Link
            to="/work/$slug"
            params={{ slug: next.slug }}
            className="group mx-auto flex max-w-[1600px] flex-col gap-2 px-6 py-16 md:px-10 md:py-24"
          >
            <span className="label text-muted-foreground">Next project — {next.index}</span>
            <span className="display text-[clamp(2.25rem,8vw,7rem)] transition-colors group-hover:text-accent">
              {next.title}
            </span>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}