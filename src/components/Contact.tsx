import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/context/LanguageContext";
import { CATEGORIES, getCategoryLabel } from "@/data/projects";

export function Contact() {
  const [sent, setSent] = useState(false);
  const { lang } = useLanguage();

  return (
    <section id="contact" className="scroll-mt-24 border-t border-border py-20 md:py-36">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 md:grid-cols-12 px-6 md:px-10">
        <div className="md:col-span-5">
          <Reveal>
            <p className="label text-accent font-semibold tracking-widest uppercase text-xs">Contact</p>
            <h2 className="display mt-4 text-[clamp(2.5rem,7vw,6rem)]">
              {lang === "RO" ? (
                <>
                  Hai să
                  <br />
                  colaborăm
                </>
              ) : (
                <>
                  Let's work
                  <br />
                  together
                </>
              )}
            </h2>
            <div className="mt-8 space-y-3">
              <a href="mailto:26georgerosu@gmail.com" className="link-underline block text-base md:text-lg font-medium break-all">
                26georgerosu@gmail.com
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal className="md:col-span-6 md:col-start-7" delay={120}>
          {sent ? (
            <div className="border border-border p-8 text-center font-medium">
              {lang === "RO"
                ? "Mulțumesc! Mesajul tău a fost trimis cu succes."
                : "Thank you! Your message has been sent successfully."}
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="space-y-6 md:space-y-8"
            >
              <div>
                <label htmlFor="name" className="label text-muted-foreground text-xs">
                  {lang === "RO" ? "Nume complet" : "Full Name"}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="mt-2 w-full border-0 border-b border-border bg-transparent pb-3 text-base md:text-lg outline-none transition-colors focus:border-accent"
                />
              </div>

              <div>
                <label htmlFor="email" className="label text-muted-foreground text-xs">
                  {lang === "RO" ? "Adresă Email" : "Email Address"}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-2 w-full border-0 border-b border-border bg-transparent pb-3 text-base md:text-lg outline-none transition-colors focus:border-accent"
                />
              </div>

              <div>
                <label htmlFor="type" className="label text-muted-foreground text-xs">
                  {lang === "RO" ? "Tip Proiect" : "Project Type"}
                </label>
                <select
                  id="type"
                  name="type"
                  className="mt-2 w-full border-0 border-b border-border bg-transparent pb-3 text-base md:text-lg outline-none focus:border-accent"
                >
                  {CATEGORIES.map((cat) => {
                    const label = getCategoryLabel(cat, lang);
                    return (
                      <option key={cat} value={label} className="bg-background">
                        {label}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="label text-muted-foreground text-xs">
                  {lang === "RO" ? "Mesajul Tău" : "Your Message"}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="mt-2 w-full resize-none border-0 border-b border-border bg-transparent pb-3 text-base md:text-lg outline-none transition-colors focus:border-accent"
                />
              </div>

              <button
                type="submit"
                className="label border border-border px-8 py-4 text-foreground font-semibold text-xs md:text-sm transition-colors hover:border-accent hover:bg-black hover:text-white w-full md:w-auto"
              >
                {lang === "RO" ? "Trimite Mesaj →" : "Send Message →"}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}