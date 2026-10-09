import { revalidatePath } from 'next/cache';
import { timingSafeEqual } from 'node:crypto';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * On-demand refresh, called by the back office after every save so changes show up
 * immediately (otherwise pages refresh on their own every 60s). Protected by a shared
 * secret: REVALIDATE_SECRET here = LANDING_REVALIDATE_SECRET in the back office.
 */
function isAuthorized(request: NextRequest): boolean {
  const expected = process.env.REVALIDATE_SECRET ?? '';
  const received = request.headers.get('x-revalidate-secret') ?? '';
  if (expected.length < 16 || received.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(received), Buffer.from(expected));
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) return NextResponse.json({ ok: false }, { status: 401 });
  revalidatePath('/', 'layout');
  return NextResponse.json({ ok: true, revalidatedAt: new Date().toISOString() });
}
