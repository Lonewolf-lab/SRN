import { createContext, useContext, useState } from "react";
import { content } from "../data/content";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");
  const toggleLang = () => setLang((l) => (l === "en" ? "hi" : "en"));
  const t = content[lang];
  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
