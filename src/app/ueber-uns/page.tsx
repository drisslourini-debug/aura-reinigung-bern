import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, HeartHandshake, Award, Users, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/config/site.config";

export const metadata: Metadata = {
  title: "Über uns | AURA Clean Bern – Der Schweizer Familienbetrieb",
  description: "Lernen Sie die Geschichte und Werte von AURA Clean Bern kennen. Geschwisterbetrieb mit Fokus auf Qualität, Vertrauen und faire Arbeitsbedingungen.",
};

export default function UeberUnsPage() {
  return (
    <div className="pt-32 pb-24 bg-ambient-glow min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold uppercase tracking-wider">
            <span>Familienbetrieb Bern</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Persönlich. Gründlich. Verlässlich.
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Gegründet als eingespielter Geschwisterbetrieb in Bern, stehen wir für
            Schweizer Handwerksstolz, Handschlagqualität und das gute Gefühl, die
            Schlüssel in vertrauensvolle Hände zu geben.
          </p>
        </div>

        {/* Story Section */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-200/80 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Unsere Geschichte & Mission
          </h2>
          <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            <p>
              In der Reinigungsbranche dominieren oft anonyme Vermittlungsplattformen,
              ständiger Personalwechsel und undurchsichtige Preismodelle. Wir wollten
              beweisen, dass es anders geht: mit persönlicher Ansprechbarkeit,
              hochwertigem Schweizer Standard und einer 100% verlässlichen Abnahmegarantie.
            </p>
            <p>
              Als Geschwister teilen wir dieselben Werte: Sorgfalt, Diskretion und Respekt vor
              dem Eigentum unserer Kundinnen und Kunden. Egal ob es sich um eine charmante
              Altbauwohnung im Berner Kirchenfeld, ein Einfamilienhaus in Muri oder ein
              ganzes Mehrfamilienhaus in Köniz handelt – wir behandeln jedes Objekt, als wäre es unser eigenes.
            </p>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-slate-200/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Schweizer Präzision</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Wir arbeiten mit professionellen Reinigungssystemen, säurefreien Entkalkern und
              hochwirksamer Mikrofaser-Technologie für makellosen Glanz ohne Materialschäden.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-200/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Faire Schweizer Löhne</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              100% angemeldetes, sozialversichertes Personal nach Gesamtarbeitsvertrag (GAV).
              Zufriedene Mitarbeiter sind die Voraussetzung für erstklassige Qualität.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-200/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Volle Sicherheit</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Umfassend haftpflichtversichert bis CHF 5 Millionen. Sie übergeben uns Ihre
              Räumlichkeiten mit absolutem Seelenfrieden.
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center pt-8">
          <Link
            href="/offerte-anfragen"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-slate-900 hover:bg-cyan-600 text-white font-bold text-sm shadow-md transition-colors"
          >
            <span>Jetzt unverbindliche Offerte starten</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
