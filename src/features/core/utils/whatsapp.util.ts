import { PLACEHOLDER_INSTAGRAM, PLACEHOLDER_WHATSAPP } from '../config/business.config';

/**
 * Contact links. While the business has no real WhatsApp/Instagram/Facebook, the placeholder
 * values build an inert "#" link (see externalLinkProps) — nothing opens.
 */
export const INERT_LINK = '#';

export function isPlaceholderWhatsApp(whatsappNumber: string): boolean {
  return whatsappNumber === '' || whatsappNumber === PLACEHOLDER_WHATSAPP;
}

export function buildWhatsAppUrl(whatsappNumber: string, message: string): string {
  if (isPlaceholderWhatsApp(whatsappNumber)) return INERT_LINK;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** Every generic "Pedir por WhatsApp" button. */
export const GENERAL_WHATSAPP_MESSAGE = '¡Hola Santanita! Quiero hacer un pedido.';

export function buildInstagramUrl(handle: string): string {
  if (handle === '' || handle === PLACEHOLDER_INSTAGRAM) return INERT_LINK;
  return `https://www.instagram.com/${handle}/`;
}

export function buildFacebookUrl(url: string): string {
  return url === '' ? INERT_LINK : url;
}

/** Real link to the area on Google Maps (search, not a private address). */
export function buildMapsSearchUrl(latitude: number, longitude: number): string {
  return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
}

/**
 * Anchor props: new tab for real external links. Inert (placeholder) links get no href at
 * all, so clicking does nothing — works in server components too (no onClick needed).
 */
export function externalLinkProps(href: string) {
  if (href === INERT_LINK) {
    return { role: 'link', 'aria-disabled': true, title: 'Disponible pronto' } as const;
  }
  return { href, target: '_blank', rel: 'noopener noreferrer' } as const;
}

/** Peru: "51987654321" → "+51 987 654 321". */
export function formatPhone(digits: string): string {
  const match = /^(\d{2})(\d{3})(\d{3})(\d{3})$/.exec(digits);
  return match ? `+${match[1]} ${match[2]} ${match[3]} ${match[4]}` : `+${digits}`;
}

export function buildMapEmbedUrl(latitude: number, longitude: number): string {
  return `https://maps.google.com/maps?q=${latitude},${longitude}&z=14&hl=es&output=embed`;
}
