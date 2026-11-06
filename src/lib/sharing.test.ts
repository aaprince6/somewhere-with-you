import assert from "node:assert/strict";
import { test } from "node:test";
import { SHARE_MESSAGE } from "./constants.ts";
import {
  copyLink,
  getShareUrl,
  isValidShareUrl,
  nativeShare,
  sanitizeName,
  whatsappShareUrl,
} from "./sharing.ts";

test("sanitizeName keeps letters, spaces, apostrophe and hyphen", () => {
  assert.equal(sanitizeName("Anna-Maria"), "Anna-Maria");
  assert.equal(sanitizeName("O'Connor"), "O'Connor");
  assert.equal(sanitizeName("Lénaï"), "Lénaï");
});

test("sanitizeName strips HTML/script injection", () => {
  assert.equal(sanitizeName("<script>alert(1)</script>"), "script alert script");
  assert.equal(sanitizeName('"><img src=x onerror=alert(1)>'), "img src x onerror alert");
});

test("sanitizeName collapses whitespace and trims", () => {
  assert.equal(sanitizeName("   spaced   out   "), "spaced out");
});

test("sanitizeName caps at 40 chars", () => {
  assert.equal(sanitizeName("x".repeat(100)).length, 40);
});

test("sanitizeName handles null/undefined safely", () => {
  assert.equal(sanitizeName(null as unknown as string), "");
  assert.equal(sanitizeName(undefined as unknown as string), "");
});

test("sanitizeName preserves typographic apostrophe", () => {
  assert.equal(sanitizeName("S\u2019OUL"), "S\u2019OUL");
});

test("whatsappShareUrl encodes message + url", () => {
  const url = whatsappShareUrl("https://example.com/?a=b c");
  assert.ok(url.startsWith("https://wa.me/?text="));
  assert.equal(
    url,
    "https://wa.me/?text=" +
      encodeURIComponent(`${SHARE_MESSAGE}\nhttps://example.com/?a=b c`),
  );
});

test("copyLink returns false for invalid url", async () => {
  assert.equal(await copyLink("not a url"), false);
});

type NavWithClipboard = Navigator & {
  clipboard?: { writeText: (s: string) => Promise<void> };
};

test("copyLink uses navigator.clipboard when available", async () => {
  const written: string[] = [];
  const origClipboard = (globalThis as NavWithClipboard).navigator?.clipboard;
  Object.defineProperty(globalThis, "navigator", {
    value: { clipboard: { writeText: (s: string) => { written.push(s); return Promise.resolve(); } } },
    configurable: true,
    writable: true,
  });
  try {
    assert.equal(await copyLink("https://example.com/x"), true);
    assert.deepEqual(written, ["https://example.com/x"]);
  } finally {
    if (origClipboard !== undefined) {
      Object.defineProperty(globalThis, "navigator", { value: { clipboard: origClipboard }, configurable: true, writable: true });
    } else {
      delete (globalThis as NavWithClipboard).navigator;
    }
  }
});

test("copyLink falls back to execCommand when clipboard missing", async () => {
  const calls: string[] = [];
  const origNav = (globalThis as NavWithClipboard).navigator;
  const origDoc = (globalThis as unknown as { document: Document }).document;
  Object.defineProperty(globalThis, "navigator", { value: {}, configurable: true, writable: true });
  const fakeTa = { value: "", setAttribute() {}, style: {}, select() {} };
  Object.defineProperty(globalThis, "document", {
    value: {
      createElement: () => fakeTa,
      body: { appendChild() {}, removeChild() {} },
      execCommand: (cmd: string) => { calls.push(cmd); return true; },
    },
    configurable: true,
    writable: true,
  });
  try {
    assert.equal(await copyLink("https://example.com/y"), true);
    assert.deepEqual(calls, ["copy"]);
  } finally {
    Object.defineProperty(globalThis, "navigator", { value: origNav, configurable: true, writable: true });
    Object.defineProperty(globalThis, "document", { value: origDoc, configurable: true, writable: true });
  }
});

test("nativeShare returns false when navigator.share missing", async () => {
  const origNav = (globalThis as NavWithClipboard).navigator;
  Object.defineProperty(globalThis, "navigator", { value: {}, configurable: true, writable: true });
  try {
    assert.equal(await nativeShare("https://example.com/z"), false);
  } finally {
    Object.defineProperty(globalThis, "navigator", { value: origNav, configurable: true, writable: true });
  }
});

test("nativeShare returns true on success", async () => {
  const origNav = (globalThis as NavWithClipboard).navigator;
  const shareCalls: { title: string; text: string; url: string }[] = [];
  Object.defineProperty(globalThis, "navigator", {
    value: { share: (opts: { title: string; text: string; url: string }) => { shareCalls.push(opts); return Promise.resolve(); } },
    configurable: true,
    writable: true,
  });
  try {
    assert.equal(await nativeShare("https://example.com/s"), true);
    assert.equal(shareCalls.length, 1);
    assert.equal(shareCalls[0].url, "https://example.com/s");
  } finally {
    Object.defineProperty(globalThis, "navigator", { value: origNav, configurable: true, writable: true });
  }
});

test("nativeShare treats AbortError as handled", async () => {
  const origNav = (globalThis as NavWithClipboard).navigator;
  Object.defineProperty(globalThis, "navigator", {
    value: { share: () => Promise.reject(new DOMException("User cancelled", "AbortError")) },
    configurable: true,
    writable: true,
  });
  try {
    assert.equal(await nativeShare("https://example.com/a"), true);
  } finally {
    Object.defineProperty(globalThis, "navigator", { value: origNav, configurable: true, writable: true });
  }
});

test("isValidShareUrl rejects non-http", () => {
  assert.equal(isValidShareUrl("https://example.com"), true);
  assert.equal(isValidShareUrl("http://localhost"), true);
  assert.equal(isValidShareUrl("ftp://example.com"), false);
  assert.equal(isValidShareUrl("not a url"), false);
});

test("getShareUrl returns empty string without window", () => {
  assert.equal(getShareUrl(), "");
});