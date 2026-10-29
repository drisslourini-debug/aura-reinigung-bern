"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, CheckCircle2, Calculator, Star, Sparkles } from "lucide-react";
import { HeroCanvas } from "@/components/home/HeroCanvas";
import { SITE_CONFIG } from "@/config/site.config";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-36 lg:pb-28 overflow-hidden bg-ambient-glow">
      {/* Interactive WebGL / Canvas Clean-Sweep Background */}
      <HeroCanvas />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
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
              Makellos sauber. <br />
              <span className="bg-gradient-to-r from-slate-950 via-cyan-800 to-cyan-600 bg-clip-text text-transparent">
                Punktgenau abgenommen.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-2xl mx-auto lg:mx-0 text-base sm:text-xl text-slate-600 font-normal leading-relaxed">
              Der moderne Reinigungsservice für Wohnungen, Liegenschaften und Hauswartungen
              in Bern & Agglomeration. Mit persönlicher Übergabebegleitung und Fixpreisgarantie.
            </p>

            {/* Action CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
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
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto lg:mx-0 text-left">
              <div className="glass-panel p-3 rounded-2xl flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-slate-900">100% Garantie</div>
                  <div className="text-slate-500 text-[10px]">Inkl. Übergabe</div>
                </div>
              </div>

              <div className="glass-panel p-3 rounded-2xl flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-slate-900">Fixpreis</div>
                  <div className="text-slate-500 text-[10px]">Keine Nebenkosten</div>
                </div>
              </div>

              <div className="glass-panel p-3 rounded-2xl flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Star className="w-3.5 h-3.5 text-blue-500" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-slate-900">CHF 5 Mio.</div>
                  <div className="text-slate-500 text-[10px]">Haftpflicht</div>
                </div>
              </div>

              <div className="glass-panel p-3 rounded-2xl flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-slate-600" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-slate-900">GAV-Standard</div>
                  <div className="text-slate-500 text-[10px]">Schweizer Personal</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Hero Showcase Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative ambient blur */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-400/20 via-emerald-400/20 to-blue-500/20 rounded-3xl blur-2xl -z-10" />

              <div className="glass-panel rounded-3xl overflow-hidden border border-white/80 shadow-2xl p-3 bg-white/70">
                <div className="relative h-[360px] sm:h-[440px] w-full rounded-2xl overflow-hidden shadow-inner">
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
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold shadow-md">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                      <span>Surgical Cleanliness Standard</span>
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/90 backdrop-blur-md border border-white/40 shadow-lg text-slate-900 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        Wohnungsabnahme Bern
                      </div>
                      <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        100% mängelfreies Übergabeprotokoll
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-cyan-600 bg-cyan-50 px-2.5 py-1 rounded-lg">
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
