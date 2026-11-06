/**
 * YouTube helpers — parsing + IFrame API loader.
 * No API key needed for embedded playback.
 */

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
