import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="pt-40 pb-32 bg-ambient-glow min-h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-cyan-50 text-cyan-600 flex items-center justify-center mx-auto border border-cyan-200">
          <Sparkles className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight">
            404
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
            Seite nicht gefunden
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            Die von Ihnen gesuchte Seite existiert leider nicht oder wurde verschoben.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-cyan-600 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Zurück zur Startseite</span>
          </Link>
          <Link
            href="/dienstleistungen"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors"
          >
            <span>Dienstleistungen</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
