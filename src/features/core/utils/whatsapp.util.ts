import { BUSINESS } from '../config/business.config';

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** Every generic "Pedir por WhatsApp" button (top bar icon, floating button). */
export const GENERAL_WHATSAPP_MESSAGE = '¡Hola Ñami Ñam! Quiero hacer un pedido.';

/** Wheel selector's round WhatsApp button: "Quiero este: Cheesecake de Pistacho". */
export function buildWantThisWhatsAppUrl(productName: string): string {
  return buildWhatsAppUrl(`¡Hola Ñami Ñam! Quiero este: ${productName}.`);
}

/** Tapping a dessert card (menu or home): asks if that dessert is available. Quantity > 1 adds "N porciones de". */
export function buildProductWhatsAppUrl(productName: string, quantity = 1): string {
  const portions = quantity > 1 ? `${quantity} porciones de ` : '';
  return buildWhatsAppUrl(`¡Hola Ñami Ñam! Quiero hacer un pedido de ${portions}${productName}. ¿Está disponible?`);
}
