"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Sparkles, AlertCircle, CheckCircle2 } from "lucide-react";

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
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[600px] h-[300px] sm:h-[400px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-cyan-300 text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Show, Don't Tell</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Der Vorher / Nachher Unterschied
          </h2>
          <p className="mt-3 text-xs sm:text-base text-slate-300">
            Wischen Sie mit dem Finger über den Regler, um den Unterschied im Detail zu vergleichen.
          </p>

          {/* Mobile Swipe Badge */}
          <div className="sm:hidden mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-[11px] font-medium">
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
          className="relative h-[320px] sm:h-[460px] lg:h-[500px] w-full rounded-2xl sm:rounded-3xl overflow-hidden cursor-ew-resize select-none border border-white/15 shadow-2xl shadow-cyan-950/40"
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
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_20px_rgba(0,210,255,1)]"
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
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-slate-950 shadow-2xl flex items-center justify-center font-bold text-xs sm:text-sm border-2 border-cyan-400 transition-transform active:scale-110 focus:outline-none focus:ring-4 focus:ring-cyan-400/50"
              style={{ touchAction: "none" }}
            >
              ↔
            </div>
          </div>
        </div>

        {/* Feature comparison pills below slider */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 text-center">
          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 text-xs">
            <span className="text-cyan-400 font-bold block mb-0.5 sm:mb-1">Armaturen & Sanitär</span>
            <span className="text-slate-400 text-[11px] sm:text-xs">Porentiefe Entkalkung ohne aggressive Säureschäden</span>
          </div>
          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 text-xs">
            <span className="text-emerald-400 font-bold block mb-0.5 sm:mb-1">Backofen & Steamer</span>
            <span className="text-slate-400 text-[11px] sm:text-xs">Schonende Fett- und Einbrandlösung mit Profidampf</span>
          </div>
          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 text-xs">
            <span className="text-cyan-400 font-bold block mb-0.5 sm:mb-1">Fenster & Lamellen</span>
            <span className="text-slate-400 text-[11px] sm:text-xs">Streifenfreies Reinwasser für makellose Durchsicht</span>
          </div>
        </div>
      </div>
    </section>
  );
}
