"use server";

export interface QuotationLeadData {
  service: string;
  rooms?: string;
  sqm?: string;
  extras?: string[];
  date?: string;
  zip: string;
  city: string;
  fullName: string;
  email: string;
  phone: string;
  notes?: string;
  estimatedPriceRange?: string;
}

export interface LeadSubmissionResult {
  success: boolean;
  referenceNumber?: string;
  message: string;
}

export async function submitQuotationLead(data: QuotationLeadData): Promise<LeadSubmissionResult> {
  // Basic validation
  if (!data.fullName || !data.email || !data.phone || !data.zip) {
    return {
      success: false,
      message: "Bitte füllen Sie alle erforderlichen Pflichtfelder (Name, Telefon, E-Mail, PLZ) aus.",
    };
  }

  // Generate reference number
  const refNum = `AURA-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  // Log in development / server console
  console.log("=== NEUER LEAD EINGEGANGEN ===");
  console.log("Referenz:", refNum);
  console.log("Kunde:", data.fullName, "| Tel:", data.phone, "| Mail:", data.email);
  console.log("Service:", data.service, "| Zimmer:", data.rooms, "| PLZ/Ort:", data.zip, data.city);
  console.log("Extras:", data.extras);
  console.log("Preis-Indikation:", data.estimatedPriceRange);
  console.log("Bemerkungen:", data.notes);
  console.log("===============================");

  // In production, dispatch to Resend / SMTP / Webhook if env variables are present
  // e.g., if (process.env.RESEND_API_KEY) { await resend.emails.send(...) }

  return {
    success: true,
    referenceNumber: refNum,
    message: `Vielen Dank für Ihre Anfrage! Wir haben Ihre Angaben unter der Referenz ${refNum} erfasst und kontaktieren Sie innerhalb von 2 Stunden.`,
  };
}
