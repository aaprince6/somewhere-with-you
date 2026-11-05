"use client";

import { motion } from "framer-motion";
import { INTRO } from "@/lib/constants";
import { EnterButton } from "@/components/ui/EnterButton";

/**
 * Intro content only — the backdrop lives persistently in the page, so
 * entering is a cheap text crossfade instead of remounting the big image.
 */
export function IntroScene({ onEnter }: { onEnter: () => void }) {
  return (
    <motion.div
      aria-label="Introduction — Somewhere With You"
      className="absolute inset-0 z-30 flex items-center justify-center"
      exit={{ opacity: 0, y: -22, filter: "blur(4px)" }}
      transition={{ duration: 0.45, ease: "easeIn" }}
    >
      <div className="relative z-10 flex max-w-3xl flex-col items-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="mb-5 text-[11px] font-bold uppercase tracking-[0.5em] text-[#E9A85D]"
        >
          A cinematic moment
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.55 }}
          className="font-display text-5xl font-semibold leading-[1.05] text-white drop-shadow-[0_3px_28px_rgba(0,0,0,0.6)] sm:text-7xl"
        >
          {INTRO.heading}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1 }}
          className="font-display mt-5 text-xl font-semibold italic text-[#F5EBDD] sm:text-2xl"
        >
          {INTRO.subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-10"
        >
          <EnterButton onEnter={onEnter} />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="mt-8 max-w-md text-xs font-medium leading-relaxed text-[#F5EBDD]/65"
        >
          Sound begins after you enter — headphones recommended.
        </motion.p>
      </div>
    </motion.div>
  );
}
