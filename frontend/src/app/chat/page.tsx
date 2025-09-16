"use client";
import { useState, useRef, useEffect, FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { tripStore, type TripPlanData } from "@/lib/store/tripStore";

interface ChatMsg { role: "user" | "assistant"; content: string; ts: Date }

const SUGGESTIONS = [
  "Plan a 3-day backpacking trip near Chiang Mai",
  "What should I prepare for the rainy season?",
  "What shoes are suitable for rocky trails?",
  "Recommend beautiful waterfall routes in Thailand",
];

const TRIP_SUGGESTIONS = [
  "What should I pack for this trip?",
  "Tell me about the weather during my trip dates",
  "What are the best photography spots on my route?",
  "Are there any safety precautions I should know?",
];

export default function ChatbotPage() {
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [tripData, setTripData] = useState<TripPlanData | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    // Load the latest trip plan when the component mounts
    const latestTrip = tripStore.getLatestTripPlan();
    if (latestTrip) {
      setTripData(latestTrip);
    }
  }, []);

  const extract = (data: unknown): string => {
    if (!data) return "(empty)";
    if (typeof data === 'string') return data;
    if (typeof data === 'object') {
      // @ts-expect-error dynamic
      if (typeof data.message === 'string') return data.message;
      try { return JSON.stringify(data); } catch { return String(data); }
    }
    return String(data);
  };

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const content = text.trim();
    setMessages(m => [...m, { role: 'user', content, ts: new Date() }]);
    setInput("");
    setLoading(true);
    
    try {
      const controller = new AbortController();
      const t = setTimeout(() => controller.abort(), 30000);
      
      // Prepare message with trip context if available
      let messageContent = content;
      if (tripData) {
        const tripContext = tripStore.formatTripForChat(tripData);
        messageContent = `${tripContext}\n\nUser Question: ${content}`;
      }
      
      const r = await fetch('https://taspol-pan-sea.hf.space/v1/basicChat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageContent }),
        signal: controller.signal
      });
      clearTimeout(t);
      let reply: string;
      try { reply = extract(await r.json()); } catch { reply = await r.text(); }
      if (!r.ok) reply = `Error ${r.status}: ${reply}`;
      setMessages(m => [...m, { role: 'assistant', content: reply, ts: new Date() }]);
    } catch (e) {
      const msg = e instanceof Error ? (e.name === 'AbortError' ? 'Request timeout' : e.message) : String(e);
      setMessages(m => [...m, { role: 'assistant', content: `⚠️ ${msg}`, ts: new Date() }]);
    } finally { setLoading(false); }
  };

  const onSubmit = (e: FormEvent) => { e.preventDefault(); send(input); };

  // Minimal markdown (bold, lists, line breaks, code spans) without external deps
  const lightweightMarkdown = (raw: string): string => {
    let html = raw
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    // Bold **text**
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-green-600">$1</strong>');
    // Inline code `code`
    html = html.replace(/`([^`]+)`/g, '<code class="px-2 py-1 rounded bg-gray-100 text-green-700 font-mono text-sm">$1</code>');
    // Ordered lists: lines starting with 1.,2., etc.
    const lines = html.split(/\n+/);
    const processed: string[] = [];
    let olBuf: string[] = [];
    let ulBuf: string[] = [];
    const flushOl = () => { if (olBuf.length) { processed.push('<ol class="list-decimal pl-6 space-y-2 my-4">'+olBuf.join('')+'</ol>'); olBuf=[]; } };
    const flushUl = () => { if (ulBuf.length) { processed.push('<ul class="list-disc pl-6 space-y-2 my-4">'+ulBuf.join('')+'</ul>'); ulBuf=[]; } };
    for (const ln of lines) {
      if (/^\d+\.\s+/.test(ln)) { flushUl(); olBuf.push('<li class="marker:text-green-500 text-gray-700">'+ln.replace(/^\d+\.\s+/, '')+'</li>'); continue; }
      if (/^[-*+]\s+/.test(ln)) { flushOl(); ulBuf.push('<li class="marker:text-green-500 text-gray-700">'+ln.replace(/^[-*+]\s+/, '')+'</li>'); continue; }
      flushOl(); flushUl();
      if (ln.trim().length) processed.push('<p class="mb-4 text-gray-700 leading-relaxed">'+ln+'</p>');
    }
    flushOl(); flushUl();
    return processed.join('\n');
  };

  return (
    <main className="flex items-center justify-center min-h-[90vh] w-full p-6">
      <div className="w-full max-w-5xl h-[85vh] bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-md border border-white/20 shadow-2xl rounded-3xl flex flex-col overflow-hidden ring-1 ring-gray-100/50">
        {/* Trip Plan Header */}
        {tripData && (
          <div className="px-6 py-3 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="text-sm font-medium text-green-800">Trip Plan Active</p>
                  <p className="text-xs text-green-600">{tripData.trip_plan.title}</p>
                </div>
              </div>
              <button 
                onClick={() => setTripData(null)}
                className="text-green-600 hover:text-green-800 text-xs underline"
              >
                Chat without trip context
              </button>
            </div>
          </div>
        )}
        
        {/* Messages Container */}
        <div ref={listRef} className="flex-1 overflow-y-auto px-8 py-8 space-y-6 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent hover:scrollbar-thumb-gray-300">
          {messages.length === 0 && (
            <div className="mt-16 flex flex-col items-center text-center gap-8 animate-fade-in">
              <div className="space-y-4">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-3xl">🏔️</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Hello Explorer!</h2>
                <p className="text-gray-600 max-w-md leading-relaxed">I’m here to assist with backpacking, gear, routes, and advice. Let’s start the conversation!</p>
              </div>
              <div className="flex flex-wrap gap-3 justify-center max-w-2xl">
                {(tripData ? TRIP_SUGGESTIONS : SUGGESTIONS).map((s, idx) => (
                  <button 
                    key={s} 
                    onClick={() => send(s)} 
                    className="group rounded-full bg-gradient-to-r from-green-50 to-blue-50 hover:from-green-100 hover:to-blue-100 px-6 py-3 text-sm font-medium text-gray-700 border border-green-200/60 hover:border-green-300/80 transition-all duration-200 hover:shadow-md hover:scale-105 transform"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <span className="group-hover:text-green-700 transition-colors">{s}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m,i) => (
            <div key={i} className={`flex animate-slide-up ${m.role === 'user' ? 'justify-end' : 'justify-start'}`} style={{ animationDelay: `${i * 50}ms` }}>
              <div className={`group relative max-w-[82%] rounded-2xl px-6 py-5 shadow-lg transition-all duration-200 hover:shadow-xl ${
                m.role === 'user' 
                  ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white' 
                  : 'bg-white text-gray-800 border border-gray-100'
              }`}>
                {m.role === 'assistant' ? (
                  <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-li:leading-relaxed text-gray-800" dangerouslySetInnerHTML={{ __html: lightweightMarkdown(m.content) }} />
                ) : (
                  <span className="whitespace-pre-wrap leading-relaxed font-medium">{m.content}</span>
                )}
                <div className={`absolute -bottom-1 ${m.role === 'user' ? '-right-1' : '-left-1'} w-3 h-3 ${
                  m.role === 'user' ? 'bg-blue-600' : 'bg-white border-l border-b border-gray-100'
                } transform rotate-45`} />
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start animate-pulse">
              <div className="rounded-2xl bg-white border border-gray-100 px-6 py-4 shadow-lg flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '120ms' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '240ms' }} />
                </div>
                <span className="text-sm text-gray-500 ml-2">Thinking...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <form onSubmit={onSubmit} className="p-6 border-t border-white/30 bg-gradient-to-r from-white/90 to-white/80 backdrop-blur-sm">
          <div className="relative flex items-end gap-4 max-w-4xl mx-auto w-full">
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type your message... (Shift+Enter = New line)"
                rows={1}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); } }}
                className="w-full resize-none rounded-2xl border-2 border-gray-200/60 bg-white/90 backdrop-blur px-6 py-4 text-gray-800 font-medium shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/60 transition-all duration-200 max-h-40 placeholder:text-gray-500"
                style={{ minHeight: '56px' }}
              />
              {input.trim() && (
                <div className="absolute top-2 right-2 text-xs text-gray-400 bg-white/80 px-2 py-1 rounded-md">
                  {input.length} characters
                </div>
              )}
            </div>
            <Button 
              type="submit" 
              size="lg" 
              variant="primary" 
              disabled={!input.trim() || loading} 
              loading={loading} 
              className="rounded-2xl px-8 py-4 text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:scale-100 min-w-[100px] font-medium"
            >
              {loading ? 'Sending...' : 'Send'}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
