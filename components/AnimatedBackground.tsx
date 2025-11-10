"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function AnimatedBackground() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Gradient Orbs */}
      <div
        className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 blur-3xl animate-blob"
        style={{
          background:
            theme === "dark"
              ? "radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-40 -left-40 w-80 h-80 rounded-full opacity-20 blur-3xl animate-blob animation-delay-2000"
        style={{
          background:
            theme === "dark"
              ? "radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-40 left-1/2 w-80 h-80 rounded-full opacity-20 blur-3xl animate-blob animation-delay-4000"
        style={{
          background:
            theme === "dark"
              ? "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)",
        }}
      />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(${theme === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)"} 1px, transparent 1px),
            linear-gradient(90deg, ${theme === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)"} 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Noise Texture */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}