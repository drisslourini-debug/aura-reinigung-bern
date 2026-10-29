"use client";

import React from "react";
import Image from "next/image";
import { ShieldCheck, FileCheck, CheckCircle2, UserCheck } from "lucide-react";

export function GuaranteeTimeline() {
  const steps = [
    {
      step: "01",
      title: "Verbindliche Fixpreis-Offerte",
      desc: "Keine versteckten Kosten für Anfahrt oder Reinigungsmittel. Wir berechnen auf Basis Ihrer Wohnungsdaten eine transparente Pauschale, auf die Sie sich zu 100% verlassen können.",
      icon: FileCheck,
      color: "text-slate-900",
      bg: "bg-slate-100",
    },
    {
      step: "02",
      title: "Gründliche Endreinigung",
      desc: "Unser eingespieltes Schweizer Team reinigt nach den offiziellen Richtlinien des Mieterinnen- und Mieterverbands (MV Bern). V-ZUG/Miele Backofen, Steamer, Filter, Nasszellen und Lamellenstoren werden geprüft gereinigt.",
      icon: CheckCircle2,
      color: "text-slate-900",
      bg: "bg-slate-100",
    },
    {
      step: "03",
      title: "Persönliche Übergabebegleitung",
      desc: "Am Tag der Abgabe stehen wir physisch neben Ihnen und der Verwaltung. Sollte eine Nachbesserung verlangt werden, reinigen wir sofort vor Ort kostenlos nach – bis das Abnahmeprotokoll mängelfrei unterzeichnet ist.",
      icon: UserCheck,
      color: "text-slate-900",
      bg: "bg-slate-100",
    },
  ];

  return (
    <section id="garantie" className="py-24 relative overflow-hidden bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          {/* Official 3D Guarantee Seal */}
          <div className="w-20 h-20 mx-auto relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 hover:scale-105 transition-transform duration-300">
            <Image
              src="/images/logo-badge-3d.jpg"
              alt="AURA Clean Bern 100% Schweizer Abnahmegarantie Siegel"
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-red-600 inline-block" />
            <span>Schweizer Qualitätsstandard • MV & HEV Bern</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
            In 3 Schritten zur garantierten Wohnungsabgabe
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Wohnungsabgaben im Kanton Bern erfordern höchste Gründlichkeit. Mit unserem praxiserprobten Ablauf übergeben Sie Ihre Wohnung entspannt und ohne Kautionsabzug.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-8 relative flex flex-col justify-between border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-slate-300 font-mono">
                      {s.step}
                    </span>
                    <div className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${s.color}`} />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {s.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-emerald-700">
                  <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>100% Abnahmegarantie inklusive</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
