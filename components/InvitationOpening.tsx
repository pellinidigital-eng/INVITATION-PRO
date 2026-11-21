"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Invitation, palettes } from "@/lib/invitation-data";

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
  const balloon = invitation.opening === "balloon";

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
          animate={opening ? { scale: balloon ? 1.18 : 1.12, opacity: 0, y: -24 } : balloon && !reducedMotion ? { y: [0, -9, 0] } : undefined}
          transition={opening ? { duration: 0.4, ease: "easeOut" } : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
          onAnimationComplete={() => { if (opening) onOpen(); }}
        >
          {balloon ? (
            <>
              <span className="h-36 w-28 rounded-[50%_50%_48%_48%] shadow-xl" style={{ background: `radial-gradient(ellipse at 28% 22%, ${palette.soft}, ${palette.accent} 72%)` }} />
              <span className="absolute top-[calc(100%-8px)] h-9 w-px rotate-12" style={{ background: palette.accent }} />
            </>
          ) : (
            <div className="relative grid h-36 w-56 place-items-center overflow-hidden rounded-lg border shadow-xl" style={{ borderColor: palette.accent, background: palette.bg }}>
              <span className="absolute inset-x-0 top-0 h-24" style={{ background: palette.soft, clipPath: "polygon(0 0, 100% 0, 50% 100%)" }} />
              <span className="relative mt-8 grid h-10 w-10 place-items-center rounded-full border border-white/40 text-lg text-white shadow-md" style={{ background: palette.accent }}>✦</span>
            </div>
          )}
        </motion.div>
        <span className="block break-words text-4xl leading-tight" style={{ fontFamily: font.family, fontWeight: font.weight }}>{invitation.names || "Il tuo evento"}</span>
        <span className="mt-6 inline-flex min-h-11 items-center rounded-full border px-5 text-sm font-semibold group-hover:shadow-md" style={{ borderColor: palette.accent }}>
          {balloon ? "Tocca il palloncino per aprire" : "Apri l’invito"}
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
