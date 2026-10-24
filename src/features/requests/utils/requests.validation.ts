import type { ComplaintRequest, FieldErrors, LoyaltyRequest, OrderCustomer, QuoteRequest } from '../types/Requests.type';

/**
 * Pure validators shared by the forms (instant feedback) and the API route (the real check).
 * Each returns field → Spanish message; empty object = valid.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** "987 654 321", "+51 987654321" → "51987654321"; null when it is not a Peruvian mobile. */
export function normalizePeruMobile(input: string): string | null {
  const digits = input.replace(/\D/g, '');
  const local = digits.length === 11 && digits.startsWith('51') ? digits.slice(2) : digits;
  return /^9\d{8}$/.test(local) ? `51${local}` : null;
}

function requireText(errors: FieldErrors, field: string, value: string, label: string, min = 2, max = 120) {
  const trimmed = value.trim();
  if (trimmed.length < min) errors[field] = trimmed ? `${label}: escribe al menos ${min} caracteres.` : `${label}: este campo es obligatorio.`;
  else if (trimmed.length > max) errors[field] = `${label}: máximo ${max} caracteres.`;
}

function requireMobile(errors: FieldErrors, field: string, value: string) {
  if (!normalizePeruMobile(value)) errors[field] = 'Escribe un celular peruano de 9 dígitos (ej. 987 654 321).';
}

function requireEmail(errors: FieldErrors, field: string, value: string) {
  if (!EMAIL_PATTERN.test(value.trim())) errors[field] = 'Escribe un correo válido (ej. nombre@gmail.com).';
}

export function validateOrderCustomer(customer: OrderCustomer): FieldErrors {
  const errors: FieldErrors = {};
  requireText(errors, 'name', customer.name, 'Nombre y apellido', 3, 80);
  requireMobile(errors, 'whatsapp', customer.whatsapp);
  requireEmail(errors, 'email', customer.email);
  requireText(errors, 'district', customer.district, 'Distrito', 2, 60);
  requireText(errors, 'address', customer.address, 'Dirección', 5, 160);
  if (customer.notes.length > 500) errors.notes = 'Notas: máximo 500 caracteres.';
  return errors;
}

export function validateQuote(quote: Omit<QuoteRequest, 'type'>): FieldErrors {
  const errors: FieldErrors = {};
  requireText(errors, 'name', quote.name, 'Nombre y apellido', 3, 80);
  requireMobile(errors, 'whatsapp', quote.whatsapp);
  requireText(errors, 'details', quote.details, 'Tu pedido', 10, 1000);
  return errors;
}

export function validateComplaint(claim: Omit<ComplaintRequest, 'type'>): FieldErrors {
  const errors: FieldErrors = {};
  requireText(errors, 'fullName', claim.fullName, 'Nombre completo', 3, 100);
  requireText(errors, 'documentType', claim.documentType, 'Tipo de documento', 2, 40);
  if (!/^[A-Za-z0-9]{8,12}$/.test(claim.documentNumber.trim())) errors.documentNumber = 'Número de documento: entre 8 y 12 letras o números.';
  requireText(errors, 'address', claim.address, 'Domicilio', 5, 160);
  requireMobile(errors, 'phone', claim.phone);
  requireEmail(errors, 'email', claim.email);
  requireText(errors, 'itemType', claim.itemType, 'Tipo de bien', 2, 20);
  if (claim.amount.trim() && !/^\d+(\.\d{1,2})?$/.test(claim.amount.trim())) errors.amount = 'Monto: solo números (ej. 25 o 25.50).';
  requireText(errors, 'itemDescription', claim.itemDescription, 'Descripción del producto', 3, 300);
  requireText(errors, 'claimType', claim.claimType, 'Tipo', 4, 20);
  requireText(errors, 'detail', claim.detail, 'Detalle', 10, 2000);
  requireText(errors, 'request', claim.request, 'Pedido', 5, 1000);
  if (!claim.acceptsTerms) errors.acceptsTerms = 'Confirma que los datos son correctos.';
  return errors;
}

export function validateLoyalty(loyalty: Omit<LoyaltyRequest, 'type'>): FieldErrors {
  const errors: FieldErrors = {};
  requireText(errors, 'name', loyalty.name, 'Nombre', 3, 80);
  requireMobile(errors, 'whatsapp', loyalty.whatsapp);
  if (loyalty.orderCode.length > 30) errors.orderCode = 'Código: máximo 30 caracteres.';
  return errors;
}
