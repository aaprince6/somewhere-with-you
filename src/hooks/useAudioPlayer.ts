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

    // State resets are deferred: they are derived from the track change but
    // must not cascade-render synchronously inside the effect body.
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
        .catch(() => {
          // Autoplay blocked or file missing — onError surfaces the real cause
          setIsLoading(false);
          setIsPlaying(false);
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
    if (isPlaying) {
      pendingIndex.current = n;
      setCurrentIndex(n);
    } else {
      setCurrentIndex(n);
    }
  }, [currentIndex, isPlaying]);

  const prev = useCallback(async () => {
    const p = (currentIndex - 1 + PLAYLIST.length) % PLAYLIST.length;
    if (isPlaying) pendingIndex.current = p;
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
