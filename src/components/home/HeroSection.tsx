"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, CheckCircle2, Calculator, Star, Sparkles } from "lucide-react";
import { HeroCanvas } from "@/components/home/HeroCanvas";
import { SITE_CONFIG } from "@/config/site.config";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-ambient-glow">
      {/* Interactive WebGL / Canvas Clean-Sweep Background */}
      <HeroCanvas />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Trust Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-slate-200/80 shadow-sm backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-slate-800">
              Schweizer Familienbetrieb im Raum Bern
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-xs font-bold text-cyan-600 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% Abnahmegarantie
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.08]">
            Makellos sauber. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-slate-950 via-cyan-800 to-cyan-600 bg-clip-text text-transparent">
              Punktgenau abgenommen.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-base sm:text-xl text-slate-600 font-normal leading-relaxed">
            Der moderne Reinigungsservice für Wohnungen, Liegenschaften und Hauswartungen
            in Bern & Agglomeration. Mit persönlicher Übergabebegleitung und Fixpreisgarantie.
          </p>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#rechner"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-slate-900 hover:bg-cyan-600 text-white font-bold text-base shadow-xl shadow-slate-900/10 hover:shadow-cyan-500/25 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <Calculator className="w-5 h-5 text-cyan-400" />
              <span>Fixpreis online berechnen</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>

            <Link
              href="/dienstleistungen"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/80 hover:bg-white text-slate-800 font-semibold text-base border border-slate-200/80 shadow-sm transition-all duration-200 hover:border-slate-300"
            >
              <span>Alle Services entdecken</span>
            </Link>
          </div>

          {/* Trust Pillars */}
          <div className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
            <div className="glass-panel p-3.5 rounded-2xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-slate-900">100% Garantie</div>
                <div className="text-slate-500 text-[11px]">Inkl. Übergabe</div>
              </div>
            </div>

            <div className="glass-panel p-3.5 rounded-2xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-slate-900">Fixpreis</div>
                <div className="text-slate-500 text-[11px]">Keine Nebenkosten</div>
              </div>
            </div>

            <div className="glass-panel p-3.5 rounded-2xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Star className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-slate-900">CHF 5 Mio.</div>
                <div className="text-slate-500 text-[11px]">Haftpflichtdeckung</div>
              </div>
            </div>

            <div className="glass-panel p-3.5 rounded-2xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-slate-600" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-slate-900">GAV-Standard</div>
                <div className="text-slate-500 text-[11px]">Faire Schweizer Löhne</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
