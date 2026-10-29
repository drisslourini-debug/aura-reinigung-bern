"use client";

import React, { useState, useRef } from "react";
import { Sparkles } from "lucide-react";

export function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

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
    <section className="py-20 relative bg-slate-900 text-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Show, Don't Tell</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Der AURA Vorher / Nachher Unterschied
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Ziehen Sie den Regler, um die mikroskopische Tiefenreinigung im Detail zu vergleichen.
          </p>
        </div>

        {/* Visual Slider Box */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative h-[380px] sm:h-[480px] w-full rounded-3xl overflow-hidden cursor-ew-resize select-none border border-white/10 shadow-2xl"
        >
          {/* After Surface (Right Side) - Gleaming Pure Surface */}
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-cyan-950 flex flex-col items-end justify-between p-8 sm:p-12">
            <div className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Nach AURA Clean: Spiegelnder Hochglanz & Entkalkt</span>
            </div>

            <div className="text-right max-w-xs space-y-2">
              <div className="text-2xl font-black text-white tracking-tight">
                100% Bereit zur Abnahme
              </div>
              <p className="text-xs text-slate-400">
                Porentief entfettete Dunstabzugshauben, kalkfreie Armaturen und staubfreie Lüftungen.
              </p>
            </div>
          </div>

          {/* Before Surface (Left Side - Clipped) */}
          <div
            className="absolute inset-0 bg-gradient-to-tr from-amber-950/80 via-slate-900 to-slate-950 flex flex-col items-start justify-between p-8 sm:p-12 overflow-hidden border-r border-white/40"
            style={{ width: `${sliderPosition}%` }}
          >
            <div className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap">
              <span>Vorher: Hartnäckiger Kalk & Eingebranntes</span>
            </div>

            <div className="text-left max-w-xs space-y-2 whitespace-nowrap">
              <div className="text-2xl font-black text-amber-200 tracking-tight">
                Typische Beanstandungen
              </div>
              <p className="text-xs text-slate-400">
                Fettfilme im Backofen, Grauschleier auf Fliesen und Schmutz in den Fensterfalzen.
              </p>
            </div>
          </div>

          {/* Slider Divider Bar & Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_15px_rgba(0,210,255,0.8)]"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-slate-950 shadow-xl flex items-center justify-center font-bold text-xs border-2 border-cyan-400">
              ↔
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
