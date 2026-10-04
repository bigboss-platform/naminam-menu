import { BUSINESS } from '../config/business.config';

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** Every generic "Pedir por WhatsApp" button (top bar icon, floating button). */
export const GENERAL_WHATSAPP_MESSAGE = '¡Hola Ñami Ñam! Quiero hacer un pedido.';

/** Tapping a dessert card (menu or home): asks if that dessert is available. */
export function buildProductWhatsAppUrl(productName: string): string {
  return buildWhatsAppUrl(`¡Hola Ñami Ñam! Quiero hacer un pedido de ${productName}. ¿Está disponible?`);
}
