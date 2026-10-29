"use server";

export interface QuotationLeadData {
  service: string;
  rooms?: string;
  sqm?: string;
  extras?: string[];
  date?: string;
  zip?: string;
  city?: string;
  floor?: string;
  hasLift?: boolean;
  fullName?: string;
  email?: string;
  phone?: string;
  notes?: string;
  estimatedPriceRange?: string;
}

export interface LeadSubmissionResult {
  success: boolean;
  referenceNumber?: string;
  message: string;
  priceRange?: string;
}

export async function submitQuotationLead(data: QuotationLeadData): Promise<LeadSubmissionResult> {
  // Validate that at least one contact channel (email or phone) is provided
  if (!data.email?.trim() && !data.phone?.trim()) {
    return {
      success: false,
      message: "Bitte geben Sie mindestens Ihre E-Mail-Adresse oder Telefonnummer an, um die Preisrichtung zu erhalten.",
    };
  }

  // Generate reference number
  const refNum = `AURA-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  // Log lead details in server logs
  console.log("=== NEUER LEAD / PREISRECHNER EINGEGANGEN ===");
  console.log("Referenz:", refNum);
  console.log("Name:", data.fullName || "Nicht angegeben");
  console.log("E-Mail:", data.email || "-");
  console.log("Telefon:", data.phone || "-");
  console.log("Service:", data.service);
  console.log("Objekt:", `${data.rooms || "-"} Zimmer`, data.sqm ? `(${data.sqm} m²)` : "");
  console.log("PLZ / Ort:", `${data.zip || "3000"} ${data.city || "Bern"}`);
  console.log("Termin:", data.date || "Flexibel");
  console.log("Extras:", data.extras?.join(", ") || "Keine");
  console.log("Berechnete Preisrichtung:", data.estimatedPriceRange || "Auf Anfrage");
  console.log("=============================================");

  return {
    success: true,
    referenceNumber: refNum,
    priceRange: data.estimatedPriceRange,
    message: `Ihre Preisrichtung wurde erfolgreich freigeschaltet! Wir haben Ihre Angaben unter der Referenz ${refNum} registriert.`,
  };
}
