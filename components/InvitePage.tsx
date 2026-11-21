"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { AnimatePresence, motion } from "framer-motion";
import { Download, MessageCircle, QrCode, Volume2 } from "lucide-react";
import { defaultInvitation, Invitation, palettes, planFeatures, ProductPlan } from "@/lib/invitation-data";
import { decodeInvitation, encodeInvitation } from "@/lib/share";
import { findInvitation, isDeletedSlug, saveInvitation } from "@/lib/storage";
import { normalizeInvitation } from "@/lib/invitation-utils";
import { InvitationOpening } from "@/components/InvitationOpening";
import { TemplateStage } from "@/components/TemplateStage";


export function InvitePage({ slug }: { slug: string }) {
  const [invitation, setInvitation] = useState<Invitation>(defaultInvitation);
  const [qr, setQr] = useState("");
  const [loading, setLoading] = useState(true);
  const [editorView, setEditorView] = useState(false);
  const [opened, setOpened] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const [url, setUrl] = useState("");
  const [musicOn, setMusicOn] = useState(false);
  const [plan, setPlan] = useState<ProductPlan>("premium");
  const palette = palettes[invitation.palette as keyof typeof palettes] ?? palettes.champagne;
  const features = planFeatures[plan];
  useEffect(() => {
    const address = new URL(window.location.href);
    const fromEditor = address.searchParams.get("editor") === "1";
    address.searchParams.delete("editor");
    setOpened(false);
    setLoading(false);
    const found = findInvitation(slug);
    const payload = new URLSearchParams(window.location.search).get("d");
    const planParam = new URLSearchParams(window.location.search).get("p");
    const showEditor = fromEditor && Boolean(found);
    setEditorView(showEditor);
    if (showEditor && found) address.searchParams.set("d", encodeInvitation(found));
    setUrl(address.toString());
    setPlan(planParam === "free" ? "free" : "premium");
    if ((!found && !payload) || isDeletedSlug(slug)) {
      setUnavailable(true);
      return;
    }
    const decoded = showEditor && found ? found : decodeInvitation(payload, found ?? defaultInvitation);
    if (!decoded) {
      setUnavailable(true);
      return;
    }
    const shared = normalizeInvitation(decoded);
    const visited = { ...shared, slug, visits: (shared.visits || 0) + 1 };
    if (found && !showEditor) {
      try { saveInvitation(visited); } catch { /* The invite remains viewable when local storage is full. */ }
    }
    setInvitation(visited);
    setUnavailable(false);
  }, [slug]);

  useEffect(() => {
    if (!url || !editorView) return;
    QRCode.toDataURL(url, {
      errorCorrectionLevel: "M",
      margin: 2,
      width: 1100,
      color: { dark: palette.ink, light: "#ffffff" }
    }).then(setQr).catch(() => setQr(""));
  }, [url, palette.ink, editorView]);

  async function downloadQr() {
    if (!url) return;
    if (!features.qrDownload) return;
    const printQr = await QRCode.toDataURL(url, {
      errorCorrectionLevel: "M",
      margin: 4,
      width: 2400,
      color: { dark: "#111111", light: "#ffffff" }
    });
    const link = document.createElement("a");
    link.href = printQr;
    link.download = `${invitation.slug}-qr-print-2400px.png`;
    link.click();
  }

  if (loading) return <main className="min-h-screen" aria-busy="true" style={{ background: palette.bg }} />;
  const hasOpening = features.premiumAnimations && invitation.opening && invitation.opening !== "direct";

  return (
    <main className="min-h-screen" style={{ background: palette.bg, color: palette.ink }}>
      {editorView && (
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-black/10 bg-white px-4 py-3 text-sm text-[#15151b] sm:px-8">
          <a className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4" href={`/?edit=${encodeURIComponent(slug)}&p=${plan}`}>← Modifica invito</a>
          <a className="inline-flex min-h-11 items-center rounded-full bg-[#15151b] px-4 font-semibold text-white" href={`https://wa.me/?text=${encodeURIComponent(`Apri l’invito: ${url}`)}`} target="_blank" rel="noreferrer">Condividi su WhatsApp</a>
        </header>
      )}
      {unavailable ? (
        <section className="grid min-h-screen place-items-center px-5 text-center">
          <div className="max-w-md rounded-[32px] border p-8 shadow-soft-xl" style={{ borderColor: `${palette.accent}33`, background: `${palette.bg}dd` }}>
            <p className="text-sm uppercase tracking-[.22em]" style={{ color: palette.accent }}>Invito non disponibile</p>
            <h1 className="mt-3 font-editorial text-5xl leading-none">Questo link non e piu attivo.</h1>
            <p className="mt-5 leading-7 opacity-70">L&apos;invito potrebbe essere stato eliminato o il link potrebbe non essere completo. Chiedi agli organizzatori un nuovo QR o un nuovo link.</p>
          </div>
        </section>
      ) : (
      <AnimatePresence mode="wait">
      {hasOpening && !opened ? (
        <InvitationOpening key="opening" invitation={invitation} onOpen={() => setOpened(true)} />
      ) : (
      <div key="invitation">
      {features.music && invitation.music && musicOn && <audio src={invitation.music} autoPlay loop />}
      <TemplateStage invitation={invitation} plan={plan} showQr={editorView} />

      <section className="mx-auto max-w-5xl px-5 pb-10 sm:px-8">
        {editorView && (
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
        )}

        {invitation.images.length > 0 && (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {(invitation.images.length ? invitation.images : []).map((image, index) => (
            <motion.img
              key={image.slice(0, 80) + index}
              className="h-72 w-full rounded-[28px] object-cover shadow-soft-xl"
              src={image}
              alt=""
              onError={(event) => { event.currentTarget.style.display = "none"; }}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
            />
          ))}
        </div>

        )}

        {invitation.video && (
          <div className="mt-10 overflow-hidden rounded-[30px] border" style={{ borderColor: `${palette.accent}33` }}>
            <video className="w-full" src={invitation.video} controls playsInline />
          </div>
        )}

        {features.music && invitation.music && (
          <button onClick={() => setMusicOn((value) => !value)} className="fixed bottom-4 left-1/2 z-30 -translate-x-1/2 rounded-full border px-4 py-3 text-sm shadow-soft-xl backdrop-blur-xl" style={{ borderColor: `${palette.accent}33`, background: `${palette.bg}dd` }}>
            <span className="inline-flex items-center gap-2"><Volume2 size={16} /> {musicOn ? "Musica attiva" : "Avvia musica"}</span>
          </button>
        )}
      </section>
      </div>
      )}
      </AnimatePresence>
      )}
    </main>
  );
}
