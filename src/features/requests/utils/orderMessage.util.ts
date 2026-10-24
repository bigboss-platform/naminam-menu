import { formatPrice } from '@/features/core/utils/format.util';
import type { OrderCustomer } from '../types/Requests.type';

/** A cart line with its final name/price (resolved from the menu on the server). */
export type ResolvedOrderLine = { name: string; variantLabel: string; quantity: number; unitPrice: number };

export function orderTotal(lines: ResolvedOrderLine[]): number {
  return lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0);
}

export function describeLine(line: ResolvedOrderLine): string {
  const variant = line.variantLabel ? ` (${line.variantLabel})` : '';
  return `${line.quantity} x ${line.name}${variant} — ${formatPrice(line.unitPrice * line.quantity)}`;
}

/** PRD step 5: the order, already structured, as the WhatsApp opening message. */
export function buildOrderWhatsAppMessage(code: string, customer: OrderCustomer, lines: ResolvedOrderLine[]): string {
  return [
    `¡Hola Santanita! 👋 Quiero hacer este pedido (${code}):`,
    '',
    ...lines.map((line) => `• ${describeLine(line)}`),
    '',
    `Total referencial: ${formatPrice(orderTotal(lines))}`,
    '',
    `Nombre: ${customer.name}`,
    `Entrega: ${customer.address}, ${customer.district}`,
    customer.deliveryDate ? `Fecha deseada: ${customer.deliveryDate}` : null,
    customer.notes ? `Notas: ${customer.notes}` : null,
    '',
    '¿Me confirmas disponibilidad, delivery y métodos de pago? 🙌',
  ]
    // null = optional line left out; '' = intentional blank line
    .filter((row) => row !== null)
    .join('\n');
}

export function buildQuoteWhatsAppMessage(code: string, name: string, details: string): string {
  return `¡Hola Santanita! Soy ${name}. Envié una solicitud de pedido personalizado (${code}):\n\n${details}`;
}
