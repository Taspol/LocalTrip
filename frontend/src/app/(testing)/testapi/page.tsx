"use client";
import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface GenerateTripPlanBody {
  start_place: string;
  destination_place: string;
  trip_price: number;
  trip_context: string;
  trip_duration_days: number;
  group_size: number;
  preferences: string[];
  top_k: number;
}

interface BasicChatBody {
  message: string;
}

type PresetBody = GenerateTripPlanBody | BasicChatBody | Record<string, never>;

interface Preset {
  id: string;
  name: string;
  method: string;
  url: string;
  body?: PresetBody;
}

const PRESETS: Preset[] = [
  {
    id: 'generateTripPlan',
    name: 'Generate Trip Plan',
    method: 'POST',
    url: 'http://localtrip.taspolsd.dev/v1/generateTripPlan',
    body: {
      start_place: 'Bangkok, Thailand',
      destination_place: 'Bangkok, Thailand',
      trip_price: 1000,
      trip_context: 'adventure',
      trip_duration_days: 4,
      group_size: 2,
      preferences: ['Historical Places'],
      top_k: 3
    }
  },
  {
    id: 'basicChat',
    name: 'Basic Chat',
    method: 'POST',
    url: 'http://localtrip.taspolsd.dev/v1/basicChat',
    body: {
      message: 'What should I pack for hiking Doi Luang Chiang Dao?'
    }
  }
];

export default function TestApiPage() {
  const [selectedPreset, setSelectedPreset] = useState<string>('generateTripPlan');
  const [method, setMethod] = useState('POST');
  const [url, setUrl] = useState(PRESETS[0].url);
  const [body, setBody] = useState(JSON.stringify(PRESETS[0].body, null, 2));
  const [loading, setLoading] = useState(false);
  interface ApiResult {
    ok?: boolean;
    status?: number;
    error?: string;
    [key: string]: unknown;
  }
  const [result, setResult] = useState<ApiResult | null>(null);
  const [error, setError] = useState<string>('');

  function handlePresetChange(id: string) {
    setSelectedPreset(id);
    const preset = PRESETS.find(p => p.id === id)!;
    setMethod(preset.method);
    setUrl(preset.url);
    setBody(preset.body ? JSON.stringify(preset.body, null, 2) : '');
    setResult(null);
    setError('');
  }

  async function runTest() {
    setError('');
    setResult(null);
    setLoading(true);
    try {
      let parsedBody: unknown = undefined;
      if (body && method !== 'GET') {
  try { parsedBody = JSON.parse(body); } catch { setError('Invalid JSON body'); setLoading(false); return; }
      }
      const res = await fetch('/api/v1/test-proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, method, body: parsedBody })
      });
      const data: ApiResult = await res.json();
      if (!res.ok) setError(data.error || 'Request failed');
      setResult(data);
    } catch (e: unknown) {
      if (e instanceof Error) setError(e.message); else setError(String(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--color-primary-25)] p-6">
      <Card className="w-full max-w-4xl p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold">API Test Utility</h1>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map(p => (
              <button
                key={p.id}
                onClick={() => handlePresetChange(p.id)}
                className={`px-3 py-1 rounded-md text-sm border transition ${p.id === selectedPreset ? 'bg-[var(--color-primary-500)] text-white border-[var(--color-primary-600)]' : 'bg-white hover:bg-[var(--color-primary-50)] border-[var(--color-border)]'}`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium">Request URL</label>
            <input
              className="w-full rounded-lg border px-3 py-2 text-sm"
              value={url}
              onChange={e => setUrl(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Method</label>
            <select
              className="w-full rounded-lg border px-3 py-2 text-sm bg-white"
              value={method}
              onChange={e => setMethod(e.target.value)}
            >
              {['GET','POST','PUT','DELETE','PATCH'].map(m => <option key={m}>{m}</option>)}
            </select>
          </div>
        </div>

        {method !== 'GET' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium">JSON Body</label>
              <button
                type="button"
                onClick={() => setBody(JSON.stringify(PRESETS.find(p=>p.id===selectedPreset)?.body || {}, null, 2))}
                className="text-xs underline"
              >Reset to Preset</button>
            </div>
            <textarea
              className="w-full rounded-lg border px-3 py-2 text-xs font-mono min-h-[160px]"
              value={body}
              onChange={e => setBody(e.target.value)}
            />
          </div>
        )}

        <div className="flex gap-3">
          <Button onClick={runTest} variant="primary" size="md" loading={loading} disabled={!url.trim()}>
            Send Request
          </Button>
          <Button
            variant="outline"
            size="md"
            onClick={() => { setResult(null); setError(''); }}
            disabled={loading}
          >
            Clear
          </Button>
        </div>

        {error && <div className="text-sm text-red-500">{error}</div>}
        {result && (
          <div className="space-y-2">
            <div className="text-sm font-medium">Response</div>
            <pre className="max-h-[420px] overflow-auto rounded-lg bg-black/80 text-green-200 p-4 text-xs whitespace-pre-wrap">
{JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </Card>
    </main>
  );
}
