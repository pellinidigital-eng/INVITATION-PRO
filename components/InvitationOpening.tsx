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
  const duration = mode === "envelope" || balloon ? 0.4 : 0.65;

  return (
    <motion.section
      exit={reducedMotion ? undefined : { opacity: 0, scale: 1.035 }}
      transition={{ duration: 0.3 }}
      className={`relative grid place-items-center overflow-hidden px-6 py-12 text-center ${compact ? "min-h-[620px]" : "min-h-[100svh]"}`}
      style={{ color: palette.ink, background: `radial-gradient(ellipse at 50% 35%, ${palette.soft}, ${palette.bg} 72%)` }}
    >
      <button type="button" disabled={opening} onClick={() => reducedMotion ? onOpen() : setOpening(true)} className="group rounded-[32px] px-5 py-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
        <motion.div
          aria-hidden="true"
          className="relative mx-auto mb-12 grid h-40 w-56 place-items-center"
          variants={{
            idle: balloon && !reducedMotion ? { y: [0, -9, 0], transition: { duration: 3, repeat: Infinity, ease: "easeInOut" } } : {},
            reveal: mode === "envelope" || balloon
              ? { scale: balloon ? 1.18 : 1.12, opacity: 0, y: -24 }
              : { opacity: [1, 1, 0] }
          }}
          animate={opening ? "reveal" : "idle"}
          transition={{ duration, ease: "easeOut" }}
          onAnimationComplete={(animation) => { if (animation === "reveal") onOpen(); }}
        >
          {balloon ? (
            <>
              <span className="h-36 w-28 rounded-[50%_50%_48%_48%] shadow-xl" style={{ background: `radial-gradient(ellipse at 28% 22%, ${palette.soft}, ${palette.accent} 72%)` }} />
              <span className="absolute top-[calc(100%-8px)] h-9 w-px rotate-12" style={{ background: palette.accent }} />
            </>
          ) : mode === "gift" ? (
            <div className="relative mt-6 h-28 w-36">
              <div className="absolute inset-x-2 bottom-0 top-5 overflow-hidden rounded-b-lg border shadow-xl" style={{ background: palette.accent, borderColor: palette.accent }}>
                <span className="absolute inset-y-0 left-1/2 w-6 -translate-x-1/2" style={{ background: palette.soft }} />
              </div>
              <motion.div className="absolute inset-x-0 top-1 h-7 rounded-md shadow-md" style={{ background: palette.accent2 }}
                animate={opening ? { y: -54, rotate: -19 } : undefined} transition={{ duration: 0.55, ease: "easeOut" }}>
                <span className="absolute inset-y-0 left-1/2 w-6 -translate-x-1/2" style={{ background: palette.soft }} />
                <span className="absolute -top-[19px] right-1/2 h-6 w-9 rotate-[22deg] rounded-[80%_65%_15%_65%] border-[5px]" style={{ borderColor: palette.accent2 }} />
                <span className="absolute -top-[19px] left-1/2 h-6 w-9 -rotate-[22deg] rounded-[65%_80%_65%_15%] border-[5px]" style={{ borderColor: palette.accent2 }} />
              </motion.div>
            </div>
          ) : mode === "curtain" ? (
            <div className="relative grid h-36 w-52 place-items-center overflow-hidden rounded-t-[22px] border shadow-xl" style={{ borderColor: palette.accent, background: palette.bg, color: palette.accent2 }}>
              <Sparkles size={36} />
              {([-1, 1] as const).map((side) => (
                <motion.span key={side} className={`absolute inset-y-0 w-1/2 ${side === -1 ? "left-0" : "right-0"}`}
                  style={{ background: `repeating-linear-gradient(90deg, ${palette.accent} 0%, ${palette.accent2} 16%, ${palette.accent} 30%)` }}
                  animate={opening ? { x: side === -1 ? "-100%" : "100%" } : undefined} transition={{ duration: 0.6, ease: "easeInOut" }} />
              ))}
            </div>
          ) : mode === "postcard" ? (
            <div style={{ perspective: 550 }}>
              <motion.div className="relative h-32 w-52" style={{ transformStyle: "preserve-3d" }}
                initial={{ rotateY: 0, rotateZ: -6 }} animate={opening ? { rotateY: 180, rotateZ: 0 } : { rotateY: 0, rotateZ: -6 }} transition={{ duration: 0.6, ease: "easeInOut" }}>
                <div className="absolute inset-0 grid place-items-center rounded-xl border-4 border-double shadow-xl" style={{ borderColor: palette.accent, background: palette.bg, color: palette.accent, backfaceVisibility: "hidden" }}>
                  <RotateCw size={32} />
                  <span className="absolute right-3 top-3 h-6 w-5 rounded-sm border border-dashed" style={{ borderColor: palette.accent, background: palette.soft }} />
                </div>
                <div className="absolute inset-0 grid place-items-center rounded-xl border-4 border-double shadow-xl" style={{ borderColor: palette.accent, background: palette.soft, color: palette.ink, backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                  <Sparkles size={36} />
                </div>
              </motion.div>
            </div>
          ) : (
            <div className="relative grid h-36 w-56 place-items-center overflow-hidden rounded-lg border shadow-xl" style={{ borderColor: palette.accent, background: palette.bg }}>
              <span className="absolute inset-x-0 top-0 h-24" style={{ background: palette.soft, clipPath: "polygon(0 0, 100% 0, 50% 100%)" }} />
              <span className="relative mt-8 grid h-10 w-10 place-items-center rounded-full border border-white/40 text-lg text-white shadow-md" style={{ background: palette.accent }}>✦</span>
            </div>
          )}
        </motion.div>
        <span className="block break-words text-4xl leading-tight" style={{ fontFamily: font.family, fontWeight: font.weight }}>{invitation.names || "Il tuo evento"}</span>
        <span className="mt-6 inline-flex min-h-11 items-center rounded-full border px-5 text-sm font-semibold group-hover:shadow-md" style={{ borderColor: palette.accent }}>
          {invitationOpenings[mode].action}
        </span>
      </button>
      {opening && balloon && Array.from({ length: 14 }, (_, index) => {
        const angle = index * 2 * Math.PI / 14;
        return <motion.span
          key={index}
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[40%] h-2 w-2 rounded-sm"
          style={{ background: index % 2 ? palette.accent : palette.ink }}
          animate={{ x: 120 * Math.cos(angle), y: 102 * Math.sin(angle), rotate: index * 34, opacity: [1, 1, 0] }}
          transition={{ duration: 0.4 }}
        />;
      })}
    </motion.section>
  );
}
