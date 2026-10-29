import React, { Suspense } from "react";
import type { Metadata } from "next";
import { QuotationFunnel } from "@/components/funnel/QuotationFunnel";
import { ShieldCheck, Clock, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Offerte anfragen | AURA Clean Bern",
  description: "Erhalten Sie in wenigen Schritten Ihre transparente Fixpreis-Offerte für Umzugsreinigung, Hauswartung oder Unterhaltsreinigung in Bern. Unverbindlich & diskret.",
  alternates: {
    canonical: "/offerte-anfragen",
  },
  openGraph: {
    title: "Offerte anfragen | AURA Clean Bern",
    description: "Online-Rechner & Offerten-Assistent für Reinigungen im Grossraum Bern mit 100% Abnahmegarantie.",
    url: "https://aura-reinigung-bern.vercel.app/offerte-anfragen",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "AURA Clean Offerte anfragen" }],
  },
};

export default function OfferteAnfragenPage() {
  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-slate-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-red-600 inline-block" />
            <span>Offerten-Assistent • Dauert ca. 2 Minuten</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
            Ihre massgeschneiderte Offerte
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Erfassen Sie Ihre Anforderungen. Sie erhalten direkt eine verlässliche Preisrichtung und werktags innerhalb von 2 Stunden
            ein verbindliches Festpreisangebot mit Schweizer Abnahmegarantie.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-700">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Abnahmegarantie</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Verbindlicher Fixpreis</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>revDSG Datenschutzkonform</span>
            </div>
          </div>
        </div>

        {/* Funnel inside Suspense */}
        <Suspense
          fallback={
            <div className="bg-white border border-slate-200 shadow-sm p-12 text-center rounded-2xl text-slate-500 text-sm">
              Lade interaktiven Offerten-Assistenten...
            </div>
          }
        >
          <QuotationFunnel />
        </Suspense>
      </div>
    </div>
  );
}
