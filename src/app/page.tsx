"use client";
/* eslint-disable react-hooks/refs -- false positive: `yt.*` / `controls.*` are state values.
   Real refs (mountEl, playerRef, indexHolder) are only touched inside effects and callbacks. */

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { Heart, Shuffle } from "lucide-react";
import { IntroScene } from "@/components/scenes/IntroScene";
import { MusicPlayer } from "@/components/music/MusicPlayer";
import { Atmosphere } from "@/components/ui/Atmosphere";
import { Fireflies } from "@/components/ui/Fireflies";
import { Clock } from "@/components/ui/Clock";
import { ShareModal } from "@/components/ui/ShareModal";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { useYouTubePlayer } from "@/hooks/useYouTubePlayer";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { PLAYLIST, USE_YOUTUBE } from "@/lib/playlist";
import { BRAND, ROMANTIC_MESSAGES } from "@/lib/constants";

interface Controls {
  trackIndex: number;
  isPlaying: boolean;
  progress: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isLoading: boolean;
  error: string | null;
  hasAudio: boolean;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  seek: (t: number) => void;
  setVolume: (v: number) => void;
  toggleMute: () => void;
  play: (index?: number) => void;
}

const MESSAGE_INTERVAL = 6000;

function CinemaPage({ controls, hiddenHost }: { controls: Controls; hiddenHost?: ReactNode }) {
  const [entered, setEntered] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  const [queueOpen, setQueueOpen] = useState(false);
  const [dedicatedTo, setDedicatedTo] = useState<string | null>(null);

  // The hook returns a fresh `controls` object on every progress tick, so the
  // shortcut handler reads through a ref — otherwise the keydown listener
  // would be torn down and re-attached twice per second.
  const controlsRef = useRef(controls);
  useEffect(() => {
    controlsRef.current = controls;
  });

  // Personal dedication (?to=Name) — read once from the URL, sanitized.
  useEffect(() => {
    queueMicrotask(() => {
      try {
        const v = new URLSearchParams(window.location.search).get("to")?.trim() ?? "";
        const clean = v.replace(/[<>&"']/g, "").slice(0, 40);
        if (clean) setDedicatedTo(clean);
      } catch {
        // ignore malformed URLs
      }
    });
  }, []);

  // Cinematic volume fade-in on enter. Cancelled by any manual volume change
  // or on unmount.
  const fadeTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const cancelFade = useCallback(() => {
    if (fadeTimer.current) {
      clearInterval(fadeTimer.current);
      fadeTimer.current = null;
    }
  }, []);
  useEffect(() => () => cancelFade(), [cancelFade]);

  // Gentle pointer parallax for the backdrop (fine pointers only, no motion
  // when reduced-motion is preferred).
  const reduceMotion = useReducedMotion();
  const finePointer = useState(
    () => typeof window !== "undefined" && !!window.matchMedia?.("(pointer: fine)").matches
  )[0];
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spx = useSpring(px, { stiffness: 55, damping: 18 });
  const spy = useSpring(py, { stiffness: 55, damping: 18 });
  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (!finePointer || reduceMotion || !entered) return;
      const r = e.currentTarget.getBoundingClientRect();
      px.set(((e.clientX - r.left) / r.width - 0.5) * 18);
      py.set(((e.clientY - r.top) / r.height - 0.5) * 12);
    },
    [finePointer, reduceMotion, entered, px, py]
  );

  // Instant start: fire playback inside the click gesture and crossfade the
  // text. The backdrop is persistent (never remounts), so there is no image
  // reload, no black dip, and only one cheap text crossfade to animate.
  const handleEnter = useCallback(() => {
    if (entered) return;
    cancelFade();
    // Read through the ref: `controls` is a fresh object every tick and this
    // callback's deps are stable — the first-render copy would call a `play`
    // bound to `ready=false`, leaving pendingAutoplay unconsumed (silent).
    const c = controlsRef.current;
    // Start audible right away (0.25) and bloom to full volume fast — the old
    // ramp began at true zero, so early audio was mistaken for more loading.
    c.setVolume(0.25);
    try {
      void c.play(0);
    } catch {
      // player surfaces its own error UI
    }
    setEntered(true);
    const target = 0.8;
    // Ramp from a local variable — the state from setVolume(0.25) above may
    // not be committed when the first tick fires, and reading it back would
    // skip the whole fade in one step.
    let vol = 0.25;
    fadeTimer.current = setInterval(() => {
      vol = Math.min(target, vol + 0.07);
      controlsRef.current.setVolume(vol);
      if (vol >= target) cancelFade();
    }, 100);
  }, [entered, cancelFade]);

  // Manual volume interaction cancels the fade-in ramp.
  const handleUserVolume = useCallback(
    (v: number) => {
      cancelFade();
      controlsRef.current.setVolume(v);
    },
    [cancelFade]
  );
  const handleUserMute = useCallback(() => {
    cancelFade();
    controlsRef.current.toggleMute();
  }, [cancelFade]);

  // Rotating romantic line under the title (inline; MessageScene was removed)
  useEffect(() => {
    if (!entered) return;
    const id = setInterval(() => {
      setMessageIndex((i) => (i + 1) % ROMANTIC_MESSAGES.length);
    }, MESSAGE_INTERVAL);
    return () => clearInterval(id);
  }, [entered]);

  // Keyboard shortcuts, like the reference: Space, arrows, N/P, M, S
  useEffect(() => {
    if (!entered || shareOpen) return;
    const onKey = (e: KeyboardEvent) => {
      const c = controlsRef.current;
      const el = e.target as HTMLElement | null;
      const tag = el?.tagName;
      // Never hijack keys while the user is typing or when an interactive
      // element has focus — otherwise Space toggles playback *and* clicks the
      // focused button, and arrow keys fight the sliders.
      if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        tag === "BUTTON" ||
        tag === "A" ||
        el?.isContentEditable
      )
        return;
      switch (e.key) {
        case " ":
          e.preventDefault();
          void c.toggle();
          break;
        case "ArrowRight":
          c.seek(c.progress + 10);
          break;
        case "ArrowLeft":
          c.seek(c.progress - 10);
          break;
        case "n":
        case "N":
          void c.next();
          break;
        case "p":
        case "P":
          void c.prev();
          break;
        case "m":
        case "M":
          c.toggleMute();
          break;
        case "q":
        case "Q":
          setQueueOpen((o) => !o);
          break;
        case "s":
        case "S": {
          let n = Math.floor(Math.random() * PLAYLIST.length);
          if (PLAYLIST.length > 1 && n === c.trackIndex) {
            n = (n + 1) % PLAYLIST.length;
          }
          void c.play(n);
          break;
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [entered, shareOpen]);

  const surprise = useCallback(() => {
    const c = controlsRef.current;
    let n = Math.floor(Math.random() * PLAYLIST.length);
    if (PLAYLIST.length > 1 && n === c.trackIndex) {
      n = (n + 1) % PLAYLIST.length;
    }
    void c.play(n);
  }, []);

  return (
    <main
      onPointerMove={onPointerMove}
      className="cinematic-vignette film-grain relative h-[100svh] overflow-hidden bg-[#101A14] text-[#F5EBDD]"
    >
      {hiddenHost}

      {/* Backdrop — persistent, with gentle pointer parallax on desktop */}
      <motion.div
        style={reduceMotion ? undefined : { x: spx, y: spy }}
        className="absolute -inset-4"
        aria-hidden="true"
      >
        <Image
          src="/images/meadow-couple-sunset.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="kenburns object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#101A14]/70 via-[#101A14]/30 to-[#101A14]/85" />
        <div className="absolute inset-0 bg-[#E9A85D]/10 mix-blend-overlay" />
      </motion.div>
      <Atmosphere density={20} />
      <Fireflies count={14} />

      {/* Top bar */}
      <header className="absolute inset-x-0 top-0 z-20 flex items-start justify-between p-5 sm:p-7">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E9A85D]">
            <Heart className="h-5 w-5 fill-[#101A14] text-[#101A14]" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-sm font-bold uppercase tracking-[0.2em]">
              {BRAND.name}
            </span>
            <span className="block text-[10px] uppercase tracking-[0.35em] text-[#F5EBDD]/60">
              Golden hour · Meadow
            </span>
          </span>
        </div>
        <div className="flex flex-col items-end gap-1">
          <Clock />
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#F5EBDD]/60">
            {PLAYLIST.length} tracks · non-stop
          </span>
        </div>
      </header>

      {/* Center hero — inert until entered so invisible buttons can't be clicked */}
      <div
        aria-hidden={!entered}
        className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 pb-24 text-center"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: entered ? 1 : 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-4 text-[11px] font-bold uppercase tracking-[0.5em] text-[#F5EBDD]/80"
        >
          {PLAYLIST.length} tracks · non-stop
        </motion.p>
        <motion.h1
          aria-label="Somewhere With You."
          initial={{ opacity: 0 }}
          animate={{ opacity: entered ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="font-display max-w-5xl text-5xl font-semibold leading-[1.02] text-white drop-shadow-[0_3px_28px_rgba(0,0,0,0.6)] sm:text-7xl"
        >
          {["Somewhere", "With", "You."].map((word, i) => (
            <span
              key={word}
              aria-hidden="true"
              className="inline-block overflow-hidden pb-[0.1em] align-bottom"
            >
              <motion.span
                className="inline-block"
                initial={{ y: "110%" }}
                animate={{ y: entered ? "0%" : "110%" }}
                transition={{ duration: 0.85, delay: 0.2 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}
                {i < 2 ? " " : ""}
              </motion.span>
            </span>
          ))}
        </motion.h1>
        {dedicatedTo && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: entered ? 1 : 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-3 inline-flex items-center gap-1.5 text-sm tracking-wide text-[#F5EBDD]/85"
          >
            <Heart className="h-3.5 w-3.5 fill-[#E9A85D] text-[#E9A85D]" aria-hidden="true" />
            For {dedicatedTo}
          </motion.p>
        )}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: entered ? 1 : 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.4em] text-[#F5EBDD]/80"
        >
          <span className="h-px w-10 bg-[#F5EBDD]/30" aria-hidden="true" />
          No rush · No noise · Just us
          <span className="h-px w-10 bg-[#F5EBDD]/30" aria-hidden="true" />
        </motion.div>

        {/* Rotating romantic line */}
        <div className="mt-4 flex h-9 items-center justify-center" aria-live="polite">
          <AnimatePresence mode="wait">
            {entered && (
              <motion.p
                key={messageIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.6 }}
                className="font-display text-lg font-semibold italic text-[#F5EBDD] sm:text-xl"
              >
                “{ROMANTIC_MESSAGES[messageIndex]}”
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: entered ? 1 : 0, y: entered ? 0 : 16 }}
          transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
          className={`mt-7 flex flex-wrap items-center justify-center gap-3 ${
            entered ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          <button
            type="button"
            onClick={surprise}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-6 py-3 text-[12px] font-bold uppercase tracking-[0.22em] text-[#F5EBDD] backdrop-blur transition-colors hover:border-[#E9A85D]/60 hover:text-[#E9A85D]"
          >
            <Shuffle className="h-4 w-4" aria-hidden="true" />
            Surprise me
          </button>
          <button
            type="button"
            onClick={() => setShareOpen(true)}
            className="inline-flex items-center gap-2 rounded-full bg-[#E9A85D] px-6 py-3 text-[12px] font-bold uppercase tracking-[0.22em] text-[#101A14] shadow-[0_8px_40px_rgba(233,168,93,0.35)] transition-colors hover:bg-[#F5EBDD]"
          >
            <Heart className="h-4 w-4" aria-hidden="true" />
            Share this moment
          </button>
        </motion.div>
      </div>

      {/* Player + shortcut hints */}
      {entered && (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-2 z-10 hidden justify-center gap-5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#F5EBDD]/55 md:flex"
          >
            <span><Kbd>Space</Kbd> play / pause</span>
            <span><Kbd>←</Kbd><Kbd>→</Kbd> seek</span>
            <span><Kbd>N</Kbd><Kbd>P</Kbd> track</span>
            <span><Kbd>Q</Kbd> queue</span>
            <span><Kbd>M</Kbd> mute</span>
            <span><Kbd>S</Kbd> shuffle</span>
          </div>
          <MusicPlayer
            trackIndex={controls.trackIndex}
            isPlaying={controls.isPlaying}
            progress={controls.progress}
            duration={controls.duration}
            volume={controls.volume}
            isMuted={controls.isMuted}
            isLoading={controls.isLoading}
            error={controls.error}
            hasAudio={controls.hasAudio}
            onToggle={controls.toggle}
            onNext={controls.next}
            onPrev={controls.prev}
            onSeek={controls.seek}
            onVolume={handleUserVolume}
            onMute={handleUserMute}
            onSelect={(i) => void controls.play(i)}
            queueOpen={queueOpen}
            onQueueChange={setQueueOpen}
          />
        </>
      )}

      <ShareModal open={shareOpen} onClose={() => setShareOpen(false)} />

      {/* Entrance overlay — sync crossfade with the hero (no black dip) */}
      <AnimatePresence>
        {!entered && <IntroScene key="intro" onEnter={handleEnter} />}
      </AnimatePresence>
    </main>
  );
}

function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="mx-0.5 rounded-md border border-white/15 bg-white/5 px-1.5 py-0.5 font-sans normal-case tracking-normal">
      {children}
    </kbd>
  );
}

function FileExperience() {
  const controls = useAudioPlayer(false);
  return <CinemaPage controls={controls} />;
}

function YouTubeExperience() {
  const yt = useYouTubePlayer();
  return (
    <CinemaPage
      controls={yt}
      hiddenHost={
        <div aria-hidden="true" className="pointer-events-none absolute h-[4px] w-[4px] overflow-hidden opacity-0">
          <div id="yt-hidden-audio-host" ref={yt.mountNode} />
        </div>
      }
    />
  );
}

export default function Home() {
  if (USE_YOUTUBE) return <YouTubeExperience />;
  return <FileExperience />;
}
