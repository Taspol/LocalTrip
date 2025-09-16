import type { NextApiRequest, NextApiResponse } from 'next';
import dns from 'node:dns/promises';
import { performance } from 'node:perf_hooks';

// Server-side proxy with diagnostics to bypass CORS and inspect connectivity
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const targetParam = (req.query.url as string | undefined)?.trim();
  const defaultUrl = 'https://localtrip.taspolsd.dev/v1';
  let target = targetParam || defaultUrl;
  if (!/^https?:\/\//i.test(target)) target = 'https://' + target; // ensure scheme

  interface DnsAddress { address: string; family: number }
  interface AttemptResult { upstream: Response; body: unknown; durationMs: number }
  interface Diagnostics {
    targetOriginal: string | null;
    targetFinal: string;
    dns?: { durationMs: number; addresses: DnsAddress[] };
    dnsError?: string;
    schemeTried?: string;
    primaryError?: { message?: string; name?: string; stack?: string };
    fallbackUsed?: boolean;
    fallbackUrl?: string;
    fallbackError?: { message?: string; name?: string };
    fetchDurationMs?: number;
  }
  const diagnostics: Diagnostics = { targetOriginal: targetParam || null, targetFinal: target };

  try {
    const urlObj = new URL(target);
    try {
      const dnsStart = performance.now();
      const lookup = await dns.lookup(urlObj.hostname, { all: true });
      diagnostics.dns = { durationMs: +(performance.now() - dnsStart).toFixed(2), addresses: lookup as DnsAddress[] };
    } catch (e: unknown) {
      diagnostics.dnsError = e instanceof Error ? e.message : String(e);
    }

  const attemptFetch = async (u: string): Promise<AttemptResult> => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);
      const start = performance.now();
      try {
        const upstream = await fetch(u, { method: 'GET', signal: controller.signal });
        const durationMs = +(performance.now() - start).toFixed(2);
        clearTimeout(timeout);
        const contentType = upstream.headers.get('content-type') || '';
    let body: unknown;
        if (contentType.includes('application/json')) {
          body = await upstream.json();
        } else {
          body = await upstream.text();
        }
        return { upstream, body, durationMs };
      } catch (err) {
        clearTimeout(timeout);
        throw err;
      }
    };

    let result: AttemptResult | undefined;
    try {
      result = await attemptFetch(target);
      diagnostics.schemeTried = 'primary';
    } catch (primaryErr: unknown) {
      if (primaryErr && typeof primaryErr === 'object') {
        const err = primaryErr as { message?: string; name?: string; stack?: string };
        diagnostics.primaryError = { message: err.message, name: err.name, stack: err.stack?.split('\n').slice(0,3).join('\n') };
      }
      // If https failed and we haven't explicitly requested http, try http fallback
      if (target.startsWith('https://')) {
        const httpUrl = target.replace(/^https:\/\//i, 'http://');
        try {
          result = await attemptFetch(httpUrl);
          diagnostics.fallbackUsed = true;
          diagnostics.fallbackUrl = httpUrl;
        } catch (fallbackErr: unknown) {
          if (fallbackErr && typeof fallbackErr === 'object') {
            const f = fallbackErr as { message?: string; name?: string };
            diagnostics.fallbackError = { message: f.message, name: f.name };
          }
          throw primaryErr as Error; // bubble original
        }
      } else {
        throw primaryErr;
      }
    }

    if (!result) throw new Error('Unknown fetch state');
    const { upstream, body, durationMs } = result;
    diagnostics.fetchDurationMs = durationMs;
    return res.status(upstream.status).json({ ok: upstream.ok, status: upstream.status, data: body, diagnostics });
  } catch (e: unknown) {
    const isAbort = (e as { name?: string })?.name === 'AbortError';
    const message = e instanceof Error ? e.message : String(e);
    return res.status(500).json({ error: 'Proxy request failed', detail: message, timeout: isAbort, diagnostics });
  }
}
