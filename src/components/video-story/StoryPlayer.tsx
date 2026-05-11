"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Check } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { StoryVideo } from "@/data/storyVideos";
import { USE_MOCK_MEDIA } from "@/data/storyVideos";
import ExitConfirmDialog from "./ExitConfirmDialog";
import MockCinematicSurface from "./MockCinematicSurface";

type StoryPlayerProps = {
  video: StoryVideo;
  soundEnabled: boolean;
  onComplete: (video: StoryVideo) => void;
};

const MOCK_CHAPTER_SECONDS = 18;

export default function StoryPlayer({
  video,
  soundEnabled,
  onComplete,
}: StoryPlayerProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [mockProgress, setMockProgress] = useState(0);

  const useMock = useMemo(() => USE_MOCK_MEDIA || !video.src, [video.src]);

  useEffect(() => {
    setMockProgress(0);
  }, [video.id]);

  useEffect(() => {
    if (!useMock || confirmOpen) return;

    const interval = window.setInterval(() => {
      setMockProgress((prev) => {
        const next = Math.min(prev + 100 / (MOCK_CHAPTER_SECONDS * 10), 100);

        if (next >= 100) {
          window.clearInterval(interval);
        }

        return next;
      });
    }, 100);

    return () => window.clearInterval(interval);
  }, [confirmOpen, useMock, video.id]);

  useEffect(() => {
    if (!useMock || mockProgress < 100) return;

    const timeout = window.setTimeout(() => {
      onComplete(video);
    }, 500);

    return () => window.clearTimeout(timeout);
  }, [mockProgress, onComplete, useMock, video]);

  return (
    <motion.section
      key={video.id}
      className="relative z-10 min-h-dvh overflow-x-hidden overflow-y-auto bg-ink px-4 pb-10 pt-24 sm:px-7 sm:pb-12"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at 70% 22%, ${video.palette.glow}, transparent 30%)`,
        }}
      />

      <div className="relative mx-auto flex min-h-[calc(100dvh-8.5rem)] w-full max-w-[1440px] flex-col justify-center">
        <div className="mb-5 grid gap-4 border-b border-paper/10 pb-5 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div
              className="text-[10px] font-black uppercase tracking-[0.32em]"
              style={{ color: video.palette.accent }}
            >
              {video.chapter}
            </div>

            <h2 className="mt-2 max-w-[10ch] text-4xl font-black uppercase leading-[0.86] tracking-[-0.08em] text-paper sm:text-6xl lg:text-7xl">
              {video.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            className="inline-flex w-fit items-center gap-2 border border-paper/14 px-4 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-paper transition hover:border-ember hover:text-ember focus:outline-none focus:ring-2 focus:ring-ember/35"
          >
            <ArrowLeft className="h-4 w-4" />
            Exit Scene
          </button>
        </div>

        <div className="relative">
          {useMock ? (
            <>
              <div className="scene-mask-soft relative overflow-hidden border border-paper/14 bg-black shadow-editorial">
                <div className="aspect-video w-full">
                  <MockCinematicSurface video={video} showCode />
                </div>
              </div>

              <div className="relative mt-4 border border-paper/10 bg-black/40 p-4 backdrop-blur-sm sm:mt-5 sm:p-5">
                <div className="mb-4 h-[3px] overflow-hidden bg-paper/12">
                  <motion.div
                    className="h-full"
                    style={{
                      width: `${mockProgress}%`,
                      backgroundColor: video.palette.accent,
                    }}
                  />
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-[10px] font-black uppercase tracking-[0.22em] text-paper/46">
                    Mock playback
                  </div>

                  <button
                    type="button"
                    onClick={() => onComplete(video)}
                    className="inline-flex w-fit items-center gap-2 bg-paper px-4 py-3 text-[10px] font-black uppercase tracking-[0.16em] text-ink transition hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-acid/45"
                  >
                    <Check className="h-4 w-4" />
                    Complete
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="relative border border-paper/14 bg-black shadow-editorial">
              <div className="aspect-video w-full">
                <video
                  className="h-full w-full bg-black object-contain"
                  src={video.src}
                  poster={video.poster}
                  autoPlay
                  controls
                  playsInline
                  muted={!soundEnabled}
                  preload="metadata"
                  onEnded={() => onComplete(video)}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <ExitConfirmDialog
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false);
          onComplete(video);
        }}
      />
    </motion.section>
  );
}