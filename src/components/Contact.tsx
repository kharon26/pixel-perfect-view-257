import { useState } from "react";
import { Reveal } from "@/components/Reveal";

const PROJECT_TYPES = [
  "Automotive",
  "Product & E-commerce",
  "Food & Beverage",
  "Medical/Aesthetic",
  "Social Content",
  "Other",
];

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="scroll-mt-24 border-t border-border py-24 md:py-36">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-16 px-6 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <Reveal>
            <p className="label text-accent">Contact</p>
            <h2 className="display mt-6 text-[clamp(2.5rem,7vw,6rem)]">
              Let's
              <br />
              make it
            </h2>
            <div className="mt-10 space-y-3">
              {/* TODO: replace with real contact details */}
              <a href="mailto:studio@kaimarlow.com" className="link-underline block text-lg">
                studio@kaimarlow.com
              </a>
              <a href="tel:+40000000000" className="link-underline block text-lg text-muted-foreground">
                +40 000 000 000
              </a>
            </div>
            <div className="mt-8 flex gap-6">
              {["Instagram", "Vimeo", "LinkedIn"].map((s) => (
                <a key={s} href="#" className="label link-underline text-muted-foreground hover:text-foreground">
                  {s}
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal className="md:col-span-6 md:col-start-7" delay={120}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true); // TODO: wire to a real inbox / backend
            }}
            className="space-y-8"
          >
            {[
              { id: "name", label: "Name", type: "text" },
              { id: "email", label: "Email", type: "email" },
            ].map((f) => (
              <div key={f.id}>
                <label htmlFor={f.id} className="label text-muted-foreground">
                  {f.label}
                </label>
                <input
                  id={f.id}
                  name={f.id}
                  type={f.type}
                  required
                  className="mt-3 w-full border-0 border-b border-border bg-transparent pb-3 text-lg outline-none transition-colors focus:border-accent"
                />
              </div>
            ))}

            <div>
              <label htmlFor="type" className="label text-muted-foreground">
                Project type
              </label>
              <select
                id="type"
                name="type"
                className="mt-3 w-full border-0 border-b border-border bg-transparent pb-3 text-lg outline-none focus:border-accent"
              >
                {PROJECT_TYPES.map((t) => (
                  <option key={t} value={t} className="bg-background">
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="message" className="label text-muted-foreground">
                Message
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
              className="label border border-border px-8 py-4 text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              {sent ? "Sent — thank you" : "Send enquiry"}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}