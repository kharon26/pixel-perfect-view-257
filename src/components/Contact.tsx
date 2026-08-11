import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/context/LanguageContext";

const PROJECT_TYPES_RO = [
  "Automotive",
  "Product & E-commerce",
  "Food & Beverage",
  "Medical/Aesthetic",
  "Social Content",
  "Altele",
];

const PROJECT_TYPES_EN = [
  "Automotive",
  "Product & E-commerce",
  "Food & Beverage",
  "Medical/Aesthetic",
  "Social Content",
  "Other",
];

export function Contact() {
  const [sent, setSent] = useState(false);
  const { lang } = useLanguage();

  const projectTypes = lang === "RO" ? PROJECT_TYPES_RO : PROJECT_TYPES_EN;

  return (
    <section id="contact" className="scroll-mt-24 border-t border-border py-24 md:py-36">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-16 px-6 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <Reveal>
            <p className="label text-accent">Contact</p>
            <h2 className="display mt-6 text-[clamp(2.5rem,7vw,6rem)]">
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
            <div className="mt-10 space-y-3">
              <a href="mailto:26georgerosu@gmail.com" className="link-underline block text-lg font-medium">
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
              className="space-y-8"
            >
              <div>
                <label htmlFor="name" className="label text-muted-foreground">
                  {lang === "RO" ? "Nume complet" : "Full Name"}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="mt-3 w-full border-0 border-b border-border bg-transparent pb-3 text-lg outline-none transition-colors focus:border-accent"
                />
              </div>

              <div>
                <label htmlFor="email" className="label text-muted-foreground">
                  {lang === "RO" ? "Adresă Email" : "Email Address"}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-3 w-full border-0 border-b border-border bg-transparent pb-3 text-lg outline-none transition-colors focus:border-accent"
                />
              </div>

              <div>
                <label htmlFor="type" className="label text-muted-foreground">
                  {lang === "RO" ? "Tip Proiect" : "Project Type"}
                </label>
                <select
                  id="type"
                  name="type"
                  className="mt-3 w-full border-0 border-b border-border bg-transparent pb-3 text-lg outline-none focus:border-accent"
                >
                  {projectTypes.map((t) => (
                    <option key={t} value={t} className="bg-background">
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="label text-muted-foreground">
                  {lang === "RO" ? "Mesajul Tău" : "Your Message"}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="mt-3 w-full resize-none border-0 border-b border-border bg-transparent pb-3 text-lg outline-none transition-colors focus:border-accent"
                />
              </div>

              <button
                type="submit"
                className="label border border-border px-8 py-4 text-foreground font-semibold transition-colors hover:border-accent hover:bg-black hover:text-white"
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