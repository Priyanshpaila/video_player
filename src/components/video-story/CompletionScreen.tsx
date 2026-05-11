"use client";

import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { chapterVideos } from "@/data/storyVideos";

type CompletionScreenProps = {
  onRestart: () => void;
};

export default function CompletionScreen({ onRestart }: CompletionScreenProps) {
  return (
    <motion.section
      key="completed"
      className="relative z-10 grid min-h-dvh place-items-center overflow-hidden px-5 py-28 sm:px-8"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_24%,rgba(215,255,63,0.15),transparent_28%),linear-gradient(to_bottom,transparent,rgba(5,5,5,0.85))]" />

      <div className="relative mx-auto w-full max-w-6xl">
        <div className="mb-8 border-b border-paper/10 pb-5 text-[10px] font-black uppercase tracking-[0.34em] text-acid">
          Final Frame
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <h2 className="max-w-[8ch] font-display text-7xl leading-[0.82] tracking-[-0.08em] text-paper sm:text-8xl lg:text-[10rem]">
              Story Complete
            </h2>
            <button
              type="button"
              onClick={onRestart}
              className="mt-8 inline-flex items-center gap-3 bg-paper px-6 py-4 text-[11px] font-black uppercase tracking-[0.18em] text-ink transition hover:bg-acid focus:outline-none focus:ring-2 focus:ring-acid/45"
            >
              <RotateCcw className="h-4 w-4" />
              Restart Experience
            </button>
          </div>

          <div className="border border-paper/12 bg-paper/[0.035] p-5">
            <div className="mb-4 text-[10px] font-black uppercase tracking-[0.28em] text-paper/42">Viewed scenes</div>
            <div className="space-y-3">
              {chapterVideos.map((video) => (
                <div key={video.id} className="grid grid-cols-[3.5rem_1fr_auto] items-center gap-3 border-b border-paper/8 pb-3 last:border-b-0 last:pb-0">
                  <div className="font-display text-4xl leading-none text-paper/55">{video.sceneNo}</div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-black uppercase tracking-[-0.03em] text-paper">{video.title}</div>
                    <div className="truncate text-[10px] font-bold uppercase tracking-[0.2em] text-paper/35">{video.eyebrow}</div>
                  </div>
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: video.palette.accent }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
