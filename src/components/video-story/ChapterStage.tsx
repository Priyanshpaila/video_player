"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import type { StoryVideo } from "@/data/storyVideos";
import { USE_MOCK_MEDIA } from "@/data/storyVideos";
import ChapterCard from "./ChapterCard";
import MockCinematicSurface from "./MockCinematicSurface";

type ChapterStageProps = {
  remainingVideos: StoryVideo[];
  completedCount: number;
  totalChapters: number;
  onSelect: (video: StoryVideo) => void;
};

export default function ChapterStage({ remainingVideos, completedCount, totalChapters, onSelect }: ChapterStageProps) {
  const [activeId, setActiveId] = useState(remainingVideos[0]?.id ?? "");

  useEffect(() => {
    if (!remainingVideos.some((video) => video.id === activeId)) {
      setActiveId(remainingVideos[0]?.id ?? "");
    }
  }, [activeId, remainingVideos]);

  const activeVideo = useMemo(
    () => remainingVideos.find((video) => video.id === activeId) ?? remainingVideos[0],
    [activeId, remainingVideos]
  );

  if (!activeVideo) return null;

  const activePosterAvailable = !USE_MOCK_MEDIA && activeVideo.poster;

  return (
    <motion.section
      key="menu"
      className="relative z-10 min-h-dvh overflow-x-hidden px-4 pb-10 pt-24 sm:px-7 lg:overflow-hidden lg:pt-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28 }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,5,5,0.15),rgba(5,5,5,0.88))]" />

      <div className="relative mx-auto grid min-h-[calc(100dvh-7rem)] max-w-[1440px] grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.72fr)] lg:items-center lg:gap-10">
        <div className="relative order-2 lg:order-1">
          <motion.div
            key={activeVideo.id}
            className="scene-mask-soft relative h-[52vh] min-h-[360px] overflow-hidden border border-paper/12 bg-ink shadow-editorial lg:h-[68vh]"
            initial={{ opacity: 0.72, scale: 0.985, rotate: -0.6 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.34, ease: "easeOut" }}
          >
            {activePosterAvailable ? (
              <img src={activeVideo.poster} alt="" className="h-full w-full object-cover" />
            ) : (
              <MockCinematicSurface video={activeVideo} showContent={false} showCode />
            )}

            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,0.76),transparent_48%,rgba(5,5,5,0.35))]" />

            <div className="absolute left-5 top-5 border border-paper/16 bg-ink/30 px-3 py-2 text-[10px] font-black uppercase tracking-[0.28em] text-paper/60 backdrop-blur-sm">
              Scene Preview
            </div>

            <div className="absolute bottom-6 left-5 right-5 sm:bottom-9 sm:left-8 sm:right-8">
              <div className="mb-3 text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: activeVideo.palette.accent }}>
                {activeVideo.chapter}
              </div>
              <h2 className="max-w-[9ch] text-6xl font-black uppercase leading-[0.82] tracking-[-0.105em] text-paper sm:text-8xl lg:text-[7.5rem]">
                {activeVideo.title}
              </h2>
              <div className="mt-5 flex max-w-xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-sm text-sm leading-6 text-paper/56">{activeVideo.subtitle}</p>
                <button
                  type="button"
                  onClick={() => onSelect(activeVideo)}
                  className="w-fit bg-paper px-5 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-ink transition hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-acid/50"
                >
                  Play Scene
                </button>
              </div>
            </div>
          </motion.div>

          <div className="pointer-events-none absolute -bottom-4 left-[8%] right-[8%] h-10 bg-acid/20 blur-3xl" />
        </div>

        <div className="relative order-1 lg:order-2">
          <div className="mb-7 flex items-end justify-between gap-4 border-b border-paper/12 pb-5">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.32em] text-paper/42">
                {completedCount}/{totalChapters} viewed
              </div>
              <h1 className="mt-3 max-w-[8ch] font-display text-6xl leading-[0.88] tracking-[-0.075em] text-paper sm:text-7xl lg:text-8xl">
                Select a Scene
              </h1>
            </div>
            <div className="hidden h-20 w-20 shrink-0 rounded-full border border-paper/15 lg:block" style={{ background: `radial-gradient(circle, ${activeVideo.palette.accent} 0 28%, transparent 30%)` }} />
          </div>

          <div className="relative">
            <AnimatePresence mode="popLayout">
              {remainingVideos.map((video, index) => (
                <ChapterCard
                  key={video.id}
                  video={video}
                  index={index}
                  active={video.id === activeVideo.id}
                  onHover={(nextVideo) => setActiveId(nextVideo.id)}
                  onSelect={onSelect}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="pointer-events-none fixed bottom-5 left-0 right-0 z-20 overflow-hidden border-y border-paper/8 bg-ink/30 py-2 text-[10px] font-black uppercase tracking-[0.26em] text-paper/30 backdrop-blur-sm">
        <div className="flex w-[200%] animate-[ticker_28s_linear_infinite] gap-8 whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, group) => (
            <div key={group} className="flex gap-8">
              <span>Software Film System</span>
              <span>Scene Select</span>
              <span>Interactive Journey</span>
              <span>No Saved Progress</span>
              <span>Hard Refresh Restarts</span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
