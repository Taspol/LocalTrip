import type { NextApiRequest, NextApiResponse } from 'next';

interface ProxyRequestBody {
  url?: string;
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
}

// Generic proxy to bypass CORS for testing POST/GET endpoints with JSON bodies
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url, method = 'POST', body, headers } = (req.body || {}) as ProxyRequestBody;
  if (!url) return res.status(400).json({ error: 'Missing url' });

  try {
    const start = Date.now();
    const upstream = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', ...(headers || {}) },
      body: method.toUpperCase() === 'GET' ? undefined : (typeof body === 'string' ? body : JSON.stringify(body))
    });
    const durationMs = Date.now() - start;
    const ct = upstream.headers.get('content-type') || '';
    let data: unknown;
    try {
      data = ct.includes('application/json') ? await upstream.json() : await upstream.text();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      data = { parseError: msg };
    }
    res.status(upstream.status).json({ ok: upstream.ok, status: upstream.status, durationMs, data });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    res.status(500).json({ error: 'Proxy failure', detail: message });
  }
}
