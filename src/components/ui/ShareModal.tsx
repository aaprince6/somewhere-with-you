"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Heart, Link2, X } from "lucide-react";
import { FINALE } from "@/lib/constants";
import { ShareButton } from "@/components/ui/ShareButton";
import { copyLink, getShareUrl, isValidShareUrl } from "@/lib/sharing";

/** Finale message + sharing as a modal — keeps the whole site on one screen. */
export function ShareModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [inviteMsg, setInviteMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const base = open ? getShareUrl() : "";
  const inviteLink =
    name.trim() && isValidShareUrl(base)
      ? `${base}${base.includes("?") ? "&" : "?"}to=${encodeURIComponent(name.trim().slice(0, 40))}`
      : "";

  const copyInvite = async () => {
    if (!inviteLink) return;
    const ok = await copyLink(inviteLink);
    setCopied(ok);
    setInviteMsg(ok ? "Invite link copied — send it to them." : "Copy failed — long-press the link instead.");
    if (ok) setTimeout(() => setCopied(false), 2500);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Share this little moment"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[#101A14]/70 p-6 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90svh] w-full max-w-md overflow-y-auto rounded-3xl border border-white/10 bg-[#17251C]/95 p-8 text-center shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close sharing"
              className="absolute right-4 top-4 rounded-full p-1.5 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-[#E9A85D]/40 bg-[#E9A85D]/10">
              <Heart className="h-5 w-5 fill-[#E9A85D] text-[#E9A85D]" aria-hidden="true" />
            </div>
            <h2 className="font-display text-2xl leading-snug text-[#F5EBDD] sm:text-3xl">
              {FINALE.heading}
            </h2>
            <p className="font-display mt-3 text-lg italic text-[#E9A85D]">{FINALE.sub}</p>

            {/* Personal dedication — generates a link that greets them by name */}
            <div className="mt-7 rounded-2xl border border-white/10 bg-black/20 p-4 text-left">
              <label
                htmlFor="dedicate-name"
                className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#F5EBDD]/70"
              >
                Dedicate this to someone
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  id="dedicate-name"
                  type="text"
                  value={name}
                  maxLength={40}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Their name…"
                  autoComplete="off"
                  className="min-w-0 flex-1 rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-[#F5EBDD] placeholder:text-white/30 focus:border-[#E9A85D]/60 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={copyInvite}
                  disabled={!inviteLink}
                  aria-label="Copy personalized invite link"
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-[#E9A85D] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#101A14] transition-colors hover:bg-[#F5EBDD] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Link2 className="h-4 w-4" aria-hidden="true" />}
                  {copied ? "Copied" : "Invite"}
                </button>
              </div>
              <p className="mt-2 min-h-4 text-xs italic text-[#F5EBDD]/70" role="status" aria-live="polite">
                {inviteMsg ?? (inviteLink ? "They'll see it addressed to them." : " ")}
              </p>
            </div>

            <div className="mt-5">
              <ShareButton />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
