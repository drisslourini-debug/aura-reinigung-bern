import {
  Sparkles,
  Home,
  Building2,
  Sun,
  Briefcase,
  Hammer,
  type LucideIcon,
} from "lucide-react";

export type ServiceType =
  | "umzug"
  | "unterhalt"
  | "hauswartung"
  | "fenster"
  | "gewerbe"
  | "baureinigung";

export interface ServiceDefinition {
  id: ServiceType;
  title: string;
  shortTitle: string;
  subtitle: string;
  badge: string;
  icon: LucideIcon;
  guaranteeText: string;
  unit: string; // e.g. "Pauschal", "pro Einsatz", "pro Monat"
}

export const CALCULATOR_SERVICES: ServiceDefinition[] = [
  {
    id: "umzug",
    title: "Umzugsreinigung",
    shortTitle: "Umzug",
    subtitle: "Mit 100% Abnahmegarantie & Übergabebegleitung",
    badge: "Flaggschiff",
    icon: Sparkles,
    guaranteeText: "100% Abnahmegarantie inkl. physischer Übergabebegleitung",
    unit: "Fixpreis pauschal",
  },
  {
    id: "unterhalt",
    title: "Unterhaltsreinigung",
    shortTitle: "Unterhalt",
    subtitle: "Wohnung & Haus – regelmässig oder flexibel",
    badge: "Privat",
    icon: Home,
    guaranteeText: "GAV-angestellt, versichert & feste Bezugsperson",
    unit: "pro Einsatz",
  },
  {
    id: "hauswartung",
    title: "Hauswartung & Treppenhaus",
    shortTitle: "Hauswartung",
    subtitle: "Liegenschaftsservice für Verwaltungen & MFH",
    badge: "B2B / MFH",
    icon: Building2,
    guaranteeText: "Zuverlässiger Turnus inkl. Pikett & Stellvertretung",
    unit: "Monatspauschale",
  },
  {
    id: "fenster",
    title: "Fenster- & Storenreinigung",
    shortTitle: "Fenster & Glas",
    subtitle: "Streifenfreies Reinwasser inkl. Lamellen & Rahmen",
    badge: "Spezial",
    icon: Sun,
    guaranteeText: "Porentiefe Entkalkung & streifenfreie Osmose",
    unit: "Fixpreis pauschal",
  },
  {
    id: "gewerbe",
    title: "Büro- & Praxisreinigung",
    shortTitle: "Büro & Praxis",
    subtitle: "Repräsentative Sauberkeit & Diskretion in Bern",
    badge: "Gewerbe",
    icon: Briefcase,
    guaranteeText: "Geprüfte Vertrauenskräfte, haftpflichtversichert bis CHF 5 Mio.",
    unit: "Monatspauschale",
  },
  {
    id: "baureinigung",
    title: "Baureinigung & Sanierung",
    shortTitle: "Baureinigung",
    subtitle: "Baufeinreinigung nach Neubau oder Renovation",
    badge: "Bau & Renovation",
    icon: Hammer,
    guaranteeText: "Bezugsfertige Übergabe an Bauleitung oder Eigentümer",
    unit: "Fixpreis pauschal",
  },
];

// Configuration for UMZUG
export const UMZUG_OPTIONS = {
  rooms: [
    { id: "1.5", label: "1.0 – 1.5 Zi.", sqm: "30–45 m²", min: 590, max: 790, hoursMin: 6, hoursMax: 9 },
    { id: "2.5", label: "2.0 – 2.5 Zi.", sqm: "50–70 m²", min: 790, max: 1050, hoursMin: 9, hoursMax: 14 },
    { id: "3.5", label: "3.0 – 3.5 Zi.", sqm: "75–95 m²", min: 1050, max: 1380, hoursMin: 13, hoursMax: 18 },
    { id: "4.5", label: "4.0 – 4.5 Zi.", sqm: "100–125 m²", min: 1350, max: 1750, hoursMin: 17, hoursMax: 24 },
    { id: "5.5", label: "5.5+ Zi. / Haus", sqm: "ab 130 m²", min: 1750, max: 2450, hoursMin: 22, hoursMax: 34 },
  ],
  bathrooms: [
    { id: "1", label: "1 Bad / WC", surcharge: 0 },
    { id: "2", label: "2 Nasszellen (z. B. Bad + sep. WC/Dusche)", surcharge: 80 },
    { id: "3", label: "3+ Nasszellen", surcharge: 150 },
  ],
  extras: [
    { id: "lamellen", name: "Lamellenstoren intensiv waschen & entstauben", surcharge: 90 },
    { id: "balkon", name: "Balkon / Terrasse (Boden nass reinigen)", surcharge: 80 },
    { id: "keller", name: "Keller- / Estrichabteil besenrein", surcharge: 60 },
    { id: "garage", name: "Einstellplatz / Garage reinigen", surcharge: 60 },
    { id: "steamer", name: "Steamer / Backofen Tiefenentfettung & Filter", surcharge: 50 },
    { id: "cheminee", name: "Cheminée / Kaminofen aussaugen & reinigen", surcharge: 90 },
  ],
};

// Configuration for UNTERHALT (Privat)
export const UNTERHALT_OPTIONS = {
  propertySizes: [
    { id: "small", label: "Kleine Wohnung (bis 65 m²)", baseMin: 130, baseMax: 165, hours: "ca. 2.5 – 3 Std." },
    { id: "medium", label: "Mittlere Wohnung (66 – 100 m²)", baseMin: 165, baseMax: 220, hours: "ca. 3.5 – 4.5 Std." },
    { id: "large", label: "Grosse Wohnung (101 – 150 m²)", baseMin: 220, baseMax: 290, hours: "ca. 4.5 – 6 Std." },
    { id: "house", label: "Einfamilienhaus (151 – 220 m²)", baseMin: 290, baseMax: 390, hours: "ca. 6 – 8 Std." },
    { id: "villa", label: "Grosses Anwesen (ab 220 m²)", baseMin: 390, baseMax: 550, hours: "ab 8 Std." },
  ],
  frequencies: [
    { id: "weekly", label: "Wöchentlich", discount: -15, desc: "10% Stammkunden-Rabatt" },
    { id: "biweekly", label: "Alle 14 Tage", discount: 0, desc: "Beliebteste Wahl" },
    { id: "monthly", label: "Einmal im Monat", discount: 20, desc: "Gründlicher Monatsputz" },
    { id: "once", label: "Einmalige Intensivreinigung", discount: 50, desc: "Frühlingsputz / Einzeltermin" },
  ],
  extras: [
    { id: "ironing", name: "Bügel- & Wäscheservice (Hemden/Blusen)", surcharge: 40 },
    { id: "oven", name: "Backofen- & Kühlschrank-Innenreinigung", surcharge: 35 },
    { id: "windows_inside", name: "Fenster innen abwischen", surcharge: 50 },
    { id: "pets", name: "Haustiere im Haushalt (Tierhaar-Spezialfilter)", surcharge: 20 },
  ],
};

// Configuration for HAUSWARTUNG (Liegenschaften / B2B)
export const HAUSWARTUNG_OPTIONS = {
  units: [
    { id: "units_small", label: "Kleines MFH (3 – 5 Wohnungen)", baseMin: 380, baseMax: 520 },
    { id: "units_medium", label: "Mittleres MFH (6 – 10 Wohnungen)", baseMin: 520, baseMax: 780 },
    { id: "units_large", label: "Grosses MFH (11 – 20 Wohnungen)", baseMin: 780, baseMax: 1250 },
    { id: "units_complex", label: "Überbauung / Komplex (ab 21 Wohnungen)", baseMin: 1250, baseMax: 1950 },
  ],
  turns: [
    { id: "weekly", label: "Wöchentlicher Durchgang", multiplier: 1.0 },
    { id: "biweekly", label: "14-täglicher Turnus", multiplier: 0.75 },
  ],
  modules: [
    { id: "stairs", name: "Treppenhaus, Eingang & Podeste feucht wischen", surcharge: 0, included: true },
    { id: "laundry", name: "Waschküchen & Trocknungsräume (Flusensiebe reinigen)", surcharge: 60 },
    { id: "trash", name: "Container- & Kehrichtdienst (Bereitstellung an Abfuhrtagen)", surcharge: 90 },
    { id: "garden", name: "Umgebungsarbeiten (Vorplatz wischen, Laub, Unkraut)", surcharge: 110 },
    { id: "winter", name: "Winterdienst (Schneeräumung & Salzen der Gehwege)", surcharge: 120 },
    { id: "technical", name: "Liegenschaftskontrolle & Leuchtmittelaustausch", surcharge: 50 },
  ],
};

// Configuration for FENSTER & STOREN
export const FENSTER_OPTIONS = {
  panes: [
    { id: "10", label: "Bis 10 Fensterflügel (1 – 2.5 Zi.)", baseMin: 260, baseMax: 360 },
    { id: "20", label: "11 – 20 Fensterflügel (3 – 4.5 Zi.)", baseMin: 360, baseMax: 540 },
    { id: "35", label: "21 – 35 Fensterflügel (Grosswohnung / EFH)", baseMin: 540, baseMax: 790 },
    { id: "50", label: "36 – 50+ Fensterflügel (Grosses EFH / Villa)", baseMin: 790, baseMax: 1250 },
  ],
  blinds: [
    { id: "none", label: "Nur Glas & Rahmen (ohne Storen)", surcharge: 0 },
    { id: "lamella", label: "Inklusive Lamellenstoren beidseitig waschen", surcharge: 110 },
    { id: "roller", label: "Inklusive Rollläden / Fensterläden nass reinigen", surcharge: 90 },
  ],
  extras: [
    { id: "wintergarten", name: "Wintergarten / Glasdach / Balkonverglasung", surcharge: 130 },
    { id: "height", name: "Höhere Stockwerke / schwer zugängliche Fenster", surcharge: 70 },
    { id: "calcite", name: "Starke Kalkflecken-Tiefenentfernung", surcharge: 60 },
  ],
};

// Configuration for GEWERBE & BÜRO
export const GEWERBE_OPTIONS = {
  sizes: [
    { id: "small", label: "Praxis / Büro bis 100 m² (1 – 5 Arbeitsplätze)", baseMin: 360, baseMax: 520 },
    { id: "medium", label: "Kanzlei / Agentur 101 – 250 m² (6 – 15 Arbeitsplätze)", baseMin: 580, baseMax: 890 },
    { id: "large", label: "Büroetage 251 – 500 m² (16 – 35 Arbeitsplätze)", baseMin: 890, baseMax: 1450 },
    { id: "xlarge", label: "Grosses Gewerbeobjekt ab 501 m²", baseMin: 1450, baseMax: 2450 },
  ],
  frequencies: [
    { id: "1x", label: "1x pro Woche", multiplier: 1.0 },
    { id: "2x", label: "2x – 3x pro Woche (Empfohlen)", multiplier: 1.8 },
    { id: "5x", label: "Täglich (Mo – Fr, 5x pro Woche)", multiplier: 2.8 },
    { id: "biweekly", label: "14-täglich", multiplier: 0.65 },
  ],
  modules: [
    { id: "sanitary", name: "Sanitär-Tiefendesinfektion nach Hygieneplan", surcharge: 60 },
    { id: "kitchen", name: "Teeküche, Kaffeemaschine & Spülmaschinenservice", surcharge: 50 },
    { id: "consumables", name: "Verbrauchsmaterial-Management (Seife, Papier)", surcharge: 40 },
    { id: "bins", name: "Berner Gewerbe-Kehricht & Kartonentsorgung", surcharge: 40 },
  ],
};

// Configuration for BAUREINIGUNG
export const BAUREINIGUNG_OPTIONS = {
  types: [
    { id: "fine", label: "Baufeinreinigung (bezugsfertige Endreinigung)", multiplier: 1.0, desc: "Einzugsfertig für Eigentümer & Mieter" },
    { id: "rough", label: "Baugrobreinigung (während Rohbau/Sanierung)", multiplier: 0.75, desc: "Entfernung von Bauschutt & Resten" },
    { id: "interim", label: "Bauzwischenreinigung vor Belagsarbeiten", multiplier: 0.85, desc: "Sauberer Untergrund für Bodenleger/Maler" },
  ],
  sizes: [
    { id: "small", label: "Wohnungsumbau bis 80 m²", baseMin: 690, baseMax: 980 },
    { id: "medium", label: "Neubau / Sanierung 81 – 150 m²", baseMin: 980, baseMax: 1580 },
    { id: "large", label: "Einfamilienhaus 151 – 250 m²", baseMin: 1580, baseMax: 2450 },
    { id: "xlarge", label: "Grosses Objekt ab 251 m²", baseMin: 2450, baseMax: 3900 },
  ],
  extras: [
    { id: "cement", name: "Zementschleier-Entfernung auf Platten / Feinsteinzeug", surcharge: 90 },
    { id: "parquet", name: "Parkett-Erstpflege & Einpflege", surcharge: 110 },
    { id: "stickers", name: "Schutzfolien- & Klebereste-Entfernung auf Fenstern", surcharge: 80 },
  ],
};

// Universal Price Calculation Function
export function calculateDynamicPrice(
  service: ServiceType,
  state: {
    // Umzug
    roomIndex?: number;
    bathrooms?: string;
    umzugExtras?: string[];

    // Unterhalt
    propertySize?: string;
    frequency?: string;
    unterhaltExtras?: string[];

    // Hauswartung
    unitsSize?: string;
    turn?: string;
    hauswartungModules?: string[];

    // Fenster
    paneCount?: string;
    blindType?: string;
    fensterExtras?: string[];

    // Gewerbe
    gewerbeSize?: string;
    gewerbeFreq?: string;
    gewerbeModules?: string[];

    // Baureinigung
    bauType?: string;
    bauSize?: string;
    bauExtras?: string[];
  }
) {
  let min = 0;
  let max = 0;
  let unit = "Pauschal";
  let hoursText = "";
  const details: string[] = [];

  switch (service) {
    case "umzug": {
      const idx = state.roomIndex ?? 2;
      const room = UMZUG_OPTIONS.rooms[idx] || UMZUG_OPTIONS.rooms[2];
      min = room.min;
      max = room.max;
      unit = "Fixpreis pauschal (inkl. Abnahmegarantie)";
      hoursText = `ca. ${room.hoursMin} – ${room.hoursMax} Stunden`;
      details.push(room.label + ` (${room.sqm})`);

      // Bathrooms
      const bath = UMZUG_OPTIONS.bathrooms.find((b) => b.id === state.bathrooms);
      if (bath && bath.surcharge > 0) {
        min += bath.surcharge;
        max += bath.surcharge;
        details.push(bath.label);
      }

      // Extras
      if (state.umzugExtras) {
        state.umzugExtras.forEach((extraId) => {
          const ex = UMZUG_OPTIONS.extras.find((e) => e.id === extraId);
          if (ex) {
            min += ex.surcharge;
            max += ex.surcharge;
            details.push(ex.name);
          }
        });
      }
      break;
    }

    case "unterhalt": {
      const pSize = UNTERHALT_OPTIONS.propertySizes.find((s) => s.id === state.propertySize) || UNTERHALT_OPTIONS.propertySizes[1];
      const freq = UNTERHALT_OPTIONS.frequencies.find((f) => f.id === state.frequency) || UNTERHALT_OPTIONS.frequencies[1];
      min = pSize.baseMin + (freq.discount || 0);
      max = pSize.baseMax + (freq.discount || 0);
      unit = `pro Reinigungseinsatz (${freq.label})`;
      hoursText = pSize.hours;
      details.push(pSize.label);
      details.push(`Turnus: ${freq.label}`);

      if (state.unterhaltExtras) {
        state.unterhaltExtras.forEach((eId) => {
          const ex = UNTERHALT_OPTIONS.extras.find((e) => e.id === eId);
          if (ex) {
            min += ex.surcharge;
            max += ex.surcharge;
            details.push(ex.name);
          }
        });
      }
      break;
    }

    case "hauswartung": {
      const u = HAUSWARTUNG_OPTIONS.units.find((item) => item.id === state.unitsSize) || HAUSWARTUNG_OPTIONS.units[1];
      const t = HAUSWARTUNG_OPTIONS.turns.find((item) => item.id === state.turn) || HAUSWARTUNG_OPTIONS.turns[0];
      const mult = t.multiplier;
      min = Math.round(u.baseMin * mult);
      max = Math.round(u.baseMax * mult);
      unit = `pro Monat (${t.label})`;
      hoursText = "Inkl. Pikettdienst & Stellvertretung";
      details.push(u.label);
      details.push(t.label);

      if (state.hauswartungModules) {
        state.hauswartungModules.forEach((mId) => {
          const m = HAUSWARTUNG_OPTIONS.modules.find((mod) => mod.id === mId);
          if (m && m.surcharge > 0) {
            min += m.surcharge;
            max += m.surcharge;
            details.push(m.name);
          }
        });
      }
      break;
    }

    case "fenster": {
      const p = FENSTER_OPTIONS.panes.find((item) => item.id === state.paneCount) || FENSTER_OPTIONS.panes[1];
      const b = FENSTER_OPTIONS.blinds.find((item) => item.id === state.blindType) || FENSTER_OPTIONS.blinds[1];
      min = p.baseMin + b.surcharge;
      max = p.baseMax + b.surcharge;
      unit = "Fixpreis pauschal (Reinwasser-Osmose)";
      hoursText = "ca. 3 – 6 Stunden";
      details.push(p.label);
      details.push(b.label);

      if (state.fensterExtras) {
        state.fensterExtras.forEach((eId) => {
          const ex = FENSTER_OPTIONS.extras.find((e) => e.id === eId);
          if (ex) {
            min += ex.surcharge;
            max += ex.surcharge;
            details.push(ex.name);
          }
        });
      }
      break;
    }

    case "gewerbe": {
      const s = GEWERBE_OPTIONS.sizes.find((item) => item.id === state.gewerbeSize) || GEWERBE_OPTIONS.sizes[1];
      const f = GEWERBE_OPTIONS.frequencies.find((item) => item.id === state.gewerbeFreq) || GEWERBE_OPTIONS.frequencies[1];
      min = Math.round(s.baseMin * f.multiplier);
      max = Math.round(s.baseMax * f.multiplier);
      unit = `Monatspauschale B2B (${f.label})`;
      hoursText = "Ausführung ausserhalb der Geschäftszeiten";
      details.push(s.label);
      details.push(`Frequenz: ${f.label}`);

      if (state.gewerbeModules) {
        state.gewerbeModules.forEach((mId) => {
          const m = GEWERBE_OPTIONS.modules.find((mod) => mod.id === mId);
          if (m && m.surcharge > 0) {
            min += m.surcharge;
            max += m.surcharge;
            details.push(m.name);
          }
        });
      }
      break;
    }

    case "baureinigung": {
      const t = BAUREINIGUNG_OPTIONS.types.find((item) => item.id === state.bauType) || BAUREINIGUNG_OPTIONS.types[0];
      const s = BAUREINIGUNG_OPTIONS.sizes.find((item) => item.id === state.bauSize) || BAUREINIGUNG_OPTIONS.sizes[1];
      min = Math.round(s.baseMin * t.multiplier);
      max = Math.round(s.baseMax * t.multiplier);
      unit = `Fixpreis pauschal (${t.label})`;
      hoursText = "Bezugsfertige Übergabe an Bauleitung";
      details.push(t.label);
      details.push(s.label);

      if (state.bauExtras) {
        state.bauExtras.forEach((eId) => {
          const ex = BAUREINIGUNG_OPTIONS.extras.find((e) => e.id === eId);
          if (ex) {
            min += ex.surcharge;
            max += ex.surcharge;
            details.push(ex.name);
          }
        });
      }
      break;
    }
  }

  return {
    minPrice: min,
    maxPrice: max,
    unitLabel: unit,
    hoursText,
    summaryDetails: details,
  };
}
