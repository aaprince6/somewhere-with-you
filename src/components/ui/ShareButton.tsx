"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, MessageCircle, Share2 } from "lucide-react";
import {
  copyLink,
  getShareUrl,
  nativeShare,
  whatsappShareUrl,
  isValidShareUrl,
} from "@/lib/sharing";
import { FINALE } from "@/lib/constants";

export function ShareButton() {
  const [feedback, setFeedback] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleShare = async (mode: "auto" | "whatsapp" | "copy") => {
    const url = getShareUrl();
    if (!isValidShareUrl(url)) {
      setFeedback("This preview can't be shared yet — deploy it first.");
      return;
    }
    if (mode === "auto") {
      const ok = await nativeShare(url);
      if (ok) {
        setFeedback("Shared with love.");
        return;
      }
      // fall through to options below — show hint
      setFeedback("Choose how to share below.");
      return;
    }
    if (mode === "whatsapp") {
      window.open(whatsappShareUrl(url), "_blank", "noopener,noreferrer");
      setFeedback("Opening WhatsApp…");
      return;
    }
    const ok = await copyLink(url);
    setCopied(ok);
    setFeedback(ok ? "Link copied — send it to someone you love." : "Copy failed — long-press the URL instead.");
    if (ok) setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <motion.button
          type="button"
          onClick={() => handleShare("auto")}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          aria-label="Share this little moment"
          className="inline-flex items-center gap-2 rounded-full bg-[#E9A85D] px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.25em] text-[#101A14] shadow-[0_8px_40px_rgba(233,168,93,0.35)] transition-colors hover:bg-[#F5EBDD]"
        >
          <Share2 className="h-4 w-4" aria-hidden="true" />
          {FINALE.shareCta}
        </motion.button>
      </div>
      <div className="flex items-center gap-2 text-sm text-[#F5EBDD]/70">
        <button
          type="button"
          onClick={() => handleShare("whatsapp")}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 backdrop-blur transition-colors hover:border-[#E9A85D] hover:text-[#E9A85D]"
          aria-label="Share via WhatsApp"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp
        </button>
        <button
          type="button"
          onClick={() => handleShare("copy")}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 backdrop-blur transition-colors hover:border-[#E9A85D] hover:text-[#E9A85D]"
          aria-label="Copy link to share"
        >
          {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
          {copied ? "Copied" : "Copy link"}
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-5 text-sm italic text-[#F5EBDD]/80">
        {feedback ?? " "}
      </p>
    </div>
  );
}
