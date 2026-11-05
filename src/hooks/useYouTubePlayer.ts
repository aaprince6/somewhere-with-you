"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PLAYLIST, youtubeIds, hasYouTube } from "@/lib/playlist";
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
  // Consecutive embed-error auto-skips: cap them so one broken playlist
  // doesn't loop forever. Reset whenever a track actually plays.
  const errorSkips = useRef(0);

  // Keep holder in sync outside render
  useEffect(() => {
    indexHolder.current = trackIndex;
  }, [trackIndex]);

  const mountNode = useCallback((el: HTMLDivElement | null) => {
    mountEl.current = el;
  }, []);

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
                errorSkips.current = 0;
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
              // Auto-skip past unplayable videos (embedding disabled,
              // region-blocked) instead of stalling. Cap consecutive skips.
              if (errorSkips.current < 5 && PLAYLIST.length > 1) {
                errorSkips.current += 1;
                const n = (indexHolder.current + 1) % PLAYLIST.length;
                const id = PLAYLIST[n]?.youtubeId;
                if (id) {
                  setTrackIndex(n);
                  try {
                    playerRef.current?.loadVideoById(id);
                  } catch {
                    // ignore
                  }
                }
              } else if (errorSkips.current >= 5) {
                setError(
                  "Several songs in a row can't play here (embedding disabled or region-blocked). Tap Next to try again."
                );
              }
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
  }, [ready, volume]);

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
