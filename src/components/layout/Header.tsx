"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Phone,
  ShieldCheck,
  Calculator,
  Menu,
  X,
  ArrowRight,
  MessageSquare,
  Sparkles,
  Home,
  Building2,
  Clock,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { SITE_CONFIG } from "@/config/site.config";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/60 py-2.5 sm:py-3"
          : "bg-transparent py-3.5 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo showTagline={!isScrolled} />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-700">
            <Link
              href="/dienstleistungen"
              className="hover:text-cyan-600 transition-colors py-1"
            >
              Dienstleistungen
            </Link>
            <Link
              href="/#garantie"
              className="hover:text-slate-900 transition-colors flex items-center gap-1.5 py-1"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Abnahmegarantie</span>
            </Link>
            <Link
              href="/#rechner"
              className="hover:text-slate-900 transition-colors flex items-center gap-1.5 py-1"
            >
              <Calculator className="w-4 h-4 text-slate-700" />
              <span>Kostenrechner</span>
            </Link>
            <Link
              href="/ueber-uns"
              className="hover:text-slate-900 transition-colors py-1"
            >
              Über uns
            </Link>
            <Link
              href="/kontakt"
              className="hover:text-slate-900 transition-colors py-1"
            >
              Kontakt
            </Link>
          </nav>

          {/* Action Buttons (Desktop) */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href={`tel:${SITE_CONFIG.contact.phone}`}
              className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors px-3 py-2 rounded-lg hover:bg-slate-100/60"
            >
              <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
              <span>{SITE_CONFIG.contact.phoneDisplay}</span>
            </a>

            <Link
              href="/offerte-anfragen"
              className="inline-flex items-center gap-2 text-sm font-medium text-white bg-slate-900 hover:bg-cyan-600 px-5 py-2.5 rounded-xl shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Offerte anfragen</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={`tel:${SITE_CONFIG.contact.phone}`}
              aria-label="Telefon anrufen"
              className="p-2.5 rounded-xl text-cyan-700 bg-cyan-50 border border-cyan-200/60 active:scale-95 transition-transform"
            >
              <Phone className="w-4 h-4" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-800 bg-slate-100/80 active:scale-95 transition-transform border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900"
              aria-label={mobileMenuOpen ? "Menü schliessen" : "Menü öffnen"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Mobile Navigation Sheet */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
          className="lg:hidden fixed inset-0 top-[60px] sm:top-[68px] z-50 bg-slate-950/40 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div className="bg-white/95 backdrop-blur-2xl border-b border-slate-200/80 max-h-[calc(100vh-60px)] overflow-y-auto px-5 pt-4 pb-12 shadow-2xl space-y-5">
            {/* Direct Contact Bar */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href={`tel:${SITE_CONFIG.contact.phone}`}
                className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-slate-900 text-white font-bold text-xs shadow"
              >
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>{SITE_CONFIG.contact.phoneDisplay}</span>
              </a>
              <a
                href={`https://wa.me/${SITE_CONFIG.contact.whatsapp.replace("+", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Chat</span>
              </a>
            </div>

            {/* Quick Navigation Links */}
            <nav className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
              <Link
                href="/dienstleistungen"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3.5 text-sm font-bold text-slate-800 active:bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span>Alle Dienstleistungen</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/#garantie"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3.5 text-sm font-bold text-slate-800 active:bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span>100% Abnahmegarantie</span>
                </div>
                <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  Garantie
                </span>
              </Link>

              <Link
                href="/#rechner"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3.5 text-sm font-bold text-slate-800 active:bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Calculator className="w-4 h-4" />
                  </div>
                  <span>Online Fixpreis-Rechner</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/ueber-uns"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3.5 text-sm font-bold text-slate-800 active:bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                    <Home className="w-4 h-4" />
                  </div>
                  <span>Über unser Familienunternehmen</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/kontakt"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3.5 text-sm font-bold text-slate-800 active:bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <span>Kontakt & Einsatzgebiet Bern</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
            </nav>

            {/* Quick Response Badge */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3 text-xs text-slate-700">
              <Clock className="w-4 h-4 text-slate-900 shrink-0" />
              <span>
                <strong>Express-Antwort:</strong> Anfragen werden werktags binnen 2 Stunden beantwortet.
              </span>
            </div>

            {/* Primary Action Button */}
            <Link
              href="/offerte-anfragen"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md active:scale-98 transition-transform"
            >
              <span>Kostenlose Offerte anfordern</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
