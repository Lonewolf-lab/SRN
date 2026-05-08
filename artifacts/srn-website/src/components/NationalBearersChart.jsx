import { motion } from "framer-motion";
import { useFadeIn } from "../hooks/useFadeIn";

const getPhoto = (name) => `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=E8622A&color=fff&size=150`;

const tier1 = {
  name: "Rajendra Sharma",
  nameHindi: "राजेंद्र शर्मा",
  role: "National President",
  roleHindi: "राष्ट्रीय अध्यक्ष",
  photo: getPhoto("Rajendra Sharma"),
};

const tier2 = [
  { name: "Suresh Patel", nameHindi: "सुरेश पटेल", role: "National Vice President", roleHindi: "राष्ट्रीय उपाध्यक्ष", photo: getPhoto("Suresh Patel") },
  { name: "Amitabh Singh", nameHindi: "अमिताभ सिंह", role: "National Vice President", roleHindi: "राष्ट्रीय उपाध्यक्ष", photo: getPhoto("Amitabh Singh") },
  { name: "Vikram Reddy", nameHindi: "विक्रम रेड्डी", role: "National Vice President", roleHindi: "राष्ट्रीय उपाध्यक्ष", photo: getPhoto("Vikram Reddy") },
];

const tier3 = [
  { name: "Prakash Yadav", nameHindi: "प्रकाश यादव", role: "National Gen. Sec.", roleHindi: "राष्ट्रीय महासचिव", photo: getPhoto("Prakash Yadav") },
  { name: "Anand Gupta", nameHindi: "आनंद गुप्ता", role: "National Secretary", roleHindi: "राष्ट्रीय सचिव", photo: getPhoto("Anand Gupta") },
  { name: "Kishore Kumar", nameHindi: "किशोर कुमार", role: "National Treasurer", roleHindi: "राष्ट्रीय कोषाध्यक्ष", photo: getPhoto("Kishore Kumar") },
  { name: "Rajesh Desai", nameHindi: "राजेश देसाई", role: "National Joint Sec.", roleHindi: "राष्ट्रीय संयुक्त सचिव", photo: getPhoto("Rajesh Desai") },
];

const OrgCard = ({ member, lang, size = "sm" }) => {
  const en = lang === "en";
  const isHero = size === "lg";
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -4 }}
      className={`bg-white rounded-xl shadow-sm hover:shadow-md border border-[#F0D5B8] border-l-4 border-l-[#E8622A] p-5 flex flex-col items-center text-center transition-all duration-300 relative z-10 w-full mx-auto ${isHero ? "max-w-xs" : "max-w-[220px]"}`}
    >
      <div className={`rounded-full bg-gradient-to-br from-[#E8622A] to-[#C04A18] shadow-inner mb-3 overflow-hidden border-4 border-[#FFF9F2] shadow-sm ${isHero ? "w-28 h-28" : "w-20 h-20"}`}>
        <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
      </div>
      <span className="inline-block bg-[#FDF5EC] border border-[#E8622A]/20 text-[#E8622A] font-medium text-xs rounded-full px-3 py-1 mb-2">
        {en ? member.role : member.roleHindi}
      </span>
      <h3 className={`font-bold text-[#1E0F05] font-serif leading-tight ${isHero ? "text-xl" : "text-lg"}`}>
        {en ? member.name : member.nameHindi}
      </h3>
      <p className="text-[#7A5C45] text-xs mt-1">
        {en ? member.nameHindi : member.name}
      </p>
    </motion.div>
  );
};

export default function NationalBearersChart({ lang }) {
  const ref = useFadeIn(0.1);

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  const lineVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div ref={ref} className="w-full relative py-10 px-4 md:px-0">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative flex flex-col items-center gap-12 md:gap-16 max-w-5xl mx-auto"
      >
        {/* Tier 1 */}
        <div className="relative flex justify-center w-full">
          <OrgCard member={tier1} lang={lang} size="lg" />
          
          {/* Vertical drop from Tier 1 (Desktop only) */}
          <motion.div 
            variants={lineVariants}
            className="hidden md:block absolute w-px bg-[#E8622A]/60 h-16 top-full left-1/2 -translate-x-1/2 origin-top"
          />
        </div>

        {/* Tier 2 */}
        <div className="relative w-full">
          {/* Horizontal connecting line above Tier 2 */}
          <motion.div 
            variants={lineVariants}
            className="hidden md:block absolute h-px bg-[#E8622A]/60 top-[-32px] left-[16.66%] right-[16.66%] origin-center"
          />
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4 relative z-10">
            {tier2.map((member, i) => (
              <div key={i} className="relative w-full flex justify-center flex-1">
                {/* Vertical drop to each Tier 2 card */}
                <motion.div 
                  variants={lineVariants}
                  className="hidden md:block absolute w-px bg-[#E8622A]/60 h-8 -top-8 left-1/2 -translate-x-1/2 origin-top"
                />
                <OrgCard member={member} lang={lang} size="sm" />
                
                {/* Middle card vertical drop to Tier 3 */}
                {i === 1 && (
                  <motion.div 
                    variants={lineVariants}
                    className="hidden md:block absolute w-px bg-[#E8622A]/60 h-16 top-full left-1/2 -translate-x-1/2 origin-top"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tier 3 */}
        <div className="relative w-full">
          {/* Horizontal connecting line above Tier 3 */}
          <motion.div 
            variants={lineVariants}
            className="hidden md:block absolute h-px bg-[#E8622A]/60 top-[-32px] left-[12.5%] right-[12.5%] origin-center"
          />
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4 relative z-10">
            {tier3.map((member, i) => (
              <div key={i} className="relative w-full flex justify-center flex-1">
                {/* Vertical drop to each Tier 3 card */}
                <motion.div 
                  variants={lineVariants}
                  className="hidden md:block absolute w-px bg-[#E8622A]/60 h-8 -top-8 left-1/2 -translate-x-1/2 origin-top"
                />
                <OrgCard member={member} lang={lang} size="sm" />
              </div>
            ))}
          </div>
        </div>

      </motion.div>
    </div>
  );
}
