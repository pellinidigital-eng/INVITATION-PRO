"use client";

import { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";
import { motion } from "framer-motion";
import { CalendarPlus, Download, MessageCircle, QrCode, Share2, Volume2 } from "lucide-react";
import { buildInviteCopy } from "@/lib/copy-engine";
import { defaultInvitation, Invitation, palettes, planFeatures, ProductPlan } from "@/lib/invitation-data";
import { decodeInvitation } from "@/lib/share";
import { findInvitation, isDeletedSlug, saveInvitation } from "@/lib/storage";
import { normalizeInvitation } from "@/lib/invitation-utils";
import { TemplateStage } from "@/components/TemplateStage";

const IS_TEST_MODE = true;

export function InvitePage({ slug }: { slug: string }) {
  const [invitation, setInvitation] = useState<Invitation>(defaultInvitation);
  const [qr, setQr] = useState("");
  const [unavailable, setUnavailable] = useState(false);
  const [url, setUrl] = useState("");
  const [musicOn, setMusicOn] = useState(false);
  const [plan, setPlan] = useState<ProductPlan>("premium");
  const palette = palettes[invitation.palette as keyof typeof palettes] ?? palettes.champagne;
  const features = IS_TEST_MODE ? planFeatures.premium : planFeatures[plan];
  const copy = buildInviteCopy(invitation);
  const whatsappDigits = invitation.whatsapp.replace(/\D/g, "");
  const whatsappUrl = whatsappDigits ? `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(copy.whatsapp)}` : "";

  useEffect(() => {
    setUrl(window.location.href);
    const found = findInvitation(slug);
    const payload = new URLSearchParams(window.location.search).get("d");
    const planParam = new URLSearchParams(window.location.search).get("p");
    setPlan(planParam === "free" ? "free" : "premium");
    if ((!found && !payload) || isDeletedSlug(slug)) {
      setUnavailable(true);
      return;
    }
    const shared = normalizeInvitation(decodeInvitation(payload, found ?? defaultInvitation));
    const visited = { ...shared, slug, visits: (shared.visits || 0) + 1 };
    saveInvitation(visited);
    setInvitation(visited);
    setUnavailable(false);
  }, [slug]);

  useEffect(() => {
    if (!url) return;
    QRCode.toDataURL(url, {
      errorCorrectionLevel: "H",
      margin: 2,
      width: 1100,
      color: { dark: palette.ink, light: "#ffffff" }
    }).then(setQr).catch(() => setQr(""));
  }, [url, palette.ink]);

  const calendarUrl = useMemo(() => {
    const start = invitation.date ? invitation.date.replace(/-/g, "") : "20260918";
    const startTime = (invitation.time || "17:00").replace(":", "").padEnd(4, "0");
    const title = encodeURIComponent(invitation.names);
    const details = encodeURIComponent(copy.opening);
    const location = encodeURIComponent(invitation.place);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}T${startTime}00/${start}T235900&details=${details}&location=${location}`;
  }, [invitation, copy.opening]);

  async function downloadQr() {
    if (!url) return;
    if (!features.qrDownload) return;
    const printQr = await QRCode.toDataURL(url, {
      errorCorrectionLevel: "H",
      margin: 4,
      width: 2400,
      color: { dark: "#111111", light: "#ffffff" }
    });
    const link = document.createElement("a");
    link.href = printQr;
    link.download = `${invitation.slug}-qr-print-2400px.png`;
    link.click();
  }

  return (
    <main className="min-h-screen" style={{ background: palette.bg, color: palette.ink }}>
      {unavailable ? (
        <section className="grid min-h-screen place-items-center px-5 text-center">
          <div className="max-w-md rounded-[32px] border p-8 shadow-soft-xl" style={{ borderColor: `${palette.accent}33`, background: `${palette.bg}dd` }}>
            <p className="text-sm uppercase tracking-[.22em]" style={{ color: palette.accent }}>Invito non disponibile</p>
            <h1 className="mt-3 font-editorial text-5xl leading-none">Questo link non e piu attivo.</h1>
            <p className="mt-5 leading-7 opacity-70">L&apos;invito potrebbe essere stato eliminato o il link potrebbe non essere completo. Chiedi agli organizzatori un nuovo QR o un nuovo link.</p>
          </div>
        </section>
      ) : (
      <>
      {invitation.music && musicOn && <audio src={invitation.music} autoPlay loop />}
      <TemplateStage invitation={invitation} plan={plan} />

      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_.8fr]">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[30px] border p-6 sm:p-8"
            style={{ borderColor: `${palette.accent}33`, background: `${palette.soft}88` }}
          >
            <p className="text-sm uppercase tracking-[.22em]" style={{ color: palette.accent }}>{copy.layout.note}</p>
            <h2 className="mt-3 font-editorial text-5xl leading-none">{copy.thanks}</h2>
            <p className="mt-5 text-lg leading-8 opacity-75">{copy.reminder}</p>
            <p className="mt-3 text-sm leading-6 opacity-65">{copy.mediaLine}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              {whatsappUrl ? (
                <a className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white" style={{ background: palette.accent }} href={whatsappUrl} target="_blank" rel="noreferrer">
                  <MessageCircle size={17} /> {copy.rsvp}
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white/85" style={{ background: palette.accent }}>
                  <MessageCircle size={17} /> WhatsApp RSVP non impostato
                </span>
              )}
              <a className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold" style={{ borderColor: `${palette.accent}55` }} href={calendarUrl} target="_blank" rel="noreferrer">
                <CalendarPlus size={17} /> Aggiungi al calendario
              </a>
              <button onClick={() => {
                if (navigator.share) navigator.share({ title: invitation.names, url });
                else navigator.clipboard?.writeText(url);
              }} className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold" style={{ borderColor: `${palette.accent}55` }}>
                <Share2 size={17} /> Condividi
              </button>
            </div>
          </motion.div>

          <motion.div id="qr-section" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="overflow-hidden rounded-[30px] border" style={{ borderColor: `${palette.accent}33`, background: `${palette.bg}cc` }}>
            <div className="flex items-center justify-between">
              <div className="p-6 pb-3">
                <p className="text-sm uppercase tracking-[.22em]" style={{ color: palette.accent }}>QR invite</p>
                <h3 className="mt-2 text-2xl font-semibold">Scansiona e apri</h3>
                <p className="mt-2 text-sm leading-6 opacity-65">Perfetto per partecipazioni fisiche, locandine e storie social.</p>
              </div>
              <div className="mr-6 grid h-12 w-12 place-items-center rounded-full" style={{ background: `${palette.accent}22`, color: palette.accent }}><QrCode /></div>
            </div>
            <div className="px-6 pb-6">
              {qr && (
                <div className="relative rounded-[28px] bg-white p-4 shadow-inner-glow">
                  <div className="absolute left-1/2 top-3 h-1 w-16 -translate-x-1/2 rounded-full" style={{ background: palette.accent }} />
                  <img className="mx-auto mt-3 w-full max-w-[260px]" src={qr} alt="QR code invito" />
                  <div className="mt-3 rounded-2xl bg-black/[.04] px-3 py-2 text-center text-xs text-black/55">Apre direttamente questo invito da smartphone</div>
                </div>
              )}
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button onClick={downloadQr} className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-4 py-3 text-sm font-semibold text-white opacity-100 disabled:opacity-55" disabled={!features.qrDownload}>
                  <Download size={17} /> {features.qrDownload ? "QR stampa" : "Premium"}
                </button>
                <a className="inline-flex items-center justify-center gap-2 rounded-full border px-4 py-3 text-sm font-semibold" style={{ borderColor: `${palette.accent}55` }} href={`https://wa.me/?text=${encodeURIComponent(`Apri l'invito: ${url}`)}`} target="_blank" rel="noreferrer">
                  <MessageCircle size={17} /> WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {(invitation.images.length ? invitation.images : []).map((image, index) => (
            <motion.img
              key={image.slice(0, 80) + index}
              className="h-72 w-full rounded-[28px] object-cover shadow-soft-xl"
              src={image}
              alt=""
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
            />
          ))}
        </div>

        {invitation.video && (
          <div className="mt-10 overflow-hidden rounded-[30px] border" style={{ borderColor: `${palette.accent}33` }}>
            <video className="w-full" src={invitation.video} controls playsInline />
          </div>
        )}

        {invitation.music && (
          <button onClick={() => setMusicOn((value) => !value)} className="fixed bottom-4 left-1/2 z-30 -translate-x-1/2 rounded-full border px-4 py-3 text-sm shadow-soft-xl backdrop-blur-xl" style={{ borderColor: `${palette.accent}33`, background: `${palette.bg}dd` }}>
            <span className="inline-flex items-center gap-2"><Volume2 size={16} /> {musicOn ? "Musica attiva" : "Avvia musica"}</span>
          </button>
        )}
      </section>
      </>
      )}
    </main>
  );
}
