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
2. Keep the same filenames, or update `IntroScene.tsx`, `page.tsx`,
   `layout.tsx` OG metadata.
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
