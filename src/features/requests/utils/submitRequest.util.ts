import { HONEYPOT_FIELD } from '../config/requests.constants';
import type { RequestResult } from '../types/Requests.type';

/** POST /api/solicitudes — never throws: network problems become a friendly message. */
export async function submitRequest(payload: Record<string, unknown>, honeypot: string): Promise<RequestResult> {
  try {
    const response = await fetch('/api/solicitudes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, [HONEYPOT_FIELD]: honeypot }),
    });
    return (await response.json()) as RequestResult;
  } catch {
    return { ok: false, message: 'No pudimos enviar tu solicitud. Revisa tu conexión e inténtalo de nuevo.' };
  }
}
