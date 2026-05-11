"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { StoryVideo } from "@/data/storyVideos";

type ChapterCardProps = {
  video: StoryVideo;
  index: number;
  active: boolean;
  onHover: (video: StoryVideo) => void;
  onSelect: (video: StoryVideo) => void;
};

export default function ChapterCard({ video, index, active, onHover, onSelect }: ChapterCardProps) {
  return (
    <motion.button
      type="button"
      onMouseEnter={() => onHover(video)}
      onFocus={() => onHover(video)}
      onClick={() => onSelect(video)}
      className="group relative grid w-full grid-cols-[4.5rem_1fr_auto] items-center gap-4 border-b border-paper/12 py-4 text-left outline-none transition hover:border-paper/40 focus:border-acid focus:outline-none sm:grid-cols-[6rem_1fr_auto] sm:py-5 lg:py-6"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 22 }}
      transition={{ duration: 0.28, delay: index * 0.035, ease: "easeOut" }}
    >
      <div
        className={`font-display text-6xl leading-none tracking-[-0.1em] transition sm:text-7xl ${active ? "text-paper" : "text-stroke-soft"}`}
      >
        {video.sceneNo}
      </div>

      <div className="min-w-0">
        <div className="mb-2 flex items-center gap-3">
          <span className="text-[9px] font-black uppercase tracking-[0.26em]" style={{ color: video.palette.accent }}>
            {video.eyebrow}
          </span>
          <span className="h-px w-8 bg-paper/16" />
          <span className="text-[9px] font-bold uppercase tracking-[0.20em] text-paper/40">{video.duration}</span>
        </div>
        <h3 className="truncate text-xl font-black uppercase leading-none tracking-[-0.055em] text-paper sm:text-3xl">
          {video.title}
        </h3>
      </div>

      <div
        className={`grid h-10 w-10 place-items-center border text-paper transition group-hover:bg-paper group-hover:text-ink ${
          active ? "border-paper bg-paper text-ink" : "border-paper/16 bg-paper/[0.03]"
        }`}
      >
        <ArrowUpRight className="h-4 w-4" />
      </div>
    </motion.button>
  );
}
