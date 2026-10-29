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
    <Link href="/" className={`inline-flex items-center gap-3 group select-none ${className}`}>
      {/* Precision Swiss Monogram Icon */}
      <div className="relative w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center shadow-sm border border-slate-800 shrink-0 group-hover:scale-105 transition-transform duration-200">
        {/* Geometric Vector Mark */}
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 relative z-10"
        >
          {/* Main "A" Frame */}
          <path
            d="M50 18L24 82H37L50 48L63 82H76L50 18Z"
            fill="#FFFFFF"
          />
          {/* Solid Precision Crossbeam */}
          <path
            d="M38 58H62L59 50H41L38 58Z"
            fill="#E2E8F0"
          />
          {/* Swiss Precision Red Cross Accent */}
          <rect x="68" y="18" width="14" height="14" rx="2" fill="#DC2626" />
          <path d="M75 21V29M71 25H79" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="square" />
        </svg>
      </div>

      {/* Typography Wordmark - Authentic Swiss Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`font-black text-xl tracking-tight transition-colors ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            AURA
          </span>
          <span
            className={`font-bold text-xl tracking-tight ${
              isDark ? "text-slate-300" : "text-slate-700"
            }`}
          >
            Clean
          </span>
        </div>

        {showTagline ? (
          <div className="flex items-center gap-1.5 mt-1 text-[10px] font-bold tracking-widest uppercase">
            <span className={isDark ? "text-slate-400" : "text-slate-500"}>
              Bern
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-400" />
            <span className={isDark ? "text-slate-400" : "text-slate-500"}>
              Schweizer Präzision
            </span>
            <span className="inline-flex items-center justify-center w-3 h-3 rounded-[2px] bg-red-600 text-white font-black text-[9px] leading-none ml-0.5">
              +
            </span>
          </div>
        ) : (
          <span className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase mt-0.5 flex items-center gap-1">
            <span>Bern • 100% Garantie</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-600" />
          </span>
        )}
      </div>
    </Link>
  );
}
