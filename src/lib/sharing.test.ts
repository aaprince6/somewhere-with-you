import assert from "node:assert/strict";
import { test } from "node:test";
import { sanitizeName } from "./sharing.ts";

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