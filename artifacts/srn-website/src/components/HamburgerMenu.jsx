import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, Languages, ArrowUpRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const navLinks = [
  { path: "/",          hindiName: "मुखपृष्ठ", englishName: "Home",       number: "01" },
  { path: "/sangathan", hindiName: "संगठन",    englishName: "Sangathan",  number: "02" },
  { path: "/uddeshya",  hindiName: "उद्देश्य", englishName: "Objectives", number: "03" },
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

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleLinkClick = () => setTimeout(() => setIsOpen(false), 200);

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.35 } },
    exit:   { opacity: 0, transition: { duration: 0.25 } },
  };

  const panelVariants = {
    hidden:   { opacity: 0, y: -24, scale: 0.97 },
    visible:  { opacity: 1, y: 0,   scale: 1, transition: { duration: 0.45, ease: [0.32, 0.72, 0, 1], delay: 0.05 } },
    exit:     { opacity: 0, y: -16, scale: 0.97, transition: { duration: 0.25 } },
  };

  const linkVariants = {
    hidden:  { opacity: 0, x: -20 },
    visible: (i) => ({ opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut", delay: 0.15 + i * 0.08 } }),
  };

  return (
    <>
      {/* ── Hamburger button ─────────────────────────────────────── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-5 right-6 z-50 w-12 h-12 flex flex-col items-center justify-center gap-1.5 rounded-[10px] bg-gradient-to-br from-[#E8622A] to-[#C04A18] shadow-lg shadow-orange-900/40 border border-[#F47A3A]/30 hover:shadow-orange-700/50 transition-shadow duration-300"
        aria-label="Toggle menu"
      >
        <span className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-300 origin-center ${isOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
        <span className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${isOpen ? "opacity-0 scale-x-0" : ""}`} />
        <span className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-300 origin-center ${isOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
      </button>

      {/* ── Full-screen overlay ───────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-40"
            style={{ background: "rgba(10, 4, 2, 0.55)" }}
          >
            {/* Blurred bg layer */}
            <div className="absolute inset-0 backdrop-blur-2xl" />

            {/* Subtle noise texture */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
                backgroundSize: "128px 128px",
              }}
            />

            {/* Radial orange glow at top */}
            <div
              className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
              style={{ background: "radial-gradient(ellipse at center, rgba(232,98,42,0.18) 0%, transparent 70%)" }}
            />

            {/* ── Content container ───────────────────────────────── */}
            <motion.div
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative z-10 w-full h-full flex"
            >
              {/* ─── LEFT — Logo panel (desktop) ─────────────────── */}
              <div className="hidden md:flex w-5/12 flex-col items-center justify-center px-12 relative">
                {/* Vertical glass divider */}
                <div className="absolute right-0 top-16 bottom-16 w-px"
                  style={{ background: "linear-gradient(to bottom, transparent, rgba(232,98,42,0.3) 30%, rgba(232,98,42,0.3) 70%, transparent)" }}
                />

                {/* Glow */}
                <div className="absolute w-80 h-80 rounded-full pointer-events-none"
                  style={{ background: "radial-gradient(circle, rgba(232,98,42,0.12) 0%, transparent 70%)" }}
                />

                {/* Logo inside a glass card */}
                <motion.div
                  className="relative z-10 flex flex-col items-center"
                  initial={{ opacity: 0, y: 30, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.18, duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
                >
                  <motion.img
                    src="/logo.PNG"
                    alt="SRN Logo"
                    className="w-52 h-52 object-contain drop-shadow-2xl"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  />

                  <motion.h1
                    className="text-white font-bold text-2xl font-serif leading-snug text-center mt-5"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.38, duration: 0.5 }}
                  >
                    {en ? "Sashakt Rashtra Nirman" : "सशक्त राष्ट्र निर्माण"}
                  </motion.h1>
                  <motion.div
                    className="mt-3 w-12 h-0.5 rounded-full mx-auto"
                    style={{ background: "linear-gradient(to right, #E8622A, #D4880C)" }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.52, duration: 0.45 }}
                  />
                  <motion.p
                    className="text-[#F47A3A]/60 text-sm mt-3 font-serif tracking-wide"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                  >
                    {en ? "सशक्त राष्ट्र निर्माण" : "Sashakt Rashtra Nirman"}
                  </motion.p>
                </motion.div>
              </div>

              {/* ─── RIGHT — Nav & Controls ──────────────────────── */}
              <div className="w-full md:w-7/12 flex flex-col justify-center px-8 md:px-14 py-16">

                {/* Mobile logo */}
                <div className="flex md:hidden items-center gap-3 mb-10">
                  <img src="/logo.PNG" alt="logo" className="w-10 h-10 object-contain" />
                  <p className="text-white font-bold font-serif">{en ? "Sashakt Rashtra Nirman" : "सशक्त राष्ट्र निर्माण"}</p>
                </div>

                {/* ── Nav links ── */}
                <nav className="space-y-3 mb-10">
                  {navLinks.map((link, i) => {
                    const isActive = location.pathname === link.path;
                    const primary  = en ? link.englishName : link.hindiName;
                    const secondary = en ? link.hindiName : link.englishName;

                    return (
                      <motion.div
                        key={link.path}
                        custom={i}
                        variants={linkVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <Link
                          to={link.path}
                          onClick={handleLinkClick}
                          className="group flex items-center gap-5 px-5 py-4 rounded-2xl transition-all duration-300"
                          style={{
                            background: isActive
                              ? "rgba(232,98,42,0.15)"
                              : "rgba(255,255,255,0.04)",
                            border: isActive
                              ? "1px solid rgba(232,98,42,0.45)"
                              : "1px solid rgba(255,255,255,0.07)",
                            boxShadow: isActive
                              ? "0 4px 24px rgba(232,98,42,0.12), inset 0 1px 0 rgba(255,255,255,0.06)"
                              : "inset 0 1px 0 rgba(255,255,255,0.04)",
                            backdropFilter: "blur(8px)",
                          }}
                        >
                          {/* Number */}
                          <span className={`text-xs font-mono font-bold transition-colors duration-200 shrink-0 ${
                            isActive ? "text-[#E8622A]" : "text-white/20 group-hover:text-[#E8622A]/60"
                          }`}>
                            {link.number}
                          </span>

                          {/* Divider line */}
                          <div className={`w-px h-8 shrink-0 transition-colors duration-200 ${
                            isActive ? "bg-[#E8622A]/50" : "bg-white/10 group-hover:bg-[#E8622A]/30"
                          }`} />

                          {/* Labels */}
                          <div className="flex-1 min-w-0">
                            <p className={`text-xl font-serif font-semibold leading-tight transition-colors duration-200 ${
                              isActive ? "text-[#F47A3A]" : "text-white/90 group-hover:text-[#F47A3A]"
                            }`}>
                              {primary}
                            </p>
                            <p className="text-xs text-white/30 group-hover:text-[#F47A3A]/50 transition-colors duration-200 mt-0.5">
                              {secondary}
                            </p>
                          </div>

                          {/* Arrow */}
                          <ArrowUpRight className={`w-4 h-4 shrink-0 transition-all duration-200 ${
                            isActive ? "text-[#E8622A] opacity-100" : "text-white/20 opacity-0 group-hover:opacity-60 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          }`} />
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                {/* Shimmer divider */}
                <div className="h-px mb-6"
                  style={{ background: "linear-gradient(to right, transparent, rgba(232,98,42,0.25), transparent)" }}
                />

                {/* ── Language toggle ── */}
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.4 }}
                >
                  <div className="flex items-center gap-1.5 mb-2">
                    <Languages className="w-3 h-3 text-[#E8622A]/60" />
                    <p className="text-white/35 text-[10px] uppercase tracking-[0.2em] font-medium">
                      {en ? "Language / भाषा" : "भाषा / Language"}
                    </p>
                  </div>
                  <button
                    onClick={toggleLang}
                    className="flex items-center w-full rounded-xl overflow-hidden"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(232,98,42,0.2)",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
                    }}
                  >
                    {["en", "hi"].map((l) => (
                      <span
                        key={l}
                        className="flex-1 py-2.5 text-sm font-semibold text-center transition-all duration-300"
                        style={lang === l ? {
                          background: "linear-gradient(135deg, #E8622A, #C04A18)",
                          color: "white",
                          boxShadow: "0 2px 12px rgba(232,98,42,0.35)",
                        } : { color: "rgba(255,255,255,0.35)" }}
                      >
                        {l === "en" ? "English" : "हिंदी"}
                      </span>
                    ))}
                  </button>
                </motion.div>

                {/* ── Contact ── */}
                <motion.div
                  className="flex flex-col gap-2.5"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55, duration: 0.4 }}
                >
                  {[
                    { href: "tel:+917652012487", Icon: Phone, label: "+91 76520 12487" },
                    { href: "mailto:srnindia@yahoo.com", Icon: Mail, label: "srnindia@yahoo.com" },
                  ].map(({ href, Icon, label }) => (
                    <a
                      key={href}
                      href={href}
                      className="group flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all duration-200"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <span className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: "rgba(232,98,42,0.12)", border: "1px solid rgba(232,98,42,0.2)" }}
                      >
                        <Icon className="w-3.5 h-3.5 text-[#E8622A]" />
                      </span>
                      <span className="text-white/50 group-hover:text-[#F47A3A] text-sm transition-colors duration-200">
                        {label}
                      </span>
                    </a>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}