"use client";

import { motion } from "framer-motion";
import { CalendarPlus, MapPin, Music2, QrCode, Sparkles } from "lucide-react";
import { buildInviteCopy } from "@/lib/copy-engine";
import { Invitation, palettes, planFeatures, ProductPlan, templates } from "@/lib/invitation-data";

type Props = {
  invitation: Invitation;
  compact?: boolean;
  plan?: ProductPlan;
};

export function TemplateStage({ invitation, compact = false, plan = "premium" }: Props) {
  const palette = palettes[invitation.palette as keyof typeof palettes] ?? palettes.champagne;
  const copy = buildInviteCopy(invitation);
  const template = templates.find((item) => item.id === invitation.template) ?? templates[0];
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
    : "#";
  const cta = copy.rsvp;

  const isDark = palette.bg === "#101114";
  const heroImage = invitation.images[0];
  const overlay =
    invitation.template === "cinema"
      ? "linear-gradient(180deg, rgba(0,0,0,.1), rgba(0,0,0,.72))"
      : `linear-gradient(180deg, ${palette.bg}22, ${palette.bg}f2)`;

  return (
    <section
      id="invite-capture"
      className={`relative overflow-hidden ${compact ? "min-h-[620px] rounded-[28px]" : "min-h-screen"} noise`}
      style={{ background: palette.bg, color: palette.ink }}
    >
      {heroImage ? (
        <img className="absolute inset-0 h-full w-full object-cover" src={heroImage} alt="" />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background:
              invitation.template === "playful"
                ? `radial-gradient(circle at 22% 20%, ${palette.accent2}55, transparent 24%), radial-gradient(circle at 82% 18%, ${palette.accent}33, transparent 22%), linear-gradient(145deg, ${palette.bg}, ${palette.soft})`
                : `linear-gradient(145deg, ${palette.bg}, ${palette.soft} 58%, ${palette.accent}20)`
          }}
        />
      )}
      <div className="absolute inset-0" style={{ background: overlay }} />
      <motion.div
        className="absolute inset-x-5 top-20 z-10 mx-auto max-w-sm rounded-[26px] border p-4 text-center backdrop-blur-2xl"
        style={{ borderColor: `${palette.accent}33`, background: `${palette.bg}c9` }}
        initial={{ opacity: 1, y: 0, rotateX: 0 }}
        animate={{ opacity: 0, y: -28, rotateX: -28 }}
        transition={{ duration: 1.1, delay: 0.55, ease: "easeInOut" }}
      >
        <div className="mx-auto mb-3 h-1 w-16 rounded-full" style={{ background: palette.accent }} />
        <div className="text-xs uppercase tracking-[.24em] opacity-60">invitation opening</div>
        <div className="mt-2 font-editorial text-2xl">{template.name}</div>
      </motion.div>
      <motion.div
        className="absolute left-6 top-6 z-10 flex items-center gap-2 rounded-full border px-3 py-2 text-xs uppercase tracking-[.18em] backdrop-blur-xl"
        style={{ borderColor: `${palette.accent}55`, background: `${palette.bg}aa` }}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Sparkles size={14} />
        {template.name}
      </motion.div>
      <div className={`relative z-10 mx-auto flex max-w-5xl flex-col justify-end px-5 ${compact ? "min-h-[620px] py-8" : "min-h-screen py-12 sm:px-8"}`}>
        <motion.div
          initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <p className="mb-4 text-sm uppercase tracking-[.28em]" style={{ color: palette.accent }}>
            {copy.title}
          </p>
          <h1 className="break-words font-editorial text-[3.3rem] leading-[.9] sm:text-[7rem]" style={{ color: isDark ? palette.ink : palette.ink }}>
            {invitation.names || "Il tuo evento"}
          </h1>
          <p className="mt-6 max-w-2xl break-words text-lg leading-8 opacity-85">{copy.opening}</p>
          <p className="mt-4 max-w-xl text-sm leading-6 opacity-70">{copy.subtitle}</p>
        </motion.div>

        <motion.div
          className="mt-8 grid gap-3 sm:grid-cols-3"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          {[
            [dateLabel, invitation.time || "Orario"],
            [invitation.place || "Location", "Mappa e dettagli"],
            [invitation.dressCode || "Dress code", "Stile ospiti"]
          ].map(([title, sub]) => (
            <div key={title} className="rounded-2xl border p-4 backdrop-blur-2xl" style={{ background: `${palette.bg}c7`, borderColor: `${palette.accent}35` }}>
              <div className="text-sm uppercase tracking-[.18em]" style={{ color: palette.accent }}>{sub}</div>
              <div className="mt-2 break-words text-lg font-medium">{title}</div>
            </div>
          ))}
        </motion.div>

        {!compact && (
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-soft-xl" style={{ background: palette.accent }} href={`https://wa.me/${invitation.whatsapp}?text=${encodeURIComponent(copy.whatsapp)}`}>
              <Music2 size={17} /> {cta}
            </a>
            <a className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold backdrop-blur-xl" style={{ borderColor: `${palette.accent}55`, background: `${palette.bg}bb` }} href={calendarUrl} target="_blank" rel="noreferrer">
              <CalendarPlus size={17} /> Aggiungi al calendario
            </a>
            <button className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold backdrop-blur-xl" style={{ borderColor: `${palette.accent}55`, background: `${palette.bg}bb` }}>
              <QrCode size={17} /> QR automatico
            </button>
          </div>
        )}
      </div>
      <motion.div
        className="absolute right-5 top-1/3 hidden h-48 w-24 rounded-full blur-3xl sm:block"
        style={{ background: palette.accent }}
        animate={{ y: [0, -18, 0], opacity: [0.16, 0.28, 0.16] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      {features.watermark && (
        <div className="pointer-events-none absolute bottom-5 right-5 z-20 rounded-full border px-4 py-2 text-xs font-semibold backdrop-blur-xl" style={{ borderColor: `${palette.accent}55`, background: `${palette.bg}cc` }}>
          Created with Invitation Creator PRO Demo
        </div>
      )}
      {!compact && (
        <div className="relative z-10 mx-auto grid max-w-5xl gap-8 px-5 pb-20 sm:grid-cols-[1fr_.8fr] sm:px-8">
          <div className="rounded-[28px] border p-6 backdrop-blur-xl" style={{ borderColor: `${palette.accent}33`, background: `${palette.bg}d8` }}>
            <div className="text-xs uppercase tracking-[.2em] opacity-55">{copy.layout.note}</div>
            <h2 className="mt-2 font-editorial text-4xl">{copy.detailsTitle}</h2>
            <p className="mt-3 leading-7 opacity-70">{copy.emotional}</p>
            <div className="mt-6 space-y-4">
              {copy.timeline.map((item, index) => (
                <motion.div
                  key={item}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <span className="grid h-9 w-9 place-items-center rounded-full text-sm text-white" style={{ background: palette.accent }}>{index + 1}</span>
                  <span className="text-lg">{item}</span>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {copy.sections.map((item) => (
                <div key={item} className="rounded-2xl border px-4 py-3 text-sm font-medium" style={{ borderColor: `${palette.accent}22`, background: `${palette.soft}88` }}>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-[28px] border p-6" style={{ borderColor: `${palette.accent}33`, background: `${palette.bg}d8` }}>
              <div className="flex items-center gap-2 text-sm uppercase tracking-[.18em]" style={{ color: palette.accent }}><MapPin size={16} /> Location</div>
              <div className="mt-3 break-words text-2xl font-medium">{invitation.place || "Location da definire"}</div>
              <div className="mt-4 h-44 overflow-hidden rounded-2xl bg-black/10">
                <iframe
                  title="Google Maps"
                  className="h-full w-full"
                  loading="lazy"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(invitation.place || "Roma")}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                />
              </div>
            </div>
            <div className="rounded-[28px] border p-6" style={{ borderColor: `${palette.accent}33`, background: `${palette.bg}d8` }}>
              <div className="text-sm uppercase tracking-[.18em]" style={{ color: palette.accent }}>{copy.countdown}</div>
              <Countdown date={invitation.date} palette={palette} />
              <p className="mt-4 text-sm leading-6 opacity-65">{copy.musicLine}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function Countdown({ date, palette }: { date: string; palette: (typeof palettes)[keyof typeof palettes] }) {
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
          <div className="text-3xl font-semibold">{value}</div>
          <div className="mt-1 text-xs uppercase tracking-[.18em] opacity-70">{label}</div>
        </div>
      ))}
    </div>
  );
}
