import React from "react";
import Link from "next/link";
import { Home, ShieldAlert } from "lucide-react";

export default function NotFound() {
  return (
    <div className="pt-40 pb-32 bg-slate-50 min-h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-white text-slate-900 flex items-center justify-center mx-auto border border-slate-200 shadow-sm">
          <ShieldAlert className="w-8 h-8 text-slate-800" />
        </div>

        <div className="space-y-2">
          <div className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight font-mono">
            404
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            Seite nicht gefunden
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Die von Ihnen aufgerufene Adresse existiert nicht oder wurde im Rahmen unserer Strukturaktualisierung verschoben.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>Zurück zur Startseite</span>
          </Link>
          <Link
            href="/dienstleistungen"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors shadow-sm"
          >
            <span>Dienstleistungen</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
