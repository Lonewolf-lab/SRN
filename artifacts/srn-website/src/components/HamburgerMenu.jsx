import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, Languages } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { GlassButton } from "./ui/glass-button";

const navLinks = [
  { path: "/",           hindiName: "मुखपृष्ठ", englishName: "Home" },
  { path: "/sangathan",  hindiName: "संगठन",    englishName: "Sangathan" },
  { path: "/uddeshya",   hindiName: "उद्देश्य", englishName: "Objectives" },
];

export default function HamburgerMenu({ isOpen, setIsOpen }) {
  const location = useLocation();
  const { lang, toggleLang } = useLanguage();
  const en = lang === "en";

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") setIsOpen(false); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [setIsOpen]);

  const handleLinkClick = () => setTimeout(() => setIsOpen(false), 200);

  return (
    <>
      {/* ── Hamburger button ──────────────────────────────────────── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-5 right-6 z-50 w-12 h-12 flex flex-col items-center justify-center gap-1.5 rounded-[10px] bg-gradient-to-br from-[#E8622A] to-[#C04A18] shadow-lg shadow-orange-900/30 border border-[#F47A3A]/30"
        aria-label="Toggle menu"
      >
        <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
        <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {/* ── Backdrop ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Drawer ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.38, ease: [0.32, 0.72, 0, 1] }}
            className="fixed top-0 right-0 z-50 h-screen w-full sm:w-[26rem] bg-[#3D2314]/80 backdrop-blur-lg border-l border-[#E8622A]/20 flex flex-col shadow-2xl"
          >
            {/* Orange accent bar */}
            <div className="h-1 bg-gradient-to-r from-[#E8622A] to-[#D4880C]" />

            {/* Header — logo + bilingual name */}
            <div className="flex flex-col items-center pt-8 pb-5 px-8">
              <img
                src="/logo.PNG"
                alt="Sashakt Rashtra Nirman Logo"
                className="w-28 h-28 object-contain drop-shadow-lg"
              />
              <p className="text-white font-bold text-center mt-3 text-xl leading-snug font-serif">
                {en ? "Sashakt Rashtra Nirman" : "सशक्त राष्ट्र निर्माण"}
              </p>
              <p className="text-[#F47A3A] text-sm text-center mt-1">
                {en ? "सशक्त राष्ट्र निर्माण" : "Sashakt Rashtra Nirman"}
              </p>
            </div>

            <div className="h-px bg-[#E8622A]/15 mx-8" />

            {/* Nav links */}
            <nav className="flex-1 px-8 pt-5 space-y-1 overflow-y-auto">
              {navLinks.map((link, i) => {
                const isActive = location.pathname === link.path;
                const primary   = en ? link.englishName : link.hindiName;
                const secondary = en ? link.hindiName   : link.englishName;

                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (i + 1) * 0.08, ease: "easeOut" }}
                  >
                    <GlassButton asChild variant={isActive ? "active" : "default"}>
                      <Link
                        to={link.path}
                        onClick={handleLinkClick}
                        className="flex items-center gap-4 w-full"
                      >
                      {/* Active dot */}
                      <span
                        className={`w-2 h-2 rounded-full bg-[#E8622A] shrink-0 transition-opacity duration-200 ${
                          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                        }`}
                      />
                      <div>
                        <p className={`text-xl font-serif font-semibold leading-tight transition-colors duration-200 ${
                          isActive ? "text-[#F47A3A]" : "text-white group-hover:text-[#F47A3A]"
                        }`}>
                          {primary}
                        </p>
                        <p className="text-xs text-[#F47A3A]/55 mt-0.5 group-hover:text-[#F47A3A]/80 transition-colors duration-200">
                          {secondary}
                        </p>
                      </div>
                    </Link>
                  </GlassButton>
                  </motion.div>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="px-8 pb-8 space-y-4">
              <div className="h-px bg-[#E8622A]/15" />

              {/* Language selector */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                  <Languages className="w-3.5 h-3.5 text-[#E8622A]/70" />
                  <p className="text-white/40 text-xs uppercase tracking-widest font-medium">
                    {en ? "Language / भाषा" : "भाषा / Language"}
                  </p>
                </div>
                <button
                  onClick={toggleLang}
                  className="flex items-center rounded-full bg-white/5 border border-[#E8622A]/30 overflow-hidden w-full"
                >
                  <span className={`flex-1 py-2.5 text-sm font-semibold transition-all duration-200 text-center ${
                    lang === "en"
                      ? "bg-gradient-to-r from-[#E8622A] to-[#C04A18] text-white"
                      : "text-white/45 hover:text-white/70"
                  }`}>
                    English
                  </span>
                  <span className={`flex-1 py-2.5 text-sm font-semibold transition-all duration-200 text-center ${
                    lang === "hi"
                      ? "bg-gradient-to-r from-[#E8622A] to-[#C04A18] text-white"
                      : "text-white/45 hover:text-white/70"
                  }`}>
                    हिंदी
                  </span>
                </button>
              </div>

              {/* Contact */}
              <a
                href="tel:+917652012487"
                className="flex items-center gap-2 text-white/55 hover:text-[#F47A3A] text-sm transition-all duration-200 hover:-translate-y-0.5"
              >
                <Phone className="w-4 h-4 text-[#E8622A] shrink-0" />
                +91 76520 12487
              </a>
              <a
                href="mailto:srnindia@yahoo.com"
                className="flex items-center gap-2 text-white/55 hover:text-[#F47A3A] text-sm transition-all duration-200 hover:-translate-y-0.5"
              >
                <Mail className="w-4 h-4 text-[#E8622A] shrink-0" />
                srnindia@yahoo.com
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
