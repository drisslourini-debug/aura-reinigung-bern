import React from "react";
import Link from "next/link";
import { HeroSection } from "@/components/home/HeroSection";
import { BentoGrid } from "@/components/home/BentoGrid";
import { GuaranteeTimeline } from "@/components/home/GuaranteeTimeline";
import { CostEstimator } from "@/components/home/CostEstimator";
import { BeforeAfterSlider } from "@/components/home/BeforeAfterSlider";
import { RegionalCoverage } from "@/components/home/RegionalCoverage";
import { ArrowRight, Phone, MessageSquare, ShieldCheck } from "lucide-react";
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
      <section className="py-20 relative bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,210,255,0.15),transparent_50%)]" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Jetzt Termin sichern</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-2xl mx-auto">
            Bereit für eine stressfreie Wohnungsabgabe in Bern?
          </h2>

          <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Kontaktieren Sie uns noch heute. Wir übernehmen die Reinigung, stehen bei der
            Übergabe neben Ihnen und garantieren Ihnen die volle Kaution zurück.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/offerte-anfragen"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 font-bold text-base shadow-xl shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-100"
            >
              <span>Kostenlose Offerte anfordern</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <a
              href={`tel:${SITE_CONFIG.contact.phone}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-base border border-white/20 transition-colors"
            >
              <Phone className="w-4 h-4 text-cyan-400" />
              <span>{SITE_CONFIG.contact.phoneDisplay}</span>
            </a>

            <a
              href={`https://wa.me/${SITE_CONFIG.contact.whatsapp.replace("+", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-emerald-600/80 hover:bg-emerald-600 text-white font-semibold text-base border border-emerald-500/50 transition-colors"
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
