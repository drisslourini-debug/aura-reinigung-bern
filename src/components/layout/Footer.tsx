import React from "react";
import Link from "next/link";
import { ShieldCheck, MapPin, Phone, Mail, Clock, CheckCircle2 } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { SITE_CONFIG } from "@/config/site.config";
import { SERVICES } from "@/config/services.config";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-24 sm:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Philosophy */}
          <div className="md:col-span-2 lg:col-span-2 space-y-4">
            <div className="bg-white/5 p-3 rounded-2xl inline-block border border-white/10">
              <Logo variant="dark" showTagline={true} />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {SITE_CONFIG.brand.subTagline} Als eingespielter Berner Familienbetrieb
              stehen wir für kompromisslose Schweizer Sauberkeit, persönliche Betreuung
              und verbindliche Fixpreise.
            </p>

            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{SITE_CONFIG.trust.abnahmegarantie}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-slate-300 shrink-0" />
                <span>{SITE_CONFIG.trust.insurance}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{SITE_CONFIG.trust.workStandards}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Dienstleistungen
            </h4>
            <ul className="space-y-2 text-sm">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/dienstleistungen/${s.slug}`}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Einzugsgebiet Bern */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span>Einsatzgebiet</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {SITE_CONFIG.regions.map((reg, idx) => (
                <li key={idx} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500 shrink-0" />
                  <span>{reg}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Hours */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Direktkontakt
            </h4>
            <div className="space-y-3 text-sm text-slate-400">
              <a
                href={`tel:${SITE_CONFIG.contact.phone}`}
                className="flex items-center gap-2.5 text-white hover:text-slate-200 transition-colors font-medium"
              >
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{SITE_CONFIG.contact.phoneDisplay}</span>
              </a>

              <a
                href={`mailto:${SITE_CONFIG.contact.email}`}
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{SITE_CONFIG.contact.email}</span>
              </a>

              <div className="flex items-start gap-2.5 text-xs text-slate-400 pt-1">
                <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>{SITE_CONFIG.contact.hours}</span>
              </div>

              <div className="pt-2">
                <Link
                  href="/offerte-anfragen"
                  className="inline-block w-full text-center text-xs font-bold py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors shadow-sm"
                >
                  Online Offerte starten
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Legal & revDSG */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} {SITE_CONFIG.brand.name}. Alle Rechte vorbehalten.
          </p>

          <div className="flex items-center gap-6">
            <Link href="/impressum" className="hover:text-slate-300 transition-colors">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-slate-300 transition-colors">
              Datenschutz (revDSG)
            </Link>
            <span className="text-slate-600">|</span>
            <span className="text-emerald-400/90 font-medium flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              100% Swiss Compliance
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
