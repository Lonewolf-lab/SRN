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
];

const tier3 = [
  { name: "Prakash Yadav", nameHindi: "प्रकाश यादव", role: "National Gen. Secretary", roleHindi: "राष्ट्रीय महासचिव", photo: getPhoto("Prakash Yadav") },
  { name: "Anand Gupta", nameHindi: "आनंद गुप्ता", role: "National Secretary", roleHindi: "राष्ट्रीय सचिव", photo: getPhoto("Anand Gupta") },
  { name: "Kishore Kumar", nameHindi: "किशोर कुमार", role: "National Treasurer", roleHindi: "राष्ट्रीय कोषाध्यक्ष", photo: getPhoto("Kishore Kumar") },
];

const tier4 = [
  { name: "Rajesh Desai", nameHindi: "राजेश देसाई", role: "National Joint Secretary", roleHindi: "राष्ट्रीय संयुक्त सचिव", photo: getPhoto("Rajesh Desai") },
  { name: "Sunil Verma", nameHindi: "सुनील वर्मा", role: "National Executive", roleHindi: "राष्ट्रीय कार्यकारिणी", photo: getPhoto("Sunil Verma") },
  { name: "Meena Singh", nameHindi: "मीना सिंह", role: "National Executive", roleHindi: "राष्ट्रीय कार्यकारिणी", photo: getPhoto("Meena Singh") },
  { name: "Ramesh Joshi", nameHindi: "रमेश जोशी", role: "National Executive", roleHindi: "राष्ट्रीय कार्यकारिणी", photo: getPhoto("Ramesh Joshi") },
];

const HexCard = ({ member, lang, size = "sm" }) => {
  const en = lang === "en";
  const isHero = size === "lg";
  
  // All hexagons are now exactly the same size and smaller
  const containerClass = "w-48 h-56 md:w-52 md:h-60";
  const avatarClass = "w-16 h-16 mb-2";
  
  const borderColor = isHero ? "bg-[#C9A84C]" : "bg-[#E8622A]";
  const shadowColor = isHero ? "drop-shadow-[0_0_15px_rgba(201,168,76,0.6)]" : "drop-shadow-[0_0_15px_rgba(232,98,42,0.6)]";
  
  const clipPathShape = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.8, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0 }
      }}
      whileHover={{ scale: 1.05, zIndex: 50 }}
      className={`relative flex items-center justify-center transition-transform duration-300 ${containerClass} hover:${shadowColor}`}
    >
      {/* Outer Hexagon (Border) */}
      <div 
        className={`absolute inset-0 ${borderColor} transition-colors duration-300`}
        style={{ clipPath: clipPathShape }}
      />
      
      {/* Inner Hexagon (Content Background) */}
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white flex flex-col items-center justify-center text-center px-2`}
        style={{ 
          clipPath: clipPathShape,
          width: "calc(100% - 6px)",
          height: "calc(100% - 6px)"
        }}
      >
        <div className={`rounded-full bg-gradient-to-br from-[#E8622A] to-[#C04A18] shadow-inner overflow-hidden border-2 border-[#FFF9F2] ${avatarClass}`}>
          <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
        </div>
        
        <h3 className={`font-bold text-[#1E0F05] font-serif leading-tight px-2 text-base md:text-lg`}>
          {en ? member.name : member.nameHindi}
        </h3>
        <p className={`text-[#7A5C45] mt-0.5 px-2 text-[11px] md:text-xs`}>
          {en ? member.nameHindi : member.name}
        </p>
        
        <span className="inline-block bg-[#FDF5EC] border border-[#E8622A]/20 text-[#E8622A] font-semibold text-[10px] md:text-xs rounded-full px-3 py-1 mt-2 mx-1 leading-tight break-words text-center">
          {en ? member.role : member.roleHindi}
        </span>
      </div>
    </motion.div>
  );
};

export default function NationalBearersChart({ lang }) {
  const ref = useFadeIn(0.1);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  return (
    <div ref={ref} className="w-full relative py-12 px-4 md:px-0">
      
      {/* Subtle Honeycomb Watermark */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="hexagons" width="50" height="86.6" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
              <polygon points="25,0 50,14.43 50,43.3 25,57.73 0,43.3 0,14.43" fill="none" stroke="#E8622A" strokeWidth="2"/>
              <polygon points="25,86.6 50,101.03 50,129.9 25,144.33 0,129.9 0,101.03" fill="none" stroke="#E8622A" strokeWidth="2"/>
              <polygon points="50,43.3 75,57.73 75,86.6 50,101.03 25,86.6 25,57.73" fill="none" stroke="#E8622A" strokeWidth="2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)"/>
        </svg>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative flex flex-col items-center max-w-6xl mx-auto z-10"
      >
        {/* Tier 1 - President */}
        <div className="flex justify-center w-full z-30">
          <HexCard member={tier1} lang={lang} size="lg" />
        </div>

        {/* Tier 2 - VPs */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-2 lg:gap-4 mt-6 md:-mt-[3.5rem] z-20">
          {tier2.map((member, i) => (
            <HexCard key={i} member={member} lang={lang} size="md" />
          ))}
        </div>

        {/* Tier 3 - General Sec, Sec, Treasurer */}
        <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-4 md:gap-2 lg:gap-4 mt-6 md:-mt-[3.5rem] z-10">
          {tier3.map((member, i) => (
            <HexCard key={i} member={member} lang={lang} size="sm" />
          ))}
        </div>

        {/* Tier 4 - Joint Sec, Executives */}
        <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-4 md:gap-2 lg:gap-4 mt-6 md:-mt-[3.5rem] z-0">
          {tier4.map((member, i) => (
            <HexCard key={i} member={member} lang={lang} size="sm" />
          ))}
        </div>

      </motion.div>
    </div>
  );
}
