"use client";

import { useMemo } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Warm glowing fireflies drifting over the meadow. Pure CSS, cheap. */
export function Fireflies({ count = 14 }: { count?: number }) {
  const reduced = useReducedMotion();
  const flies = useMemo(
    () =>
      Array.from({ length: reduced ? 0 : count }, (_, i) => ({
        id: i,
        left: (i * 67 + 23) % 100,
        top: 35 + ((i * 41 + 7) % 55),
        size: 3 + ((i * 5) % 4),
        duration: 9 + ((i * 7) % 14),
        delay: -((i * 11) % 18),
      })),
    [reduced, count]
  );

  if (reduced) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {flies.map((f) => (
        <span
          key={f.id}
          className="float-dust absolute rounded-full"
          style={{
            left: `${f.left}%`,
            top: `${f.top}%`,
            width: f.size,
            height: f.size,
            background: "#F5D9A8",
            boxShadow: "0 0 14px 4px rgba(233,168,93,0.4)",
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
