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
  const duration = mode === "envelope" ? 2.9 : 2.65;
  const paper = (
    <div className="grid h-full w-full content-center justify-items-center gap-2 rounded-md border px-3 py-2 text-center"
      style={{ background: `repeating-linear-gradient(135deg, #fff0 0 3px, #fff2 3px 4px), ${palette.bg}`, color: palette.ink, borderColor: `${palette.accent}90`, boxShadow: `inset 0 0 0 4px ${palette.soft}, inset 0 0 0 5px ${palette.accent}44, 0 12px 28px #160d163b` }}>
      <Sparkles size={16} style={{ color: palette.accent }} />
      <span className="line-clamp-2 break-words text-lg leading-tight" style={{ fontFamily: font.family, fontWeight: font.weight }}>{invitation.names || "Il tuo evento"}</span>
      <span className="h-px w-8" style={{ background: palette.accent }} />
    </div>
  );

  return (
    <motion.section
      exit={reducedMotion ? undefined : { opacity: 0, scale: 1.012 }}
      transition={{ duration: 0.55, ease: "easeInOut" }}
      className={`relative grid place-items-center overflow-hidden px-6 py-12 text-center ${compact ? "min-h-[620px]" : "min-h-[100svh]"}`}
      style={{ color: palette.ink, background: `radial-gradient(ellipse at 50% 40%, ${palette.bg} 4%, transparent 62%), radial-gradient(ellipse at top right, ${palette.accent}35, transparent 67%), linear-gradient(164deg, ${palette.soft}, ${palette.bg} 76%)` }}
    >
      <button type="button" disabled={opening} onClick={() => reducedMotion ? onOpen() : setOpening(true)} className="group relative w-full max-w-xl rounded-[32px] px-2 py-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
        <motion.div
          aria-hidden="true"
          className="relative mx-auto mb-9 grid h-52 w-full max-w-[280px] place-items-center"
          variants={{
            idle: { opacity: 1 },
            reveal: { opacity: [1, 1, 1], scale: [1, 1, 1.018] }
          }}
          animate={opening ? "reveal" : "idle"}
          transition={{ duration, times: [0, 0.87, 1], ease: "easeOut" }}
          onAnimationComplete={(animation) => { if (animation === "reveal") onOpen(); }}
        >
          {balloon ? (
            <>
              <motion.div className="relative h-40 w-[120px]"
                animate={opening ? { scale: [1, 0.94, 1.2, 0.04, 0], opacity: [1, 1, 1, 0, 0] } : reducedMotion ? undefined : { y: [0, -8, 0], rotate: [-3, 2, -3] }}
                transition={opening ? { duration: 1.28, times: [0, 0.25, 0.74, 0.81, 1] } : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }}>
                <span className="absolute inset-0 rounded-[50%_50%_49%_49%] shadow-2xl" style={{
                  background: `radial-gradient(ellipse at 30% 24%, #fffc 0%, #fff5 15%, transparent 32%), radial-gradient(ellipse at 68% 83%, #fff4, transparent 35%), linear-gradient(145deg, ${palette.soft}, ${palette.accent} 49%, ${palette.ink} 145%)`,
                  boxShadow: `inset -10px -10px 22px #0002, 0 16px 36px ${palette.accent}38`
                }} />
                <span className="absolute left-1/2 top-full h-2 w-3 -translate-x-1/2 rounded-sm" style={{ background: palette.accent }} />
                <span className="absolute left-1/2 top-[calc(100%+5px)] h-11 w-4 rounded-[50%] border-l" style={{ borderColor: palette.accent }} />
              </motion.div>
              {opening && Array.from({ length: 36 }, (_, index) => {
                const angle = index * 2 * Math.PI / 36;
                const distance = 70 + (index % 6) * 12;
                const color = [palette.accent, palette.accent2, "#f2cb79", "#fff7d8"][index % 4];
                return <motion.span key={index} className={`pointer-events-none absolute left-1/2 top-1/2 h-2 ${index % 3 === 0 ? "w-2 rounded-full" : "w-1 rounded-sm"}`}
                  style={{ background: color }} initial={{ opacity: 0, x: 0, y: 0 }}
                  animate={{ x: [0, distance * Math.cos(angle), distance * Math.cos(angle) * 1.08], y: [0, distance * Math.sin(angle), distance * Math.sin(angle) + 28], rotate: [0, index * 23, index * 32], opacity: [1, 1, 0] }}
                  transition={{ delay: 0.99, duration: 1.48, ease: "easeOut" }} />;
              })}
            </>
          ) : mode === "gift" ? (
            <div className="relative mt-12 h-36 w-52">
              <RevealLight active={opening} delay={0.53} />
              <motion.div className="absolute inset-x-5 top-4 h-24"
                initial={{ opacity: 0 }} animate={opening ? { y: -105, rotate: -4, opacity: 1 } : undefined} transition={{ delay: 0.82, duration: 1.12, ease: "easeOut" }}>
                {paper}
              </motion.div>
              <div className="absolute inset-x-2 bottom-0 top-5 overflow-hidden rounded-b-lg border shadow-xl" style={{ background: `repeating-linear-gradient(45deg, #fff0 0 4px, #fff1 4px 5px), linear-gradient(135deg, ${palette.accent2}, ${palette.accent} 42%, ${palette.ink})`, borderColor: palette.accent }}>
                <span className="absolute inset-y-0 left-1/2 w-6 -translate-x-1/2" style={{ background: `linear-gradient(90deg, ${palette.soft}, ${palette.bg} 48%, ${palette.soft})` }} />
              </div>
              <motion.div className="absolute inset-x-0 top-1 h-7 rounded-md shadow-md" style={{ background: `linear-gradient(145deg, ${palette.accent2}, ${palette.accent})` }}
                animate={opening ? { y: [0, -11, -79, -92], x: [0, 0, 49, 95], rotate: [0, -4, 15, 28], opacity: [1, 1, 1, 0] } : undefined} transition={{ duration: 1.5, times: [0, 0.28, 0.73, 1], ease: "easeInOut" }}>
                <span className="absolute inset-y-0 left-1/2 w-6 -translate-x-1/2" style={{ background: `linear-gradient(90deg, ${palette.soft}, ${palette.bg} 48%, ${palette.soft})` }} />
                <span className="absolute -top-[19px] right-1/2 h-6 w-9 rotate-[22deg] rounded-[80%_65%_15%_65%] border-[5px]" style={{ borderColor: palette.accent2 }} />
                <span className="absolute -top-[19px] left-1/2 h-6 w-9 -rotate-[22deg] rounded-[65%_80%_65%_15%] border-[5px]" style={{ borderColor: palette.accent2 }} />
              </motion.div>
            </div>
          ) : mode === "curtain" ? (
            <div className="relative grid h-44 w-full max-w-[258px] place-items-center overflow-hidden rounded-t-[42px] rounded-b-xl border shadow-xl" style={{ borderColor: palette.accent, background: `radial-gradient(ellipse at 50% 45%, #f9d99a, ${palette.ink} 75%)` }}>
              <RevealLight active={opening} delay={0.26} />
              <motion.div className="relative h-28 w-40" initial={{ scale: 0.82, opacity: 0.5 }}
                animate={opening ? { scale: 1.08, opacity: 1 } : undefined} transition={{ delay: 0.53, duration: 1.2 }}>
                {paper}
              </motion.div>
              {([-1, 1] as const).map((side) => (
                <motion.span key={side} className={`absolute inset-y-0 w-1/2 ${side === -1 ? "left-0" : "right-0"}`}
                  style={{ background: `repeating-linear-gradient(90deg, ${palette.ink} 0%, ${palette.accent} 13%, ${palette.accent2} 18%, ${palette.ink} 34%)`, borderBottom: `4px solid ${palette.accent2}` }}
                  animate={opening ? { x: side === -1 ? "-92%" : "92%", scaleX: 0.72 } : undefined} transition={{ delay: 0.12, duration: 1.48, ease: "easeInOut" }} />
              ))}
            </div>
          ) : mode === "postcard" ? (
            <div className="relative" style={{ perspective: 720 }}>
              <RevealLight active={opening} delay={0.64} />
              <motion.div className="relative h-36 w-56 sm:w-60" style={{ transformStyle: "preserve-3d" }}
                initial={{ rotateY: 0, rotateZ: -6 }} animate={opening ? { rotateY: [0, -12, 180], rotateZ: [-6, -2, 0], scale: [1, 1.03, 1.08] } : { rotateY: 0, rotateZ: -6 }} transition={{ duration: 1.65, times: [0, 0.2, 1], ease: "easeInOut" }}>
                <div className="absolute inset-0 grid place-items-center rounded-xl border-4 border-double shadow-xl" style={{ borderColor: palette.accent, background: `repeating-linear-gradient(120deg, ${palette.accent}0d 0 1px, transparent 1px 6px), radial-gradient(ellipse at center, ${palette.bg} 24%, ${palette.soft})`, color: palette.accent, backfaceVisibility: "hidden" }}>
                  <RotateCw size={32} />
                  <span className="absolute right-3 top-3 h-6 w-5 rounded-sm border border-dashed" style={{ borderColor: palette.accent, background: palette.soft }} />
                  <span className="absolute bottom-4 left-4 h-1 w-12 rounded-full" style={{ background: `linear-gradient(90deg, ${palette.soft}, ${palette.bg} 48%, ${palette.soft})` }} />
                </div>
                <div className="absolute inset-0 grid place-items-center rounded-xl border-4 border-double shadow-xl" style={{ borderColor: palette.accent, background: palette.soft, color: palette.ink, backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                  {paper}
                </div>
              </motion.div>
            </div>
          ) : (
            <div className="relative mt-10 h-[150px] w-full max-w-[266px]" style={{ perspective: 760 }}>
              <div className="absolute inset-0 rounded-lg border"
                style={{ background: `linear-gradient(170deg, ${palette.ink}, ${palette.accent} 66%, ${palette.soft})`, borderColor: `${palette.accent}77`, boxShadow: "0 21px 36px #2d182e32, 0 3px 7px #2d182e30" }} />
              <RevealLight active={opening} delay={0.38} />
              <motion.div className="absolute inset-x-0 top-0 z-20 h-[86px] origin-top rounded-t-md"
                style={{ background: `repeating-linear-gradient(135deg, #fff0 0 2px, #fff2 2px 3px), linear-gradient(145deg, ${palette.bg}, ${palette.soft} 66%, ${palette.accent2})`, clipPath: "polygon(0 0, 100% 0, 52% 100%, 48% 100%)" }}
                animate={opening ? { rotateX: [0, 28, 171], zIndex: [20, 20, 0] } : undefined}
                transition={{ delay: 0.45, duration: 0.85, times: [0, 0.4, 1], ease: "easeInOut" }} />
              <motion.div className="absolute inset-x-5 top-4 z-10 h-28"
                initial={{ opacity: 0, scale: 0.94 }} animate={opening ? { y: -122, opacity: 1, rotate: -2, scale: 1.04 } : undefined}
                transition={{ delay: 1.07, duration: 1.06, ease: "easeOut" }}>
                {paper}
              </motion.div>
              <div className="pointer-events-none absolute inset-0 z-10 rounded-lg"
                style={{ background: `linear-gradient(140deg, transparent 48%, ${palette.accent}23 49%, transparent 50%), linear-gradient(220deg, transparent 48%, ${palette.accent}23 49%, transparent 50%), linear-gradient(155deg, ${palette.bg}, ${palette.soft})`, clipPath: "polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%)" }} />
              <motion.span className="absolute left-1/2 top-[82px] z-30 grid h-[58px] w-[58px] place-items-center text-[20px]"
                style={{ x: "-50%", y: "-50%", borderRadius: "47% 53% 51% 49% / 53% 47% 55% 45%", background: "radial-gradient(circle at 28% 18%, #d88a79 0%, #9e424e 28%, #742436 63%, #421427 100%)", boxShadow: "inset 2px 3px 4px #ffd4aa77, inset -3px -4px 5px #36101a, 1px 6px 10px #32132366", color: "#f7d69e" }}
                animate={opening ? { opacity: [1, 1, 0], scale: [1, 1.08, 0.75], y: ["-50%", "-44%", "-8%"], rotate: [0, -7, 15] } : undefined}
                transition={{ duration: 0.79, times: [0, 0.44, 1], ease: "easeInOut" }}>
                <span className="grid h-10 w-10 place-items-center rounded-full border border-[#e6ad8266]" style={{ boxShadow: "inset 0 1px 3px #3b102ab0, 0 1px 1px #f0b08488", textShadow: "0 2px 2px #30131c" }}>✧</span>
              </motion.span>
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

function RevealLight({ active, delay }: { active: boolean; delay: number }) {
  if (!active) return null;
  return (
    <motion.div aria-hidden="true" className="pointer-events-none absolute inset-x-[-22%] top-[-85%] z-10 h-[200%] origin-[50%_78%]"
      initial={{ opacity: 0, scaleX: 0.2, scaleY: 0.5 }}
      animate={{ opacity: [0, 0.88, 0.65, 0], scaleX: [0.2, 0.75, 1.12, 1.22], scaleY: [0.5, 0.9, 1.05, 1.1] }}
      transition={{ delay, duration: 1.88, times: [0, 0.35, 0.63, 1], ease: "easeOut" }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 78%, #fff9d6 0%, #ffe2a57a 22%, transparent 61%)" }} />
      <div className="absolute inset-0" style={{ clipPath: "polygon(10% 0, 32% 0, 48% 78%, 43% 0, 56% 0, 52% 78%, 71% 0, 90% 0, 55% 79%, 45% 79%)", background: "linear-gradient(0deg, transparent 20%, #ffdb8d50 24%, #fff3bf55 42%, transparent 100%)", filter: "blur(5px)" }} />
    </motion.div>
  );
}
