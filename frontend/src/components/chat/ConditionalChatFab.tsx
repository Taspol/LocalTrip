"use client";

import { usePathname } from "next/navigation";
import { ChatFab } from "./ChatFab";

export function ConditionalChatFab() {
  const pathname = usePathname();
  
  // Don't show ChatFab on the chat page itself
  if (pathname === "/chat") {
    return null;
  }
  
  return <ChatFab />;
}
