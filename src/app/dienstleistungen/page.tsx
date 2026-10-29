import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/config/services.config";
import { ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Dienstleistungen & Services | AURA Clean Bern",
  description: "Entdecken Sie unser breites Reinigungsportfolio in Bern: Umzugsreinigungen mit Abnahmegarantie, Unterhaltsreinigungen, Hauswartungen, Fensterreinigung und Bauservice.",
};

export default function ServicesPage() {
  return (
    <div className="pt-32 pb-24 bg-ambient-glow min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200/80 text-cyan-800 text-xs font-semibold uppercase tracking-wider mb-4">
            <span>Komplettangebot Bern</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Unsere Reinigungs-Dienstleistungen
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Als Schweizer Familienbetrieb decken wir das gesamte Spektrum für Privathaushalte,
            Liegenschaftsverwaltungen und Gewerbe ab – verlässlich, diskret und mit Fixpreis.
          </p>
        </div>

        {/* Services List */}
        <div className="space-y-8">
          {SERVICES.map((s, idx) => (
            <div
              key={s.slug}
              className="glass-panel rounded-3xl p-8 sm:p-10 border border-slate-200/80 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-semibold">
                      {s.category}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200 text-xs font-bold">
                      {s.badge}
                    </span>
                    {s.popular && (
                      <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Sehr beliebt
                      </span>
                    )}
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {s.title}
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {s.headline} {s.shortDescription}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                    {s.usps.slice(0, 4).map((usp, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{usp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col gap-3 lg:items-end justify-center pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                  <Link
                    href={`/dienstleistungen/${s.slug}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-cyan-600 text-white font-bold text-xs sm:text-sm transition-colors shadow-sm"
                  >
                    <span>Leistungsumfang & Checkliste</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href={`/offerte-anfragen?service=${s.slug}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs sm:text-sm border border-slate-200 transition-colors"
                  >
                    <span>Offerte dafür berechnen</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
