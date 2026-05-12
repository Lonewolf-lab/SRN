import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

// ── Indian states and Union Territories ──────────────────────────────────────

export const INDIAN_STATES = [
  // 28 States
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  // 8 Union Territories
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi (NCT)",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

// ── Framer Motion variants ────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

// ── Decorative left panel ─────────────────────────────────────────────────────

function DecorativePanel() {
  return (
    <div className="hidden md:flex w-1/2 flex-col items-center justify-center bg-[#1E0A04] relative overflow-hidden min-h-screen">
      {/* Radial orange glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(232,98,42,0.18) 0%, transparent 65%)",
        }}
      />

      {/* Floating logo */}
      <motion.img
        src="/logo.PNG"
        alt="Sashakt Rashtra Nirman Logo"
        className="w-44 h-44 object-contain drop-shadow-2xl relative z-10"
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      />

      {/* English name — always shown */}
      <h1 className="text-white font-bold text-2xl font-serif mt-6 text-center relative z-10 px-8">
        Sashakt Rashtra Nirman
      </h1>

      {/* Decorative divider */}
      <div
        className="mt-3 w-12 h-0.5 rounded-full relative z-10"
        style={{ background: "linear-gradient(to right, #E8622A, #D4880C)" }}
      />

      {/* Hindi name — always shown regardless of active language */}
      <p className="text-[#F47A3A]/70 font-serif text-lg mt-3 text-center relative z-10 px-8">
        सशक्त राष्ट्र निर्माण
      </p>
    </div>
  );
}

// ── Signup page ───────────────────────────────────────────────────────────────

export default function Signup() {
  const { t } = useLanguage();
  const sc = t.signup;

  function handleSubmit(e) {
    e.preventDefault();
    // Placeholder — wire to backend API here
    console.log("Signup form submitted");
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-[#FEF0E6] border border-[#E8D5B8] " +
    "focus:outline-none focus:border-[#E8622A] focus:ring-2 focus:ring-[#E8622A]/20 " +
    "text-[#2C1810] placeholder-[#B89070] transition-colors duration-200 text-sm";

  const labelClass = "block text-sm font-semibold text-[#5C3A1E] mb-1.5";

  return (
    <div className="min-h-screen flex">
      {/* Left — decorative panel */}
      <DecorativePanel />

      {/* Right — form panel */}
      <motion.div
        className="flex-1 md:w-1/2 flex flex-col bg-[#FDF5EC] min-h-screen"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Top bar — back link */}
        <div className="px-8 pt-8 pb-4">
          <Link
            to="/"
            aria-label={sc.backToHome}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#7A5C45] hover:text-[#E8622A] transition-colors duration-200 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
            {sc.backToHome}
          </Link>
        </div>

        {/* Form container — scrollable on small screens */}
        <div className="flex-1 flex items-start justify-center px-8 py-4 pb-12">
          <div className="w-full max-w-md">
            {/* Page title */}
            <motion.h2
              className="text-3xl font-bold font-serif text-[#2C1810] mb-2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {sc.title}
            </motion.h2>
            <motion.p
              className="text-sm text-[#7A5C45] mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.05 }}
            >
              Join us in building a stronger nation.
            </motion.p>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-5"
              >
                {/* Full Name */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="signup-name" className={labelClass}>
                    {sc.nameLabel}
                  </label>
                  <input
                    id="signup-name"
                    type="text"
                    placeholder={sc.namePlaceholder}
                    autoComplete="name"
                    className={inputClass}
                  />
                </motion.div>

                {/* Email */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="signup-email" className={labelClass}>
                    {sc.emailLabel}
                  </label>
                  <input
                    id="signup-email"
                    type="email"
                    placeholder={sc.emailPlaceholder}
                    autoComplete="email"
                    className={inputClass}
                  />
                </motion.div>

                {/* Phone */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="signup-phone" className={labelClass}>
                    {sc.phoneLabel}
                  </label>
                  <input
                    id="signup-phone"
                    type="tel"
                    placeholder={sc.phonePlaceholder}
                    autoComplete="tel"
                    className={inputClass}
                  />
                </motion.div>

                {/* State / UT dropdown */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="signup-state" className={labelClass}>
                    {sc.stateLabel}
                  </label>
                  <select
                    id="signup-state"
                    defaultValue=""
                    className={inputClass + " cursor-pointer appearance-none"}
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23B89070' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 1rem center",
                      paddingRight: "2.5rem",
                    }}
                  >
                    <option value="" disabled>
                      {sc.stateDefault}
                    </option>
                    {INDIAN_STATES.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </motion.div>

                {/* Password */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="signup-password" className={labelClass}>
                    {sc.passwordLabel}
                  </label>
                  <input
                    id="signup-password"
                    type="password"
                    placeholder={sc.passwordPlaceholder}
                    autoComplete="new-password"
                    className={inputClass}
                  />
                </motion.div>

                {/* Confirm Password */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="signup-confirm" className={labelClass}>
                    {sc.confirmLabel}
                  </label>
                  <input
                    id="signup-confirm"
                    type="password"
                    placeholder={sc.confirmPlaceholder}
                    autoComplete="new-password"
                    className={inputClass}
                  />
                </motion.div>

                {/* Submit */}
                <motion.div variants={itemVariants} className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl font-semibold text-white text-sm
                               bg-gradient-to-r from-[#E8622A] to-[#C04A18]
                               shadow-md shadow-orange-900/25
                               hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-900/30
                               active:translate-y-0
                               transition-all duration-200"
                  >
                    {sc.submitBtn}
                  </button>
                </motion.div>
              </motion.div>
            </form>

            {/* Switch to login */}
            <motion.p
              className="mt-6 text-center text-sm text-[#7A5C45]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.7 }}
            >
              <Link
                to="/login"
                className="font-semibold text-[#E8622A] hover:text-[#C04A18] transition-colors duration-200"
              >
                {sc.haveAccount}
              </Link>
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
