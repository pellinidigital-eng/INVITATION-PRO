"use client";

import type React from "react";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import QRCode from "qrcode";
import {
  AlertTriangle,
  ArrowUpRight,
  CalendarDays,
  Check,
  Copy,
  Download,
  Eye,
  FileImage,
  FileText,
  Link2,
  MessageCircle,
  Palette,
  Play,
  QrCode,
  Save,
  Smartphone,
  Trash2,
  Upload
} from "lucide-react";
import {
  defaultInvitation,
  demoInvitations,
  EventType,
  eventTypes,
  getSmartSuggestion,
  Invitation,
  palettes,
  planFeatures,
  ProductPlan,
  qualitySignals,
  slugify,
  styleRules,
  templates,
  TemplateId
} from "@/lib/invitation-data";
import { buildInviteCopy } from "@/lib/copy-engine";
import { deleteInvitation, loadInvitations, saveInvitation, uniqueSlug } from "@/lib/storage";
import { encodeInvitation } from "@/lib/share";
import { cleanText, invitationStatus, normalizeInvitation } from "@/lib/invitation-utils";
import { TemplateStage } from "@/components/TemplateStage";

const styleOptions = Object.keys(styleRules);
const fontOptions = ["Editorial serif", "Modern grotesk", "Classic roman", "Soft rounded"];
const DRAFT_KEY = "invitation-creator-pro:draft:v1";
const FILE_LIMITS = {
  images: 2 * 1024 * 1024,
  logo: 1024 * 1024,
  video: 12 * 1024 * 1024,
  music: 6 * 1024 * 1024
};

export function StudioApp() {
  const [invitations, setInvitations] = useState<Invitation[]>([defaultInvitation]);
  const [active, setActive] = useState<Invitation>(defaultInvitation);
  const [plan, setPlan] = useState<ProductPlan>("premium");
  const [qr, setQr] = useState("");
  const [origin, setOrigin] = useState("");
  const [notice, setNotice] = useState("QR e link si aggiornano automaticamente.");
  const [busy, setBusy] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const generatedCopy = buildInviteCopy(active);
  const palette = palettes[active.palette as keyof typeof palettes] ?? palettes.champagne;
  const features = planFeatures[plan];
  const status = invitationStatus(active);
  const shareUrl = origin ? `${origin}/invite/${active.slug}?p=${plan}&d=${encodeURIComponent(encodeInvitation(active))}` : `/invite/${active.slug}`;
  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(`Apri il mio invito digitale: ${shareUrl}`)}`;

  useEffect(() => {
    setOrigin(window.location.origin);
    const stored = loadInvitations();
    let draftInvitation: Invitation | undefined;
    try {
      const draft = window.localStorage.getItem(DRAFT_KEY);
      draftInvitation = draft ? (JSON.parse(draft) as Invitation) : undefined;
    } catch {
      window.localStorage.removeItem(DRAFT_KEY);
    }
    setInvitations(stored);
    setActive(draftInvitation ?? stored[0] ?? defaultInvitation);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify({ ...active, images: [], video: undefined, music: undefined }));
    } catch {
      setNotice("Bozza non salvata localmente: spazio browser insufficiente.");
    }
  }, [active, hydrated]);

  useEffect(() => {
    if (!origin) return;
    QRCode.toDataURL(shareUrl, {
      errorCorrectionLevel: "H",
      margin: 2,
      width: 1100,
      color: { dark: palette.ink, light: "#ffffff" }
    }).then(setQr).catch(() => setNotice("QR non generato: link troppo lungo o browser in errore."));
  }, [origin, shareUrl, palette.ink]);

  useEffect(() => {
    if (features.templates.includes(active.template)) return;
    setActive((current) => ({ ...current, template: "lumiere", palette: "champagne" }));
    setNotice("Piano Demo attivo: ho sostituito il template premium con Lumiere.");
  }, [active.template, features.templates]);

  const smartHeadline = useMemo(() => {
    if (active.eventType === "matrimonio" && active.style.toLowerCase().includes("elegante")) return "Suite nuziale luxury pronta per RSVP WhatsApp";
    if (active.eventType === "compleanno" && active.style.toLowerCase().includes("cartoon")) return "Invito allegro, colorato e morbido senza perdere qualità";
    if (active.eventType === "business") return "Landing evento business con agenda, QR e conversione";
    return "Esperienza evento coerente generata da logiche locali";
  }, [active.eventType, active.style]);

  function update(patch: Partial<Invitation>) {
    setActive((current) => ({ ...current, ...patch }));
  }

  function applyEvent(eventType: EventType) {
    const suggestion = getSmartSuggestion(eventType, active.style);
    const nextTemplate = features.templates.includes(suggestion.template) ? suggestion.template : "lumiere";
    update({
      eventType,
      palette: suggestion.palette,
      template: nextTemplate,
      tone: suggestion.tone,
      description: suggestion.description
    });
    if (nextTemplate !== suggestion.template) setNotice("Questo evento suggerisce un template premium. In demo ho applicato una variante gratuita.");
  }

  function applyStyle(style: string) {
    const suggestion = getSmartSuggestion(active.eventType, style);
    const nextTemplate = features.templates.includes(suggestion.template) ? suggestion.template : "lumiere";
    update({
      style,
      palette: suggestion.palette,
      template: nextTemplate,
      tone: suggestion.tone,
      description: suggestion.description
    });
    if (nextTemplate !== suggestion.template) setNotice("Questo stile usa un template premium. In demo ho applicato una variante gratuita.");
  }

  async function readFiles(event: ChangeEvent<HTMLInputElement>, key: "images" | "logo" | "video" | "music") {
    if (key === "music" && !features.music) {
      setNotice("La musica e inclusa nel piano Premium.");
      event.target.value = "";
      return;
    }
    const files = Array.from(event.target.files ?? []);
    const accepted = files.filter((file) => {
      const validKind =
        key === "images" || key === "logo"
          ? file.type.startsWith("image/")
          : key === "video"
            ? file.type.startsWith("video/")
            : file.type.startsWith("audio/");
      return validKind && file.size <= FILE_LIMITS[key];
    });
    if (accepted.length !== files.length) {
      setNotice("Alcuni file sono stati esclusi: formato non supportato o dimensione troppo grande.");
    }
    const values = await Promise.all(
      accepted.map(
        (file) =>
          new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(String(reader.result));
            reader.readAsDataURL(file);
          })
      )
    );
    if (key === "images") update({ images: [...active.images, ...values].slice(0, 6) });
    else update({ [key]: values[0] } as Partial<Invitation>);
    event.target.value = "";
  }

  async function persist() {
    setBusy("save");
    try {
      const normalized = normalizeInvitation(active);
      const invitation = {
        ...normalized,
        id: active.id === "demo" ? crypto.randomUUID() : active.id,
        slug: uniqueSlug(slugify(normalized.names), active.id),
        createdAt: active.createdAt || new Date().toISOString(),
        visits: active.visits || Math.floor(450 + Math.random() * 1800)
      };
      const next = saveInvitation(invitation);
      setActive(invitation);
      setInvitations(next);
      const qrData = await QRCode.toDataURL(`${window.location.origin}/invite/${invitation.slug}?p=${plan}&d=${encodeURIComponent(encodeInvitation(invitation))}`, {
        errorCorrectionLevel: "H",
        margin: 2,
        width: 1100,
        color: { dark: palette.ink, light: "#ffffff" }
      });
      setQr(qrData);
      setNotice("Invito salvato. Link pubblico e QR sono allineati.");
      window.localStorage.removeItem(DRAFT_KEY);
    } catch {
      setNotice("Salvataggio non completato: riduci i media caricati e riprova.");
    } finally {
      setBusy("");
    }
  }

  async function downloadQrPrint() {
    if (!features.qrDownload) {
      setNotice("Il download QR ad alta qualita e una funzione Premium.");
      return;
    }
    setBusy("qr");
    try {
      const printQr = await QRCode.toDataURL(shareUrl, {
        errorCorrectionLevel: "H",
        margin: 4,
        width: 2400,
        color: { dark: "#111111", light: "#ffffff" }
      });
      const link = document.createElement("a");
      link.download = `${active.slug || "invito"}-qr-print-2400px.png`;
      link.href = printQr;
      link.click();
      setNotice("QR code scaricato in alta qualita per stampa.");
    } catch {
      setNotice("QR non scaricato: il link e troppo lungo o il browser ha bloccato il file.");
    } finally {
      setBusy("");
    }
  }

  function removeActive() {
    if (active.id === "demo") {
      setNotice("L invito demo resta disponibile come fallback. Salva un nuovo invito prima di eliminarlo.");
      return;
    }
    const next = deleteInvitation(active.id);
    setInvitations(next);
    setActive(next[0] ?? defaultInvitation);
    setNotice("Invito eliminato. Il link senza payload ora mostra uno stato non disponibile.");
  }

  async function exportPng() {
    if (!features.exportFiles) {
      setNotice("Export PNG/PDF disponibili nel piano Premium.");
      return;
    }
    setBusy("png");
    try {
      const html2canvas = (await import("html2canvas")).default;
      const node = document.querySelector("#invite-capture") as HTMLElement;
      if (!node) {
        setNotice("Preview non disponibile: riapri la pagina e riprova.");
        return;
      }
      const canvas = await html2canvas(node, { backgroundColor: null, scale: 2, useCORS: true });
      const link = document.createElement("a");
      link.download = `${active.slug || "invito"}-preview.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      setNotice("Preview PNG esportata.");
    } catch {
      setNotice("Export PNG non riuscito: prova con meno media o ricarica la pagina.");
    } finally {
      setBusy("");
    }
  }

  async function exportPdf() {
    if (!features.exportFiles) {
      setNotice("Export PNG/PDF disponibili nel piano Premium.");
      return;
    }
    setBusy("pdf");
    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");
      const node = document.querySelector("#invite-capture") as HTMLElement;
      if (!node) {
        setNotice("Preview non disponibile: riapri la pagina e riprova.");
        return;
      }
      const canvas = await html2canvas(node, { backgroundColor: null, scale: 2, useCORS: true });
      const pdf = new jsPDF("p", "mm", "a4");
      const width = 210;
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, width, height);
      pdf.save(`${active.slug || "invito"}-premium.pdf`);
      setNotice("PDF premium esportato.");
    } catch {
      setNotice("Export PDF non riuscito: prova con meno media o ricarica la pagina.");
    } finally {
      setBusy("");
    }
  }

  return (
    <main className="min-h-screen bg-[#fbfaf7] text-[#15151b]">
      <AnimatePresence>
        {busy && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-x-4 top-4 z-50 mx-auto flex max-w-sm items-center gap-3 rounded-full border border-black/10 bg-white/90 px-4 py-3 text-sm shadow-soft-xl backdrop-blur-xl">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#b88a44]" />
            Preparazione premium in corso
          </motion.div>
        )}
      </AnimatePresence>
      <section className="relative overflow-hidden border-b border-black/10 bg-[#f7f3eb]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-5 sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:py-8">
          <div className="flex min-h-[88vh] flex-col justify-between py-4">
            <nav className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-[#15151b] text-white"><SparkIcon /></div>
                <div>
                  <div className="text-sm font-semibold">Invitation Creator PRO</div>
                  <div className="text-xs text-black/50">Premium event studio</div>
                </div>
              </div>
              <a className="hidden items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm sm:inline-flex" href={shareUrl}>
                Preview <ArrowUpRight size={15} />
              </a>
            </nav>
            <div className="mt-6 flex w-fit rounded-full border border-black/10 bg-white p-1 shadow-inner-glow">
              {(["free", "premium"] as ProductPlan[]).map((item) => (
                <button key={item} onClick={() => setPlan(item)} className={`rounded-full px-4 py-2 text-xs font-semibold transition ${plan === item ? "bg-black text-white" : "text-black/55"}`}>
                  {planFeatures[item].label}
                </button>
              ))}
            </div>
            <div className="max-w-xl">
              <div className="mb-5 inline-flex rounded-full border border-black/10 bg-white/70 px-3 py-2 text-xs uppercase tracking-[.18em] shadow-inner-glow">
                No AI, no paid API, all local logic
              </div>
              <h1 className="font-editorial text-[4.5rem] leading-[.84] text-[#15151b] sm:text-[6.5rem]">
                Inviti digitali che sembrano couture.
              </h1>
              <p className="mt-6 text-lg leading-8 text-black/68">
                {smartHeadline}. Template animati, copy condizionale, QR, dashboard, export e una pagina invito pronta da condividere.
              </p>
              <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {qualitySignals.map((signal) => (
                  <div key={signal.label} className="rounded-2xl border border-black/10 bg-white/70 p-4">
                    <div className="text-xl font-semibold">{signal.value}</div>
                    <div className="mt-1 text-xs text-black/52">{signal.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button disabled={busy === "save"} onClick={persist} className="inline-flex items-center gap-2 rounded-full bg-[#15151b] px-5 py-3 text-sm font-semibold text-white shadow-soft-xl disabled:opacity-60">
                <Save size={17} /> {busy === "save" ? "Salvataggio" : "Salva invito"}
              </button>
              <button onClick={() => { navigator.clipboard.writeText(shareUrl); setNotice("Link invito copiato negli appunti."); }} className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-semibold">
                <Copy size={17} /> Copia link
              </button>
            </div>
          </div>
          <div ref={previewRef} className="relative flex items-center justify-center lg:min-h-[88vh]">
            <div className="absolute inset-y-8 left-8 right-8 rounded-[48px] bg-[#c9b083]/20 blur-3xl" />
            <motion.div className="relative w-full max-w-[430px] rounded-[42px] border border-black/12 bg-[#111] p-3 shadow-soft-xl" initial={{ opacity: 0, y: 32, rotate: -1 }} animate={{ opacity: 1, y: 0, rotate: 0 }}>
              <div className="overflow-hidden rounded-[32px] bg-white">
                <TemplateStage invitation={active} compact plan={plan} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[360px_1fr_340px]">
        <aside className="space-y-4 lg:sticky lg:top-4 lg:self-start">
          <Panel title="1. Scelta evento" icon={<CalendarDays size={17} />}>
            <div className="grid grid-cols-2 gap-2">
              {eventTypes.map(({ id, label, icon: Icon }) => (
                <button key={id} onClick={() => applyEvent(id)} className={`flex items-center gap-2 rounded-2xl border p-3 text-left text-sm transition ${active.eventType === id ? "border-black bg-black text-white" : "border-black/10 bg-white hover:border-black/30"}`}>
                  <Icon size={16} /> {label}
                </button>
              ))}
            </div>
          </Panel>

          <Panel title="Demo commerciali" icon={<Eye size={17} />}>
            <div className="space-y-2">
              {demoInvitations.map((demo) => (
                <button key={demo.id} onClick={() => { setActive(demo); setNotice(`Demo caricata: ${demo.names}. Link e QR sono pronti per la preview.`); }} className="w-full rounded-2xl border border-black/10 bg-white p-3 text-left transition hover:-translate-y-0.5 hover:border-black/30">
                  <div className="text-sm font-semibold">{demo.names}</div>
                  <div className="mt-1 text-xs capitalize text-black/52">{demo.eventType.replace("-", " ")} - {demo.place}</div>
                </button>
              ))}
            </div>
          </Panel>

          <Panel title="2. Direzione creativa" icon={<Palette size={17} />}>
            <div className="grid grid-cols-2 gap-2">
              {styleOptions.map((style) => (
                <button key={style} onClick={() => applyStyle(style)} className={`rounded-2xl border px-3 py-3 text-left text-sm capitalize ${active.style.toLowerCase() === style ? "border-black bg-black text-white" : "border-black/10 bg-white"}`}>
                  {style}
                </button>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {Object.entries(palettes).map(([key, item]) => (
                <button key={key} title={item.name} onClick={() => update({ palette: key })} className={`h-10 rounded-full border ${active.palette === key ? "border-black" : "border-black/10"}`} style={{ background: `linear-gradient(90deg, ${item.bg}, ${item.accent}, ${item.accent2})` }} />
              ))}
            </div>
            <select value={active.font} onChange={(event) => update({ font: event.target.value })} className="mt-3 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm">
              {fontOptions.map((font) => <option key={font}>{font}</option>)}
            </select>
          </Panel>

          <Panel title="3. Upload media" icon={<Upload size={17} />}>
            <FileInput label="Foto / immagini evento" accept="image/*" multiple onChange={(event) => readFiles(event, "images")} />
            <FileInput label="Logo" accept="image/*" onChange={(event) => readFiles(event, "logo")} />
            <FileInput label="Video breve" accept="video/*" onChange={(event) => readFiles(event, "video")} />
            <FileInput label="Musica MP3" accept="audio/*" onChange={(event) => readFiles(event, "music")} />
          </Panel>
        </aside>

        <section className="space-y-4">
          <Panel title="Personalizzazione contenuti" icon={<FileText size={17} />}>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Nomi" value={active.names} onChange={(value) => update({ names: cleanText(value, "", 86), slug: slugify(value) })} />
              <Field label="Luogo" value={active.place} onChange={(value) => update({ place: cleanText(value, "", 120) })} />
              <Field label="Data" type="date" value={active.date} onChange={(value) => update({ date: value })} />
              <Field label="Ora" type="time" value={active.time} onChange={(value) => update({ time: value })} />
              <Field label="Dress code" value={active.dressCode} onChange={(value) => update({ dressCode: cleanText(value, "", 72) })} />
              <Field label="WhatsApp RSVP" value={active.whatsapp} onChange={(value) => update({ whatsapp: value.replace(/[^\d+]/g, "").replace(/(?!^)\+/g, "").slice(0, 16) })} />
            </div>
            <label className="mt-3 block text-sm font-medium">
              Descrizione intelligente
              <textarea value={active.description} maxLength={620} onChange={(event) => update({ description: cleanText(event.target.value, "", 620) })} className="mt-2 min-h-28 w-full rounded-2xl border border-black/10 bg-white p-4 leading-7 outline-none focus:border-black/40" />
            </label>
            {(status.missing.length > 0 || status.pastDate) && (
              <div className="mt-4 flex gap-3 rounded-2xl border border-[#b35f42]/20 bg-[#fff4ef] p-4 text-sm leading-6 text-[#7a3926]">
                <AlertTriangle className="mt-1 shrink-0" size={17} />
                <span>
                  {status.missing.length > 0 ? `Campi da completare: ${status.missing.join(", ")}. ` : ""}
                  {status.pastDate ? "La data e nel passato: invito valido, countdown a zero." : ""}
                </span>
              </div>
            )}
            <div className="mt-4 rounded-2xl bg-[#f3efe6] p-4 text-sm leading-6 text-black/68">
              <strong className="text-black">Copy generato localmente:</strong> {generatedCopy.opening} CTA: “{generatedCopy.rsvp}”. Reminder: “{generatedCopy.reminder}”
            </div>
          </Panel>

          <Panel title="Template premium" icon={<Play size={17} />}>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {templates.map((template) => {
                const locked = !features.templates.includes(template.id);
                return (
                <button key={template.id} onClick={() => locked ? setNotice("Template premium: passa a Premium per usarlo senza limiti.") : update({ template: template.id as TemplateId, palette: template.palette })} className={`group overflow-hidden rounded-[24px] border bg-white p-3 text-left transition hover:-translate-y-0.5 ${active.template === template.id ? "border-black shadow-soft-xl" : "border-black/10 hover:border-black/30"} ${locked ? "opacity-60" : ""}`}>
                  <div className="relative h-36 rounded-2xl" style={{ background: template.preview }}>
                    {locked && <span className="absolute right-3 top-3 rounded-full bg-black px-3 py-1 text-[11px] font-semibold text-white">Premium</span>}
                  </div>
                  <div className="mt-3 text-sm font-semibold">{template.name}</div>
                  <div className="mt-1 text-xs leading-5 text-black/52">{template.description}</div>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {template.animations.slice(0, 2).map((animation) => <span key={animation} className="rounded-full bg-black/[.05] px-2 py-1 text-[10px] text-black/55">{animation}</span>)}
                  </div>
                </button>
              );})}
            </div>
          </Panel>
          <MarketingAssets active={active} qr={qr} shareUrl={shareUrl} palette={palette} plan={plan} />
        </section>

        <aside className="space-y-4 lg:sticky lg:top-4 lg:self-start">
          <Panel title="QR code premium" icon={<QrCode size={17} />}>
            <PremiumQrCard
              active={active}
              qr={qr}
              shareUrl={shareUrl}
              accent={palette.accent}
              onSave={persist}
              onCopy={() => { navigator.clipboard.writeText(shareUrl); setNotice("Link invito copiato negli appunti."); }}
              onDownload={downloadQrPrint}
              whatsappShareUrl={whatsappShareUrl}
              busy={busy}
            />
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Action onClick={exportPng} icon={<FileImage size={16} />} label="Preview PNG" />
              <Action onClick={exportPdf} icon={<Download size={16} />} label="Invito PDF" />
            </div>
            <div className="mt-3 rounded-2xl bg-black/[.04] p-3 text-xs leading-5 text-black/58">{notice}</div>
          </Panel>

          <Panel title="Dashboard" icon={<Smartphone size={17} />}>
            <div className="space-y-2">
              {invitations.slice(0, 6).map((item) => (
                <button key={item.id + item.slug} onClick={() => { setActive(item); setNotice(`Invito "${item.names}" caricato in modifica.`); }} className="w-full rounded-2xl border border-black/10 bg-white p-3 text-left transition hover:border-black/30">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold">{item.names}</div>
                      <div className="text-xs capitalize text-black/50">{item.eventType.replace("-", " ")} · {item.visits} visite</div>
                    </div>
                    <Eye size={16} />
                  </div>
                </button>
              ))}
            </div>
            <button onClick={removeActive} className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#b35f42]/20 bg-[#fff4ef] px-4 py-3 text-sm font-semibold text-[#7a3926]">
              <Trash2 size={16} /> Elimina invito attivo
            </button>
          </Panel>

          <Panel title="Conversion layer" icon={<Check size={17} />}>
            <div className="space-y-3 text-sm leading-6 text-black/64">
              <p>WhatsApp RSVP precompilato, QR code scaricabile, countdown, calendario, mappa e timeline vengono combinati in base a evento, stile, tono e palette.</p>
              <p className="font-medium text-black">Nessun servizio AI o chiave esterna: tutto è generato da librerie locali.</p>
              <div className="rounded-2xl bg-black p-4 text-white">
                <div className="text-xs uppercase tracking-[.2em] text-white/50">Post-acquisto Shopify</div>
                <p className="mt-2 text-sm leading-6 text-white/78">Invia accesso al tool, oppure vendi un servizio premium personalizzato con link finale, QR stampabile e asset social gia pronti.</p>
              </div>
            </div>
          </Panel>
        </aside>
      </section>

      <section className="border-t border-black/10">
        <TemplateStage invitation={active} plan={plan} />
      </section>
    </main>
  );
}

function Panel({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-[26px] border border-black/10 bg-white/82 p-4 shadow-inner-glow backdrop-blur-xl">
      <div className="mb-4 flex items-center gap-2 text-sm font-semibold">{icon}{title}</div>
      {children}
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (value: string) => void; type?: string }) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-black/40" />
    </label>
  );
}

function FileInput({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="mb-2 flex cursor-pointer items-center justify-between rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm">
      <span>{label}</span>
      <Upload size={15} />
      <input className="hidden" type="file" {...props} />
    </label>
  );
}

function Action({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return <button onClick={onClick} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-black px-3 py-3 text-sm font-semibold text-white">{icon}{label}</button>;
}

function SparkIcon() {
  return <span className="text-lg">✦</span>;
}

function PremiumQrCard({
  active,
  qr,
  shareUrl,
  accent,
  onSave,
  onCopy,
  onDownload,
  whatsappShareUrl,
  busy
}: {
  active: Invitation;
  qr: string;
  shareUrl: string;
  accent: string;
  onSave: () => void;
  onCopy: () => void;
  onDownload: () => void;
  whatsappShareUrl: string;
  busy: string;
}) {
  return (
    <div className="overflow-hidden rounded-[24px] border border-black/10 bg-[#f8f5ee]">
      <div className="flex items-start justify-between gap-4 p-4">
        <div>
          <div className="text-xs uppercase tracking-[.2em] text-black/45">Premium QR suite</div>
          <h3 className="mt-2 text-xl font-semibold leading-tight">{active.names}</h3>
          <p className="mt-2 text-sm leading-6 text-black/58">Pronto per partecipazioni, locandine, storie e invii da smartphone.</p>
        </div>
        <div className="rounded-full px-3 py-1 text-xs font-semibold text-white" style={{ background: accent }}>Print</div>
      </div>
      <div className="px-4 pb-4">
        <AnimatePresence mode="wait">
          {qr ? (
            <motion.div key={qr} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="relative rounded-[28px] border border-black/10 bg-white p-4 shadow-inner-glow">
              <div className="absolute left-1/2 top-3 h-1 w-16 -translate-x-1/2 rounded-full" style={{ background: accent }} />
              <img className="mx-auto mt-3 w-full max-w-[230px]" src={qr} alt={`QR code per aprire l'invito ${active.names}`} />
              <div className="mt-3 rounded-2xl bg-black/[.04] px-3 py-2 text-center text-[11px] leading-4 text-black/55">Alta correzione errore, PNG 2400px per stampa</div>
            </motion.div>
          ) : (
            <div className="grid min-h-64 place-items-center rounded-[28px] border border-dashed border-black/15 bg-white text-sm text-black/50">Il QR si genera automaticamente</div>
          )}
        </AnimatePresence>
        <div className="mt-3 rounded-2xl border border-black/10 bg-white p-3 text-xs leading-5 text-black/60">
          <div className="mb-1 flex items-center gap-2 font-medium text-black"><Link2 size={14} /> Link pubblico invito</div>
          <span className="break-all">{shareUrl}</span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Action onClick={onSave} icon={<Save size={16} />} label={busy === "save" ? "Salvo" : "Salva QR"} />
          <Action onClick={onCopy} icon={<Copy size={16} />} label="Copia link" />
          <Action onClick={onDownload} icon={<Download size={16} />} label={busy === "qr" ? "Preparo" : "Scarica QR"} />
          <a className="inline-flex items-center justify-center gap-2 rounded-2xl bg-black px-3 py-3 text-sm font-semibold text-white" href={whatsappShareUrl} target="_blank" rel="noreferrer">
            <MessageCircle size={16} /> WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

function MarketingAssets({
  active,
  qr,
  shareUrl,
  palette,
  plan
}: {
  active: Invitation;
  qr: string;
  shareUrl: string;
  palette: (typeof palettes)[keyof typeof palettes];
  plan: ProductPlan;
}) {
  const copy = buildInviteCopy(active);
  return (
    <Panel title="Asset marketing" icon={<Smartphone size={17} />}>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-[24px] border border-black/10 bg-[#111] p-3 text-white shadow-soft-xl">
          <div className="overflow-hidden rounded-[20px] p-4" style={{ background: `linear-gradient(145deg, ${palette.bg}, ${palette.soft})`, color: palette.ink }}>
            <div className="text-xs uppercase tracking-[.22em]" style={{ color: palette.accent }}>mockup smartphone</div>
            <div className="mt-16 font-editorial text-4xl leading-none">{active.names}</div>
            <p className="mt-4 text-sm leading-6 opacity-70">{copy.title}</p>
          </div>
        </div>
        <div className="rounded-[24px] border border-black/10 bg-white p-4">
          <div className="text-xs uppercase tracking-[.22em] text-black/45">WhatsApp preview</div>
          <div className="mt-4 rounded-2xl bg-[#e8f5df] p-3 text-sm leading-6">
            Apri invito digitale di {active.names}: {shareUrl.slice(0, 44)}...
          </div>
          <div className="mt-4 flex items-center gap-3 rounded-2xl border border-black/10 p-3">
            {qr ? <img className="h-16 w-16 rounded-xl bg-white p-1" src={qr} alt="" /> : <QrCode />}
            <div>
              <div className="text-sm font-semibold">QR social-ready</div>
              <div className="text-xs text-black/50">{plan === "premium" ? "Download abilitato" : "Preview demo"}</div>
            </div>
          </div>
        </div>
        <div className="rounded-[24px] border border-black/10 bg-white p-4 sm:col-span-2">
          <div className="text-xs uppercase tracking-[.22em] text-black/45">screenshot-ready card</div>
          <div className="mt-3 rounded-[22px] p-5" style={{ background: palette.soft }}>
            <div className="font-editorial text-4xl leading-none">{copy.title}</div>
            <p className="mt-3 max-w-xl text-sm leading-6 opacity-70">{copy.subtitle}</p>
            <div className="mt-5 inline-flex rounded-full px-4 py-2 text-sm font-semibold text-white" style={{ background: palette.accent }}>{copy.rsvp}</div>
          </div>
        </div>
      </div>
    </Panel>
  );
}
