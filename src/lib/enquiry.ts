import { SHEET_URL, WHATSAPP_NUMBER } from '../config';

// Field names expected by the Google Apps Script (doPost reads e.parameter)
export type EnquiryFields = Partial<
  Record<'source' | 'name' | 'company' | 'phone' | 'email' | 'location' | 'service' | 'message' | 'website', string>
>;

export const isSheetConfigured = () => /^https:\/\//.test(SHEET_URL);

/**
 * Posts the enquiry to the Google Sheet. `no-cors` gives an opaque response, so success
 * can't be read back: the promise resolves once the request is sent and rejects only on
 * a network failure.
 */
export async function sendEnquiry(fields: EnquiryFields): Promise<void> {
  if (!isSheetConfigured()) throw new Error('Enquiry form is not connected yet (SHEET_URL missing in src/config.ts).');
  const body = new URLSearchParams();
  for (const [k, v] of Object.entries(fields)) body.append(k, (v ?? '').trim());
  await fetch(SHEET_URL, { method: 'POST', mode: 'no-cors', body, keepalive: true });
}

export function whatsappUrl(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`;
}

/** Accepts "98765 43210", "+91 98765 43210" or "098765..." and returns the 10-digit number, or null. */
export function normalizePhone(raw: string): string | null {
  let digits = raw.replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1);
  return /^\d{10}$/.test(digits) ? digits : null;
}
