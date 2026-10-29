import React from "react";
import { MapPin, CheckCircle, Clock } from "lucide-react";
import { SITE_CONFIG } from "@/config/site.config";

export function RegionalCoverage() {
  return (
    <section className="py-20 relative bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200/80 text-cyan-800 text-xs font-semibold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-cyan-600" />
              <span>Lokal verankert in Bern</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Ihr Reinigungspartner im gesamten Grossraum Bern.
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Als lokaler Geschwisterbetrieb kennen wir die spezifischen Anforderungen der
              Berner Liegenschaftsverwaltungen (z. B. Von Graffenried, Livit, Wincasa,
              Privera, Dr. Meyer). Wir sind pünktlich vor Ort und garantieren reibungslose Abläufe.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Keine zusätzlichen Anfahrtskosten im Raum Bern & Agglomeration</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <Clock className="w-5 h-5 text-cyan-500 shrink-0" />
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
                  className="glass-panel rounded-2xl p-4 flex items-center gap-3.5 hover:border-cyan-400 transition-all duration-200 hover:shadow-md"
                >
                  <div className="w-8 h-8 rounded-xl bg-slate-900 text-cyan-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      {region}
                    </div>
                    <div className="text-[11px] text-emerald-600 font-medium">
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
