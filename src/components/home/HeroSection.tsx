"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, CheckCircle2, Calculator, Star, Sparkles } from "lucide-react";
import { HeroCanvas } from "@/components/home/HeroCanvas";
import { SITE_CONFIG } from "@/config/site.config";

export function HeroSection() {
  return (
    <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-28 overflow-hidden bg-ambient-glow">
      {/* Interactive WebGL / Canvas Clean-Sweep Background */}
      <HeroCanvas />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/90 border border-slate-200/80 shadow-sm backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="text-[11px] sm:text-xs font-semibold text-slate-800">
                Schweizer Familienbetrieb Bern
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-[11px] sm:text-xs font-bold text-cyan-600 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                100% Garantie
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.12]">
              Makellos sauber. <br />
              <span className="bg-gradient-to-r from-slate-950 via-cyan-800 to-cyan-600 bg-clip-text text-transparent">
                Punktgenau abgenommen.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-2xl mx-auto lg:mx-0 text-sm sm:text-lg lg:text-xl text-slate-600 font-normal leading-relaxed">
              Der moderne Reinigungsservice für Wohnungen, Liegenschaften und Hauswartungen
              in Bern & Agglomeration. Mit persönlicher Übergabebegleitung und Fixpreisgarantie.
            </p>

            {/* Action CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <Link
                href="#rechner"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-slate-900 hover:bg-cyan-600 text-white font-bold text-sm sm:text-base shadow-xl shadow-slate-900/10 hover:shadow-cyan-500/25 transition-all duration-200 active:scale-98"
              >
                <Calculator className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                <span>Fixpreis online berechnen</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </Link>

              <Link
                href="/dienstleistungen"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-white/80 hover:bg-white text-slate-800 font-semibold text-sm sm:text-base border border-slate-200/80 shadow-sm transition-all duration-200 hover:border-slate-300 active:scale-98"
              >
                <span>Alle Services entdecken</span>
              </Link>
            </div>

            {/* Trust Pillars (2x2 on Mobile, 4 in row on Desktop) */}
            <div className="pt-4 sm:pt-6 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-2xl mx-auto lg:mx-0 text-left">
              <div className="glass-panel p-2.5 sm:p-3 rounded-xl sm:rounded-2xl flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-slate-900 text-[11px] sm:text-xs">100% Garantie</div>
                  <div className="text-slate-500 text-[9px] sm:text-[10px]">Inkl. Übergabe</div>
                </div>
              </div>

              <div className="glass-panel p-2.5 sm:p-3 rounded-xl sm:rounded-2xl flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-slate-900 text-[11px] sm:text-xs">Fixpreis</div>
                  <div className="text-slate-500 text-[9px] sm:text-[10px]">Keine Nebenkosten</div>
                </div>
              </div>

              <div className="glass-panel p-2.5 sm:p-3 rounded-xl sm:rounded-2xl flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Star className="w-3.5 h-3.5 text-blue-500" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-slate-900 text-[11px] sm:text-xs">CHF 5 Mio.</div>
                  <div className="text-slate-500 text-[9px] sm:text-[10px]">Haftpflicht</div>
                </div>
              </div>

              <div className="glass-panel p-2.5 sm:p-3 rounded-xl sm:rounded-2xl flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-slate-600" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-slate-900 text-[11px] sm:text-xs">GAV-Standard</div>
                  <div className="text-slate-500 text-[9px] sm:text-[10px]">Schweizer Personal</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Hero Showcase Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative ambient blur */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-400/20 via-emerald-400/20 to-blue-500/20 rounded-3xl blur-2xl -z-10" />

              <div className="glass-panel rounded-2xl sm:rounded-3xl overflow-hidden border border-white/80 shadow-2xl p-2.5 sm:p-3 bg-white/70">
                <div className="relative h-[260px] sm:h-[400px] lg:h-[440px] w-full rounded-xl sm:rounded-2xl overflow-hidden shadow-inner">
                  <Image
                    src="/images/hero-clean.jpg"
                    alt="Makellose Schweizer Wohnung in Bern nach professioneller Reinigung"
                    fill
                    priority
                    className="object-cover object-center hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                  {/* Floating Badges on the image */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white/90 backdrop-blur-md text-slate-900 text-[10px] sm:text-xs font-bold shadow-md">
                      <Sparkles className="w-3 h-3 text-cyan-500" />
                      <span>Surgical Clean Standard</span>
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3 sm:p-4 rounded-xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg text-slate-900 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        Wohnungsabnahme Bern
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        100% mängelfreies Übergabeprotokoll
                      </div>
                    </div>
                    <span className="text-[11px] font-mono font-bold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded-md">
                      Fixpreis
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
