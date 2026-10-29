import React from "react";
import type { Metadata } from "next";
import { SITE_CONFIG } from "@/config/site.config";

export const metadata: Metadata = {
  title: "Datenschutzerklärung (revDSG) | AURA Clean Bern",
  description: "Datenschutzerklärung von AURA Clean Bern nach dem Schweizer Bundesgesetz über den Datenschutz (revDSG).",
  alternates: {
    canonical: "/datenschutz",
  },
};

export default function DatenschutzPage() {
  return (
    <div className="pt-32 pb-24 bg-ambient-glow min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Datenschutzerklärung
        </h1>

        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-200/80 space-y-6 text-sm text-slate-700 leading-relaxed">
          <p className="text-xs text-slate-400">
            Stand: {new Date().toLocaleDateString("de-CH")} – Konform gemäss Schweizer Datenschutzgesetz (revDSG).
          </p>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">1. Allgemeine Hinweise</h2>
            <p>
              Gestützt auf Artikel 13 der schweizerischen Bundesverfassung und die datenschutzrechtlichen Bestimmungen der Schweizerischen Eidgenossenschaft (Bundesgesetz über den Datenschutz, DSG) hat jede Person Anspruch auf Schutz ihrer Privatsphäre sowie auf Schutz vor Missbrauch ihrer persönlichen Daten. Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">2. Verantwortliche Stelle</h2>
            <p>
              Verantwortlich für die Datenbearbeitung auf dieser Website ist:<br />
              <strong>{SITE_CONFIG.brand.legalName}</strong><br />
              {SITE_CONFIG.contact.address.street}<br />
              {SITE_CONFIG.contact.address.zip} {SITE_CONFIG.contact.address.city}<br />
              E-Mail: {SITE_CONFIG.contact.email}
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">3. Erhebung und Bearbeitung von Personendaten</h2>
            <p>
              Wenn Sie über unser Offertenformular oder per E-Mail Kontakt mit uns aufnehmen, werden die von Ihnen mitgeteilten Daten (wie z. B. Name, E-Mail-Adresse, Telefonnummer, Angaben zum Reinigungsobjekt, PLZ und Terminwünsche) von uns gespeichert, um Ihre Offerte zu berechnen, Ihre Anfrage zu beantworten und allfällige Rückfragen zu klären.
            </p>
            <p>
              Diese Daten geben wir in keinem Fall ohne Ihre ausdrückliche Einwilligung an unbefugte Dritte weiter. Die Datenverarbeitung erfolgt ausschliesslich zweckgebunden zur Erfüllung unserer vertraglichen oder vorvertraglichen Pflichten.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">4. Datensicherheit (SSL/TLS-Verschlüsselung)</h2>
            <p>
              Diese Seite nutzt aus Gründen der Sicherheit und zum Schutz der Übertragung vertraulicher Inhalte eine moderne SSL-/TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von "http://" auf "https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">5. Rechte der betroffenen Person</h2>
            <p>
              Sie haben im Rahmen des geltenden Datenschutzrechts das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema Personendaten können Sie sich jederzeit an die im Impressum angegebene Adresse wenden.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
