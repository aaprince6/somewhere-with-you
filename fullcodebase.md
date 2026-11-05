# Full Codebase Snapshot

Generated: 2026-11-05T20:14:06.100Z
Files: 26

```
.env.example
.gitignore
AGENTS.md
eslint.config.mjs
next-env.d.ts
next.config.ts
README.md
src/app/globals.css
src/app/layout.tsx
src/app/page.tsx
src/components/music/MusicPlayer.tsx
src/components/scenes/IntroScene.tsx
src/components/ui/Atmosphere.tsx
src/components/ui/Clock.tsx
src/components/ui/EnterButton.tsx
src/components/ui/Fireflies.tsx
src/components/ui/ShareButton.tsx
src/components/ui/ShareModal.tsx
src/hooks/useAudioPlayer.ts
src/hooks/useReducedMotion.ts
src/hooks/useYouTubePlayer.ts
src/lib/constants.ts
src/lib/playlist.ts
src/lib/sharing.ts
src/lib/youtube.ts
src/types/music.ts
```

## `.env.example`

```text
# Public canonical URL used for OG tags and share links. Do not commit secrets here.
NEXT_PUBLIC_SITE_URL=

```

## `.gitignore`

```text
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env files (can opt-in for committing if needed)
.env*

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

```

## `AGENTS.md`

```text
<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

```

## `eslint.config.mjs`

```text
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;

```

## `next-env.d.ts`

```text
/// <reference types="next" />
/// <reference types="next/image-types/global" />
import "./.next/types/routes.d.ts";
import "./.next/types/root-params.d.ts";

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.

```

## `next.config.ts`

```text
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

```

## `README.md`

```text
# Somewhere With You — Every Moment Feels Better With You

A cinematic, single-page romantic web experience: golden sunset meadow, elegant
typography, ambient motion, and a floating music player.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm start
```

Requires Node 20+.

## Replacing background images

Original AI-generated scenes ship in `public/images/`:

- `meadow-couple-sunset.webp` — intro + main scene (couple from behind)
- `meadow-horizon-sunset.webp` — finale (empty horizon)

To replace:

1. Export 16:9 WebP or AVIF (e.g. 1920×1080 desktop, ~200–400 KB).
2. Keep the same filenames, or update `IntroScene.tsx`, `MainScene.tsx`,
   `FinalScene.tsx` and `layout.tsx` OG metadata.
3. Test crops at 360, 390, 768, 1024, 1440 px — `object-cover` handles
   portrait phones automatically.
4. Keep alt text meaningful (couple, meadow, sunset).

## Features

- Single-viewport cinematic scene: persistent sunset backdrop with pointer
  parallax (desktop), film grain, vignette, dust + fireflies.
- Staggered title reveal, rotating romantic lines, live clock.
- 178-song YouTube playlist with instant-start, volume fade-in, and full
  transport (play/pause/next/prev/seek/volume/mute/queue).
- Sleep timer (15/30/60 min) in the player.
- Keyboard shortcuts: Space, ←/→, N/P, Q (queue), M, S (shuffle).
- Personalized dedication links: share modal builds a `?to=Name` invite that
  greets them by name.
- Native share + WhatsApp + copy-link fallbacks; reduced-motion respected.

## Adding music — YouTube playlist mode (current)

Streams your playlist — no downloads. Wired to **JalRaj Hits | Best Love Songs**
— the full 178-song tracklist in playlist order (Dil Ibaadat through PAIGHAAM).

Swap/reorder: edit entries in `src/lib/playlist.ts`. Details: `public/audio/README.md`.

To revert to local files: set `USE_YOUTUBE = false` and place licensed
`.mp3` files as `public/audio/track-01.mp3` … `track-06.mp3`.

## Sharing

- Native Web Share API when available, otherwise WhatsApp + copy-link.
- Share URL resolves from `NEXT_PUBLIC_SITE_URL` when set, else current URL.
- No fake counters — no analytics displayed unless you wire real data.

## Deploying to Vercel

```bash
npm run build
vercel --prod
```

Or import the repo in the Vercel dashboard. Set env var:

```
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

This powers canonical URLs, OG tags, and share links. No server, auth, or DB
required — fully static-friendly.

## Tech

Next.js (App Router) · React · TypeScript · Tailwind CSS v4 · Framer Motion ·
YouTube IFrame API · Lucide icons · Cormorant Garamond + Inter via next/font.

```

## `src/app/globals.css`

```text
@import "tailwindcss";

@theme {
  --color-forest: #17251c;
  --color-deep: #101a14;
  --color-amber-glow: #e9a85d;
  --color-cream: #f5ebdd;
  --color-olive: #85866b;
  --color-softblack: #111510;

  --font-display: "Cormorant Garamond", Georgia, serif;
  --font-body: "Inter", system-ui, sans-serif;
}

:root {
  --background: #101a14;
  --foreground: #f5ebdd;
}

html {
  scroll-behavior: smooth;
}

html,
body {
  height: 100%;
  background: #101a14;
  color: #f5ebdd;
  overflow-x: hidden;
}

body {
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

.font-display {
  font-family: var(--font-display);
}

/* ---------- Cinematic helpers ---------- */

.cinematic-vignette::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    ellipse at center,
    transparent 42%,
    rgba(10, 14, 11, 0.38) 74%,
    rgba(8, 11, 9, 0.72) 100%
  );
}

.film-grain::before {
  content: "";
  position: absolute;
  inset: -50%;
  z-index: 1;
  pointer-events: none;
  opacity: 0.07;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  animation: grain-shift 0.9s steps(4) infinite;
}

@media (prefers-reduced-motion: reduce) {
  .film-grain::before {
    animation: none;
  }
  .kenburns,
  .drift,
  .float-dust,
  .sun-pulse,
  .grass-sway {
    animation: none !important;
  }
  html {
    scroll-behavior: auto;
  }
}

@keyframes grain-shift {
  0% { transform: translate(0, 0); }
  25% { transform: translate(-2%, 3%); }
  50% { transform: translate(3%, -2%); }
  75% { transform: translate(-3%, -3%); }
  100% { transform: translate(2%, 2%); }
}

@keyframes kenburns {
  0% { transform: scale(1) translateY(0); }
  100% { transform: scale(1.12) translateY(-1.5%); }
}

.kenburns {
  animation: kenburns 28s ease-in-out infinite alternate;
  will-change: transform;
}

@keyframes sun-glow {
  0%, 100% { opacity: 0.55; transform: scale(1); }
  50% { opacity: 0.85; transform: scale(1.06); }
}

.sun-pulse {
  animation: sun-glow 9s ease-in-out infinite;
}

@keyframes drift {
  0% { transform: translate3d(-4%, 2%, 0); opacity: 0; }
  15% { opacity: 0.7; }
  85% { opacity: 0.7; }
  100% { transform: translate3d(6%, -4%, 0); opacity: 0; }
}

.float-dust {
  animation: drift linear infinite;
  will-change: transform, opacity;
}

@keyframes sway {
  0%, 100% { transform: skewX(-1.2deg) translateX(0); }
  50% { transform: skewX(1.4deg) translateX(6px); }
}

.grass-sway {
  animation: sway 7s ease-in-out infinite;
  transform-origin: bottom center;
}

/* Focus visibility */
:where(a, button, input, [tabindex]):focus-visible {
  outline: 2px solid #e9a85d;
  outline-offset: 3px;
  border-radius: 4px;
}

/* Custom range styling for progress + volume */
input[type="range"].cinematic-range {
  -webkit-appearance: none;
  appearance: none;
  height: 4px;
  border-radius: 999px;
  background: rgba(245, 235, 221, 0.25);
  cursor: pointer;
}
input[type="range"].cinematic-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 999px;
  background: #e9a85d;
  border: none;
  box-shadow: 0 0 12px rgba(233, 168, 93, 0.8);
}
input[type="range"].cinematic-range::-moz-range-thumb {
  width: 12px;
  height: 12px;
  border-radius: 999px;
  background: #e9a85d;
  border: none;
}

/* Scroll snap container */
.snap-cinema {
  scroll-snap-type: y proximity;
}
.snap-cinema > section {
  scroll-snap-align: start;
}

::selection {
  background: rgba(233, 168, 93, 0.4);
}

```

## `src/app/layout.tsx`

```text
import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const metadataBase = siteUrl ? new URL(siteUrl) : undefined;

export const metadata: Metadata = {
  metadataBase,
  title: "Somewhere With You — Every Moment Feels Better With You",
  description:
    "Enter a little world of golden sunsets, beautiful moments, and romantic music. Somewhere With You.",
  keywords: ["romantic", "sunset", "couple", "cinematic", "love", "music"],
  authors: [{ name: "Somewhere With You" }],
  openGraph: {
    type: "website",
    siteName: "Somewhere With You",
    title: "Somewhere With You — Every Moment Feels Better With You",
    description:
      "Enter a little world of golden sunsets, beautiful moments, and romantic music. Somewhere With You.",
    images: [
      {
        url: "/images/meadow-couple-sunset.webp",
        width: 1200,
        height: 630,
        alt: "A couple from behind standing in a golden sunset meadow — Somewhere With You",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Somewhere With You — Every Moment Feels Better With You",
    description:
      "Enter a little world of golden sunsets, beautiful moments, and romantic music.",
    images: ["/images/meadow-couple-sunset.webp"],
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#101A14",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      {/* Early connection to YouTube origins — cuts first-play latency since
          the IFrame API + stream + thumbnails all come from here. React 19
          hoists these <link> tags into <head>. */}
      <link rel="preconnect" href="https://www.youtube.com" />
      <link rel="preconnect" href="https://www.youtube-nocookie.com" />
      <link rel="preconnect" href="https://i.ytimg.com" />
      <body className="min-h-screen bg-[#101A14] text-[#F5EBDD] antialiased">
        {children}
      </body>
    </html>
  );
}

```

## `src/app/page.tsx`

```text
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

```

## `src/components/music/MusicPlayer.tsx`

```text
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ListMusic,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Loader2,
  Music2,
  ExternalLink,
  Moon,
} from "lucide-react";
import { PLAYLIST, USE_YOUTUBE, YOUTUBE_PLAYLIST_URL } from "@/lib/playlist";
import { youtubeThumbnail, youtubeWatchUrl } from "@/lib/youtube";

interface Props {
  trackIndex: number;
  isPlaying: boolean;
  progress: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isLoading: boolean;
  error: string | null;
  hasAudio: boolean;
  onToggle: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSeek: (t: number) => void;
  onVolume: (v: number) => void;
  onMute: () => void;
  onSelect: (i: number) => void;
  /** Controlled queue drawer (for the Q shortcut). Uncontrolled when omitted. */
  queueOpen?: boolean;
  onQueueChange?: (open: boolean) => void;
}

function fmt(t: number) {
  if (!Number.isFinite(t) || t < 0) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function MusicPlayer(props: Props) {
  const {
    trackIndex,
    isPlaying,
    progress,
    duration,
    volume,
    isMuted,
    isLoading,
    error,
    hasAudio,
    onToggle,
    onNext,
    onPrev,
    onSeek,
    onVolume,
    onMute,
    onSelect,
    queueOpen,
    onQueueChange,
  } = props;
  const [innerOpen, setInnerOpen] = useState(false);
  const open = queueOpen ?? innerOpen;
  const toggleOpen = useCallback(() => {
    if (onQueueChange) onQueueChange(!open);
    else setInnerOpen(!open);
  }, [onQueueChange, open]);
  const track = PLAYLIST[trackIndex];
  const ytId = track?.youtubeId;
  const coverSrc = USE_YOUTUBE && ytId ? youtubeThumbnail(ytId) : track?.cover;

  // Sleep timer — fall asleep to it. Pauses playback when time runs out.
  const [sleep, setSleep] = useState<number | null>(null);
  const [sleepLeft, setSleepLeft] = useState(0);
  const latestPlayback = useRef({ isPlaying, onToggle });
  useEffect(() => {
    latestPlayback.current = { isPlaying, onToggle };
  });
  useEffect(() => {
    if (sleep === null) return;
    queueMicrotask(() => setSleepLeft(sleep * 60));
    const id = setInterval(() => {
      setSleepLeft((s) => {
        if (s <= 1) {
          clearInterval(id);
          queueMicrotask(() => {
            setSleep(null);
            if (latestPlayback.current.isPlaying) void latestPlayback.current.onToggle();
          });
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [sleep]);

  const cycleSleep = useCallback(() => {
    setSleep((s) => (s === null ? 15 : s === 15 ? 30 : s === 30 ? 60 : null));
  }, []);

  return (
    <div className="fixed bottom-6 left-1/2 z-50 w-[min(94vw,640px)] -translate-x-1/2 sm:bottom-10">
      {error && (
        <p role="alert" className="mb-2 rounded-xl border border-[#E9A85D]/30 bg-[#101A14]/85 px-4 py-2 text-center text-xs leading-relaxed text-[#F5EBDD]/85 backdrop-blur">
          {error}
        </p>
      )}
      <div className="rounded-[28px] border border-white/20 bg-gradient-to-b from-white/[0.14] via-white/[0.06] to-white/[0.03] shadow-[0_24px_70px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-2xl backdrop-saturate-150">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-white/10 ring-1 ring-white/25">
            {coverSrc ? (
              // YouTube thumbnails are remote — use plain img to avoid next.config remotePatterns
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={coverSrc}
                alt=""
                width={44}
                height={44}
                className="h-full w-full object-cover"
              />
            ) : track?.cover ? (
              <Image
                src={track.cover}
                alt=""
                width={44}
                height={44}
                className="h-full w-full object-cover"
              />
            ) : (
              <Music2 className="m-auto h-5 w-5 text-[#E9A85D]" aria-hidden="true" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold tracking-wide text-white">
              {track?.title ?? "Romantic playlist"}
            </p>
            <p className="truncate text-xs font-medium text-[#F5EBDD]/75">
              {track?.artist ?? "Somewhere With You"}
              {!hasAudio && " · silent for now"}
              {USE_YOUTUBE && ytId && " · via YouTube"}
            </p>
            <div className="mt-1.5 flex items-center gap-2">
              <span className="text-[10px] tabular-nums text-white/50">{fmt(progress)}</span>
              <input
                type="range"
                min={0}
                max={duration || 0}
                step={0.5}
                value={Math.min(progress, duration || 0)}
                onChange={(e) => onSeek(Number(e.target.value))}
                aria-label="Playback progress"
                className="cinematic-range w-full"
              />
              <span className="text-[10px] tabular-nums text-white/50">{fmt(duration)}</span>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={onPrev}
              aria-label="Previous track"
              className="rounded-full p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <SkipBack className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={onToggle}
              aria-label={isPlaying ? `Pause ${track?.title}` : `Play ${track?.title}`}
              className="rounded-full bg-white p-3.5 text-black shadow-[0_0_28px_rgba(255,255,255,0.35)] transition-all hover:scale-105 hover:bg-[#E9A85D] hover:text-[#101A14]"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
              ) : isPlaying ? (
                <Pause className="h-5 w-5 fill-current" aria-hidden="true" />
              ) : (
                <Play className="ml-0.5 h-5 w-5 fill-current" aria-hidden="true" />
              )}
            </button>
            <button
              type="button"
              onClick={onNext}
              aria-label="Next track"
              className="rounded-full p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <SkipForward className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 border-t border-white/10 px-4 py-2">
          <button
            type="button"
            onClick={onMute}
            aria-label={isMuted ? "Unmute" : "Mute"}
            className="rounded-full p-1.5 text-white/60 hover:bg-white/10 hover:text-white"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Volume2 className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={isMuted ? 0 : volume}
            onChange={(e) => onVolume(Number(e.target.value))}
            aria-label="Volume"
            className="cinematic-range w-24"
          />
          {USE_YOUTUBE && ytId && (
            <a
              href={youtubeWatchUrl(ytId)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Watch ${track?.title} on YouTube`}
              className="rounded-full p-1.5 text-white/60 hover:bg-white/10 hover:text-[#E9A85D]"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
          <button
            type="button"
            onClick={cycleSleep}
            aria-label={
              sleep === null
                ? "Set sleep timer"
                : `Sleep timer ${fmt(sleepLeft)} remaining, tap to cancel`
            }
            title={sleep === null ? "Sleep timer: off" : `Sleep timer: ${fmt(sleepLeft)} left`}
            className={`inline-flex items-center gap-1 rounded-full p-1.5 transition-colors hover:bg-white/10 hover:text-white ${
              sleep === null ? "text-white/60" : "text-[#E9A85D]"
            }`}
          >
            <Moon className="h-4 w-4" aria-hidden="true" />
            {sleep !== null && (
              <span className="text-[10px] tabular-nums">{fmt(sleepLeft)}</span>
            )}
          </button>
          <div className="flex-1" />
          <button
            type="button"
            onClick={toggleOpen}
            aria-expanded={open}
            aria-label="Toggle playlist"
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs text-white/70 hover:bg-white/10 hover:text-white"
          >
            <ListMusic className="h-4 w-4" aria-hidden="true" />
            {trackIndex + 1}/{PLAYLIST.length}
          </button>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.ol
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-h-[38vh] overflow-y-auto overscroll-contain"
              aria-label="Playlist"
            >
              {PLAYLIST.map((t, i) => (
                <li key={t.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(i)}
                    aria-current={i === trackIndex ? "true" : undefined}
                    className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-white/5 ${
                      i === trackIndex ? "text-[#E9A85D]" : "text-white/75"
                    }`}
                  >
                    <span className="w-5 text-xs tabular-nums opacity-60">{String(i + 1).padStart(2, "0")}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium">{t.title}</span>
                      <span className="block truncate text-xs opacity-60">
                        {t.artist}
                        {USE_YOUTUBE && !t.youtubeId && " · missing YouTube ID"}
                      </span>
                    </span>
                    {i === trackIndex && isPlaying && (
                      <span className="flex items-end gap-0.5" aria-hidden="true">
                        {[0, 1, 2].map((b) => (
                          <motion.span
                            key={b}
                            className="w-0.5 bg-[#E9A85D]"
                            animate={{ height: [4, 12, 4] }}
                            transition={{ duration: 1, repeat: Infinity, delay: b * 0.2 }}
                          />
                        ))}
                      </span>
                    )}
                  </button>
                </li>
              ))}
              <li className="px-4 py-3 text-[11px] leading-relaxed text-white/40">
                {USE_YOUTUBE ? (
                  <>
                    Streams via official YouTube embeds ·{" "}
                    <a
                      href={YOUTUBE_PLAYLIST_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-[#E9A85D]/60 underline-offset-2 hover:text-[#E9A85D]"
                    >
                      Open the full JalRaj Hits playlist
                    </a>
                    .
                  </>
                ) : (
                  <>Add licensed .mp3 files to public/audio/ — see README “Adding music”.</>
                )}
              </li>
            </motion.ol>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

```

## `src/components/scenes/IntroScene.tsx`

```text
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

```

## `src/components/ui/Atmosphere.tsx`

```text
"use client";

import { useMemo } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Floating dust / light particles + warm light leak. Pure CSS, cheap. */
export function Atmosphere({ density = 18 }: { density?: number }) {
  const reduced = useReducedMotion();
  const particles = useMemo(
    () =>
      Array.from({ length: reduced ? 0 : density }, (_, i) => ({
        id: i,
        left: (i * 53 + 11) % 100,
        top: 20 + ((i * 37 + 13) % 70),
        size: 2 + ((i * 7) % 5),
        duration: 14 + ((i * 3) % 18),
        delay: -((i * 5) % 20),
        opacity: 0.25 + ((i % 5) / 10),
      })),
    [density, reduced]
  );

  if (reduced) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* warm sunlight bloom */}
      <div className="sun-pulse absolute left-1/2 top-[22%] h-[42vmax] w-[42vmax] -translate-x-1/2 rounded-full bg-[#E9A85D]/25 blur-[90px]" />
      <div className="absolute -bottom-24 left-0 right-0 h-64 bg-gradient-to-t from-[#101A14]/70 to-transparent" />
      {particles.map((p) => (
        <span
          key={p.id}
          className="float-dust absolute rounded-full bg-[#F5EBDD]"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            boxShadow: "0 0 12px rgba(245,235,221,.8)",
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

```

## `src/components/ui/Clock.tsx`

```text
"use client";

import { useEffect, useState } from "react";

/** Live clock in the style of the reference's top-right time readout. */
export function Clock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    queueMicrotask(() => setNow(new Date()));
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) {
    return (
      <span aria-hidden="true" className="tabular-nums text-2xl font-semibold tracking-wide text-[#F5EBDD]">
        --<span className="text-[#E9A85D]">:</span>--
      </span>
    );
  }

  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");

  return (
    <span
      aria-label={`Current time ${hh}:${mm}`}
      className="tabular-nums text-2xl font-semibold tracking-wide text-[#F5EBDD]"
    >
      {hh}
      <span className="text-[#E9A85D]">:</span>
      {mm}
      <span className="ml-1 align-top text-xs text-[#F5EBDD]/60">{ss}</span>
    </span>
  );
}

```

## `src/components/ui/EnterButton.tsx`

```text
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

```

## `src/components/ui/Fireflies.tsx`

```text
"use client";

import { useMemo } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Warm glowing fireflies drifting over the meadow. Pure CSS, cheap. */
export function Fireflies({ count = 14 }: { count?: number }) {
  const reduced = useReducedMotion();
  const flies = useMemo(
    () =>
      Array.from({ length: reduced ? 0 : count }, (_, i) => ({
        id: i,
        left: (i * 67 + 23) % 100,
        top: 35 + ((i * 41 + 7) % 55),
        size: 3 + ((i * 5) % 4),
        duration: 9 + ((i * 7) % 14),
        delay: -((i * 11) % 18),
      })),
    [reduced, count]
  );

  if (reduced) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {flies.map((f) => (
        <span
          key={f.id}
          className="float-dust absolute rounded-full"
          style={{
            left: `${f.left}%`,
            top: `${f.top}%`,
            width: f.size,
            height: f.size,
            background: "#F5D9A8",
            boxShadow: "0 0 14px 4px rgba(233,168,93,0.4)",
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

```

## `src/components/ui/ShareButton.tsx`

```text
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

```

## `src/components/ui/ShareModal.tsx`

```text
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

```

## `src/hooks/useAudioPlayer.ts`

```text
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PLAYLIST } from "@/lib/playlist";

interface UseAudioPlayerReturn {
  trackIndex: number;
  isPlaying: boolean;
  progress: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isLoading: boolean;
  error: string | null;
  hasAudio: boolean;
  play: (index?: number) => Promise<void>;
  pause: () => void;
  toggle: () => Promise<void>;
  next: () => Promise<void>;
  prev: () => Promise<void>;
  seek: (time: number) => void;
  setVolume: (v: number) => void;
  toggleMute: () => void;
}

export function useAudioPlayer(autoStart = false): UseAudioPlayerReturn {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasAudio, setHasAudio] = useState(true);
  const pendingIndex = useRef<number | null>(null);

  // Create single audio element — avoids overlapping playback
  useEffect(() => {
    const audio = new Audio();
    audio.preload = "metadata";
    audio.volume = 0.8;
    audioRef.current = audio;

    const onTime = () => setProgress(audio.currentTime || 0);
    const onMeta = () => {
      setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
      setIsLoading(false);
      setHasAudio(true);
      setError(null);
    };
    const onEnded = () => {
      // Advance on natural end (expected playlist behaviour)
      setCurrentIndex((i) => {
        const nextIdx = (i + 1) % PLAYLIST.length;
        pendingIndex.current = nextIdx;
        return nextIdx;
      });
    };
    const onError = () => {
      // Do NOT auto-skip — show clear feedback, stay on track
      setIsLoading(false);
      setIsPlaying(false);
      setHasAudio(false);
      setError(
        "Music isn't available yet — add licensed audio files to /public/audio. The moment is still beautiful in silence."
      );
    };
    const onWaiting = () => setIsLoading(true);
    const onPlaying = () => {
      setIsPlaying(true);
      setIsLoading(false);
      setError(null);
      setHasAudio(true);
    };
    const onPause = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("pause", onPause);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("pause", onPause);
      audioRef.current = null;
    };
  }, []);

  // Load track when index changes — syncs the external HTMLAudioElement.
  // State resets are deferred so they run as event-driven updates, not
  // synchronous cascading renders inside the effect body.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const track = PLAYLIST[currentIndex];
    if (!track) return;

    const shouldAutoplay = pendingIndex.current === currentIndex || autoStart;
    pendingIndex.current = null;

    audio.src = track.src;

    queueMicrotask(() => {
      setIsLoading(true);
      setProgress(0);
      setDuration(track.durationHint ?? 0);
      if (shouldAutoplay) setError(null);
    });

    if (shouldAutoplay) {
      audio
        .play()
        .then(() => {
          setHasAudio(true);
        })
        .catch((e) => {
          // Autoplay blocked or file missing — surface calmly
          setIsLoading(false);
          setIsPlaying(false);
          if (e?.name !== "NotAllowedError") {
            // File-level failure will also fire onError; keep message gentle
            setError((prev) => prev);
          }
        });
    } else {
      queueMicrotask(() => setIsLoading(false));
    }
  }, [currentIndex, autoStart]);

  const play = useCallback(async (index?: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (typeof index === "number" && index !== currentIndex) {
      pendingIndex.current = index;
      setCurrentIndex(index);
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      await audio.play();
    } catch {
      setIsLoading(false);
      setIsPlaying(false);
    }
  }, [currentIndex]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(async () => {
    if (isPlaying) pause();
    else await play();
  }, [isPlaying, pause, play]);

  const next = useCallback(async () => {
    const n = (currentIndex + 1) % PLAYLIST.length;
    pendingIndex.current = isPlaying || pendingIndex.current !== null ? n : null;
    // If paused, just switch track without autoplay
    if (!isPlaying && pendingIndex.current === null) {
      setCurrentIndex(n);
      return;
    }
    setCurrentIndex(n);
    // playback kicked by effect via pendingIndex
    if (!isPlaying) await play(n);
  }, [currentIndex, isPlaying, play]);

  const prev = useCallback(async () => {
    const p = (currentIndex - 1 + PLAYLIST.length) % PLAYLIST.length;
    if (!isPlaying) {
      setCurrentIndex(p);
      return;
    }
    pendingIndex.current = p;
    setCurrentIndex(p);
  }, [currentIndex, isPlaying]);

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(time)) return;
    audio.currentTime = Math.max(0, Math.min(time, audio.duration || time));
    setProgress(audio.currentTime);
  }, []);

  const setVolume = useCallback((v: number) => {
    const audio = audioRef.current;
    const clamped = Math.max(0, Math.min(1, v));
    setVolumeState(clamped);
    if (audio) {
      audio.volume = clamped;
      audio.muted = clamped === 0 ? true : false;
    }
    setIsMuted(clamped === 0);
  }, []);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    audio.muted = nextMuted;
  }, [isMuted]);

  // Keep volume in sync if changed externally
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  return {
    trackIndex: currentIndex,
    isPlaying,
    progress,
    duration,
    volume,
    isMuted,
    isLoading,
    error,
    hasAudio,
    play,
    pause,
    toggle,
    next,
    prev,
    seek,
    setVolume,
    toggleMute,
  };
}

```

## `src/hooks/useReducedMotion.ts`

```text
"use client";

import { useEffect, useState } from "react";

/**
 * Respects OS-level reduced-motion preference.
 *
 * Hydrate-safe by design: the initializer guards on `typeof window`, so the
 * server and the client's first render agree (both `false`). The real value
 * is computed in the initializer on the client — no `setState` inside the
 * effect, which avoids cascading renders and the `set-state-in-effect` lint.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function")
      return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function")
      return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
```

## `src/hooks/useYouTubePlayer.ts`

```text
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PLAYLIST } from "@/lib/playlist";
import { loadYouTubeApi } from "@/lib/youtube";

interface UseYouTubePlayerReturn {
  /** Callback ref — attach to the hidden host div. No RefObject is exposed. */
  mountNode: (el: HTMLDivElement | null) => void;
  trackIndex: number;
  isPlaying: boolean;
  progress: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isLoading: boolean;
  error: string | null;
  hasAudio: boolean;
  ready: boolean;
  play: (index?: number) => Promise<void>;
  pause: () => void;
  toggle: () => Promise<void>;
  next: () => Promise<void>;
  prev: () => Promise<void>;
  seek: (time: number) => void;
  setVolume: (v: number) => void;
  toggleMute: () => void;
}

export function useYouTubePlayer(): UseYouTubePlayerReturn {
  const mountEl = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<YT.Player | null>(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasAudio, setHasAudio] = useState(true);
  const [ready, setReady] = useState(false);
  const pendingAutoplay = useRef<number | null>(null);
  const indexHolder = useRef(0);
  // Muted pre-warm: after the player is ready we silently buffer the first
  // seconds of track 1 (muted autoplay is allowed). ENTER then starts from a
  // warm buffer instead of cold-fetching the stream on click.
  const primeState = useRef<"idle" | "priming" | "primed" | "consumed">("idle");
  const primedId = useRef<string | null>(null);
  const hasInteracted = useRef(false);

  // Keep holder in sync outside render
  useEffect(() => {
    indexHolder.current = trackIndex;
  }, [trackIndex]);

  const mountNode = useCallback((el: HTMLDivElement | null) => {
    mountEl.current = el;
  }, []);

  const youtubeIds = PLAYLIST.map((t) => t.youtubeId).filter(Boolean) as string[];
  const hasYouTube = youtubeIds.length > 0;

  // Create player once
  useEffect(() => {
    let cancelled = false;
    let poll: ReturnType<typeof setInterval> | null = null;

    async function init() {
      if (!hasYouTube) {
        setIsLoading(false);
        setHasAudio(false);
        setError(
          "No YouTube songs configured yet — paste your playlist link into src/lib/playlist.ts (YOUTUBE_PLAYLIST_URL + video IDs). See README."
        );
        return;
      }
      try {
        const YTApi = await loadYouTubeApi();
        if (cancelled) return;

        const mount = mountEl.current ?? document.getElementById("yt-hidden-audio-host");
        if (!mount) return;

        const firstId = PLAYLIST[indexHolder.current]?.youtubeId ?? youtubeIds[0];

        playerRef.current = new YTApi.Player(mount as HTMLElement, {
          width: "4",
          height: "4",
          videoId: firstId,
          host: "https://www.youtube-nocookie.com",
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            iv_load_policy: 3,
            rel: 0,
            playsinline: 1,
          } as YT.PlayerVars,
          events: {
            onReady: (e) => {
              if (cancelled) return;
              setReady(true);
              setIsLoading(false);
              try {
                e.target.setVolume(Math.round(0.8 * 100));
                setDuration(e.target.getDuration() || 0);
              } catch {
                // ignore
              }
              if (pendingAutoplay.current !== null) {
                const idx = pendingAutoplay.current;
                pendingAutoplay.current = null;
                const id = PLAYLIST[idx]?.youtubeId;
                if (id) {
                  try {
                    e.target.loadVideoById(id);
                  } catch {
                    // handled by onError
                  }
                }
                return;
              }
              // …otherwise silently pre-warm track 1 so ENTER starts instantly.
              if (firstId && primeState.current === "idle") {
                try {
                  primeState.current = "priming";
                  primedId.current = firstId;
                  e.target.mute();
                  setIsMuted(true);
                  e.target.playVideo();
                } catch {
                  primeState.current = "idle";
                  primedId.current = null;
                }
              }
            },
            onStateChange: (e) => {
              if (cancelled) return;
              const s = e.data;
              const YTNS = (window.YT as unknown as { PlayerState: Record<string, number> }).PlayerState;
              if (s === YTNS.PLAYING) {
                setIsPlaying(true);
                setIsLoading(false);
                setError(null);
                setHasAudio(true);
                try {
                  setDuration(e.target.getDuration() || 0);
                } catch {
                  // ignore
                }
                // Pre-warm: buffer ~1s muted, then pause and hold. The real
                // start on ENTER then plays from a warm buffer. Guarded so a
                // late pause can never kill genuine user playback.
                if (primeState.current === "priming" && !hasInteracted.current) {
                  primeState.current = "primed";
                  window.setTimeout(() => {
                    if (primeState.current !== "primed") return;
                    try {
                      playerRef.current?.pauseVideo();
                    } catch {
                      // ignore
                    }
                  }, 1000);
                }
              } else if (s === YTNS.PAUSED) {
                setIsPlaying(false);
              } else if (s === YTNS.BUFFERING) {
                setIsLoading(true);
              } else if (s === YTNS.CUED) {
                setIsLoading(false);
                try {
                  setDuration(e.target.getDuration() || 0);
                } catch {
                  // ignore
                }
              } else if (s === YTNS.ENDED) {
                // Advance to the next track. Side effect lives outside the
                // state updater (updaters must be pure — StrictMode may
                // invoke them twice, which would double-load the video).
                const n = (indexHolder.current + 1) % PLAYLIST.length;
                const id = PLAYLIST[n]?.youtubeId;
                setTrackIndex(n);
                if (id) {
                  try {
                    e.target.loadVideoById(id);
                  } catch {
                    // ignore
                  }
                }
              }
            },
            onError: () => {
              if (cancelled) return;
              setIsLoading(false);
              setIsPlaying(false);
              setError(
                "This YouTube song can't play here (owner disabled embedding or region-blocked). Tap Next, or replace the video ID in playlist.ts."
              );
            },
          },
        });

        poll = setInterval(() => {
          try {
            const p = playerRef.current;
            if (p && typeof p.getCurrentTime === "function") {
              const t = p.getCurrentTime() || 0;
              const d = p.getDuration() || 0;
              if (Number.isFinite(t)) setProgress(t);
              if (Number.isFinite(d) && d > 0) setDuration(d);
            }
          } catch {
            // ignore transient API errors
          }
        }, 500);
      } catch (err) {
        if (cancelled) return;
        setIsLoading(false);
        setHasAudio(false);
        setError(
          err instanceof Error
            ? `YouTube couldn't load: ${err.message}. Check connection or disable ad-blocker for youtube.com, then refresh.`
            : "YouTube couldn't load."
        );
      }
    }

    void init();

    return () => {
      cancelled = true;
      if (poll) clearInterval(poll);
      try {
        playerRef.current?.destroy();
      } catch {
        // ignore
      }
      playerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const play = useCallback(
    async (index?: number) => {
      setError(null);
      hasInteracted.current = true;
      // Any real playback consumes the primed buffer state, so the scheduled
      // pre-warm pause can never fire during genuine listening.
      if (primeState.current === "priming" || primeState.current === "primed") {
        primeState.current = "consumed";
      }
      const p = playerRef.current;
      if (typeof index === "number" && index !== indexHolder.current) {
        primedId.current = null;
        setTrackIndex(index);
        setIsLoading(true);
        setProgress(0);
        const id = PLAYLIST[index]?.youtubeId;
        if (!id) {
          setIsLoading(false);
          setError("Missing YouTube video ID for this track — add it in src/lib/playlist.ts.");
          return;
        }
        if (p && ready) {
          try {
            p.loadVideoById(id);
          } catch {
            setIsLoading(false);
          }
        } else {
          pendingAutoplay.current = index;
        }
        return;
      }
      if (p && ready) {
        setIsLoading(true);
        try {
          // Fast path: the pre-warmed buffer is already holding this video —
          // restart it from the top instead of re-fetching the stream.
          const id = PLAYLIST[indexHolder.current]?.youtubeId;
          if (id && primedId.current === id) {
            primedId.current = null;
            try {
              p.seekTo(0, true);
            } catch {
              // ignore — playVideo below still starts playback
            }
            try {
              p.unMute();
              setIsMuted(false);
            } catch {
              // ignore
            }
          }
          p.playVideo();
        } catch {
          setIsLoading(false);
        }
      } else if (!ready) {
        pendingAutoplay.current = indexHolder.current;
        setIsLoading(true);
      }
    },
    [ready]
  );

  const pause = useCallback(() => {
    try {
      playerRef.current?.pauseVideo();
    } catch {
      // ignore
    }
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(async () => {
    if (isPlaying) pause();
    else await play();
  }, [isPlaying, pause, play]);

  const next = useCallback(async () => {
    const n = (indexHolder.current + 1) % PLAYLIST.length;
    await play(n);
  }, [play]);

  const prev = useCallback(async () => {
    const p = (indexHolder.current - 1 + PLAYLIST.length) % PLAYLIST.length;
    await play(p);
  }, [play]);

  const seek = useCallback(
    (time: number) => {
      const p = playerRef.current;
      if (!p || !ready || !Number.isFinite(time)) return;
      // Clamp before writing state — ArrowLeft at 0 used to push -10 into
      // progress, which then drove the range input negative.
      const clamped = Math.max(0, Math.min(time, duration || time));
      try {
        p.seekTo(clamped, true);
      } catch {
        // ignore
      }
      setProgress(clamped);
    },
    [ready, duration]
  );

  const setVolume = useCallback(
    (v: number) => {
      const clamped = Math.max(0, Math.min(1, v));
      setVolumeState(clamped);
      // Always drive mute from the value, never from the previous isMuted —
      // dragging the slider after a mute should unmute (and vice versa), and
      // depending on stale state made the UI show a value while staying muted.
      const muted = clamped === 0;
      setIsMuted(muted);
      try {
        playerRef.current?.setVolume(Math.round(clamped * 100));
        if (muted) playerRef.current?.mute();
        else playerRef.current?.unMute();
      } catch {
        // ignore
      }
    },
    []
  );

  const toggleMute = useCallback(() => {
    const p = playerRef.current;
    if (!p) return;
    try {
      if (isMuted) {
        p.unMute();
        setIsMuted(false);
      } else {
        p.mute();
        setIsMuted(true);
      }
    } catch {
      // ignore
    }
  }, [isMuted]);

  useEffect(() => {
    if (ready) {
      try {
        playerRef.current?.setVolume(Math.round(volume * 100));
      } catch {
        // ignore
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  return {
    mountNode,
    trackIndex,
    isPlaying,
    progress,
    duration,
    volume,
    isMuted,
    isLoading,
    error,
    hasAudio,
    ready,
    play,
    pause,
    toggle,
    next,
    prev,
    seek,
    setVolume,
    toggleMute,
  };
}

```

## `src/lib/constants.ts`

```text
export const BRAND = {
  name: "Somewhere With You",
  tagline: "Every moment feels better with you.",
  coreMessage:
    "Sometimes, all you need is a beautiful place, a beautiful song, and someone beside you.",
} as const;

export const INTRO = {
  heading: "Somewhere With You.",
  subtitle: "A little world away from everything.",
  cta: "Enter this moment",
} as const;

export const MAIN_MESSAGE = {
  heading: "I wish time could stop here.",
  sub: "No rush. No noise. Just us.",
} as const;

export const ROMANTIC_MESSAGES = [
  "Some moments are better when shared.",
  "I could stay here forever.",
  "The world feels quieter with you.",
  "If I could choose a place to be, it would be beside you.",
  "Every sunset would be more beautiful with you.",
  "You make ordinary moments unforgettable.",
] as const;

export const FINALE = {
  heading: "If I could choose a place to be, it would be beside you.",
  sub: "Somewhere with you. Always.",
  shareCta: "Share this little moment",
} as const;

export const SHARE_MESSAGE =
  "I found a little place that reminded me of you. ❤️ Take a moment and experience it.";

export const COLORS = {
  forestGreen: "#17251C",
  deepForest: "#101A14",
  sunsetAmber: "#E9A85D",
  warmCream: "#F5EBDD",
  mutedOlive: "#85866B",
  softBlack: "#111510",
  white: "#FFFFFF",
} as const;

```

## `src/lib/playlist.ts`

```text
import type { Track } from "@/types/music";

/**
 * ── YouTube playlist mode (no downloads) ─────────────────────
 *
 * Wired to your playlist (full tracklist, 178 songs):
 *   JalRaj Hits | Best Love Songs | Cover Songs that win your mood
 *   https://www.youtube.com/playlist?list=PLDNDioV1k46dlwnLdVwMhYz1AN4FC6oxH
 *
 * To swap/reorder: edit entries below. Cover art + Watch links derive
 * automatically from each youtubeId.
 */
export const YOUTUBE_PLAYLIST_URL: string =
  "https://www.youtube.com/watch?v=_oxjF1w9bik&list=PLDNDioV1k46dlwnLdVwMhYz1AN4FC6oxH";

export const YOUTUBE_PLAYLIST_ID = "PLDNDioV1k46dlwnLdVwMhYz1AN4FC6oxH";

export const YOUTUBE_PLAYLIST_TITLE = "JalRaj Hits — Best Love Songs";

export const USE_YOUTUBE = true;

export const PLAYLIST: Track[] = [
  {
    id: "yt-_oxjF1w9bik",
    title: "Dil Ibaadat (Reprise)",
    artist: "JalRaj",
    src: "/audio/track-001.mp3",
    youtubeId: "_oxjF1w9bik",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-GMGD-C6j0U8",
    title: "Mann Mera (Reprise)",
    artist: "JalRaj",
    src: "/audio/track-002.mp3",
    youtubeId: "GMGD-C6j0U8",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-NeXbmEnpSz0",
    title: "Zara Zara Bahekta Hai",
    artist: "JalRaj",
    src: "/audio/track-003.mp3",
    youtubeId: "NeXbmEnpSz0",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-havo_jAo-8E",
    title: "Humne Tumko Dil Ye De Diya",
    artist: "JalRaj",
    src: "/audio/track-004.mp3",
    youtubeId: "havo_jAo-8E",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-ClRjTtga8rg",
    title: "Tumse Mohabbat Hai",
    artist: "JalRaj",
    src: "/audio/track-005.mp3",
    youtubeId: "ClRjTtga8rg",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-u9BQhXf4yQc",
    title: "Zara Zara x Let Me Down Slowly MASHUP that will BLOW Your Mind",
    artist: "JalRaj",
    src: "/audio/track-006.mp3",
    youtubeId: "u9BQhXf4yQc",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-ySVHUjkEHbc",
    title: "Tumse Mohabbat Hai (Slowed & Reverbed) ft. Smriti Thakur",
    artist: "JalRaj",
    src: "/audio/track-007.mp3",
    youtubeId: "ySVHUjkEHbc",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-XKD9UxvdbVU",
    title: "Saajna x Aadat",
    artist: "JalRaj",
    src: "/audio/track-008.mp3",
    youtubeId: "XKD9UxvdbVU",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-J8wxRNcz-1w",
    title: "Tujhe Sochta Hoon x Deewana Kar Raha Hai",
    artist: "JalRaj",
    src: "/audio/track-009.mp3",
    youtubeId: "J8wxRNcz-1w",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-LMmVpWfm09A",
    title: "Zihaal-E-Miskeen (Full Version)",
    artist: "JalRaj",
    src: "/audio/track-010.mp3",
    youtubeId: "LMmVpWfm09A",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-Ob5gRnwbeHU",
    title: "Kitna Bechain Hoke",
    artist: "JalRaj",
    src: "/audio/track-011.mp3",
    youtubeId: "Ob5gRnwbeHU",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-YlW_ZKAtUdA",
    title: "Kitna Haseen Chehra",
    artist: "JalRaj",
    src: "/audio/track-012.mp3",
    youtubeId: "YlW_ZKAtUdA",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-50AtHFmgLUc",
    title: "Zara Zara Bahekta Hai",
    artist: "JalRaj",
    src: "/audio/track-013.mp3",
    youtubeId: "50AtHFmgLUc",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-ChoT6yPAPWU",
    title: "Dil Ko Tumse Pyar Hua  (Acoustic)",
    artist: "JalRaj",
    src: "/audio/track-014.mp3",
    youtubeId: "ChoT6yPAPWU",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-MykfQyqQuJ4",
    title: "Bahut Pyar Karte Hain (New Lyrics) FULL VERSION",
    artist: "JalRaj",
    src: "/audio/track-015.mp3",
    youtubeId: "MykfQyqQuJ4",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-EwYLVaYhBrg",
    title: "Tu Hi Haqeeqat (Reprise)",
    artist: "JalRaj",
    src: "/audio/track-016.mp3",
    youtubeId: "EwYLVaYhBrg",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-q5pkOSImyk0",
    title: "Aaj Bhi  - Vishal Mishra",
    artist: "JalRaj",
    src: "/audio/track-017.mp3",
    youtubeId: "q5pkOSImyk0",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-IBFngoHUllc",
    title: "Haan Tu Hai (Reprise)",
    artist: "JalRaj",
    src: "/audio/track-018.mp3",
    youtubeId: "IBFngoHUllc",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt--cL7590t0Jg",
    title: "Zaroori Tha  - JalRaj Version",
    artist: "JalRaj",
    src: "/audio/track-019.mp3",
    youtubeId: "-cL7590t0Jg",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-XG8mA186VDE",
    title: "Ek Raat (Reprise)",
    artist: "JalRaj",
    src: "/audio/track-020.mp3",
    youtubeId: "XG8mA186VDE",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-9VqQz8_lERo",
    title: "Mujhe Neend Na Aaye",
    artist: "JalRaj",
    src: "/audio/track-021.mp3",
    youtubeId: "9VqQz8_lERo",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-iLknYC22pTM",
    title: "Dil Ne Ye Kaha Hai Dil Se",
    artist: "JalRaj",
    src: "/audio/track-022.mp3",
    youtubeId: "iLknYC22pTM",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-_MLl3ZFLJOA",
    title: "Chhup Gaye Sare Nazare (Full Version)",
    artist: "JalRaj",
    src: "/audio/track-023.mp3",
    youtubeId: "_MLl3ZFLJOA",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-48uM61oG4rA",
    title: "Kya Mujhe Pyaar Hai x Hai Dil Ye Mera",
    artist: "JalRaj",
    src: "/audio/track-024.mp3",
    youtubeId: "48uM61oG4rA",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-RBJVjZUIh1g",
    title: "Sajni (Extended Version)",
    artist: "JalRaj",
    src: "/audio/track-025.mp3",
    youtubeId: "RBJVjZUIh1g",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-neV1H2MncwQ",
    title: "Main Dhoondne Ko x Beete Lamhe",
    artist: "JalRaj",
    src: "/audio/track-026.mp3",
    youtubeId: "neV1H2MncwQ",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-H1aiZ9XleQo",
    title: "Na Kajre Ki Dhar (Reprise)",
    artist: "JalRaj",
    src: "/audio/track-027.mp3",
    youtubeId: "H1aiZ9XleQo",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-de9WBqxY0wY",
    title: "Humko Humise Chura Lo",
    artist: "JalRaj",
    src: "/audio/track-028.mp3",
    youtubeId: "de9WBqxY0wY",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-laciHNT2VuM",
    title: "Saiyaara x Galliyan - (JalRaj Version)| New Mashups 2025",
    artist: "JalRaj",
    src: "/audio/track-029.mp3",
    youtubeId: "laciHNT2VuM",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-tnY5iHXpng0",
    title: "Pehli Pehli Baar x Dil Deewana - JalRaj Version",
    artist: "JalRaj",
    src: "/audio/track-030.mp3",
    youtubeId: "tnY5iHXpng0",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-paIAhFh68vI",
    title: "Chand Chhupa Baadal Mein",
    artist: "JalRaj",
    src: "/audio/track-031.mp3",
    youtubeId: "paIAhFh68vI",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-h4wCnGTj_jo",
    title: "Ijazat x Intezaar",
    artist: "JalRaj",
    src: "/audio/track-032.mp3",
    youtubeId: "h4wCnGTj_jo",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-TW5OjZFSM8o",
    title: "Tera Nasha x Tere Naino Mein",
    artist: "JalRaj",
    src: "/audio/track-033.mp3",
    youtubeId: "TW5OjZFSM8o",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-2-m6JIy3St0",
    title: "Dheere Dheere Bol",
    artist: "JalRaj",
    src: "/audio/track-034.mp3",
    youtubeId: "2-m6JIy3St0",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-RGm-zg9uXDQ",
    title: "Phir Mohabbat x Aye Khuda x Uska Hi Banana",
    artist: "JalRaj",
    src: "/audio/track-035.mp3",
    youtubeId: "RGm-zg9uXDQ",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-XY8G6OChztM",
    title: "Aankh Hai Bhari Bhari (Reprise)",
    artist: "JalRaj",
    src: "/audio/track-036.mp3",
    youtubeId: "XY8G6OChztM",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-fFdwtBDtKBk",
    title: "O Sanam (Reprise)",
    artist: "JalRaj",
    src: "/audio/track-037.mp3",
    youtubeId: "fFdwtBDtKBk",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-tmJGgLdMosg",
    title: "Zindagi Ban Gaye Ho Tum - JalRaj Version",
    artist: "JalRaj",
    src: "/audio/track-038.mp3",
    youtubeId: "tmJGgLdMosg",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-TYZ0UOSPQh0",
    title: "Dil Ko Karaar Aaya (Reprise)",
    artist: "JalRaj",
    src: "/audio/track-039.mp3",
    youtubeId: "TYZ0UOSPQh0",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-EkfLL8xzLHw",
    title: "Dulhe Ka Sehra (New Lyrics) FULL VERSION",
    artist: "JalRaj",
    src: "/audio/track-040.mp3",
    youtubeId: "EkfLL8xzLHw",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-09E7SvHENkY",
    title: "Hua Hai Aaj Pehli Baar x Maheroo",
    artist: "JalRaj",
    src: "/audio/track-041.mp3",
    youtubeId: "09E7SvHENkY",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-JVaaQSgVCfE",
    title: "Ilzaam Mohabbat Ka - JalRaj (Official Video)",
    artist: "JalRaj",
    src: "/audio/track-042.mp3",
    youtubeId: "JVaaQSgVCfE",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-U-8pGKefCqY",
    title: "Jhol x Afsos x Maand - (JalRaj Version)",
    artist: "JalRaj",
    src: "/audio/track-043.mp3",
    youtubeId: "U-8pGKefCqY",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-ihggD79Gq7k",
    title: "Wo Ladki Jo Sabse Alag Hai",
    artist: "JalRaj",
    src: "/audio/track-044.mp3",
    youtubeId: "ihggD79Gq7k",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-nvhIm7BQvbo",
    title: "Dil Ka Sauda Hua",
    artist: "JalRaj",
    src: "/audio/track-045.mp3",
    youtubeId: "nvhIm7BQvbo",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-IuIs_rq6OWc",
    title: "Zaroori tha x Tumhe Dillagi (Lofi Flip)",
    artist: "JalRaj",
    src: "/audio/track-046.mp3",
    youtubeId: "IuIs_rq6OWc",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-fSegvwc01kQ",
    title: "Kabhi To Paas Mere Aao x Ride It",
    artist: "JalRaj",
    src: "/audio/track-047.mp3",
    youtubeId: "fSegvwc01kQ",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-7f_vbLOXQ7k",
    title: "Mere Rang Mein (Reprise)",
    artist: "JalRaj",
    src: "/audio/track-048.mp3",
    youtubeId: "7f_vbLOXQ7k",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-5sFDOiGyAG8",
    title: "Tera Hi Bas Hona Chahoon",
    artist: "JalRaj",
    src: "/audio/track-049.mp3",
    youtubeId: "5sFDOiGyAG8",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-KLyWo2hQCy4",
    title: "Gulabi Aankhen (Reprise)",
    artist: "JalRaj",
    src: "/audio/track-050.mp3",
    youtubeId: "KLyWo2hQCy4",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-KSqTCZDQWaU",
    title: "Dekh Dil Ye Humara - JalRaj [Studio Version]",
    artist: "JalRaj",
    src: "/audio/track-051.mp3",
    youtubeId: "KSqTCZDQWaU",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-IWZ3oAafevo",
    title: "Ye Jo Halka Halka Suroor Hai (New Lyrics)",
    artist: "JalRaj",
    src: "/audio/track-052.mp3",
    youtubeId: "IWZ3oAafevo",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-_v9ogrQB4NA",
    title: "Saagar Jaisi Aankhon Wali (Reprise)",
    artist: "JalRaj",
    src: "/audio/track-053.mp3",
    youtubeId: "_v9ogrQB4NA",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-aVlDt5CIcFU",
    title: "Mujhe Peene Do (Reprise)",
    artist: "JalRaj",
    src: "/audio/track-054.mp3",
    youtubeId: "aVlDt5CIcFU",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-rjjGCx1bres",
    title: "Tumhari Nazar",
    artist: "JalRaj",
    src: "/audio/track-055.mp3",
    youtubeId: "rjjGCx1bres",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-HBVNoJ0MqAI",
    title: "Hum Tumhe Chahte Hain Aise",
    artist: "JalRaj",
    src: "/audio/track-056.mp3",
    youtubeId: "HBVNoJ0MqAI",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-yzqc0MUr7UQ",
    title: "Mere Rashke Qamar (Blended Version)",
    artist: "JalRaj",
    src: "/audio/track-057.mp3",
    youtubeId: "yzqc0MUr7UQ",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-GzzFLBCCY6k",
    title: "Hum Tumko Nigaahon Mein (FULL VERSION)",
    artist: "JalRaj",
    src: "/audio/track-058.mp3",
    youtubeId: "GzzFLBCCY6k",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-PKc3dzDfa00",
    title: "Manike Mage Hithe (Extended Hindi Version) -JalRaj මැණිකේ මගේ හිතේ",
    artist: "JalRaj",
    src: "/audio/track-059.mp3",
    youtubeId: "PKc3dzDfa00",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-63u2iEVMVrY",
    title: "Ye Tune Kya Kiya x Pee Loon",
    artist: "JalRaj",
    src: "/audio/track-060.mp3",
    youtubeId: "63u2iEVMVrY",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-GBaWq5tXn1I",
    title: "Phirta Rahoon (Reprise)",
    artist: "JalRaj",
    src: "/audio/track-061.mp3",
    youtubeId: "GBaWq5tXn1I",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-ig-jI4-7mRo",
    title: "Kabhi Jo Badal Barse x Sawan Aaya Hai",
    artist: "JalRaj",
    src: "/audio/track-062.mp3",
    youtubeId: "ig-jI4-7mRo",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-NblIMEBLfLM",
    title: "ADAA (Reprise)",
    artist: "JalRaj",
    src: "/audio/track-063.mp3",
    youtubeId: "NblIMEBLfLM",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-JQJ_gVroEY8",
    title: "Gale Lag Ja x I Love You (Kaate Nahi Kat Te)",
    artist: "JalRaj",
    src: "/audio/track-064.mp3",
    youtubeId: "JQJ_gVroEY8",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-ffdCVQl5Mlo",
    title: "Dil Galti Kar Baitha Hai (Reprise)",
    artist: "JalRaj",
    src: "/audio/track-065.mp3",
    youtubeId: "ffdCVQl5Mlo",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-nuDWFnhtK5E",
    title: "Pehle Bhi Main (Sad Version)",
    artist: "JalRaj",
    src: "/audio/track-066.mp3",
    youtubeId: "nuDWFnhtK5E",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-6SrySsVNwes",
    title: "Tujh Mein Rab Dikhta Hai x Main Yahaan Hoon",
    artist: "JalRaj",
    src: "/audio/track-067.mp3",
    youtubeId: "6SrySsVNwes",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-cY2oEfF9ggM",
    title: "Na Milo Humse Zyada (FULL VERSION)",
    artist: "JalRaj",
    src: "/audio/track-068.mp3",
    youtubeId: "cY2oEfF9ggM",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-3mCTg-88EsU",
    title: "Dil Kehta Hai x To Chalun - (JalRaj Version)| New Mashups 2025",
    artist: "JalRaj",
    src: "/audio/track-069.mp3",
    youtubeId: "3mCTg-88EsU",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-pfGERWEMIkg",
    title: "Main Ishq Uska Woh Aashiqui Hai Meri (New Lyrics)",
    artist: "JalRaj",
    src: "/audio/track-070.mp3",
    youtubeId: "pfGERWEMIkg",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-3mhpSYAoqJ8",
    title: "Hasi Ban Gaye 2.0",
    artist: "JalRaj",
    src: "/audio/track-071.mp3",
    youtubeId: "3mhpSYAoqJ8",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-AbIND8JbjEk",
    title: "Waade Wafa Ke",
    artist: "JalRaj",
    src: "/audio/track-072.mp3",
    youtubeId: "AbIND8JbjEk",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-gnTdWsLG6rs",
    title: "Lut Gaye (Reprise)",
    artist: "JalRaj",
    src: "/audio/track-073.mp3",
    youtubeId: "gnTdWsLG6rs",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-sJJh0h5cgzw",
    title: "Aaj Ki Raat (Reply Version)",
    artist: "JalRaj",
    src: "/audio/track-074.mp3",
    youtubeId: "sJJh0h5cgzw",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-AdtjEJHOTGg",
    title: "Mujhe Tum Nazar Se (Reprise)",
    artist: "JalRaj",
    src: "/audio/track-075.mp3",
    youtubeId: "AdtjEJHOTGg",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-ZwKriCSmI4E",
    title: "Kai Din Se Mujhe",
    artist: "JalRaj",
    src: "/audio/track-076.mp3",
    youtubeId: "ZwKriCSmI4E",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-bJAv1dhiIHM",
    title: "Chand Sifarish x Chupke Se - JalRaj Ft. Vani Rao",
    artist: "JalRaj",
    src: "/audio/track-077.mp3",
    youtubeId: "bJAv1dhiIHM",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-XSPsu0Z8RP4",
    title: "Tumse Badhkar Duniya Mein - JalRaj Version",
    artist: "JalRaj",
    src: "/audio/track-078.mp3",
    youtubeId: "XSPsu0Z8RP4",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-JYNJuw9bAVM",
    title: "Guli Mata (Male Version)",
    artist: "JalRaj",
    src: "/audio/track-079.mp3",
    youtubeId: "JYNJuw9bAVM",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-JwJX5AkdDRE",
    title: "Aa Kasam Kha Lein",
    artist: "JalRaj",
    src: "/audio/track-080.mp3",
    youtubeId: "JwJX5AkdDRE",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-Ddw2yGFV2GM",
    title: "Jhoom (Lofi)",
    artist: "JalRaj",
    src: "/audio/track-081.mp3",
    youtubeId: "Ddw2yGFV2GM",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-Lt-XljZXzbo",
    title: "Hasi Ban Gaye (Acoustic)",
    artist: "JalRaj",
    src: "/audio/track-082.mp3",
    youtubeId: "Lt-XljZXzbo",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-IGWzkwVSnfI",
    title: "Toota Jo Kabhi Tara x Adayein Bhi Hain - JalRaj Version",
    artist: "JalRaj",
    src: "/audio/track-083.mp3",
    youtubeId: "IGWzkwVSnfI",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-F953oug0KOY",
    title: "Sunn Zara (Reprise)",
    artist: "JalRaj",
    src: "/audio/track-084.mp3",
    youtubeId: "F953oug0KOY",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-36i4ig-VczA",
    title: "Tu Meri Zindagi Hai (New Lyrics) FULL VERSION",
    artist: "JalRaj",
    src: "/audio/track-085.mp3",
    youtubeId: "36i4ig-VczA",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-HtYnbJY0hAw",
    title: "Maahi (Lofi)-JalRaj x Gravero",
    artist: "JalRaj",
    src: "/audio/track-086.mp3",
    youtubeId: "HtYnbJY0hAw",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-8WZhg8Z-go0",
    title: "Dekha Tenu Pehli Pehli Baar (Mashup) - JalRaj Version",
    artist: "JalRaj",
    src: "/audio/track-087.mp3",
    youtubeId: "8WZhg8Z-go0",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-mOeZbrbAq9g",
    title: "Kabhi Na Kabhi To Miloge - JalRaj Ft. Billie Eilish AI",
    artist: "JalRaj",
    src: "/audio/track-088.mp3",
    youtubeId: "mOeZbrbAq9g",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-DY_nQgYCegI",
    title: "Saudebaazi - JalRaj Version",
    artist: "JalRaj",
    src: "/audio/track-089.mp3",
    youtubeId: "DY_nQgYCegI",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-1wTrLiKTsCY",
    title: "Maine Royaan x Kahin To Hogi Woh",
    artist: "JalRaj",
    src: "/audio/track-090.mp3",
    youtubeId: "1wTrLiKTsCY",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt--cYEi2C2UWI",
    title: "Janiye x Kangna",
    artist: "JalRaj",
    src: "/audio/track-091.mp3",
    youtubeId: "-cYEi2C2UWI",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-qrm7REbzPAA",
    title: "Mere Dil Mein",
    artist: "JalRaj",
    src: "/audio/track-092.mp3",
    youtubeId: "qrm7REbzPAA",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-wwf6oTQH5oM",
    title: "JalRaj - Ilzaam Mohabbat Ka [Studio Version]",
    artist: "JalRaj",
    src: "/audio/track-093.mp3",
    youtubeId: "wwf6oTQH5oM",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-uJBSFwc_0DY",
    title: "JalRaj - Humko Tere Siva (Official Audio)",
    artist: "JalRaj",
    src: "/audio/track-094.mp3",
    youtubeId: "uJBSFwc_0DY",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-8S_3L2UfZhw",
    title: "Ek Taraf",
    artist: "JalRaj",
    src: "/audio/track-095.mp3",
    youtubeId: "8S_3L2UfZhw",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-D1Vuu7r-7Mg",
    title: "JalRaj - GALTI (Extended)",
    artist: "JalRaj",
    src: "/audio/track-096.mp3",
    youtubeId: "D1Vuu7r-7Mg",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-FHl68XLg7xk",
    title: "SHAM - JalRaj Ft. @SmritiThakur",
    artist: "JalRaj",
    src: "/audio/track-097.mp3",
    youtubeId: "FHl68XLg7xk",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-Sxko7b1Zx5E",
    title: "Tune Mere Jaana x Baarishein x Tum Meri Ho",
    artist: "JalRaj",
    src: "/audio/track-098.mp3",
    youtubeId: "Sxko7b1Zx5E",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-hbYBMVSkbwE",
    title: "Haal-E-Dil (Reprise)",
    artist: "JalRaj",
    src: "/audio/track-099.mp3",
    youtubeId: "hbYBMVSkbwE",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-C7EXO0gbD3c",
    title: "Pasoori x Tere Jeya Hor Disda",
    artist: "JalRaj",
    src: "/audio/track-100.mp3",
    youtubeId: "C7EXO0gbD3c",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-dQpnSlV75wY",
    title: "Wada Karo (NEW LYRICS) - JalRaj Version",
    artist: "JalRaj",
    src: "/audio/track-101.mp3",
    youtubeId: "dQpnSlV75wY",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-PRKhzDHcRjk",
    title: "Tanha Hoon (Reprise)",
    artist: "JalRaj",
    src: "/audio/track-102.mp3",
    youtubeId: "PRKhzDHcRjk",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-tjaUK9YANPI",
    title: "Hum Jo Chalne Lage x Ik Lamha",
    artist: "JalRaj",
    src: "/audio/track-103.mp3",
    youtubeId: "tjaUK9YANPI",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-uQ8jmttgi6Q",
    title: "Tera Dil Mere Paas Rehne De x Hum Nahi Tere Dushmano Mein",
    artist: "JalRaj",
    src: "/audio/track-104.mp3",
    youtubeId: "uQ8jmttgi6Q",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-h7PzTjFduuw",
    title: "Kahani Suno 2.0",
    artist: "JalRaj",
    src: "/audio/track-105.mp3",
    youtubeId: "h7PzTjFduuw",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-OaZECY6bzFY",
    title: "Hum Tere Bin - JalRaj Version",
    artist: "JalRaj",
    src: "/audio/track-106.mp3",
    youtubeId: "OaZECY6bzFY",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-mjxTtt4Rs30",
    title: "JALRAJ - Tumse Mohabbatein Bepanah Hain  (Official Video)",
    artist: "JalRaj",
    src: "/audio/track-107.mp3",
    youtubeId: "mjxTtt4Rs30",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-bsONqc9zA28",
    title: "ISHQ x Kho Gaye x HEER - (JalRaj Version)",
    artist: "JalRaj",
    src: "/audio/track-108.mp3",
    youtubeId: "bsONqc9zA28",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-7ykQtzvyDXs",
    title: "JalRaj - MANN LAAGE  (Official Audio) ft. Shubhangi Dave",
    artist: "JalRaj",
    src: "/audio/track-109.mp3",
    youtubeId: "7ykQtzvyDXs",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-SQtnm0ozP8Q",
    title: "Bhula Dunga (Reprise)| JalRaj| Sidharth Shukla",
    artist: "JalRaj",
    src: "/audio/track-110.mp3",
    youtubeId: "SQtnm0ozP8Q",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-fP2smswVmHE",
    title: "Rab Ka Shukrana (Reprise)",
    artist: "JalRaj",
    src: "/audio/track-111.mp3",
    youtubeId: "fP2smswVmHE",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-LNxRdKYAkoU",
    title: "Dholna x Tere Bin Nahi Lagda - JalRaj Version",
    artist: "JalRaj",
    src: "/audio/track-112.mp3",
    youtubeId: "LNxRdKYAkoU",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-xl72XoT4Egk",
    title: "JALRAJ - Tumne Kisi Se Kabhi Pyar Kiya Hai (Full Version)",
    artist: "JalRaj",
    src: "/audio/track-113.mp3",
    youtubeId: "xl72XoT4Egk",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-vIdLLtsh03U",
    title: "Aaja Ve Mahiya 2.0",
    artist: "JalRaj",
    src: "/audio/track-114.mp3",
    youtubeId: "vIdLLtsh03U",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-HaG3swVM6d8",
    title: "Garam Masala",
    artist: "JalRaj",
    src: "/audio/track-115.mp3",
    youtubeId: "HaG3swVM6d8",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-HhlA-inEmBs",
    title: "Filhaal2 Mohabbat (Reprise)",
    artist: "JalRaj",
    src: "/audio/track-116.mp3",
    youtubeId: "HhlA-inEmBs",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-HWjtkY_nIeA",
    title: "Tere Vaaste (Reprise)",
    artist: "JalRaj",
    src: "/audio/track-117.mp3",
    youtubeId: "HWjtkY_nIeA",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-VXqGovYexao",
    title: "Tumhare Siva (FULL VERSION)- JalRaj",
    artist: "JalRaj",
    src: "/audio/track-118.mp3",
    youtubeId: "VXqGovYexao",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-WF0JZFvxYYU",
    title: "Pardesiya x Yeh Haseen Vadiyan - (JalRaj Version)| New Mashups 2025",
    artist: "JalRaj",
    src: "/audio/track-119.mp3",
    youtubeId: "WF0JZFvxYYU",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-fLRYx9rfvDg",
    title: "JalRaj - Rozaana (Official Audio)",
    artist: "JalRaj",
    src: "/audio/track-120.mp3",
    youtubeId: "fLRYx9rfvDg",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-mciNL0DQM1I",
    title: "HUSN - JalRaj Version",
    artist: "JalRaj",
    src: "/audio/track-121.mp3",
    youtubeId: "mciNL0DQM1I",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-Bl8KXg5CMfw",
    title: "Chhod Diya (Lofi)",
    artist: "JalRaj",
    src: "/audio/track-122.mp3",
    youtubeId: "Bl8KXg5CMfw",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-FtymaeTDkVo",
    title: "Tum Hi Aana",
    artist: "JalRaj",
    src: "/audio/track-123.mp3",
    youtubeId: "FtymaeTDkVo",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-kzGUoZ4LXKY",
    title: "Ishq Tera Naam Lekar",
    artist: "JalRaj",
    src: "/audio/track-124.mp3",
    youtubeId: "kzGUoZ4LXKY",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-qa4fuUCrJ6U",
    title: "Sach Keh Raha Hai Deewana (Reprise)",
    artist: "JalRaj",
    src: "/audio/track-125.mp3",
    youtubeId: "qa4fuUCrJ6U",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-WM1wnaZP2AQ",
    title: "Manike (Reprise)",
    artist: "JalRaj",
    src: "/audio/track-126.mp3",
    youtubeId: "WM1wnaZP2AQ",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-H9u6SruHBo4",
    title: "JALRAJ - Tum Dil Ki Dhadkan Mein (Reprise)",
    artist: "JalRaj",
    src: "/audio/track-127.mp3",
    youtubeId: "H9u6SruHBo4",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-rQUlOct6sBs",
    title: "Pagalpan (Revisited)",
    artist: "JalRaj",
    src: "/audio/track-128.mp3",
    youtubeId: "rQUlOct6sBs",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-_hf_McWU_Fo",
    title: "O Sajni Re (Lofi) - JalRaj Version",
    artist: "JalRaj",
    src: "/audio/track-129.mp3",
    youtubeId: "_hf_McWU_Fo",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-S5nbR7Hm4xQ",
    title: "Kesariya 2.0",
    artist: "JalRaj",
    src: "/audio/track-130.mp3",
    youtubeId: "S5nbR7Hm4xQ",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-PaeaU3ktMuk",
    title: "GALTI",
    artist: "JalRaj",
    src: "/audio/track-131.mp3",
    youtubeId: "PaeaU3ktMuk",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-FW5ULfFUNN8",
    title: "Ek Dafa Dekh le (Lofi)",
    artist: "JalRaj",
    src: "/audio/track-132.mp3",
    youtubeId: "FW5ULfFUNN8",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-RGmI-5qs-e0",
    title: "Nazron Se Bachke - JalRaj_Official Audio",
    artist: "JalRaj",
    src: "/audio/track-133.mp3",
    youtubeId: "RGmI-5qs-e0",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-_ASl_5aJJqQ",
    title: "Harleys In Hawaii X  Dilko Tumse Pyar Hua",
    artist: "JalRaj",
    src: "/audio/track-134.mp3",
    youtubeId: "_ASl_5aJJqQ",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-Bg2GQqY97UY",
    title: "Zara Zara x Let Me Down Slowly",
    artist: "JalRaj",
    src: "/audio/track-135.mp3",
    youtubeId: "Bg2GQqY97UY",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-3-lG7cI0XQc",
    title: "Suno Na Sun Lo Na (FULL VERSION)",
    artist: "JalRaj",
    src: "/audio/track-136.mp3",
    youtubeId: "3-lG7cI0XQc",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-nhEz74XgdN4",
    title: "Tum Ho Mera Pyaar x Jaavedaan Hai",
    artist: "JalRaj",
    src: "/audio/track-137.mp3",
    youtubeId: "nhEz74XgdN4",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-X-9Ah7yqUDg",
    title: "Dard-E-Tanhai x Main Chala",
    artist: "JalRaj",
    src: "/audio/track-138.mp3",
    youtubeId: "X-9Ah7yqUDg",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-NAFe6uXu_ww",
    title: "Kyun Tu Pareshan Hai - JalRaj (Official Audio)",
    artist: "JalRaj",
    src: "/audio/track-139.mp3",
    youtubeId: "NAFe6uXu_ww",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-GUCP5JjsppE",
    title: "Aaj Bhi 2 (JalRaj Version)",
    artist: "JalRaj",
    src: "/audio/track-140.mp3",
    youtubeId: "GUCP5JjsppE",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-Z_hguGMH2Xs",
    title: "Sochta Na Rahoon",
    artist: "JalRaj",
    src: "/audio/track-141.mp3",
    youtubeId: "Z_hguGMH2Xs",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-u1fBDsmvfcY",
    title: "Sita Ram Kahiye",
    artist: "JalRaj",
    src: "/audio/track-142.mp3",
    youtubeId: "u1fBDsmvfcY",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-PlyxrZLOCyw",
    title: "Agar Mujhse Mohabbat Hai (Slowed + Reverb)",
    artist: "JalRaj",
    src: "/audio/track-143.mp3",
    youtubeId: "PlyxrZLOCyw",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-9jkxL8MrVX8",
    title: "Puchho Na Yaar Kya Hua (Reprise)",
    artist: "JalRaj",
    src: "/audio/track-144.mp3",
    youtubeId: "9jkxL8MrVX8",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-5wr5PakCvkA",
    title: "Pehle Si Chahat (Studio Version)- JalRaj",
    artist: "JalRaj",
    src: "/audio/track-145.mp3",
    youtubeId: "5wr5PakCvkA",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-W_wiryBc-uo",
    title: "Bhool Bhulaiyaa (New Lyrics)",
    artist: "JalRaj",
    src: "/audio/track-146.mp3",
    youtubeId: "W_wiryBc-uo",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-NJXdmcKJ3so",
    title: "Tumhi Mein Humara Sanam Dikh Raha Hai",
    artist: "JalRaj",
    src: "/audio/track-147.mp3",
    youtubeId: "NJXdmcKJ3so",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-GMQsRppVEg8",
    title: "JalRaj - Tumko Ab Na Jane Dunga (Reprise)",
    artist: "JalRaj",
    src: "/audio/track-148.mp3",
    youtubeId: "GMQsRppVEg8",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-tvFReKj-bkA",
    title: "Untitled",
    artist: "JalRaj",
    src: "/audio/track-149.mp3",
    youtubeId: "tvFReKj-bkA",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-_UchQT030Hk",
    title: "Untitled",
    artist: "JalRaj",
    src: "/audio/track-150.mp3",
    youtubeId: "_UchQT030Hk",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-he8wQsL_A4Q",
    title: "Untitled",
    artist: "JalRaj",
    src: "/audio/track-151.mp3",
    youtubeId: "he8wQsL_A4Q",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-yUr63trgJ88",
    title: "Untitled",
    artist: "JalRaj",
    src: "/audio/track-152.mp3",
    youtubeId: "yUr63trgJ88",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-1cvVwZ2-GeM",
    title: "Untitled",
    artist: "JalRaj",
    src: "/audio/track-153.mp3",
    youtubeId: "1cvVwZ2-GeM",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-r8T6T_ncDvc",
    title: "Untitled",
    artist: "JalRaj",
    src: "/audio/track-154.mp3",
    youtubeId: "r8T6T_ncDvc",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-cn9L89dAoZM",
    title: "Untitled",
    artist: "JalRaj",
    src: "/audio/track-155.mp3",
    youtubeId: "cn9L89dAoZM",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-xr_wDY-xHgk",
    title: "Untitled",
    artist: "JalRaj",
    src: "/audio/track-156.mp3",
    youtubeId: "xr_wDY-xHgk",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-2i3lECObGdY",
    title: "Untitled",
    artist: "JalRaj",
    src: "/audio/track-157.mp3",
    youtubeId: "2i3lECObGdY",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-HnrghWmXTJk",
    title: "Ya Ali (New Lyrics)",
    artist: "JalRaj",
    src: "/audio/track-158.mp3",
    youtubeId: "HnrghWmXTJk",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-_9J6p0IHgX4",
    title: "Mauka Milega To (FULL VERSION)- JalRaj",
    artist: "JalRaj",
    src: "/audio/track-159.mp3",
    youtubeId: "_9J6p0IHgX4",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-HcOk8XE8nts",
    title: "Teri Umeed Tera Intezar (New Lyrics)",
    artist: "JalRaj",
    src: "/audio/track-160.mp3",
    youtubeId: "HcOk8XE8nts",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-NDHKZDj2DDg",
    title: "Baith Mere Paas - JalRaj Version",
    artist: "JalRaj",
    src: "/audio/track-161.mp3",
    youtubeId: "NDHKZDj2DDg",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-dgx0p5DQ5Q8",
    title: "Rab Kare Tujhko Bhi  (FULL VERSION)",
    artist: "JalRaj",
    src: "/audio/track-162.mp3",
    youtubeId: "dgx0p5DQ5Q8",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-nAsg5F_87Ts",
    title: "Barbaad x Humnava Mere - (JalRaj Version)| Saiyaara",
    artist: "JalRaj",
    src: "/audio/track-163.mp3",
    youtubeId: "nAsg5F_87Ts",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-qiiKMYVDXdA",
    title: "Jaate Hue Lamhon (To Chalun)",
    artist: "JalRaj",
    src: "/audio/track-164.mp3",
    youtubeId: "qiiKMYVDXdA",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-XAMyzTCB7DU",
    title: "Subah Se Lekar Shaam Tak",
    artist: "JalRaj",
    src: "/audio/track-165.mp3",
    youtubeId: "XAMyzTCB7DU",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-9MR7W-fFP0s",
    title: "Woh Lamhe Woh Baatein (Lofi)",
    artist: "JalRaj",
    src: "/audio/track-166.mp3",
    youtubeId: "9MR7W-fFP0s",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-WMDmlMryHms",
    title: "JAIYE SAJANA (JalRaj): Dhurandhar The Revenge",
    artist: "JalRaj",
    src: "/audio/track-167.mp3",
    youtubeId: "WMDmlMryHms",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-JAmD8BCkzYg",
    title: "Tu Shayar Hai Main Teri Shayari",
    artist: "JalRaj",
    src: "/audio/track-168.mp3",
    youtubeId: "JAmD8BCkzYg",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-kzxo--iVBuU",
    title: "Badi Mastani Hai Meri Mehbooba",
    artist: "JalRaj",
    src: "/audio/track-169.mp3",
    youtubeId: "kzxo--iVBuU",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-ff2Rowy_HLw",
    title: "DESIRE - Official Music Video",
    artist: "JalRaj",
    src: "/audio/track-170.mp3",
    youtubeId: "ff2Rowy_HLw",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-n2529nN0A4Q",
    title: "Chori Chori Dil Tera Churayenge (New Lyrics)- JalRaj",
    artist: "JalRaj",
    src: "/audio/track-171.mp3",
    youtubeId: "n2529nN0A4Q",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-SxASH5qJ_Zw",
    title: "Toh Phir Aao x Tera Mera Rishta",
    artist: "JalRaj",
    src: "/audio/track-172.mp3",
    youtubeId: "SxASH5qJ_Zw",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-erSOa8-d8Nw",
    title: "NAZAR LAG JAYE NA - JalRaj (Official Music Video)",
    artist: "JalRaj",
    src: "/audio/track-173.mp3",
    youtubeId: "erSOa8-d8Nw",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-Nx2JEuymeqg",
    title: "O Firki Wali Tu Kal Fir Ana",
    artist: "JalRaj",
    src: "/audio/track-174.mp3",
    youtubeId: "Nx2JEuymeqg",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-IINTh5r_5Pg",
    title: "Itna Na Mujhse Tu Pyar Badha (New Lyrics)",
    artist: "JalRaj",
    src: "/audio/track-175.mp3",
    youtubeId: "IINTh5r_5Pg",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-Xwpsj5hi1So",
    title: "Aaj Hum Tum O Sanam",
    artist: "JalRaj",
    src: "/audio/track-176.mp3",
    youtubeId: "Xwpsj5hi1So",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-UgwMExSBgsk",
    title: "Chalre Chalre Waal x Na Kajre Ki Dhar",
    artist: "JalRaj",
    src: "/audio/track-177.mp3",
    youtubeId: "UgwMExSBgsk",
    cover: "/images/meadow-couple-sunset.webp",
  },
  {
    id: "yt-k3iOsRkDDsk",
    title: "PAIGHAAM - Official Music Video",
    artist: "JalRaj",
    src: "/audio/track-178.mp3",
    youtubeId: "k3iOsRkDDsk",
    cover: "/images/meadow-couple-sunset.webp",
  },
];

```

## `src/lib/sharing.ts`

```text
import { SHARE_MESSAGE } from "./constants";

/** Returns a safe absolute URL for sharing. Never invents a production URL. */
export function getShareUrl(): string {
  if (typeof window === "undefined") return "";
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (envUrl) {
    try {
      const u = new URL(envUrl);
      if (u.protocol === "https:" || u.protocol === "http:") return u.toString();
    } catch {
      // fall through to location.href
    }
  }
  return window.location.href;
}

export function isValidShareUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
}

export type ShareOutcome = "native" | "whatsapp" | "copied" | "failed";

export async function nativeShare(url: string): Promise<boolean> {
  if (
    typeof navigator === "undefined" ||
    !("share" in navigator) ||
    !isValidShareUrl(url)
  )
    return false;
  try {
    await navigator.share({
      title: "Somewhere With You",
      text: SHARE_MESSAGE,
      url,
    });
    return true;
  } catch (err) {
    // User cancelled — treat as handled, not failure
    if (err instanceof DOMException && err.name === "AbortError") return true;
    return false;
  }
}

export function whatsappShareUrl(url: string): string {
  const text = `${SHARE_MESSAGE}\n${url}`;
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

export async function copyLink(url: string): Promise<boolean> {
  if (!isValidShareUrl(url)) return false;
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(url);
      return true;
    }
  } catch {
    // fallback below
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = url;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

```

## `src/lib/youtube.ts`

```text
/**
 * YouTube helpers — parsing + IFrame API loader.
 * No API key needed for embedded playback.
 */

export function parsePlaylistId(url: string): string | null {
  try {
    const u = new URL(url);
    const list = u.searchParams.get("list");
    if (list && /^[A-Za-z0-9_-]{10,}$/.test(list)) return list;
    return null;
  } catch {
    return null;
  }
}

export function parseVideoId(url: string): string | null {
  try {
    const trimmed = url.trim();
    // Bare 11-char ID
    if (/^[A-Za-z0-9_-]{11}$/.test(trimmed)) return trimmed;
    const u = new URL(trimmed);
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.slice(1).split("/")[0];
      return /^[A-Za-z0-9_-]{11}$/.test(id) ? id : null;
    }
    if (u.hostname.includes("youtube.com")) {
      const v = u.searchParams.get("v");
      if (v && /^[A-Za-z0-9_-]{11}$/.test(v)) return v;
      const parts = u.pathname.split("/").filter(Boolean);
      // /embed/ID, /shorts/ID, /live/ID
      const idx = parts.findIndex((p) => ["embed", "shorts", "live"].includes(p));
      if (idx >= 0 && parts[idx + 1] && /^[A-Za-z0-9_-]{11}$/.test(parts[idx + 1])) {
        return parts[idx + 1];
      }
    }
    return null;
  } catch {
    return null;
  }
}

/** Extract all video IDs from a pasted playlist URL list — best effort. */
export function extractIdsFromText(text: string): string[] {
  const ids = new Set<string>();
  const single = parseVideoId(text);
  if (single) ids.add(single);
  // find v=... occurrences
  const re = /[?&]v=([A-Za-z0-9_-]{11})/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) ids.add(m[1]);
  return [...ids];
}

export function youtubeWatchUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

export function youtubeThumbnail(videoId: string): string {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

// --- IFrame API loader (singleton) ---

declare global {
  interface Window {
    YT?: typeof YT;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<typeof YT> | null = null;

export function loadYouTubeApi(): Promise<typeof YT> {
  if (typeof window === "undefined") return Promise.reject(new Error("No window"));
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (apiPromise) return apiPromise;

  // A single failure must not poison future retries: clear the cache on reject.
  let rejectApi!: (err: Error) => void;
  const pending = new Promise<typeof YT>((resolve, reject) => {
    rejectApi = (err) => {
      if (apiPromise === pending) apiPromise = null;
      reject(err);
    };
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      if (window.YT) resolve(window.YT);
      else rejectApi(new Error("YouTube API failed to load"));
    };
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    tag.async = true;
    tag.onerror = () => rejectApi(new Error("YouTube API script failed"));
    document.head.appendChild(tag);
    // Safety timeout
    setTimeout(() => {
      if (!window.YT?.Player)
        rejectApi(new Error("YouTube API timed out — check connection / ad-blocker"));
    }, 15000);
  });

  apiPromise = pending;
  // Avoid an unhandled rejection if nobody is awaiting yet
  pending.catch(() => {});
  return pending;
}

```

## `src/types/music.ts`

```text
export interface Track {
  id: string;
  title: string;
  artist: string;
  /** Local file fallback (used when YouTube is disabled). */
  src: string;
  /** YouTube video ID (11 chars). When set and YouTube mode is on, this streams instead of `src`. */
  youtubeId?: string;
  /** Optional cover art path */
  cover?: string;
  /** Optional duration hint in seconds (used before metadata loads) */
  durationHint?: number;
}

export interface PlayerState {
  trackIndex: number;
  isPlaying: boolean;
  progress: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isLoading: boolean;
  error: string | null;
  hasAudio: boolean;
}

```

