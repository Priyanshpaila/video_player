export default function CSSFallbackBackground() {
  return (
    <div className="film-grain pointer-events-none fixed inset-0 z-0 overflow-hidden bg-ink">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(215,255,63,0.13),transparent_24%),radial-gradient(circle_at_82%_22%,rgba(255,106,61,0.10),transparent_28%),radial-gradient(circle_at_50%_86%,rgba(139,92,246,0.12),transparent_30%)]" />
      <div className="absolute inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(244,239,229,0.26)_1px,transparent_1px),linear-gradient(90deg,rgba(244,239,229,0.18)_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="absolute left-[12%] top-[-20%] h-[44rem] w-24 rotate-[24deg] bg-paper/[0.035] blur-2xl" />
      <div className="absolute right-[18%] top-[-15%] h-[40rem] w-20 rotate-[-19deg] bg-acid/[0.08] blur-3xl" />
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
      <div className="absolute inset-x-0 top-1/2 h-px bg-paper/10" />
    </div>
  );
}
