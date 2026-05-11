"use client";

import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import { useCallback, useMemo, useState } from "react";
import { chapterVideos, ENABLE_THREE_BACKGROUND, type StoryVideo } from "@/data/storyVideos";
import BrandOverlay from "./BrandOverlay";
import ChapterStage from "./ChapterStage";
import CompletionScreen from "./CompletionScreen";
import CSSFallbackBackground from "./CSSFallbackBackground";
import IntroScene from "./IntroScene";
import StoryPlayer from "./StoryPlayer";

type Phase = "intro" | "menu" | "playing" | "completed";

const ImmersiveBackground = dynamic(() => import("./ImmersiveBackground"), {
  ssr: false,
  loading: () => <CSSFallbackBackground />
});

export default function VideoStoryExperience() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<StoryVideo | null>(null);
  const [completedVideoIds, setCompletedVideoIds] = useState<string[]>([]);

  const remainingVideos = useMemo(
    () => chapterVideos.filter((video) => !completedVideoIds.includes(video.id)),
    [completedVideoIds]
  );

  const completeVideo = useCallback(
    (video: StoryVideo) => {
      const nextCompletedVideoIds = Array.from(new Set([...completedVideoIds, video.id]));
      setCompletedVideoIds(nextCompletedVideoIds);
      setCurrentVideo(null);
      setPhase(nextCompletedVideoIds.length >= chapterVideos.length ? "completed" : "menu");
    },
    [completedVideoIds]
  );

  const resetExperience = useCallback(() => {
    setCompletedVideoIds([]);
    setCurrentVideo(null);
    setPhase("intro");
  }, []);

  return (
    <main className="relative min-h-dvh overflow-hidden bg-slate-950 text-white">
      {ENABLE_THREE_BACKGROUND ? <ImmersiveBackground /> : <CSSFallbackBackground />}

      <BrandOverlay
        phase={phase}
        soundEnabled={soundEnabled}
        completedCount={completedVideoIds.length}
        totalChapters={chapterVideos.length}
        onToggleSound={() => setSoundEnabled((prev) => !prev)}
        onSkipIntro={phase === "intro" ? () => setPhase("menu") : undefined}
        onRestart={phase === "completed" ? resetExperience : undefined}
      />

      <AnimatePresence mode="wait">
        {phase === "intro" && <IntroScene key="intro" soundEnabled={soundEnabled} onComplete={() => setPhase("menu")} />}

        {phase === "menu" && (
          <ChapterStage
            key="menu"
            remainingVideos={remainingVideos}
            completedCount={completedVideoIds.length}
            totalChapters={chapterVideos.length}
            onSelect={(video) => {
              setCurrentVideo(video);
              setPhase("playing");
            }}
          />
        )}

        {phase === "playing" && currentVideo && (
          <StoryPlayer key={currentVideo.id} video={currentVideo} soundEnabled={soundEnabled} onComplete={completeVideo} />
        )}

        {phase === "completed" && <CompletionScreen key="completed" onRestart={resetExperience} />}
      </AnimatePresence>
    </main>
  );
}
