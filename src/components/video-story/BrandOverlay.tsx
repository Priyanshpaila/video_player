"use client";

import { RotateCcw, SkipForward, Volume2, VolumeX } from "lucide-react";
import { brand } from "@/data/brand";

type BrandOverlayProps = {
  phase: "intro" | "menu" | "playing" | "completed";
  soundEnabled: boolean;
  completedCount: number;
  totalChapters: number;
  onToggleSound: () => void;
  onSkipIntro?: () => void;
  onRestart?: () => void;
};

export default function BrandOverlay({
  phase,
  soundEnabled,
  completedCount,
  totalChapters,
  onToggleSound,
  onSkipIntro,
  onRestart
}: BrandOverlayProps) {
  return (
    <header className="fixed left-0 top-0 z-50 w-full px-4 py-4 sm:px-7">
      <div className="flex items-center justify-between gap-4  border-paper/10 pb-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center border border-paper/25 bg-paper text-[11px] font-black tracking-[-0.04em] text-ink">
            {brand.mark}
          </div>
          <div className="min-w-0 leading-none">
            <div className="truncate text-[13px] font-bold uppercase tracking-[0.18em] text-paper">{brand.name}</div>
            <div className="mt-1 hidden text-[9px] uppercase tracking-[0.28em] text-paper/45 sm:block">{brand.label}</div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {(phase === "menu" || phase === "playing" || phase === "completed") && (
            <div className="hidden border border-paper/12 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-paper/55 sm:block">
              {completedCount}/{totalChapters}
            </div>
          )}

          <button
            type="button"
            onClick={onToggleSound}
            className="inline-flex h-9 items-center gap-2 border border-paper/14 bg-ink/20 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-paper transition hover:border-acid/70 hover:text-acid focus:outline-none focus:ring-2 focus:ring-acid/45"
            aria-label={soundEnabled ? "Mute sound" : "Enable sound"}
          >
            {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            <span className="hidden sm:inline">{soundEnabled ? "Sound" : "Muted"}</span>
          </button>

          {phase === "intro" && onSkipIntro && (
            <button
              type="button"
              onClick={onSkipIntro}
              className="inline-flex h-9 items-center gap-2 bg-paper px-3 text-[10px] font-black uppercase tracking-[0.18em] text-ink transition hover:bg-acid focus:outline-none focus:ring-2 focus:ring-acid/45"
            >
              <SkipForward className="h-4 w-4" />
              <span className="hidden sm:inline">Skip</span>
            </button>
          )}

          {phase === "completed" && onRestart && (
            <button
              type="button"
              onClick={onRestart}
              className="inline-flex h-9 items-center gap-2 bg-paper px-3 text-[10px] font-black uppercase tracking-[0.18em] text-ink transition hover:bg-acid focus:outline-none focus:ring-2 focus:ring-acid/45"
            >
              <RotateCcw className="h-4 w-4" />
              <span className="hidden sm:inline">Restart</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
