"use client";

import { useSyncExternalStore } from "react";

/** Live clock in the style of the reference's top-right time readout.
 *  `useSyncExternalStore` keeps SSR output stable ("--:--") with no
 *  effect-driven setState and no hydration mismatch. The snapshot is cached
 *  at module scope and only mutated inside the subscribe callback, so
 *  `getSnapshot` always returns the same object between ticks — otherwise
 *  React sees a "store changed" on every render and loops forever.
 */
let cachedNow: Date | null = null;

function subscribe(onChange: () => void) {
  const id = setInterval(() => {
    cachedNow = new Date();
    onChange();
  }, 1000);
  return () => clearInterval(id);
}

function getSnapshot(): Date | null {
  return cachedNow;
}

function getServerSnapshot(): null {
  return null;
}

export function Clock() {
  const now = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!now) {
    return (
      <span aria-hidden="true" className="tabular-nums text-2xl font-semibold tracking-wide text-[#F5EBDD]">
        --<span className="text-[#E9A85D]">:</span>--
      </span>
    );
  }

  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");

  return (
    <span
      aria-label={`Current time ${hh}:${mm}`}
      className="tabular-nums text-2xl font-semibold tracking-wide text-[#F5EBDD]"
    >
      {hh}
      <span className="text-[#E9A85D]">:</span>
      {mm}
      <span className="ml-1 align-top text-xs text-[#F5EBDD]/60">{ss}</span>
    </span>
  );
}