"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  return (
    <section className="py-16 sm:py-24 relative bg-slate-950 text-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-[11px] font-semibold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-red-600 inline-block" />
            <span>Praxis-Abnahmekriterien • Kanton Bern</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Der Unterschied bei der Wohnungsabgabe
          </h2>
          <p className="mt-3 text-xs sm:text-base text-slate-300">
            Wischen Sie mit dem Schieberegler, um typische Beanstandungspunkte der Berner Liegenschaftsverwaltungen mit unserem Abgabestandard zu vergleichen.
          </p>

          {/* Mobile Swipe Badge */}
          <div className="sm:hidden mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-[11px] font-medium">
            <span>‹‹ Regler nach links/rechts schieben ››</span>
          </div>
        </div>

        {/* Visual Slider Box */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchMove}
          onTouchMove={handleTouchMove}
          className="relative h-[320px] sm:h-[460px] lg:h-[500px] w-full rounded-2xl sm:rounded-3xl overflow-hidden cursor-ew-resize select-none border border-white/15 shadow-2xl"
          style={{ touchAction: "pan-y" }}
        >
          {/* Layer 1: After Image (Full width background) */}
          <div className="absolute inset-0">
            <Image
              src="/images/after-clean.jpg"
              alt="Nach der AURA Tiefenreinigung: Spiegelglanz, kalkfrei und 100% sauber"
              fill
              priority
              className="object-cover object-center pointer-events-none"
              sizes="(max-width: 1024px) 100vw, 1000px"
            />
            {/* Dark gradient vignette overlay on bottom for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-slate-950/30 pointer-events-none" />

            {/* After Badges */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-emerald-500/90 text-white backdrop-blur-md text-[10px] sm:text-xs font-bold shadow-lg border border-emerald-400/50">
                <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
                <span>Nach AURA Clean: Hochglanz</span>
              </span>
            </div>

            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 text-right max-w-[200px] sm:max-w-xs z-10 pointer-events-none">
              <div className="text-base sm:text-2xl font-black text-white tracking-tight drop-shadow-md">
                100% Bereit zur Abnahme
              </div>
              <p className="text-[10px] sm:text-xs text-slate-200 mt-0.5 sm:mt-1 drop-shadow">
                Porentief entkalkte Armaturen, gereinigte Filter und fettfreie Oberflächen.
              </p>
            </div>
          </div>

          {/* Layer 2: Before Image (Clipped dynamically by slider position) */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
              WebkitClipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
            }}
          >
            <Image
              src="/images/before-clean.jpg"
              alt="Vor der Reinigung: Hartnäckiger Kalk, Fettspuren und Wasserflecken"
              fill
              priority
              className="object-cover object-center pointer-events-none"
              sizes="(max-width: 1024px) 100vw, 1000px"
            />
            {/* Warm dark gradient vignette overlay on bottom for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-slate-950/30 pointer-events-none" />

            {/* Before Badges */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-amber-600/90 text-white backdrop-blur-md text-[10px] sm:text-xs font-bold shadow-lg border border-amber-400/50">
                <AlertCircle className="w-3.5 h-3.5 text-white shrink-0" />
                <span>Vorher: Kalk & Eingebranntes</span>
              </span>
            </div>

            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-left max-w-[200px] sm:max-w-xs z-10 pointer-events-none">
              <div className="text-base sm:text-2xl font-black text-amber-200 tracking-tight drop-shadow-md">
                Typische Beanstandungen
              </div>
              <p className="text-[10px] sm:text-xs text-slate-200 mt-0.5 sm:mt-1 drop-shadow">
                Fettfilme im Backofen, Grauschleier auf Fliesen und Schmutz in den Fensterfalzen.
              </p>
            </div>
          </div>

          {/* Slider Divider Bar & Tactile Drag Handle */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white cursor-ew-resize shadow-[0_0_15px_rgba(255,255,255,0.7)]"
            style={{ left: `${sliderPosition}%` }}
          >
            <div
              role="slider"
              tabIndex={0}
              aria-label="Vergleichsregler Vorher und Nachher"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(sliderPosition)}
              onKeyDown={(e) => {
                if (e.key === "ArrowLeft") {
                  setSliderPosition((prev) => Math.max(0, prev - 5));
                } else if (e.key === "ArrowRight") {
                  setSliderPosition((prev) => Math.min(100, prev + 5));
                }
              }}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-white text-slate-950 shadow-2xl flex items-center justify-center font-bold text-[11px] sm:text-xs border border-slate-300 transition-transform active:scale-105 focus:outline-none select-none tracking-wide whitespace-nowrap"
              style={{ touchAction: "none" }}
            >
              Vorher ⟷ Nachher
            </div>
          </div>
        </div>

        {/* Feature comparison pills below slider */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 text-center">
          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-900 border border-slate-800 text-xs">
            <span className="text-white font-bold block mb-0.5 sm:mb-1">KWC & Laufen Sanitär</span>
            <span className="text-slate-400 text-[11px] sm:text-xs">Porentiefe Entkalkung von Duschköpfen, Abläufen & Fugen</span>
          </div>
          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-900 border border-slate-800 text-xs">
            <span className="text-emerald-400 font-bold block mb-0.5 sm:mb-1">V-ZUG & Miele Küchen</span>
            <span className="text-slate-400 text-[11px] sm:text-xs">Fettfreier Backofen, gereinigte Filter & desinfizierter Steamer</span>
          </div>
          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-900 border border-slate-800 text-xs">
            <span className="text-white font-bold block mb-0.5 sm:mb-1">Fenster & Lamellenstoren</span>
            <span className="text-slate-400 text-[11px] sm:text-xs">Streifenfreie Scheiben, saubere Rahmenfalze & staubfreie Lamellen</span>
          </div>
        </div>
      </div>
    </section>
  );
}
