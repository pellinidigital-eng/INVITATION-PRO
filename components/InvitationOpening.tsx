"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { RotateCw, Sparkles } from "lucide-react";
import { defaultEnvelopeColor, envelopeColorPattern, Invitation, invitationOpenings, palettes } from "@/lib/invitation-data";

import { getInvitationFont } from "@/lib/invitation-fonts";

const envelopeEventIntro: Record<Invitation["eventType"], string> = {
  matrimonio: "Per il matrimonio di",
  compleanno: "Per il compleanno di",
  battesimo: "Per il battesimo di",
  comunione: "Per la comunione di",
  "baby-shower": "Per il baby shower di",
  laurea: "Per la laurea di",
  anniversario: "Per l’anniversario di",
  business: "In occasione di"
};

const ceremonyDateFormat = new Intl.DateTimeFormat("it-IT", { dateStyle: "long", timeZone: "UTC" });

const envelopeFolds = [
  { side: "left", origin: "left center", travel: { rotateY: -105, x: "-9%" }, shade: 105,
    clip: "polygon(0 0, 12% 12%, 26% 29%, 52% 50%, 29% 70%, 12% 87%, 0 100%)", ornament: "left-[-19%] top-[37%] w-[76%] rotate-90" },
  { side: "right", origin: "right center", travel: { rotateY: 105, x: "9%" }, shade: 240,
    clip: "polygon(100% 0, 88% 12%, 74% 29%, 48% 50%, 71% 70%, 88% 87%, 100% 100%)", ornament: "right-[-19%] top-[37%] w-[76%] -rotate-90" },
  { side: "bottom", origin: "center bottom", travel: { rotateX: -100, y: "10%" }, shade: 15,
    clip: "polygon(0 100%, 100% 100%, 83% 80%, 66% 63%, 50% 48%, 34% 63%, 17% 80%)", ornament: "bottom-[4%] left-[12%] w-[76%] rotate-180" },
  { side: "top", origin: "center top", travel: { rotateX: 105, y: "-8%" }, shade: 155,
    clip: "polygon(0 0, 100% 0, 89% 15%, 82% 21%, 78% 29%, 70% 33%, 66% 40%, 56% 46%, 50% 52%, 44% 46%, 34% 40%, 30% 33%, 22% 29%, 18% 21%, 11% 15%)", ornament: "left-[12%] top-[3%] w-[76%]" }
];

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
  const envelope = mode === "envelope";
  const envelopeColor = invitation.envelopeColor && envelopeColorPattern.test(invitation.envelopeColor)
    ? invitation.envelopeColor : defaultEnvelopeColor;
  const duration = envelope ? 7.4 : 2.65;
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
          className={`relative mx-auto grid w-full place-items-center ${envelope ? "mb-6 h-[clamp(285px,53svh,420px)] max-w-[245px]" : "mb-9 h-52 max-w-[280px]"}`}
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
            <div className="relative h-full w-full max-w-[230px]" data-envelope-color={envelopeColor} style={{ perspective: 900 }}>
              <motion.div className="absolute inset-0 rounded-xl"
                style={{ background: `linear-gradient(155deg, #26192120, #26192177), ${envelopeColor}`, boxShadow: "0 20px 48px #25132240" }}
                animate={opening ? { opacity: 0, y: 20 } : undefined}
                transition={{ delay: 1.38, duration: 0.85, ease: "easeInOut" }} />
              <RevealLight active={opening} delay={0.45} />
              <motion.div className="absolute inset-x-3 inset-y-4 z-10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={opening ? { y: -8, opacity: 1, scale: 1.12 } : undefined}
                transition={{ delay: 0.87, duration: 1.35, ease: "easeOut" }}>
                {opening && <EnvelopeCard invitation={invitation} />}
              </motion.div>
              {envelopeFolds.map((fold, index) => (
                <motion.div key={fold.side} className={`pointer-events-none absolute inset-0 rounded-xl ${index === 3 ? "z-[23]" : "z-20"}`}
                  style={{ transformOrigin: fold.origin, filter: "drop-shadow(0 3px 2px #3e253e65)" }}
                  animate={opening ? { ...fold.travel, opacity: [1, 1, 0] } : undefined}
                  transition={{ delay: 0.57 + (index === 3 ? 0 : index * 0.09 + 0.16), duration: 1.26, times: [0, 0.67, 1], ease: "easeInOut" }}>
                  <div className="absolute inset-0 overflow-hidden rounded-xl" style={{
                    clipPath: fold.clip,
                    background: `repeating-linear-gradient(130deg, transparent 0 3px, #ffffff13 3px 4px), linear-gradient(${fold.shade}deg, #fff7 0%, #fff0 42%, #29102535 86%, #fff3 100%), ${envelopeColor}`
                  }}>
                    <img src="/openings/botanical-relief.webp" alt="" className={`pointer-events-none absolute opacity-80 mix-blend-luminosity ${fold.ornament}`}
                      style={{ filter: "drop-shadow(0 1px 1px #2c151967)" }} />
                  </div>
                </motion.div>
              ))}
              <motion.span className="absolute left-1/2 top-1/2 z-30 grid h-[58px] w-[58px] place-items-center text-[20px]"
                style={{ x: "-50%", y: "-50%", borderRadius: "47% 53% 51% 49% / 53% 47% 55% 45%", background: "radial-gradient(circle at 28% 18%, #d88a79 0%, #9e424e 28%, #742436 63%, #421427 100%)", boxShadow: "inset 2px 3px 4px #ffd4aa77, inset -3px -4px 5px #36101a, 1px 6px 10px #32132366", color: "#f7d69e" }}
                animate={opening ? { opacity: [1, 1, 0], scale: [1, 1.08, 0.75], y: ["-50%", "-44%", "-8%"], rotate: [0, -7, 15] } : undefined}
                transition={{ duration: 0.79, times: [0, 0.44, 1], ease: "easeInOut" }}>
                <span className="grid h-10 w-10 place-items-center rounded-full border border-[#e6ad8266]" style={{ boxShadow: "inset 0 1px 3px #3b102ab0, 0 1px 1px #f0b08488", textShadow: "0 2px 2px #30131c" }}>✧</span>
              </motion.span>
            </div>
          )}
        </motion.div>
        <motion.span className="block" animate={envelope && opening ? { opacity: 0 } : undefined} transition={{ duration: 0.35 }}>
          <span className="block break-words text-4xl leading-tight" style={{ fontFamily: font.family, fontWeight: font.weight }}>{invitation.names || "Il tuo evento"}</span>
          <span className="mt-6 inline-flex min-h-11 items-center rounded-full border px-5 text-sm font-semibold group-hover:shadow-md" style={{ borderColor: palette.accent }}>
            {invitationOpenings[mode].action}
          </span>
        </motion.span>
      </button>
    </motion.section>
  );
}

function EnvelopeCard({ invitation }: { invitation: Invitation }) {
  const palette = palettes[invitation.palette as keyof typeof palettes] ?? palettes.champagne;
  const date = Date.parse(invitation.date);
  const names = invitation.names.trim();
  const couple = invitation.eventType === "matrimonio" && names.match(/^(.+)\s+&\s+(.+)$/);

  return (
    <div className="relative h-full overflow-hidden rounded-sm border bg-[#fffaf3] shadow-xl"
      style={{ color: palette.ink, borderColor: `${palette.accent}70`, backgroundImage: "repeating-linear-gradient(125deg, #9b806707 0 1px, transparent 1px 4px)" }}>
      <span className="absolute inset-2 rounded-sm border border-double" style={{ borderColor: `${palette.accent}80`, borderWidth: 3 }} />
      {[false, true].map((bottom) => (
        <img key={String(bottom)} src="/openings/botanical-relief.webp" alt=""
          className={`absolute left-1/2 h-[21%] w-[69%] -translate-x-1/2 object-contain opacity-75 mix-blend-multiply ${bottom ? "bottom-1 rotate-180" : "top-1"}`} />
      ))}
      <motion.div className="absolute inset-x-4 inset-y-[20%] grid content-center gap-3"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: [0, 1, 1, 0], y: [8, 0, 0, -6] }}
        transition={{ delay: 1.27, duration: 2.86, times: [0, 0.3, 0.83, 1], ease: "easeInOut" }}>
        <span className="grid justify-items-center text-[clamp(2.5rem,11vw,3.5rem)] leading-[0.93]"
          style={{ fontFamily: '"Great Vibes", cursive' }}>
          <span>Save</span>
          <span className="my-1 text-sm uppercase tracking-[0.18em]" style={{ fontFamily: '"Cormorant Garamond", serif' }}>the</span>
          <span>Date</span>
        </span>
        {Number.isFinite(date) && (
          <time dateTime={invitation.date} className="text-sm tracking-wide" style={{ fontFamily: '"Cormorant Garamond", serif' }}>{ceremonyDateFormat.format(date)}</time>
        )}
      </motion.div>
      <motion.div className="absolute inset-x-4 inset-y-[20%] grid content-center gap-2"
        initial={{ opacity: 0, y: 7 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 4.02, duration: 0.75, ease: "easeInOut" }}>
        <span className="text-base italic leading-tight" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
          {names ? envelopeEventIntro[invitation.eventType] : envelopeEventIntro[invitation.eventType].replace(/ di$/, "")}
        </span>
        {names && (
          <span className={`break-words leading-none ${names.length > 34 ? "text-[clamp(1.5rem,7vw,2.25rem)]" : "text-[clamp(2rem,9vw,3rem)]"}`}
            style={{ fontFamily: '"Great Vibes", cursive' }}>
            {couple ? <>{couple[1]}<span className="block text-2xl">&amp;</span>{couple[2]}</> : names}
          </span>
        )}
      </motion.div>
    </div>
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
