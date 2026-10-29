import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SERVICES, ServiceItem } from "@/config/services.config";
import { SITE_CONFIG } from "@/config/site.config";
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Phone,
  HelpCircle,
  FileCheck,
  Sparkles,
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return { title: "Dienstleistung nicht gefunden | AURA Clean Bern" };

  return {
    title: `${service.title} | AURA Clean Bern`,
    description: `${service.headline} ${service.shortDescription}`,
    keywords: [
      service.title,
      `${service.title} Bern`,
      "Reinigungsfirma Bern",
      "Abnahmegarantie Bern",
    ],
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="pt-32 pb-24 bg-ambient-glow min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Service Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold uppercase tracking-wider">
            <span>{service.category}</span>
            <span className="text-cyan-300">|</span>
            <span>{service.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            {service.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {service.headline}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/offerte-anfragen?service=${service.slug}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-cyan-600 text-white font-bold text-sm shadow-md transition-colors"
            >
              <span>Offerte für diesen Service anfragen</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={`tel:${SITE_CONFIG.contact.phone}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-slate-800 font-semibold text-sm border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <Phone className="w-4 h-4 text-cyan-600" />
              <span>{SITE_CONFIG.contact.phoneDisplay}</span>
            </a>
          </div>
        </div>

        {/* Guarantee Banner */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border-l-4 border-l-emerald-500 bg-gradient-to-r from-emerald-50/50 via-white to-cyan-50/30 flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Unser verbindliches Leistungsversprechen
            </div>
            <div className="text-base sm:text-lg font-bold text-slate-900 mt-1">
              {service.guaranteeText}
            </div>
          </div>
        </div>

        {/* USPs Grid */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-500" />
            <span>Ihre Vorteile bei AURA Clean Bern</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {service.usps.map((usp, idx) => (
              <div
                key={idx}
                className="glass-panel p-5 rounded-2xl flex items-start gap-3 border border-slate-200/80"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-slate-800">{usp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Checklist */}
        <div className="space-y-8">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-cyan-500" />
              <span>Detaillierter Leistungsumfang (Checkliste)</span>
            </h2>
            <p className="text-sm text-slate-600">
              Jeder Punkt wird von unserem Team gewissenhaft abgearbeitet und kontrolliert.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.checklist.map((group, idx) => (
              <div
                key={idx}
                className="glass-panel p-6 rounded-2xl border border-slate-200/80 space-y-3"
              >
                <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
                  {group.category}
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {group.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0 mt-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs for this Service */}
        {service.faqs.length > 0 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-cyan-500" />
                <span>Häufige Fragen zu diesem Service</span>
              </h2>
              <p className="text-sm text-slate-600">
                Transparente Antworten für eine reibungslose Planung.
              </p>
            </div>

            <div className="space-y-4">
              {service.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="glass-panel p-6 rounded-2xl border border-slate-200/80 space-y-2"
                >
                  <h3 className="text-base font-bold text-slate-900">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="glass-panel p-8 sm:p-10 rounded-3xl text-center bg-slate-900 text-white space-y-4 shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Offerte für {service.title} erhalten
          </h2>
          <p className="text-slate-300 text-sm max-w-lg mx-auto">
            Teilen Sie uns Ihre Eckdaten mit. Sie erhalten werktags innerhalb von 2 Stunden
            ein verbindliches Festpreisangebot.
          </p>
          <div className="pt-2">
            <Link
              href={`/offerte-anfragen?service=${service.slug}`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 font-bold text-sm hover:scale-105 transition-all shadow-lg"
            >
              <span>Jetzt kostenlose Offerte berechnen</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
