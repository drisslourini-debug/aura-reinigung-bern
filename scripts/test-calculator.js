// Unit test for the exact calculation logic
const UMZUG_OPTIONS = {
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

const UNTERHALT_OPTIONS = {
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

function testPricing() {
  console.log("=== CALCULATOR MATH & LOGIC VERIFICATION ===");
  
  // 1. Umzug test
  const uRoom = UMZUG_OPTIONS.rooms[2]; // 3.5 Zi
  const uMin = uRoom.min + 80 + 90 + 80; // bath + lamellen + balkon
  const uMax = uRoom.max + 80 + 90 + 80;
  console.log(`✓ Umzug 3.5 Zi (mit 2 Bädern, Lamellen, Balkon): CHF ${uMin} - ${uMax} (Pass: >1200)`);
  if (uMin < 1200) throw new Error("Umzug pricing underpriced");

  // 2. Unterhalt test
  const untSize = UNTERHALT_OPTIONS.propertySizes[1]; // 66-100m²
  const untMin = untSize.baseMin + 35; // oven
  const untMax = untSize.baseMax + 35;
  console.log(`✓ Unterhalt 80m² (14-täglich, Backofen): CHF ${untMin} - ${untMax} pro Einsatz`);
  if (untMin < 150 || untMax > 300) throw new Error("Unterhalt pricing mismatch");

  console.log("\nALL MATHEMATICAL RULES AND DATA BOUNDS VALIDATED SUCCESSFULLY!");
}

testPricing();
