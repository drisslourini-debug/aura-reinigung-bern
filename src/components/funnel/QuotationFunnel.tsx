"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Sparkles,
  Building2,
  Home,
  Sun,
  Briefcase,
  Check,
  Calendar,
  MapPin,
  User,
  Phone,
  Mail,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site.config";
import { submitQuotationLead } from "@/app/actions/leadActions";
import { formatCHF } from "@/lib/utils";

const SERVICES_OPTIONS = [
  { id: "umzug", label: "Umzugsreinigung (100% Abnahmegarantie)", icon: Sparkles },
  { id: "unterhalt", label: "Unterhaltsreinigung (Wohnung / Haus)", icon: Home },
  { id: "hauswartung", label: "Liegenschaftsservice & Hauswartung", icon: Building2 },
  { id: "fenster", label: "Fenster- & Storenreinigung", icon: Sun },
  { id: "gewerbe", label: "Büro- & Praxisreinigung", icon: Briefcase },
  { id: "spezial", label: "Baureinigung / Spezialreinigung", icon: Sparkles },
];

export function QuotationFunnel() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; ref?: string; message: string } | null>(null);

  // Form state
  const [selectedService, setSelectedService] = useState("umzug");
  const [rooms, setRooms] = useState("3.5");
  const [extras, setExtras] = useState<string[]>(["lamellen", "balkon"]);
  const [desiredDate, setDesiredDate] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("Bern");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [dsgConsent, setDsgConsent] = useState(true);

  // Read URL params if passed from home estimator
  useEffect(() => {
    const s = searchParams.get("service");
    const r = searchParams.get("rooms");
    const e = searchParams.get("extras");
    if (s) setSelectedService(s);
    if (r) setRooms(r);
    if (e) setExtras(e.split(","));
  }, [searchParams]);

  const toggleExtra = (id: string) => {
    setExtras((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const calculatedEstimate = React.useMemo(() => {
    const roomObj = SITE_CONFIG.pricingEstimates.umzug.find((item) => item.rooms === rooms) || SITE_CONFIG.pricingEstimates.umzug[2];
    const extrasCost = extras.reduce((sum, extraId) => {
      const extra = SITE_CONFIG.pricingEstimates.extras.find((e) => e.id === extraId);
      return sum + (extra ? extra.surcharge : 0);
    }, 0);

    const min = roomObj.basePriceMin + extrasCost;
    const max = roomObj.basePriceMax + extrasCost;
    return `${formatCHF(min)} – ${formatCHF(max)}`;
  }, [rooms, extras]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !zip) {
      alert("Bitte füllen Sie alle Pflichtfelder aus.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitQuotationLead({
        service: selectedService,
        rooms: selectedService === "umzug" ? rooms : undefined,
        extras: extras,
        date: desiredDate,
        zip,
        city,
        fullName,
        email,
        phone,
        notes,
        estimatedPriceRange: selectedService === "umzug" ? calculatedEstimate : undefined,
      });

      if (res.success) {
        setResult({ success: true, ref: res.referenceNumber, message: res.message });
      } else {
        alert(res.message);
      }
    } catch {
      alert("Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder rufen Sie uns direkt an.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (result?.success) {
    return (
      <div className="glass-panel max-w-2xl mx-auto rounded-3xl p-8 sm:p-12 text-center shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
          Referenz: {result.ref}
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
          Anfrage erfolgreich übermittelt!
        </h2>
        <p className="mt-3 text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
          {result.message}
        </p>

        <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-200/80 text-left text-xs space-y-2 max-w-md mx-auto">
          <div className="font-bold text-slate-800 text-sm mb-2 border-b border-slate-200 pb-1">
            Ihre Anfragedaten:
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Service:</span>
            <span className="font-semibold text-slate-800">{selectedService}</span>
          </div>
          {selectedService === "umzug" && (
            <div className="flex justify-between">
              <span className="text-slate-500">Objekt:</span>
              <span className="font-semibold text-slate-800">{rooms} Zimmer ({calculatedEstimate})</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-slate-500">Einsatzort:</span>
            <span className="font-semibold text-slate-800">{zip} {city}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Kontakt:</span>
            <span className="font-semibold text-slate-800">{fullName} ({phone})</span>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={`tel:${SITE_CONFIG.contact.phone}`}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 text-white font-medium text-xs hover:bg-slate-800 transition-colors"
          >
            Direkt anrufen: {SITE_CONFIG.contact.phoneDisplay}
          </a>
          <a
            href={`https://wa.me/${SITE_CONFIG.contact.whatsapp.replace("+", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 text-white font-medium text-xs hover:bg-emerald-700 transition-colors"
          >
            Via WhatsApp chatten
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel max-w-3xl mx-auto rounded-3xl p-6 sm:p-10 shadow-2xl relative">
      {/* Step Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2">
          <span>Schritt {step} von 4</span>
          <span>
            {step === 1 && "Dienstleistung"}
            {step === 2 && "Objekt & Umfang"}
            {step === 3 && "Termin & Ort"}
            {step === 4 && "Kontaktdaten"}
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-emerald-500 transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Service Selection */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                Welche Reinigungsdienstleistung benötigen Sie?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Wählen Sie die gewünschte Hauptkategorie aus.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SERVICES_OPTIONS.map((srv) => {
                const Icon = srv.icon;
                const isSelected = selectedService === srv.id;
                return (
                  <button
                    key={srv.id}
                    type="button"
                    onClick={() => setSelectedService(srv.id)}
                    className={`p-4 rounded-2xl border text-left flex items-start gap-3.5 transition-all duration-150 ${
                      isSelected
                        ? "bg-cyan-50/70 border-cyan-500 shadow-sm"
                        : "bg-white/80 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "bg-cyan-500 text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                        {srv.label}
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
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white text-xs sm:text-sm font-bold hover:bg-cyan-600 transition-all"
              >
                <span>Weiter zu Schritt 2</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Object Details */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                Angaben zum Objekt
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Damit wir den Personal- und Materialaufwand genau kalkulieren können.
              </p>
            </div>

            {selectedService === "umzug" ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Zimmeranzahl
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {SITE_CONFIG.pricingEstimates.umzug.map((item) => (
                      <button
                        key={item.rooms}
                        type="button"
                        onClick={() => setRooms(item.rooms)}
                        className={`py-3 rounded-xl border text-center text-xs font-bold transition-all ${
                          rooms === item.rooms
                            ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                            : "bg-white border-slate-200 text-slate-700 hover:border-cyan-300"
                        }`}
                      >
                        {item.rooms} Zi.
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Zusatzbereiche (Extras)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {SITE_CONFIG.pricingEstimates.extras.map((extra) => {
                      const isChecked = extras.includes(extra.id);
                      return (
                        <button
                          key={extra.id}
                          type="button"
                          onClick={() => toggleExtra(extra.id)}
                          className={`p-3 rounded-xl border text-left text-xs flex items-center justify-between ${
                            isChecked
                              ? "bg-cyan-50/70 border-cyan-400 text-slate-900 font-semibold"
                              : "bg-white border-slate-200 text-slate-600"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-4 h-4 rounded flex items-center justify-center border ${
                                isChecked
                                  ? "bg-cyan-500 border-cyan-500 text-white"
                                  : "border-slate-300 bg-white"
                              }`}
                            >
                              {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span>{extra.name}</span>
                          </div>
                          <span className="text-slate-400 font-mono text-[11px]">
                            +{extra.surcharge}.-
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Estimate Preview Pill */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-50 to-emerald-50 border border-cyan-200/80 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-slate-500 uppercase font-semibold">
                      Orientierungs-Fixpreisrahmen
                    </div>
                    <div className="text-lg font-extrabold text-slate-900">
                      {calculatedEstimate}
                    </div>
                  </div>
                  <div className="text-right text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Inkl. 100% Abnahmegarantie</span>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Ungefähre Wohn- / Nutzfläche in m²
                </label>
                <input
                  type="text"
                  placeholder="z. B. 120 m² oder 4 Stockwerke"
                  value={rooms}
                  onChange={(e) => setRooms(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>
            )}

            <div className="pt-4 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Zurück</span>
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white text-xs sm:text-sm font-bold hover:bg-cyan-600 transition-all"
              >
                <span>Weiter zu Schritt 3</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Date & Location */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                Termin & Einsatzort im Kanton Bern
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Wann und wo soll die Reinigung oder Wohnungsabgabe stattfinden?
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-cyan-600" />
                  <span>Wunschtermin / Abnahmedatum</span>
                </label>
                <input
                  type="date"
                  value={desiredDate}
                  onChange={(e) => setDesiredDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-600" />
                  <span>PLZ & Ort</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    autoComplete="postal-code"
                    placeholder="PLZ"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    required
                    className="px-3 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 min-h-[48px]"
                  />
                  <input
                    type="text"
                    autoComplete="address-level2"
                    placeholder="Ort (z.B. Bern, Köniz, Thun)"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    className="col-span-2 px-3 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 min-h-[48px]"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Besondere Hinweise oder Wünsche (optional)
              </label>
              <textarea
                rows={3}
                placeholder="z. B. Stockwerk mit Lift, Haustiere im Haushalt, stark verkalkte Duschwand, Schlüsselübergabe via Tresor etc."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            <div className="pt-4 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Zurück</span>
              </button>
              <button
                type="button"
                onClick={() => setStep(4)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white text-xs sm:text-sm font-bold hover:bg-cyan-600 transition-all"
              >
                <span>Weiter zu Kontaktdaten</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Contact & Submission */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                Wohin dürfen wir die Offerte senden?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Wir behandeln Ihre Daten vertraulich nach Schweizer revDSG.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-cyan-600" />
                  <span>Vorname & Nachname *</span>
                </label>
                <input
                  type="text"
                  autoComplete="name"
                  placeholder="z. B. Sandra Gerber"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 min-h-[48px]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-cyan-600" />
                    <span>Telefonnummer (für Rückfragen) *</span>
                  </label>
                  <input
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="079 123 45 67"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 min-h-[48px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-cyan-600" />
                    <span>E-Mail-Adresse *</span>
                  </label>
                  <input
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    autoCapitalize="none"
                    placeholder="sandra.gerber@beispiel.ch"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 min-h-[48px]"
                  />
                </div>
              </div>

              {/* revDSG consent checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dsgConsent}
                    onChange={(e) => setDsgConsent(e.target.checked)}
                    required
                    className="mt-1 rounded text-cyan-600 focus:ring-cyan-400"
                  />
                  <span className="text-xs text-slate-500">
                    Ich stimme der Verarbeitung meiner Angaben zur Erstellung einer
                    unverbindlichen Offerte gemäss der{" "}
                    <a href="/datenschutz" className="underline hover:text-cyan-600">
                      Datenschutzerklärung (revDSG)
                    </a>{" "}
                    zu. Keine Weitergabe an Dritte.
                  </span>
                </label>
              </div>
            </div>

            <div className="pt-4 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Zurück</span>
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-600 hover:from-cyan-400 hover:to-emerald-500 text-white text-xs sm:text-sm font-bold shadow-lg transition-all disabled:opacity-50"
              >
                <span>{isSubmitting ? "Wird übermittelt..." : "Kostenlose Offerte anfordern"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
