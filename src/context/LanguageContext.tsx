import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "RO" | "EN";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "RO",
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Initialize language from URL search param (?lang=en/ro), localStorage, or default to "RO"
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get("lang")?.toUpperCase();
      if (urlLang === "EN" || urlLang === "RO") {
        return urlLang;
      }
      const stored = localStorage.getItem("user_lang")?.toUpperCase();
      if (stored === "EN" || stored === "RO") {
        return stored as Language;
      }
    }
    return "RO";
  });

  // Sync document.documentElement.lang on mount and on language change
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang === "EN" ? "en" : "ro";
    }
  }, [lang]);

  const setLang = (nextLang: Language) => {
    setLangState(nextLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("user_lang", nextLang);
      document.documentElement.lang = nextLang === "EN" ? "en" : "ro";
      
      // Reflect in URL query parameter without a hard page reload
      const url = new URL(window.location.href);
      if (nextLang === "EN") {
        url.searchParams.set("lang", "en");
      } else {
        url.searchParams.delete("lang"); // Keep clean default URL for Romanian
      }
      window.history.replaceState({}, "", url.toString());
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
