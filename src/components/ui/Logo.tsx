import React from "react";
import Link from "next/link";
import { SITE_CONFIG } from "@/config/site.config";

interface LogoProps {
  className?: string;
  showTagline?: boolean;
}

export function Logo({ className = "", showTagline = false }: LogoProps) {
  return (
    <Link href="/" className={`inline-flex items-center gap-3 group ${className}`}>
      <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 to-slate-800 flex items-center justify-center shadow-md border border-slate-700/30 overflow-hidden group-hover:scale-105 transition-transform duration-300">
        {/* Subtle internal aura shine */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-transparent to-emerald-400/20 opacity-80" />
        
        {/* Geometric Prism Monogram */}
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-white relative z-10"
        >
          {/* Stylized A letter with clean precision angles */}
          <path
            d="M20 7L10 29H14.5L16.8 24H23.2L25.5 29H30L20 7Z"
            fill="currentColor"
            fillOpacity="0.95"
          />
          {/* Horizontal cross beam with sparkling cyan accent */}
          <path
            d="M17.8 21.5H22.2L20 16.2L17.8 21.5Z"
            fill="#00D2FF"
          />
          {/* Pure light clean spark */}
          <circle cx="28" cy="11" r="1.5" fill="#10B981" />
        </svg>
      </div>

      <div className="flex flex-col">
        <span className="font-bold text-lg tracking-tight text-slate-900 leading-none group-hover:text-cyan-600 transition-colors">
          {SITE_CONFIG.brand.shortName}
          <span className="text-cyan-500 ml-1 text-sm font-semibold tracking-normal">Bern</span>
        </span>
        {showTagline && (
          <span className="text-[10px] text-slate-500 tracking-wider uppercase font-medium mt-1">
            Swiss Precision Clean
          </span>
        )}
      </div>
    </Link>
  );
}
