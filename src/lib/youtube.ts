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
