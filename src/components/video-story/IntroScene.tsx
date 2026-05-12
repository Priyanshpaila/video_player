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
  const mainVideoRef = useRef<HTMLVideoElement | null>(null);
  const bgVideoRef = useRef<HTMLVideoElement | null>(null);

  const [progress, setProgress] = useState(0);
  const [videoError, setVideoError] = useState(false);

  const useMock = useMemo(() => {
    return USE_MOCK_MEDIA || !introVideo.src || videoError;
  }, [videoError]);

  useEffect(() => {
    if (!useMock) return;

    setProgress(0);

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
    if (useMock) return;

    const mainVideo = mainVideoRef.current;
    const bgVideo = bgVideoRef.current;

    if (!mainVideo) return;

    mainVideo.muted = !soundEnabled;

    if (bgVideo) {
      bgVideo.muted = true;
    }

    const playMain = mainVideo.play();
    const playBg = bgVideo?.play();

    if (playMain) {
      playMain.catch(() => {
        mainVideo.muted = true;
        mainVideo.play().catch(() => {});
      });
    }

    if (playBg) {
      playBg.catch(() => {});
    }
  }, [soundEnabled, useMock]);

  const handleVideoProgress = () => {
    const video = mainVideoRef.current;
    if (!video || !video.duration) return;

    const percentage = (video.currentTime / video.duration) * 100;
    setProgress(Math.min(percentage, 100));

    const bgVideo = bgVideoRef.current;

    if (bgVideo && Math.abs(bgVideo.currentTime - video.currentTime) > 0.3) {
      bgVideo.currentTime = video.currentTime;
    }
  };

  return (
    <motion.section
      key="intro"
      className="relative z-10 h-[100svh] min-h-[100svh] w-full overflow-hidden bg-ink sm:h-[100dvh] sm:min-h-[100dvh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      <div className="absolute inset-0 h-full w-full overflow-hidden bg-black">
        {useMock ? (
          <div className="h-full w-full scale-[1.08] sm:scale-[1.04]">
            <MockCinematicSurface
              video={introVideo}
              showContent={false}
              showCode={false}
            />
          </div>
        ) : (
          <>
            <video
              ref={bgVideoRef}
              className="absolute inset-0 h-full w-full scale-125 bg-black object-cover object-center opacity-55 blur-2xl"
              src={introVideo.src}
              poster={introVideo.poster || undefined}
              autoPlay
              muted
              playsInline
              preload="auto"
              aria-hidden="true"
            />

            <video
              ref={mainVideoRef}
              className="absolute inset-0 h-full w-full bg-transparent object-contain object-center sm:object-cover"
              src={introVideo.src}
              poster={introVideo.poster || undefined}
              autoPlay
              muted
              playsInline
              preload="auto"
              disablePictureInPicture
              onCanPlay={() => {
                mainVideoRef.current?.play().catch(() => {});
                bgVideoRef.current?.play().catch(() => {});
              }}
              onTimeUpdate={handleVideoProgress}
              onEnded={onComplete}
              onError={() => setVideoError(true)}
            />
          </>
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,0.28),rgba(5,5,5,0.00)_48%,rgba(5,5,5,0.32))] sm:bg-[linear-gradient(90deg,rgba(5,5,5,0.52),rgba(5,5,5,0.02)_44%,rgba(5,5,5,0.58))]" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,transparent_0%,rgba(0,0,0,0.10)_52%,rgba(0,0,0,0.56)_100%)]" />

      <div className="pointer-events-none absolute left-0 top-0 hidden h-full w-[18vw] bg-[repeating-linear-gradient(to_bottom,rgba(244,239,229,0.10)_0,rgba(244,239,229,0.10)_1px,transparent_1px,transparent_18px)] opacity-20 md:block" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/70 to-transparent sm:h-40" />

      <div className="fixed inset-x-0 bottom-0 z-40 h-[3px] bg-paper/10">
        <motion.div className="h-full bg-acid" style={{ width: `${progress}%` }} />
      </div>
    </motion.section>
  );
}