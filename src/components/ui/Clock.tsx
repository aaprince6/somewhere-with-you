"use client";

import { useEffect, useState } from "react";

/** Live clock in the style of the reference's top-right time readout. */
export function Clock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    queueMicrotask(() => setNow(new Date()));
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

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
