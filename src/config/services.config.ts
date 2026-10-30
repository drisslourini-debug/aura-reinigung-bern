export interface ServiceItem {
  slug: string;
  title: string;
  headline: string;
  category: "Privatkunden" | "Liegenschaften" | "Gewerbe";
  shortDescription: string;
  badge: string;
  icon: string;
  image: string;
  popular?: boolean;
  heroImageDesc: string;
  usps: string[];
  checklist: {
    category: string;
    items: string[];
  }[];
  guaranteeText: string;
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const SERVICES: ServiceItem[] = [
  {
    slug: "umzugsreinigung",
    title: "Umzugsreinigung mit 100% Abnahmegarantie",
    headline: "Ihre Wohnungsübergabe in Bern – Garantiert ohne Beanstandung und ohne Kautionsabzug.",
    category: "Privatkunden",
    badge: "100% Abnahmegarantie",
    icon: "Sparkles",
    image: "/images/service-umzug.jpg",
    popular: true,
    heroImageDesc: "Makellose moderne Schweizer Küche mit spiegelnden Oberflächen und glänzenden Chromstahlarmaturen",
    shortDescription: "Komplette Endreinigung inkl. Küche, Nasszellen, Fenster, Storen und persönlicher Anwesenheit bei der Wohnungsübergabe.",
    usps: [
      "Persönliche Begleitung bei der Übergabe an Verwaltung / Eigentümer",
      "Kostenlose Nachreinigung an Ort und Stelle, falls jemals nötig",
      "Verbindlicher Fixpreis inkl. aller Profi-Geräte und umweltschonender Mittel",
      "Haftpflichtdeckung bis CHF 5 Millionen für absolute Gelassenheit",
    ],
    checklist: [
      {
        category: "Küche & Einbaugeräte",
        items: [
          "Backofen & Backbleche chemiefrei entkrusten und auf Hochglanz polieren",
          "Dunstabzugshaube entfetten inkl. Filterreinigung / Filtertausch",
          "Geschirrspüler komplett entkalken, Siebe & Dichtungsgummis reinigen",
          "Kühlschrank & Gefrierfach abtauen, desinfizieren und reinigen",
          "Sämtliche Küchenschränke, Schubladen und Arbeitsplatten innen & aussen feucht reinigen",
        ],
      },
      {
        category: "Badezimmer & Sanitäranlagen",
        items: [
          "Säurefreie Tiefenentkalkung von Platten, Fugen und Duschwänden",
          "Armaturen, Duschköpfe und Schläuche porentief polieren",
          "WC-Anlagen inkl. Spülkasten und Abflüssen hygienisch desinfizieren",
          "Spiegelschränke streifenfrei reinigen, Lüftungsgitter absaugen & reinigen",
        ],
      },
      {
        category: "Fenster, Storen & Rahmen",
        items: [
          "Fenstergläser innen & aussen streifenfrei mit Reinwassertechnik reinigen",
          "Fensterrahmen, Fensterbänke und Falze gründlich säubern",
          "Lamellenstoren und Rollläden Lamelle für Lamelle fachgerecht abwaschen",
        ],
      },
      {
        category: "Wohnbereiche & Nebenräume",
        items: [
          "Türen, Türrahmen, Fussleisten und Heizkörper abwaschen",
          "Steckdosen, Lichtschalter und Einbauschränke säubern",
          "Böden (Parkett, Laminat, Platten) materialgerecht saugen und nebelfeucht wischen",
          "Kellerabteil, Estrich, Balkon/Terrasse und Briefkasten besenrein reinigen",
        ],
      },
    ],
    guaranteeText: "Wir verlassen die Wohnung erst, wenn die Verwaltung das Abnahmeprotokoll mängelfrei unterzeichnet hat. Sollte jemals ein Detail moniert werden, reinigen wir sofort vor Ort kostenlos nach.",
    faqs: [
      {
        question: "Was bedeutet die 100% Abnahmegarantie konkret?",
        answer: "Wir sind bei der offiziellen Wohnungsübergabe mit der Verwaltung physisch vor Ort anwesend. Sollte der Vermieter auch nur die kleinste Kleinigkeit bemängeln, beheben wir das direkt an Ort und Stelle kostenlos. Sie müssen sich um nichts kümmern.",
      },
      {
        question: "Muss ich Reinigungsmittel oder Geräte bereitstellen?",
        answer: "Nein. Wir bringen den gesamten professionellen Maschinen- und Reinigungsmittelpark (inkl. Industrie-Dampfsauger, Entkalker, Leitern und Mikrofaser-Systeme) selbst mit.",
      },
      {
        question: "Wie wird der Fixpreis ermittelt?",
        answer: "Anhand Ihrer Zimmerzahl, Wohnfläche und ausgewählten Extras berechnen wir einen transparenten Pauschalpreis. Es gibt keine versteckten Zuschläge für Anfahrt, Parkgebühren oder Reinigungsmittel.",
      },
      {
        question: "Wann sollte die Reinigung idealerweise stattfinden?",
        answer: "Am besten 1 bis 2 Tage vor dem offiziellen Übergabetermin, damit die Wohnung vor der Übergabe komplett trocken und bezugsfertig dasteht.",
      },
    ],
  },
  {
    slug: "unterhaltsreinigung",
    title: "Premium Unterhaltsreinigung für Wohnungen & Häuser",
    headline: "Mehr Freizeit, vollkommene Frische – Ihr Schweizer Zuhause in Meisterhänden.",
    category: "Privatkunden",
    badge: "Flexible Abos",
    icon: "Home",
    image: "/images/service-unterhalt.jpg",
    heroImageDesc: "Heller, moderner Wohnraum mit makellosem Holzboden und sonnendurchfluteter Atmosphäre",
    shortDescription: "Wöchentliche oder 14-tägliche Unterhaltspflege durch dieselbe feste, vertrauenswürdige Reinigungskraft.",
    usps: [
      "Feste, namentlich bekannte Reinigungskraft (kein ständiger Personalwechsel)",
      "Vollständig versichert, GAV-konform und sozialversichert angemeldet",
      "Flexible Einsatzintervalle – jederzeit pausierbar für Ferien",
      "Ökologische, haustier- und kindersichere Schweizer Reinigungsmittel",
    ],
    checklist: [
      {
        category: "Regelmässiger Pflegeumfang",
        items: [
          "Böden saugen und materialgerecht feucht wischen",
          "Oberflächen, Regale, Tische und Sideboards abstauben & pflegen",
          "Küche: Arbeitsflächen, Herd, Spüle und Fronten reinigen",
          "Badezimmer: Lavabo, WC, Dusche/Badewanne und Spiegel desinfizieren",
          "Mülleimer leeren, Mülltüten erneuern und fachgerecht trennen",
          "Auf Wunsch: Betten frisch beziehen, Wäsche zusammenlegen",
        ],
      },
    ],
    guaranteeText: "Sollten Sie einmal mit einem Detail nicht zu 100% glücklich sein, bessern wir innerhalb von 24 Stunden kostenlos nach.",
    faqs: [
      {
        question: "Muss ich während der Reinigung zu Hause sein?",
        answer: "Nein, Sie müssen nicht zwingend vor Ort sein. Viele Kunden übergeben uns einen Schlüssel. Wir arbeiten mit einem gesicherten, protokollierten Schlüsseltresor-System und garantieren höchste Diskretion.",
      },
      {
        question: "Gibt es lange Vertragslaufzeiten?",
        answer: "Nein, Sie können das Abonnement monatlich anpassen oder mit 14 Tagen Kündigungsfrist beenden. Auch Urlaubsunterbrüche sind jederzeit möglich.",
      },
    ],
  },
  {
    slug: "hauswartung-treppenhaus",
    title: "Liegenschaftsservice & Hauswartung Bern",
    headline: "Werterhalt und makelloser Eindruck für Mehrfamilienhäuser, Stockwerkeigentümer und Liegenschaften.",
    category: "Liegenschaften",
    badge: "Für Liegenschaften & STWEG",
    icon: "Building2",
    image: "/images/service-hauswartung.jpg",
    popular: true,
    heroImageDesc: "Architektonisch elegantes Treppenhaus in Bern mit gepflegtem Terrazzoboden und modernem Licht",
    shortDescription: "Treppenhausreinigung, Waschküchenhygiene, Umgebungsarbeiten, Containerdienst und technische Kontrollgänge.",
    usps: [
      "Feste Tourdaten und transparente Erledigungsprotokolle",
      "Rundum-Paket: Treppenhaus, Waschküche, Tiefgarage und Aussenbereich",
      "Leuchtmittel- und Haustechnikkontrolle mit sofortiger Mängelberichterstattung",
      "Zuverlässiger Winterdienst und Kehrichtbereitstellung nach Berner Abfuhrplan",
    ],
    checklist: [
      {
        category: "Gemeinschaftsbereiche & Treppenhaus",
        items: [
          "Eingangsbereich, Treppenläufe und Zwischenpodeste wischen und feucht wischen",
          "Handläufe, Liftkabinen (Spiegel, Taster, Böden) desinfizieren und polieren",
          "Briefkastenanlagen, Sonnerien und Hauseingangstüren reinigen",
          "Spinnweben an Decken und Leuchten entfernen",
        ],
      },
      {
        category: "Technik- & Nebenräume",
        items: [
          "Waschküchen und Trocknungsräume reinigen, Flusensiebe leeren",
          "Veloräume, Zähler- und Kellerräume fegen",
          "Einstellhallen und Tiefgaragen kehren",
        ],
      },
      {
        category: "Umgebung & Haustechnik",
        items: [
          "Wege, Vorplätze und Containerplätze wischen und laubfrei halten",
          "Container am Vorabend bereitstellen und nach Leerung retourschaffen",
          "Funktionskontrolle von Leuchtmitteln und Nottreppenhäusern",
        ],
      },
    ],
    guaranteeText: "Verlässliche Ausführung nach festem Turnus. Eigentümer und Auftraggeber erhalten auf Wunsch transparente Ausführungsberichte und direkte Schadensmeldungen.",
    faqs: [
      {
        question: "Für welche Liegenschaftsgrössen lohnt sich Ihr Service?",
        answer: "Von kleinen Mehrfamilienhäusern mit 3 bis 6 Parteien bis hin zu grösseren Überbauungen und Gewerbeliegenschaften im gesamten Kanton Bern.",
      },
      {
        question: "Übernehmen Sie auch die Pikettbereitschaft?",
        answer: "Ja, für Liegenschaften mit Hauswartungsvertrag bieten wir im Winter Schneeräumungs-Pikett sowie Ansprechpartner bei Havarien (z. B. Wasser/Heizungsausfall).",
      },
    ],
  },
  {
    slug: "fenster-storen",
    title: "Fenster- & Storenreinigung Bern",
    headline: "Kristallklarer Durchblick ohne Schlieren – auch für anspruchsvolle Glasarchitektur.",
    category: "Privatkunden",
    badge: "Reinwasser-Technik",
    icon: "Sun",
    image: "/images/service-fenster.jpg",
    heroImageDesc: "Bodentiefe Fensterfront mit strahlendem Blick auf die Berner Alpen",
    shortDescription: "Streifenfreie Reinigung von Fenstern, Rahmen, Wintergärten und Lamellenstoren für Privat & Gewerbe.",
    usps: [
      "Schlierenfreies Ergebnis dank demineralisiertem Osmose-Reinwasser",
      "Fachgerechte Entkalkung und Pflege von Aluminium- und Kunststoffrahmen",
      "Schonende Reinigung empfindlicher Raffstoren und Textilmarkisen",
      "Sicherheitsgeprüftes Arbeiten bis in grosse Höhen",
    ],
    checklist: [
      {
        category: "Fenster & Glasflächen",
        items: [
          "Innen- und Aussenseiten streifenfrei einwaschen und abziehen",
          "Fugendichtungen und Scharniere von Schmutzablagerungen befreien",
          "Fensterbänke innen und aussen gründlich säubern",
        ],
      },
      {
        category: "Storen & Sonnenschutz",
        items: [
          "Lamellenstoren beidseitig feucht abwischen und entfetten",
          "Führungsschienen absaugen und reinigen",
          "Rolladenkästen und Schürzen von Moos und Witterungsspuren befreien",
        ],
      },
    ],
    guaranteeText: "100% streifenfreie Durchsicht bei Gegenlicht garantiert.",
    faqs: [
      {
        question: "Reinigen Sie auch schwer erreichbare Wintergärten oder Dachfenster?",
        answer: "Ja, wir verfügen über modulare Teleskopstangensysteme mit Reinwasserzufuhr bis zu 15 Metern Höhe ohne teure Gerüstkosten.",
      },
    ],
  },
  {
    slug: "gewerbe-buero",
    title: "Büro- & Praxisreinigung Bern",
    headline: "Repräsentative Hygiene und Diskretion für anspruchsvolle Berner Unternehmen.",
    category: "Gewerbe",
    badge: "Zertifizierte Hygiene",
    icon: "Briefcase",
    image: "/images/service-gewerbe.jpg",
    heroImageDesc: "Moderner, minimalistischer Berner Büroraum mit designorientierten Arbeitsplätzen",
    shortDescription: "Regelmässige Unterhaltsreinigung von Kanzleien, Praxen, Agenturen und Gewerbeflächen ausserhalb der Bürozeiten.",
    usps: [
      "Ausführung früh morgens, abends oder am Wochenende (keine Störung des Betriebs)",
      "Höchste Diskretion und unterzeichnete Verschwiegenheitsvereinbarungen (NDA)",
      "Hygiene nach 4-Farben-Mikrofasersystem (strikte Trennung Sanitär / Office)",
      "Flexible Monatspauschalen mit transparenter Leistungsabrechnung",
    ],
    checklist: [
      {
        category: "Arbeitsplätze & Konferenzräume",
        items: [
          "Schreibtische, Monitore und Telefone hygienisch desinfizierend abwischen",
          "Konferenztische und Whiteboards reinigen",
          "Papierkörbe und Aktenvernichter leeren",
        ],
      },
      {
        category: "Teeküche & Sanitäranlagen",
        items: [
          "Kaffeemaschine, Spüle und Mikrowelle reinigen",
          "Geschirrspüler ein- und ausräumen",
          "WCs und Waschräume antibakteriell desinfizieren",
          "Auffüllen von Seife, Handtuchpapier und WC-Papier",
        ],
      },
    ],
    guaranteeText: "Absolute Zuverlässigkeit: Wir halten Ihre Arbeitsumgebung repräsentativ und hygienisch einwandfrei.",
    faqs: [
      {
        question: "Gibt es Probezeiten?",
        answer: "Ja, wir bieten für Neukunden im Gewerbebereich einen 30-tägigen unverbindlichen Probemonat an.",
      },
    ],
  },
  {
    slug: "baureinigung",
    title: "Baureinigung & Spezialreinigungen",
    headline: "Von der Baugrobreinigung bis zur bezugsfertigen Feinabnahme.",
    category: "Liegenschaften",
    badge: "Tiefenreinigung",
    icon: "Wrench",
    image: "/images/service-baureinigung.jpg",
    heroImageDesc: "Frisch renovierte Designer-Wohnung nach bezugsfertiger Baufeinreinigung",
    shortDescription: "Baugrobreinigung, Baufeinreinigung, Teppich-Sprühextraktion und Hochdruckreinigung von Aussenflächen.",
    usps: [
      "Entfernung von Zementschleier, Farb- und Lackspritzern sowie Bauschutt",
      "Bezugsfertige Übergabe für Bauherren, Architekten und Generalunternehmer",
      "Teppich- und Polstertiefenreinigung mit professioneller Sprühextraktion",
      "Hochdruckreinigung von Plattenwegen, Vorplätzen und Tiefgaragenböden",
    ],
    checklist: [
      {
        category: "Baufeinreinigung",
        items: [
          "Beseitigung von Feinstaub in allen Ritzen, Lüftungen und Deckenfugen",
          "Schonende Entfernung von Schutzfolien, Etiketten und Silikonresten",
          "Kristallklare Erstfeinreinigung aller Glas- und Spiegelflächen",
        ],
      },
    ],
    guaranteeText: "Pünktliche Fertigstellung zum festgelegten Übergabetermin an die Bauherrschaft.",
    faqs: [
      {
        question: "Wie kurzfristig können Baustellen gereinigt werden?",
        answer: "Bei Bauverzögerungen reagieren wir flexibel: In der Regel können wir binnen 48 Stunden mit einem eingespielten Team vor Ort sein.",
      },
    ],
  },
];
