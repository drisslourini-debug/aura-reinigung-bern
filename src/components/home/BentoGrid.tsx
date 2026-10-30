"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  Sun,
  Briefcase,
  Home,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site.config";

export function BentoGrid() {
  return (
    <section id="dienstleistungen" className="py-24 relative bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-slate-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-red-600 inline-block" />
            <span>Dienstleistungen • Region Bern & Agglomeration</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
            Präzise Reinigungen nach Schweizer Qualitätsstandards.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Von der abnahmegarantierte Endreinigung mit persönlicher Übergabebegleitung bis zur verlässlichen Pflege von Mehrfamilienhäusern und Geschäftsräumen.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Main Highlight - Umzugsreinigung (Spans 2 cols on lg) */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between">
            <div>
              {/* Crisp Dedicated Photo Window */}
              <div className="relative h-56 sm:h-72 w-full rounded-xl overflow-hidden mb-6 border border-slate-100">
                <Image
                  src="/images/service-umzug.jpg"
                  alt="Umzugsreinigung Bern mit 100% Abnahmegarantie"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 text-white backdrop-blur-sm text-xs font-bold shadow-md">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>100% Abnahmegarantie inklusive</span>
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10">
                  <span className="px-3 py-1 rounded-lg bg-white/95 text-slate-900 font-bold text-xs shadow-md">
                    Ab CHF 590.– Fixpreis
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Hauptdienstleistung • Wohnungsübergabe
                </span>
                <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-semibold border border-emerald-200">
                  MV & HEV Bern Standard
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Umzugsreinigung mit persönlicher Übergabebegleitung
              </h3>
              <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                Wir sind während der Wohnungsabgabe physisch an Ihrer Seite. Sollte die Verwaltung oder der Eigentümer Beanstandungen haben, reinigen wir sofort vor Ort kostenlos nach – bis das Abnahmeprotokoll mängelfrei unterzeichnet ist.
              </p>

              {/* Feature Bullets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-800 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Küche inkl. V-ZUG/Miele Backofen & Dunstabzug</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-800 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Nasszellen-Entkalkung & Fugen nach HEV-Norm</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-800 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Fenster, Rahmen, Simse & Lamellenstoren</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-800 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Keller, Estrich, Balkon & Briefkasten</span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-6 border-t border-slate-100">
              <Link
                href="/dienstleistungen/umzugsreinigung"
                className="inline-flex items-center justify-center sm:justify-start gap-1.5 text-sm font-bold text-slate-900 hover:text-slate-700 transition-colors py-2"
              >
                <span>Alle Details zur Umzugsreinigung</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/offerte-anfragen?service=umzug"
                className="text-center px-6 py-3 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-sm active:scale-98"
              >
                Fixpreis-Offerte berechnen
              </Link>
            </div>
          </div>

          {/* Card 2: Hauswartung & Liegenschaften */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between">
            <div>
              <div className="relative h-44 w-full rounded-xl overflow-hidden mb-5 border border-slate-100">
                <Image
                  src="/images/service-hauswartung.jpg"
                  alt="Liegenschaftsservice und Hauswartung Bern"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-900/90 text-white text-[11px] font-bold backdrop-blur-sm">
                    Liegenschaften & MFH
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  MFH & STWEG
                </span>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Kapazitäten frei
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                Hauswartung & Treppenhaus
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Treppenhausreinigung, Waschküchenhygiene, Kehrichtbereitstellung und Umgebungspflege für Berner Liegenschaften.
              </p>

              <ul className="mt-4 space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                  <span>Wöchentlicher oder 14-täglicher Turnus</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                  <span>Container- & Kehrichtbereitstellung</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                  <span>Liegenschaftskontrolle & Meldewesen</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <Link
                href="/dienstleistungen/hauswartung-treppenhaus"
                className="inline-flex items-center justify-between w-full text-xs font-bold text-slate-900 hover:text-slate-700 transition-colors py-1"
              >
                <span>Hauswartungs-Angebot anfordern</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 3: Unterhaltsreinigung */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between">
            <div>
              <div className="relative h-44 w-full rounded-xl overflow-hidden mb-5 border border-slate-100">
                <Image
                  src="/images/service-unterhalt.jpg"
                  alt="Unterhaltsreinigung Wohnungen Bern"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-900/90 text-white text-[11px] font-bold backdrop-blur-sm">
                    Privathaushalte
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 z-10">
                  <span className="px-2.5 py-1 rounded-md bg-white/95 text-slate-900 font-bold text-[11px] shadow">
                    Ab CHF 38.– / Std.
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Abo & Einzelbuchung
                </span>
                <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                  GAV & versichert
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                Unterhaltsreinigung
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Regelmässige Sauberkeit für Ihre Privatwohnung. Feste, vertraute Reinigungskraft mit GAV-Anstellung und versichertem Schlüsselservice.
              </p>

              <ul className="mt-4 space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                  <span>Staubwischen, Böden saugen & nass wischen</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                  <span>Hygienische Reinigung von Küche & Bad</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <Link
                href="/dienstleistungen/unterhaltsreinigung"
                className="inline-flex items-center justify-between w-full text-xs font-bold text-slate-900 hover:text-slate-700 transition-colors py-1"
              >
                <span>Abo-Optionen ansehen</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 4: Fenster & Storen */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between">
            <div>
              <div className="relative h-44 w-full rounded-xl overflow-hidden mb-5 border border-slate-100">
                <Image
                  src="/images/service-fenster.jpg"
                  alt="Fenster- und Storenreinigung Bern"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-900/90 text-white text-[11px] font-bold backdrop-blur-sm">
                    Glas & Fassade
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 z-10">
                  <span className="px-2.5 py-1 rounded-md bg-white/95 text-slate-900 font-bold text-[11px] shadow">
                    Ab CHF 190.–
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Streifenfrei
                </span>
                <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                  Osmose-Reinwasser
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                Fenster- & Storenreinigung
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Streifenfreie Sicht durch modernes Reinwasser-System. Inklusive Fensterrahmen, Falzen, Fensterbänken und Lamellenstoren.
              </p>

              <ul className="mt-4 space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                  <span>Fenster innen und aussen streifenfrei</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                  <span>Lamellenstoren & Rollläden beidseitig</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <Link
                href="/dienstleistungen/fenster-storen"
                className="inline-flex items-center justify-between w-full text-xs font-bold text-slate-900 hover:text-slate-700 transition-colors py-1"
              >
                <span>Fensterservice entdecken</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 5: Büro & Gewerbe */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between">
            <div>
              <div className="relative h-44 w-full rounded-xl overflow-hidden mb-5 border border-slate-100">
                <Image
                  src="/images/service-gewerbe.jpg"
                  alt="Büro- und Praxisreinigung Bern"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-900/90 text-white text-[11px] font-bold backdrop-blur-sm">
                    Gewerbe & Praxen
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  B2B Firmenkunden
                </span>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Ausserhalb Bürozeiten
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                Büro- & Praxisreinigung
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Repräsentative Sauberkeit und Hygiene nach Plan für Kanzleien, Praxen und Agenturen im Raum Bern. Diskret und zuverlässig.
              </p>

              <ul className="mt-4 space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                  <span>Arbeitsplätze, Besprechungsräume & Teeküchen</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                  <span>Schlüsselprotokoll & Alarmcode-Verwaltung</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <Link
                href="/dienstleistungen/gewerbe-buero"
                className="inline-flex items-center justify-between w-full text-xs font-bold text-slate-900 hover:text-slate-700 transition-colors py-1"
              >
                <span>Gewerbliche Offerte anfordern</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 6: Baureinigung & Baufeinreinigung (Spans 2 cols on lg) */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between">
            <div>
              <div className="relative h-52 sm:h-60 w-full rounded-xl overflow-hidden mb-5 border border-slate-100">
                <Image
                  src="/images/service-baureinigung.jpg"
                  alt="Baureinigung und Baufeinreinigung Kanton Bern"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-3 py-1.5 rounded-lg bg-slate-900/90 text-white text-xs font-bold backdrop-blur-sm">
                    Neubau, Umbau & Sanierung
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 z-10">
                  <span className="px-3 py-1 rounded-md bg-white/95 text-slate-900 font-bold text-xs shadow-md">
                    Ab CHF 650.– Fixpreis
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Bauherren, Architekten & Eigentümer
                </span>
                <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-semibold border border-emerald-200">
                  Bezugsfertige Übergabe
                </span>
              </div>

              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                Baureinigung & bezugsfertige Baufeinreinigung
              </h3>
              <p className="mt-2 text-slate-600 text-sm leading-relaxed">
                Professionelle Baugrobreinigung während der Bauphase sowie minutengenaue Baufeinreinigung vor der Schlüsselübergabe. Beseitigung von Zementschleiern, Farbenspritzern, Feinstaub und Schutzfolien.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-5 pt-4 border-t border-slate-100 text-xs text-slate-700 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Zementschleier- & Mörtelentfernung auf Feinsteinzeug</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Glas- & Fensterreinigung inkl. Kleberesten</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-5 border-t border-slate-100">
              <Link
                href="/dienstleistungen/baureinigung"
                className="inline-flex items-center justify-center sm:justify-start gap-1.5 text-xs font-bold text-slate-900 hover:text-slate-700 transition-colors py-1"
              >
                <span>Details zur Baureinigung ansehen</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/offerte-anfragen?service=baureinigung"
                className="text-center px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-sm active:scale-98"
              >
                Bau-Offerte berechnen
              </Link>
            </div>
          </div>

          {/* Card 7: Individuelle Spezialprojekte & Beratung (1 col on lg) */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-7 border border-slate-800 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="w-6 h-6 rounded-md bg-red-600 text-white flex items-center justify-center font-black text-xs leading-none">
                  +
                </span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  Kanton Bern
                </span>
              </div>

              <h3 className="text-xl font-bold tracking-tight text-white mb-2">
                Individuelle Projekte & Spezialreinigungen
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                Haben Sie ein spezielles Objekt, eine Räumung, mehrere Liegenschaften oder kurzfristigen Notfall-Bedarf?
              </p>

              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-200 space-y-1.5">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Geschwister-Direktberatung</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Antwort & Terminabsprache werktags innerhalb von 2 Stunden.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 space-y-2">
              <Link
                href="/kontakt"
                className="block text-center py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs transition-colors"
              >
                Kontakt aufnehmen
              </Link>
              <a
                href={`https://wa.me/${SITE_CONFIG.contact.whatsapp.replace("+", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors"
              >
                WhatsApp Direktchat
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
