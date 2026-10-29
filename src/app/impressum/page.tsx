import React from "react";
import type { Metadata } from "next";
import { SITE_CONFIG } from "@/config/site.config";

export const metadata: Metadata = {
  title: "Impressum | AURA Clean Bern",
  description: "Rechtliche Pflichtangaben und Impressum von AURA Clean Bern nach Schweizer Recht.",
};

export default function ImpressumPage() {
  return (
    <div className="pt-32 pb-24 bg-ambient-glow min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Impressum
        </h1>

        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-200/80 space-y-6 text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">Verantwortliche Instanz</h2>
            <p>
              {SITE_CONFIG.brand.legalName}<br />
              {SITE_CONFIG.brand.founders}<br />
              {SITE_CONFIG.contact.address.street}<br />
              {SITE_CONFIG.contact.address.zip} {SITE_CONFIG.contact.address.city}<br />
              {SITE_CONFIG.contact.address.country}
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">Kontakt</h2>
            <p>
              Telefon: {SITE_CONFIG.contact.phoneDisplay}<br />
              E-Mail: {SITE_CONFIG.contact.email}
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">Unternehmensidentifikation & Mehrwertsteuer</h2>
            <p>
              Handelsregister: Kanton Bern (in Gründung / Eintragung)<br />
              UID / MWST: CHE-xxx.xxx.xxx MWST (wird nach definitiver Registrierung hinterlegt)
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">Berufshaftpflichtversicherung</h2>
            <p>
              Haftpflichtversicherung für Sach- und Personenschäden bis zu einer Deckungssumme von CHF 5'000'000.- bei einer führenden Schweizer Versicherungsgesellschaft.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">Haftungsausschluss</h2>
            <p>
              Der Autor übernimmt keine Gewähr bezüglich der inhaltlichen Korrektheit, Exaktheit, Aktualität, Zuverlässigkeit und Vollständigkeit der Informationen. Haftungsansprüche gegen den Autor wegen Schäden materieller oder immaterieller Art, welche aus dem Zugriff oder der Nutzung bzw. Nichtnutzung der veröffentlichten Informationen entstehen, werden ausgeschlossen.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">Urheberrechte</h2>
            <p>
              Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder anderen Dateien auf der Website gehören ausschliesslich {SITE_CONFIG.brand.name} oder den speziell genannten Rechtsinhabern. Für die Reproduktion jeglicher Elemente ist die schriftliche Zustimmung im Voraus einzuholen.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
