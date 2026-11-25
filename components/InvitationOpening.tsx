"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { RotateCw, Sparkles } from "lucide-react";
import { Invitation, invitationOpenings, palettes } from "@/lib/invitation-data";

import { getInvitationFont } from "@/lib/invitation-fonts";

export function InvitationOpening({ invitation, compact = false, onOpen }: {
  invitation: Invitation;
  compact?: boolean;
  onOpen: () => void;
}) {
  const font = getInvitationFont(invitation.font);
  const palette = palettes[invitation.palette as keyof typeof palettes] ?? palettes.champagne;
  const reducedMotion = useReducedMotion();
  const [opening, setOpening] = useState(false);
  const mode = invitation.opening ?? "direct";
  const balloon = mode === "balloon";
  const duration = balloon ? 0.9 : 1.12;
  const paper = (
    <div className="grid h-full w-full content-center justify-items-center gap-2 rounded-md border px-3 py-2 text-center"
      style={{ background: palette.bg, color: palette.ink, borderColor: `${palette.accent}88`, boxShadow: `inset 0 0 0 4px ${palette.soft}` }}>
      <Sparkles size={16} style={{ color: palette.accent }} />
      <span className="line-clamp-2 break-words text-lg leading-tight" style={{ fontFamily: font.family, fontWeight: font.weight }}>{invitation.names || "Il tuo evento"}</span>
      <span className="h-px w-8" style={{ background: palette.accent }} />
    </div>
  );

  return (
    <motion.section
      exit={reducedMotion ? undefined : { opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.22 }}
      className={`relative grid place-items-center overflow-hidden px-6 py-12 text-center ${compact ? "min-h-[620px]" : "min-h-[100svh]"}`}
      style={{ color: palette.ink, background: `radial-gradient(ellipse at 50% 36%, ${palette.bg} 0%, ${palette.soft} 54%, ${palette.bg} 100%)` }}
    >
      <button type="button" disabled={opening} onClick={() => reducedMotion ? onOpen() : setOpening(true)} className="group relative w-full max-w-xl rounded-[32px] px-2 py-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
        <motion.div
          aria-hidden="true"
          className="relative mx-auto mb-9 grid h-52 w-full max-w-[280px] place-items-center"
          variants={{
            idle: { opacity: 1 },
            reveal: { opacity: [1, 1, 0] }
          }}
          animate={opening ? "reveal" : "idle"}
          transition={{ duration, times: [0, 0.8, 1], ease: "easeOut" }}
          onAnimationComplete={(animation) => { if (animation === "reveal") onOpen(); }}
        >
          {balloon ? (
            <>
              <motion.div className="relative h-40 w-[120px]"
                animate={opening ? { scale: [1, 0.94, 1.2, 0.04, 0], opacity: [1, 1, 1, 0, 0] } : reducedMotion ? undefined : { y: [0, -8, 0] }}
                transition={opening ? { duration: 0.43, times: [0, 0.28, 0.56, 0.72, 1] } : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }}>
                <span className="absolute inset-0 rounded-[50%_50%_49%_49%] shadow-2xl" style={{
                  background: `radial-gradient(ellipse at 32% 27%, #fff9 0%, transparent 26%), linear-gradient(140deg, ${palette.soft}, ${palette.accent}, ${palette.accent2})`,
                  boxShadow: `inset -10px -10px 22px #0002, 0 16px 36px ${palette.accent}38`
                }} />
                <span className="absolute left-1/2 top-full h-2 w-3 -translate-x-1/2 rounded-sm" style={{ background: palette.accent }} />
                <span className="absolute left-1/2 top-[calc(100%+5px)] h-11 w-4 rounded-[50%] border-l" style={{ borderColor: palette.accent }} />
              </motion.div>
              {opening && Array.from({ length: 24 }, (_, index) => {
                const angle = index * 2 * Math.PI / 24;
                const distance = 80 + (index % 4) * 14;
                const color = [palette.accent, palette.accent2, palette.ink][index % 3];
                return <motion.span key={index} className={`pointer-events-none absolute left-1/2 top-1/2 h-2 ${index % 3 === 0 ? "w-2 rounded-full" : "w-1 rounded-sm"}`}
                  style={{ background: color }} initial={{ opacity: 0, x: 0, y: 0 }}
                  animate={{ x: [0, distance * Math.cos(angle), distance * Math.cos(angle) * 1.08], y: [0, distance * Math.sin(angle), distance * Math.sin(angle) + 28], rotate: [0, index * 23, index * 32], opacity: [1, 1, 0] }}
                  transition={{ delay: 0.26, duration: 0.6, ease: "easeOut" }} />;
              })}
            </>
          ) : mode === "gift" ? (
            <div className="relative mt-12 h-32 w-44">
              <motion.div className="absolute inset-x-5 top-4 h-24"
                initial={{ opacity: 0 }} animate={opening ? { y: -72, rotate: -6, opacity: 1 } : undefined} transition={{ delay: 0.24, duration: 0.54 }}>
                {paper}
              </motion.div>
              <div className="absolute inset-x-2 bottom-0 top-5 overflow-hidden rounded-b-lg border shadow-xl" style={{ background: `linear-gradient(135deg, ${palette.accent}, ${palette.ink})`, borderColor: palette.accent }}>
                <span className="absolute inset-y-0 left-1/2 w-6 -translate-x-1/2" style={{ background: palette.soft }} />
              </div>
              <motion.div className="absolute inset-x-0 top-1 h-7 rounded-md shadow-md" style={{ background: palette.accent2 }}
                animate={opening ? { y: -72, x: 78, rotate: 28, opacity: [1, 1, 0] } : undefined} transition={{ duration: 0.62, ease: "easeOut" }}>
                <span className="absolute inset-y-0 left-1/2 w-6 -translate-x-1/2" style={{ background: palette.soft }} />
                <span className="absolute -top-[19px] right-1/2 h-6 w-9 rotate-[22deg] rounded-[80%_65%_15%_65%] border-[5px]" style={{ borderColor: palette.accent2 }} />
                <span className="absolute -top-[19px] left-1/2 h-6 w-9 -rotate-[22deg] rounded-[65%_80%_65%_15%] border-[5px]" style={{ borderColor: palette.accent2 }} />
              </motion.div>
            </div>
          ) : mode === "curtain" ? (
            <div className="relative grid h-44 w-full max-w-[258px] place-items-center overflow-hidden rounded-t-[46%_24%] rounded-b-xl border shadow-xl" style={{ borderColor: palette.accent, background: `radial-gradient(ellipse at top, ${palette.soft}, ${palette.ink})` }}>
              <motion.div className="h-28 w-40" initial={{ scale: 0.82, opacity: 0.5 }}
                animate={opening ? { scale: 1.08, opacity: 1 } : undefined} transition={{ delay: 0.14, duration: 0.62 }}>
                {paper}
              </motion.div>
              {([-1, 1] as const).map((side) => (
                <motion.span key={side} className={`absolute inset-y-0 w-1/2 ${side === -1 ? "left-0" : "right-0"}`}
                  style={{ background: `repeating-linear-gradient(90deg, ${palette.ink} 0%, ${palette.accent} 13%, ${palette.accent2} 18%, ${palette.ink} 34%)`, borderBottom: `4px solid ${palette.accent2}` }}
                  animate={opening ? { x: side === -1 ? "-92%" : "92%", scaleX: 0.72 } : undefined} transition={{ duration: 0.68, ease: "easeInOut" }} />
              ))}
            </div>
          ) : mode === "postcard" ? (
            <div style={{ perspective: 550 }}>
              <motion.div className="relative h-36 w-56 sm:w-60" style={{ transformStyle: "preserve-3d" }}
                initial={{ rotateY: 0, rotateZ: -6 }} animate={opening ? { rotateY: 180, rotateZ: 0, scale: 1.09 } : { rotateY: 0, rotateZ: -6 }} transition={{ duration: 0.7, ease: "easeInOut" }}>
                <div className="absolute inset-0 grid place-items-center rounded-xl border-4 border-double shadow-xl" style={{ borderColor: palette.accent, background: palette.bg, color: palette.accent, backfaceVisibility: "hidden" }}>
                  <RotateCw size={32} />
                  <span className="absolute right-3 top-3 h-6 w-5 rounded-sm border border-dashed" style={{ borderColor: palette.accent, background: palette.soft }} />
                  <span className="absolute bottom-4 left-4 h-1 w-12 rounded-full" style={{ background: palette.soft }} />
                </div>
                <div className="absolute inset-0 grid place-items-center rounded-xl border-4 border-double shadow-xl" style={{ borderColor: palette.accent, background: palette.soft, color: palette.ink, backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                  {paper}
                </div>
              </motion.div>
            </div>
          ) : (
            <div className="relative mt-10 h-36 w-full max-w-[248px]" style={{ perspective: 650 }}>
              <div className="absolute inset-0 rounded-lg border shadow-xl" style={{ background: palette.soft, borderColor: `${palette.accent}77` }} />
              <motion.div className="absolute inset-x-0 top-0 h-[86px] origin-top"
                style={{ background: `linear-gradient(160deg, ${palette.bg}, ${palette.accent2})`, clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
                animate={opening ? { rotateX: 174 } : undefined} transition={{ delay: 0.09, duration: 0.42, ease: "easeInOut" }} />
              <motion.div className="absolute inset-x-5 top-3 h-28 shadow-xl"
                initial={{ opacity: 0 }} animate={opening ? { y: -72, opacity: 1, rotate: -3 } : undefined} transition={{ delay: 0.37, duration: 0.48, ease: "easeOut" }}>
                {paper}
              </motion.div>
              <div className="pointer-events-none absolute inset-0 rounded-lg" style={{ background: `linear-gradient(155deg, ${palette.bg}, ${palette.soft})`, clipPath: "polygon(0 0, 50% 56%, 100% 0, 100% 100%, 0 100%)" }} />
              <motion.span className="absolute left-[calc(50%-20px)] top-[60px] grid h-10 w-10 place-items-center rounded-full border border-white/45 text-lg shadow-lg"
                style={{ background: `radial-gradient(circle at 30% 24%, ${palette.accent2}, ${palette.accent})`, color: palette.bg }}
                animate={opening ? { opacity: 0, scale: 0.72, y: 15 } : undefined} transition={{ duration: 0.24 }}>✦</motion.span>
            </div>
          )}
        </motion.div>
        <span className="block break-words text-4xl leading-tight" style={{ fontFamily: font.family, fontWeight: font.weight }}>{invitation.names || "Il tuo evento"}</span>
        <span className="mt-6 inline-flex min-h-11 items-center rounded-full border px-5 text-sm font-semibold group-hover:shadow-md" style={{ borderColor: palette.accent }}>
          {invitationOpenings[mode].action}
        </span>
      </button>
    </motion.section>
  );
}
