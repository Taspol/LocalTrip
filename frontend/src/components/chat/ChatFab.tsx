"use client";
import { useState } from "react";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { Modal } from "@/components/ui/Modal";
import { Icon } from "@/components/ui/Icon";

export function ChatFab() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open chat"
        className="group fixed bottom-5 right-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary)] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-[var(--color-primary-600)] hover:shadow-xl hover:shadow-[var(--color-primary)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-300)] animate-bounce-soft"
      >
        <Icon name="chat" size={20} className="group-hover:scale-110 transition-transform duration-200" />
        
        {/* Pulse animation ring */}
        <div className="absolute inset-0 rounded-full bg-[var(--color-primary)] animate-ping opacity-25"></div>
        <div className="absolute inset-0 rounded-full bg-[var(--color-primary)] animate-pulse opacity-20"></div>
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-[var(--color-foreground)]">Trip Assistant</h2>
          <button
            onClick={() => setOpen(false)}
            className="rounded-md px-2 py-1 text-xs text-[color:var(--color-foreground)/0.8] hover:bg-[var(--color-primary-50)] transition-all duration-200 hover:scale-105"
            aria-label="Close chat"
          >
            Close
          </button>
        </div>
        <ChatPanel />
      </Modal>
    </>
  );
}
