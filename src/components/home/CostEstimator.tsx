"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Calculator,
  Check,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  Phone,
  MessageSquare,
  MapPin,
  Calendar,
  RefreshCw,
  CheckCircle2,
  Lock,
  Mail,
  User,
  Clock,
  Layers,
  HelpCircle,
} from "lucide-react";
import {
  CALCULATOR_SERVICES,
  ServiceType,
  UMZUG_OPTIONS,
  UNTERHALT_OPTIONS,
  HAUSWARTUNG_OPTIONS,
  FENSTER_OPTIONS,
  GEWERBE_OPTIONS,
  BAUREINIGUNG_OPTIONS,
  calculateDynamicPrice,
} from "@/config/calculator.config";
import { SITE_CONFIG } from "@/config/site.config";
import { submitQuotationLead } from "@/app/actions/leadActions";
import { formatCHF } from "@/lib/utils";

interface CostEstimatorProps {
  initialService?: ServiceType;
}

export function CostEstimator({ initialService }: CostEstimatorProps = {}) {
  const [step, setStep] = useState(initialService ? 2 : 1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Selected Service
  const [service, setService] = useState<ServiceType>(initialService || "umzug");

  React.useEffect(() => {
    if (initialService) {
      setService(initialService);
      setStep(2);
    }
  }, [initialService]);

  // === DYNAMIC STEP 2 STATE ===
  // Umzug State
  const [roomIndex, setRoomIndex] = useState(2); // 3.5 Zimmer default
  const [bathrooms, setBathrooms] = useState("1");
  const [umzugExtras, setUmzugExtras] = useState<string[]>(["lamellen", "balkon"]);

  // Unterhalt State
  const [propertySize, setPropertySize] = useState("medium");
  const [frequency, setFrequency] = useState("biweekly");
  const [unterhaltExtras, setUnterhaltExtras] = useState<string[]>(["oven"]);

  // Hauswartung State
  const [unitsSize, setUnitsSize] = useState("units_medium");
  const [turn, setTurn] = useState("weekly");
  const [hauswartungModules, setHauswartungModules] = useState<string[]>([
    "stairs",
    "laundry",
    "trash",
  ]);

  // Fenster State
  const [paneCount, setPaneCount] = useState("20");
  const [blindType, setBlindType] = useState("lamella");
  const [fensterExtras, setFensterExtras] = useState<string[]>(["height"]);

  // Gewerbe State
  const [gewerbeSize, setGewerbeSize] = useState("medium");
  const [gewerbeFreq, setGewerbeFreq] = useState("2x");
  const [gewerbeModules, setGewerbeModules] = useState<string[]>([
    "sanitary",
    "kitchen",
  ]);

  // Baureinigung State
  const [bauType, setBauType] = useState("fine");
  const [bauSize, setBauSize] = useState("medium");
  const [bauExtras, setBauExtras] = useState<string[]>(["cement"]);

  // === STEP 3 STATE (Location & Date) ===
  const [zip, setZip] = useState("3000");
  const [city, setCity] = useState("Bern");
  const [date, setDate] = useState("");
  const [hasLift, setHasLift] = useState(true);

  // === STEP 4 STATE (Contact) ===
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // === STEP 5 RESULT STATE ===
  const [result, setResult] = useState<{
    referenceNumber: string;
    minPrice: number;
    maxPrice: number;
    unitLabel: string;
    hoursText: string;
    summaryDetails: string[];
  } | null>(null);

  // Current active service definition
  const currentServiceDef = useMemo(
    () => CALCULATOR_SERVICES.find((s) => s.id === service) || CALCULATOR_SERVICES[0],
    [service]
  );

  // Live dynamic price calculation
  const calculated = useMemo(() => {
    return calculateDynamicPrice(service, {
      roomIndex,
      bathrooms,
      umzugExtras,
      propertySize,
      frequency,
      unterhaltExtras,
      unitsSize,
      turn,
      hauswartungModules,
      paneCount,
      blindType,
      fensterExtras,
      gewerbeSize,
      gewerbeFreq,
      gewerbeModules,
      bauType,
      bauSize,
      bauExtras,
    });
  }, [
    service,
    roomIndex,
    bathrooms,
    umzugExtras,
    propertySize,
    frequency,
    unterhaltExtras,
    unitsSize,
    turn,
    hauswartungModules,
    paneCount,
    blindType,
    fensterExtras,
    gewerbeSize,
    gewerbeFreq,
    gewerbeModules,
    bauType,
    bauSize,
    bauExtras,
  ]);

  // Toggle helpers
  const toggleArrayItem = (list: string[], setList: (val: string[]) => void, id: string) => {
    if (list.includes(id)) {
      setList(list.filter((x) => x !== id));
    } else {
      setList([...list, id]);
    }
  };

  // Submit Step 4 -> Unlock Step 5
  const handleCalculateAndUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email.trim() && !phone.trim()) {
      setErrorMsg("Bitte geben Sie mindestens Ihre E-Mail-Adresse oder Telefonnummer an.");
      return;
    }

    setIsSubmitting(true);
    try {
      const priceText = `${formatCHF(calculated.minPrice)} – ${formatCHF(calculated.maxPrice)} ${calculated.unitLabel}`;
      const res = await submitQuotationLead({
        service: currentServiceDef.title,
        rooms: service === "umzug" ? UMZUG_OPTIONS.rooms[roomIndex].label : undefined,
        sqm: calculated.summaryDetails.join(", "),
        extras: calculated.summaryDetails,
        date: date || "Flexibel / Nach Absprache",
        zip: zip || "3000",
        city: city || "Bern",
        hasLift,
        fullName: fullName.trim() || "Interessent",
        email: email.trim(),
        phone: phone.trim(),
        estimatedPriceRange: priceText,
      });

      setResult({
        referenceNumber: res.referenceNumber || `AURA-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        minPrice: calculated.minPrice,
        maxPrice: calculated.maxPrice,
        unitLabel: calculated.unitLabel,
        hoursText: calculated.hoursText,
        summaryDetails: calculated.summaryDetails,
      });
      setStep(5);
    } catch {
      // Fallback reveal even on network issue
      setResult({
        referenceNumber: `AURA-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        minPrice: calculated.minPrice,
        maxPrice: calculated.maxPrice,
        unitLabel: calculated.unitLabel,
        hoursText: calculated.hoursText,
        summaryDetails: calculated.summaryDetails,
      });
      setStep(5);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setResult(null);
    setErrorMsg(null);
  };

  return (
    <section id="rechner" className="py-16 sm:py-24 relative bg-slate-50 border-t border-slate-200 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-semibold text-slate-800 mb-3">
            <span className="w-3.5 h-3.5 rounded-sm bg-red-600 text-white flex items-center justify-center font-black text-[9px] leading-none shrink-0">
              +
            </span>
            <span>Schweizer Fixpreis-Kalkulation Bern</span>
            <span className="text-slate-300">|</span>
            <span className="text-emerald-700 font-semibold">100% Verbindlich</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-950">
            Transparenter Kostenrechner
          </h2>

          <p className="mt-2 text-xs sm:text-base text-slate-600">
            Wählen Sie Ihre Anforderungen für eine sofortige, realistische Kosteneinschätzung nach offiziellen Berner Tarifen.
          </p>
        </div>

        {/* Wizard Container */}
        <div className="swiss-card rounded-2xl p-6 sm:p-10 relative overflow-hidden bg-white border border-slate-200">

          {/* Progress Indicator */}
          {step <= 4 && (
            <div className="mb-8">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2.5">
                <span className="flex items-center gap-1.5 text-slate-800 font-bold">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">
                    {step}
                  </span>
                  <span>Schritt {step} von 4</span>
                </span>
                <span className="text-slate-500 font-medium hidden sm:inline">
                  {step === 1 && "Dienstleistung auswählen"}
                  {step === 2 && `Spezifische Angaben für ${currentServiceDef.shortTitle}`}
                  {step === 3 && "Einsatzort im Raum Bern & Termin"}
                  {step === 4 && "Preisrichtung freischalten"}
                </span>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  ✓ Berner Tarifstandard
                </span>
              </div>

              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full bg-slate-900 transition-all duration-300"
                  style={{ width: `${(step / 4) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* ================= STEP 1: SERVICE AUSWAHL ================= */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Welche Reinigungsart benötigen Sie?
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Jede Kategorie öffnet im nächsten Schritt einen individuell angepassten Fragebogen:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CALCULATOR_SERVICES.map((s) => {
                  const Icon = s.icon;
                  const isSelected = service === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setService(s.id)}
                      className={`p-4 rounded-2xl border text-left transition-all duration-200 active:scale-98 flex items-start gap-3.5 min-h-[92px] relative ${
                        isSelected
                          ? "bg-slate-900 text-white border-slate-900 shadow-lg"
                          : "bg-white text-slate-800 border-slate-200 hover:border-slate-400 hover:bg-slate-50/60"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          isSelected ? "bg-white text-slate-900" : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      <div className="flex-1 pr-6">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm sm:text-base leading-tight">
                            {s.title}
                          </span>
                        </div>
                        <p
                          className={`text-xs mt-1 leading-snug line-clamp-2 ${
                            isSelected ? "text-slate-300" : "text-slate-500"
                          }`}
                        >
                          {s.subtitle}
                        </p>
                        <div className="mt-2">
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                              isSelected
                                ? "bg-white/20 text-slate-300"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {s.unit}
                          </span>
                        </div>
                      </div>

                      <div className="absolute top-4 right-4">
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            isSelected
                              ? "bg-slate-900 border-slate-900 text-white"
                              : "border-slate-300 bg-white"
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-colors active:scale-98"
                >
                  <span>Fragebogen für {currentServiceDef.shortTitle} starten</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 2: DYNAMISCHER FRAGEBOGEN NACH SERVICE ================= */}
          {step === 2 && (
            <div className="space-y-6">
              {/* Header with active service indicator */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {currentServiceDef.title}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-0.5">
                    Objektdetails & Spezifikationen
                  </h3>
                </div>
                <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{currentServiceDef.guaranteeText}</span>
                </div>
              </div>

              {/* ---------------- A) UMZUG ---------------- */}
              {service === "umzug" && (
                <div className="space-y-6">
                  {/* Zimmerauswahl */}
                  <div>
                    <label className="block text-xs font-bold text-slate-900 uppercase tracking-wide mb-2">
                      1. Zimmeranzahl & Wohnfläche
                    </label>
                    <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                      {UMZUG_OPTIONS.rooms.map((r, idx) => {
                        const isSelected = roomIndex === idx;
                        return (
                          <button
                            key={r.id}
                            type="button"
                            onClick={() => setRoomIndex(idx)}
                            className={`py-3 px-1.5 rounded-xl text-center border font-bold transition-all duration-200 active:scale-95 min-h-[58px] flex flex-col items-center justify-center ${
                              isSelected
                                ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                                : "bg-white text-slate-700 border-slate-200 hover:border-slate-400 hover:bg-slate-50"
                            }`}
                          >
                            <span className="text-base sm:text-lg font-black leading-tight">
                              {r.id}
                            </span>
                            <span className="text-[10px] opacity-80 mt-0.5">Zi.</span>
                          </button>
                        );
                      })}
                    </div>
                    <div className="mt-2 text-xs text-slate-500 font-medium">
                      Ausgewählt: <strong>{UMZUG_OPTIONS.rooms[roomIndex].label}</strong> ({UMZUG_OPTIONS.rooms[roomIndex].sqm})
                    </div>
                  </div>

                  {/* Nasszellen */}
                  <div>
                    <label className="block text-xs font-bold text-slate-900 uppercase tracking-wide mb-2">
                      2. Anzahl Nasszellen (Badezimmer / WCs)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {UMZUG_OPTIONS.bathrooms.map((b) => {
                        const isSelected = bathrooms === b.id;
                        return (
                          <button
                            key={b.id}
                            type="button"
                            onClick={() => setBathrooms(b.id)}
                            className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all active:scale-98 ${
                              isSelected
                                ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                                : "bg-white text-slate-700 border-slate-200 hover:border-slate-400"
                            }`}
                          >
                            <div>{b.label}</div>
                            {b.surcharge > 0 && (
                              <span className={`text-[11px] font-mono mt-0.5 block ${isSelected ? "text-slate-300" : "text-slate-400"}`}>
                                +{b.surcharge}.-
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Extras */}
                  <div>
                    <label className="block text-xs font-bold text-slate-900 uppercase tracking-wide mb-2">
                      3. Zusätzliche Nebenräume & Spezialausstattung
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {UMZUG_OPTIONS.extras.map((ex) => {
                        const isChecked = umzugExtras.includes(ex.id);
                        return (
                          <button
                            key={ex.id}
                            type="button"
                            onClick={() => toggleArrayItem(umzugExtras, setUmzugExtras, ex.id)}
                            className={`flex items-center justify-between p-3 rounded-xl border text-left text-xs transition-all active:scale-98 min-h-[48px] ${
                              isChecked
                                ? "bg-slate-50 border-slate-900 text-slate-900 font-semibold"
                                : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`w-4 h-4 rounded-md flex items-center justify-center border transition-colors shrink-0 ${
                                  isChecked
                                    ? "bg-slate-900 border-slate-900 text-white"
                                    : "border-slate-300 bg-white"
                                }`}
                              >
                                {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                              <span>{ex.name}</span>
                            </div>
                            <span className="text-slate-400 font-mono text-[11px] shrink-0 ml-2">
                              +{ex.surcharge}.-
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------- B) UNTERHALT (PRIVAT) ---------------- */}
              {service === "unterhalt" && (
                <div className="space-y-6">
                  {/* Wohnungsfläche */}
                  <div>
                    <label className="block text-xs font-bold text-slate-900 uppercase tracking-wide mb-2">
                      1. Wohnungs- oder Hausgrösse
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {UNTERHALT_OPTIONS.propertySizes.map((p) => {
                        const isSelected = propertySize === p.id;
                        return (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => setPropertySize(p.id)}
                            className={`p-3.5 rounded-xl border text-left transition-all active:scale-98 ${
                              isSelected
                                ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                                : "bg-white text-slate-700 border-slate-200 hover:border-slate-400"
                            }`}
                          >
                            <div className="text-xs font-bold">{p.label}</div>
                            <div className={`text-[11px] mt-0.5 ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                              Richtzeit: {p.hours}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Frequenz */}
                  <div>
                    <label className="block text-xs font-bold text-slate-900 uppercase tracking-wide mb-2">
                      2. Gewünschter Reinigungs-Turnus
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {UNTERHALT_OPTIONS.frequencies.map((f) => {
                        const isSelected = frequency === f.id;
                        return (
                          <button
                            key={f.id}
                            type="button"
                            onClick={() => setFrequency(f.id)}
                            className={`p-3 rounded-xl border text-center transition-all active:scale-98 min-h-[70px] flex flex-col items-center justify-center ${
                              isSelected
                                ? "bg-slate-900 text-white border-slate-900 shadow-md"
                                : "bg-white text-slate-700 border-slate-200 hover:border-slate-400"
                            }`}
                          >
                            <div className="text-xs font-bold leading-tight">{f.label}</div>
                            <div className={`text-[10px] mt-1 ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                              {f.desc}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Unterhalt Extras */}
                  <div>
                    <label className="block text-xs font-bold text-slate-900 uppercase tracking-wide mb-2">
                      3. Optionale Zusatzdienste
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {UNTERHALT_OPTIONS.extras.map((ex) => {
                        const isChecked = unterhaltExtras.includes(ex.id);
                        return (
                          <button
                            key={ex.id}
                            type="button"
                            onClick={() => toggleArrayItem(unterhaltExtras, setUnterhaltExtras, ex.id)}
                            className={`flex items-center justify-between p-3 rounded-xl border text-left text-xs transition-all active:scale-98 min-h-[48px] ${
                              isChecked
                                ? "bg-slate-50 border-slate-900 text-slate-900 font-semibold"
                                : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`w-4 h-4 rounded-md flex items-center justify-center border transition-colors shrink-0 ${
                                  isChecked ? "bg-slate-900 border-slate-900 text-white" : "border-slate-300 bg-white"
                                }`}
                              >
                                {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                              <span>{ex.name}</span>
                            </div>
                            <span className="text-slate-400 font-mono text-[11px] shrink-0 ml-2">
                              +{ex.surcharge}.-
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------- C) HAUSWARTUNG & TREPPENHAUS ---------------- */}
              {service === "hauswartung" && (
                <div className="space-y-6">
                  {/* Anzahl Mietparteien */}
                  <div>
                    <label className="block text-xs font-bold text-slate-900 uppercase tracking-wide mb-2">
                      1. Grösse der Liegenschaft (Mietparteien / Wohnungen)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {HAUSWARTUNG_OPTIONS.units.map((u) => {
                        const isSelected = unitsSize === u.id;
                        return (
                          <button
                            key={u.id}
                            type="button"
                            onClick={() => setUnitsSize(u.id)}
                            className={`p-3.5 rounded-xl border text-left transition-all active:scale-98 ${
                              isSelected
                                ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                                : "bg-white text-slate-700 border-slate-200 hover:border-slate-400"
                            }`}
                          >
                            <div className="text-xs font-bold">{u.label}</div>
                            <div className={`text-[11px] mt-0.5 ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                              Basis-Monatspauschale ab CHF {u.baseMin}.-
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Turnus */}
                  <div>
                    <label className="block text-xs font-bold text-slate-900 uppercase tracking-wide mb-2">
                      2. Reinigungsrhythmus Treppenhaus
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {HAUSWARTUNG_OPTIONS.turns.map((t) => {
                        const isSelected = turn === t.id;
                        return (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => setTurn(t.id)}
                            className={`p-3 rounded-xl border text-center transition-all active:scale-98 ${
                              isSelected
                                ? "bg-slate-900 text-white border-slate-900 font-bold"
                                : "bg-white text-slate-700 border-slate-200"
                            }`}
                          >
                            <div className="text-xs">{t.label}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Hauswartung Modules */}
                  <div>
                    <label className="block text-xs font-bold text-slate-900 uppercase tracking-wide mb-2">
                      3. Gewünschte Module & Hauswartungs-Aufgaben
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {HAUSWARTUNG_OPTIONS.modules.map((m) => {
                        const isChecked = hauswartungModules.includes(m.id);
                        return (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => toggleArrayItem(hauswartungModules, setHauswartungModules, m.id)}
                            className={`flex items-center justify-between p-3 rounded-xl border text-left text-xs transition-all active:scale-98 min-h-[50px] ${
                              isChecked
                                ? "bg-slate-50 border-slate-900 text-slate-900 font-semibold"
                                : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`w-4 h-4 rounded-md flex items-center justify-center border transition-colors shrink-0 ${
                                  isChecked ? "bg-slate-900 border-slate-900 text-white" : "border-slate-300 bg-white"
                                }`}
                              >
                                {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                              <span>{m.name}</span>
                            </div>
                            {m.surcharge > 0 && (
                              <span className="text-slate-400 font-mono text-[11px] shrink-0 ml-2">
                                +{m.surcharge}.-/Mt.
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------- D) FENSTER & STOREN ---------------- */}
              {service === "fenster" && (
                <div className="space-y-6">
                  {/* Anzahl Fensterflügel */}
                  <div>
                    <label className="block text-xs font-bold text-slate-900 uppercase tracking-wide mb-2">
                      1. Anzahl Fensterflügel / Glasflächen
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {FENSTER_OPTIONS.panes.map((p) => {
                        const isSelected = paneCount === p.id;
                        return (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => setPaneCount(p.id)}
                            className={`p-3.5 rounded-xl border text-left transition-all active:scale-98 ${
                              isSelected
                                ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                                : "bg-white text-slate-700 border-slate-200 hover:border-slate-400"
                            }`}
                          >
                            <div className="text-xs font-bold">{p.label}</div>
                            <div className={`text-[11px] mt-0.5 ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                              Pauschalrahmen CHF {p.baseMin} – {p.baseMax}.-
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Storenart */}
                  <div>
                    <label className="block text-xs font-bold text-slate-900 uppercase tracking-wide mb-2">
                      2. Beschattung & Storen
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {FENSTER_OPTIONS.blinds.map((b) => {
                        const isSelected = blindType === b.id;
                        return (
                          <button
                            key={b.id}
                            type="button"
                            onClick={() => setBlindType(b.id)}
                            className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all active:scale-98 ${
                              isSelected
                                ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                                : "bg-white text-slate-700 border-slate-200 hover:border-slate-400"
                            }`}
                          >
                            <div>{b.label}</div>
                            {b.surcharge > 0 && (
                              <span className={`text-[11px] font-mono mt-0.5 block ${isSelected ? "text-slate-300" : "text-slate-400"}`}>
                                +{b.surcharge}.-
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Extras */}
                  <div>
                    <label className="block text-xs font-bold text-slate-900 uppercase tracking-wide mb-2">
                      3. Spezialverglasungen & Gegebenheiten
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {FENSTER_OPTIONS.extras.map((ex) => {
                        const isChecked = fensterExtras.includes(ex.id);
                        return (
                          <button
                            key={ex.id}
                            type="button"
                            onClick={() => toggleArrayItem(fensterExtras, setFensterExtras, ex.id)}
                            className={`flex items-center justify-between p-3 rounded-xl border text-left text-xs transition-all active:scale-98 min-h-[48px] ${
                              isChecked
                                ? "bg-slate-50 border-slate-900 text-slate-900 font-semibold"
                                : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`w-4 h-4 rounded-md flex items-center justify-center border transition-colors shrink-0 ${
                                  isChecked ? "bg-slate-900 border-slate-900 text-white" : "border-slate-300 bg-white"
                                }`}
                              >
                                {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                              <span>{ex.name}</span>
                            </div>
                            <span className="text-slate-400 font-mono text-[11px] shrink-0 ml-2">
                              +{ex.surcharge}.-
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------- E) GEWERBE & BÜRO ---------------- */}
              {service === "gewerbe" && (
                <div className="space-y-6">
                  {/* Fläche */}
                  <div>
                    <label className="block text-xs font-bold text-slate-900 uppercase tracking-wide mb-2">
                      1. Büro- oder Praxisfläche
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {GEWERBE_OPTIONS.sizes.map((s) => {
                        const isSelected = gewerbeSize === s.id;
                        return (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => setGewerbeSize(s.id)}
                            className={`p-3.5 rounded-xl border text-left transition-all active:scale-98 ${
                              isSelected
                                ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                                : "bg-white text-slate-700 border-slate-200 hover:border-slate-400"
                            }`}
                          >
                            <div className="text-xs font-bold">{s.label}</div>
                            <div className={`text-[11px] mt-0.5 ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                              Basis ab CHF {s.baseMin}.- / Mt.
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Frequenz */}
                  <div>
                    <label className="block text-xs font-bold text-slate-900 uppercase tracking-wide mb-2">
                      2. Gewünschte Reinigungsfrequenz
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {GEWERBE_OPTIONS.frequencies.map((f) => {
                        const isSelected = gewerbeFreq === f.id;
                        return (
                          <button
                            key={f.id}
                            type="button"
                            onClick={() => setGewerbeFreq(f.id)}
                            className={`p-3 rounded-xl border text-center transition-all active:scale-98 ${
                              isSelected
                                ? "bg-slate-900 text-white border-slate-900 font-bold"
                                : "bg-white text-slate-700 border-slate-200"
                            }`}
                          >
                            <div className="text-xs">{f.label}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Module */}
                  <div>
                    <label className="block text-xs font-bold text-slate-900 uppercase tracking-wide mb-2">
                      3. Spezifische Hygiene- & B2B-Module
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {GEWERBE_OPTIONS.modules.map((m) => {
                        const isChecked = gewerbeModules.includes(m.id);
                        return (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => toggleArrayItem(gewerbeModules, setGewerbeModules, m.id)}
                            className={`flex items-center justify-between p-3 rounded-xl border text-left text-xs transition-all active:scale-98 min-h-[48px] ${
                              isChecked
                                ? "bg-slate-50 border-slate-900 text-slate-900 font-semibold"
                                : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`w-4 h-4 rounded-md flex items-center justify-center border transition-colors shrink-0 ${
                                  isChecked ? "bg-slate-900 border-slate-900 text-white" : "border-slate-300 bg-white"
                                }`}
                              >
                                {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                              <span>{m.name}</span>
                            </div>
                            <span className="text-slate-400 font-mono text-[11px] shrink-0 ml-2">
                              +{m.surcharge}.-/Mt.
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------- F) BAUREINIGUNG ---------------- */}
              {service === "baureinigung" && (
                <div className="space-y-6">
                  {/* Phase */}
                  <div>
                    <label className="block text-xs font-bold text-slate-900 uppercase tracking-wide mb-2">
                      1. Phase & Art der Baureinigung
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {BAUREINIGUNG_OPTIONS.types.map((t) => {
                        const isSelected = bauType === t.id;
                        return (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => setBauType(t.id)}
                            className={`p-3.5 rounded-xl border text-left transition-all active:scale-98 ${
                              isSelected
                                ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                                : "bg-white text-slate-700 border-slate-200 hover:border-slate-400"
                            }`}
                          >
                            <div className="text-xs font-bold">{t.label}</div>
                            <div className={`text-[11px] mt-0.5 ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                              {t.desc}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Grösse */}
                  <div>
                    <label className="block text-xs font-bold text-slate-900 uppercase tracking-wide mb-2">
                      2. Baufläche in m²
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {BAUREINIGUNG_OPTIONS.sizes.map((s) => {
                        const isSelected = bauSize === s.id;
                        return (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => setBauSize(s.id)}
                            className={`p-3 rounded-xl border text-left transition-all active:scale-98 ${
                              isSelected
                                ? "bg-slate-900 text-white border-slate-900 font-bold"
                                : "bg-white text-slate-700 border-slate-200"
                            }`}
                          >
                            <div className="text-xs">{s.label}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Baureinigung Extras */}
                  <div>
                    <label className="block text-xs font-bold text-slate-900 uppercase tracking-wide mb-2">
                      3. Spezifische Rückstände & Bodenbeläge
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {BAUREINIGUNG_OPTIONS.extras.map((ex) => {
                        const isChecked = bauExtras.includes(ex.id);
                        return (
                          <button
                            key={ex.id}
                            type="button"
                            onClick={() => toggleArrayItem(bauExtras, setBauExtras, ex.id)}
                            className={`flex items-center justify-between p-3 rounded-xl border text-left text-xs transition-all active:scale-98 min-h-[48px] ${
                              isChecked
                                ? "bg-slate-50 border-slate-900 text-slate-900 font-semibold"
                                : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`w-4 h-4 rounded-md flex items-center justify-center border transition-colors shrink-0 ${
                                  isChecked ? "bg-slate-900 border-slate-900 text-white" : "border-slate-300 bg-white"
                                }`}
                              >
                                {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                              <span>{ex.name}</span>
                            </div>
                            <span className="text-slate-400 font-mono text-[11px] shrink-0 ml-2">
                              +{ex.surcharge}.-
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="pt-4 flex items-center justify-between gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Dienstleistung ändern</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-colors active:scale-98"
                >
                  <span>Weiter zu Ort & Termin</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 3: ORT & TERMIN ================= */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Einsatzort im Grossraum Bern & Wunschtermin
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Im Kanton Bern verrechnen wir grundsätzlich 0.– CHF Anfahrtsspesen:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Location */}
                <div>
                  <label htmlFor="estimator-location" className="block text-xs font-bold text-slate-900 uppercase tracking-wide mb-1.5">
                    Postleitzahl & Ort
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="estimator-location"
                      type="text"
                      value={`${zip} ${city}`}
                      onChange={(e) => {
                        const val = e.target.value;
                        const parts = val.split(" ");
                        setZip(parts[0] || "");
                        setCity(parts.slice(1).join(" ") || "");
                      }}
                      placeholder="3000 Bern"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {["3000 Bern", "3097 Liebefeld", "3072 Ostermundigen", "3074 Muri", "3052 Zollikofen", "3600 Thun"].map((pill) => (
                      <button
                        key={pill}
                        type="button"
                        onClick={() => {
                          const [pz, ...ci] = pill.split(" ");
                          setZip(pz);
                          setCity(ci.join(" "));
                        }}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200/80"
                      >
                        {pill}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Desired Date */}
                <div>
                  <label htmlFor="estimator-date" className="block text-xs font-bold text-slate-900 uppercase tracking-wide mb-1.5">
                    Wunschtermin / Zügeltermin
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="estimator-date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1.5">
                    Auch kurzfristige Zügel-Notfälle oder Monatsenden möglich.
                  </p>
                </div>
              </div>

              {/* Lift toggle */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">Personenaufzug / Lift vorhanden?</div>
                  <div className="text-[11px] text-slate-500">Erleichtert den Transport unserer Reinigungsmaschinen</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setHasLift(true)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                      hasLift ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-600 border-slate-200"
                    }`}
                  >
                    Ja
                  </button>
                  <button
                    type="button"
                    onClick={() => setHasLift(false)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                      !hasLift ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-600 border-slate-200"
                    }`}
                  >
                    Nein
                  </button>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Zurück</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-colors active:scale-98"
                >
                  <span>Weiter zu Schritt 4 (Kontakt)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 4: KONTAKTDATEN & FREISCHALTUNG ================= */}
          {step === 4 && (
            <form onSubmit={handleCalculateAndUnlock} className="space-y-6">
              <div>
                <div className="inline-flex items-center gap-1 text-[11px] font-bold uppercase text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 mb-2">
                  <Lock className="w-3 h-3 text-emerald-600" />
                  <span>Letzter Schritt vor Preis-Freischaltung</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Wohin dürfen wir Ihre Preisrichtung senden?
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Geben Sie Ihre E-Mail und/oder Telefonnummer ein. Im nächsten Schritt wird Ihre Preisrichtung sofort kalkuliert und live angezeigt.
                </p>
              </div>

              {errorMsg && (
                <div role="alert" aria-live="polite" className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                  {errorMsg}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label htmlFor="estimator-name" className="block text-xs font-bold text-slate-900 uppercase tracking-wide mb-1.5">
                    Vor- & Nachname <span className="text-slate-400 font-normal">(optional)</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="estimator-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="z. B. Driss & Amin Lourini"
                      autoComplete="name"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label htmlFor="estimator-email" className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                      E-Mail-Adresse
                    </label>
                    <span className="text-[10px] text-slate-500 font-semibold">Für detailliertes Angebot</span>
                  </div>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="estimator-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ihre.adresse@beispiel.ch"
                      autoComplete="email"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label htmlFor="estimator-phone" className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                      Telefonnummer / Mobile
                    </label>
                    <span className="text-[10px] text-emerald-700 font-semibold">Für WhatsApp / Rückfrage</span>
                  </div>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="estimator-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="079 123 45 67"
                      inputMode="tel"
                      autoComplete="tel"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    * Mindestens eine Kontaktangabe (E-Mail oder Telefon) erforderlich.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% diskret nach Schweizer revDSG. Wir hassen Spam genauso wie Staub.</span>
              </div>

              <div className="pt-4 flex items-center justify-between gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Zurück</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md active:scale-98 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Berechnung läuft...</span>
                  ) : (
                    <>
                      <span>Preisrichtung jetzt freischalten</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* ================= STEP 5: PREISRICHTUNG REVEAL (10/10 ERGEBNIS) ================= */}
          {step === 5 && result && (
            <div className="space-y-6 text-center animate-in fade-in zoom-in-95 duration-500">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                  Referenz: {result.referenceNumber}
                </span>

                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-3">
                  Ihre persönliche Preisrichtung für {currentServiceDef.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md mx-auto">
                  Berechnet für {zip} {city} auf Basis der offiziellen Schweizer Richtpreise.
                </p>
              </div>

              {/* Big Price Reveal Card - Clean Swiss Dark Navy */}
              <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800 relative text-left max-w-xl mx-auto">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs uppercase tracking-wider font-bold text-slate-400">
                    Fixpreis-Richtwertrahmen
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-300 bg-emerald-950/80 border border-emerald-800/80 px-2.5 py-0.5 rounded-full font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Inkl. 100% Abnahmegarantie</span>
                  </span>
                </div>

                <div className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-1">
                  {formatCHF(result.minPrice)} – {formatCHF(result.maxPrice)}
                </div>
                <div className="text-xs text-slate-300 font-medium mt-1.5">
                  {result.unitLabel}
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800 text-xs text-slate-300 space-y-2.5">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Einschätzung / Turnus:</span>
                    <span className="font-semibold text-white">{result.hoursText}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Garantie & Standard:</span>
                    <span className="font-bold text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 shrink-0" />
                      <span>{currentServiceDef.guaranteeText}</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Anfahrtskosten Bern:</span>
                    <span className="font-semibold text-slate-200">CHF 0.00 (Kostenlos)</span>
                  </div>
                </div>

                {/* Parameters Tag list */}
                <div className="mt-5 pt-4 border-t border-slate-800 flex flex-wrap gap-1.5 text-[11px]">
                  {result.summaryDetails.map((det, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                      ✓ {det}
                    </span>
                  ))}
                  <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700">
                    📍 {zip} {city}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                <a
                  href={`https://wa.me/${SITE_CONFIG.contact.whatsapp.replace("+", "")}?text=${encodeURIComponent(
                    `Hallo AURA Clean Team, ich habe den Rechner genutzt (Ref: ${result.referenceNumber}) für ${currentServiceDef.title} in ${zip} ${city}. Richtwert: CHF ${result.minPrice} - ${result.maxPrice} (${result.unitLabel}). Details: ${result.summaryDetails.join(", ")}. Können wir einen Termin abstimmen?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors active:scale-98"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Via WhatsApp anfragen</span>
                </a>

                <a
                  href={`tel:${SITE_CONFIG.contact.phone}`}
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow transition-colors active:scale-98"
                >
                  <Phone className="w-4 h-4 text-slate-300" />
                  <span>{SITE_CONFIG.contact.phoneDisplay}</span>
                </a>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                <Clock className="w-3.5 h-3.5 text-slate-700" />
                <span>Unser Berner Familienbetrieb meldet sich werktags innerhalb von 2 Stunden bei Ihnen.</span>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Andere Dienstleistung berechnen</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}