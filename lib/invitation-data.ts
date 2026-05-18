import {
  Baby,
  BriefcaseBusiness,
  Cake,
  Gem,
  GraduationCap,
  Heart,
  Sparkles
} from "lucide-react";

export type EventType =
  | "matrimonio"
  | "compleanno"
  | "battesimo"
  | "baby-shower"
  | "laurea"
  | "anniversario"
  | "business";

export type TemplateId =
  | "lumiere"
  | "botanica"
  | "cinema"
  | "atelier"
  | "playful"
  | "executive";

export type Invitation = {
  id: string;
  slug: string;
  eventType: EventType;
  template: TemplateId;
  names: string;
  date: string;
  time: string;
  place: string;
  description: string;
  dressCode: string;
  whatsapp: string;
  palette: string;
  font: string;
  style: string;
  tone: string;
  images: string[];
  logo?: string;
  video?: string;
  music?: string;
  visits: number;
  createdAt: string;
};

export type ProductPlan = "free" | "premium";

export const eventTypes = [
  { id: "matrimonio", label: "Matrimonio", icon: Heart },
  { id: "compleanno", label: "Compleanno", icon: Cake },
  { id: "battesimo", label: "Battesimo", icon: Sparkles },
  { id: "baby-shower", label: "Baby shower", icon: Baby },
  { id: "laurea", label: "Laurea", icon: GraduationCap },
  { id: "anniversario", label: "Anniversario", icon: Gem },
  { id: "business", label: "Evento business", icon: BriefcaseBusiness }
] as const;

export const palettes = {
  champagne: {
    name: "Champagne Ivory",
    bg: "#fbfaf7",
    ink: "#17161b",
    soft: "#efe7da",
    accent: "#b88a44",
    accent2: "#56685c"
  },
  noir: {
    name: "Noir Pearl",
    bg: "#101114",
    ink: "#f8f1e7",
    soft: "#24262d",
    accent: "#d6b46c",
    accent2: "#8fa7b0"
  },
  rose: {
    name: "Rose Museum",
    bg: "#fff7f4",
    ink: "#2a1820",
    soft: "#f1d8d1",
    accent: "#b76577",
    accent2: "#8b8f74"
  },
  celeste: {
    name: "Cloud Blue",
    bg: "#f6fbff",
    ink: "#142033",
    soft: "#dcecf7",
    accent: "#5d93bd",
    accent2: "#f0b15d"
  },
  emerald: {
    name: "Emerald Garden",
    bg: "#f5f9f3",
    ink: "#14211a",
    soft: "#dfeade",
    accent: "#2f7661",
    accent2: "#c49252"
  },
  graphite: {
    name: "Graphite Signal",
    bg: "#f7f8f8",
    ink: "#12151a",
    soft: "#e5e8ea",
    accent: "#365f6b",
    accent2: "#b35f42"
  }
};

export const templates = [
  {
    id: "lumiere",
    name: "Lumiere Vows",
    description: "Suite nuziale editoriale con apertura a busta, ritmo lento e dettagli da stationery di alta gamma.",
    mood: "Editoriale, oro caldo, apertura cinematografica",
    category: "Wedding luxury",
    bestFor: ["matrimonio", "anniversario"],
    palette: "champagne",
    recommendedFonts: ["Editorial serif", "Classic roman"],
    supportedSections: ["hero", "timeline", "gallery", "rsvp", "qr", "map"],
    animations: ["envelope", "soft-reveal", "gold-line"],
    toneOfVoice: "intimo, elegante, misurato",
    ctaVariants: ["Conferma agli sposi", "Partecipo al si", "Riserva il posto"],
    rsvpVariants: ["RSVP agli sposi", "Conferma presenza", "Scrivi su WhatsApp"],
    preview: "linear-gradient(135deg,#fbfaf7,#e8d5ad 55%,#15151b)",
    premium: false
  },
  {
    id: "botanica",
    name: "Botanica Glass",
    description: "Layout naturale e raffinato con vetro satinato, respiro arioso e sezioni gentili.",
    mood: "Natura raffinata, vetro satinato, dettagli organici",
    category: "Cerimonia dolce",
    bestFor: ["battesimo", "baby-shower", "matrimonio"],
    palette: "emerald",
    recommendedFonts: ["Soft rounded", "Editorial serif"],
    supportedSections: ["hero", "story", "timeline", "map", "qr"],
    animations: ["botanical-rise", "glass-fade", "leaf-drift"],
    toneOfVoice: "delicato, familiare, luminoso",
    ctaVariants: ["Conferma con affetto", "Partecipo", "Rispondi alla famiglia"],
    rsvpVariants: ["RSVP famiglia", "Conferma dolce", "Messaggio agli organizzatori"],
    preview: "linear-gradient(135deg,#f5f9f3,#2f7661 62%,#d9c28f)",
    premium: false
  },
  {
    id: "cinema",
    name: "Midnight Cinema",
    description: "Invito scenografico scuro con reveal da premiere, perfetto per party serali e anniversari.",
    mood: "Scuro, teatrale, reveal con luce morbida",
    category: "Party cinematico",
    bestFor: ["compleanno", "anniversario", "business"],
    palette: "noir",
    recommendedFonts: ["Modern grotesk", "Editorial serif"],
    supportedSections: ["hero", "countdown", "gallery", "rsvp", "qr"],
    animations: ["curtain", "spotlight", "slow-zoom"],
    toneOfVoice: "scenografico, deciso, serale",
    ctaVariants: ["Entra in lista", "Conferma il party", "Vengo a brindare"],
    rsvpVariants: ["RSVP serata", "Conferma ingresso", "Scrivi al party"],
    preview: "linear-gradient(135deg,#101114,#343843 58%,#d6b46c)",
    premium: true
  },
  {
    id: "atelier",
    name: "Atelier Rose",
    description: "Look romantico contemporaneo con carta blush, microcopy morbido e transizioni leggere.",
    mood: "Romantico moderno, texture carta, accenti blush",
    category: "Romantic premium",
    bestFor: ["baby-shower", "battesimo", "matrimonio"],
    palette: "rose",
    recommendedFonts: ["Editorial serif", "Soft rounded"],
    supportedSections: ["hero", "story", "gallery", "rsvp", "qr"],
    animations: ["paper-fold", "blush-fade", "gentle-slide"],
    toneOfVoice: "dolce, curato, emotivo",
    ctaVariants: ["Partecipo con gioia", "Ci saro", "Conferma con affetto"],
    rsvpVariants: ["RSVP dolce", "Messaggio privato", "Conferma invitati"],
    preview: "linear-gradient(135deg,#fff7f4,#e8b8c0 55%,#8b8f74)",
    premium: true
  },
  {
    id: "playful",
    name: "Petit Festival",
    description: "Colorato, mobile-first e allegro, con ritmo premium per feste moderne e bambini.",
    mood: "Colorato ma premium, ritmo allegro, forme morbide",
    category: "Modern birthday",
    bestFor: ["compleanno", "baby-shower"],
    palette: "celeste",
    recommendedFonts: ["Soft rounded", "Modern grotesk"],
    supportedSections: ["hero", "moments", "gallery", "rsvp", "qr"],
    animations: ["confetti-soft", "bounce-lite", "sticker-pop"],
    toneOfVoice: "allegro, fresco, non infantile",
    ctaVariants: ["Vengo alla festa", "Salvami un posto", "Ci saro"],
    rsvpVariants: ["RSVP festa", "Conferma party", "Messaggio rapido"],
    preview: "radial-gradient(circle at 25% 28%,#f0b15d,transparent 25%),radial-gradient(circle at 72% 38%,#5d93bd,transparent 28%),#f6fbff",
    premium: false
  },
  {
    id: "executive",
    name: "Executive Halo",
    description: "Template business ad alta leggibilita con agenda, QR operativo e tono da prodotto SaaS.",
    mood: "Business luxury, preciso, dinamico, molto leggibile",
    category: "Business event",
    bestFor: ["business", "laurea"],
    palette: "graphite",
    recommendedFonts: ["Modern grotesk", "Classic roman"],
    supportedSections: ["hero", "agenda", "qr", "map", "rsvp"],
    animations: ["halo-scan", "panel-rise", "signal-line"],
    toneOfVoice: "professionale, chiaro, orientato al valore",
    ctaVariants: ["Conferma accredito", "Riserva il posto", "Richiedi accesso"],
    rsvpVariants: ["RSVP accredito", "Conferma business", "Messaggio evento"],
    preview: "linear-gradient(135deg,#f7f8f8,#365f6b 55%,#b35f42)",
    premium: true
  }
] as const;

export const smartCopy: Record<EventType, {
  title: string;
  intro: string[];
  detailsTitle: string;
  rsvp: string;
  whatsapp: string;
  thanks: string;
  reminder: string;
  ctas: string[];
  sections: string[];
  timeline: string[];
}> = {
  matrimonio: {
    title: "Una promessa da vivere insieme",
    intro: [
      "Con gioia immensa vi invitiamo a celebrare il giorno in cui il nostro sì diventa casa.",
      "Sarà una giornata fatta di luce, musica e persone amate: voi siete parte essenziale di questa storia."
    ],
    detailsTitle: "Il giorno del sì",
    rsvp: "Conferma la tua presenza",
    whatsapp: "Ciao, confermo con piacere la mia presenza al matrimonio.",
    thanks: "Grazie per essere parte del nostro inizio.",
    reminder: "Un piccolo promemoria elegante per un giorno che non vorremmo vivere senza di te.",
    ctas: ["Conferma il tuo posto", "Ci saro con gioia", "RSVP agli sposi"],
    sections: ["Cerimonia", "Ricevimento", "Dress code", "Momenti speciali"],
    timeline: ["Cerimonia", "Brindisi di benvenuto", "Cena", "Taglio torta", "Party"]
  },
  compleanno: {
    title: "Una festa tutta da ricordare",
    intro: [
      "Preparati a una giornata piena di energia, sorrisi e piccoli dettagli speciali.",
      "Abbiamo immaginato una festa semplice da vivere e bellissima da ricordare."
    ],
    detailsTitle: "Programma festa",
    rsvp: "Dimmi che ci sarai",
    whatsapp: "Ciao, confermo la mia presenza alla festa!",
    thanks: "La tua presenza renderà la festa ancora più speciale.",
    reminder: "Salva la data: sta arrivando un momento tutto da festeggiare.",
    ctas: ["Vengo alla festa", "Salvami un posto", "Conferma presenza"],
    sections: ["Welcome", "Torta", "Regali", "Musica"],
    timeline: ["Accoglienza", "Aperitivo", "Candeline", "Foto moment", "Musica"]
  },
  battesimo: {
    title: "Una luce nuova da celebrare",
    intro: [
      "Vi aspettiamo per condividere un momento dolce, intimo e pieno di significato.",
      "Una celebrazione pensata con delicatezza, tra famiglia, sorrisi e gratitudine."
    ],
    detailsTitle: "La celebrazione",
    rsvp: "Conferma presenza",
    whatsapp: "Ciao, confermo la mia presenza al battesimo.",
    thanks: "Grazie per condividere con noi questo giorno prezioso.",
    reminder: "Un promemoria gentile per una giornata piena di tenerezza.",
    ctas: ["Conferma con affetto", "Partecipo", "Rispondi alla famiglia"],
    sections: ["Cerimonia", "Pranzo", "Confetti", "Foto famiglia"],
    timeline: ["Cerimonia", "Foto famiglia", "Pranzo", "Confetti", "Saluti"]
  },
  "baby-shower": {
    title: "Un piccolo grande arrivo",
    intro: [
      "Stiamo preparando una festa tenera, luminosa e piena di attesa felice.",
      "Ci saranno sorrisi, piccoli giochi e tutto il calore delle persone più care."
    ],
    detailsTitle: "Baby celebration",
    rsvp: "Partecipo con gioia",
    whatsapp: "Ciao, confermo la mia presenza al baby shower.",
    thanks: "Grazie per circondarci di affetto in questo momento speciale.",
    reminder: "La dolce attesa merita un posto nel calendario.",
    ctas: ["Partecipo con gioia", "Ci saro", "Conferma al party"],
    sections: ["Gift table", "Momenti gioco", "Cake table", "Foto"],
    timeline: ["Welcome drink", "Gift table", "Momenti gioco", "Cake", "Foto"]
  },
  laurea: {
    title: "Un traguardo da brindare",
    intro: [
      "Dopo impegno, notti lunghe e molta determinazione, è arrivato il momento di festeggiare.",
      "Vogliamo condividere questo traguardo con chi ha reso il percorso più bello."
    ],
    detailsTitle: "Graduation party",
    rsvp: "Conferma per il brindisi",
    whatsapp: "Ciao, confermo la mia presenza alla festa di laurea.",
    thanks: "Grazie per essere parte di questo traguardo.",
    reminder: "La toga è pronta, il brindisi pure.",
    ctas: ["Brindo con te", "Conferma il brindisi", "Ci saro"],
    sections: ["Proclamazione", "Brindisi", "Cena", "Party"],
    timeline: ["Ritrovo", "Proclamazione", "Brindisi", "Cena", "Party"]
  },
  anniversario: {
    title: "Ancora noi, ancora insieme",
    intro: [
      "Ci sono date che meritano una pausa, un brindisi e le persone giuste intorno.",
      "Vi invitiamo a celebrare con noi una storia che continua a scegliere la bellezza."
    ],
    detailsTitle: "Anniversary evening",
    rsvp: "Conferma la serata",
    whatsapp: "Ciao, confermo la mia presenza all'anniversario.",
    thanks: "Grazie per celebrare con noi questo capitolo.",
    reminder: "Una serata speciale sta arrivando.",
    ctas: ["Conferma la serata", "Festeggio con voi", "RSVP anniversario"],
    sections: ["Cena", "Toast", "Ricordi", "Dessert"],
    timeline: ["Welcome", "Cena", "Toast", "Memories", "Dessert"]
  },
  business: {
    title: "Un’esperienza professionale curata",
    intro: [
      "Un incontro progettato per connettere persone, idee e opportunità in un contesto raffinato.",
      "Agenda essenziale, atmosfera premium e dettagli pensati per rendere ogni minuto utile."
    ],
    detailsTitle: "Event agenda",
    rsvp: "Riserva il tuo posto",
    whatsapp: "Ciao, confermo la mia partecipazione all'evento business.",
    thanks: "Grazie per il tuo interesse, ti aspettiamo.",
    reminder: "Aggiungi l’evento al calendario e preparati a un incontro ad alto valore.",
    ctas: ["Riserva il tuo posto", "Partecipa all'evento", "Conferma accredito"],
    sections: ["Check-in", "Keynote", "Panel", "Networking"],
    timeline: ["Check-in", "Keynote", "Networking", "Panel", "Cocktail"]
  }
};

export const defaultInvitation: Invitation = {
  id: "demo",
  slug: "mario-giulia",
  eventType: "matrimonio",
  template: "lumiere",
  names: "Mario & Giulia",
  date: "2026-09-18",
  time: "17:30",
  place: "Villa Aurelia, Roma",
  description: "Una sera di settembre tra giardino, cena sotto le luci e musica fino a tardi.",
  dressCode: "Black tie creativo",
  whatsapp: "393331234567",
  palette: "champagne",
  font: "Editorial serif",
  style: "Elegante",
  tone: "Emozionale",
  images: [],
  visits: 1284,
  createdAt: "2026-01-01T00:00:00.000Z"
};

export const demoInvitations: Invitation[] = [
  {
    ...defaultInvitation,
    images: [demoImage("MARIO & GIULIA", "#fbfaf7", "#b88a44", "#56685c")]
  },
  {
    id: "demo-birthday",
    slug: "sofia-30",
    eventType: "compleanno",
    template: "playful",
    names: "Sofia 30",
    date: "2026-07-12",
    time: "20:30",
    place: "Terrazza Triennale, Milano",
    description: "Un rooftop estivo, cocktail curati, playlist elegante e una torta che arriva quando la citta si accende.",
    dressCode: "Color touch elegante",
    whatsapp: "393471112233",
    palette: "celeste",
    font: "Soft rounded",
    style: "Cartoon",
    tone: "Giocoso",
    images: [demoImage("SOFIA 30", "#f6fbff", "#5d93bd", "#f0b15d")],
    visits: 936,
    createdAt: "2026-01-02T00:00:00.000Z"
  },
  {
    id: "demo-baptism",
    slug: "battesimo-ludovica",
    eventType: "battesimo",
    template: "botanica",
    names: "Ludovica",
    date: "2026-06-07",
    time: "11:00",
    place: "Chiesa di Santa Maria in Trastevere, Roma",
    description: "Una celebrazione raccolta, pranzo in giardino e piccoli dettagli pensati per la famiglia.",
    dressCode: "Toni chiari",
    whatsapp: "393381234987",
    palette: "emerald",
    font: "Editorial serif",
    style: "Botanico",
    tone: "Dolce",
    images: [demoImage("LUDOVICA", "#f5f9f3", "#2f7661", "#c49252")],
    visits: 712,
    createdAt: "2026-01-03T00:00:00.000Z"
  },
  {
    id: "demo-business",
    slug: "founders-night-rome",
    eventType: "business",
    template: "executive",
    names: "Founders Night Rome",
    date: "2026-10-22",
    time: "18:45",
    place: "The Hoxton, Roma",
    description: "Una serata privata per founder, investitori e operatori digitali con keynote breve, tavoli tematici e networking selezionato.",
    dressCode: "Smart business",
    whatsapp: "393331998877",
    palette: "graphite",
    font: "Modern grotesk",
    style: "Business",
    tone: "Professionale",
    images: [demoImage("FOUNDERS", "#f7f8f8", "#365f6b", "#b35f42")],
    visits: 1840,
    createdAt: "2026-01-04T00:00:00.000Z"
  }
];

function demoImage(label: string, bg: string, accent: string, accent2: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1600"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop stop-color="${bg}"/><stop offset=".58" stop-color="${accent}" stop-opacity=".72"/><stop offset="1" stop-color="${accent2}"/></linearGradient><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter></defs><rect width="1200" height="1600" fill="url(#g)"/><rect width="1200" height="1600" fill="#fff" opacity=".16" filter="url(#n)"/><circle cx="920" cy="280" r="190" fill="#fff" opacity=".22"/><circle cx="250" cy="1280" r="240" fill="#fff" opacity=".16"/><path d="M160 1040c180-260 360-330 545-210 122 79 226 82 335 8" fill="none" stroke="#fff" stroke-width="22" opacity=".35" stroke-linecap="round"/><text x="90" y="190" font-family="Georgia,serif" font-size="88" fill="#15151b" opacity=".82">${label}</text><text x="92" y="270" font-family="Arial,sans-serif" font-size="28" letter-spacing="8" fill="#15151b" opacity=".52">PREMIUM EVENT VISUAL</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const planFeatures = {
  free: {
    label: "Demo",
    templates: ["lumiere", "botanica", "playful"],
    watermark: true,
    qrDownload: false,
    exportFiles: false,
    music: false,
    premiumAnimations: false
  },
  premium: {
    label: "Premium",
    templates: templates.map((item) => item.id),
    watermark: false,
    qrDownload: true,
    exportFiles: true,
    music: true,
    premiumAnimations: true
  }
} satisfies Record<ProductPlan, {
  label: string;
  templates: readonly string[];
  watermark: boolean;
  qrDownload: boolean;
  exportFiles: boolean;
  music: boolean;
  premiumAnimations: boolean;
}>;

export const styleRules: Record<string, { palette: keyof typeof palettes; tone: string; template: TemplateId }> = {
  "elegante": { palette: "champagne", tone: "Emozionale", template: "lumiere" },
  "romantico": { palette: "rose", tone: "Dolce", template: "atelier" },
  "botanico": { palette: "emerald", tone: "Naturale", template: "botanica" },
  "cartoon": { palette: "celeste", tone: "Giocoso", template: "playful" },
  "cinematografico": { palette: "noir", tone: "Drammatico", template: "cinema" },
  "business": { palette: "graphite", tone: "Professionale", template: "executive" }
};

export function getSmartSuggestion(eventType: EventType, style: string) {
  const copy = smartCopy[eventType];
  const rule = styleRules[style.toLowerCase()] ?? styleRules.elegante;
  return {
    palette: rule.palette,
    template: eventType === "business" ? "executive" : rule.template,
    tone: rule.tone,
    description: copy.intro.join(" ")
  };
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48) || "invito-premium";
}

export const qualitySignals = [
  { label: "Template premium", value: "6" },
  { label: "Copy locali", value: "AI-free" },
  { label: "Export", value: "PNG/PDF/QR" },
  { label: "Mobile first", value: "100%" }
];
