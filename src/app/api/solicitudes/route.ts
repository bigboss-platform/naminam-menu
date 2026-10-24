import { NextResponse, type NextRequest } from 'next/server';
import { HONEYPOT_FIELD } from '@/features/requests/config/requests.constants';
import type { OrderLineInput, RequestResult } from '@/features/requests/types/Requests.type';
import { processComplaint, processLoyalty, processOrder, processQuote } from '@/server/requests/processRequest';

/**
 * Every public form posts here: pedido (cart checkout), cotizacion, reclamo, fidelidad.
 * No database in the MVP: requests are emailed (when RESEND_API_KEY is set) and the
 * order/quote continues on WhatsApp.
 */
const MAX_BODY_CHARS = 20_000;

type Body = Record<string, unknown>;

function asRecord(value: unknown): Body {
  return typeof value === 'object' && value !== null && !Array.isArray(value) ? (value as Body) : {};
}

/** Reads a field as a trimmed string ('' for anything else) so validators never see other types. */
function textReader(record: Body) {
  return (key: string) => (typeof record[key] === 'string' ? (record[key] as string).trim() : '');
}

async function handle(body: Body): Promise<RequestResult | null> {
  const text = textReader(body);
  switch (body.type) {
    case 'pedido': {
      const field = textReader(asRecord(body.customer));
      return processOrder({
        type: 'pedido',
        lines: (Array.isArray(body.lines) ? body.lines : []) as OrderLineInput[],
        customer: {
          name: field('name'), whatsapp: field('whatsapp'), email: field('email'), district: field('district'),
          address: field('address'), deliveryDate: field('deliveryDate'), notes: field('notes'),
        },
      });
    }
    case 'cotizacion':
      return processQuote({ type: 'cotizacion', name: text('name'), whatsapp: text('whatsapp'), details: text('details') });
    case 'reclamo':
      return processComplaint({
        type: 'reclamo', fullName: text('fullName'), documentType: text('documentType'), documentNumber: text('documentNumber'),
        address: text('address'), phone: text('phone'), email: text('email'), parentName: text('parentName'),
        itemType: text('itemType'), amount: text('amount'), itemDescription: text('itemDescription'),
        claimType: text('claimType'), detail: text('detail'), request: text('request'), acceptsTerms: body.acceptsTerms === true,
      });
    case 'fidelidad':
      return processLoyalty({ type: 'fidelidad', name: text('name'), whatsapp: text('whatsapp'), orderCode: text('orderCode') });
    default:
      return null;
  }
}

export async function POST(request: NextRequest) {
  const raw = await request.text();
  if (raw.length > MAX_BODY_CHARS) return NextResponse.json({ ok: false, message: 'Solicitud demasiado grande.' }, { status: 413 });

  let body: Body;
  try {
    body = asRecord(JSON.parse(raw));
  } catch {
    return NextResponse.json({ ok: false, message: 'Solicitud inválida.' }, { status: 400 });
  }
  // Bots fill the hidden field: pretend success, do nothing.
  if (body[HONEYPOT_FIELD]) return NextResponse.json({ ok: true, code: 'OK', emailSent: false, whatsappMessage: '' });

  const result = await handle(body);
  if (!result) return NextResponse.json({ ok: false, message: 'Tipo de solicitud desconocido.' }, { status: 400 });
  return NextResponse.json(result, { status: result.ok ? 200 : 422 });
}
