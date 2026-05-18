"use client";

import type React from "react";
import { motion } from "framer-motion";
import { CalendarPlus, Clock3, MapPin, MessageCircle, QrCode, Shirt, Sparkles } from "lucide-react";
import { buildInviteCopy } from "@/lib/copy-engine";
import { Invitation, palettes, planFeatures, ProductPlan, templates } from "@/lib/invitation-data";

type Props = {
  invitation: Invitation;
  compact?: boolean;
  plan?: ProductPlan;
};

type Palette = (typeof palettes)[keyof typeof palettes];

const templateStyles = {
  lumiere: { align: "items-center text-center", frame: "max-w-3xl", radius: "rounded-[34px]", rule: true },
  botanica: { align: "items-start text-left", frame: "max-w-4xl", radius: "rounded-[30px]", rule: false },
  cinema: { align: "items-center text-center", frame: "max-w-3xl", radius: "rounded-[28px]", rule: true },
  atelier: { align: "items-center text-center", frame: "max-w-3xl", radius: "rounded-[36px]", rule: false },
  playful: { align: "items-start text-left", frame: "max-w-4xl", radius: "rounded-[28px]", rule: false },
  executive: { align: "items-start text-left", frame: "max-w-4xl", radius: "rounded-[24px]", rule: true }
} as const;

export function TemplateStage({ invitation, compact = false, plan = "premium" }: Props) {
  const palette = palettes[invitation.palette as keyof typeof palettes] ?? palettes.champagne;
  const copy = buildInviteCopy(invitation);
  const template = templates.find((item) => item.id === invitation.template) ?? templates[0];
  const templateStyle = templateStyles[invitation.template] ?? templateStyles.lumiere;
  const features = planFeatures[plan];
  const dateValue = invitation.date ? new Date(invitation.date) : undefined;
  const validDate = dateValue && Number.isFinite(dateValue.getTime());
  const dateLabel = validDate
    ? new Intl.DateTimeFormat("it-IT", { day: "2-digit", month: "long", year: "numeric" }).format(dateValue)
    : "Data da definire";
  const calendarDate = validDate ? invitation.date.replace(/-/g, "") : "";
  const calendarTime = (invitation.time || "17:00").replace(":", "").padEnd(4, "0");
  const calendarUrl = calendarDate
    ? `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(invitation.names)}&dates=${calendarDate}T${calendarTime}00/${calendarDate}T235900&details=${encodeURIComponent(copy.opening)}&location=${encodeURIComponent(invitation.place || "")}`
    : "";
  const whatsappDigits = invitation.whatsapp.replace(/\D/g, "");
  const whatsappUrl = whatsappDigits ? `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(copy.whatsapp)}` : "";
  const heroImage = invitation.images[0];
  const name = invitation.names || "Il tuo evento";
  const heroFontSize = nameFontSize(name, compact);
  const dark = palette.bg === "#101114";
  const surface = dark ? "rgba(16,17,20,.74)" : "rgba(255,255,255,.72)";
  const softSurface = dark ? "rgba(255,255,255,.08)" : "rgba(255,255,255,.68)";

  return (
    <section
      id="invite-capture"
      className={`relative overflow-hidden ${compact ? "min-h-[620px] rounded-[28px]" : "min-h-screen"}`}
      style={{ background: palette.bg, color: palette.ink }}
    >
      <HeroBackground invitation={invitation} palette={palette} image={heroImage} />

      <div className={`relative z-10 mx-auto flex ${compact ? "min-h-[620px] px-4 py-5" : "min-h-screen px-5 py-10 sm:px-8 sm:py-14"} ${templateStyle.align}`}>
        <motion.div
          className={`mx-auto flex w-full ${templateStyle.frame} flex-col ${templateStyle.align}`}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <div
            className={`w-full border ${templateStyle.radius} ${compact ? "px-5 py-7" : "px-5 py-8 sm:px-10 sm:py-11"} shadow-[0_24px_80px_rgba(15,20,30,.12)] backdrop-blur-xl`}
            style={{ background: surface, borderColor: `${palette.accent}30` }}
          >
            <div className={`flex flex-wrap items-center gap-3 ${templateStyle.align.includes("center") ? "justify-center" : "justify-between"}`}>
              <span className="inline-flex items-center gap-2 rounded-full border px-3 py-2 text-[11px] font-semibold uppercase tracking-[.16em]" style={{ borderColor: `${palette.accent}40`, color: palette.accent, background: softSurface }}>
                <Sparkles size={13} />
                {template.name}
              </span>
              {!compact && <span className="text-xs font-medium uppercase tracking-[.18em] opacity-55">{invitation.eventType.replace("-", " ")}</span>}
            </div>

            {templateStyle.rule && <div className="mx-auto mt-7 h-px w-20" style={{ background: `${palette.accent}70` }} />}

            <p className={`${compact ? "mt-7 text-[11px]" : "mt-9 text-xs"} max-w-2xl uppercase tracking-[.22em] opacity-65`}>
              {copy.title}
            </p>

            <h1
              className="mx-auto mt-4 max-w-[980px] whitespace-normal text-balance font-editorial font-medium leading-[.98] tracking-normal [hyphens:none] [overflow-wrap:break-word] [word-break:normal]"
              style={{ fontSize: heroFontSize }}
            >
              {name}
            </h1>

            <p className={`${compact ? "mt-5 text-sm leading-6" : "mt-6 text-base leading-8 sm:text-lg"} mx-auto max-w-2xl opacity-76`}>
              {copy.opening}
            </p>

            {!compact && (
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {whatsappUrl ? (
                  <a className="inline-flex min-h-12 items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_34px_rgba(0,0,0,.14)]" style={{ background: palette.accent }} href={whatsappUrl} target="_blank" rel="noreferrer">
                    <MessageCircle size={17} /> {copy.rsvp}
                  </a>
                ) : (
                  <span className="inline-flex min-h-12 items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white/85" style={{ background: palette.accent }}>
                    <MessageCircle size={17} /> WhatsApp RSVP non impostato
                  </span>
                )}
                {calendarUrl && (
                  <a className="inline-flex min-h-12 items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold backdrop-blur-xl" style={{ borderColor: `${palette.accent}45`, background: softSurface }} href={calendarUrl} target="_blank" rel="noreferrer">
                    <CalendarPlus size={17} /> Aggiungi al calendario
                  </a>
                )}
                <a className="inline-flex min-h-12 items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold backdrop-blur-xl" style={{ borderColor: `${palette.accent}45`, background: softSurface }} href="#qr-section">
                  <QrCode size={17} /> QR automatico
                </a>
              </div>
            )}
          </div>

          <div className={`mt-4 grid w-full gap-2 ${compact ? "grid-cols-3" : "gap-3 sm:grid-cols-3"}`}>
            <InfoCard compact={compact} icon={<Clock3 size={17} />} label="Quando" value={`${dateLabel}${invitation.time ? `, ${invitation.time}` : ""}`} palette={palette} />
            <InfoCard compact={compact} icon={<MapPin size={17} />} label="Dove" value={invitation.place || "Location da definire"} palette={palette} />
            <InfoCard compact={compact} icon={<Shirt size={17} />} label="Dress code" value={invitation.dressCode || "Elegante ma comodo"} palette={palette} />
          </div>
        </motion.div>
      </div>

      {features.watermark && (
        <div className="pointer-events-none absolute bottom-5 right-5 z-20 rounded-full border px-4 py-2 text-xs font-semibold backdrop-blur-xl" style={{ borderColor: `${palette.accent}44`, background: surface }}>
          Invitation Creator PRO Demo
        </div>
      )}

      {!compact && (
        <section className="relative z-10 mx-auto grid max-w-5xl gap-5 px-5 pb-16 sm:px-8 lg:grid-cols-[1.1fr_.9fr]">
          <div className="rounded-[28px] border p-6 sm:p-8" style={{ borderColor: `${palette.accent}28`, background: surface }}>
            <p className="text-xs font-semibold uppercase tracking-[.2em] opacity-55">{copy.layout.note}</p>
            <h2 className="mt-3 font-editorial text-4xl leading-tight sm:text-5xl">{copy.detailsTitle}</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 opacity-72">{copy.emotional}</p>
            <div className="mt-7 space-y-3">
              {copy.timeline.slice(0, 4).map((item, index) => (
                <motion.div
                  key={`${item}-${index}`}
                  className="flex items-center gap-4 rounded-2xl border px-4 py-3"
                  style={{ borderColor: `${palette.accent}22`, background: softSurface }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04 }}
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-semibold text-white" style={{ background: palette.accent }}>{index + 1}</span>
                  <span className="text-sm font-medium sm:text-base">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-[28px] border p-6" style={{ borderColor: `${palette.accent}28`, background: surface }}>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.18em]" style={{ color: palette.accent }}><MapPin size={15} /> Location</div>
              <div className="mt-3 text-balance text-2xl font-semibold leading-tight">{invitation.place || "Location da definire"}</div>
              <a className="mt-5 inline-flex min-h-11 items-center rounded-full px-4 py-2 text-sm font-semibold text-white" style={{ background: palette.accent }} href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(invitation.place || "Roma")}`} target="_blank" rel="noreferrer">
                Apri Google Maps
              </a>
              <div className="mt-5 h-44 overflow-hidden rounded-2xl bg-black/10">
                <iframe
                  title="Google Maps"
                  className="h-full w-full"
                  loading="lazy"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(invitation.place || "Roma")}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                />
              </div>
            </div>
            <div className="rounded-[28px] border p-6" style={{ borderColor: `${palette.accent}28`, background: surface }}>
              <div className="text-xs font-semibold uppercase tracking-[.18em]" style={{ color: palette.accent }}>{copy.countdown}</div>
              <Countdown date={invitation.date} palette={palette} />
              <p className="mt-5 text-sm leading-6 opacity-65">{copy.musicLine}</p>
            </div>
          </div>
        </section>
      )}
    </section>
  );
}

function HeroBackground({ invitation, palette, image }: { invitation: Invitation; palette: Palette; image?: string }) {
  const isCinema = invitation.template === "cinema";
  const imageOverlay = isCinema
    ? "linear-gradient(180deg, rgba(7,8,10,.30), rgba(7,8,10,.78))"
    : `linear-gradient(180deg, ${palette.bg}d8, ${palette.bg}f6)`;
  return (
    <>
      {image ? (
        <img className="absolute inset-0 h-full w-full object-cover" src={image} alt="" />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(145deg, ${palette.bg}, ${palette.soft} 56%, ${palette.bg})`
          }}
        />
      )}
      <div className="absolute inset-0" style={{ background: image ? imageOverlay : `linear-gradient(180deg, ${palette.bg}22, ${palette.bg}f4)` }} />
      <div className="absolute inset-x-0 top-0 h-40" style={{ background: `linear-gradient(180deg, ${palette.bg}, transparent)` }} />
    </>
  );
}

function InfoCard({ compact = false, icon, label, value, palette }: { compact?: boolean; icon: React.ReactNode; label: string; value: string; palette: Palette }) {
  return (
    <div className={`flex flex-col justify-between border ${compact ? "min-h-[86px] rounded-[18px] p-3" : "min-h-[112px] rounded-[24px] p-4 sm:p-5"}`} style={{ borderColor: `${palette.accent}26`, background: palette.bg === "#101114" ? "rgba(255,255,255,.07)" : "rgba(255,255,255,.74)" }}>
      <div className={`flex items-center gap-2 font-semibold uppercase opacity-58 ${compact ? "text-[9px] tracking-[.11em]" : "text-[11px] tracking-[.18em]"}`}>
        {!compact && <span style={{ color: palette.accent }}>{icon}</span>}
        {label}
      </div>
      <div className={`mt-3 text-balance font-semibold leading-snug ${compact ? "line-clamp-2 text-[11px]" : "text-base sm:text-lg"}`}>{value}</div>
    </div>
  );
}

function Countdown({ date, palette }: { date: string; palette: Palette }) {
  const parsed = date ? new Date(date).getTime() : Date.now();
  const target = Number.isFinite(parsed) ? parsed : Date.now();
  const diff = Math.max(0, target - Date.now());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  return (
    <div className="mt-4 grid grid-cols-3 gap-3">
      {[
        ["Giorni", days],
        ["Ore", hours],
        ["Min", minutes]
      ].map(([label, value]) => (
        <div key={label} className="rounded-2xl p-4 text-center" style={{ background: palette.soft }}>
          <div className="text-2xl font-semibold sm:text-3xl">{value}</div>
          <div className="mt-1 text-[10px] font-semibold uppercase tracking-[.16em] opacity-62">{label}</div>
        </div>
      ))}
    </div>
  );
}

function nameFontSize(name: string, compact: boolean) {
  const letters = Array.from(name.replace(/\s+/g, "")).length;
  if (compact) {
    if (letters > 30) return "clamp(2rem, 8vw, 3rem)";
    if (letters > 20) return "clamp(2.25rem, 9vw, 3.45rem)";
    return "clamp(2.65rem, 11vw, 4.15rem)";
  }
  if (letters > 34) return "clamp(2.7rem, 6.6vw, 4.8rem)";
  if (letters > 24) return "clamp(3.1rem, 7.8vw, 5.8rem)";
  return "clamp(3.7rem, 9vw, 6.9rem)";
}
