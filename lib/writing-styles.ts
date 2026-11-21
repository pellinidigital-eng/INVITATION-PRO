export const writingStyles = {
  essenziale: { label: "Essenziale", title: "Sei invitato", opening: "Ci farebbe piacere averti con noi." },
  affettuoso: { label: "Affettuoso", title: "Ci piacerebbe averti vicino", opening: "Questo momento sarà ancora più bello se potremo condividerlo con te." },
  poetico: { label: "Poetico", title: "Un giorno da custodire", opening: "Ci sono giorni che diventano ricordi ancora prima di cominciare. Vorremmo viverne uno insieme a te." },
  formale: { label: "Formale", title: "Invito a partecipare", opening: "Abbiamo il piacere di invitarti e saremo lieti di accoglierti." },
  confidenziale: { label: "Confidenziale", title: "Ci vediamo presto?", opening: "Tieni libera la data. Ci farebbe davvero piacere vederti." },
  ironico: { label: "Ironico", title: "Un ottimo motivo per uscire di casa", opening: "Per una volta, puoi mettere in agenda qualcosa di meglio di una riunione." },
  festoso: { label: "Festoso", title: "È il momento di festeggiare!", opening: "Noi abbiamo segnato la data. Tu porta la voglia di fare festa!" },
  narrativo: { label: "Narrativo", title: "Il prossimo capitolo", opening: "Ogni storia ha un momento in cui vale la pena fermarsi e ritrovarsi. Per noi, quel momento comincia qui." },
  solenne: { label: "Solenne", title: "Una ricorrenza da celebrare", opening: "Desideriamo condividere con te il significato e la gioia di questa occasione." },
  sorpresa: { label: "Con un pizzico di mistero", title: "Segna questa data", opening: "Ti diamo le coordinate. Il resto te lo raccontiamo quando ci vediamo." }
};

export type WritingStyle = keyof typeof writingStyles;
