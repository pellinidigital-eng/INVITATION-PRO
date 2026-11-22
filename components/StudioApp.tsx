"use client";

import type React from "react";
import { ChangeEvent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import QRCode from "qrcode";
import {
  AlertTriangle,
  CalendarDays,
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
  getEventRecommendation,
  getSmartSuggestion,
  smartCopy,
  Invitation,
  invitationOpenings,
  palettes,
  planFeatures,
  ProductPlan,
  slugify,
  styleRules,
  templates,
  TemplateId
} from "@/lib/invitation-data";
import { buildInviteCopy } from "@/lib/copy-engine";
import { deleteInvitation, loadInvitations, saveInvitation, uniqueSlug } from "@/lib/storage";
import { encodeInvitation, publishedInviteCode, shareCodePattern, whatsappInviteLink } from "@/lib/share";
import { invitationStatus, normalizeInvitation } from "@/lib/invitation-utils";
import { TemplateStage } from "@/components/TemplateStage";

import { getInvitationFont, invitationFonts } from "@/lib/invitation-fonts";
import { writingStyles, WritingStyle } from "@/lib/writing-styles";

const styleOptions = Object.keys(styleRules);
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
  const [showAllTemplates, setShowAllTemplates] = useState(false);
  const [plan, setPlan] = useState<ProductPlan>("premium");
  const [qr, setQr] = useState("");
  const [origin, setOrigin] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const generatedCopy = buildInviteCopy(active);
  const palette = palettes[active.palette as keyof typeof palettes] ?? palettes.champagne;
  const features = planFeatures[plan];
  const publicPlan = plan;
  const status = invitationStatus(active);
  const selectedFont = getInvitationFont(active.font);
  const recommendation = getEventRecommendation(active.eventType, plan);
  const shareUrl = inviteUrl(active);
  const whatsappShareUrl = whatsappInviteLink(active, shareUrl);

  function inviteUrl(invitation: Invitation) {
    const code = publishedInviteCode(invitation, publicPlan);
    if (code) return `${origin}/i/${code}`;
    return origin ? `${origin}/invite/${invitation.slug}?p=${publicPlan}&d=${encodeURIComponent(encodeInvitation(invitation))}` : `/invite/${invitation.slug}`;
  }

  async function copyLink(invitation = active) {
    try {
      await navigator.clipboard.writeText(inviteUrl(invitation));
      setNotice("Link invito copiato negli appunti.");
    } catch {
      setNotice("Copia automatica non riuscita: apri il link con Vedi invito e copialo dalla barra del browser.");
    }
  }

  async function downloadQrFor(invitation = active) {
    if (!features.qrDownload) {
      setNotice("Il download del QR è disponibile in Premium.");
      return;
    }
    try {
      const qrData = await QRCode.toDataURL(inviteUrl(invitation), {
        errorCorrectionLevel: "M",
        margin: 4,
        width: 2400,
        color: { dark: "#111111", light: "#ffffff" }
      });
      const link = document.createElement("a");
      link.download = `${invitation.slug || "invito"}-qr-print-2400px.png`;
      link.href = qrData;
      link.click();
      setNotice("QR code scaricato in alta qualita per stampa.");
    } catch {
      setNotice("QR non scaricato: prova a salvare l'invito e ripetere il download.");
    }
  }

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
    const params = new URLSearchParams(window.location.search);
    if (params.get("p") === "free") setPlan("free");
    const editSlug = params.get("edit");
    const selected = editSlug ? stored.find((item) => item.slug === editSlug) : undefined;
    setActive(selected ?? draftInvitation ?? stored[0] ?? defaultInvitation);
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
      errorCorrectionLevel: "M",
      margin: 2,
      width: 1100,
      color: { dark: palette.ink, light: "#ffffff" }
    }).then(setQr).catch(() => {
      setQr("");
      setNotice("QR non generato: prova a ridurre la lunghezza dei testi.");
    });
  }, [origin, shareUrl, palette.ink]);

  useEffect(() => {
    if (features.templates.some((id) => id === active.template)) return;
    setActive((current) => ({ ...current, template: "lumiere", palette: "champagne" }));
    setNotice("Piano Demo attivo: ho sostituito il template premium con Lumiere.");
  }, [active.template, features.templates]);

  function update(patch: Partial<Invitation>) {
    setActive((current) => ({ ...current, ...patch }));
  }

  function applyEvent(eventType: EventType) {
    const suggestion = getEventRecommendation(eventType, plan);
    setActive((current) => {
      const previousDefault = smartCopy[current.eventType].intro.join(" ");
      const isExampleText = demoInvitations.some((item) => item.id === current.id && item.description === current.description);
      const description = !current.description.trim() || current.description === previousDefault || isExampleText
        ? smartCopy[eventType].intro.join(" ")
        : current.description;
      return {
        ...current,
        eventType,
        palette: suggestion.palette,
        template: suggestion.template,
        style: suggestion.style,
        tone: suggestion.tone,
        writingStyle: suggestion.writingStyle,
        description
      };
    });
    setNotice("");
  }

  function applyStyle(style: string) {
    const suggestion = getSmartSuggestion(active.eventType, style);
    const nextTemplate = features.templates.some((id) => id === suggestion.template) ? suggestion.template : "lumiere";
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

  async function persist(openResult = false) {
    setBusy("save");
    try {
      const normalized = normalizeInvitation(active);
      let invitation = {
        ...normalized,
        id: active.id.startsWith("demo") ? createId() : active.id,
        slug: uniqueSlug(slugify(normalized.names), active.id),
        createdAt: active.createdAt || new Date().toISOString(),
        visits: active.visits || Math.floor(450 + Math.random() * 1800)
      };
      let next = saveInvitation(invitation);
      if (!publishedInviteCode(invitation, publicPlan)) {
        try {
          const payload = encodeInvitation(invitation);
          const response = await fetch("/api/share", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ payload, plan: publicPlan })
          });
          if (!response.ok) throw new Error("Link breve non disponibile");
          const { code } = await response.json() as { code: string };
          if (!shareCodePattern.test(code)) throw new Error("Codice non valido");
          invitation = { ...invitation, publishedLink: { code, payload, plan: publicPlan } };
          next = saveInvitation(invitation);
        } catch {
          setActive(invitation);
          setInvitations(next);
          setNotice("Invito salvato. Il link breve non è disponibile adesso. Riprova con Genera invito.");
          if (openResult) window.location.assign(`/invite/${invitation.slug}?p=${publicPlan}&editor=1&short=unavailable`);
          return;
        }
      }
      setActive(invitation);
      setInvitations(next);
      setNotice("Invito salvato. Puoi copiare il link per condividerlo.");
      window.localStorage.removeItem(DRAFT_KEY);
      if (openResult) window.location.assign(`/invite/${invitation.slug}?p=${publicPlan}&editor=1`);
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
        errorCorrectionLevel: "M",
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
    if (active.id.startsWith("demo")) {
      setNotice("L invito demo resta disponibile come fallback. Salva un nuovo invito prima di eliminarlo.");
      return;
    }
    const next = deleteInvitation(active.id);
    setInvitations(next);
    setActive(next[0] ?? defaultInvitation);
    setNotice("Invito eliminato. Il link senza payload ora mostra uno stato non disponibile.");
  }

  function removeInvitation(invitation: Invitation) {
    if (invitation.id.startsWith("demo")) {
      setNotice("Le demo restano disponibili. Salva una copia prima di eliminarle.");
      return;
    }
    const next = deleteInvitation(invitation.id);
    setInvitations(next);
    if (active.id === invitation.id) setActive(next[0] ?? defaultInvitation);
    setNotice(`Invito "${invitation.names}" eliminato.`);
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
      const canvas = await html2canvas(node, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        onclone: (clonedDocument) => {
          const stage = clonedDocument.getElementById("export-stage");
          if (stage) stage.style.right = "0";
        }
      });
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
      const canvas = await html2canvas(node, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        onclone: (clonedDocument) => {
          const stage = clonedDocument.getElementById("export-stage");
          if (stage) stage.style.right = "0";
        }
      });
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
    <main className="min-h-screen bg-[#fbfaf7] pb-24 text-[#15151b] sm:pb-0">
      <AnimatePresence>
        {busy && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-x-4 top-4 z-50 mx-auto flex max-w-sm items-center gap-3 rounded-full border border-black/10 bg-white/90 px-4 py-3 text-sm shadow-soft-xl backdrop-blur-xl">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#b88a44]" />
            Preparazione premium in corso
          </motion.div>
        )}
      </AnimatePresence>
      <header className="border-b border-black/10 bg-[#f7f3eb]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#15151b] text-white"><SparkIcon /></div>
            <h1 className="text-base font-semibold">Invitation Creator PRO</h1>
          </div>
          <div className="flex w-fit rounded-full border border-black/10 bg-white p-1">
            {(["free", "premium"] as ProductPlan[]).map((item) => (
              <button key={item} onClick={() => setPlan(item)} aria-pressed={plan === item} className={`min-h-10 rounded-full px-4 text-xs font-semibold ${plan === item ? "bg-black text-white" : "text-black/55"}`}>
                {planFeatures[item].label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[290px_minmax(0,1fr)]">
        <aside className="space-y-4 lg:sticky lg:top-4 lg:self-start">
          <Panel title="Tipo di evento" icon={<CalendarDays size={17} />}>
            <div className="grid grid-cols-2 gap-2">
              {eventTypes.map(({ id, label, icon: Icon }) => (
                <button key={id} aria-pressed={active.eventType === id} onClick={() => applyEvent(id)} className={`flex items-center gap-2 rounded-2xl border p-3 text-left text-sm transition ${active.eventType === id ? "border-black bg-black text-white" : "border-black/10 bg-white hover:border-black/30"}`}>
                  <Icon size={16} /> {label}
                </button>
              ))}
            </div>
            <p className="mt-3 text-sm text-black/65">
              Consigliati <strong>{recommendation.templateName}</strong> e stile <strong>{writingStyles[recommendation.writingStyle].label}</strong>
            </p>
          </Panel>

          <details className="rounded-2xl border border-black/10 bg-white p-3">
            <summary className="cursor-pointer text-sm font-semibold">Inviti di esempio</summary>
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

          </details>

          <details className="rounded-2xl border border-black/10 bg-white p-3">
            <summary className="cursor-pointer text-sm font-semibold">Stile, colori e caratteri</summary>
          <Panel title="Direzione creativa" icon={<Palette size={17} />}>
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
            <details className="mt-3 rounded-2xl border border-black/10 bg-white px-3">
              <summary className="cursor-pointer py-3 text-sm font-semibold">
                Carattere · <span className="text-lg" style={{ fontFamily: selectedFont.family, fontWeight: selectedFont.weight }}>{selectedFont.name}</span>
              </summary>
              <fieldset className="grid grid-cols-1 gap-2 pb-3 min-[480px]:grid-cols-2 lg:grid-cols-1">
                <legend className="sr-only">Carattere dell’invito</legend>
                {invitationFonts.map((font) => (
                  <label key={font.name} className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-3 py-2 ${selectedFont.name === font.name ? "border-black bg-[#f4f1eb]" : "border-black/10"}`}>
                    <input type="radio" name="invitation-font" value={font.name} checked={selectedFont.name === font.name} onChange={() => update({ font: font.name })} className="shrink-0 accent-black" />
                    <span className="min-w-0 break-words text-xl leading-snug" style={{ fontFamily: font.family, fontWeight: font.weight }}>{font.name}</span>
                  </label>
                ))}
              </fieldset>
            </details>
          </Panel>

          </details>

          <details className="rounded-2xl border border-black/10 bg-white p-3">
            <summary className="cursor-pointer text-sm font-semibold">Foto, video e musica</summary>
          <Panel title="Carica file" icon={<Upload size={17} />}>
            <p className="mb-3 text-sm text-black/65">Foto, video e musica sono visibili su questo dispositivo. Il link condiviso include i testi e lo stile dell’invito.</p>
            <FileInput label="Foto / immagini evento" accept="image/*" multiple onChange={(event) => readFiles(event, "images")} />
            <FileInput label="Logo" accept="image/*" onChange={(event) => readFiles(event, "logo")} />
            <FileInput label="Video breve" accept="video/*" onChange={(event) => readFiles(event, "video")} />
            <FileInput label="Musica MP3" accept="audio/*" onChange={(event) => readFiles(event, "music")} />
            {active.images.length > 0 && (
              <div className="mt-3 grid grid-cols-3 gap-2">
                {active.images.slice(0, 6).map((image, index) => (
                  <img key={`${image.slice(0, 24)}-${index}`} className="aspect-square rounded-2xl object-cover" src={image} alt="" />
                ))}
              </div>
            )}
            {active.music && <div className="mt-3 rounded-2xl bg-black/[.04] p-3 text-xs text-black/60">Musica caricata. Sara controllabile nella pagina invito.</div>}
          </Panel>
          </details>
        </aside>

        <section className="space-y-4">
          <Panel title="Personalizzazione contenuti" icon={<FileText size={17} />}>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Nomi" maxLength={86} value={active.names} onChange={(value) => update({ names: value })} />
              <Field label="Luogo" maxLength={120} value={active.place} onChange={(value) => update({ place: value })} />
              <Field label="Data" type="date" value={active.date} onChange={(value) => update({ date: value })} />
              <Field label="Ora" type="time" value={active.time} onChange={(value) => update({ time: value })} />
              <Field label="Dress code" maxLength={72} value={active.dressCode} onChange={(value) => update({ dressCode: value })} />
              <Field label="WhatsApp RSVP" value={active.whatsapp} onChange={(value) => update({ whatsapp: value.replace(/[^\d+]/g, "").replace(/(?!^)\+/g, "").slice(0, 16) })} />
            </div>
            <label className="mt-3 block text-sm font-medium">
              Stile di scrittura
              <select value={active.writingStyle ?? ""} onChange={(event) => update({ writingStyle: (event.target.value || undefined) as WritingStyle | undefined })} className="mt-2 block w-full rounded-2xl border border-black/10 bg-white p-3 text-base">
                <option value="">Automatico in base all’evento</option>
                {Object.entries(writingStyles).map(([id, style]) => <option key={id} value={id}>{style.label}</option>)}
              </select>
            </label>
            {generatedCopy.writingOpening && <p className="mt-2 text-sm text-black/65">{generatedCopy.writingOpening}</p>}

            <label className="mt-3 block text-sm font-medium">
              Descrizione intelligente
              <textarea value={active.description} maxLength={620} onChange={(event) => update({ description: event.target.value })} className="mt-2 min-h-28 w-full rounded-2xl border border-black/10 bg-white p-4 leading-7 outline-none focus:border-black/40" />
            </label>
            <label className="mt-3 block text-sm font-medium">
              La nostra storia
              <textarea value={active.story ?? ""} maxLength={360} onChange={(event) => update({ story: event.target.value })} className="mt-2 min-h-24 w-full rounded-2xl border border-black/10 p-4" />
            </label>
            <label className="mt-3 block text-sm font-medium">
              Apertura dell’invito
              <select disabled={!features.premiumAnimations} value={features.premiumAnimations ? active.opening ?? "direct" : "direct"} onChange={(event) => {
                update({ opening: event.target.value as Invitation["opening"] });
              }} className="mt-2 block w-full rounded-2xl border border-black/10 bg-white p-3">
                {Object.entries(invitationOpenings).map(([id, option]) => (
                  <option key={id} value={id}>{option.label}</option>
                ))}
              </select>
              {!features.premiumAnimations && <span className="mt-1 block text-xs text-black/65">Le aperture animate sono disponibili in Premium.</span>}
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

          <details className="rounded-[26px] border border-black/10 bg-white p-4">
            <summary className="cursor-pointer py-1 text-sm font-semibold">
              Modelli grafici · {templates.find((item) => item.id === active.template)?.name}
            </summary>
            <label className="my-3 flex items-center gap-2 text-sm">
              <input type="checkbox" checked={showAllTemplates} onChange={(event) => setShowAllTemplates(event.target.checked)} />
              Mostra tutti i modelli
            </label>
            <div className="grid grid-cols-2 gap-2 xl:grid-cols-4">
              {templates.filter((template) =>
                showAllTemplates || template.id === active.template ||
                ("event" in template ? template.event === active.eventType :
                  "bestFor" in template ? template.bestFor.some((event) => event === active.eventType) : false)
              ).map((template) => {
                const locked = !features.templates.some((id) => id === template.id);
                const artwork = "artwork" in template ? template.artwork : undefined;
                return (
                <button key={template.id} aria-pressed={active.template === template.id} onClick={() => locked ? setNotice("Template premium: passa a Premium per usarlo senza limiti.") : update({ template: template.id as TemplateId, palette: template.palette })} className={`group overflow-hidden rounded-[24px] border bg-white p-3 text-left transition hover:-translate-y-0.5 ${active.template === template.id ? "border-black shadow-soft-xl" : "border-black/10 hover:border-black/30"} ${locked ? "opacity-60" : ""}`}>
                  <div className="relative h-14 overflow-hidden rounded-xl sm:h-20" style={{ background: template.preview }}>
                    {artwork && (
                      <img
                        src={artwork.src}
                        alt=""
                        loading="lazy"
                        className={`absolute inset-0 h-full w-full object-cover ${artwork.position === "top" ? "object-[center_10%]" : "object-[center_85%]"}`}
                      />
                    )}
                    {locked && <span className="absolute right-1 top-1 rounded-full bg-black px-3 py-1 text-[11px] font-semibold text-white">Premium</span>}
                  </div>
                  <div className="mt-3 text-sm font-semibold">{template.name}</div>
                  <div className="mt-1 text-xs leading-5 text-black/52">{template.description}</div>
                </button>
              );})}
            </div>
          </details>
          <div className="fixed inset-x-0 bottom-0 z-30 space-y-2 border-t border-black/10 bg-[#fbfaf7] px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:static sm:border-0 sm:p-0">
            <button type="button" disabled={!hydrated || busy === "save"} onClick={() => persist(true)} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#15151b] px-6 text-sm font-semibold text-white disabled:opacity-60 sm:w-auto">
              <Play size={17} /> {busy === "save" ? "Generazione in corso…" : "Genera invito"}
            </button>
            {notice && <p role="status" className="text-sm text-black/65">{notice}</p>}
          </div>
        </section>

        <details id="qr-section" className="space-y-4 rounded-2xl border border-black/10 bg-white p-4 lg:col-span-2">
          <summary className="cursor-pointer text-sm font-semibold">Inviti salvati, QR ed esportazione</summary>
          <div>
          <Panel title="QR code premium" icon={<QrCode size={17} />}>
            <PremiumQrCard
              active={active}
              qr={qr}
              shareUrl={shareUrl}
              accent={palette.accent}
              onSave={() => persist()}
              onCopy={() => copyLink()}
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
          </div>

          <Panel title="Dashboard" icon={<Smartphone size={17} />}>
            <div className="max-h-[520px] space-y-2 overflow-auto pr-1">
              {invitations.map((item) => (
                <div key={item.id + item.slug} className="rounded-2xl border border-black/10 bg-white p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-sm font-semibold">{item.names}</div>
                      <div className="text-xs capitalize text-black/50">{item.eventType.replace("-", " ")} · {item.visits} visite</div>
                    </div>
                    <div className="h-10 w-10 shrink-0 rounded-xl" style={{ background: palettes[item.palette as keyof typeof palettes]?.soft ?? "#eee" }} />
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <a className="inline-flex items-center justify-center gap-1 rounded-xl bg-black px-2 py-2 text-xs font-semibold text-white" href={inviteUrl(item)} target="_blank" rel="noreferrer"><Eye size={13} /> Vedi</a>
                    <button className="inline-flex items-center justify-center gap-1 rounded-xl border border-black/10 px-2 py-2 text-xs font-semibold" onClick={() => { setActive(item); setNotice(`Invito "${item.names}" caricato in modifica.`); }}><FileText size={13} /> Modifica</button>
                    <button className="inline-flex items-center justify-center gap-1 rounded-xl border border-black/10 px-2 py-2 text-xs font-semibold" onClick={() => copyLink(item)}><Copy size={13} /> Link</button>
                    <button className="inline-flex items-center justify-center gap-1 rounded-xl border border-black/10 px-2 py-2 text-xs font-semibold" onClick={() => downloadQrFor(item)}><QrCode size={13} /> QR</button>
                    <button className="col-span-2 inline-flex items-center justify-center gap-1 rounded-xl border border-[#b35f42]/20 bg-[#fff4ef] px-2 py-2 text-xs font-semibold text-[#7a3926]" onClick={() => removeInvitation(item)}><Trash2 size={13} /> Elimina</button>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={removeActive} className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#b35f42]/20 bg-[#fff4ef] px-4 py-3 text-sm font-semibold text-[#7a3926]">
              <Trash2 size={16} /> Elimina invito attivo
            </button>
          </Panel>

          <MarketingAssets active={active} qr={qr} shareUrl={shareUrl} palette={palette} plan={plan} />
        </details>
      </section>

      <div aria-hidden="true" ref={(node) => { if (node) node.inert = true; }} id="export-stage" className="pointer-events-none absolute right-full top-0 w-[390px]">
        <TemplateStage invitation={active} compact plan={plan} />
      </div>
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

function Field({ label, value, onChange, type = "text", maxLength }: { maxLength?: number; label: string; value: string; onChange: (value: string) => void; type?: string }) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <input type={type} maxLength={maxLength} value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-base outline-none focus:border-black/40" />
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

function createId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `invite-${Date.now()}-${Math.random().toString(16).slice(2)}`;
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
  const readableLink = readableInviteLink(shareUrl);
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
          <span className="break-all">{readableLink}</span>
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

function readableInviteLink(url: string) {
  try {
    const parsed = new URL(url);
    return `${parsed.origin}${parsed.pathname}`;
  } catch {
    return url.split("?")[0];
  }
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
