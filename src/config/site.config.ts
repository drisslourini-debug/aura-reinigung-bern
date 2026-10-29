export interface RoomEstimate {
  rooms: string;
  label: string;
  sqmRange: string;
  basePriceMin: number;
  basePriceMax: number;
  hoursMin: number;
  hoursMax: number;
}

export const SITE_CONFIG = {
  brand: {
    name: "AURA Clean Bern",
    shortName: "AURA Clean",
    legalName: "AURA Clean Bern GmbH i.G.",
    tagline: "Makellos sauber. Punktgenau abgenommen.",
    subTagline: "Der Schweizer Premium-Reinigungsservice für Wohnungen und Liegenschaften im Grossraum Bern.",
    founders: "Geschwisterbetrieb Bern",
  },
  contact: {
    phone: "+41 31 511 88 00",
    phoneDisplay: "031 511 88 00",
    email: "info@auraclean-bern.ch",
    whatsapp: "+41791234567",
    whatsappDisplay: "+41 79 123 45 67",
    address: {
      street: "Kramgasse / Bundesgasse",
      city: "Bern",
      zip: "3000",
      canton: "BE",
      country: "Schweiz",
    },
    hours: "Mo – Sa: 07:00 – 19:00 Uhr | Notfall-Service nach Absprache",
  },
  trust: {
    abnahmegarantie: "100% Abnahmegarantie mit persönlicher Begleitung",
    insurance: "Haftpflichtversichert bis CHF 5'000'000.-",
    workStandards: "Faire Löhne nach GAV & 100% angemeldetes Schweizer Personal",
    pricing: "Verbindliche Fixpreise ohne versteckte Nachforderungen",
  },
  regions: [
    "Bern Stadt (Matte, Kirchenfeld, Breitenrain, Länggasse, Bümpliz)",
    "Köniz & Wabern",
    "Muri bei Bern & Gümligen",
    "Ostermundigen & Bolligen",
    "Ittigen & Zollikofen",
    "Thun & Berner Oberland Vorland",
    "Burgdorf & Emmental Vorland",
    "Biel / Bienne & Seeland",
  ],
  pricingEstimates: {
    umzug: [
      {
        rooms: "1.5",
        label: "1.0 – 1.5 Zimmer",
        sqmRange: "ca. 30 – 45 m²",
        basePriceMin: 550,
        basePriceMax: 750,
        hoursMin: 6,
        hoursMax: 9,
      },
      {
        rooms: "2.5",
        label: "2.0 – 2.5 Zimmer",
        sqmRange: "ca. 50 – 70 m²",
        basePriceMin: 750,
        basePriceMax: 990,
        hoursMin: 9,
        hoursMax: 14,
      },
      {
        rooms: "3.5",
        label: "3.0 – 3.5 Zimmer",
        sqmRange: "ca. 75 – 95 m²",
        basePriceMin: 990,
        basePriceMax: 1290,
        hoursMin: 13,
        hoursMax: 18,
      },
      {
        rooms: "4.5",
        label: "4.0 – 4.5 Zimmer",
        sqmRange: "ca. 100 – 125 m²",
        basePriceMin: 1290,
        basePriceMax: 1650,
        hoursMin: 17,
        hoursMax: 24,
      },
      {
        rooms: "5.5+",
        label: "5.5+ Zimmer / Haus",
        sqmRange: "ab 130 m²",
        basePriceMin: 1650,
        basePriceMax: 2250,
        hoursMin: 22,
        hoursMax: 32,
      },
    ] as RoomEstimate[],
    extras: [
      { id: "lamellen", name: "Lamellenstoren intensiv", surcharge: 90 },
      { id: "balkon", name: "Balkon / Terrasse Grundreinigung", surcharge: 80 },
      { id: "keller", name: "Keller / Estrich besenrein & entstaubt", surcharge: 70 },
      { id: "garage", name: "Einstellplatz / Einzelgarage", surcharge: 60 },
      { id: "chemiene", name: "Cheminée / Kaminofen Reinigung", surcharge: 90 },
    ],
  },
};
