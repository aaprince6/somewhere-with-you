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

/** Sanitise a dedication name from `?to=` or user input.
 *
 * Keeps Unicode letters (incl. accented / non-Latin), spaces, hyphen and
 * apostrophe (incl. the typographic U+2019). Collapses internal whitespace
 * and caps at 40 chars so it can never grow into a payload or an injection.
 */
export function sanitizeName(raw: string): string {
  return (raw ?? "")
    .replace(/[^\p{L}\p{M}\s'’-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 40);
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
