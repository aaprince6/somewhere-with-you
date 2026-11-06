import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Tailwind v4 ships a Turbopack loader that compiles `@import "tailwindcss"`
  // and the `@theme` at-rule through Tailwind's own CSS engine. Without it,
  // CSS falls back to plain PostCSS, which does not understand `@theme` —
  // every utility class (flex, rounded-full, bg-white, …) is silently dropped
  // and the page renders as unstyled text.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;