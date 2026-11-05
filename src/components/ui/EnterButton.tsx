"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function EnterButton({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="flex flex-col items-center gap-6">
      <motion.button
        type="button"
        onClick={onEnter}
        aria-label="Enter this moment and start the music"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="group relative rounded-full border border-[#F5EBDD]/40 bg-white/5 px-10 py-4 text-[13px] font-medium uppercase tracking-[0.35em] text-[#F5EBDD] backdrop-blur-md transition-colors hover:border-[#E9A85D] hover:text-[#E9A85D]"
      >
        <span className="absolute inset-0 rounded-full bg-[#E9A85D]/0 blur-xl transition-all duration-500 group-hover:bg-[#E9A85D]/20" />
        <span className="relative">Enter this moment</span>
      </motion.button>
      <motion.div
        aria-hidden="true"
        animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="h-5 w-5 text-[#F5EBDD]/70" />
      </motion.div>
    </div>
  );
}
