"use client";

import type { StoryVideo } from "@/data/storyVideos";

type MockCinematicSurfaceProps = {
  video: StoryVideo;
  compact?: boolean;
  showContent?: boolean;
  showCode?: boolean;
};

export default function MockCinematicSurface({
  video,
  compact = false,
  showContent = true,
  showCode = true
}: MockCinematicSurfaceProps) {
  return (
    <div className="film-grain relative h-full w-full overflow-hidden" style={{ backgroundColor: video.palette.bg }}>
      <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 68% 32%, ${video.palette.glow}, transparent 34%)` }} />
      <div className="absolute -left-[12%] top-[16%] h-[34%] w-[130%] -rotate-[13deg] bg-paper/[0.045] blur-xl" />
      <div className="absolute right-[-18%] top-[-22%] h-[26rem] w-[26rem] rounded-full blur-3xl" style={{ backgroundColor: `${video.palette.accent}24` }} />
      <div className="absolute bottom-[-18%] left-[-16%] h-[22rem] w-[22rem] rounded-full blur-3xl" style={{ backgroundColor: `${video.palette.accent}18` }} />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(244,239,229,0.32)_1px,transparent_1px),linear-gradient(90deg,rgba(244,239,229,0.22)_1px,transparent_1px)] [background-size:46px_46px]" />

      <div className="absolute inset-y-0 left-[12%] w-px bg-paper/10" />
      <div className="absolute inset-y-0 right-[16%] w-px bg-paper/10" />
      <div className="absolute inset-x-0 top-[28%] h-px bg-paper/10" />
      <div className="absolute inset-x-0 bottom-[18%] h-px bg-paper/10" />

      <div
        className="absolute left-[10%] top-[8%] font-display leading-none text-paper/[0.06]"
        style={{ fontSize: compact ? "9rem" : "clamp(10rem, 26vw, 27rem)" }}
      >
        {video.sceneNo}
      </div>

      <div className="absolute right-[8%] top-[18%] hidden h-28 w-28 rounded-full border border-paper/15 md:block" />
      <div className="absolute right-[11%] top-[23%] hidden h-12 w-12 rounded-full md:block" style={{ backgroundColor: video.palette.accent }} />

      {showCode && (
        <div className="absolute bottom-6 right-6 hidden max-w-[15rem] border-l border-paper/14 pl-4 font-mono text-[10px] uppercase leading-5 tracking-[0.12em] text-paper/38 sm:block">
          {video.mockCode.map((line) => (
            <div key={line} className="truncate">
              {line}
            </div>
          ))}
        </div>
      )}

      {showContent && (
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
          <div className="max-w-xl">
            <div className="mb-2 text-[10px] font-black uppercase tracking-[0.26em]" style={{ color: video.palette.accent }}>
              {video.eyebrow}
            </div>
            <h3 className={`${compact ? "text-2xl" : "text-5xl sm:text-7xl"} max-w-[12ch] font-black uppercase leading-[0.86] tracking-[-0.085em] text-paper`}>
              {video.title}
            </h3>
            {!compact && video.subtitle && <p className="mt-4 max-w-sm text-sm leading-6 text-paper/58">{video.subtitle}</p>}
          </div>
        </div>
      )}

      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,5,5,0.72),transparent_45%,rgba(5,5,5,0.34))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent,rgba(5,5,5,0.62))]" />
    </div>
  );
}
