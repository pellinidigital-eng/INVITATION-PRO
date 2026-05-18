import { EventType, Invitation, TemplateId } from "@/lib/invitation-data";

type EventCopyPack = {
  titles: string[];
  subtitles: string[];
  openings: string[];
  emotional: string[];
  detailsTitles: string[];
  rsvp: string[];
  whatsapp: string[];
  reminders: string[];
  thanks: string[];
  countdown: string[];
  sections: string[][];
  timelines: string[][];
};

const packs: Record<EventType, EventCopyPack> = {
  matrimonio: {
    titles: ["Il giorno che diventa memoria", "Una promessa in grande stile", "Una giornata da attraversare insieme", "L'inizio di una nuova casa", "Un si, una festa, le persone giuste", "Celebrare l'amore con misura", "Una storia pronta a brillare", "La bellezza del nostro si"],
    subtitles: ["Una celebrazione pensata come un piccolo rito contemporaneo.", "Dettagli eleganti, ritmo morbido e una serata da ricordare.", "Un invito per chi fa davvero parte della storia.", "Un giorno intimo, luminoso e costruito con cura."],
    openings: ["Abbiamo disegnato una giornata fatta di presenza, luce e piccoli gesti indimenticabili.", "Vi aspettiamo per condividere un momento che desideriamo vivere con calma, gioia e bellezza.", "Sara una celebrazione elegante, senza eccessi, con tutto cio che conta davvero.", "Ogni dettaglio e stato pensato per accogliervi in una festa autentica e raffinata."],
    emotional: ["La vostra presenza rendera il nostro inizio piu pieno.", "Portate con voi il desiderio di celebrare, il resto lo abbiamo preparato noi.", "Sara bello guardarci intorno e riconoscere i volti che amiamo.", "Una promessa e piu viva quando viene condivisa."],
    detailsTitles: ["Ritmo della giornata", "Il percorso del si", "Momenti essenziali", "La celebrazione"],
    rsvp: ["Conferma agli sposi", "Riserva il tuo posto", "Ci saro con gioia", "Partecipo al si"],
    whatsapp: ["Ciao, confermo con piacere la mia presenza al matrimonio.", "Ciao, ci saro al matrimonio. Non vedo l'ora di festeggiare con voi.", "Ciao, confermo la partecipazione al vostro giorno speciale."],
    reminders: ["Tieni libera questa data: ci piacerebbe viverla anche con te.", "Salva il giorno del nostro si e preparati a una serata speciale.", "Un promemoria elegante per una giornata che merita spazio nel calendario."],
    thanks: ["Grazie per essere parte del nostro inizio.", "Grazie per accompagnarci in un giorno cosi importante.", "La vostra presenza e il regalo piu bello."],
    countdown: ["Manca poco al si", "Il conto alla rovescia del cuore", "Verso la celebrazione"],
    sections: [["Cerimonia", "Ricevimento", "Dress code", "Party"], ["Arrivo ospiti", "Promessa", "Cena", "Musica"], ["Rito", "Brindisi", "Tavola", "Danza"]],
    timelines: [["Cerimonia", "Brindisi", "Cena", "Taglio torta", "Party"], ["Welcome", "Rito", "Aperitivo", "Cena", "Danza"], ["Arrivo", "Promessa", "Foto", "Tavola", "Musica"]]
  },
  compleanno: {
    titles: ["Una festa con carattere", "Il compleanno prende scena", "Una giornata tutta da accendere", "Invito a sorridere forte", "Una festa curata, senza pensieri", "Candeline, musica e persone belle", "Un compleanno da vivere bene", "La data giusta per festeggiare"],
    subtitles: ["Energia, dettagli curati e un ritmo pensato per stare bene.", "Un invito leggero ma non banale, pronto per una festa memorabile.", "Colori, musica e una piccola dose di sorpresa.", "Una festa semplice da vivere e bella da raccontare."],
    openings: ["Abbiamo preparato un momento allegro, ben organizzato e pieno di dettagli da scoprire.", "La festa avra il tono giusto: rilassata, viva e costruita per stare insieme.", "Sara un compleanno con personalita, non la solita serata improvvisata.", "Vieni con voglia di brindare: il resto e gia in movimento."],
    emotional: ["La festa funziona davvero solo con le persone giuste.", "Ogni compleanno merita una cornice bella.", "Porta il tuo sorriso migliore: qui avra spazio.", "Sara una di quelle date che restano facili da ricordare."],
    detailsTitles: ["Programma festa", "Momenti della serata", "Party flow", "Cosa succede"],
    rsvp: ["Dimmi che ci sarai", "Salvami un posto", "Conferma la festa", "Vengo a brindare"],
    whatsapp: ["Ciao, confermo la mia presenza alla festa.", "Ciao, ci saro al compleanno. Tienimi un posto.", "Ciao, confermo per il party."],
    reminders: ["Segna la data: qui si festeggia sul serio.", "Un promemoria per non perdere il momento piu bello.", "Preparati a una festa curata e piena di ritmo."],
    thanks: ["Grazie per rendere la festa piu bella.", "La tua presenza accende la serata.", "Felice di festeggiare con te."],
    countdown: ["Manca poco alla festa", "Countdown alle candeline", "Verso il party"],
    sections: [["Welcome", "Torta", "Regali", "Musica"], ["Aperitivo", "Candeline", "Foto", "Dance"], ["Ingresso", "Brindisi", "Cake moment", "After party"]],
    timelines: [["Accoglienza", "Aperitivo", "Candeline", "Foto", "Musica"], ["Welcome", "Brindisi", "Torta", "Playlist", "Saluti"], ["Arrivo", "Snack", "Cake", "Foto", "Party"]]
  },
  battesimo: {
    titles: ["Una luce da accogliere", "Un giorno di grazia semplice", "La dolcezza di un nuovo inizio", "Una celebrazione piena di tenerezza", "Un momento di famiglia", "Piccoli gesti, grande significato", "Un giorno delicato da ricordare", "Celebrare una nuova luce"],
    subtitles: ["Una giornata raccolta, luminosa e piena di affetto.", "Dettagli gentili per un momento dal significato profondo.", "Un invito pensato con delicatezza e misura.", "Famiglia, gratitudine e una cornice serena."],
    openings: ["Vi aspettiamo per condividere una celebrazione intima, dolce e piena di significato.", "Sara un momento raccolto, pensato per accogliere con affetto una nuova luce.", "Abbiamo immaginato una giornata serena, con la famiglia al centro.", "Una piccola grande occasione da vivere con delicatezza."],
    emotional: ["La vostra presenza dara calore a questo giorno prezioso.", "Ci sono inizi che meritano sguardi vicini.", "Sara bello condividere questo passaggio con chi ci vuole bene.", "Una celebrazione tenera, fatta di famiglia e gratitudine."],
    detailsTitles: ["La celebrazione", "Momenti del giorno", "Rito e famiglia", "Programma delicato"],
    rsvp: ["Conferma con affetto", "Partecipo alla celebrazione", "Rispondi alla famiglia", "Ci saro"],
    whatsapp: ["Ciao, confermo la mia presenza al battesimo.", "Ciao, ci saro con piacere alla celebrazione.", "Ciao, confermo la partecipazione al battesimo."],
    reminders: ["Salva una data piena di tenerezza.", "Un promemoria gentile per una giornata di famiglia.", "Tieni libero questo momento speciale."],
    thanks: ["Grazie per condividere questo giorno prezioso.", "Grazie per esserci con delicatezza.", "La vostra presenza ci riempie di gioia."],
    countdown: ["Verso la celebrazione", "Manca poco a un giorno tenero", "Countdown di famiglia"],
    sections: [["Cerimonia", "Pranzo", "Confetti", "Foto"], ["Rito", "Famiglia", "Tavola", "Bomboniere"], ["Chiesa", "Accoglienza", "Pranzo", "Saluti"]],
    timelines: [["Cerimonia", "Foto famiglia", "Pranzo", "Confetti", "Saluti"], ["Rito", "Accoglienza", "Tavola", "Dolci", "Ringraziamenti"], ["Arrivo", "Celebrazione", "Foto", "Pranzo", "Bomboniere"]]
  },
  "baby-shower": {
    titles: ["Un piccolo arrivo, tanta meraviglia", "La festa della dolce attesa", "Una sorpresa piena di tenerezza", "Piccole cose, grande gioia", "Un party per accogliere il futuro", "La dolce attesa prende forma", "Una festa morbida e luminosa", "Benvenuta attesa"],
    subtitles: ["Un momento tenero, curato e pieno di piccoli dettagli.", "Giochi leggeri, tavola dolce e un'atmosfera che abbraccia.", "Una festa morbida, luminosa e pensata per stare vicini.", "Colori delicati e una gioia che cresce."],
    openings: ["Stiamo preparando una festa dolce, leggera e piena di attesa felice.", "Sara un momento luminoso, con piccoli rituali e tutto il calore delle persone care.", "Abbiamo immaginato un baby shower curato, tenero e mai stucchevole.", "Una celebrazione piccola solo nel nome, grande nell'emozione."],
    emotional: ["Ogni sorriso aggiunge qualcosa a questa attesa.", "Ci piacerebbe circondarci delle persone piu care.", "Sara una festa tenera, ma con stile.", "La dolce attesa e piu bella quando viene condivisa."],
    detailsTitles: ["Baby celebration", "Momenti della festa", "Attesa in festa", "Piccolo programma"],
    rsvp: ["Partecipo con gioia", "Ci saro", "Conferma al baby shower", "Vengo a festeggiare"],
    whatsapp: ["Ciao, confermo la mia presenza al baby shower.", "Ciao, ci saro con gioia al baby shower.", "Ciao, confermo per la festa della dolce attesa."],
    reminders: ["La dolce attesa merita un posto nel calendario.", "Salva questa data tenera e luminosa.", "Un promemoria morbido per una festa speciale."],
    thanks: ["Grazie per circondarci di affetto.", "La tua presenza rende questa attesa piu bella.", "Grazie per condividere la nostra gioia."],
    countdown: ["Verso la dolce attesa", "Manca poco al baby shower", "Countdown pieno di tenerezza"],
    sections: [["Gift table", "Giochi", "Cake table", "Foto"], ["Welcome", "Momenti gioco", "Dolci", "Regali"], ["Arrivo", "Baby games", "Cake", "Ricordi"]],
    timelines: [["Welcome drink", "Gift table", "Momenti gioco", "Cake", "Foto"], ["Accoglienza", "Giochi", "Regali", "Dolci", "Saluti"], ["Welcome", "Baby quiz", "Tavola", "Cake", "Foto"]]
  },
  laurea: {
    titles: ["Un traguardo da brindare", "La fine di un percorso, l'inizio di tutto", "Missione compiuta", "Toga pronta, calici anche", "Una laurea da celebrare bene", "Il merito prende scena", "Una festa per un nuovo capitolo", "Brindisi al futuro"],
    subtitles: ["Un invito deciso, elegante e pieno di energia.", "Dopo il percorso, arriva il momento di festeggiare.", "Una celebrazione per chi ha visto da vicino l'impegno.", "Un traguardo importante merita una serata all'altezza."],
    openings: ["Dopo studio, costanza e qualche notte lunga, e arrivato il momento di brindare.", "Questo traguardo merita una festa curata, piena di persone importanti.", "Abbiamo preparato una serata con ritmo, orgoglio e voglia di futuro.", "Vieni a celebrare una tappa che apre un nuovo capitolo."],
    emotional: ["Ogni traguardo e piu bello quando viene condiviso.", "Il futuro inizia meglio con un brindisi.", "Grazie per aver fatto parte del percorso.", "Sara una festa con un po' di orgoglio e tanta leggerezza."],
    detailsTitles: ["Graduation party", "Programma laurea", "Brindisi e festa", "Momenti del traguardo"],
    rsvp: ["Conferma il brindisi", "Brindo con te", "Ci saro alla laurea", "Riserva il posto"],
    whatsapp: ["Ciao, confermo la mia presenza alla festa di laurea.", "Ciao, ci saro al brindisi di laurea.", "Ciao, confermo per la festa di laurea."],
    reminders: ["La toga e pronta, il brindisi pure.", "Salva la data del traguardo.", "Un promemoria per festeggiare un nuovo capitolo."],
    thanks: ["Grazie per essere parte di questo traguardo.", "Grazie per brindare al futuro con me.", "La tua presenza rende il traguardo piu grande."],
    countdown: ["Verso il brindisi", "Manca poco alla laurea", "Countdown al traguardo"],
    sections: [["Proclamazione", "Brindisi", "Cena", "Party"], ["Toga", "Foto", "Aperitivo", "Musica"], ["Ritrovo", "Toast", "Tavola", "Futuro"]],
    timelines: [["Ritrovo", "Proclamazione", "Brindisi", "Cena", "Party"], ["Welcome", "Foto", "Toast", "Cena", "Musica"], ["Arrivo", "Proclamazione", "Aperitivo", "Torta", "Party"]]
  },
  anniversario: {
    titles: ["Ancora noi, ancora insieme", "Un brindisi alla storia", "Celebrare cio che continua", "La bellezza di ritrovarsi", "Un anniversario con stile", "Un capitolo da illuminare", "Tempo, memoria e festa", "Una sera per noi"],
    subtitles: ["Una serata intima, raffinata e piena di memoria.", "Per celebrare una storia che continua a scegliere bellezza.", "Un invito raccolto, caldo e non convenzionale.", "Cena, brindisi e persone che hanno condiviso il percorso."],
    openings: ["Ci sono date che meritano una pausa bella e le persone giuste intorno.", "Abbiamo immaginato una serata elegante per celebrare cio che continua.", "Sara un anniversario raccolto, con memoria, tavola e piccoli dettagli.", "Vogliamo festeggiare una storia che ha ancora molto da dire."],
    emotional: ["Grazie per essere parte del nostro percorso.", "Ogni anno ha piu senso quando lo si puo raccontare.", "Sara bello fermarsi e brindare a cio che resta.", "La memoria diventa festa quando viene condivisa."],
    detailsTitles: ["Anniversary evening", "Momenti della serata", "Cena e ricordi", "Programma anniversario"],
    rsvp: ["Conferma la serata", "Festeggio con voi", "RSVP anniversario", "Ci saro al brindisi"],
    whatsapp: ["Ciao, confermo la mia presenza all'anniversario.", "Ciao, ci saro con piacere alla serata.", "Ciao, confermo per l'anniversario."],
    reminders: ["Una serata speciale sta arrivando.", "Salva questa data piena di memoria.", "Un promemoria per brindare a una storia che continua."],
    thanks: ["Grazie per celebrare con noi questo capitolo.", "Grazie per essere parte della nostra storia.", "La vostra presenza rende la serata piu preziosa."],
    countdown: ["Verso l'anniversario", "Manca poco al brindisi", "Countdown alla memoria"],
    sections: [["Cena", "Toast", "Ricordi", "Dessert"], ["Welcome", "Tavola", "Brindisi", "Musica"], ["Accoglienza", "Cena", "Memorie", "Saluti"]],
    timelines: [["Welcome", "Cena", "Toast", "Memories", "Dessert"], ["Arrivo", "Aperitivo", "Cena", "Brindisi", "Musica"], ["Welcome", "Tavola", "Racconti", "Dolce", "Saluti"]]
  },
  business: {
    titles: ["Un incontro ad alto valore", "Business event, curated edition", "Idee, persone, opportunita", "Una serata professionale con ritmo", "Networking senza rumore", "Agenda essenziale, impatto concreto", "Un evento pensato per connettere", "Il prossimo capitolo del network"],
    subtitles: ["Un'esperienza professionale curata, chiara e memorabile.", "Contenuti, relazioni e una cornice premium.", "Un invito business progettato per conversione e presenza.", "Agenda precisa, networking utile e atmosfera contemporanea."],
    openings: ["Abbiamo progettato un evento essenziale, curato e orientato alle connessioni di valore.", "Sara un incontro professionale con ritmo, contenuti selezionati e networking concreto.", "Un'esperienza business pensata per far incontrare persone, idee e opportunita.", "Ogni momento e stato pensato per essere utile, fluido e ben orchestrato."],
    emotional: ["Porta domande, visione e voglia di connessioni reali.", "Il valore nasce quando le persone giuste si trovano nello stesso luogo.", "Un buon evento lascia contatti, idee e direzione.", "La qualita della sala conta quanto il programma."],
    detailsTitles: ["Event agenda", "Programma business", "Agenda essenziale", "Flow dell'evento"],
    rsvp: ["Riserva il tuo posto", "Conferma accredito", "Partecipa all'evento", "Richiedi accesso"],
    whatsapp: ["Ciao, confermo la mia partecipazione all'evento business.", "Ciao, desidero confermare il mio accredito all'evento.", "Ciao, confermo la partecipazione all'incontro."],
    reminders: ["Aggiungi l'evento al calendario e preparati a un incontro ad alto valore.", "Salva la data: agenda, networking e contenuti selezionati.", "Un promemoria professionale per non perdere l'accesso."],
    thanks: ["Grazie per il tuo interesse, ti aspettiamo.", "Grazie per entrare nel network dell'evento.", "La tua partecipazione aggiunge valore alla sala."],
    countdown: ["Verso l'evento", "Manca poco al check-in", "Countdown al networking"],
    sections: [["Check-in", "Keynote", "Panel", "Networking"], ["Accredito", "Talk", "Q&A", "Cocktail"], ["Welcome desk", "Sessione", "Roundtable", "Follow-up"]],
    timelines: [["Check-in", "Keynote", "Networking", "Panel", "Cocktail"], ["Accredito", "Opening", "Talk", "Panel", "Networking"], ["Welcome", "Sessione", "Q&A", "Roundtable", "Cocktail"]]
  }
};

const styleModifiers: Record<string, string[]> = {
  elegante: ["con un tono misurato e luminoso", "tra dettagli puliti e atmosfera sofisticata", "senza rumore, con molta cura"],
  romantico: ["con una nota morbida e sentimentale", "tra gesti delicati e luce calda", "con un ritmo intimo e affettuoso"],
  botanico: ["con dettagli naturali e respiro leggero", "tra verde, luce e texture organiche", "con una sensazione fresca e accogliente"],
  cartoon: ["con energia giocosa ma curata", "tra colori morbidi e sorrisi facili", "con una leggerezza pensata bene"],
  cinematografico: ["con un'apertura scenografica", "tra luce bassa e ritmo da premiere", "con un effetto reveal piu teatrale"],
  business: ["con precisione editoriale", "con ritmo professionale e pulito", "con un taglio chiaro e orientato al valore"]
};

const templateLayouts: Record<TemplateId, { order: string[]; note: string }> = {
  lumiere: { order: ["hero", "details", "timeline", "qr"], note: "Apertura editoriale e dettagli da cerimonia." },
  botanica: { order: ["hero", "story", "timeline", "map"], note: "Respiro naturale, sezioni ariose e ritmo gentile." },
  cinema: { order: ["hero", "countdown", "details", "qr"], note: "Reveal scenografico, CTA forti e ritmo serale." },
  atelier: { order: ["hero", "story", "gallery", "rsvp"], note: "Carta, blush e microcopy affettuoso." },
  playful: { order: ["hero", "moments", "gallery", "rsvp"], note: "Energia colorata, sezioni compatte e sorridenti." },
  executive: { order: ["hero", "agenda", "qr", "map"], note: "Agenda chiara, QR operativo e leggibilita business." }
};

export function buildInviteCopy(invitation: Invitation) {
  const pack = packs[invitation.eventType] ?? packs.matrimonio;
  const seed = hash([
    invitation.eventType,
    invitation.template,
    invitation.palette,
    invitation.style,
    invitation.tone,
    invitation.names,
    invitation.place,
    invitation.date,
    String(invitation.images.length),
    invitation.music ? "music" : "silent",
    invitation.dressCode ? "dress" : "nodress",
    invitation.whatsapp ? "rsvp" : "norsvp",
    invitation.description.length > 180 ? "long" : "short"
  ].join("|"));
  const modifier = pick(styleModifiers[invitation.style.toLowerCase()] ?? styleModifiers.elegante, seed + 13);
  const mediaLine = invitation.images.length > 0
    ? "Le immagini caricate danno alla pagina un taglio piu personale e meno da template."
    : "La direzione visiva resta pulita, con spazio al testo e ai dettagli essenziali.";
  const musicLine = invitation.music ? "La musica accompagna l'apertura senza trasformarla in effetto gratuito." : "L'esperienza resta rapida e silenziosa, perfetta per aprirsi da smartphone.";
  const userHint = rewriteDescription(invitation.description, pack, seed);

  return {
    title: pick(pack.titles, seed),
    subtitle: `${pick(pack.subtitles, seed + 1)} ${modifier}.`,
    opening: `${pick(pack.openings, seed + 2)} ${userHint}`,
    emotional: pick(pack.emotional, seed + 3),
    detailsTitle: pick(pack.detailsTitles, seed + 4),
    rsvp: pick(pack.rsvp, seed + 5),
    whatsapp: pick(pack.whatsapp, seed + 6),
    reminder: pick(pack.reminders, seed + 7),
    thanks: pick(pack.thanks, seed + 8),
    countdown: pick(pack.countdown, seed + 9),
    sections: pick(pack.sections, seed + 10),
    timeline: pick(pack.timelines, seed + 11),
    mediaLine,
    musicLine,
    layout: templateLayouts[invitation.template] ?? templateLayouts.lumiere
  };
}

function rewriteDescription(description: string, pack: EventCopyPack, seed: number) {
  const clean = description.replace(/\s+/g, " ").trim();
  if (!clean) return pick(pack.emotional, seed + 20);
  const words = clean.split(" ").filter(Boolean);
  if (words.length < 9) return `${pick(pack.emotional, seed + 21)} Il dettaglio scelto dagli organizzatori resta protagonista senza appesantire l'invito.`;
  const fragment = words.slice(0, 14).join(" ");
  return `La nota degli organizzatori suggerisce ${fragment.toLowerCase()}..., trasformata qui in un racconto piu fluido e curato.`;
}

function pick<T>(items: T[], seed: number) {
  return items[Math.abs(seed) % items.length];
}

function hash(value: string) {
  let result = 0;
  for (let index = 0; index < value.length; index += 1) {
    result = (result * 31 + value.charCodeAt(index)) | 0;
  }
  return result;
}
