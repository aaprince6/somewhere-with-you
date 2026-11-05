"use client";

import { useEffect, useState } from "react";

/**
 * Respects OS-level reduced-motion preference.
 *
 * Hydrate-safe by design: the initializer guards on `typeof window`, so the
 * server and the client's first render agree (both `false`). The real value
 * is computed in the initializer on the client — no `setState` inside the
 * effect, which avoids cascading renders and the `set-state-in-effect` lint.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function")
      return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function")
      return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}