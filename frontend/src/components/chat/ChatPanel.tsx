'use client';

import { FormEvent, useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

type Message = { role: "user" | "assistant"; content: string; timestamp: Date };

export function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "assistant", 
      content: "🇹🇭 สวัสดี! I'm your Thailand hiking guide AI. I can help with trail recommendations in places like Doi Inthanon, Khao Yai, Erawan Falls, gear advice for tropical conditions, weather warnings, and safety tips for your Thai outdoor adventures!", 
      timestamp: new Date() 
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (smooth = true) => {
    const el = messagesContainerRef.current;
    if (!el) return;
    // Only scroll the internal container, not the whole page
    if (smooth) {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    } else {
      el.scrollTop = el.scrollHeight;
    }
  };

  // Auto-scroll when messages update
  useEffect(() => {
    scrollToBottom(messages.length > 1); // smooth after first render
  }, [messages]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const text = input.trim();
    const userMsg: Message = { role: "user", content: text, timestamp: new Date() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 20000);
      const resp = await fetch("https://taspol-pan-sea.hf.space/v1/basicChat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
        signal: controller.signal
      });
      clearTimeout(timeout);
      let replyText = "(No content)";
      try {
        const data: unknown = await resp.json();
        replyText = extractText(data);
      } catch {
        replyText = await resp.text();
      }
      if (!resp.ok) {
        replyText = `Error ${resp.status}: ${replyText}`;
      }
      const reply: Message = { role: "assistant", content: replyText, timestamp: new Date() };
      setMessages((m) => [...m, reply]);
    } catch (err) {
      const message = err instanceof Error ? (err.name === 'AbortError' ? 'Request timed out.' : err.message) : String(err);
      setMessages((m) => [...m, { role: 'assistant', content: `⚠️ ${message}`, timestamp: new Date() }]);
    } finally {
      setLoading(false);
    }
  };

  const extractText = (data: unknown): string => {
    if (data == null) return "No response.";
    if (typeof data === 'string') return data;
    if (typeof data === 'object') {
      // Attempt common fields
      // @ts-expect-error dynamic
      if (typeof data.message === 'string') return data.message;
      // @ts-expect-error dynamic
      if (typeof data.reply === 'string') return data.reply;
      // @ts-expect-error dynamic
      if (typeof data.text === 'string') return data.text;
      // OpenAI-like
      // @ts-expect-error dynamic
      if (Array.isArray(data.choices) && data.choices[0]?.message?.content) {
        // @ts-expect-error dynamic
        return data.choices[0].message.content as string;
      }
      try { return JSON.stringify(data); } catch { return String(data); }
    }
    return String(data);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex h-[600px] max-h-[70vh] flex-col w-full max-w-full">
  <Card className="flex-1 flex flex-col overflow-hidden p-0" padding="sm">
        <div className="flex flex-col h-full">
          <div className="px-4 pt-4 pb-3 flex items-center gap-2 border-b border-[var(--color-border)] flex-shrink-0 bg-white/60 backdrop-blur">
            <div className="text-lg">🤖</div>
            <h3 className="font-bold">Trip Assistant</h3>
            <div className="ml-auto flex h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          </div>
          
          <div
            ref={messagesContainerRef}
            className="flex-1 space-y-3 overflow-y-auto px-4 pt-4 text-sm min-h-0 w-full max-w-full pb-4"
            aria-live="polite"
          >
        {messages.map((msg, i) => (
          <div key={i} className={`flex w-full max-w-full ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] rounded-lg px-3 py-2 break-words overflow-hidden word-break ${
              msg.role === "user" 
                ? "bg-[var(--color-primary-500)] text-white" 
                : "bg-[var(--color-primary-50)] text-[var(--color-foreground)]"
            }`}>
              <div className="break-words overflow-wrap-anywhere hyphens-auto">{msg.content}</div>
              <div className={`mt-1 text-xs ${
                msg.role === "user" ? "text-white/70" : "text-[color:var(--color-foreground)/0.5]"
              }`}>
                {formatTime(msg.timestamp)}
              </div>
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-lg bg-[var(--color-primary-50)] px-3 py-2">
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 animate-bounce rounded-full bg-[var(--color-primary-400)]" />
                <div className="h-2 w-2 animate-bounce rounded-full bg-[var(--color-primary-400)] [animation-delay:0.1s]" />
                <div className="h-2 w-2 animate-bounce rounded-full bg-[var(--color-primary-400)] [animation-delay:0.2s]" />
              </div>
            </div>
          </div>
        )}
        
  {/* spacer keeps last message from being flush against input */}
  <div className="h-1" />
          </div>

          <form
            ref={formRef}
            onSubmit={onSubmit}
            className="flex gap-2 border-t border-[var(--color-border)] p-3 flex-shrink-0 bg-white/70 backdrop-blur sticky bottom-0"
          >
            <input
              className="flex-1 min-w-0 rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm outline-none transition-all focus:border-[var(--color-primary-300)] focus:ring-2 focus:ring-[var(--color-primary-100)]"
              placeholder="Ask about routes, gear, weather..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <Button
              type="submit"
              variant="primary"
              size="sm"
              loading={loading}
              disabled={!input.trim()}
              className="flex-shrink-0"
            >
              Send
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
