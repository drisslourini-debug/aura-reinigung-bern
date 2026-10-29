"use client";

import React from "react";
import Link from "next/link";
import { Phone, MessageSquare, Calculator } from "lucide-react";
import { SITE_CONFIG } from "@/config/site.config";

export function MobileActionDock() {
  return (
    <aside
      aria-label="Schnellzugriff"
      className="sm:hidden fixed bottom-3 left-3 right-3 z-50 pointer-events-auto"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="bg-slate-950/95 backdrop-blur-xl border border-white/15 rounded-2xl p-2 shadow-2xl shadow-slate-950/80 flex items-center justify-between gap-2">
        {/* Call Button */}
        <a
          href={`tel:${SITE_CONFIG.contact.phone}`}
          className="flex-1 flex items-center justify-center gap-1.5 py-3 px-2 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 transition-all text-white text-xs font-semibold"
          aria-label="Jetzt anrufen"
        >
          <div className="w-6 h-6 rounded-lg bg-white/15 text-white flex items-center justify-center">
            <Phone className="w-3.5 h-3.5" />
          </div>
          <span>Anrufen</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${SITE_CONFIG.contact.whatsapp.replace("+", "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-3 px-2 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 transition-all text-white text-xs font-semibold"
          aria-label="Via WhatsApp schreiben"
        >
          <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <MessageSquare className="w-3.5 h-3.5" />
          </div>
          <span>WhatsApp</span>
        </a>

        {/* Calculator / Offerte Button */}
        <Link
          href="/offerte-anfragen"
          className="flex-[1.2] flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-white text-slate-950 hover:bg-slate-100 active:scale-95 transition-all text-xs font-bold shadow-lg"
          aria-label="Offerte anfragen"
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>Offerte</span>
        </Link>
      </div>
    </aside>
  );
}
