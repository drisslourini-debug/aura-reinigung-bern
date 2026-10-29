import React from "react";
import Link from "next/link";
import { SITE_CONFIG } from "@/config/site.config";

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  variant?: "light" | "dark";
}

export function Logo({ className = "", showTagline = false, variant = "light" }: LogoProps) {
  const isDark = variant === "dark";

  return (
    <Link href="/" className={`inline-flex items-center gap-3.5 group select-none ${className}`}>
      {/* Precision Geometric Monogram Icon */}
      <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-950 to-slate-800 flex items-center justify-center shadow-md border border-slate-700/40 overflow-hidden group-hover:scale-105 transition-transform duration-300 shrink-0">
        {/* Internal ambient aura */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/25 via-transparent to-emerald-400/20 opacity-80" />
        
        {/* Geometric Vector Mark */}
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 relative z-10"
        >
          {/* Main "A" Frame */}
          <path
            d="M50 20L25 78H36.5L50 45L63.5 78H75L50 20Z"
            fill="#FFFFFF"
          />
          {/* Floating Cyan Prism Crossbeam */}
          <path
            d="M37 57H63L59 48H41L37 57Z"
            fill="url(#logoCyanGrad)"
          />
          {/* Sparkle Glint (Top Right) */}
          <circle cx="74" cy="24" r="5" fill="#10B981" />
          <path
            d="M74 15L75.5 22.5L83 24L75.5 25.5L74 33L72.5 25.5L65 24L72.5 22.5Z"
            fill="#00F2FE"
          />
          <circle cx="74" cy="24" r="2" fill="#FFFFFF" />

          <defs>
            <linearGradient id="logoCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#00F2FE" />
              <stop offset="100%" stop-color="#0080FF" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Typography Wordmark */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`font-black text-xl tracking-tight transition-colors ${
              isDark ? "text-white" : "text-slate-900 group-hover:text-cyan-700"
            }`}
          >
            AURA
          </span>
          <span className="font-semibold text-xl tracking-tight bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
            Clean
          </span>
        </div>

        {showTagline ? (
          <div className="flex items-center gap-1.5 mt-1 text-[10px] font-bold tracking-widest uppercase">
            <span className={isDark ? "text-slate-400" : "text-slate-500"}>
              Bern
            </span>
            <span className="w-1 h-1 rounded-full bg-cyan-500" />
            <span className={isDark ? "text-slate-400" : "text-slate-500"}>
              Swiss Precision
            </span>
            {/* Miniature Swiss Cross */}
            <span className="inline-flex items-center justify-center w-3 h-3 rounded-[2px] bg-red-600 text-white font-black text-[9px] leading-none ml-0.5">
              +
            </span>
          </div>
        ) : (
          <span className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase mt-0.5">
            Bern • 100% Garantie
          </span>
        )}
      </div>
    </Link>
  );
}
