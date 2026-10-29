import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SERVICES } from "@/config/services.config";
import { ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Dienstleistungen & Services | AURA Clean Bern",
  description: "Entdecken Sie unser breites Reinigungsportfolio in Bern: Umzugsreinigungen mit Abnahmegarantie, Unterhaltsreinigungen, Hauswartungen, Fensterreinigung und Bauservice.",
  alternates: {
    canonical: "/dienstleistungen",
  },
  openGraph: {
    title: "Dienstleistungen & Services | AURA Clean Bern",
    description: "Umzugsreinigungen mit Abnahmegarantie, Unterhalt, Hauswartung und Fensterreinigung im Grossraum Bern.",
    url: "https://aura-reinigung-bern.vercel.app/dienstleistungen",
    images: [{ url: "/images/service-umzug.jpg", width: 1200, height: 630, alt: "AURA Clean Dienstleistungen" }],
  },
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
          {SERVICES.map((s) => (
            <div
              key={s.slug}
              className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-200/80 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Visual Thumbnail */}
                <div className="lg:col-span-4 relative h-56 sm:h-64 lg:h-full min-h-[220px] rounded-2xl overflow-hidden shadow-sm">
                  <Image
                    src={s.image}
                    alt={s.heroImageDesc}
                    fill
                    className="object-cover object-center hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-900 text-[11px] font-bold shadow">
                      {s.badge}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-5 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-[11px] font-semibold">
                      {s.category}
                    </span>
                    {s.popular && (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        Sehr gefragt
                      </span>
                    )}
                  </div>

                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    {s.title}
                  </h2>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {s.shortDescription}
                  </p>

                  <div className="space-y-1.5 pt-2">
                    {s.usps.slice(0, 3).map((usp, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{usp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="lg:col-span-3 flex flex-col gap-2.5 lg:items-end justify-center pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                  <Link
                    href={`/dienstleistungen/${s.slug}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-cyan-600 text-white font-bold text-xs transition-colors shadow-sm"
                  >
                    <span>Checkliste & Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={`/offerte-anfragen?service=${s.slug}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs border border-slate-200 transition-colors"
                  >
                    <span>Offerte kalkulieren</span>
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
