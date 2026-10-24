import 'server-only';
import { LEGAL } from '@/features/core/config/business.config';
import { formatPrice } from '@/features/core/utils/format.util';
import type { ComplaintRequest, LoyaltyRequest, OrderRequest, QuoteRequest, RequestResult } from '@/features/requests/types/Requests.type';
import { buildOrderWhatsAppMessage, buildQuoteWhatsAppMessage, describeLine, orderTotal } from '@/features/requests/utils/orderMessage.util';
import { validateComplaint, validateLoyalty, validateOrderCustomer, validateQuote } from '@/features/requests/utils/requests.validation';
import { getOwnerEmail, sendEmail } from '../email';
import { getSiteData } from '../siteData';
import { createRequestCode } from './requestCode';
import { resolveOrderLines } from './resolveOrder';

/** One handler per form. Validation is repeated here — the browser is never trusted. */
const INVALID_MESSAGE = 'Revisa los campos marcados.';

export async function processOrder(body: OrderRequest): Promise<RequestResult> {
  const { settings, products } = await getSiteData();
  const errors = validateOrderCustomer(body.customer);
  if (Object.keys(errors).length > 0) return { ok: false, message: INVALID_MESSAGE, errors };
  const lines = resolveOrderLines(body.lines, products);
  if (!lines) return { ok: false, message: 'Tu carrito cambió (un producto se agotó o ya no existe). Revísalo y vuelve a intentar.' };

  const code = createRequestCode('PED');
  const { customer } = body;
  const summary = [
    ...lines.map(describeLine),
    `Total referencial: ${formatPrice(orderTotal(lines))}`,
    '',
    `Cliente: ${customer.name} · WhatsApp ${customer.whatsapp} · ${customer.email}`,
    `Entrega: ${customer.address}, ${customer.district}${customer.deliveryDate ? ` · ${customer.deliveryDate}` : ''}`,
    customer.notes ? `Notas: ${customer.notes}` : '',
  ].join('\n');

  const [emailSent] = await Promise.all([
    sendEmail({
      to: [customer.email],
      subject: `Recibimos tu pedido ${code} · ${settings.name}`,
      text: `¡Hola ${customer.name}! Recibimos tu pedido:\n\n${summary}\n\nEn breve te escribimos por WhatsApp para confirmar disponibilidad, delivery y métodos de pago (Yape, Plin o transferencia).\n\n${settings.name}`,
      replyTo: getOwnerEmail(settings.email),
    }),
    sendEmail({ to: [getOwnerEmail(settings.email)], subject: `Nuevo pedido ${code}`, text: summary, replyTo: customer.email }),
  ]);
  return { ok: true, code, emailSent, whatsappMessage: buildOrderWhatsAppMessage(code, customer, lines) };
}

export async function processQuote(body: QuoteRequest): Promise<RequestResult> {
  const { settings } = await getSiteData();
  const errors = validateQuote(body);
  if (Object.keys(errors).length > 0) return { ok: false, message: INVALID_MESSAGE, errors };
  const code = createRequestCode('COT');
  const emailSent = await sendEmail({
    to: [getOwnerEmail(settings.email)],
    subject: `Nueva cotización ${code} · ${body.name}`,
    text: `${body.name} · WhatsApp ${body.whatsapp}\n\n${body.details}`,
  });
  return { ok: true, code, emailSent, whatsappMessage: buildQuoteWhatsAppMessage(code, body.name, body.details) };
}

export async function processComplaint(body: ComplaintRequest): Promise<RequestResult> {
  const { settings } = await getSiteData();
  const errors = validateComplaint(body);
  if (Object.keys(errors).length > 0) return { ok: false, message: INVALID_MESSAGE, errors };
  const code = createRequestCode('LR');
  const text = [
    `Hoja de reclamación ${code} — ${LEGAL.businessName} · RUC ${LEGAL.ruc}`,
    `Fecha: ${new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' })}`,
    '',
    `1. Consumidor: ${body.fullName} · ${body.documentType} ${body.documentNumber}`,
    `   Domicilio: ${body.address} · Tel. ${body.phone} · ${body.email}`,
    body.parentName ? `   Padre/madre o apoderado: ${body.parentName}` : '',
    `2. Bien contratado: ${body.itemType} · Monto: ${body.amount ? `S/ ${body.amount}` : '—'}`,
    `   ${body.itemDescription}`,
    `3. ${body.claimType}: ${body.detail}`,
    `   Pedido del consumidor: ${body.request}`,
    '',
    `Plazo de respuesta: ${LEGAL.responseDays} días hábiles.`,
  ].join('\n');
  const [emailSent] = await Promise.all([
    sendEmail({ to: [body.email], subject: `Libro de Reclamaciones — constancia ${code}`, text }),
    sendEmail({ to: [getOwnerEmail(settings.email)], subject: `[Libro de Reclamaciones] ${code}`, text, replyTo: body.email }),
  ]);
  return { ok: true, code, emailSent, whatsappMessage: '' };
}

export async function processLoyalty(body: LoyaltyRequest): Promise<RequestResult> {
  const { settings } = await getSiteData();
  const errors = validateLoyalty(body);
  if (Object.keys(errors).length > 0) return { ok: false, message: INVALID_MESSAGE, errors };
  const code = createRequestCode('ANT');
  const emailSent = await sendEmail({
    to: [getOwnerEmail(settings.email)],
    subject: `Tarjeta de Antojos: +1 punto para ${body.name}`,
    text: `${body.name} · WhatsApp ${body.whatsapp}\nCódigo de pedido: ${body.orderCode || '—'}\nRegistro: ${code}`,
  });
  return { ok: true, code, emailSent, whatsappMessage: '' };
}
