"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, ShieldCheck, Calculator, Menu, X, ArrowRight } from "lucide-react";
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200/60 py-3"
          : "bg-transparent py-5"
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
              className="hover:text-cyan-600 transition-colors flex items-center gap-1.5 py-1"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Abnahmegarantie</span>
            </Link>
            <Link
              href="/#rechner"
              className="hover:text-cyan-600 transition-colors flex items-center gap-1.5 py-1"
            >
              <Calculator className="w-4 h-4 text-cyan-500" />
              <span>Kostenrechner</span>
            </Link>
            <Link
              href="/ueber-uns"
              className="hover:text-cyan-600 transition-colors py-1"
            >
              Über uns
            </Link>
            <Link
              href="/kontakt"
              className="hover:text-cyan-600 transition-colors py-1"
            >
              Kontakt
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href={`tel:${SITE_CONFIG.contact.phone}`}
              className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-cyan-600 transition-colors px-3 py-2 rounded-lg hover:bg-slate-100/60"
            >
              <div className="w-8 h-8 rounded-full bg-cyan-50 text-cyan-600 flex items-center justify-center">
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

          {/* Mobile Menu Toggle Button */}
          <div className="flex sm:hidden items-center gap-2">
            <a
              href={`tel:${SITE_CONFIG.contact.phone}`}
              aria-label="Anrufen"
              className="p-2 rounded-lg text-slate-700 bg-slate-100"
            >
              <Phone className="w-4 h-4 text-cyan-600" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Menü öffnen"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-in fade-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-3">
            <Link
              href="/dienstleistungen"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 text-base font-medium text-slate-800 rounded-lg hover:bg-slate-50"
            >
              Dienstleistungen entdecken
            </Link>
            <Link
              href="/#garantie"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 text-base font-medium text-slate-800 rounded-lg hover:bg-slate-50 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>100% Abnahmegarantie</span>
            </Link>
            <Link
              href="/#rechner"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 text-base font-medium text-slate-800 rounded-lg hover:bg-slate-50 flex items-center gap-2"
            >
              <Calculator className="w-4 h-4 text-cyan-500" />
              <span>Online-Kostenrechner</span>
            </Link>
            <Link
              href="/ueber-uns"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 text-base font-medium text-slate-800 rounded-lg hover:bg-slate-50"
            >
              Über unser Familienunternehmen
            </Link>
            <Link
              href="/kontakt"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 text-base font-medium text-slate-800 rounded-lg hover:bg-slate-50"
            >
              Kontakt & Notfallservice
            </Link>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <Link
                href="/offerte-anfragen"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center font-medium text-white bg-slate-900 py-3 rounded-xl shadow-md"
              >
                Kostenlose Offerte anfragen
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
