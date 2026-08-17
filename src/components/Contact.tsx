import { useState } from "react";
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

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [selectedCategory, setSelectedCategory] = useState<string>(CATEGORIES[0]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const { lang } = useLanguage();

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText("26georgerosu@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage(null);

    const projectType = getCategoryLabel(selectedCategory, lang) || "Nespecificat";

    const payload = {
      _subject: `Mesaj nou pe georgerosu.eu: ${formData.name} - ${projectType}`,
      _template: "table",
      _captcha: "false",
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
        setTimeout(() => setStatus("idle"), 6000);
        return;
      }

      throw new Error(data?.message || "Eroare la trimitere");
    } catch (err) {
      console.warn("[Contact Form Error]:", err);
      // Fallback nativ mailto dacă rețeaua/serviciul pică
      const subject = encodeURIComponent(`Proiect nou (${projectType}) - ${formData.name}`);
      const body = encodeURIComponent(
        `Nume: ${formData.name}\nEmail: ${formData.email}\nTip Proiect: ${projectType}\n\nMesaj:\n${formData.message}`
      );
      window.location.href = `mailto:26georgerosu@gmail.com?subject=${subject}&body=${body}`;
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 6000);
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
    <section id="contact" className="scroll-mt-24 border-t border-border py-24 md:py-36">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 md:grid-cols-12 px-6 md:px-10">
        <div className="md:col-span-5">
          <Reveal>
            <span className="text-xs uppercase tracking-widest text-neutral-600 font-semibold mb-2 block">Contact</span>
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
            <div className="mt-8 relative inline-block">
              <button
                type="button"
                onClick={copyEmailToClipboard}
                className="group relative inline-flex items-center gap-2.5 text-base md:text-lg font-medium border-b border-border pb-1 hover:border-black transition-colors cursor-pointer"
                title={lang === "RO" ? "Apasă pentru a copia adresa de email" : "Click to copy email address"}
              >
                <span className="break-all font-mono text-sm md:text-base">26georgerosu@gmail.com</span>
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
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </button>
              {copied && (
                <span className="absolute -top-9 left-0 z-20 rounded bg-black text-white text-[11px] font-mono px-2.5 py-1 shadow-md animate-fade-in">
                  {lang === "RO" ? "Copiat!" : "Copied!"}
                </span>
              )}
            </div>
          </Reveal>
        </div>

        <Reveal className="md:col-span-6 md:col-start-7" delay={120}>
          {status === "success" ? (
            <div className="border border-black bg-neutral-50/80 p-8 md:p-10 text-center animate-fade-in shadow-sm">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-black text-white mb-4">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight">
                {lang === "RO" ? "Mesaj Trimis cu Succes!" : "Message Sent Successfully!"}
              </h3>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed max-w-md mx-auto">
                {lang === "RO"
                  ? "Mulțumesc pentru mesaj. Am primit solicitarea și te voi contacta în cel mai scurt timp posibil."
                  : "Thank you for reaching out. I have received your message and will get back to you shortly."}
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-6 inline-block text-xs font-semibold uppercase tracking-wider underline hover:text-black transition-colors cursor-pointer"
              >
                {lang === "RO" ? "Trimite alt mesaj" : "Send another message"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              {status === "error" && (
                <div className="border border-red-300 bg-red-50/90 p-4 text-xs text-red-800 animate-fade-in flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <span>{errorMessage}</span>
                  <a
                    href={mailtoFallbackUrl}
                    className="underline font-bold shrink-0 hover:text-black transition-colors"
                  >
                    {lang === "RO" ? "Deschide Email →" : "Open Email App →"}
                  </a>
                </div>
              )}

              <div>
                <label htmlFor="name" className="label text-muted-foreground text-xs">
                  {lang === "RO" ? "Nume complet" : "Full Name"}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-2 w-full border-0 border-b border-border bg-transparent pb-3 text-base md:text-lg outline-none transition-colors focus:border-accent"
                />
              </div>

              <div>
                <label htmlFor="type" className="label text-muted-foreground text-xs">
                  {lang === "RO" ? "Tip Proiect" : "Project Type"}
                </label>
                <div className="mt-2">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory} modal={false}>
                    <SelectTrigger
                      id="type"
                      className="relative w-full border-0 border-b border-border bg-transparent pb-3 pt-1 px-8 text-center text-base md:text-lg font-medium text-foreground outline-none transition-colors focus:border-black focus:ring-0 rounded-none shadow-none justify-center h-auto cursor-pointer group [&>svg]:absolute [&>svg]:right-2 md:[&>svg]:right-3 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2 [&>svg]:opacity-70 [&>svg]:transition-transform [&[data-state=open]>svg]:rotate-180"
                    >
                      <SelectValue>
                        {getCategoryLabel(selectedCategory, lang)}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="w-full min-w-[var(--radix-select-trigger-width)] border border-border bg-background/95 backdrop-blur-md rounded-none shadow-xl p-1 z-50">
                      {CATEGORIES.map((cat) => (
                        <SelectItem
                          key={cat}
                          value={cat}
                          className="text-left justify-start py-2.5 px-4 text-base md:text-lg font-medium text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:bg-black focus:text-white data-[state=checked]:font-bold rounded-none cursor-pointer transition-colors"
                        >
                          {getCategoryLabel(cat, lang)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
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
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="mt-2 w-full resize-none border-0 border-b border-border bg-transparent pb-3 text-base md:text-lg outline-none transition-colors focus:border-accent"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className={`label border border-border px-8 py-4 font-semibold text-xs md:text-sm transition-all w-full md:w-auto flex items-center justify-center gap-3 ${
                  status === "loading"
                    ? "opacity-60 cursor-not-allowed bg-neutral-100 text-neutral-500"
                    : "hover:border-black hover:bg-black hover:text-white cursor-pointer active:scale-95"
                }`}
              >
                {status === "loading" ? (
                  <>
                    <span className="inline-block w-3.5 h-3.5 border-2 border-neutral-400 border-t-black rounded-full animate-spin" />
                    {lang === "RO" ? "Se trimite..." : "Sending..."}
                  </>
                ) : (
                  lang === "RO" ? "Trimite Mesaj →" : "Send Message →"
                )}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
