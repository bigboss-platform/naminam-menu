/** Everything the public site sends to POST /api/solicitudes. */

export type FieldErrors = Record<string, string>;

export type OrderCustomer = {
  name: string;
  whatsapp: string;
  email: string;
  district: string;
  address: string;
  deliveryDate: string;
  notes: string;
};

export type OrderLineInput = { slug: string; variantId: string; quantity: number };

export type OrderRequest = { type: 'pedido'; customer: OrderCustomer; lines: OrderLineInput[] };

export type QuoteRequest = { type: 'cotizacion'; name: string; whatsapp: string; details: string };

export type ComplaintRequest = {
  type: 'reclamo';
  fullName: string;
  documentType: string;
  documentNumber: string;
  address: string;
  phone: string;
  email: string;
  parentName: string;
  itemType: string;
  amount: string;
  itemDescription: string;
  claimType: string;
  detail: string;
  request: string;
  acceptsTerms: boolean;
};

export type LoyaltyRequest = { type: 'fidelidad'; name: string; whatsapp: string; orderCode: string };

export type SiteRequest = OrderRequest | QuoteRequest | ComplaintRequest | LoyaltyRequest;

export type RequestResult =
  | {
      ok: true;
      code: string;
      emailSent: boolean;
      /** Order/quote: the text to open WhatsApp with (empty for the other forms). */
      whatsappMessage: string;
    }
  | { ok: false; message: string; errors?: FieldErrors };
