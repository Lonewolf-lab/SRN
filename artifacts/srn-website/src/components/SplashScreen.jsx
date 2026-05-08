import { useEffect } from "react";
import { motion } from "framer-motion";

/**
 * Splash animation — 3.0s total split into 4 phases:
 *
 *  0.00 – 0.70s  (0% → 23%)   Logo fades in + scales 0.5 → 1
 *  0.70 – 1.80s  (23% → 60%)  Logo holds steady
 *  1.80 – 2.55s  (60% → 85%)  Logo ZOOMS (scale 1 → 22)  ← zoom first
 *  2.55 – 3.00s  (85% → 100%) Peach overlay fades out    ← THEN reveal
 *
 *  The overlay stays fully opaque until the zoom is complete,
 *  so the website is never visible while the logo is zooming.
 */
const DURATION = 3.0;
const T = [0, 0.23, 0.60, 0.85, 1]; // keyframe stops

export default function SplashScreen({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, (DURATION + 0.15) * 1000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    // Peach container — stays solid until zoom is DONE (t=0.85), then fades
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#FDDBC4" }}
      animate={{ opacity: [1, 1, 1, 1, 0] }}
      transition={{ duration: DURATION, times: T, ease: "easeInOut" }}
    >
      {/* Soft radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(232,98,42,0.18) 0%, transparent 70%)",
        }}
      />

      {/* Logo: appear → hold → zoom — fades with the overlay at the end */}
      <motion.img
        src="/logo.PNG"
        alt="Sashakt Rashtra Nirman"
        className="relative z-10 object-contain"
        style={{ width: 180, height: 180 }}
        animate={{
          opacity: [0,  1,   1,   1,  0  ],
          scale:   [0.5, 1,  1,   22, 22 ],
        }}
        transition={{
          duration: DURATION,
          times: T,
          ease: "easeOut",
        }}
      />
    </motion.div>
  );
}
