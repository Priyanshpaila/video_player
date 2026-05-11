"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { introVideo, USE_MOCK_MEDIA } from "@/data/storyVideos";
import MockCinematicSurface from "./MockCinematicSurface";

type IntroSceneProps = {
  soundEnabled: boolean;
  onComplete: () => void;
};

const MOCK_INTRO_SECONDS = 8;

export default function IntroScene({
  soundEnabled,
  onComplete,
}: IntroSceneProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [progress, setProgress] = useState(0);
  const [videoError, setVideoError] = useState(false);

  const useMock = useMemo(() => {
    return USE_MOCK_MEDIA || !introVideo.src || videoError;
  }, [videoError]);

  useEffect(() => {
    if (!useMock) return;

    const interval = window.setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + 100 / (MOCK_INTRO_SECONDS * 10), 100);

        if (next >= 100) {
          window.clearInterval(interval);
          window.setTimeout(onComplete, 220);
        }

        return next;
      });
    }, 100);

    return () => window.clearInterval(interval);
  }, [onComplete, useMock]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || useMock) return;

    video.muted = !soundEnabled;

    const playPromise = video.play();

    if (playPromise) {
      playPromise.catch(() => {
        video.muted = true;
        video.play().catch(() => {});
      });
    }
  }, [soundEnabled, useMock]);

  return (
    <motion.section
      key="intro"
      className="relative z-10 min-h-dvh overflow-hidden bg-ink"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      <div className="absolute inset-0 scale-[1.04]">
        {useMock ? (
          <MockCinematicSurface
            video={introVideo}
            showContent={false}
            showCode={false}
          />
        ) : (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src={introVideo.src}
            poster={introVideo.poster || undefined}
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={onComplete}
            onError={() => setVideoError(true)}
          />
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,0.72),rgba(5,5,5,0.02)_44%,rgba(5,5,5,0.78))]" />

      <div className="pointer-events-none absolute left-0 top-0 h-full w-[18vw] bg-[repeating-linear-gradient(to_bottom,rgba(244,239,229,0.10)_0,rgba(244,239,229,0.10)_1px,transparent_1px,transparent_18px)] opacity-20" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-ink to-transparent" />

      <div className="fixed inset-x-0 bottom-0 z-40 h-[3px] bg-paper/10">
        {useMock ? (
          <motion.div
            className="h-full bg-acid"
            style={{ width: `${progress}%` }}
          />
        ) : (
          <div className="h-full bg-acid/80" />
        )}
      </div>
    </motion.section>
  );
}