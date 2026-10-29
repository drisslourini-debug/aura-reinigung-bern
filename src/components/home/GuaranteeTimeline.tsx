"use client";

import React from "react";
import Image from "next/image";
import { ShieldCheck, FileCheck, Sparkles, UserCheck } from "lucide-react";

export function GuaranteeTimeline() {
  const steps = [
    {
      step: "01",
      title: "Transparenter Fixpreis-Audit",
      desc: "Keine versteckten Kosten für Anfahrt oder Reinigungsmittel. Wir berechnen auf Basis Ihrer Wohnungsdaten eine verbindliche Pauschale, auf die Sie sich zu 100% verlassen können.",
      icon: FileCheck,
      color: "text-cyan-500",
      bg: "bg-cyan-50",
    },
    {
      step: "02",
      title: "Chirurgischer Tiefenreinigungs-Zyklus",
      desc: "Unser eingespieltes Team rückt mit Profi-Ausrüstung an. Backofen, Steamer, Filter, Dichtungen, fugentiefe Nasszellen-Entkalkung und Lamellenstoren werden minutiös gereinigt.",
      icon: Sparkles,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
    },
    {
      step: "03",
      title: "Die begleitete Abnahme & Garantie",
      desc: "Am Tag der Übergabe stehen wir physisch neben Ihnen und der Verwaltung. Erst wenn der Vermieter das Abnahmeprotokoll mängelfrei unterzeichnet hat, ist unsere Arbeit getan.",
      icon: UserCheck,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
  ];

  return (
    <section id="garantie" className="py-24 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          {/* Official 3D Guarantee Seal */}
          <div className="w-20 h-20 mx-auto relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 hover:scale-105 transition-transform duration-300">
            <Image
              src="/images/logo-badge-3d.jpg"
              alt="AURA Clean Bern 100% Schweizer Abnahmegarantie Siegel"
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Das AURA Sicherheitsversprechen</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Das 3-Stufen Garantie-Protokoll
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Wohnungsabgaben in der Schweiz können nervenaufreibend sein. Mit unserem
            Protokoll geben Sie die Verantwortung komplett an uns ab.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="glass-panel rounded-3xl p-8 relative flex flex-col justify-between hover:shadow-xl transition-all duration-300 border-t-4 border-t-cyan-500"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-slate-300 font-mono">
                      {s.step}
                    </span>
                    <div className={`w-12 h-12 rounded-2xl ${s.bg} flex items-center justify-center`}>
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

                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-emerald-600">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>100% Abnahmegarantie Schweiz</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
