"use client";

import { useMemo } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Floating dust / light particles + warm light leak. Pure CSS, cheap. */
export function Atmosphere({ density = 18 }: { density?: number }) {
  const reduced = useReducedMotion();
  const particles = useMemo(
    () =>
      Array.from({ length: reduced ? 0 : density }, (_, i) => ({
        id: i,
        left: (i * 53 + 11) % 100,
        top: 20 + ((i * 37 + 13) % 70),
        size: 2 + ((i * 7) % 5),
        duration: 14 + ((i * 3) % 18),
        delay: -((i * 5) % 20),
        opacity: 0.25 + ((i % 5) / 10),
      })),
    [density, reduced]
  );

  if (reduced) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* warm sunlight bloom */}
      <div className="sun-pulse absolute left-1/2 top-[22%] h-[42vmax] w-[42vmax] -translate-x-1/2 rounded-full bg-[#E9A85D]/25 blur-[90px]" />
      <div className="absolute -bottom-24 left-0 right-0 h-64 bg-gradient-to-t from-[#101A14]/70 to-transparent" />
      {particles.map((p) => (
        <span
          key={p.id}
          className="float-dust absolute rounded-full bg-[#F5EBDD]"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            boxShadow: "0 0 12px rgba(245,235,221,.8)",
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
