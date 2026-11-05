# Music — YouTube mode (no downloads)

The site streams from your YouTube playlist — no .mp3 files needed.

## Wired playlist (full tracklist)

**JalRaj Hits | Best Love Songs** — all 178 videos, in playlist order:
`https://www.youtube.com/playlist?list=PLDNDioV1k46dlwnLdVwMhYz1AN4FC6oxH`

Every entry lives in `src/lib/playlist.ts` (track 001 = `Dil Ibaadat (Reprise)`
through track 178 = `PAIGHAAM`). Titles are cleaned playlist titles, artist
JalRaj throughout.

## How it works

- Official YouTube IFrame embed (`https://www.youtube.com/iframe_api`).
- Hidden 4×4 player for audio; your custom glass player stays on top.
- Play/Pause/Next/Prev/Seek/Volume/Playlist all drive the YouTube player.
  Playback advances through all 178 in order and loops at the end.
- Cover art auto-uses `https://i.ytimg.com/vi/ID/hqdefault.jpg`.
- “External link” icon opens Watch on YouTube; playlist footer links the full playlist.
- The playlist drawer scrolls (`max-h-[38vh]`) so all 178 stay reachable on mobile.

## Swap / reorder songs

Edit `src/lib/playlist.ts` — replace any `youtubeId` with another 11-char ID
(open the video → copy the `v=...` value) or reorder entries. No other file
needs to change.

## If a song won't play

- Owner disabled embedding, region-blocked, or deleted → calm error + Next button.
- Replace that `youtubeId` with an embeddable upload.
- Ad-blockers blocking youtube.com → “YouTube couldn't load” — allowlist and refresh.

## Fallback to local files

Set `USE_YOUTUBE = false` in `src/lib/playlist.ts` to use local files in
`public/audio/` (licensed files only).
