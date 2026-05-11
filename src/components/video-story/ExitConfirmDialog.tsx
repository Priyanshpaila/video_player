"use client";

import { motion } from "framer-motion";

type ExitConfirmDialogProps = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ExitConfirmDialog({ open, onCancel, onConfirm }: ExitConfirmDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-ink/78 px-5 backdrop-blur-sm">
      <motion.div
        className="film-grain w-full max-w-lg border border-paper/16 bg-[#0b0b09] p-6 shadow-editorial sm:p-8"
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.22 }}
      >
        <div className="mb-6 flex items-center justify-between border-b border-paper/10 pb-4">
          <div className="text-[10px] font-black uppercase tracking-[0.28em] text-ember">Confirm Exit</div>
          <div className="h-3 w-3 rounded-full bg-ember" />
        </div>

        <h3 className="max-w-[10ch] text-5xl font-black uppercase leading-[0.86] tracking-[-0.085em] text-paper sm:text-6xl">
          Mark as viewed?
        </h3>
        <p className="mt-5 max-w-sm text-sm leading-6 text-paper/58">
          Exiting will remove this scene from the remaining journey, even if the video is not finished.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={onCancel}
            className="border border-paper/16 px-5 py-4 text-[11px] font-black uppercase tracking-[0.18em] text-paper transition hover:border-paper/42 focus:outline-none focus:ring-2 focus:ring-paper/30"
          >
            Keep Watching
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="bg-paper px-5 py-4 text-[11px] font-black uppercase tracking-[0.18em] text-ink transition hover:bg-ember focus:outline-none focus:ring-2 focus:ring-ember/50"
          >
            Exit Scene
          </button>
        </div>
      </motion.div>
    </div>
  );
}
