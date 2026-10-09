/** WhatsApp deep links. The number comes from the back office ("Negocio" → Contacto). */
export function buildWhatsAppUrl(whatsappNumber: string, message: string): string {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** Every generic "Pedir por WhatsApp" button (top bar icon, floating button). */
export const GENERAL_WHATSAPP_MESSAGE = '¡Hola Ñami Ñam! Quiero hacer un pedido.';

/** Wheel selector's "Pedir" button: "Quiero este: Cheesecake de Pistacho". */
export function buildWantThisWhatsAppUrl(whatsappNumber: string, productName: string): string {
  return buildWhatsAppUrl(whatsappNumber, `¡Hola Ñami Ñam! Quiero este: ${productName}.`);
}

/** Menu card WhatsApp button: asks if that dessert is available. Quantity > 1 adds "N porciones de". */
export function buildProductWhatsAppUrl(whatsappNumber: string, productName: string, quantity = 1): string {
  const portions = quantity > 1 ? `${quantity} porciones de ` : '';
  return buildWhatsAppUrl(whatsappNumber, `¡Hola Ñami Ñam! Quiero hacer un pedido de ${portions}${productName}. ¿Está disponible?`);
}

export function buildInstagramUrl(handle: string): string {
  return `https://www.instagram.com/${handle}/`;
}

/** "584126722218" → "+58 412 672 2218" */
export function formatPhone(digits: string): string {
  const match = /^(\d{2})(\d{3})(\d{3})(\d{4})$/.exec(digits);
  return match ? `+${match[1]} ${match[2]} ${match[3]} ${match[4]}` : `+${digits}`;
}

export function buildMapEmbedUrl(latitude: number, longitude: number): string {
  return `https://maps.google.com/maps?q=${latitude},${longitude}&z=17&hl=es&output=embed`;
}
