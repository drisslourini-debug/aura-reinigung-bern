"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Calculator, Check, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { SITE_CONFIG } from "@/config/site.config";
import { formatCHF } from "@/lib/utils";

export function CostEstimator() {
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(2); // default: 3.5 Zimmer
  const [selectedExtras, setSelectedExtras] = useState<string[]>(["lamellen", "balkon"]);

  const currentRoom = SITE_CONFIG.pricingEstimates.umzug[selectedRoomIndex];

  const extrasCost = useMemo(() => {
    return selectedExtras.reduce((sum, extraId) => {
      const extra = SITE_CONFIG.pricingEstimates.extras.find((e) => e.id === extraId);
      return sum + (extra ? extra.surcharge : 0);
    }, 0);
  }, [selectedExtras]);

  const priceMin = currentRoom.basePriceMin + extrasCost;
  const priceMax = currentRoom.basePriceMax + extrasCost;

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    params.set("service", "umzug");
    params.set("rooms", currentRoom.rooms);
    if (selectedExtras.length > 0) {
      params.set("extras", selectedExtras.join(","));
    }
    return params.toString();
  }, [currentRoom.rooms, selectedExtras]);

  return (
    <section id="rechner" className="py-16 sm:py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200/60 text-cyan-700 text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Transparente Schweizer Fixpreise</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900">
            Berechnen Sie Ihre Offerte in 30 Sekunden
          </h2>
          <p className="mt-2.5 text-xs sm:text-base text-slate-600">
            Wählen Sie Ihre Wohnungsgrösse und Extras. Sie erhalten sofort eine
            realistische Kosteneinschätzung für den Raum Bern – ohne Vorab-Registrierung.
          </p>
        </div>

        {/* Card Container */}
        <div className="glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Top ambient highlight */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Left Column: Interactive Controls */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              {/* Step 1: Room Selection */}
              <div>
                <div className="flex justify-between items-center mb-2.5">
                  <label className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
                    1. Wohnungsgrösse
                  </label>
                  <span className="text-[11px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700">
                    {currentRoom.sqmRange}
                  </span>
                </div>

                {/* Mobile Friendly Grid (5 equal columns with 48px touch targets) */}
                <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                  {SITE_CONFIG.pricingEstimates.umzug.map((item, idx) => {
                    const isSelected = selectedRoomIndex === idx;
                    return (
                      <button
                        key={item.rooms}
                        type="button"
                        onClick={() => setSelectedRoomIndex(idx)}
                        className={`py-2.5 sm:py-3 px-1 sm:px-2 rounded-xl text-center border font-semibold transition-all duration-200 active:scale-95 min-h-[52px] flex flex-col items-center justify-center ${
                          isSelected
                            ? "bg-slate-900 text-white border-slate-900 shadow-md scale-[1.02]"
                            : "bg-white text-slate-700 border-slate-200 hover:border-cyan-300 hover:bg-cyan-50/30"
                        }`}
                      >
                        <div className="text-sm sm:text-base font-bold leading-tight">
                          {item.rooms}
                        </div>
                        <div className="text-[9px] sm:text-[10px] opacity-80 mt-0.5">Zi.</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Extras Selection */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide mb-2.5">
                  2. Zusätzliche Bereiche / Extras
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                  {SITE_CONFIG.pricingEstimates.extras.map((extra) => {
                    const isChecked = selectedExtras.includes(extra.id);
                    return (
                      <button
                        key={extra.id}
                        type="button"
                        onClick={() => toggleExtra(extra.id)}
                        className={`flex items-center justify-between p-3 rounded-xl border text-left text-xs transition-all active:scale-98 min-h-[46px] ${
                          isChecked
                            ? "bg-cyan-50/70 border-cyan-400 text-slate-900 font-medium"
                            : "bg-white/70 border-slate-200 text-slate-600 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-4 h-4 rounded-md flex items-center justify-center border transition-colors shrink-0 ${
                              isChecked
                                ? "bg-cyan-500 border-cyan-500 text-white"
                                : "border-slate-300 bg-white"
                            }`}
                          >
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span className="text-xs">{extra.name}</span>
                        </div>
                        <span className="text-slate-400 font-mono text-[11px] shrink-0 ml-2">
                          +{extra.surcharge}.-
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Live Estimate Box */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-5 sm:p-8 text-white shadow-xl flex flex-col justify-between h-full relative overflow-hidden">
              {/* Internal sparkle glow */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/10 rounded-full blur-2xl" />

              <div>
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-cyan-400">
                    Verbindlicher Richtwert
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded-full">
                    <Sparkles className="w-3 h-3" />
                    <span>Inkl. MwSt.</span>
                  </span>
                </div>

                <div className="mt-1 sm:mt-2">
                  <div className="text-[11px] sm:text-xs text-slate-400">Geschätzter Fixpreis-Rahmen:</div>
                  <div className="text-2xl sm:text-4xl font-black tracking-tight text-white mt-1">
                    {formatCHF(priceMin)} – {formatCHF(priceMax)}
                  </div>
                </div>

                <div className="mt-4 pt-3 sm:pt-4 border-t border-slate-700/60 text-xs text-slate-300 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-[11px] sm:text-xs">Geschätzter Aufwand:</span>
                    <span className="font-semibold text-white text-[11px] sm:text-xs">
                      ca. {currentRoom.hoursMin} – {currentRoom.hoursMax} Stunden
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-[11px] sm:text-xs">Abnahmegarantie:</span>
                    <span className="font-semibold text-emerald-400 flex items-center gap-1 text-[11px] sm:text-xs">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      100% garantiert
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-[11px] sm:text-xs">Übergabe-Präsenz:</span>
                    <span className="font-semibold text-white text-[11px] sm:text-xs">Inklusive</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="mt-6 sm:mt-8 pt-3 sm:pt-4">
                <Link
                  href={`/offerte-anfragen?${queryString}`}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20 active:scale-98 transition-transform"
                >
                  <span>Diese Berechnung übernehmen</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <p className="text-[10px] sm:text-[11px] text-slate-400 text-center mt-2">
                  Unverbindlich & kostenlos. Antwort werktags binnen 2 Stunden.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
