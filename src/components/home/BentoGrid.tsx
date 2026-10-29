"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  Building2,
  Sun,
  Briefcase,
  Home,
  Wrench,
  ShieldCheck,
  ArrowUpRight,
  CheckCircle,
} from "lucide-react";

export function BentoGrid() {
  return (
    <section id="dienstleistungen" className="py-24 relative bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-4">
            <span>Portfolio</span>
            <span className="w-1 h-1 rounded-full bg-slate-400" />
            <span>Kanton Bern</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Präzision für jedes Objekt.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Von der minutiösen Endreinigung mit Begleitung bis zur ganzheitlichen
            Hauswartung für anspruchsvolle Liegenschaften.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Main Highlight - Umzugsreinigung (Spans 2 cols on lg) */}
          <div className="lg:col-span-2 glass-panel rounded-3xl p-8 sm:p-10 relative overflow-hidden group hover:border-cyan-300 transition-all duration-300">
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-cyan-100/60 via-emerald-50/30 to-transparent rounded-full blur-3xl -z-10 group-hover:scale-110 transition-transform duration-500" />

            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-xs font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                100% Abnahmegarantie
              </span>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Flaggschiff-Service
              </span>
            </div>

            <div className="max-w-xl">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Umzugsreinigung mit persönlicher Übergabebegleitung
              </h3>
              <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                Wir stehen während der Wohnungsabnahme physisch neben der Verwaltung.
                Sollte die Verwaltung auch nur ein Staubkorn beanstanden, reinigen wir
                sofort vor Ort kostenlos nach – bis das Protokoll unterschrieben ist.
              </p>
            </div>

            {/* Feature Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8 pt-6 border-t border-slate-200/70">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Küche inkl. Backofen, Steamer & Dunstabzug</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Nasszellen-Tiefenentkalkung & Fugen</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Fenster, Rahmen & Lamellenstoren</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Keller, Estrich & Balkon inklusive</span>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <Link
                href="/dienstleistungen/umzugsreinigung"
                className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-cyan-600 transition-colors"
              >
                <span>Alle Details zur Umzugsreinigung</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/offerte-anfragen?service=umzug"
                className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-cyan-600 transition-colors"
              >
                Offerte kalkulieren
              </Link>
            </div>
          </div>

          {/* Card 2: Hauswartung & Liegenschaften */}
          <div className="glass-panel rounded-3xl p-8 relative overflow-hidden group hover:border-cyan-300 transition-all duration-300 flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-100/40 rounded-full blur-2xl -z-10" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-cyan-400" />
                </div>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Freie Liegenschafts-Slots
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                Liegenschaftsservice & Hauswartung
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Treppenhäuser, Waschküchenhygiene, Umgebungsarbeiten und technische
                Kontrollen für Berner Verwaltungen und Stockwerkeigentümer.
              </p>

              <ul className="mt-4 space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                  <span>Wöchentlicher / 14-täglicher Turnus</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                  <span>Container- & Kehrichtbereitstellung</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                  <span>Winterdienst & Schneeräumung</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200/60">
              <Link
                href="/dienstleistungen/hauswartung-treppenhaus"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-cyan-600 transition-colors"
              >
                <span>Hauswartungs-Angebot anfordern</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 3: Unterhaltsreinigung */}
          <div className="glass-panel rounded-3xl p-8 relative overflow-hidden group hover:border-cyan-300 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-4">
                <Home className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                Unterhaltsreinigung
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Regelmässige Sauberkeit für Ihre Privatwohnung. Feste, vertraute
                Reinigungskraft mit GAV-Anstellung und versichertem Schlüsselservice.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200/60">
              <Link
                href="/dienstleistungen/unterhaltsreinigung"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-cyan-600 transition-colors"
              >
                <span>Abo-Optionen ansehen</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 4: Fenster & Storen */}
          <div className="glass-panel rounded-3xl p-8 relative overflow-hidden group hover:border-cyan-300 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-4">
                <Sun className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                Fenster- & Storenreinigung
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Streifenfreie Sicht durch modernes Reinwasser-Osmosesystem. Inklusive
                Rahmenfalze, Simse und Lamellenstoren bis in hohe Stockwerke.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200/60">
              <Link
                href="/dienstleistungen/fenster-storen"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-cyan-600 transition-colors"
              >
                <span>Fensterservice entdecken</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 5: Büro & Gewerbe */}
          <div className="glass-panel rounded-3xl p-8 relative overflow-hidden group hover:border-cyan-300 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center mb-4">
                <Briefcase className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                Büro- & Praxisreinigung
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Repräsentative Sauberkeit und Desinfektion für Kanzleien, Praxen und
                Büros in Bern. Durchführung ausserhalb Ihrer Geschäftszeiten.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200/60">
              <Link
                href="/dienstleistungen/gewerbe-buero"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-cyan-600 transition-colors"
              >
                <span>Gewerbliche Offerte</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
