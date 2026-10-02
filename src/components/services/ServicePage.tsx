import React from "react";
import { Link } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { PROJECTS } from "@/data/projects";
import { videoPoster } from "@/lib/project-utils";

export interface ServiceFeature {
  title: string;
  description: string;
}

export interface ServiceStep {
  step: string;
  title: string;
  description: string;
}

export interface ServicePageProps {
  slug: string;
  title: string;
  subtitle?: string;
  tagline?: string;
  kickerBadge?: string;
  kickerSubline?: string;
  description: string;
  capabilitiesHeading?: string;
  capabilitiesIntro: string;
  processHeading?: string;
  ctaKicker?: string;
  ctaHeading: string;
  ctaText: string;
  ctaButtonText?: string;
  serviceFeatures: ServiceFeature[];
  processSteps: ServiceStep[];
  curatedProjectSlugs: string[];
}

export function ServicePage({
  title,
  description,
  kickerBadge = "SERVICIU COMERCIAL",
  kickerSubline = "GALAȚI · BRĂILA · TOATĂ ROMÂNIA",
  capabilitiesHeading = "Ce include acest serviciu",
  capabilitiesIntro,
  processHeading = "Cum decurge o colaborare",
  ctaKicker = "DISCUTĂ PROIECTUL TĂU",
  ctaHeading,
  ctaText,
  ctaButtonText = "Discută proiectul tău →",
  serviceFeatures,
  processSteps,
  curatedProjectSlugs,
}: ServicePageProps) {
  const curatedProjects = curatedProjectSlugs
    .map((s) => PROJECTS.find((p) => p.slug === s))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-neutral-900 selection:text-white">
      <Nav />

      {/* ── Service Hero Section ── */}
      <header className="relative pt-28 pb-14 md:pt-40 md:pb-24 border-b border-border/70 bg-neutral-50/40">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <Reveal once>
            <Link
              to="/"
              className="label link-underline text-neutral-600 hover:text-black font-bold transition-colors inline-block text-xs md:text-sm mb-3 md:mb-4"
            >
              ← Înapoi la prima pagină
            </Link>
          </Reveal>

          <Reveal once delay={60}>
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest text-neutral-500 bg-neutral-200/60 px-2.5 py-1">
                  {kickerBadge}
                </span>
                <span className="font-mono text-[10px] md:text-xs text-neutral-400">
                  {kickerSubline}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-black leading-tight">
                {title}
              </h1>

              <p className="mt-4 md:mt-6 text-sm md:text-lg text-neutral-700 leading-relaxed font-normal max-w-3xl">
                {description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center bg-black text-white px-6 py-3 text-xs md:text-sm font-bold uppercase tracking-wider transition-colors hover:bg-neutral-800"
                >
                  {ctaButtonText}
                </a>
                <a
                  href="tel:+40746900286"
                  className="inline-flex items-center justify-center border border-neutral-300 text-black px-6 py-3 text-xs md:text-sm font-bold uppercase tracking-wider transition-colors hover:border-black"
                >
                  0746 900 286
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </header>

      {/* ── Curated Projects Grid ── */}
      <section className="py-16 md:py-28 border-b border-border/70">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <Reveal once>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-1">
                  PORTOFOLIU REPREZENTATIV
                </span>
                <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-black">
                  Proiecte din această categorie
                </h2>
              </div>
              <Link
                to="/photo"
                className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-800 hover:text-black link-underline"
              >
                Vezi toate proiectele →
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {curatedProjects.map((p) => {
              if (!p) return null;
              const poster = p.heroLandscape || p.cover;
              const isVid = poster.endsWith(".mp4");
              const imgSrc = isVid ? videoPoster(poster) : poster;

              return (
                <Reveal key={p.slug} once className="h-full">
                  <Link
                    to="/work/$slug"
                    params={{ slug: p.slug }}
                    className="group flex flex-col h-full bg-neutral-50/50 border border-neutral-200/80 hover:border-black transition-colors duration-200"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                      <img
                        src={imgSrc}
                        alt={`${p.title} — ${p.client}`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    </div>
                    <div className="p-5 flex flex-col flex-1 justify-between">
                      <div>
                        <div className="flex items-center justify-between text-neutral-400 font-mono text-[11px] mb-1.5">
                          <span>{p.index}</span>
                          <span>{p.year}</span>
                        </div>
                        <h3 className="text-lg md:text-xl font-bold uppercase tracking-tight text-black">
                          {p.title}
                        </h3>
                        <p className="text-xs text-neutral-600 mt-1 line-clamp-2">
                          {p.narrative}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-neutral-200 flex items-center justify-between">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                          {p.client}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider text-black group-hover:translate-x-1 transition-transform">
                          Detalii →
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Services Capabilities & Deliverables ── */}
      <section className="py-16 md:py-28 border-b border-border/70 bg-neutral-50/30">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <Reveal once>
            <div className="max-w-3xl mb-12">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-1">
                COMPETENȚE &amp; CAPABILITĂȚI
              </span>
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-black">
                {capabilitiesHeading}
              </h2>
              <p className="mt-3 text-neutral-600 text-sm md:text-base leading-relaxed">
                {capabilitiesIntro}
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {serviceFeatures.map((f, idx) => (
              <Reveal key={f.title} once delay={idx * 60} className="h-full">
                <div className="border-t-2 border-black pt-4 pb-2 h-full flex flex-col justify-start">
                  <span className="font-mono text-xs text-neutral-400 font-bold mb-2">
                    0{idx + 1}
                  </span>
                  <h3 className="text-base md:text-lg font-bold uppercase tracking-tight text-black mb-2">
                    {f.title}
                  </h3>
                  <p className="text-xs md:text-sm text-neutral-600 leading-relaxed">
                    {f.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Collaboration Process ── */}
      <section className="py-16 md:py-28 border-b border-border/70">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <Reveal once>
            <div className="max-w-3xl mb-12">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-1">
                METODOLOGIE
              </span>
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-black">
                {processHeading}
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {processSteps.map((step, idx) => (
              <Reveal key={step.step} once delay={idx * 80}>
                <div className="border-b border-neutral-200 pb-8">
                  <span className="font-mono text-2xl font-black text-neutral-300 block mb-3">
                    {step.step}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold uppercase tracking-tight text-black mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs md:text-sm text-neutral-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Direct Contact / CTA Block with Unique Context ── */}
      <section id="contact" className="py-20 md:py-32 bg-black text-white">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <Reveal once className="lg:col-span-8">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-400 block mb-2">
                {ctaKicker}
              </span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight">
                {ctaHeading}
              </h2>
              <p className="mt-4 text-neutral-300 text-sm md:text-lg max-w-2xl leading-relaxed">
                {ctaText}
              </p>
            </Reveal>

            <Reveal once delay={100} className="lg:col-span-4 flex flex-col gap-4">
              <a
                href="tel:+40746900286"
                className="flex items-center justify-between border border-white/30 px-6 py-4 hover:border-white hover:bg-white hover:text-black transition-colors"
              >
                <span className="font-mono text-xs uppercase tracking-wider">Apelează direct</span>
                <span className="text-sm font-bold">0746 900 286</span>
              </a>
              <a
                href="mailto:26georgerosu@gmail.com"
                className="flex items-center justify-between min-w-0 gap-3 border border-white/30 px-6 py-4 hover:border-white hover:bg-white hover:text-black transition-colors"
              >
                <span className="font-mono text-xs uppercase tracking-wider shrink-0">Scrie pe email</span>
                <span className="text-sm font-bold truncate min-w-0 text-right" title="26georgerosu@gmail.com">26georgerosu@gmail.com</span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
