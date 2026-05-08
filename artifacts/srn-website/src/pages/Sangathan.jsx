import { useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, Eye, CheckCircle, Heart } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import MemberCard from "../components/MemberCard";
import LegalBadge from "../components/LegalBadge";
import { useLanguage } from "../context/LanguageContext";
import { useFadeIn } from "../hooks/useFadeIn";

const valueIconMap = { Shield, Eye, CheckCircle, Heart };

function FadeSection({ children, className = "", delay = 0 }) {
  const ref = useFadeIn(0.12);
  return (
    <div ref={ref} className={`fade-in-section ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export default function Sangathan() {
  const { t, lang } = useLanguage();
  const s = t.sangathan;

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Sashakt Rashtra Nirman – Sangathan";
  }, []);

  return (
    <div className="bg-[#FDF5EC]">

      {/* ── Banner ───────────────────────────────────────────────────── */}
      <section
        className="relative bg-[#1E0F05] py-28 text-center px-6 overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `repeating-linear-gradient(-45deg, white, white 1px, transparent 1px, transparent 28px)`,
          }}
        />
        <div className="absolute inset-0 hero-glow pointer-events-none opacity-70" />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white font-serif tracking-tight">
            {s.bannerTitleHindi}
          </h1>
          {lang === "en" && (
            <p className="text-[#F47A3A] text-xl mt-3 font-medium">Our Organization</p>
          )}
          <p className="text-orange-200/70 text-base mt-3 max-w-lg mx-auto">{s.bannerTagline}</p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="h-1 bg-gradient-to-r from-[#E8622A] to-[#D4880C] mt-8 mx-auto w-24 rounded-full origin-center"
          />
        </motion.div>
      </section>

      {/* ── Leadership ───────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#FDF5EC]">
        <div className="max-w-4xl mx-auto">
          <FadeSection>
            <SectionHeader
              hindi={s.leadershipTitleHindi}
              english={lang === "en" ? "Leadership" : null}
            />
          </FadeSection>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-stretch mt-10">
            {/* Patron */}
            <FadeSection delay={100} className="flex-1">
              <div className="h-full max-w-sm border-2 border-[#E8622A] rounded-2xl bg-white p-8 text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 card-shimmer mx-auto sm:mx-0">
                <span className="inline-block bg-gradient-to-r from-[#E8622A] to-[#C04A18] text-white text-sm rounded-full px-4 py-1 mb-4">
                  {s.patron.badgeHindi}
                  {lang === "en" ? " / Patron" : ""}
                </span>
                <h3 className="text-xl font-bold text-[#5C1010] font-serif leading-tight">
                  {s.patron.nameHindi}
                </h3>
                <p className="text-sm text-[#7A5C45] mt-1">{s.patron.english}</p>
                <p className="text-sm text-[#7A5C45] mt-2">{s.patron.designationHindi}</p>
                {lang === "en" && (
                  <p className="text-xs text-[#7A5C45] mt-1">{s.patron.designation}</p>
                )}
              </div>
            </FadeSection>

            {/* President */}
            <FadeSection delay={200} className="flex-1">
              <div className="h-full max-w-sm bg-gradient-to-br from-[#1E0F05] to-[#3A1A0A] rounded-2xl p-8 text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 card-shimmer mx-auto sm:mx-0">
                <span className="inline-block bg-gradient-to-r from-[#E8622A] to-[#C04A18] text-white text-sm rounded-full px-4 py-1 mb-4">
                  {s.president.badgeHindi}
                  {lang === "en" ? " / National President" : ""}
                </span>
                <h3 className="text-xl font-bold text-white font-serif leading-tight">
                  {s.president.nameHindi}
                </h3>
                <p className="text-[#F47A3A] text-sm mt-1">{s.president.name}</p>
                <p className="text-white/60 text-sm mt-2">{s.president.credentials}</p>
              </div>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* ── Advisory Board ───────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#FFF9F2]">
        <div className="max-w-5xl mx-auto">
          <FadeSection>
            <SectionHeader
              hindi={s.advisoryTitleHindi}
              english={lang === "en" ? "Advisory Board" : null}
            />
          </FadeSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {s.advisors.map((advisor, i) => (
              <FadeSection key={i} delay={i * 70}>
                <MemberCard {...advisor} />
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-[#FDF5EC]">
        <div className="max-w-5xl mx-auto">
          <FadeSection>
            <SectionHeader
              hindi={s.valuesTitleHindi}
              english={lang === "en" ? "Our Commitment" : null}
            />
          </FadeSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            {s.values.map((val, i) => {
              const Icon = valueIconMap[val.icon] || Shield;
              return (
                <FadeSection key={i} delay={i * 80}>
                  <div className="bg-white rounded-xl p-6 text-center border border-[#F0D5B8] shadow-sm hover:shadow-md hover:border-[#E8622A] hover:-translate-y-1 transition-all duration-300 card-shimmer h-full">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#E8622A]/15 to-[#E8622A]/5 flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-6 h-6 text-[#E8622A]" />
                    </div>
                    <h3 className="font-bold text-[#1E0F05] text-base">{val.titleHindi}</h3>
                    {lang === "en" && (
                      <p className="text-xs text-[#7A5C45] mt-0.5">{val.title}</p>
                    )}
                    <p className="text-sm text-[#7A5C45] mt-2">{val.desc}</p>
                  </div>
                </FadeSection>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
