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
  | "comunione"
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
  | "executive"
  | "letterpress"
  | "costiera"
  | "terracotta"
  | "erbario"
  | "artdeco"
  | "confetti"
  | "acquerello"
  | "monocromo"
  | "tramonto"
  | "brina"
  | "ulivo"
  | "nozze-perla"
  | "gardenia"
  | "nuvola-celeste"
  | "piccola-stella"
  | "fiocco-rosa"
  | "spighe"
  | "luce-chiara"
  | "rametto-salvia"
  | "festa-pop"
  | "candeline"
  | "notte-neon"
  | "arcobaleno"
  | "buonanotte"
  | "orsetti"
  | "orsetto-tra-le-nuvole"
  | "mongolfiera-rosa-celeste";

export const invitationOpenings = {
  direct: { label: "Diretta", action: "Apri l’invito" },
  envelope: { label: "Busta con sigillo", action: "Apri l’invito" },
  balloon: { label: "Palloncino", action: "Tocca il palloncino per aprire" },
  gift: { label: "Pacco regalo", action: "Apri il regalo" },
  curtain: { label: "Sipario", action: "Apri il sipario" },
  postcard: { label: "Cartolina da girare", action: "Gira la cartolina" }
} as const;

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
  story?: string;
  opening?: keyof typeof invitationOpenings;
  dressCode: string;
  whatsapp: string;
  palette: string;
  font: string;
  style: string;
  tone: string;
  writingStyle?: import("./writing-styles").WritingStyle;
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
  { id: "comunione", label: "Comunione", icon: Sparkles },
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
  "rosa-celeste": {
    name: "Rosa e celeste",
    bg: "#fffaf7",
    ink: "#252942",
    soft: "#f8e7ee",
    accent: "#465f88",
    accent2: "#b46583"
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

export const additionalTemplates = [
  { id: "letterpress", name: "Carta e inchiostro", description: "Carta avorio, righe sottili e bordo tipografico", palette: "champagne",
    preview: "repeating-linear-gradient(0deg,#eadfcb 0 1px,#fbf7ed 1px 8px)", align: "center", radius: 8, premium: true },
  { id: "costiera", name: "Costiera", description: "Fasce azzurre e composizione luminosa", palette: "celeste",
    preview: "repeating-linear-gradient(125deg,#9ec7db 0 16px,#eff8fd 16px 44px)", align: "center", radius: 24, premium: true },
  { id: "terracotta", name: "Terra di Siena", description: "Archi caldi e dettagli color terracotta", palette: "rose",
    preview: "radial-gradient(ellipse at 50% 20%,#faebdd 35%,#c97f63 36% 63%,#f5ded0 64%)", align: "center", radius: 52, premium: true },
  { id: "erbario", name: "Erbario", description: "Toni salvia e cerchi sovrapposti", palette: "emerald",
    preview: "radial-gradient(circle at 10% 15%,#adc5a7 0 20%,transparent 21%),radial-gradient(circle at 90% 85%,#759681 0 22%,#edf4e9 23%)", align: "left", radius: 18, premium: true },
  { id: "artdeco", name: "Notte Déco", description: "Oro a ventaglio su fondo scuro", palette: "noir",
    preview: "repeating-conic-gradient(from 12deg at 50% 85%,#17191d 0 11deg,#b39454 11deg 12deg,#24252a 12deg 24deg)", align: "center", radius: 4, premium: true },
  { id: "confetti", name: "Confetti Pop", description: "Motivo a pois e bordi arrotondati", palette: "celeste",
    preview: "radial-gradient(circle,#629ec1 12%,transparent 15%) 0 0/24px 24px,radial-gradient(circle,#ecac76 12%,transparent 15%) 12px 12px/24px 24px,#f5faff", align: "left", radius: 40, premium: true },
  { id: "acquerello", name: "Acquerello rosa", description: "Pennellate sfumate rosa e crema", palette: "rose",
    preview: "radial-gradient(ellipse at 0 40%,#dca7af,transparent 58%),radial-gradient(ellipse at 85% 95%,#eec7b8,transparent 65%),#fcf4f1", align: "center", radius: 32, premium: true },
  { id: "monocromo", name: "Monocromo", description: "Geometrie nette e taglio contemporaneo", palette: "graphite",
    preview: "linear-gradient(155deg,#fff 0 48%,#ced8dd 48% 50%,#e7edf0 50%)", align: "left", radius: 0, premium: true },
  { id: "tramonto", name: "Ultima luce", description: "Sole basso, toni pesca e oro", palette: "champagne",
    preview: "radial-gradient(circle at 73% 29%,#fff0b7 0 14%,transparent 15%),linear-gradient(165deg,#f9efdf,#e9b082,#bd786f)", align: "left", radius: 26, premium: true },
  { id: "brina", name: "Brina", description: "Cristalli chiari su sfondo freddo", palette: "celeste",
    preview: "repeating-conic-gradient(from 30deg at 48% 12%,#edf8ff 0 9deg,#c4deea 9deg 10deg,#f9fcff 10deg 20deg)", align: "center", radius: 14, premium: true },
  { id: "ulivo", name: "Rami d’ulivo", description: "Salvia e avorio", palette: "emerald",
    preview: "radial-gradient(ellipse at top left,#a9bf92,transparent 58%),radial-gradient(ellipse at bottom right,#77956e,#f5f2df 70%)", align: "center", radius: 26, premium: false, event: "matrimonio" },
  { id: "nozze-perla", name: "Nozze di perla", description: "Riflessi madreperla e oro", palette: "champagne",
    preview: "conic-gradient(from 45deg,#f4e4c9,#fffdfa,#c7b596,#fbf4ec,#f4e4c9)", align: "center", radius: 40, premium: true, event: "matrimonio" },
  { id: "gardenia", name: "Gardenia", description: "Petali avorio su rosa antico", palette: "rose",
    preview: "radial-gradient(ellipse at 16% 20%,#fff7eb 10%,transparent 41%),radial-gradient(ellipse at 89% 89%,#f7e6ce 15%,#ac687e 72%)", align: "left", radius: 12, premium: true, event: "matrimonio" },
  { id: "nuvola-celeste", name: "Nuvola celeste", description: "Nuvole bianche in un cielo chiaro", palette: "celeste",
    preview: "radial-gradient(ellipse at 15% 75%,white 15%,transparent 35%),radial-gradient(ellipse at 85% 60%,white 10%,transparent 32%),#afd4e8", align: "center", radius: 26, premium: false, event: "battesimo" },
  { id: "piccola-stella", name: "Piccola stella", description: "Luce dorata e toni panna", palette: "champagne",
    preview: "repeating-conic-gradient(from 7deg at 25% 20%,#ebcb90 0 6deg,#fdf5df 6deg 21deg)", align: "center", radius: 40, premium: true, event: "battesimo" },
  { id: "fiocco-rosa", name: "Fiocco rosa", description: "Nastri rosa e carta delicata", palette: "rose",
    preview: "repeating-linear-gradient(42deg,#fff1f3 0 32px,#dfa5ba 32px 38px,#f5d8df 38px 46px)", align: "left", radius: 12, premium: true, event: "battesimo" },
  { id: "spighe", name: "Spighe dorate", description: "Avorio e piccoli tratti dorati", palette: "champagne",
    preview: "repeating-linear-gradient(115deg,#faf1db 0 10px,#d2ab63 10px 12px,#f5e7cb 12px 27px)", align: "center", radius: 26, premium: false, event: "comunione" },
  { id: "luce-chiara", name: "Luce chiara", description: "Vetrata chiara nei toni azzurri", palette: "celeste",
    preview: "conic-gradient(from 32deg at 60% 20%,#b6d5df,#fffaf2,#87b0c1,#ece0b3,#b6d5df)", align: "center", radius: 40, premium: true, event: "comunione" },
  { id: "rametto-salvia", name: "Rametto di salvia", description: "Verde tenue e forme a foglia", palette: "emerald",
    preview: "radial-gradient(ellipse at 0 40%,#9cab83 18%,transparent 44%),radial-gradient(ellipse at 100% 65%,#7e9b7a 12%,#edf2dc 53%)", align: "left", radius: 12, premium: true, event: "comunione" },
  { id: "festa-pop", name: "Festa Pop", description: "Righe vivaci e contrasti colorati", palette: "celeste",
    preview: "repeating-linear-gradient(145deg,#80cbd0 0 17px,#fff5c5 17px 34px,#e99fbb 34px 51px)", align: "center", radius: 26, premium: false, event: "compleanno" },
  { id: "candeline", name: "Candeline", description: "Fiammelle e colori da pasticceria", palette: "rose",
    preview: "radial-gradient(ellipse,#f7a15d 13%,transparent 16%) 0 0/23px 36px,#fbd7e2", align: "center", radius: 40, premium: true, event: "compleanno" },
  { id: "notte-neon", name: "Notte neon", description: "Luci viola e blu elettrico", palette: "noir",
    preview: "radial-gradient(ellipse at 5% 5%,#7444b1,transparent 55%),radial-gradient(ellipse at 90% 95%,#236687,#15141e 60%)", align: "left", radius: 12, premium: true, event: "compleanno" },
  { id: "arcobaleno", name: "Piccolo arcobaleno", description: "Archi color pesca, salvia e crema", palette: "champagne",
    preview: "radial-gradient(ellipse at 50% 100%,#fff5dd 0 24%,#e7b3ab 25% 37%,#c4d1ae 38% 51%,#f5cf9a 52% 64%,#fff0de 65%)", align: "center", radius: 26, premium: false, event: "baby-shower" },
  { id: "buonanotte", name: "Buonanotte luna", description: "Luna chiara su fondo lavanda", palette: "celeste",
    preview: "radial-gradient(circle at 75% 27%,#fff5cd 0 12%,transparent 13%),linear-gradient(145deg,#d6c6ee,#b9d7e8)", align: "center", radius: 40, premium: true, event: "baby-shower" },
  { id: "orsetti", name: "Orsetti e miele", description: "Cerchi morbidi nei toni miele", palette: "champagne",
    preview: "radial-gradient(circle at 20% 25%,#d8ac79 0 13%,transparent 14%),radial-gradient(circle at 80% 30%,#c89768 0 16%,#f6e0b8 17%)", align: "left", radius: 12, premium: true, event: "baby-shower" },
  {
    id: "orsetto-tra-le-nuvole",
    name: "Orsetto tra le nuvole",
    description: "Orsetto con fiocco bicolore, nuvole rosa e celesti e stelline",
    palette: "rosa-celeste",
    preview: "linear-gradient(145deg,#f8dce9,#fffaf7 50%,#d8edfa)",
    artwork: { src: "/templates/orsetto-tra-le-nuvole.webp", position: "bottom" },
    align: "center", radius: 30, premium: false, event: "baby-shower"
  },
  {
    id: "mongolfiera-rosa-celeste",
    name: "Mongolfiera rosa e celeste",
    description: "Mongolfiera ad acquerello con nastri e fiori rosa e celesti",
    palette: "rosa-celeste",
    preview: "linear-gradient(145deg,#d8edfa,#fffaf7 50%,#f8dce9)",
    artwork: { src: "/templates/mongolfiera-rosa-celeste.webp", position: "top" },
    align: "center", radius: 30, premium: false, event: "baby-shower"
  },
] as const;

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
  },
  ...additionalTemplates
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
  comunione: {
    title: "La mia Prima Comunione",
    intro: ["Con gioia ti invitiamo a condividere il giorno della Prima Comunione."],
    detailsTitle: "La celebrazione",
    rsvp: "Conferma la presenza",
    whatsapp: "Ciao, confermo la mia presenza alla Prima Comunione.",
    thanks: "Grazie per aver condiviso questa giornata con noi.",
    reminder: "Segna la data della Prima Comunione.",
    ctas: ["Conferma la presenza"],
    sections: ["Celebrazione", "Famiglia"],
    timeline: ["Celebrazione"]
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
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1600"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop stop-color="${bg}"/><stop offset=".58" stop-color="${accent}" stop-opacity=".72"/><stop offset="1" stop-color="${accent2}"/></linearGradient><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter></defs><rect width="1200" height="1600" fill="url(#g)"/><rect width="1200" height="1600" fill="#fff" opacity=".16" filter="url(#n)"/><circle cx="920" cy="280" r="190" fill="#fff" opacity=".22"/><circle cx="250" cy="1280" r="240" fill="#fff" opacity=".16"/><path d="M160 1040c180-260 360-330 545-210 122 79 226 82 335 8" fill="none" stroke="#fff" stroke-width="22" opacity=".35" stroke-linecap="round"/><text x="90" y="190" font-family="Georgia,serif" font-size="88" fill="#15151b" opacity=".82">${label.replace(/&/g, "&amp;")}</text><text x="92" y="270" font-family="Arial,sans-serif" font-size="28" letter-spacing="8" fill="#15151b" opacity=".52">PREMIUM EVENT VISUAL</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const planFeatures = {
  free: {
    label: "Demo",
    templates: templates.filter((item) => !item.premium).map((item) => item.id),
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

const eventRecommendations = {
  matrimonio: { template: "ulivo", writingStyle: "poetico", style: "elegante" },
  compleanno: { template: "festa-pop", writingStyle: "festoso", style: "cartoon" },
  battesimo: { template: "nuvola-celeste", writingStyle: "affettuoso", style: "botanico" },
  comunione: { template: "spighe", writingStyle: "solenne", style: "elegante" },
  "baby-shower": { template: "arcobaleno", writingStyle: "confidenziale", style: "cartoon" },
  laurea: { template: "lumiere", writingStyle: "festoso", style: "elegante" },
  anniversario: { template: "ulivo", writingStyle: "narrativo", style: "romantico" },
  business: { template: "executive", demoTemplate: "lumiere", writingStyle: "formale", style: "business" }
} satisfies Record<EventType, {
  template: TemplateId;
  demoTemplate?: TemplateId;
  writingStyle: import("./writing-styles").WritingStyle;
  style: string;
}>;

export function getEventRecommendation(eventType: EventType, plan: ProductPlan) {
  const recommendation = eventRecommendations[eventType];
  const templateId = plan === "free" && "demoTemplate" in recommendation
    ? recommendation.demoTemplate
    : recommendation.template;
  const model = templates.find((item) => item.id === templateId) ?? templates[0];
  return {
    ...recommendation,
    template: model.id,
    templateName: model.name,
    palette: model.palette,
    tone: styleRules[recommendation.style].tone
  };
}

export function getSmartSuggestion(eventType: EventType, style: string) {
  const copy = smartCopy[eventType];
  const rule = styleRules[style.toLowerCase()] ?? styleRules.elegante;
  const model = eventType === "comunione" ? additionalTemplates.find((item) => item.id === "spighe") : undefined;
  return {
    palette: model?.palette ?? rule.palette,
    template: model?.id ?? (eventType === "business" ? "executive" : rule.template),
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
