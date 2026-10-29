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
  Home,
  Building2,
  Sun,
  Briefcase,
  RefreshCw,
  CheckCircle2,
  Lock,
  Mail,
  User,
  Clock,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site.config";
import { submitQuotationLead } from "@/app/actions/leadActions";
import { formatCHF } from "@/lib/utils";

const SERVICES_CONFIG = [
  {
    id: "umzug",
    title: "Umzugsreinigung",
    sub: "Mit 100% Abnahmegarantie & Übergabebegleitung",
    badge: "Beliebteste Wahl",
    icon: Sparkles,
  },
  {
    id: "unterhalt",
    title: "Unterhaltsreinigung",
    sub: "Regelmässig oder einmalig für Wohnung & Haus",
    badge: "Privat",
    icon: Home,
  },
  {
    id: "hauswartung",
    title: "Hauswartung & Treppenhaus",
    sub: "Liegenschaftsservice für Verwaltungen & MFH",
    badge: "Liegenschaften",
    icon: Building2,
  },
  {
    id: "fenster",
    title: "Fenster- & Storenreinigung",
    sub: "Streifenfreies Reinwasser inkl. Lamellen & Rahmen",
    badge: "Glas & Storen",
    icon: Sun,
  },
  {
    id: "gewerbe",
    title: "Büro- & Gewerbereinigung",
    sub: "Repräsentative Hygiene für Kanzleien & Praxen",
    badge: "B2B",
    icon: Briefcase,
  },
];

export function CostEstimator() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form Inputs
  const [service, setService] = useState("umzug");
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(2); // default: 3.5 Zimmer
  const [selectedExtras, setSelectedExtras] = useState<string[]>(["lamellen", "balkon"]);
  const [zip, setZip] = useState("3000");
  const [city, setCity] = useState("Bern");
  const [date, setDate] = useState("");
  const [hasLift, setHasLift] = useState(true);

  // Contact Inputs (Step 4)
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Result state (Step 5 Reveal)
  const [result, setResult] = useState<{
    referenceNumber: string;
    priceMin: number;
    priceMax: number;
    hoursMin: number;
    hoursMax: number;
  } | null>(null);

  const currentRoom = SITE_CONFIG.pricingEstimates.umzug[selectedRoomIndex];

  // Price Calculation
  const extrasCost = useMemo(() => {
    return selectedExtras.reduce((sum, extraId) => {
      const extra = SITE_CONFIG.pricingEstimates.extras.find((e) => e.id === extraId);
      return sum + (extra ? extra.surcharge : 0);
    }, 0);
  }, [selectedExtras]);

  const priceMin = useMemo(() => {
    if (service === "umzug") return currentRoom.basePriceMin + extrasCost;
    if (service === "unterhalt") return 140;
    if (service === "hauswartung") return 380;
    if (service === "fenster") return 240;
    if (service === "gewerbe") return 320;
    return 550;
  }, [service, currentRoom, extrasCost]);

  const priceMax = useMemo(() => {
    if (service === "umzug") return currentRoom.basePriceMax + extrasCost;
    if (service === "unterhalt") return 260;
    if (service === "hauswartung") return 890;
    if (service === "fenster") return 480;
    if (service === "gewerbe") return 950;
    return 850;
  }, [service, currentRoom, extrasCost]);

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Step 4 Submission -> Unlocks Step 5 (Reveal)
  const handleCalculateAndUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validate that at least email or phone is present
    if (!email.trim() && !phone.trim()) {
      setErrorMsg("Bitte geben Sie mindestens Ihre E-Mail-Adresse oder Telefonnummer an.");
      return;
    }

    setIsSubmitting(true);
    try {
      const priceRangeText = `${formatCHF(priceMin)} – ${formatCHF(priceMax)}`;
      const res = await submitQuotationLead({
        service,
        rooms: service === "umzug" ? currentRoom.rooms : undefined,
        sqm: currentRoom.sqmRange,
        extras: selectedExtras,
        date: date || "Flexibel / Nach Absprache",
        zip,
        city,
        hasLift,
        fullName: fullName.trim() || "Interessent",
        email: email.trim(),
        phone: phone.trim(),
        estimatedPriceRange: priceRangeText,
      });

      if (res.success) {
        setResult({
          referenceNumber: res.referenceNumber || `AURA-2026-${Math.floor(1000 + Math.random() * 9000)}`,
          priceMin,
          priceMax,
          hoursMin: currentRoom.hoursMin,
          hoursMax: currentRoom.hoursMax,
        });
        setStep(5); // Jump to Step 5: Reveal!
      } else {
        setErrorMsg(res.message);
      }
    } catch {
      // Fallback reveal even if network glitch occurs
      setResult({
        referenceNumber: `AURA-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        priceMin,
        priceMax,
        hoursMin: currentRoom.hoursMin,
        hoursMax: currentRoom.hoursMax,
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
    <section id="rechner" className="py-16 sm:py-24 relative bg-slate-50/70 border-t border-slate-200/60 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5 text-cyan-600" />
            <span>Transparenter Schweizer Fixpreis-Rechner</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900">
            Berechnen Sie Ihre Preisrichtung
          </h2>

          <p className="mt-2 text-xs sm:text-base text-slate-600">
            In wenigen Schritten zum Richtwert für Ihre professionelle Reinigung im Grossraum Bern mit 100% Abnahmegarantie.
          </p>
        </div>

        {/* Step Wizard Container */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden bg-white/90 border border-slate-200/90">
          {/* Subtle top rainbow line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-500" />

          {/* Progress Indicator (Steps 1 to 4) */}
          {step <= 4 && (
            <div className="mb-8">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2.5">
                <span className="flex items-center gap-1.5 text-cyan-700">
                  <span className="w-5 h-5 rounded-full bg-cyan-600 text-white flex items-center justify-center text-[10px]">
                    {step}
                  </span>
                  <span>Schritt {step} von 4</span>
                </span>
                <span className="text-slate-400 font-medium hidden sm:inline">
                  {step === 1 && "Dienstleistung auswählen"}
                  {step === 2 && "Wohnungsgrösse & Details"}
                  {step === 3 && "Einsatzort & Wunschtermin"}
                  {step === 4 && "Preisrichtung freischalten"}
                </span>
                <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  ✓ Unverbindlich & diskret
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 transition-all duration-300"
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
                  Wählen Sie die gewünschte Hauptdienstleistung aus:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICES_CONFIG.map((s) => {
                  const Icon = s.icon;
                  const isSelected = service === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setService(s.id)}
                      className={`p-4 rounded-2xl border text-left transition-all duration-200 active:scale-98 flex items-start gap-3.5 min-h-[88px] relative ${
                        isSelected
                          ? "bg-slate-900 text-white border-slate-900 shadow-lg ring-2 ring-cyan-400/40"
                          : "bg-white text-slate-800 border-slate-200 hover:border-cyan-300 hover:bg-cyan-50/20"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          isSelected ? "bg-cyan-500 text-slate-950" : "bg-cyan-50 text-cyan-600"
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
                          {s.sub}
                        </p>
                      </div>

                      <div className="absolute top-4 right-4">
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            isSelected
                              ? "bg-cyan-400 border-cyan-400 text-slate-950"
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

              {/* Next Button */}
              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-cyan-600 text-white font-bold text-sm shadow-md transition-colors active:scale-98"
                >
                  <span>Weiter zu Schritt 2</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 2: OBJEKT & EXTRAS ================= */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Wohnungsgrösse & gewünschte Zusatzleistungen
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Je genauer die Angaben, desto präziser ist Ihre Fixpreis-Berechnung:
                </p>
              </div>

              {/* Room Selector */}
              <div>
                <div className="flex justify-between items-center mb-2.5">
                  <label className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
                    Zimmeranzahl
                  </label>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-cyan-50 text-cyan-800 border border-cyan-200">
                    {currentRoom.label} ({currentRoom.sqmRange})
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                  {SITE_CONFIG.pricingEstimates.umzug.map((item, idx) => {
                    const isSelected = selectedRoomIndex === idx;
                    return (
                      <button
                        key={item.rooms}
                        type="button"
                        onClick={() => setSelectedRoomIndex(idx)}
                        className={`py-3 px-2 rounded-xl text-center border font-bold transition-all duration-200 active:scale-95 min-h-[56px] flex flex-col items-center justify-center ${
                          isSelected
                            ? "bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-cyan-400/40"
                            : "bg-white text-slate-700 border-slate-200 hover:border-cyan-300 hover:bg-cyan-50/20"
                        }`}
                      >
                        <div className="text-base sm:text-lg font-black leading-tight">
                          {item.rooms}
                        </div>
                        <div className="text-[10px] opacity-75">Zimmer</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Extras Selector */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide mb-2.5">
                  Bereiche / Zusätzliche Ausstattung
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {SITE_CONFIG.pricingEstimates.extras.map((extra) => {
                    const isChecked = selectedExtras.includes(extra.id);
                    return (
                      <button
                        key={extra.id}
                        type="button"
                        onClick={() => toggleExtra(extra.id)}
                        className={`flex items-center justify-between p-3.5 rounded-xl border text-left text-xs transition-all active:scale-98 min-h-[50px] ${
                          isChecked
                            ? "bg-cyan-50/80 border-cyan-400 text-slate-900 font-semibold"
                            : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors shrink-0 ${
                              isChecked
                                ? "bg-cyan-500 border-cyan-500 text-white"
                                : "border-slate-300 bg-white"
                            }`}
                          >
                            {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <span>{extra.name}</span>
                        </div>
                        <span className="text-slate-400 font-mono text-[11px] shrink-0 ml-2">
                          +{extra.surcharge}.-
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="pt-4 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Zurück</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-cyan-600 text-white font-bold text-sm shadow-md transition-colors active:scale-98"
                >
                  <span>Weiter zu Schritt 3</span>
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
                  Einsatzort im Raum Bern & Wunschtermin
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Im Grossraum Bern verrechnen wir grundsätzlich keine Anfahrtsspesen:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Location */}
                <div>
                  <label className="block text-xs font-bold text-slate-900 uppercase tracking-wide mb-1.5">
                    Postleitzahl & Ort
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={`${zip} ${city}`}
                      onChange={(e) => {
                        const val = e.target.value;
                        const parts = val.split(" ");
                        setZip(parts[0] || "");
                        setCity(parts.slice(1).join(" ") || "");
                      }}
                      placeholder="3000 Bern"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  {/* Quick Bern Region Pills */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {["3000 Bern", "3097 Liebefeld", "3072 Ostermundigen", "3074 Muri", "3600 Thun"].map((pill) => (
                      <button
                        key={pill}
                        type="button"
                        onClick={() => {
                          const [pz, ...ci] = pill.split(" ");
                          setZip(pz);
                          setCity(ci.join(" "));
                        }}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 hover:bg-cyan-50 text-slate-600 hover:text-cyan-700 transition-colors border border-slate-200/80"
                      >
                        {pill}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Desired Date */}
                <div>
                  <label className="block text-xs font-bold text-slate-900 uppercase tracking-wide mb-1.5">
                    Wunschtermin / Abgabetag
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1.5">
                    Auch kurzfristige Termine oder Monatsende möglich.
                  </p>
                </div>
              </div>

              {/* Lift toggle */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">Personenaufzug / Lift vorhanden?</div>
                  <div className="text-[11px] text-slate-500">Erleichtert den Materialtransport in höhere Etagen</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setHasLift(true)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                      hasLift
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-white text-slate-600 border-slate-200"
                    }`}
                  >
                    Ja
                  </button>
                  <button
                    type="button"
                    onClick={() => setHasLift(false)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                      !hasLift
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-white text-slate-600 border-slate-200"
                    }`}
                  >
                    Nein
                  </button>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="pt-4 flex items-center justify-between gap-3">
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
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-cyan-600 text-white font-bold text-sm shadow-md transition-colors active:scale-98"
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
                  Geben Sie Ihre E-Mail und/oder Telefonnummer ein. Im nächsten Schritt wird Ihre Preisrichtung sofort berechnet und live angezeigt.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                  {errorMsg}
                </div>
              )}

              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-900 uppercase tracking-wide mb-1.5">
                    Vor- & Nachname <span className="text-slate-400 font-normal">(optional)</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="z. B. Marc Moser"
                      autoComplete="name"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                      E-Mail-Adresse
                    </label>
                    <span className="text-[10px] text-cyan-700 font-semibold">Für schriftliche Offerte</span>
                  </div>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ihre.adresse@beispiel.ch"
                      autoComplete="email"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                      Telefonnummer / Mobile
                    </label>
                    <span className="text-[10px] text-emerald-700 font-semibold">Für WhatsApp / Rückfrage</span>
                  </div>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="079 123 45 67"
                      inputMode="tel"
                      autoComplete="tel"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    * Mindestens eine Kontaktangabe (E-Mail oder Telefon) erforderlich.
                  </p>
                </div>
              </div>

              {/* Privacy badge */}
              <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% diskret nach Schweizer Datenschutzgesetz (revDSG). Keine Werbeanrufe.</span>
              </div>

              {/* Navigation Buttons */}
              <div className="pt-4 flex items-center justify-between gap-3">
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
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-black text-sm shadow-xl shadow-cyan-500/20 active:scale-98 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Berechnung läuft...</span>
                  ) : (
                    <>
                      <span>Preisrichtung jetzt berechnen & freischalten</span>
                      <Sparkles className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* ================= STEP 5: PREISRICHTUNG REVEAL (ERGEBNIS) ================= */}
          {step === 5 && result && (
            <div className="space-y-6 text-center animate-in fade-in zoom-in-95 duration-500">
              {/* Top Success Badge */}
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                  Referenz: {result.referenceNumber}
                </span>

                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-3">
                  Ihre persönliche Preisrichtung
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md mx-auto">
                  Kalkuliert für {currentRoom.rooms} Zimmer in {zip} {city} inklusive 100% Abnahmegarantie.
                </p>
              </div>

              {/* Big Price Reveal Card */}
              <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-cyan-500/30 relative overflow-hidden text-left max-w-xl mx-auto">
                <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-wider font-bold text-cyan-400">
                    Fixpreis-Richtwertrahmen
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-950/80 border border-emerald-700/60 px-2.5 py-0.5 rounded-full">
                    <Sparkles className="w-3 h-3" />
                    <span>Inkl. 8.1% MwSt.</span>
                  </span>
                </div>

                {/* Big Price Highlight */}
                <div className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-1">
                  {formatCHF(result.priceMin)} – {formatCHF(result.priceMax)}
                </div>

                <div className="mt-4 pt-4 border-t border-white/10 text-xs text-slate-300 space-y-2.5">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Geschätzter Aufwand:</span>
                    <span className="font-semibold text-white">ca. {result.hoursMin} – {result.hoursMax} Stunden</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">100% Abnahmegarantie:</span>
                    <span className="font-bold text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4" />
                      Inklusive & vertraglich gesichert
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Übergabebegleitung:</span>
                    <span className="font-semibold text-white">Persönlich vor Ort mit der Verwaltung</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Anfahrtsspesen Bern:</span>
                    <span className="font-semibold text-cyan-300">CHF 0.00 (Kostenlos)</span>
                  </div>
                </div>

                {/* Parameters badge summary */}
                <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-1.5 text-[11px]">
                  <span className="px-2 py-0.5 rounded bg-white/10 text-slate-300">
                    {currentRoom.rooms} Zimmer ({currentRoom.sqmRange})
                  </span>
                  {selectedExtras.map((eId) => {
                    const ex = SITE_CONFIG.pricingEstimates.extras.find((x) => x.id === eId);
                    return ex ? (
                      <span key={eId} className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60">
                        + {ex.name}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>

              {/* Fast Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                <a
                  href={`https://wa.me/${SITE_CONFIG.contact.whatsapp.replace("+", "")}?text=${encodeURIComponent(
                    `Hallo AURA Clean Team, ich habe den Rechner genutzt (Ref: ${result.referenceNumber}) für ${currentRoom.rooms} Zi. in ${zip} ${city}. Richtwert: CHF ${result.priceMin} - ${result.priceMax}. Können wir den Termin besprechen?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors active:scale-98"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Via WhatsApp bestätigen</span>
                </a>

                <a
                  href={`tel:${SITE_CONFIG.contact.phone}`}
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow transition-colors active:scale-98"
                >
                  <Phone className="w-4 h-4 text-cyan-400" />
                  <span>{SITE_CONFIG.contact.phoneDisplay}</span>
                </a>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5 text-cyan-500" />
                <span>Unser Berner Team meldet sich werktags innerhalb von 2 Stunden bei Ihnen.</span>
              </div>

              {/* Recalculate button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Neue Berechnung starten</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}