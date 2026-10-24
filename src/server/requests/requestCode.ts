import 'server-only';
import { randomInt } from 'node:crypto';

/** "PED-261024-4KX9" — prefix, date YYMMDD (Lima), 4 random chars. Human-friendly for WhatsApp. */
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export function createRequestCode(prefix: string): string {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Lima', year: '2-digit', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
  const pick = (type: string) => parts.find((part) => part.type === type)?.value ?? '00';
  const date = `${pick('year')}${pick('month')}${pick('day')}`;
  const suffix = Array.from({ length: 4 }, () => ALPHABET[randomInt(ALPHABET.length)]).join('');
  return `${prefix}-${date}-${suffix}`;
}
