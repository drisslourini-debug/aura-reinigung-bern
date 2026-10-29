import React from "react";
import type { Metadata } from "next";
import { Phone, Mail, Clock, MapPin, MessageSquare, ShieldCheck } from "lucide-react";
import { SITE_CONFIG } from "@/config/site.config";

export const metadata: Metadata = {
  title: "Kontakt & Einsatzgebiet Bern | AURA Clean Bern",
  description: "Kontaktieren Sie AURA Clean Bern für kostenlose Offerten, Notfallreinigungen oder Besichtigungstermine im Grossraum Bern. Telefon, WhatsApp & E-Mail.",
  alternates: {
    canonical: "/kontakt",
  },
  openGraph: {
    title: "Kontakt & Einsatzgebiet Bern | AURA Clean Bern",
    description: "Direkter Kontakt zu AURA Clean Bern. Telefonisch erreichbar Mo-Sa von 07:00 - 19:00 Uhr.",
    url: "https://aura-reinigung-bern.vercel.app/kontakt",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "AURA Clean Bern Kontakt" }],
  },
};

export default function KontaktPage() {
  return (
    <div className="pt-32 pb-24 bg-ambient-glow min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold uppercase tracking-wider">
            <span>Direkter Draht</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Wir sind für Sie da.
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Haben Sie Fragen zur Wohnungsabnahme, möchten Sie einen Besichtigungstermin
            für eine Liegenschaft vereinbaren oder brauchen Sie sofortige Unterstützung?
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Phone */}
          <div className="glass-panel p-8 rounded-3xl border border-slate-200/80 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mx-auto">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Telefonisch erreichbar
              </div>
              <a
                href={`tel:${SITE_CONFIG.contact.phone}`}
                className="text-xl font-extrabold text-slate-900 hover:text-cyan-600 transition-colors block mt-1"
              >
                {SITE_CONFIG.contact.phoneDisplay}
              </a>
              <p className="text-xs text-slate-500 mt-1">
                Mo – Sa: 07:00 – 19:00 Uhr
              </p>
            </div>
          </div>

          {/* Card 2: WhatsApp */}
          <div className="glass-panel p-8 rounded-3xl border border-slate-200/80 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                WhatsApp Chat
              </div>
              <a
                href={`https://wa.me/${SITE_CONFIG.contact.whatsapp.replace("+", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl font-extrabold text-emerald-600 hover:text-emerald-700 transition-colors block mt-1"
              >
                {SITE_CONFIG.contact.whatsappDisplay}
              </a>
              <p className="text-xs text-slate-500 mt-1">
                Fotos & Grundrisse schnell senden
              </p>
            </div>
          </div>

          {/* Card 3: Email */}
          <div className="glass-panel p-8 rounded-3xl border border-slate-200/80 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center mx-auto">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Schriftliche Anfrage
              </div>
              <a
                href={`mailto:${SITE_CONFIG.contact.email}`}
                className="text-lg font-bold text-slate-900 hover:text-cyan-600 transition-colors block mt-1"
              >
                {SITE_CONFIG.contact.email}
              </a>
              <p className="text-xs text-slate-500 mt-1">
                Antwort werktags binnen 2 Std.
              </p>
            </div>
          </div>
        </div>

        {/* Operating Area Details */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-200/80 space-y-6">
          <div className="flex items-center gap-2.5 text-cyan-600 text-sm font-bold uppercase tracking-wider">
            <MapPin className="w-4 h-4" />
            <span>Unser Einsatzgebiet im Kanton Bern</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Vor Ort in Stadt und Region Bern
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-medium text-slate-700">
            {SITE_CONFIG.regions.map((reg, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500" />
                <span>{reg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
