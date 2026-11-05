"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
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

export const MusicPlayer = React.memo(function MusicPlayer(props: Props) {
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
    // Defer the initial countdown write so it doesn't cascade-render.
    queueMicrotask(() => setSleepLeft(sleep * 60));
    const id = setInterval(() => {
      setSleepLeft((s) => {
        if (s <= 1) {
          clearInterval(id);
          // Side effect must not live inside an updater (StrictMode may
          // invoke it twice) — defer to the next tick.
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
              <li className="px-4 py-3 text-[11px] leading-relaxed text-white/60">
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
});
