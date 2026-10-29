import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, ShieldCheck, Users, Award, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/config/site.config";

export const metadata = {
  title: "Über uns | AURA Clean Bern – Geschwisterbetrieb",
  description:
    "Lernen Sie das Gründerteam von AURA Clean Bern kennen: Lokaler Schweizer Familienbetrieb, GAV-konform, faire Löhne und persönliche Begleitung bei der Wohnungsabgabe.",
};

export default function UeberUnsPage() {
  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-slate-800 text-xs font-semibold uppercase tracking-wider shadow-sm">
            <span className="w-2 h-2 rounded-full bg-red-600 inline-block" />
            <span>Familienbetrieb Bern</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            Persönlich. Gründlich. Verlässlich.
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Gegründet als eingespielter Geschwisterbetrieb in Bern, stehen wir für
            Schweizer Handwerksstolz, Handschlagqualität und das gute Gefühl, die
            Schlüssel in vertrauensvolle Hände zu geben.
          </p>
        </div>

        {/* Team Founders Portrait & Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 relative">
            <div className="bg-white p-3 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
              <div className="relative h-[420px] w-full rounded-xl overflow-hidden">
                <Image
                  src="/images/team-founders.jpg"
                  alt="Geschwister-Gründerteam von AURA Clean Bern"
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white p-3.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-white/10">
                  <div className="text-xs font-bold">Die Gründer von AURA Clean Bern</div>
                  <div className="text-[11px] text-slate-300">Geschwisterbetrieb Bern • Persönlich vor Ort</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
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

            <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>GAV-angemeldetes Team & Schweizer Qualitätsstandard</span>
            </div>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Schweizer Präzision</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Wir arbeiten mit professionellen Reinigungssystemen, säurefreien Entkalkern und
              hochwirksamer Mikrofaser-Technologie für makellosen Glanz ohne Materialschäden.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Faire Schweizer Löhne</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              100% angemeldetes, sozialversichertes Personal nach Gesamtarbeitsvertrag (GAV).
              Zufriedene Mitarbeiter sind die Voraussetzung für erstklassige Qualität.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-slate-900" />
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
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-colors active:scale-98"
          >
            <span>Jetzt unverbindliche Offerte starten</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
