import React, { useState, useCallback } from "react";
import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/context/LanguageContext";
import { CATEGORIES } from "@/types/project";
import { getCategoryLabel } from "@/lib/project-utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Isolated memoized heading to completely decouple heading rendering from dropdown/form state
const ContactHeading = React.memo(function ContactHeading({
  lang,
  copyEmailToClipboard,
  copied,
}: {
  lang: "RO" | "EN";
  copyEmailToClipboard: () => void;
  copied: boolean;
}) {
  return (
    <div className="md:col-span-5 font-sans">
      <Reveal once>
        <span className="text-xs uppercase tracking-widest text-neutral-600 font-bold mb-2 block">
          Contact
        </span>
        <h2 className="display mt-4 text-[clamp(2.5rem,5.5vw,5rem)] font-black uppercase tracking-tight text-foreground leading-tight">
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
        <div className="mt-8 flex flex-col gap-3.5 items-start">
          {/* Email button with copy to clipboard */}
          <div className="relative inline-block">
            <button
              type="button"
              onClick={copyEmailToClipboard}
              className="group relative inline-flex items-center gap-2.5 text-base md:text-lg font-medium border-b border-border pb-1 hover:border-black transition-colors cursor-pointer"
              title={lang === "RO" ? "Apasă pentru a copia adresa de email" : "Click to copy email address"}
            >
              <svg
                className="w-4 h-4 text-neutral-400 group-hover:text-black transition-colors shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.75}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="break-all font-sans text-base md:text-lg text-neutral-900 font-medium tracking-tight">
                26georgerosu@gmail.com
              </span>
            </button>
            {copied && (
              <span className="absolute -top-9 left-0 z-20 rounded bg-black text-white text-[11px] font-sans font-bold px-2.5 py-1 shadow-md animate-fade-in">
                {lang === "RO" ? "Copiat!" : "Copied!"}
              </span>
            )}
          </div>

          {/* Direct call phone link */}
          <div>
            <a
              href="tel:+40746900286"
              className="group inline-flex items-center gap-2.5 text-base md:text-lg font-medium border-b border-border pb-1 hover:border-black transition-colors"
              title={lang === "RO" ? "Apelează direct: +40 746 900 286" : "Call now: +40 746 900 286"}
            >
              <svg
                className="w-4 h-4 text-neutral-400 group-hover:text-black transition-colors shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.75}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span className="font-sans text-base md:text-lg text-neutral-900 font-medium tracking-tight">
                +40 746 900 286
              </span>
            </a>
          </div>
        </div>
      </Reveal>
    </div>
  );
});

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [honey, setHoney] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(CATEGORIES[0]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "fallback" | "error">("idle");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const { lang } = useLanguage();

  const copyEmailToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText("26georgerosu@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  }, []);

  const validate = () => {
    if (!formData.name.trim()) {
      return lang === "RO" ? "Te rugăm să completezi numele." : "Please enter your name.";
    }
    const emailRegex = /^[^s@]+@[^s@]+.[^s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      return lang === "RO" ? "Te rugăm să introduci o adresă de email validă." : "Please enter a valid email address.";
    }
    if (!formData.message.trim()) {
      return lang === "RO" ? "Te rugăm să scrii un mesaj." : "Please enter a message.";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidationError(null);

    const error = validate();
    if (error) {
      setValidationError(error);
      return;
    }

    if (honey) {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      return;
    }

    setStatus("loading");

    const projectType = getCategoryLabel(selectedCategory, lang) || "Nespecificat";

    const payload = {
      _subject: `Mesaj nou pe georgerosu.eu: ${formData.name} - ${projectType}`,
      _template: "table",
      _captcha: "false",
      _honey: "",
      _replyto: formData.email,
      Nume: formData.name,
      Email: formData.email,
      "Tip Proiect": projectType,
      Mesaj: formData.message,
      Domeniu: "georgerosu.eu",
    };

    try {
      const response = await fetch("https://formsubmit.co/ajax/26georgerosu@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && (data?.success === "true" || data?.success === true || response.status === 200)) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        return;
      }

      throw new Error(data?.message || "Eroare la trimitere");
    } catch (err) {
      console.warn("[Contact Form Error]:", err);
      setStatus("fallback");
      const subject = encodeURIComponent(`Proiect nou (${projectType}) - ${formData.name}`);
      const body = encodeURIComponent(
        `Nume: ${formData.name}\nEmail: ${formData.email}\nTip Proiect: ${projectType}\n\nMesaj:\n${formData.message}`
      );
      window.location.href = `mailto:26georgerosu@gmail.com?subject=${subject}&body=${body}`;
    }
  };

  const mailtoFallbackUrl = `mailto:26georgerosu@gmail.com?subject=${encodeURIComponent(
    `Proiect Nou (${getCategoryLabel(selectedCategory, lang)}) — ${formData.name || "Client"}`
  )}&body=${encodeURIComponent(
    `Nume: ${formData.name}\nEmail: ${formData.email}\nTip Proiect: ${getCategoryLabel(
      selectedCategory,
      lang
    )}\n\nMesaj:\n${formData.message}`
  )}`;

  return (
    <section id="contact" className="scroll-mt-24 border-t border-border py-24 md:py-36 bg-background text-foreground font-sans">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 md:grid-cols-12 px-6 md:px-10">
        <ContactHeading lang={lang} copyEmailToClipboard={copyEmailToClipboard} copied={copied} />

        <div className="md:col-span-6 md:col-start-7">
          <Reveal once delay={120}>
            {status === "success" ? (
              <div className="border border-black bg-neutral-50/80 p-8 md:p-10 text-center animate-fade-in shadow-sm">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-black text-white mb-4">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-foreground font-sans">
                  {lang === "RO" ? "Mesaj Trimis cu Succes!" : "Message Sent Successfully!"}
                </h3>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed max-w-md mx-auto font-sans">
                  {lang === "RO"
                    ? "Mulțumesc pentru mesaj. Am primit solicitarea și te voi contacta în cel mai scurt timp posibil."
                    : "Thank you for reaching out. I have received your message and will get back to you shortly."}
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-6 inline-block text-xs font-bold uppercase tracking-wider underline hover:text-black transition-colors cursor-pointer font-sans"
                >
                  {lang === "RO" ? "Trimite alt mesaj" : "Send another message"}
                </button>
              </div>
            ) : status === "fallback" ? (
              <div className="border border-neutral-400 bg-neutral-50/90 p-8 md:p-10 text-center animate-fade-in shadow-sm">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-neutral-800 text-white mb-4">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-foreground font-sans">
                  {lang === "RO" ? "Se deschide aplicația de Email" : "Opening Email Client"}
                </h3>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed max-w-md mx-auto font-sans">
                  {lang === "RO"
                    ? "Mesajul nu a putut fi trimis automat prin server. Am deschis aplicația ta de email pentru a trimite mesajul direct către 26georgerosu@gmail.com."
                    : "Could not send automatically. Opening your email client to send directly to 26georgerosu@gmail.com."}
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                  <a
                    href={mailtoFallbackUrl}
                    className="inline-block bg-black text-white px-6 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors font-sans"
                  >
                    {lang === "RO" ? "Deschide Email din nou →" : "Re-open Email App →"}
                  </a>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="inline-block border border-border px-6 py-3.5 text-xs font-bold uppercase tracking-widest hover:border-black transition-colors cursor-pointer font-sans"
                  >
                    {lang === "RO" ? "Înapoi la formular" : "Back to form"}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 md:space-y-7 font-sans">
                <input
                  type="text"
                  name="_honey"
                  value={honey}
                  onChange={(e) => setHoney(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="sr-only opacity-0 absolute w-0 h-0 pointer-events-none -z-50"
                  aria-hidden="true"
                />

                {validationError && (
                  <div className="border border-red-300 bg-red-50/95 p-4 text-xs font-semibold text-red-800 animate-fade-in">
                    {validationError}
                  </div>
                )}

                {/* Full Name field */}
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-neutral-600 mb-1.5 font-sans">
                    {lang === "RO" ? "Nume complet" : "Full Name"}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder={lang === "RO" ? "ex: Alexandru Popescu" : "e.g., Alex Parker"}
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (validationError) setValidationError(null);
                    }}
                    className="w-full h-12 border-0 border-b border-neutral-300 bg-transparent px-0 py-2.5 text-base md:text-lg text-foreground font-sans font-medium placeholder:text-neutral-400 placeholder:font-normal outline-none transition-colors duration-200 focus:border-black focus:ring-0"
                  />
                </div>

                {/* Email Address field */}
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-neutral-600 mb-1.5 font-sans">
                    {lang === "RO" ? "Adresă Email" : "Email Address"}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder={lang === "RO" ? "nume@companie.ro" : "name@company.com"}
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (validationError) setValidationError(null);
                    }}
                    className="w-full h-12 border-0 border-b border-neutral-300 bg-transparent px-0 py-2.5 text-base md:text-lg text-foreground font-sans font-medium placeholder:text-neutral-400 placeholder:font-normal outline-none transition-colors duration-200 focus:border-black focus:ring-0"
                  />
                </div>

                {/* Project Type field */}
                <div className="flex flex-col">
                  <label htmlFor="type" className="text-xs font-bold uppercase tracking-widest text-neutral-600 mb-1.5 font-sans">
                    {lang === "RO" ? "Tip Proiect" : "Project Type"}
                  </label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory} modal={false}>
                    <SelectTrigger
                      id="type"
                      className="w-full h-12 border-0 border-b border-neutral-300 bg-transparent px-0 py-2.5 text-left text-base md:text-lg text-foreground font-sans font-medium outline-none rounded-none shadow-none justify-between cursor-pointer group transition-colors duration-200 focus:border-black focus:ring-0 [&>svg]:opacity-70 [&>svg]:transition-transform [&[data-state=open]>svg]:rotate-180"
                    >
                      <SelectValue>
                        {getCategoryLabel(selectedCategory, lang)}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="w-full min-w-[var(--radix-select-trigger-width)] border border-neutral-200 bg-background/98 backdrop-blur-md rounded-none shadow-xl p-1 z-50 font-sans">
                      {CATEGORIES.map((cat) => (
                        <SelectItem
                          key={cat}
                          value={cat}
                          className="text-left justify-start py-3 px-4 text-base md:text-lg font-medium text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:bg-black focus:text-white data-[state=checked]:font-bold rounded-none cursor-pointer transition-colors font-sans"
                        >
                          {getCategoryLabel(cat, lang)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Message textarea field */}
                <div className="flex flex-col">
                  <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-neutral-600 mb-1.5 font-sans">
                    {lang === "RO" ? "Mesajul Tău" : "Your Message"}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    placeholder={lang === "RO" ? "Descrie pe scurt proiectul, cerințele și perioada dorită..." : "Briefly describe your project, requirements and timeline..."}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (validationError) setValidationError(null);
                    }}
                    className="w-full min-h-[120px] border-0 border-b border-neutral-300 bg-transparent px-0 py-3 text-base md:text-lg text-foreground font-sans font-medium placeholder:text-neutral-400 placeholder:font-normal leading-relaxed resize-none outline-none transition-colors duration-200 focus:border-black focus:ring-0"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className={`inline-flex items-center justify-center gap-3 border border-neutral-900 bg-black text-white px-8 py-4 text-xs md:text-sm font-bold uppercase tracking-widest font-sans transition-all duration-300 w-full sm:w-auto shadow-sm ${
                      status === "loading"
                        ? "opacity-60 cursor-not-allowed bg-neutral-800"
                        : "hover:bg-neutral-800 cursor-pointer active:scale-98"
                    }`}
                  >
                    {status === "loading" ? (
                      <>
                        <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {lang === "RO" ? "Se trimite..." : "Sending..."}
                      </>
                    ) : (
                      lang === "RO" ? "Trimite Mesaj →" : "Send Message →"
                    )}
                  </button>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
