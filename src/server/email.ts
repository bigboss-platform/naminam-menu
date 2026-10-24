import 'server-only';

/**
 * Transactional email through Resend's HTTP API (no SDK). OPTIONAL: without RESEND_API_KEY
 * nothing is sent and the forms still work (the order continues on WhatsApp).
 * Env: RESEND_API_KEY, EMAIL_FROM ("Santanita <pedidos@tudominio.com>"), OWNER_EMAIL.
 */
export type EmailMessage = { to: string[]; subject: string; text: string; replyTo?: string };

export function getOwnerEmail(fallback: string): string {
  return process.env.OWNER_EMAIL || fallback;
}

export async function sendEmail(message: EmailMessage): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.info(`[email] RESEND_API_KEY no configurada — no se envió: "${message.subject}"`);
    return false;
  }
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM || 'Santanita <onboarding@resend.dev>',
        to: message.to,
        subject: message.subject,
        text: message.text,
        reply_to: message.replyTo,
      }),
    });
    if (!response.ok) console.error('[email] Resend respondió', response.status, await response.text());
    return response.ok;
  } catch (error) {
    console.error('[email] Error enviando correo:', error);
    return false;
  }
}
