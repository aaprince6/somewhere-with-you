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
