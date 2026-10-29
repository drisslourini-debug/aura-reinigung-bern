import React from "react";
import { MapPin, CheckCircle2, Clock } from "lucide-react";
import { SITE_CONFIG } from "@/config/site.config";

export function RegionalCoverage() {
  return (
    <section className="py-20 relative bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-red-600 inline-block" />
              <span>Lokal verankert in Bern</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
              Ihr Reinigungspartner im gesamten Grossraum Bern.
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Als lokaler Geschwisterbetrieb kennen wir die spezifischen Anforderungen der
              Berner Liegenschaftsverwaltungen (z. B. Von Graffenried, Livit, Wincasa,
              Privera, Dr. Meyer). Wir sind pünktlich vor Ort und garantieren reibungslose Abläufe.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Keine zusätzlichen Anfahrtskosten im Raum Bern & Agglomeration</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <Clock className="w-5 h-5 text-slate-700 shrink-0" />
                <span>Kurzfristige Termine bei spontanen Zügel- oder Notfällen</span>
              </div>
            </div>
          </div>

          {/* Right Region Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {SITE_CONFIG.regions.map((region, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center gap-3.5 hover:border-slate-300 hover:bg-white transition-all duration-200 shadow-sm"
                >
                  <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      {region}
                    </div>
                    <div className="text-[11px] text-emerald-700 font-medium">
                      ✓ Täglich im Einsatz
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
