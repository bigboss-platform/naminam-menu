/**
 * Business data — Los Antojitos de Santanita (Lima, Perú · San Martín de Porres).
 * From the PRD: email, city, footer copy, free delivery rule. PLACEHOLDERS (no real accounts
 * yet): WhatsApp, Instagram, Facebook, hours, address. Placeholder links lead nowhere
 * (see utils/links.util.ts) — replace the values below when the accounts exist.
 */

export type OpeningHoursRow = {
  label: string;
  /** 24h "HH:MM". */
  opensAt: string;
  closesAt: string;
};

/** Fake contact values: any link built from them renders as an inert "#". */
export const PLACEHOLDER_WHATSAPP = '51900000000';
export const PLACEHOLDER_INSTAGRAM = 'antojitos.santanita';
export const PLACEHOLDER_FACEBOOK = '';

export const BUSINESS = {
  name: 'Los Antojitos de Santanita',
  shortName: 'Santanita',
  tagline: 'Antojitos venezolanos con giros peruanos',
  /** Digits only, international format, no "+" — used to build wa.me links. */
  whatsappNumber: PLACEHOLDER_WHATSAPP,
  phoneNumber: PLACEHOLDER_WHATSAPP,
  instagramHandle: PLACEHOLDER_INSTAGRAM,
  facebookUrl: PLACEHOLDER_FACEBOOK,
  email: 'antojitos.santanita@gmail.com',
  address: 'San Martín de Porres',
  city: 'Lima, Perú',
  /** Approximate center of SMP — no exact address is published (delivery only). */
  mapLatitude: -12.0089,
  mapLongitude: -77.0844,
  footerCopy: 'Postres y comidas artesanales venezolanas con giros peruanos, en Lima, Perú.',
  deliveryNote: 'Delivery gratis en SMP y zonas aledañas de lunes a viernes a partir de las 5 p. m.',
  /** Placeholder hours: owner works until ~8:30 p. m., production on weekends. */
  hours: [
    { label: 'Lunes a viernes', opensAt: '17:00', closesAt: '22:00' },
    { label: 'Sábado y domingo', opensAt: '10:00', closesAt: '20:00' },
  ] satisfies OpeningHoursRow[],
};

/** Peruvian legal data for the Libro de Reclamaciones. PLACEHOLDER until the company is registered. */
export const LEGAL = {
  businessName: 'Los Antojitos de Santanita (razón social en trámite)',
  ruc: '20000000000',
  fiscalAddress: 'San Martín de Porres, Lima, Perú',
  /** Legal deadline to answer a complaint (Código de Protección y Defensa del Consumidor). */
  responseDays: 15,
};
