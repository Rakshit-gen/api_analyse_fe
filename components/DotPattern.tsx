"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function DotPattern() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Radial Gradient Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            theme === "dark"
              ? "radial-gradient(circle at 50% 50%, rgba(30, 30, 40, 0.5) 0%, rgba(15, 15, 20, 0) 50%)"
              : "radial-gradient(circle at 50% 50%, rgba(250, 250, 255, 0.5) 0%, rgba(255, 255, 255, 0) 50%)",
        }}
      />

      {/* Dot Pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
        <defs>
          <pattern
            id="dot-pattern"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="2"
              cy="2"
              r="1"
              fill={theme === "dark" ? "#ffffff" : "#000000"}
            />
          </pattern>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#dot-pattern)" />
      </svg>

      {/* Floating Orbs */}
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{
          background:
            theme === "dark"
              ? "radial-gradient(circle, rgba(99, 102, 241, 0.5) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)",
          animation: "float 20s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{
          background:
            theme === "dark"
              ? "radial-gradient(circle, rgba(168, 85, 247, 0.5) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%)",
          animation: "float 25s ease-in-out infinite reverse",
        }}
      />
    </div>
  );
}