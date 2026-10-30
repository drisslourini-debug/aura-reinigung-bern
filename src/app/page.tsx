import React from "react";
import Link from "next/link";
import { HeroSection } from "@/components/home/HeroSection";
import { BentoGrid } from "@/components/home/BentoGrid";
import { GuaranteeTimeline } from "@/components/home/GuaranteeTimeline";
import { CostEstimator } from "@/components/home/CostEstimator";
import { BeforeAfterSlider } from "@/components/home/BeforeAfterSlider";
import { RegionalCoverage } from "@/components/home/RegionalCoverage";
import { ArrowRight, Phone, MessageSquare } from "lucide-react";
import { SITE_CONFIG } from "@/config/site.config";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero with WebGL Clean-Sweep & Live Badges */}
      <HeroSection />

      {/* 2. Interactive Instant Cost Estimator */}
      <CostEstimator />

      {/* 3. 2026 Bento Grid of Services */}
      <BentoGrid />

      {/* 4. The 3-Step Guarantee Protocol Timeline */}
      <GuaranteeTimeline />

      {/* 5. Before & After 2.5D Split-Screen Comparison */}
      <BeforeAfterSlider />

      {/* 6. Regional Bern Coverage & Districts */}
      <RegionalCoverage />

      {/* 7. High-Conversion Bottom CTA Banner */}
      <section className="py-20 relative bg-slate-950 text-white overflow-hidden border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-red-600 inline-block" />
            <span>Jetzt Wunschtermin unverbindlich anfragen</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white max-w-2xl mx-auto">
            Bereit für eine stressfreie Wohnungsabgabe in Bern?
          </h2>

          <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Kontaktieren Sie uns noch heute. Wir übernehmen die Reinigung, stehen bei der
            Übergabe physisch neben Ihnen und garantieren Ihnen die mängelfreie Abnahme.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/offerte-anfragen"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-base shadow-xl transition-all active:scale-98"
            >
              <span>Kostenlose Offerte anfordern</span>
              <ArrowRight className="w-5 h-5 text-slate-900" />
            </Link>

            <a
              href={`tel:${SITE_CONFIG.contact.phone}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-base border border-slate-800 transition-colors"
            >
              <Phone className="w-4 h-4 text-slate-300" />
              <span>{SITE_CONFIG.contact.phoneDisplay}</span>
            </a>

            <a
              href={`https://wa.me/${SITE_CONFIG.contact.whatsapp.replace("+", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-base shadow-md transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
