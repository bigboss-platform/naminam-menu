/**
 * Business contact data — all confirmed by the client (2026-10-04):
 * WhatsApp/phone, Instagram, address, hours, Google Maps location.
 */

export type OpeningHoursRow = {
  label: string;
  /** 24h "HH:MM". */
  opensAt: string;
  closesAt: string;
};

export const BUSINESS = {
  name: 'Ñami Ñam',
  tagline: 'Dulcería · Pastelería',
  /** Digits only, international format, no "+" — used to build wa.me links. */
  whatsappNumber: '584126722218',
  whatsappDisplay: '+58 412 672 2218',
  /** Phone calls ("Llamar") — same line as WhatsApp. */
  phoneNumber: '+584126722218',
  instagramHandle: 'nami_pasteleria',
  address: 'Nueva Segovia, Carrera 3 entre calles 6 y 7',
  city: 'Barquisimeto',
  /** Only the days the client listed — no row is invented for Monday. */
  hours: [
    { label: 'Martes a viernes', opensAt: '10:00', closesAt: '20:00' },
    { label: 'Sábado y domingo', opensAt: '11:00', closesAt: '21:00' },
  ] satisfies OpeningHoursRow[],
};

export const INSTAGRAM_URL = `https://www.instagram.com/${BUSINESS.instagramHandle}/`;

/** `tel:` link — on a phone it opens the dialer with the number ready to call. */
export const PHONE_CALL_URL = `tel:${BUSINESS.phoneNumber}`;

/** Client's Google Maps pin, rendered inline in the footer (no API key needed). */
const MAP_COORDINATES = '10.0614949,-69.2922501';
export const MAP_EMBED_URL = `https://maps.google.com/maps?q=${MAP_COORDINATES}&z=17&hl=es&output=embed`;
