"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calculator,
  Phone,
  FileCheck,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site.config";

export function HeroSection() {
  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28 overflow-hidden bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Content Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Swiss Federal Trust Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 shadow-sm text-xs">
              <span className="w-4 h-4 rounded-sm bg-red-600 text-white flex items-center justify-center font-black text-[10px] leading-none shrink-0">
                +
              </span>
              <span className="font-semibold text-slate-900">
                Schweizer Familienbetrieb im Raum Bern
              </span>
              <span className="text-slate-300">|</span>
              <span className="font-semibold text-emerald-700 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                100% Abnahmegarantie
              </span>
            </div>

            {/* Editorial Swiss Headline (No artificial gradient text) */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 leading-[1.12]">
              Ihre Wohnungsabgabe in Bern. <br />
              <span className="text-slate-700 font-extrabold">
                Garantiert mängelfrei abgenommen.
              </span>
            </h1>

            {/* Authoritative Swiss Body Text */}
            <p className="max-w-2xl mx-auto lg:mx-0 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
              Wir reinigen nach den offiziellen Richtlinien des Schweizerischen
              Mieterinnen- und Mieterverbands (MV Bern) und des Hauseigentümerverbands (HEV).
              Unser Berner Geschwisterteam steht bei der Abnahme physisch neben Ihnen und der Verwaltung.
            </p>

            {/* Real Handover Facts & Verifications */}
            <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs text-slate-700 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Persönliche Begleitung bei der Übergabe</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Kostenlose Nachreinigung vor Ort</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>GAV-konform & Haftpflicht CHF 5 Mio.</span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <Link
                href="#rechner"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm sm:text-base shadow-sm transition-all duration-150 active:scale-98"
              >
                <Calculator className="w-4 h-4 text-white" />
                <span>Fixpreis online berechnen</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>

              <a
                href={`tel:${SITE_CONFIG.contact.phone}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-semibold text-sm sm:text-base border border-slate-300 shadow-sm transition-colors active:scale-98"
              >
                <Phone className="w-4 h-4 text-slate-600" />
                <span>{SITE_CONFIG.contact.phoneDisplay}</span>
              </a>
            </div>

            {/* Genuine Service Commitments */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-1 text-xs text-slate-600">
              <span className="font-semibold text-slate-800 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                100% Abnahmegarantie
              </span>
              <span className="text-slate-300">•</span>
              <span>Verbindliche Fixpreis-Offerte</span>
              <span className="text-slate-300">•</span>
              <span>Persönlich geführtes Berner Team</span>
            </div>
          </div>

          {/* Right Visual Column: Grounded Editorial Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-white p-2">
                <div className="relative h-[280px] sm:h-[400px] lg:h-[440px] w-full rounded-xl overflow-hidden">
                  <Image
                    src="/images/hero-clean.jpg"
                    alt="Abnahmebereite Schweizer Küche in Bern nach professioneller Endreinigung"
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />

                  {/* Top Verified Quality Stamp */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/95 text-slate-900 text-xs font-bold shadow border border-slate-200">
                      <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>MV & HEV Bern Konform</span>
                    </span>
                  </div>

                  {/* Bottom Caption Card */}
                  <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-lg bg-slate-950/90 text-white backdrop-blur-md border border-white/10 shadow-lg">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-white">
                          Abnahmefertige Endreinigung
                        </div>
                        <div className="text-[11px] text-slate-300 mt-0.5">
                          Küche, Sanitär, Fenster & Storen nach MV & HEV Richtlinien
                        </div>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-700/60 shrink-0">
                        Abgabe-Standard
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Swiss Handover Quality Standards */}
              <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[10px] font-semibold text-slate-600">
                <div className="py-1.5 px-2 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span>MV & HEV Standard</span>
                </div>
                <div className="py-1.5 px-2 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span>Inkl. Storen & Fenster</span>
                </div>
                <div className="py-1.5 px-2 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span>Kostenlose Nachreinigung</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
